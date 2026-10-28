import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const tab = (title, icon) => ({
  title,
  tabBarIcon: ({ color, size }) => (
    <Ionicons name={icon} size={size} color={color} />
  ),
});

export default function TabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="index" options={tab('Início', 'home')} />
      <Tabs.Screen name="tasks" options={tab('Tarefas', 'checkbox')} />
      <Tabs.Screen name="wallet" options={tab('Bolso', 'wallet')} />
      <Tabs.Screen name="profile" options={tab('Perfil', 'person')} />
    </Tabs>
  );
}