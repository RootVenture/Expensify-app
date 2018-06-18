const selectExpensesTotal = expenses => {
  if (expenses.length === 0) {
    return 0;
  } else if (expenses.length === 1) {
    return expenses[0].amount;
  }

  const total = expenses.map(expense => expense.amount).reduce((acc, curr) => (acc += curr), 0);

  return total;
};

export default selectExpensesTotal;
