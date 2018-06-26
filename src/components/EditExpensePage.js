import React, { Component } from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import { startEditExpense } from '../actions/expenses';
import ConfirmModal from './ConfirmModal';

export class EditExpensePage extends Component {
  state = {
    modalStatus: false,
  };

  onSubmit = expense => {
    this.props.startEditExpense(this.props.expense.id, expense);

    // redirect to dashboard
    this.props.history.push('/');
  };

  onClick = () => {
    this.setState(() => ({
      modalStatus: true,
    }));
  };

  handleModalClose = () => {
    this.setState(() => ({
      modalStatus: false,
    }));
  };

  render() {
    return (
      <div>
        <div className="page-header">
          <div className="content-container">
            <h1 className="page-title">{this.props.expense.description}</h1>
          </div>
        </div>
        <div className="content-container">
          <ExpenseForm expense={this.props.expense} onSubmit={this.onSubmit} />
          <button onClick={this.onClick} className="button button--secondary">
            Delete
          </button>
          <ConfirmModal
            expense={this.props.expense}
            isOpen={this.state.modalStatus}
            handleModalClose={this.handleModalClose}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  expense: state.expenses.find(expense => expense.id === props.match.params.id),
});

const mapDispatchToProps = dispatch => ({
  startEditExpense: (id, expense) => dispatch(startEditExpense(id, expense)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage);
