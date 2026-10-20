import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

export default function MetaInput({
  value,
  onChangeText,
  onAdd,
}) {
  return (
    <View style={styles.container}>

      <Text style={styles.label}>
        Nova meta
      </Text>

      <View style={styles.row}>

        <TextInput
          style={styles.input}
          placeholder="Ex: Estudar React Native"
          placeholderTextColor="#999"
          value={value}
          onChangeText={onChangeText}
          onSubmitEditing={onAdd}
          returnKeyType="done"
        />

        <Pressable
          onPress={onAdd}
          android_ripple={{ color: '#FFFFFF55' }}
          style={({ pressed }) => [
            styles.button,
            pressed && styles.buttonPressed,
          ]}
        >
          <Text style={styles.buttonText}>
            +
          </Text>
        </Pressable>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },

  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 9,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  input: {
    flex: 1,
    height: 52,
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    paddingHorizontal: 16,
    fontSize: 15,
    color: '#222222',
    borderWidth: 1,
    borderColor: '#E2E2E2',
  },

  button: {
    width: 52,
    height: 52,
    marginLeft: 10,
    borderRadius: 15,
    backgroundColor: '#5B4BDB',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },

  buttonPressed: {
    opacity: 0.75,
  },

  buttonText: {
    fontSize: 30,
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginTop: -2,
  },
});