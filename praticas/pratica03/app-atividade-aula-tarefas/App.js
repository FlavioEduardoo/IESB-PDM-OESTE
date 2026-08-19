import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { rotulo_btn_cadastro_meta, rotulo_input_meta, rotulo_lista_metas } from './mensagens';
import { useState } from 'react';

export default function App() {
  const [inputMetaText, setInputMetaText] = useState('');
  const [metas, setMetas] = useState([]);

  function metaInputHandler(inputText) {
    setInputMetaText(inputText);
  }

  function adicionarMetaHandler() {
    setMetas([...metas, inputMetaText])
  }
  return (
    <View style={styles.mainContainer}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between', flex: 1}}> 
        <View style = {{width: '65%'}}>
          Digite a sua meta:
          <TextInput style={styles.inputText} placeholder={rotulo_input_meta} onChangeText={metaInputHandler} />
          </View>

        <View style = {{width: '30%'}}>
          <Button title={rotulo_btn_cadastro_meta} onPress={adicionarMetaHandler} />
        </View>
      </View>

      <View style={styles.metaContainer}>
        Lista de metas:
        {metas.map((meta, index) => <Text style={styles.item} key={index}>{meta}</Text>)}
      </View>
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
    flex: 1,
    flexDirection: 'column',
  },
  inputText: {
    borderColor: '#ccc',
    borderWidth: 1,
  },
  metaContainer: {
    flex: 1,
  },
  item: {
    margin: 8,
    borderRadius: 5,
    padding: 10,
    backgroundColor: 'lightblue',
  }
});