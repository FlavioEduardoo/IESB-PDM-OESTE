import { View, Text, StyleSheet, useColorScheme } from 'react-native';
import { getColors } from '../../constants/theme';

function DespesaSumario({ despesas, periodo }) {
    const colors = getColors(useColorScheme());

    const somaDespesas = despesas.reduce((total, despesa) => {
        return total + despesa.amount;
    }, 0);

    return (
        <View style={[styles.container, { backgroundColor: colors.summary }]}>
            <View>
                <Text style={{ color: colors.text, fontWeight: 'bold' }}>{periodo}</Text>
                <Text style={{ color: colors.muted }}>
                    {despesas.length} {despesas.length === 1 ? 'despesa' : 'despesas'}
                </Text>
            </View>

            <Text style={[styles.total, { color: colors.primary }]}>
                R$ {somaDespesas.toFixed(2)}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 12,
        margin: 8,
        borderRadius: 8,
    },
    total: { fontSize: 18, fontWeight: 'bold' },
});

export default DespesaSumario;