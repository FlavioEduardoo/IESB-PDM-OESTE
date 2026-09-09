import React from 'react';

import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default function MetaList({
  metas,
  onDelete,
  onToggle,
}) {

  if (metas.length === 0) {
    return (
      <View style={styles.emptyContainer}>

        <Text style={styles.emptyIcon}>
          📚
        </Text>

        <Text style={styles.emptyTitle}>
          Nenhuma meta ainda
        </Text>

        <Text style={styles.emptyText}>
          Adicione sua primeira meta de estudo!
        </Text>

      </View>
    );
  }

  return (
    <FlatList
      data={metas}
      keyExtractor={(item) => String(item.id)}
      contentContainerStyle={styles.list}
      showsVerticalScrollIndicator={false}

      renderItem={({ item }) => (
        <View style={styles.card}>

          {/* META */}
          <Pressable
            onPress={() => onToggle(item.id)}
            style={styles.metaButton}
            android_ripple={{
              color: '#DDDDDD',
            }}
          >

            <View
              style={[
                styles.checkbox,
                item.concluida &&
                  styles.checkboxConcluida,
              ]}
            >
              {item.concluida && (
                <Text style={styles.check}>
                  ✓
                </Text>
              )}
            </View>

            <View style={styles.textContainer}>

              <Text
                style={[
                  styles.metaText,
                  item.concluida &&
                    styles.metaConcluida,
                ]}
              >
                {item.texto}
              </Text>

              <Text style={styles.data}>
                Criada em{' '}
                {item.criadaEm
                  ? new Date(
                      item.criadaEm
                    ).toLocaleDateString('pt-BR')
                  : 'Data não informada'}
              </Text>

            </View>

          </Pressable>

          {/* BOTÃO EXCLUIR */}
          <Pressable
            onPress={() => {
              onDelete(item.id);
            }}
            style={styles.deleteButton}
            android_ripple={{
              color: '#FFCCCC',
            }}
          >
            <Text style={styles.deleteText}>
              🗑️
            </Text>
          </Pressable>

        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    padding: 20,
    paddingBottom: 30,
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    marginBottom: 12,
    padding: 8,

    flexDirection: 'row',
    alignItems: 'center',

    elevation: 3,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 5,
  },

  metaButton: {
    flex: 1,

    flexDirection: 'row',
    alignItems: 'center',

    padding: 8,
    borderRadius: 12,

    overflow: 'hidden',
  },

  checkbox: {
    width: 30,
    height: 30,

    borderRadius: 9,

    borderWidth: 2,
    borderColor: '#5B4BDB',

    alignItems: 'center',
    justifyContent: 'center',

    marginRight: 12,
  },

  checkboxConcluida: {
    backgroundColor: '#5B4BDB',
  },

  check: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },

  textContainer: {
    flex: 1,
  },

  metaText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#292929',
  },

  metaConcluida: {
    textDecorationLine: 'line-through',
    color: '#999999',
  },

  data: {
    fontSize: 11,
    color: '#999999',
    marginTop: 5,
  },

  deleteButton: {
    width: 50,
    height: 50,

    borderRadius: 14,

    alignItems: 'center',
    justifyContent: 'center',

    overflow: 'hidden',
  },

  deleteText: {
    fontSize: 21,
  },

  emptyContainer: {
    flex: 1,

    alignItems: 'center',
    justifyContent: 'center',

    paddingHorizontal: 40,
  },

  emptyIcon: {
    fontSize: 55,
    marginBottom: 15,
  },

  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
  },

  emptyText: {
    marginTop: 7,

    textAlign: 'center',

    fontSize: 14,
    color: '#888888',
  },
});