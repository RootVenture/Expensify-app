import filtersReducer from '../../reducers/filters';
import moment from 'moment';

test('should setup default filter values', () => {
  const state = filtersReducer(undefined, {
    type: '@@INIT',
  });

  expect(state).toEqual({
    text: '',
    sort: 'date',
    startDate: moment().startOf('month'),
    endDate: moment().endOf('month'),
  });
});

test('should set sortBy to amount', () => {
  const state = filtersReducer(undefined, { type: 'SORT_BY_AMOUNT' });

  expect(state.sort).toBe('amount');
});

test('should set sortBy to date', () => {
  const state = filtersReducer(
    {
      text: '',
      sort: 'amount',
      startDate: undefined,
      endDate: undefined,
    },
    {
      type: 'SORT_BY_DATE',
    }
  );

  expect(state.sort).toBe('date');
});

test('should set text filter', () => {
  const state = filtersReducer(undefined, {
    type: 'SET_TEXT_FILTER',
    filter: 'Bill',
  });

  expect(state.text).toBe('Bill');
});

test('should set startDate filter', () => {
  const state = filtersReducer(undefined, { type: 'SET_START_DATE', startDate: moment(0) });

  expect(state.startDate).toEqual(moment(0));
});

test('should set endDate filter', () => {
  const state = filtersReducer(undefined, {
    type: 'SET_END_DATE',
    endDate: moment(0),
  });

  expect(state.endDate).toEqual(moment(0));
});
