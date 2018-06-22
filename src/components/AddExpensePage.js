import React, { Component } from 'react';
import ExpenseForm from './ExpenseForm';
import { connect } from 'react-redux';
import { startAddExpense } from '../actions/expenses';

export class AddExpensePage extends Component {
  onSubmit = expense => {
    this.props.startAddExpense(expense);
    // redirect to our dashboard after submit
    this.props.history.push('/');
  };

  render() {
    return (
      <div>
        <h1>Add Expense</h1>
        <ExpenseForm onSubmit={this.onSubmit} />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  startAddExpense: expense => dispatch(startAddExpense(expense)),
});

// need to connect store to access dispatch
export default connect(undefined, mapDispatchToProps)(AddExpensePage);
