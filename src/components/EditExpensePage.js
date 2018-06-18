import React, { Component } from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import { editExpense, removeExpense } from '../actions/expenses';

export class EditExpensePage extends Component {
  onSubmit = expense => {
    this.props.editExpense(this.props.expense.id, expense);

    // redirect to dashboard
    this.props.history.push('/');
  };

  onClick = id => {
    this.props.removeExpense({ id: this.props.expense.id });

    // redirect to dashboard
    this.props.history.push('/');
  };
  render() {
    return (
      <div>
        <h3>{this.props.expense.id}</h3>
        <ExpenseForm expense={this.props.expense} onSubmit={this.onSubmit} />
        <button onClick={this.onClick}>Remove</button>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  expense: state.expenses.find(expense => expense.id === props.match.params.id),
});

const mapDispatchToProps = dispatch => ({
  editExpense: (id, expense) => dispatch(editExpense(id, expense)),
  removeExpense: id => dispatch(removeExpense(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage);
