import React, { Component } from 'react';
import { connect } from 'react-redux';
import numeral from 'numeral';
import { Link } from 'react-router-dom';
import selectExpensesTotal from '../selectors/expenses-total';
import getExpenses from '../selectors/expenses';

export class ExpenseSummary extends Component {
  render() {
    return (
      <div className="page-header">
        <div className="content-container">
          <h1 className="page-header__title">
            Viewing <span>{this.props.expenseCount}</span>
            {this.props.expenseCount === 1 ? ' expense ' : ' expenses '}
            totaling <span>{numeral(this.props.expensesTotal / 100).format('$0,0.00')}</span>
          </h1>
          <div className="page-header__actions">
            <Link className="button" to="/create">
              Add Expense
            </Link>
          </div>
        </div>
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
