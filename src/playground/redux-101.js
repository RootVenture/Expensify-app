import { createStore } from 'redux';

// action creator
const incrementCount = ({ val = 1 } = {}) => ({
  type: 'INCREMENT',
  val,
});

const decrementCount = ({ val = 1 } = {}) => ({
  type: 'DECREMENT',
  val,
});

const setCount = ({ val }) => ({
  type: 'SET',
  val,
});

const resetCount = () => ({
  type: 'RESET',
});

// Reducers
// 1. Reducers are pure functions - DO NOT MODIFY ANYTHING OUTSIDE OF SCOPE
// 2. Never change state or action

const countReducer = (state = { count: 0 }, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return {
        count: state.count + action.incrementCount,
      };
    case 'DECREMENT':
      return {
        count: state.count - action.decrementCount,
      };
    case 'RESET':
      return {
        count: 0,
      };
    case 'SET':
      return {
        count: action.setCount,
      };
    default:
      return state;
  }
};

const store = createStore(countReducer);

// watch for store state changes
const unsubscribe = store.subscribe(() => {
  console.log(store.getState());
});

// Actions
store.dispatch(incrementCount({ val: 5 }));
store.dispatch(decrementCount({ val: 15 }));
store.dispatch(setCount({ val: 101 }));
store.dispatch(resetCount({ val: 0 }));
// store.dispatch({
//   type: 'INCREMENT',
//   val: 5,
// });

// // cancel our subscription
// // unsubscribe();

// store.dispatch({
//   type: 'INCREMENT',
//   val: 5,
// });

// store.dispatch({
//   type: 'DECREMENT',
//   val: 10,
// });

// store.dispatch({
//   type: 'DECREMENT',
// });

// store.dispatch({
//   type: 'RESET',
// });

// store.dispatch({
//   type: 'SET',
//   count: 101,
// });
