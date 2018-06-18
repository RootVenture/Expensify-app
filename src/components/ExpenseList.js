import React from 'react';
import { connect } from 'react-redux';
import ExpenseListItem from './ExpenseListItem';
import getExpenses from '../selectors/expenses';

// export unconnected for test cases
export const ExpenseList = props => (
  <div>
    <h1>Expenses</h1>
    {props.expenses.length === 0 ? (
      <p>No expenses yet!</p>
    ) : (
      props.expenses.map(expense => <ExpenseListItem key={expense.id} {...expense} />)
    )}
  </div>
);

// utilize our selector for mapstatetoprops
const mapStateToProps = state => ({
  expenses: getExpenses(state.expenses, state.filters),
});

export default connect(mapStateToProps)(ExpenseList);
