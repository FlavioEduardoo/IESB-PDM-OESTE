import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { rotulo_btn_cadastro_meta, rotulo_imput_meta, rotulo_lista_metas } from './mensagens';
import { Button, TextInput } from 'react-native-web';

export default function App() {
  return (
    <View style={styles.mainContainer}>
      <TextInput placeholder={rotulo_imput_meta} />
      <Button title={rotulo_btn_cadastro_meta} />
      <Text>{rotulo_lista_metas}</Text> 
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainContainer:{
    padding: 30,
  }
});
