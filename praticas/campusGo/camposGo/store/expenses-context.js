import { createContext, useContext, useState } from 'react';

const ExpensesContext = createContext({
  expenses: [],
  addExpense: () => {},
  removeExpense: () => {},
});

// Dados de exemplo (somam 32.50). Troque por [] se quiser começar vazio.
const INITIAL_EXPENSES = [
  { id: '1', description: 'Café', amount: 7.5 },
  { id: '2', description: 'Xerox', amount: 5 },
  { id: '3', description: 'Almoço', amount: 20 },
];

export function ExpensesContextProvider({ children }) {
  const [expenses, setExpenses] = useState(INITIAL_EXPENSES);

  function addExpense({ description, amount }) {
    const id = String(Date.now());
    setExpenses((current) => [
      ...current,
      { id, description, amount: Number(amount) || 0 },
    ]);
  }

  function removeExpense(id) {
    setExpenses((current) => current.filter((e) => e.id !== id));
  }

  return (
    <ExpensesContext.Provider value={{ expenses, addExpense, removeExpense }}>
      {children}
    </ExpensesContext.Provider>
  );
}

export function useExpenses() {
  return useContext(ExpensesContext);
}