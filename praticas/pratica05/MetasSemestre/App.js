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
  const [carregando, setCarregando] = useState(true);

  // CARREGAR METAS
  useEffect(() => {
    async function carregarMetas() {
      try {
        const dadosSalvos = await AsyncStorage.getItem(
          CHAVE_METAS
        );

        if (dadosSalvos) {
          const metasSalvas = JSON.parse(dadosSalvos);
          setMetas(metasSalvas);
        }
      } catch (error) {
        Alert.alert(
          'Erro',
          'Não foi possível carregar suas metas.'
        );
      } finally {
        setCarregando(false);
      }
    }

    carregarMetas();
  }, []);

  // SALVAR METAS
  useEffect(() => {
    if (carregando) {
      return;
    }

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
  }, [metas, carregando]);

  // ADICIONAR META
  function adicionarMeta() {
    const texto = textoMeta.trim();

    if (texto === '') {
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

    setMetas((metasAtuais) => {
      return [...metasAtuais, novaMeta];
    });

    setTextoMeta('');
  }

  // REMOVER META
  function removerMeta(id) {
    setMetas((metasAtuais) => {
      return metasAtuais.filter(
        (meta) => String(meta.id) !== String(id)
      );
    });
  }

  // MARCAR / DESMARCAR CONCLUÍDA
  function alternarConclusao(id) {
    setMetas((metasAtuais) => {
      return metasAtuais.map((meta) => {
        if (String(meta.id) === String(id)) {
          return {
            ...meta,
            concluida: !meta.concluida,
          };
        }

        return meta;
      });
    });
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

        {/* CABEÇALHO */}
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

          {/* CONTADORES */}
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

        {/* INPUT */}
        <MetaInput
          value={textoMeta}
          onChangeText={setTextoMeta}
          onAdd={adicionarMeta}
        />

        {/* LISTA */}
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
  },

  statBox: {
    flex: 1,
    alignItems: 'center',
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
