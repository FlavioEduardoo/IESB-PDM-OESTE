import React, { useEffect, useState } from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  SafeAreaProvider,
  SafeAreaView,
} from 'react-native-safe-area-context';

import MetaInput from './components/MetaInput';
import MetaList from './components/MetaList';

const CHAVE_METAS = '@metas_semestre';

export default function App() {
  const [textoMeta, setTextoMeta] = useState('');
  const [metas, setMetas] = useState([]);

  // CARREGAR METAS AO ABRIR O APP
  useEffect(() => {
    async function carregarMetas() {
      try {
        const dadosSalvos = await AsyncStorage.getItem(CHAVE_METAS);

        if (dadosSalvos !== null) {
          setMetas(JSON.parse(dadosSalvos));
        }
      } catch (error) {
        Alert.alert(
          'Erro',
          'Não foi possível carregar suas metas.'
        );
      }
    }

    carregarMetas();
  }, []);

  // SALVAR METAS SEMPRE QUE A LISTA FOR ALTERADA
  useEffect(() => {
    async function salvarMetas() {
      try {
        await AsyncStorage.setItem(
          CHAVE_METAS,
          JSON.stringify(metas)
        );
      } catch (error) {
        Alert.alert(
          'Erro',
          'Não foi possível salvar suas metas.'
        );
      }
    }

    salvarMetas();
  }, [metas]);

  function adicionarMeta() {
    const texto = textoMeta.trim();

    if (texto.length === 0) {
      Alert.alert(
        'Meta inválida',
        'Digite uma meta antes de adicionar.'
      );
      return;
    }

    const novaMeta = {
      id: Date.now().toString(),
      texto: texto,
      criadaEm: new Date().toISOString(),
      concluida: false,
    };

    setMetas((metasAtuais) => [
      ...metasAtuais,
      novaMeta,
    ]);

    setTextoMeta('');
  }

  function removerMeta(id) {
    Alert.alert(
      'Remover meta',
      'Tem certeza que deseja remover esta meta?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Remover',
          style: 'destructive',
          onPress: () => {
            setMetas((metasAtuais) =>
              metasAtuais.filter((meta) => meta.id !== id)
            );
          },
        },
      ]
    );
  }

  function alternarConclusao(id) {
    setMetas((metasAtuais) =>
      metasAtuais.map((meta) =>
        meta.id === id
          ? {
              ...meta,
              concluida: !meta.concluida,
            }
          : meta
      )
    );
  }

  const pendentes = metas.filter(
    (meta) => !meta.concluida
  ).length;

  const concluidas = metas.filter(
    (meta) => meta.concluida
  ).length;

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>

        <View style={styles.header}>
          <View style={styles.headerTop}>
            <Image
              source={require('./assets/logo.png')}
              style={styles.logo}
            />

            <View>
              <Text style={styles.title}>
                MetasSemestre
              </Text>

              <Text style={styles.subtitle}>
                Organize seus estudos
              </Text>
            </View>
          </View>

          <View style={styles.stats}>
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>
                {pendentes}
              </Text>

              <Text style={styles.statLabel}>
                Pendentes
              </Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.statBox}>
              <Text style={styles.statNumber}>
                {concluidas}
              </Text>

              <Text style={styles.statLabel}>
                Concluídas
              </Text>
            </View>
          </View>
        </View>

        <MetaInput
          value={textoMeta}
          onChangeText={setTextoMeta}
          onAdd={adicionarMeta}
        />

        <MetaList
          metas={metas}
          onDelete={removerMeta}
          onToggle={alternarConclusao}
        />

      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F6FA',
  },

  header: {
    backgroundColor: '#5B4BDB',
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 24,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },

  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  logo: {
    width: 58,
    height: 58,
    borderRadius: 16,
    marginRight: 14,
  },

  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },

  subtitle: {
    marginTop: 3,
    fontSize: 14,
    color: '#DDD9FF',
  },

  stats: {
    marginTop: 22,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },

  statBox: {
    alignItems: 'center',
    flex: 1,
  },

  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#5B4BDB',
  },

  statLabel: {
    marginTop: 3,
    fontSize: 12,
    color: '#777777',
  },

  divider: {
    width: 1,
    height: 35,
    backgroundColor: '#E5E5E5',
  },
});