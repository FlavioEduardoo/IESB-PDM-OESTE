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

  function renderMeta({ item }) {
    return (
      <View
        style={[
          styles.card,
          item.concluida && styles.cardCompleted,
        ]}
      >

        <Pressable
          onPress={() => onToggle(item.id)}
          android_ripple={{ color: '#5B4BDB22' }}
          style={styles.metaContent}
        >

          <View
            style={[
              styles.checkbox,
              item.concluida && styles.checkboxCompleted,
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
                item.concluida && styles.metaTextCompleted,
              ]}
            >
              {item.texto}
            </Text>

            <Text style={styles.date}>
              Criada em{' '}
              {new Date(item.criadaEm).toLocaleDateString(
                'pt-BR'
              )}
            </Text>
          </View>

        </Pressable>

        <Pressable
          onPress={() => onDelete(item.id)}
          android_ripple={{ color: '#FF000022' }}
          style={styles.deleteButton}
        >
          <Text style={styles.deleteText}>
            ×
          </Text>
        </Pressable>

      </View>
    );
  }

  return (
    <FlatList
      data={metas}
      keyExtractor={(item) => item.id}
      renderItem={renderMeta}
      contentContainerStyle={styles.list}
      showsVerticalScrollIndicator={false}
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
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.08,
    shadowRadius: 6,

    elevation: 3,
  },

  cardCompleted: {
    opacity: 0.7,
  },

  metaContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
  },

  checkbox: {
    width: 28,
    height: 28,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#5B4BDB',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },

  checkboxCompleted: {
    backgroundColor: '#5B4BDB',
  },

  check: {
    color: '#FFFFFF',
    fontSize: 17,
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

  metaTextCompleted: {
    textDecorationLine: 'line-through',
    color: '#888888',
  },

  date: {
    marginTop: 5,
    fontSize: 11,
    color: '#999999',
  },

  deleteButton: {
    width: 38,
    height: 38,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },

  deleteText: {
    fontSize: 25,
    color: '#E05252',
    fontWeight: '300',
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