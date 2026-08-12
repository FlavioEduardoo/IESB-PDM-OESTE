import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { titulo } from './util';
import titulo_padrao from './util';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={{margin: 20}}>{titulo}</Text>
      <Text style={styles.text}> {titulo_padrao}</Text>
      <Button title="Clique aqui" />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00a4aa',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text:{
    margin: 20,
    fontSize: 67,
    color: '#ff0000',
    fontFamily: 'pixelated',
  }
});
