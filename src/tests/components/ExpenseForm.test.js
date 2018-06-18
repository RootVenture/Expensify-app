import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment';
import ExpenseForm from '../../components/ExpenseForm';
import expenses from '../fixtures/expenses';

test('should render ExpenseForm correctly', () => {
  const wrapper = shallow(<ExpenseForm />);
  expect(wrapper).toMatchSnapshot();
});

test('should render ExpenseForm with Expense Data', () => {
  const wrapper = shallow(<ExpenseForm expense={expenses[0]} />);
  expect(wrapper).toMatchSnapshot();
});

test('should render ExpenseForm with Error if improperly submitted', () => {
  const wrapper = shallow(<ExpenseForm />);

  expect(wrapper).toMatchSnapshot();
  wrapper.find('form').simulate('submit', {
    // need to simulate e.preventDefault();
    preventDefault: () => {},
  });

  expect(wrapper.state('error').length).toBeGreaterThan(0);

  expect(wrapper).toMatchSnapshot();
});

test('should set description on input change', () => {
  const value = 'New Description';
  const wrapper = shallow(<ExpenseForm />);
  wrapper
    .find('input')
    .at(0)
    .simulate('change', {
      target: {
        value,
      },
    });

  expect(wrapper.state('description')).toBe(value);
});

test('should set note on note change', () => {
  const value = 'New Text Area Note';
  const wrapper = shallow(<ExpenseForm />);
  wrapper.find('textarea').simulate('change', {
    target: {
      value,
    },
  });

  expect(wrapper.state('note')).toBe(value);
});

test('should set amount if valid input', () => {
  const value = '23.50';
  const wrapper = shallow(<ExpenseForm />);
  wrapper
    .find('input')
    .at(1)
    .simulate('change', {
      target: {
        value,
      },
    });

  expect(wrapper.state('amount')).toBe(value);
});

test('should not set amount if invalid input', () => {
  const value = '23.2.2';
  const wrapper = shallow(<ExpenseForm />);
  wrapper
    .find('input')
    .at(1)
    .simulate('change', {
      target: {
        value,
      },
    });

  expect(wrapper.state('amount')).toBe('');
});

test('should call onSubmit prop for valid form submission', () => {
  // can simulate for
  const onSubmitSpy = jest.fn();

  // note how we inject our spy
  const wrapper = shallow(<ExpenseForm expense={expenses[0]} onSubmit={onSubmitSpy} />);

  wrapper.find('form').simulate('submit', {
    preventDefault: () => {},
  });
  // ensure it was submitted properly
  expect(wrapper.state('error')).toBe('');

  // ensure arguments were passed in
  expect(onSubmitSpy).toHaveBeenLastCalledWith({
    description: expenses[0].description,
    amount: expenses[0].amount,
    note: expenses[0].note,
    created: expenses[0].created,
  });
});

test('should set new date onDateChange', () => {
  const now = moment();
  const wrapper = shallow(<ExpenseForm />);

  wrapper.find('withStyles(SingleDatePicker)').prop('onDateChange')(now);
  expect(wrapper.state('created')).toEqual(now);
});

test('should set new focus', () => {
  const wrapper = shallow(<ExpenseForm />);

  wrapper.find('withStyles(SingleDatePicker)').prop('onFocusChange')({
    focused: true,
  });
  expect(wrapper.state('calendarFocused')).toBe(true);
});
