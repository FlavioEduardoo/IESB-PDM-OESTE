import { View, Text, TextInput, StyleSheet, Pressable, Alert } from 'react-native';
import React, { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { CATEGORIAS } from '../constants/categorias';

function GerenciarDespesa({ navigation }) {

    const [data, setData] = useState(new Date());
    const [valor, setValor] = useState('');
    const [descricao, setDescricao] = useState('');
    const [categoria, setCategoria] = useState('');

    const [showPicker, setShowPicker] = useState(false);

    // Validação do valor
    const handleChangeValor = (text) => {
        const cleanText = text.replace(',', '.');

        // Aceita apenas números com até 2 casas decimais
        const match = cleanText.match(/^\d*\.?\d{0,2}$/);

        if (match) {
            setValor(cleanText);
        }
    };

    // Alteração da data
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || data;

        setShowPicker(false);
        setData(currentDate);
    };

    // Validação do formulário e submissão
    const handleSubmit = () => {
        const valorNumerico = parseFloat(valor);

        if (!descricao.trim() || !valor || isNaN(valorNumerico) || valorNumerico <= 0 || !categoria) {
            Alert.alert(
                'Dados inválidos',
                'Preencha a descrição, um valor maior que zero e selecione uma categoria.'
            );
            return;
        }

        const novaDespesa = {
            id: Date.now().toString(),
            descricao: descricao.trim(),
            valor: valorNumerico,
            data: data,
            categoria: categoria
        };

        console.log('Despesa cadastrada:', novaDespesa);
        Alert.alert('Sucesso', 'Despesa cadastrada!');
        navigation.goBack();
    };

    return (
        <View style={styles.container}>

            {/* Descrição */}
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Descrição</Text>

                <TextInput
                    style={styles.input}
                    maxLength={20}
                    value={descricao}
                    onChangeText={setDescricao}
                />
            </View>

            {/* Valor da Despesa */}
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Valor da Despesa</Text>

                <TextInput
                    style={styles.input}
                    keyboardType="decimal-pad"
                    maxLength={10}
                    value={valor}
                    onChangeText={handleChangeValor}
                />
            </View>

            {/* Data da Despesa */}
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Data da Despesa</Text>

                <Pressable
                    onPress={() => setShowPicker(true)}
                    style={styles.input}
                >
                    <Text>
                        {data.toLocaleDateString('pt-BR')}
                    </Text>
                </Pressable>

                {showPicker && (
                    <DateTimePicker
                        value={data}
                        mode="date"
                        display="default"
                        onChange={onChange}
                    />
                )}
            </View>

            {/* Categoria */}
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Categoria</Text>

                <View style={styles.categorias}>
                    {CATEGORIAS.map((cat) => (
                        <Pressable
                            key={cat}
                            onPress={() => setCategoria(cat)}
                            style={[
                                styles.categoriaBotao,
                                categoria === cat && styles.categoriaBotaoAtivo
                            ]}
                        >
                            <Text style={categoria === cat && styles.categoriaTextoAtivo}>
                                {cat}
                            </Text>
                        </Pressable>
                    ))}
                </View>
            </View>

            {/* Botão de salvar */}
            <Pressable style={styles.botaoSalvar} onPress={handleSubmit}>
                <Text style={styles.botaoSalvarTexto}>Salvar</Text>
            </Pressable>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 20,
    },

    inputContainer: {
        marginHorizontal: 4,
        marginVertical: 16,
    },

    label: {
        fontSize: 12,
        marginBottom: 4,
    },

    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 8,
    },

    categorias: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },

    categoriaBotao: {
        paddingHorizontal: 12,
        paddingVertical: 8,
        marginRight: 8,
        marginBottom: 8,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 16,
        backgroundColor: '#e8e8e8',
    },

    categoriaBotaoAtivo: {
        backgroundColor: '#3e04c3',
        borderColor: '#3e04c3',
    },

    categoriaTextoAtivo: {
        color: '#fff',
        fontWeight: 'bold',
    },

    botaoSalvar: {
        marginHorizontal: 4,
        padding: 12,
        backgroundColor: '#3e04c3',
        alignItems: 'center',
    },

    botaoSalvarTexto: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default GerenciarDespesa;