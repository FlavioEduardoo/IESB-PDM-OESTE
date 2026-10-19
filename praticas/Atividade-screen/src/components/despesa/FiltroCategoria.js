import { View, Text, Pressable, StyleSheet } from 'react-native';
import { CATEGORIAS } from '../../constants/categorias';

// categoriaSelecionada === '' significa "Todas"
function FiltroCategoria({ categoriaSelecionada, onSelecionar }) {
    const opcoes = ['', ...CATEGORIAS];

    return (
        <View style={styles.container}>
            {opcoes.map((cat) => {
                const ativa = categoriaSelecionada === cat;

                return (
                    <Pressable
                        key={cat || 'todas'}
                        onPress={() => onSelecionar(cat)}
                        style={[styles.chip, ativa && styles.chipAtivo]}
                    >
                        <Text style={ativa && styles.textoAtivo}>
                            {cat || 'Todas'}
                        </Text>
                    </Pressable>
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        margin: 8,
    },

    chip: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        margin: 4,
        borderRadius: 16,
        backgroundColor: '#e8e8e8',
        borderWidth: 1,
        borderColor: '#bbb',
    },

    chipAtivo: {
        backgroundColor: '#3e04c3',
        borderColor: '#3e04c3',
    },

    textoAtivo: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default FiltroCategoria;