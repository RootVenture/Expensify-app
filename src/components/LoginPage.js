import React from 'react';
import { connect } from 'react-redux';
import { startGoogleLogin, startGithubLogin } from '../actions/auth';

export const LoginPage = ({ startGoogleLogin, startGithubLogin }) => (
  <div className="box-layout">
    <div className="box-layout__box">
      <h1 className="box-layout__title">EXPENSIFY</h1>
      <p>It's time to get your expenses under control</p>
      <button onClick={startGoogleLogin} className="button">
        Login with Google
      </button>
      <button onClick={startGithubLogin} className="button button--tertiary">
        Login with Github
      </button>
    </div>
  </div>
);

const mapDispatchToProps = dispatch => ({
  startGoogleLogin: () => dispatch(startGoogleLogin()),
  startGithubLogin: () => dispatch(startGithubLogin()),
});
export default connect(undefined, mapDispatchToProps)(LoginPage);
