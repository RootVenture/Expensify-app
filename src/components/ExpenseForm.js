import React, { Component } from 'react';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';
import 'react-dates/initialize';

// const now = moment();
// console.log(now.format('MMM Do, YYYY'));
class ExpenseForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      description: props.expense ? props.expense.description : '',
      note: props.expense ? props.expense.note : '',
      amount: props.expense ? (props.expense.amount / 100).toFixed(2).toString() : '',
      created: props.expense ? moment(props.expense.created) : moment(),
      calendarFocused: false,
      error: '',
    };
  }
  onDescriptionChange = e => {
    const description = e.target.value;
    this.setState(() => ({
      description,
    }));
  };

  onNoteChange = e => {
    const note = e.target.value;
    this.setState(() => ({ note }));
  };

  onAmountChange = e => {
    const amount = e.target.value;
    // regex to ensure user input is correct format
    if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
      this.setState(() => ({
        amount,
      }));
    }
  };

  onDateChange = created => {
    if (created) {
      this.setState(() => ({
        created,
      }));
    }
  };

  onFocusChange = ({ focused }) => {
    this.setState(() => ({
      calendarFocused: focused,
    }));
  };

  onFormSubmit = e => {
    e.preventDefault(); // prevent page refresh

    if (!this.state.description || !this.state.amount) {
      // set error state
      this.setState(() => ({
        error: 'Please provide description and amount',
      }));
    } else {
      // clear the error
      this.setState(() => ({
        error: '',
      }));
      this.props.onSubmit({
        description: this.state.description,
        // convert to cents
        amount: parseFloat(this.state.amount, 10) * 100,
        // take our moment obj and convert to ms
        created: this.state.created.valueOf(),
        note: this.state.note,
      });
    }
  };

  render() {
    return (
      <div>
        {this.state.error && <p>{this.state.error}</p>}
        ExpenseForm
        <form onSubmit={this.onFormSubmit}>
          <input
            type="text"
            placeholder="Description"
            autoFocus
            value={this.state.description}
            onChange={this.onDescriptionChange}
          />
          <input
            type="text"
            placeholder="Amount"
            value={this.state.amount}
            onChange={this.onAmountChange}
          />
          <SingleDatePicker
            date={this.state.created}
            onDateChange={this.onDateChange}
            focused={this.state.calendarFocused}
            onFocusChange={this.onFocusChange}
            numberOfMonths={1}
            // good for blocking days if booked
            isOutsideRange={day => false}
          />
          <textarea
            name="note"
            id="note"
            cols="30"
            rows="10"
            placeholder="Add a note for your expense (optional)"
            onChange={this.onNoteChange}
            value={this.state.note}
          />
          <button>Submit</button>
        </form>
      </div>
    );
  }
}

export default ExpenseForm;
