import React from 'react';
import { shallow } from 'enzyme';
import Spinner from '../../components/Spinner';

test('should render component Spinner', () => {
  const wrapper = shallow(<Spinner />);

  expect(wrapper).toMatchSnapshot();
});
