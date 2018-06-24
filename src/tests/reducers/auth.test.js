import authReducers from '../../reducers/auth';

test('should set default state', () => {
  const state = authReducers(undefined, { type: '@@INIT' });

  expect(state).toEqual({});
});

test('should set uid for login', () => {
  const action = { type: 'LOGIN', uid: '123abc' };

  const state = authReducers({}, action);

  expect(state.uid).toEqual(action.uid);
});

test('should clear uid for logout', () => {
  const action = { type: 'LOGOUT' };

  const state = authReducers({ uid: '123abc' }, action);

  expect(state).toEqual({});
});
