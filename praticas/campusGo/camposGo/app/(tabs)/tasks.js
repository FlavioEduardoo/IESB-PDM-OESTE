import { useState } from 'react';
import { View, Text, Button, Alert, StyleSheet } from 'react-native';
import { Link, router } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { getCurrentPlace } from '../../services/location';
import { scheduleReminder } from '../../services/notifications';
import FadeIn from '../../components/FadeIn';

export default function Tasks() {
  const [place, setPlace] = useState(null);

  async function handleCheckIn() {
    try {
      const result = await getCurrentPlace();
      if (!result) {
        Alert.alert('Localização', 'Permissão negada. Não foi possível fazer o check-in.');
        return;
      }
      setPlace(result);
    } catch {
      Alert.alert('Localização', 'Não foi possível obter sua localização.');
    }
  }

  async function handleReminder() {
    try {
      const ok = await scheduleReminder('Estudar para a prova', 10);
      Alert.alert(
        ok ? 'Lembrete agendado' : 'Permissão negada',
        ok ? 'Você será avisado em 10 segundos.' : 'Ative as notificações para receber lembretes.'
      );
    } catch {
      Alert.alert('Erro', 'Não foi possível agendar o lembrete.');
    }
  }

  async function handleDone() {
    try {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } catch {}
    Alert.alert('Tarefa concluída');
  }

  return (
    <View style={styles.container}>
      <FadeIn style={styles.card}>
        <Text style={styles.title}>Minhas tarefas</Text>
        <Link href="/task/42" style={styles.link}>Abrir tarefa 42</Link>
        <Button title="Nova tarefa" onPress={() => router.push('/new-task')} />
      </FadeIn>

      <Button title="Estudei aqui" onPress={handleCheckIn} />
      {place && <Text style={styles.place}>📍 {place.label}</Text>}

      <Button title="Lembrar em 10 s" onPress={handleReminder} />
      <Button title="Concluir" onPress={handleDone} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center', gap: 14 },
  card: { padding: 16, borderRadius: 12, backgroundColor: '#f1f1f1', gap: 10 },
  title: { fontSize: 20, fontWeight: '600' },
  link: { color: '#0a66c2', fontSize: 16 },
  place: { textAlign: 'center', fontSize: 16 },
});