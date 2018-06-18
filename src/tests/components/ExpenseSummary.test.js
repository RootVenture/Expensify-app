import React from 'react';
import { shallow } from 'enzyme';
import { ExpenseSummary } from '../../components/ExpenseSummary';
import expenses from '../fixtures/expenses';

test('should render correctly with 1 expense', () => {
  const wrapper = shallow(<ExpenseSummary />);
  wrapper.setProps({
    expenseCount: 1,
    expensesTotal: 234,
  });

  expect(wrapper).toMatchSnapshot();
});

test('should render correctly with multiple expenses', () => {
  const wrapper = shallow(<ExpenseSummary />);
  wrapper.setProps({
    eexpenseCount: 2,
    expensesTotal: 345678,
  });

  expect(wrapper).toMatchSnapshot();
});
