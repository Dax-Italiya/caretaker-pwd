import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({
  component: Component,
  condition,
  redirectTo = '/user/login',
  ...rest
}) => {
  const setComponent = (props) => {
    if (condition) {
      return <Component {...props} />;
    }
    return (
      <Redirect
        to={{
          pathname: redirectTo,
          state: { from: props.location },
        }}
      />
    );
  };

  return <Route {...rest} render={setComponent} />;
};
// eslint-disable-next-line import/prefer-default-export
export { ProtectedRoute };
