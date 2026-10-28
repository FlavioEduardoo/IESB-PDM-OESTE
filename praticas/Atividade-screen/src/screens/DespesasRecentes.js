import { useMemo } from 'react';
import { View, useColorScheme } from 'react-native';
import DespesaSaida from '../components/despesa/DespesaSaida';
import { useExpenses } from '../store/expenses-context';
import { getColors } from '../constants/theme';

function DespesasRecentes() {
    const { expenses } = useExpenses();
    const colors = getColors(useColorScheme());

    const recentExpenses = useMemo(() => {
        const endOfToday = new Date();
        endOfToday.setHours(23, 59, 59, 999);

        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        sevenDaysAgo.setHours(0, 0, 0, 0);

        return expenses.filter((expense) => {
            return expense.date >= sevenDaysAgo && expense.date <= endOfToday;
        });
    }, [expenses]);

    return (
        <View style={{ flex: 1, backgroundColor: colors.background }}>
            <DespesaSaida despesas={recentExpenses} periodo="Últimos 7 dias" />
        </View>
    );
}

export default DespesasRecentes;