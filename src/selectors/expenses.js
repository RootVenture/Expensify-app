import moment from 'moment';
// Filter for expenses
const getExpenses = (expenses, { text, sort, startDate, endDate }) =>
  expenses
    .filter(expense => {
      const createdAtMoment = moment(expense.created);
      const startDateMatch = startDate ? startDate.isSameOrBefore(createdAtMoment, 'day') : true;
      const endDateMatch = endDate ? endDate.isSameOrAfter(expense.created) : true;

      // figure out if expenses.description as the text variable string inside of it
      const textMatch =
        typeof text !== 'string' || expense.description.toLowerCase().includes(text.toLowerCase());

      return startDateMatch && endDateMatch && textMatch;
    })
    .sort((a, b) => {
      if (sort === 'date') {
        return a.created < b.created ? 1 : -1;
      } else if ((sort = 'amount')) {
        // expensive first
        return a.amount < b.amount ? 1 : -1;
      }
    });

export default getExpenses;
