import { createStore, combineReducers } from 'redux';
import uuid from 'uuid';

// ADD_EXPENSE
const addExpense = ({ description = '', note = '', amount = 0, created = 0 } = {}) => ({
  type: 'ADD_EXPENSE',
  expense: {
    id: uuid(),
    description,
    note,
    amount,
    created,
  },
});

// REMOVE_EXPENSE
const removeExpense = ({ id } = {}) => ({
  type: 'REMOVE_EXPENSE',
  id,
});

// EDIT_EXPENSE
const editExpense = (id, updates) => ({
  type: 'EDIT_EXPENSE',
  id,
  updates,
});

// SET_TEXT_FILTER
const setTextFilter = (filter = '') => ({
  type: 'SET_TEXT_FILTER',
  filter,
});

// SORT_BY_DATE
const sortByDate = () => ({
  type: 'SORT_BY_DATE',
});

// SORT_BY_AMOUNT
const sortByAmount = () => ({
  type: 'SORT_BY_AMOUNT',
});

// SET_START_DATE
const setStartDate = (startDate = undefined) => ({
  type: 'SET_START_DATE',
  startDate,
});

// SET_END_DATE
const setEndDate = (endDate = undefined) => ({
  type: 'SET_END_DATE',
  endDate,
});

// Expenses Reducer
const expensesReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_EXPENSE':
      return [...state, action.expense];
    case 'REMOVE_EXPENSE':
      return state.filter(({ id }) => id !== action.id);
    case 'EDIT_EXPENSE':
      return state.map(expense => {
        if (expense.id === action.id) {
          return {
            ...expense,
            ...action.updates,
          };
        }
        return expense;
      });
    default:
      return state;
  }
};

// Filters Reducer
const filtersDefault = {
  text: '',
  sort: 'date',
  startDate: undefined,
  endDate: undefined,
};

const filtersReducer = (state = filtersDefault, action) => {
  switch (action.type) {
    case 'SET_TEXT_FILTER':
      return { ...state, text: action.filter };
    case 'SORT_BY_DATE':
      return { ...state, sort: 'date' };
    case 'SORT_BY_AMOUNT':
      return { ...state, sort: 'amt' };
    case 'SET_START_DATE':
      return { ...state, startDate: action.startDate };
    case 'SET_END_DATE':
      return { ...state, endDate: action.endDate };
    default:
      return state;
  }
};
// timestamps (ms)
// January 1st 1970 (unix epoch)
// 33400, 10, -203

// Filter for expenses
const getExpenses = (expenses, { text, sort, startDate, endDate }) =>
  expenses
    .filter(expense => {
      const startDateMatch = typeof startDate !== 'number' || expense.created >= startDate;
      const endDateMatch = typeof endDate !== 'number' || expense.created <= endDate;

      // figure out if expenses.description as the text variable string inside of it
      const textMatch =
        typeof text !== 'string' || expense.description.toLowerCase().includes(text.toLowerCase());

      return startDateMatch && endDateMatch && textMatch;
    })
    .sort((a, b) => {
      if (sort === 'date') {
        return a.created < b.created ? 1 : -1;
      } else if ((sort = 'amt')) {
        // expensive first
        return a.amount < b.amount ? 1 : -1;
      }
    });

// Store creation
const store = createStore(combineReducers({ expenses: expensesReducer, filters: filtersReducer }));

store.subscribe(() => {
  const state = store.getState();
  const visible = getExpenses(state.expenses, state.filters);
  console.log(visible);
});

const expenseOne = store.dispatch(
  addExpense({ description: 'Rent', amount: 100, created: -21000 })
);
const expenseTwo = store.dispatch(
  addExpense({ description: 'Coffee', amount: 300, created: -1000 })
);
// Update expenses
// store.dispatch(removeExpense({ id: expenseOne.expense.id }));
// store.dispatch(editExpense(expenseTwo.expense.id, { amount: 500 }));

// // Update filters
// store.dispatch(setTextFilter('ffe'));
store.dispatch(sortByAmount());
// store.dispatch(sortByDate());
// store.dispatch(setStartDate(1250));
// store.dispatch(setStartDate());
// store.dispatch(setEndDate(999));
// store.dispatch(setEndDate());

const demo = {
  expenses: [
    {
      id: '123',
      description: 'January Rent',
      note: 'This was the final payment.',
      amount: 54500,
      created: 0,
    },
  ],
  filters: {
    text: 'rent',
    sort: 'date', // or amount
    startDate: undefined,
    endDate: undefined,
  },
};
