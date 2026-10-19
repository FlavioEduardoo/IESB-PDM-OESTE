import { useState, useMemo } from 'react';
import { View, TextInput, StyleSheet, useColorScheme } from 'react-native';
import DespesaSaida from '../components/despesa/DespesaSaida';
import FiltroCategoria from '../components/despesa/FiltroCategoria';
import { useExpenses } from '../store/expenses-context';
import useDebounce from '../hooks/useDebounce';
import { getColors } from '../constants/theme';

function TodasDespesas(){
    const { expenses } = useExpenses();
    const colors = getColors(useColorScheme());

    const [search, setSearch] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');

    const debouncedSearch = useDebounce(search, 300);

    const filteredExpenses = useMemo(() => {
        const term = debouncedSearch.trim().toLowerCase();

        return expenses.filter((expense) => {
            const matchesCategory = !categoryFilter || expense.category === categoryFilter;
            const matchesSearch = expense.description.toLowerCase().includes(term);

            return matchesCategory && matchesSearch;
        });
    }, [expenses, debouncedSearch, categoryFilter]);

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <TextInput
                style={[
                    styles.search,
                    { borderColor: colors.border, color: colors.text, backgroundColor: colors.card },
                ]}
                placeholder="Buscar por descrição"
                placeholderTextColor={colors.muted}
                value={search}
                onChangeText={setSearch}
            />

            <FiltroCategoria selected={categoryFilter} onSelect={setCategoryFilter} />

            <DespesaSaida
                despesas={filteredExpenses}
                periodo={categoryFilter ? 'Total - ' + categoryFilter : 'Total'}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    search: {
        borderWidth: 1,
        borderRadius: 8,
        padding: 10,
        marginHorizontal: 8,
        marginTop: 8,
    },
});

export default TodasDespesas