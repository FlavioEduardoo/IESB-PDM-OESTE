import { FlatList, View, Text, StyleSheet, useColorScheme } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DespesaItem from './DespesaItem';
import { getColors } from '../../constants/theme';

function DespesaLista({ despesas }) {
    const colors = getColors(useColorScheme());

    return (
        <FlatList
            data={despesas}
            renderItem={({ item }) => <DespesaItem item={item} />}
            keyExtractor={(item) => item.id}
            contentContainerStyle={despesas.length === 0 && styles.emptyContent}
            ListEmptyComponent={
                <View style={styles.empty}>
                    <Ionicons name="wallet-outline" size={48} color={colors.muted} />
                    <Text style={[styles.emptyTitle, { color: colors.text }]}>
                        Nenhuma despesa.
                    </Text>
                    <Text style={{ color: colors.muted }}>Toque em + para adicionar.</Text>
                </View>
            }
        />
    );
}

const styles = StyleSheet.create({
    emptyContent: { flexGrow: 1 },
    empty: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
    emptyTitle: { fontSize: 16, fontWeight: 'bold', marginTop: 8 },
});

export default DespesaLista;