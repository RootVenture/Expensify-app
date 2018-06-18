import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux';
import configureStore from './store/configureStore';
import 'normalize.css/normalize.css';
import '../src/styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';
import AppRouter from './routers/AppRouter';
import { addExpense, removeExpense, editExpense } from './actions/expenses';
import { setTextFilter } from './actions/filters';
import getExpenses from './selectors/expenses';

const store = configureStore();

// addExpense -> WaterBill
store.dispatch(
  addExpense({
    description: 'Water Bill',
    note: 'January Bill',
    amount: 30000,
    created: 10000,
  })
);
// addExpense -> GasBill
store.dispatch(
  addExpense({
    description: 'Gas Bill',
    note: 'January Bill',
    amount: 5000,
    created: 11000,
  })
);
store.dispatch(
  addExpense({
    description: 'Rent',
    note: 'December Bill',
    amount: 120000,
    created: 10600,
  })
);
// setTextFilter -> bill
// store.dispatch(setTextFilter('bill'));
// store.dispatch(setTextFilter('water'));

// getExpenses;
// store.subscribe(() => {
const state = store.getState();
const visible = getExpenses(state.expenses, state.filters);
// });

const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

ReactDOM.render(jsx, document.querySelector('#app'));
