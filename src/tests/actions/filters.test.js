import {
  setStartDate,
  setEndDate,
  setTextFilter,
  sortByDate,
  sortByAmount,
} from '../../actions/filters';
import moment from 'moment';

test('should generate setStartDate action object', () => {
  const action = setStartDate(moment(0));

  expect(action).toEqual({
    type: 'SET_START_DATE',
    startDate: moment(0),
  });
});

test('should generate setEndDate action object', () => {
  const action = setEndDate(moment(1000));

  expect(action).toEqual({
    type: 'SET_END_DATE',
    endDate: moment(1000),
  });
});

test('should generate sortByDate action object', () => {
  const action = sortByDate();

  expect(action).toEqual({
    type: 'SORT_BY_DATE',
  });
});

test('should generate sortByAmount action object', () => {
  const action = sortByAmount();

  expect(action).toEqual({
    type: 'SORT_BY_AMOUNT',
  });
});

test('should generate setTextFilter action object with no params', () => {
  const action = setTextFilter();

  expect(action).toEqual({
    type: 'SET_TEXT_FILTER',
    filter: '',
  });
});

test('should generate setTextFilter action object with filter "Bill"', () => {
  const action = setTextFilter('Bill');

  expect(action).toEqual({
    type: 'SET_TEXT_FILTER',
    filter: 'Bill',
  });
});
