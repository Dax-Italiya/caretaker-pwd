import React, { Suspense } from 'react';
import { Route, withRouter, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import ALL_ROUTES  from 'utils/Route';
import AppLayout from 'layout/AppLayout';

const App = ({ match }) => {
  return (
    <AppLayout>
      <div className="directory-wrapper">
        <Suspense fallback={<div className="loading" />}>
          <Switch>
            {ALL_ROUTES.map((route) => {
              // console.log(route)
              return (
                <Route
                  path={`${match.url}${route.path}`}
                  render={(props) => <route.component {...props} />}
                  exact={route.exact}
                  key={route.path}
                />
              );
            })}
            <Redirect to="/error" />
          </Switch>
        </Suspense>
      </div>
    </AppLayout>
  );
};

const mapStateToProps = ({ menu }) => {
  const { containerClassnames } = menu;
  return { containerClassnames };
};

export default withRouter(connect(mapStateToProps, {})(App));
