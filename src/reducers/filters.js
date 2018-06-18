import moment from 'moment';

// Filters Reducer
const filtersDefault = {
  text: '',
  sort: 'date',
  startDate: moment().startOf('month'),
  endDate: moment().endOf('month'),
};

const filtersReducer = (state = filtersDefault, action) => {
  switch (action.type) {
    case 'SET_TEXT_FILTER':
      return { ...state, text: action.filter };
    case 'SORT_BY_DATE':
      return { ...state, sort: 'date' };
    case 'SORT_BY_AMOUNT':
      return { ...state, sort: 'amount' };
    case 'SET_START_DATE':
      return { ...state, startDate: action.startDate };
    case 'SET_END_DATE':
      return { ...state, endDate: action.endDate };
    default:
      return state;
  }
};

export default filtersReducer;
