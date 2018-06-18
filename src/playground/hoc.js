// Higher Order Component (HOC) - Component that renders another component
// Reuse Code
// Render hijacking
// Prop manipulation
// Abstract State

import React from 'react';
import ReactDOM from 'react-dom';

const Info = props => (
  <div>
    <h1>Info</h1>
    <p>The info is: {props.info}</p>
  </div>
);

const withAdminWarning = WrappedComponent => props => (
  <div>
    {props.isAdmin && <p>This is private. Do not share.</p>}
    <WrappedComponent {...props} />
  </div>
);

// requireAuthentication
const requireAuthentication = WrappedComponent => props => (
  <div>{props.isAuth ? <WrappedComponent {...props} /> : <p>Please Login to see the info</p>}</div>
);

const AdminInfo = withAdminWarning(Info);
const AuthInfo = requireAuthentication(Info);

// ReactDOM.render(
// 	<AdminInfo isAdmin info="There are the details" />,
// 	document.getElementById("app")
// );
ReactDOM.render(<AuthInfo isAuth info="There are the details" />, document.getElementById('app'));
