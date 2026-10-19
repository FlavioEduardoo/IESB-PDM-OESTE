import { StatusBar } from 'expo-status-bar';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import DespesasRecentes from './src/screens/DespesasRecentes';
import TodasDespesas from './src/screens/TodasDespesas';
import GerenciarDespesa from './src/screens/GerenciarDespesa';

import IconButton from './src/components/IconButton';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function BottomTabScreen({ navigation }) {

    return (
        <Tab.Navigator
            screenOptions={({ navigation }) => ({
                tabBarLabelStyle: {
                    fontSize: 12
                },

                headerRight: ({ tintColor }) => (
                    <IconButton
                        icon="add"
                        size={28}
                        color={tintColor}
                        onPress={() =>
                            navigation
                                .getParent()
                                ?.navigate('GerenciarDespesa')
                        }
                    />
                ),
            })}
        >

            <Tab.Screen
                name="DespesasRecentes"
                component={DespesasRecentes}
                options={{
                    title: 'Despesas Recentes',
                    tabBarLabel: 'Recentes',

                    tabBarIcon: ({ color, size }) => (
                        <Ionicons
                            name="hourglass"
                            size={size}
                            color={color}
                        />
                    ),
                }}
            />

            <Tab.Screen
                name="TodasDespesas"
                component={TodasDespesas}
                options={{
                    title: 'Todas as Despesas',
                    tabBarLabel: 'Todas',

                    tabBarIcon: ({ color, size }) => (
                        <Ionicons
                            name="wallet-outline"
                            size={size}
                            color={color}
                        />
                    ),
                }}
            />

        </Tab.Navigator>
    );
}

export default function App() {

    return (
        <>
            <StatusBar style="auto" />

            <NavigationContainer>

                <Stack.Navigator>

                    <Stack.Screen
                        name="Despesas"
                        component={BottomTabScreen}
                        options={{
                            headerShown: false
                        }}
                    />

                    <Stack.Screen
                        name="GerenciarDespesa"
                        component={GerenciarDespesa}
                        options={{
                            title: 'Gerenciar Despesa'
                        }}
                    />

                </Stack.Navigator>

            </NavigationContainer>
        </>
    );
}