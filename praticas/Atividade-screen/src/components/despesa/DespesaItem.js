import { View, Text, Pressable, StyleSheet, Platform, useColorScheme } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getColors } from '../../constants/theme';

function getDataFormatada(data){
    return data.getDate() + '/' + (data.getMonth() + 1) + '/' + data.getFullYear();
}

function DespesaItem({ item }){
    const navigation = useNavigation();
    const colors = getColors(useColorScheme());

    return (
        <Pressable
            onPress={() => navigation.navigate('GerenciarDespesa', { expenseId: item.id })}
            style={({ pressed }) => pressed && styles.pressed}
        >
            <View style={[styles.itemContainer, { backgroundColor: colors.card }]}>
                <View style={styles.itemText}>
                    <Text style={{ color: colors.text }}>{getDataFormatada(item.date)}</Text>

                    <View style={[styles.categoryTag, { backgroundColor: colors.tag }]}>
                        <Text style={[styles.categoryText, { color: colors.tagText }]}>
                            {item.category}
                        </Text>
                    </View>
                </View>

                <View style={styles.itemText}>
                    <Text style={{ color: colors.text }}>{item.description}</Text>
                </View>

                <View style={styles.itemText}>
                    <Text style={{ color: colors.text, fontWeight: 'bold' }}>
                        R$ {item.amount.toFixed(2)}
                    </Text>
                </View>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    itemContainer: {
        flex: 1,
        padding: 8,
        marginVertical: 6,
        marginHorizontal: 8,
        borderRadius: 8,
        flexDirection: 'row',
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.25,
                shadowRadius: 4,
            },
            android: {
                elevation: 4,
            },
            default: {
                boxShadow: '0px 2px 4px rgba(0,0,0,0.25)',
            },
        }),
    },

    itemText: {
        flex: 1,
        padding: 2,
        marginVertical: 2,
        marginHorizontal: 2,
    },

    categoryTag: {
        alignSelf: 'flex-start',
        marginTop: 4,
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 12,
    },

    categoryText: {
        fontSize: 11,
    },

    pressed: {
        opacity: 0.7,
    },
});

export default DespesaItem;