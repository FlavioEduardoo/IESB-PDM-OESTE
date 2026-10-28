import { createContext, useContext, useReducer, useEffect, useState, useCallback, useMemo } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@expenses';

const ExpensesContext = createContext(null);

// Sempre retorna um NOVO array (sem push/splice/mutação)
function expensesReducer(state, action) {
    switch (action.type) {
        case 'ADD':
            return [action.payload, ...state];

        case 'UPDATE':
            return state.map((expense) =>
                expense.id === action.payload.id
                    ? { ...expense, ...action.payload.data }
                    : expense
            );

        case 'DELETE':
            return state.filter((expense) => expense.id !== action.payload);

        case 'SET':
            return action.payload;

        default:
            return state;
    }
}

export function ExpensesContextProvider({ children }) {
    const [expenses, dispatch] = useReducer(expensesReducer, []);
    const [isLoaded, setIsLoaded] = useState(false);

    // Carrega os dados salvos ao iniciar
    useEffect(() => {
        async function loadExpenses() {
            try {
                const json = await AsyncStorage.getItem(STORAGE_KEY);

                if (json) {
                    const saved = JSON.parse(json).map((expense) => ({
                        ...expense,
                        date: new Date(expense.date), // JSON guarda a data como texto
                    }));
                    dispatch({ type: 'SET', payload: saved });
                }
            } catch (error) {
                console.log('Erro ao carregar despesas:', error);
            } finally {
                setIsLoaded(true);
            }
        }

        loadExpenses();
    }, []);

    // Salva a cada alteração (só depois de carregar, para não apagar os dados salvos)
    useEffect(() => {
        if (!isLoaded) return;

        async function saveExpenses() {
            try {
                await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
            } catch (error) {
                console.log('Erro ao salvar despesas:', error);
            }
        }

        saveExpenses();
    }, [expenses, isLoaded]);

    const addExpense = useCallback((data) => {
        const id = Date.now().toString() + Math.random().toString(36).slice(2, 7);
        dispatch({ type: 'ADD', payload: { ...data, id } });
    }, []);

    const updateExpense = useCallback((id, data) => {
        dispatch({ type: 'UPDATE', payload: { id, data } });
    }, []);

    const deleteExpense = useCallback((id) => {
        dispatch({ type: 'DELETE', payload: id });
    }, []);

    const value = useMemo(
        () => ({ expenses, addExpense, updateExpense, deleteExpense }),
        [expenses, addExpense, updateExpense, deleteExpense]
    );

    return <ExpensesContext.Provider value={value}>{children}</ExpensesContext.Provider>;
}

export function useExpenses() {
    const context = useContext(ExpensesContext);

    if (!context) {
        throw new Error('useExpenses deve ser usado dentro de um ExpensesContextProvider.');
    }

    return context;
}