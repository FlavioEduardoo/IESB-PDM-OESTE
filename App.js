import React, { useState } from 'react';
import {View,Text, TextInput, Pressable, Switch, StyleSheet,} from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { APP_TITLE, INPUT_PLACEHOLDER, BUTTON_TEXT, LIST_TITLE, SWITCH_LABEL } from './labels';

const disciplinas = [
  'Programação para Dispositivos Móveis',
  'Engenharia de Software',
  'Banco de Dados',
  'Redes de Computadores',
];

export default function App() {
  const [pressed, setPressed] = useState(false);
  const [apenasObrigatorias, setApenasObrigatorias] = useState(false);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Text style={styles.header}>{APP_TITLE}</Text>

        <View style={styles.row}>
          <TextInput
            style={styles.input}
            placeholder={INPUT_PLACEHOLDER}
          />

          <Pressable
            style={[styles.button, pressed && styles.buttonPressed]}
            onPressIn={() => setPressed(true)}
            onPressOut={() => setPressed(false)}
            onPress={() => {}}
          >
            <Text style={styles.buttonText}>{BUTTON_TEXT}</Text>
          </Pressable>
        </View>

        <View style={styles.switchRow}>
          <Text style={styles.switchLabel}>{SWITCH_LABEL}</Text>
          <Switch
            value={apenasObrigatorias}
            onValueChange={setApenasObrigatorias}
          />
        </View>

        <Text style={styles.listTitle}>{LIST_TITLE}</Text>
        <View style={styles.list}>
          {disciplinas.map((disciplina, index) => (
            <View key={index} style={styles.item}>
              <Text style={styles.itemText}>{disciplina}</Text>
            </View>
          ))}
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f2f2f2',
  },

  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },

  input: {
    width: '68%',
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: '#fff',
  },

  button: {
    flex: 1,
    marginLeft: 8,
    backgroundColor: '#4a90e2',
    borderRadius: 8,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonPressed: {
    backgroundColor: '#2b5fa0',
    opacity: 0.85,
  },

  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },

  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },

  switchLabel: {
    fontSize: 14,
    color: '#333',
  },

  listTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },

  list: {
    flexDirection: 'column',
  },

  item: {
    backgroundColor: '#fff',
    padding: 12,
    margin: 6,
    borderRadius: 8,
    elevation: 1,
  },

  itemText: {
    fontSize: 15,
  },
});