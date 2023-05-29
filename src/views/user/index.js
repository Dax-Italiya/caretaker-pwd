import React, { Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import UserLayout from 'layout/UserLayout';
import { ROUTES } from 'utils/Route';
import SignUp from './register';
import ForgetPassword from './forget-password';
import UpdatePassword from './update-password';

const Login = React.lazy(() =>
  import(/* webpackChunkName: "user-login" */ './login')
);

const User = ({ match }) => {
  // console.log(match);

  // const isLogin = authStorage.getAuthToken();
  // console.log(isLogin);

  // if (isLogin || true) {
  //   console.log('in');
  //   return <Redirect exact from={`${match.url}/`} to={`${ROUTES.DOCTOR}`} />;
  // }

  return (
    <UserLayout>
      <Suspense fallback={<div className="loading" />}>
        <Switch>
          <Redirect exact from={`${match.url}/`} to={`${match.url}/login`} />
          <Route
            exact
            path={`${match.url}/login`}
            render={(props) => <Login {...props} />}
          />
          <Route
            exact
            path={`${match.url}${ROUTES.REGISTER}`}
            render={(props) => <SignUp {...props} />}
          />
          <Route
            exact
            path={`${match.url}${ROUTES.FORGOT_PASSWORD}`}
            render={(props) => <ForgetPassword {...props} />}
          />
          <Route
            exact
            path={`${match.url}${ROUTES.UPDATE_PASSWORD}`}
            render={(props) => <UpdatePassword {...props} />}
          />
          <Redirect to="/error" />
        </Switch>
      </Suspense>
    </UserLayout>
  );
};

export default User;
