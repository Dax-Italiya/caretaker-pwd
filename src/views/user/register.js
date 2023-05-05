import React, { useState } from 'react';
import { Row, Card, CardTitle, Label, FormGroup, Button } from 'reactstrap';

import { Formik, Form, Field } from 'formik';
import { NotificationManager } from 'components/common/react-notifications';

import { Colxx } from 'components/common/CustomBootstrap';
import IntlMessages from 'helpers/IntlMessages';
import { adminSignUp } from 'utils/API/api';
import authStorage from 'utils/API/authStroge';
import { useHistory } from 'react-router-dom';
import Logo from '../../assets/logos/black.svg';

const validateName = (value) => {
  let error;
  if (!value) {
    error = 'Please enter your name';
  } else if (value.length < 2) {
    error = 'Name must be longer than 2 characters';
  }
  return error;
};

const validatePassword = (value) => {
  let error;
  if (!value) {
    error = 'Please enter your password';
  } else if (value.length < 4) {
    error = 'Value must be longer than 3 characters';
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

const SignUp = () => {
  const [email] = useState('');
  const [password] = useState('');
  const [name] = useState('');

  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const onUserRegister = (value) => {
    (async () => {
      const payload = {
        email: value.email,
        password: value.password,
        name: value.name,
        role: 'admin',
      };
      setLoading(true);
      const res = await adminSignUp(payload);
      if (res !== -1) {
        NotificationManager.success('SignUp success', 3000, null, null, '');
        authStorage.setAuthDetails(res.data?.token);
        window.location.reload();
        history.push(`/user/login}`);
      }
      setLoading(false);
    })();
  };

  const initialValues = { email, password, name };

  return (
    <Row className="h-100">
      <Colxx xxs="12" md="10" className="mx-auto my-auto">
        <Card className="auth-card">
          <div className="position-relative image-side ">
            <img src={Logo} alt="Logo" />
            <p>GIRNAR</p>
          </div>
          <div className="form-side">
            <CardTitle className="mb-4">
              <IntlMessages id="user.register" />
            </CardTitle>

            <Formik initialValues={initialValues} onSubmit={onUserRegister}>
              {({ errors, touched }) => (
                <Form className="av-tooltip tooltip-label-bottom">
                  <FormGroup className="form-group has-float-label">
                    <Label>
                      <IntlMessages id="user.name" />
                    </Label>
                    <Field
                      className="form-control"
                      name="name"
                      validate={validateName}
                    />
                    {errors.name && touched.name && (
                      <div className="invalid-menu d-block">{errors.name}</div>
                    )}
                  </FormGroup>
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
                  <button
                    type="button"
                    className="c-pointer mb-2 button-none"
                    onClick={() => history.push('/user/login')}
                  >
                    Login?
                  </button>
                  <div className="d-flex justify-content-between align-items-center">
                    <Button
                      color="primary"
                      className={`btn-shadow btn-multiple-state ${
                        loading ? 'show-spinner' : ''
                      }`}
                      size="lg"
                    >
                      <span className="spinner d-inline-block">
                        <span className="bounce1" />
                        <span className="bounce2" />
                        <span className="bounce3" />
                      </span>
                      <span className="label">
                        <IntlMessages id="user.register" />
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

export default SignUp;
