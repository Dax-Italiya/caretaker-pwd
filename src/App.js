import React, { Suspense, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
// import { Container, Spinner } from 'reactstrap';
import { IntlProvider } from 'react-intl';
import authStorage from 'utils/API/authStroge';
// import ColorSwitcher from './components/common/ColorSwitcher';
import { ROUTES } from 'utils/Route';

import { NotificationContainer } from './components/common/react-notifications';
import { adminRoot, loginRoot } from './constants/defaultValues';
import { getDirection } from './helpers/Utils';
import { ProtectedRoute } from './helpers/authHelper';
import AppLocale from './lang';

const ViewApp = React.lazy(() =>
  import(/* webpackChunkName: "views-app" */ './views/app')
);
const ViewUser = React.lazy(() =>
  import(/* webpackChunkName: "views-user" */ './views/user')
);
const ViewError = React.lazy(() =>
  import(/* webpackChunkName: "views-error" */ './views/error')
);
const ViewUnauthorized = React.lazy(() =>
  import(/* webpackChunkName: "views-error" */ './views/unauthorized')
);

const App = ({ locale }) => {
  const direction = getDirection();
  const currentAppLocale = AppLocale[locale];

  const isLogin =
    authStorage.getAuthToken() !== undefined &&
    authStorage.getAuthToken() !== null;

  // const api = useHttp();
  // console.log(isLogin);

  useEffect(() => {
    if (isLogin) {
      // api.sendRequest(urlList.getAdmin, (res) => {
      //   // const [userData] = res?.data;
      //   CURRANT_USER.user = res?.data?.admin;
      // });
    }
  }, []);

  useEffect(() => {
    if (direction.isRtl) {
      document.body.classList.add('rtl');
      document.body.classList.remove('ltr');
    } else {
      document.body.classList.add('ltr');
      document.body.classList.remove('rtl');
    }
  }, [direction]);
  return (
    <div className="h-100">
      <IntlProvider
        locale={currentAppLocale.locale}
        messages={currentAppLocale.messages}
      >
        <>
          <NotificationContainer />
          {/* {isMultiColorActive && <ColorSwitcher />} */}
          {
            <Suspense fallback={<div className="loading" />}>
              <>
                <Router>
                  <Switch>
                    <ProtectedRoute
                      // <Route
                      path={adminRoot}
                      component={ViewApp}
                      condition={isLogin}
                      redirectTo="/user/login"
                    />
                    <ProtectedRoute
                      // <Route
                      path={loginRoot}
                      component={ViewUser}
                      condition={!isLogin}
                      redirectTo={`/app${ROUTES.DASHBOARD}`}
                    />
                    <Route
                      path="/error"
                      exact
                      render={(props) => <ViewError {...props} />}
                    />
                    <Route
                      path="/unauthorized"
                      exact
                      render={(props) => <ViewUnauthorized {...props} />}
                    />
                    <Redirect exact from="/" to={loginRoot} />
                    <Redirect to="/error" />
                  </Switch>
                </Router>
                {/* ) : (
                  <Container
                    className="d-flex justify-content-center align-items-center"
                    style={{ height: '100vh' }}
                  >
                    <Spinner
                      animation="border"
                      className="d-inline-flex m-2 "
                      color="$theme-color-yellow-granola"
                    />
                  </Container>
                )} */}
              </>
            </Suspense>
          }
        </>
      </IntlProvider>
    </div>
  );
};

const mapStateToProps = ({ authUser, settings }) => {
  const { currentUser } = authUser;
  const { locale } = settings;
  return { currentUser, locale };
};
const mapActionsToProps = {};

export default connect(mapStateToProps, mapActionsToProps)(App);
