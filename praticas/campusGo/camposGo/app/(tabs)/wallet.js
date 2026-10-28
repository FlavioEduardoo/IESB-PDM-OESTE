import { View, Text, Button, Share, Platform, Alert, StyleSheet } from 'react-native';
import { useExpenses } from '../../store/expenses-context';

export default function Wallet() {
  const { expenses } = useExpenses();
  const total = (expenses ?? []).reduce(
    (sum, e) => sum + (Number(e.amount) || 0),
    0
  );

  async function handleShare() {
    const message = `Gastei R$ ${total.toFixed(2)} neste semestre.`;
    try {
      await Share.share({ message });
    } catch {
      // Navegador sem suporte a compartilhamento: mostra o texto na tela
      if (Platform.OS === 'web') {
        window.alert(message);
      } else {
        Alert.alert('Compartilhar', 'Não foi possível compartilhar agora.');
      }
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Total gasto</Text>
      <Text style={styles.total}>R$ {total.toFixed(2)}</Text>
      <Button title="Compartilhar resumo" onPress={handleShare} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12 },
  label: { fontSize: 16, color: '#666' },
  total: { fontSize: 36, fontWeight: '700' },
});