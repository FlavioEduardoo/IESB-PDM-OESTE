import { View, Text, Pressable, StyleSheet, useColorScheme } from 'react-native';
import { CATEGORIES } from '../../constants/categories';
import { getColors } from '../../constants/theme';

// selected === '' significa "Todas"
function FiltroCategoria({ selected, onSelect }) {
    const colors = getColors(useColorScheme());
    const options = ['', ...CATEGORIES];

    return (
        <View style={styles.container}>
            {options.map((cat) => {
                const active = selected === cat;

                return (
                    <Pressable
                        key={cat || 'todas'}
                        onPress={() => onSelect(cat)}
                        style={[
                            styles.chip,
                            { backgroundColor: active ? colors.primary : colors.tag },
                        ]}
                    >
                        <Text style={{ color: active ? colors.onPrimary : colors.tagText }}>
                            {cat || 'Todas'}
                        </Text>
                    </Pressable>
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flexDirection: 'row', flexWrap: 'wrap', marginHorizontal: 8 },
    chip: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        margin: 4,
        borderRadius: 16,
    },
});

export default FiltroCategoria;