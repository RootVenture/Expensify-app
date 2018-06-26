import React from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import { startRemoveExpense } from '../actions/expenses';
import { history } from '../routers/AppRouter';

const ConfirmModal = props => {
  const removeExpense = () => {
    props.startRemoveExpense({ id: props.expense.id });

    // redirect to dashboard
    history.push('/');
  };
  return (
    <Modal
      isOpen={props.isOpen}
      onRequestClose={props.handleModalClose}
      contentLabel="Selected Option"
      closeTimeoutMS={200}
      className="modal"
    >
      <div className="modal__content">
        <h3>Are you sure you want to delete?</h3>
        <div className="modal__options">
          <button className="button" onClick={removeExpense}>
            Confirm
          </button>
          <button className="button button--secondary" onClick={props.handleModalClose}>
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
};

const mapDispatchToProps = dispatch => ({
  startRemoveExpense: id => dispatch(startRemoveExpense(id)),
});
export default connect(undefined, mapDispatchToProps)(ConfirmModal);
