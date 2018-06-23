import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  addExpense,
  editExpense,
  removeExpense,
  startAddExpense,
  setExpenses,
  startSetExpenses,
  startRemoveExpense,
} from '../../actions/expenses';
import expenses from '../fixtures/expenses';
import database from '../../firebase/firebase';

const createMockStore = configureMockStore([thunk]);

beforeEach(done => {
  const expensesData = {};
  expenses.forEach(({ id, description, note, amount, created }) => {
    expensesData[id] = { description, note, amount, created };
  });
  database
    .ref('expenses')
    .set(expensesData)
    .then(() => {
      done();
    });
});

test('Should setup remove expense action object', () => {
  const action = removeExpense({ id: '123abc' });

  expect(action).toEqual({
    type: 'REMOVE_EXPENSE',
    id: '123abc',
  });
});

test('Should remove expense from firebase', done => {
  const store = createMockStore({});
  const { id } = expenses[2];

  store
    .dispatch(startRemoveExpense({ id }))
    .then(() => {
      const actions = store.getActions();

      expect(actions[0]).toEqual({
        type: 'REMOVE_EXPENSE',
        id,
      });
      return database.ref(`expenses/${id}`).once('value');
    })
    .then(snapshot => {
      expect(snapshot.val()).toBeFalsy();
      done();
    });
});

test('Should setup edit expense action object', () => {
  const action = editExpense('123abc', {
    note: 'New note value'
  });

  expect(action).toEqual({
    type: 'EDIT_EXPENSE',
    id: '123abc',
    updates: {
      note: 'New note value'
    },
  });
});

test('Should setup add expense action object with provided values', () => {
  const action = addExpense(expenses[2]);
  expect(action).toEqual({
    type: 'ADD_EXPENSE',
    expense: expenses[2],
  });
});

// test('Should setup add expense action object with default value', () => {
//   const action = addExpense();

//   expect(action).toEqual({
//     type: 'ADD_EXPENSE',
//     expense: {
//       id: expect.any(String),
//       description: '',
//       note: '',
//       amount: 0,
//       created: 0,
//     },
//   });
// });

// note the done argument for async tests
test('should add expense to database and store', done => {
  const store = createMockStore({});
  const expenseData = {
    description: 'Mouse',
    amount: 3000,
    note: 'Good Mouse',
    created: 1000,
  };
  store
    .dispatch(startAddExpense(expenseData))
    .then(() => {
      const actions = store.getActions();

      // ensure the action generator fired
      expect(actions[0]).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
          id: expect.any(String),
          ...expenseData,
        },
      });

      // ensure our database received the data
      return database.ref(`expenses/${actions[0].expense.id}`).once('value');
    })
    .then(snapshot => {
      expect(snapshot.val()).toEqual(expenseData);
      done();
    });
});

test('should add expense with defaults to database and store', done => {
  const store = createMockStore({});

  store
    .dispatch(startAddExpense())
    .then(() => {
      const actions = store.getActions();

      expect(actions[0]).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
          id: expect.any(String),
          description: '',
          note: '',
          amount: 0,
          created: 0,
        },
      });

      // returns a promise from firebase
      return database.ref(`expenses/${actions[0].expense.id}`).once('value');
    })
    .then(snapshot => {
      expect(snapshot.val()).toEqual({
        description: '',
        note: '',
        amount: 0,
        created: 0,
      });
      done();
    });
});

test('should set up set expense action object with data', () => {
  const action = setExpenses(expenses);

  expect(action).toEqual({
    type: 'SET_EXPENSES',
    expenses,
  });
});

test('should fetch the expenses from firebase', done => {
  // create our fake store
  const store = createMockStore({});

  // dispatch our fetch action
  store.dispatch(startSetExpenses()).then(() => {
    // get actions from the mock store after dispatching actionCreator
    const actions = store.getActions();

    expect(actions[0]).toEqual({
      type: 'SET_EXPENSES',
      expenses,
    });
    done();
  });
});
