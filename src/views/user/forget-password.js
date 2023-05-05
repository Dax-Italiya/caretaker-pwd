import React, { useState } from 'react';
import { Row, Card, CardTitle, Label, FormGroup, Button } from 'reactstrap';

import { Formik, Form, Field } from 'formik';

import { Colxx } from 'components/common/CustomBootstrap';
import IntlMessages from 'helpers/IntlMessages';
import { adminForgetPassword } from 'utils/API/api';
import { useHistory } from 'react-router-dom';
import { ROUTES } from 'utils/Route';
import Logo from '../../assets/logos/black.svg';

const validateEmail = (value) => {
  let error;
  if (!value) {
    error = 'Please enter your email address';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    error = 'Invalid email address';
  }
  return error;
};

const ForgetPassword = () => {
  const [email] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const onForgetPassword = (value) => {
    (async () => {
      const payload = {
        email: value.email,
      };
      setLoading(true);
      const res = await adminForgetPassword(payload);
      const id = res?.data?.data?.client?.id;
      if (res && id) {
        history.push(
          `/user${ROUTES.UPDATE_PASSWORD.replace(':updatePasswordId', id)}`
        );
      }
      setLoading(false);
    })();
  };

  const initialForgetValues = { email };

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
              <IntlMessages id="user.forgot-password" />
            </CardTitle>

            <Formik
              initialValues={initialForgetValues}
              onSubmit={onForgetPassword}
            >
              {({ errors, touched }) => (
                <Form className="av-tooltip tooltip-label-bottom">
                  <FormGroup className="form-group has-float-label">
                    <Label>
                      <IntlMessages id="user.email" />
                    </Label>
                    <Field
                      className="form-control"
                      type="email"
                      name="email"
                      validate={validateEmail}
                    />
                    {errors.email && touched.email && (
                      <div className="invalid-menu d-block">{errors.email}</div>
                    )}
                  </FormGroup>
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
                        <IntlMessages id="user.submit" />
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

export default ForgetPassword;
