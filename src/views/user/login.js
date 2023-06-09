import React, { useState } from 'react';
import { Row, Card, CardTitle, Label, FormGroup, Button } from 'reactstrap';

import { Formik, Form, Field } from 'formik';
// import { NotificationManager } from 'components/common/react-notifications';

import { Colxx } from 'components/common/CustomBootstrap';
import IntlMessages from 'helpers/IntlMessages';
// import { adminLogin } from 'utils/API/api';
import authStorage from 'utils/API/authStroge';
import { urlList } from 'utils/CONSTANTS';
import { useHistory } from 'react-router-dom';
import { ROUTES } from 'utils/Route';
import useHttp from 'hooks/Use-http';

import Logo from '../../assets/logos/black.svg';

const validatePassword = (value) => {
  let error;
  if (!value) {
    error = 'Please enter your password';
  } else if (value.length < 3) {
    error = 'Value must be longer than 2 characters';
  }
  return error;
};

const validateEmail = (value) => {
  let error;
  if (!value) {
    error = 'Please enter your email address';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    error = 'Invalid email address';
  }
  return error;
};

const Login = () => {
  const [email] = useState('');
  const [password] = useState('');
  const history = useHistory();
  const api = useHttp();

  const onUserLogin = (value) => {
    (async () => {
      // console.log(value);
      // authStorage.setAuthDetails('tempToken');
      // window.location.reload();
      // history.push(`/app${ROUTES.DASHBOARD}`);
      const payload = {
        email: value.email,
        password: value.password,
      };
      // console.log(payload);
      api.sendRequest(
        urlList.societyLogin,
        (res) => {
          console.log(res);
          authStorage.setAuthDetails(res.token);
          window.location.reload();
          history.push(`/app${ROUTES.DASHBOARD}`);
        },
        payload,
        'Login Successfully!!!'
      );
    })();
  };

  const initialValues = { email, password };

  return (
    <Row className="h-100">
      <Colxx xxs="12" md="10" className="mx-auto my-auto">
        <Card className="auth-card">
          <div className="position-relative image-side ">
            <img src={Logo} alt="Logo" style={{ width: '60%' }} />
          </div>
          <div className="form-side">
            <CardTitle className="mb-4">
              <IntlMessages id="user.login-title" />
            </CardTitle>

            <Formik initialValues={initialValues} onSubmit={onUserLogin}>
              {({ errors, touched }) => (
                <Form className="av-tooltip tooltip-label-bottom">
                  <FormGroup className="form-group has-float-label">
                    <Label>
                      <IntlMessages id="user.email" />
                    </Label>
                    <Field
                      className="form-control"
                      name="email"
                      validate={validateEmail}
                    />
                    {errors.email && touched.email && (
                      <div className="invalid-menu d-block">{errors.email}</div>
                    )}
                  </FormGroup>
                  <FormGroup className="form-group has-float-label">
                    <Label>
                      <IntlMessages id="user.password" />
                    </Label>
                    <Field
                      className="form-control"
                      type="password"
                      name="password"
                      validate={validatePassword}
                    />
                    {errors.password && touched.password && (
                      <div className="invalid-menu d-block">
                        {errors.password}
                      </div>
                    )}
                  </FormGroup>
                  <div className="d-flex justify-content-between">
                    <button
                      type="button"
                      className="c-pointer mb-2 button-none"
                      onClick={() =>
                        history.push(`/user${ROUTES.FORGOT_PASSWORD}`)
                      }
                    >
                      Forget Password?
                    </button>

                    <button
                      type="button"
                      className="c-pointer mb-2 button-none"
                      onClick={() => history.push(`/user${ROUTES.REGISTER}`)}
                    >
                      Register?
                    </button>
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
                    <Button
                      color="primary"
                      className={`btn-shadow btn-multiple-state ${
                        api.isLoading ? 'show-spinner' : ''
                      }`}
                      size="lg"
                    >
                      <span className="spinner d-inline-block">
                        <span className="bounce1" />
                        <span className="bounce2" />
                        <span className="bounce3" />
                      </span>
                      <span className="label">
                        <IntlMessages id="user.login-button" />
                      </span>
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </Card>
      </Colxx>
    </Row>
  );
};

export default Login;
