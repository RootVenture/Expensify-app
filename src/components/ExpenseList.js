import React from 'react';
import { connect } from 'react-redux';
import ExpenseListItem from './ExpenseListItem';
import getExpenses from '../selectors/expenses';

// export unconnected for test cases
export const ExpenseList = props => (
  <div className="content-container">
    <div className="list-header">
      <div className="show-for-mobile">Expenses</div>
      <div className="show-for-desktop">Expense</div>
      <div className="show-for-desktop">Amount</div>
    </div>
    <div className="list-body">
      {props.expenses.length === 0 ? (
        <div>
          <span className="list-item list-item--message">No expenses yet!</span>
        </div>
      ) : (
        props.expenses.map(expense => <ExpenseListItem key={expense.id} {...expense} />)
      )}
    </div>
  </div>
);

// utilize our selector for mapstatetoprops
const mapStateToProps = state => ({
  expenses: getExpenses(state.expenses, state.filters),
});

export default connect(mapStateToProps)(ExpenseList);
