import expensesReducer from '../../reducers/expenses';
import expenses from '../fixtures/expenses';
import moment from 'moment';

test('should set default state', () => {
  const state = expensesReducer(undefined, { type: '@@INIT' });

  expect(state).toEqual([]);
});

test('should remove expense by id', () => {
  const action = { type: 'REMOVE_EXPENSE', id: expenses[1].id };

  const state = expensesReducer(expenses, action);

  expect(state).toEqual([expenses[0], expenses[2]]);
});

test('should not remove expense if id not found', () => {
  const action = { type: 'REMOVE_EXPENSE', id: '-1' };

  const state = expensesReducer(expenses, action);

  expect(state).toEqual(expenses);
});

test('should add expense', () => {
  const expense = {
    id: '3',
    description: 'Chicken Wings',
    note: '',
    amount: 1095,
    created: moment(),
  };

  const state = expensesReducer(expenses, { type: 'ADD_EXPENSE', expense });

  expect(state).toEqual([...expenses, expense]);
});

test('should edit expense by id', () => {
  const updates = {
    id: expenses[2].id,
    amount: 9999,
  };

  const state = expensesReducer(expenses, {
    type: 'EDIT_EXPENSE',
    id: updates.id,
    updates,
  });

  expect(state[2].amount).toBe(9999);
});

test('should edit expense by id', () => {
  const updates = {
    id: '-111',
    amount: 9999,
  };

  const state = expensesReducer(expenses, {
    type: 'EDIT_EXPENSE',
    id: updates.id,
    updates,
  });

  expect(state).toEqual(state);
});

test('should set expenses', () => {
  const action = {
    type: 'SET_EXPENSES',
    expenses: [expenses[1]],
  };
  // even though called with every expense, will only have expenses[1] due to set expense action
  const state = expensesReducer(expenses, action);

  expect(state).toEqual([expenses[1]]);
});
