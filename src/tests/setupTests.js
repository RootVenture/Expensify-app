import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import DotEnv from 'dotenv';

Enzyme.configure({
  adapter: new Adapter(),
});

// this file is necessary to add support for react 16
DotEnv.config({ path: '.env.test' });
