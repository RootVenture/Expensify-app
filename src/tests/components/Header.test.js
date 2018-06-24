// import ReactShallowRenderer from 'react-test-renderer/shallow';
import React from 'react';
import { shallow } from 'enzyme';
import { Header } from '../../components/Header';

let startLogout;
let wrapper;

beforeEach(() => {
  startLogout = jest.fn();
  wrapper = shallow(<Header startLogout={startLogout} />);
});
test('should render header correctly', () => {
  expect(wrapper).toMatchSnapshot();
  // example tests
  // expect(wrapper.find('h1').length).toBe(1);
  // expect(wrapper.find('h1').text()).toBe('Expensify');
});

test('should call startLogout on button click', () => {
  wrapper.find('button').simulate('click');

  expect(startLogout).toHaveBeenCalled();
});
