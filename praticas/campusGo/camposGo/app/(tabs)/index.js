import { useState } from 'react';
import {
  View, Text, Button, FlatList, ActivityIndicator, StyleSheet,
} from 'react-native';
import { useNotices } from '../../hooks/useNotices';
import FadeIn from '../../components/FadeIn';

export default function Home() {
  const { notices, isLoading, error, reload } = useNotices();
  const [refreshing, setRefreshing] = useState(false);

  async function onRefresh() {
    setRefreshing(true);
    await reload();
    setRefreshing(false);
  }

  if (isLoading && !refreshing && notices.length === 0) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error && notices.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>{error}</Text>
        <Button title="Tentar novamente" onPress={reload} />
      </View>
    );
  }

  return (
    <FlatList
      data={notices}
      keyExtractor={(item) => String(item.id)}
      contentContainerStyle={styles.list}
      refreshing={refreshing}
      onRefresh={onRefresh}
      ListEmptyComponent={<Text style={styles.empty}>Nenhum aviso por enquanto.</Text>}
      renderItem={({ item }) => (
        <FadeIn style={styles.card}>
          <Text style={styles.title}>{item.title}</Text>
          <Text>{item.body}</Text>
        </FadeIn>
      )}
    />
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12, padding: 20 },
  error: { color: '#b00020', textAlign: 'center' },
  list: { padding: 16, gap: 12, flexGrow: 1 },
  card: { padding: 14, borderRadius: 10, backgroundColor: '#f1f1f1', gap: 6 },
  title: { fontWeight: '700', fontSize: 16 },
  empty: { textAlign: 'center', marginTop: 40, color: '#666' },
});