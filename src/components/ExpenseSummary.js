import React, { Component } from 'react';
import { connect } from 'react-redux';
import numeral from 'numeral';

import selectExpensesTotal from '../selectors/expenses-total';
import getExpenses from '../selectors/expenses';

export class ExpenseSummary extends Component {
  render() {
    return (
      <div>
        <h3>
          Viewing {this.props.expenseCount}{' '}
          {this.props.expenseCount === 1 ? ' expense ' : ' expenses '}
          totaling {numeral(this.props.expensesTotal / 100).format('$0,0.00')}
        </h3>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const visibleExpenses = getExpenses(state.expenses, state.filters);
  return {
    expenseCount: visibleExpenses.length,
    expensesTotal: selectExpensesTotal(visibleExpenses),
  };
};

export default connect(mapStateToProps)(ExpenseSummary);
