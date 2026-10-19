import {
    View, Text, TextInput, StyleSheet, Pressable, Alert, Modal, FlatList,
    KeyboardAvoidingView, ScrollView, Platform, useColorScheme,
} from 'react-native';
import React, { useState, useLayoutEffect } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';
import IconButton from '../components/IconButton';
import { useExpenses } from '../store/expenses-context';
import { CATEGORIES } from '../constants/categories';
import { getColors } from '../constants/theme';

// Retorna um objeto com uma mensagem para cada campo inválido
function validate(values) {
    const errors = {};

    if (values.description.trim().length < 3) {
        errors.description = 'A descrição deve ter no mínimo 3 caracteres.';
    }

    const amount = parseFloat(values.amount);
    if (isNaN(amount) || amount <= 0) {
        errors.amount = 'Informe um valor maior que zero.';
    }

    const endOfToday = new Date();
    endOfToday.setHours(23, 59, 59, 999);
    if (values.date > endOfToday) {
        errors.date = 'A data não pode ser futura.';
    }

    if (!values.category) {
        errors.category = 'Selecione uma categoria.';
    }

    return errors;
}

function GerenciarDespesa({ route, navigation }) {
    const { expenses, addExpense, updateExpense, deleteExpense } = useExpenses();
    const colors = getColors(useColorScheme());

    const expenseId = route.params?.expenseId;
    const isEditing = !!expenseId;
    const editingExpense = expenses.find((expense) => expense.id === expenseId);

    // Estado único do formulário
    const [form, setForm] = useState({
        description: editingExpense?.description ?? '',
        amount: editingExpense ? String(editingExpense.amount) : '',
        date: editingExpense?.date ?? new Date(),
        category: editingExpense?.category ?? '',
    });
    const [errors, setErrors] = useState({});
    const [showPicker, setShowPicker] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const handleChange = (field, value) => {
        const newForm = { ...form, [field]: value };
        setForm(newForm);

        // Se o campo estava com erro, revalida: a mensagem some quando for corrigido
        if (errors[field]) {
            const newErrors = validate(newForm);
            setErrors({ ...errors, [field]: newErrors[field] });
        }
    };

    // Máscara do valor
    const handleChangeAmount = (text) => {
        const cleanText = text.replace(',', '.');

        if (/^\d*\.?\d{0,2}$/.test(cleanText)) {
            handleChange('amount', cleanText);
        }
    };

    const onChangeDate = (event, selectedDate) => {
        setShowPicker(false);

        if (selectedDate) {
            handleChange('date', selectedDate);
        }
    };

    const confirmDelete = () => {
        const doDelete = () => {
            deleteExpense(expenseId);
            navigation.goBack();
        };

        // Alert com botões não funciona no navegador (web)
        if (Platform.OS === 'web') {
            if (window.confirm('Deseja realmente excluir esta despesa?')) doDelete();
            return;
        }

        Alert.alert('Excluir despesa', 'Deseja realmente excluir esta despesa?', [
            { text: 'Cancelar', style: 'cancel' },
            { text: 'Excluir', style: 'destructive', onPress: doDelete },
        ]);
    };

    // Título dinâmico e ícone de excluir (só no modo edição)
    useLayoutEffect(() => {
        navigation.setOptions({
            title: isEditing ? 'Editar despesa' : 'Nova despesa',
            headerRight: isEditing
                ? ({ tintColor }) => (
                      <IconButton icon="trash" size={24} color={tintColor} onPress={confirmDelete} />
                  )
                : undefined,
        });
    }, [navigation, isEditing]);

    const handleSave = () => {
        const newErrors = validate(form);
        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) return;

        const data = {
            description: form.description.trim(),
            amount: parseFloat(form.amount),
            date: form.date,
            category: form.category,
        };

        if (isEditing) {
            updateExpense(expenseId, data);
        } else {
            addExpense(data);
        }

        navigation.goBack();
    };

    const inputStyle = (field) => [
        styles.input,
        { color: colors.text, backgroundColor: colors.card, borderColor: colors.border },
        errors[field] && { borderColor: colors.error },
    ];

    const ErrorText = ({ field }) =>
        errors[field] ? <Text style={[styles.error, { color: colors.error }]}>{errors[field]}</Text> : null;

    return (
        <KeyboardAvoidingView
            style={{ flex: 1, backgroundColor: colors.background }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
        >
            <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">

                {/* Descrição */}
                <View style={styles.inputContainer}>
                    <Text style={[styles.label, { color: colors.muted }]}>Descrição</Text>
                    <TextInput
                        style={inputStyle('description')}
                        maxLength={20}
                        value={form.description}
                        onChangeText={(text) => handleChange('description', text)}
                    />
                    <ErrorText field="description" />
                </View>

                {/* Valor */}
                <View style={styles.inputContainer}>
                    <Text style={[styles.label, { color: colors.muted }]}>Valor da Despesa</Text>
                    <TextInput
                        style={inputStyle('amount')}
                        keyboardType="decimal-pad"
                        maxLength={10}
                        value={form.amount}
                        onChangeText={handleChangeAmount}
                    />
                    <ErrorText field="amount" />
                </View>

                {/* Data */}
                <View style={styles.inputContainer}>
                    <Text style={[styles.label, { color: colors.muted }]}>Data da Despesa</Text>
                    <Pressable onPress={() => setShowPicker(true)} style={inputStyle('date')}>
                        <Text style={{ color: colors.text }}>
                            {form.date.toLocaleDateString('pt-BR')}
                        </Text>
                    </Pressable>
                    <ErrorText field="date" />

                    {showPicker && (
                        <DateTimePicker
                            value={form.date}
                            mode="date"
                            display="default"
                            onChange={onChangeDate}
                        />
                    )}
                </View>

                {/* Categoria (Modal) */}
                <View style={styles.inputContainer}>
                    <Text style={[styles.label, { color: colors.muted }]}>Categoria</Text>
                    <Pressable
                        onPress={() => setShowModal(true)}
                        style={[inputStyle('category'), styles.selectRow]}
                    >
                        <Text style={{ color: form.category ? colors.text : colors.muted }}>
                            {form.category || 'Selecione uma categoria'}
                        </Text>
                        <Ionicons name="chevron-down" size={18} color={colors.muted} />
                    </Pressable>
                    <ErrorText field="category" />
                </View>

                <Pressable
                    style={[styles.saveButton, { backgroundColor: colors.primary }]}
                    onPress={handleSave}
                >
                    <Text style={{ color: colors.onPrimary, fontWeight: 'bold' }}>Salvar</Text>
                </Pressable>
            </ScrollView>

            <Modal
                visible={showModal}
                transparent
                animationType="slide"
                onRequestClose={() => setShowModal(false)}
            >
                <Pressable
                    style={[styles.overlay, { backgroundColor: colors.overlay }]}
                    onPress={() => setShowModal(false)}
                >
                    <View style={[styles.modalCard, { backgroundColor: colors.card }]}>
                        <Text style={[styles.modalTitle, { color: colors.text }]}>
                            Escolha a categoria
                        </Text>

                        <FlatList
                            data={CATEGORIES}
                            keyExtractor={(item) => item}
                            renderItem={({ item }) => (
                                <Pressable
                                    style={styles.modalOption}
                                    onPress={() => {
                                        handleChange('category', item);
                                        setShowModal(false);
                                    }}
                                >
                                    <Text
                                        style={{
                                            color: form.category === item ? colors.primary : colors.text,
                                            fontWeight: form.category === item ? 'bold' : 'normal',
                                        }}
                                    >
                                        {item}
                                    </Text>
                                </Pressable>
                            )}
                        />
                    </View>
                </Pressable>
            </Modal>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: { padding: 20 },
    inputContainer: { marginHorizontal: 4, marginVertical: 12 },
    label: { fontSize: 12, marginBottom: 4 },
    input: { borderWidth: 1, borderRadius: 6, padding: 10 },
    selectRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    error: { fontSize: 12, marginTop: 4 },
    saveButton: { margin: 4, marginTop: 16, padding: 14, borderRadius: 8, alignItems: 'center' },
    overlay: { flex: 1, justifyContent: 'flex-end' },
    modalCard: { padding: 16, borderTopLeftRadius: 16, borderTopRightRadius: 16 },
    modalTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 8 },
    modalOption: { paddingVertical: 14 },
});

export default GerenciarDespesa;