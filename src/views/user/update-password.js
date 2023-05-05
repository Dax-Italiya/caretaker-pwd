import React, { useState } from 'react';
import { Row, Card, CardTitle, Label, FormGroup, Button } from 'reactstrap';

import { Formik, Form, Field } from 'formik';
import { NotificationManager } from 'components/common/react-notifications';

import { Colxx } from 'components/common/CustomBootstrap';
import IntlMessages from 'helpers/IntlMessages';
import { adminUpdatePassword } from 'utils/API/api';
import { useHistory, useParams } from 'react-router-dom';
import Logo from '../../assets/logos/black.svg';

const validatePassword = (value) => {
  let error;
  if (!value) {
    error = 'Please enter your password';
  } else if (value.length < 4) {
    error = 'Value must be longer than 3 characters';
  }
  return error;
};

const UpdatePassword = () => {
  const [password] = useState('');
  const { updatePasswordId } = useParams();
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const onUpdatePassword = (value) => {
    (async () => {
      const payload = {
        id: updatePasswordId,
        password: value.password,
      };

      const res = await adminUpdatePassword(payload);
      if (res !== -1) {
        NotificationManager.success(
          'Password Updated Successfully!',
          3000,
          null,
          null,
          ''
        );
        history.push(`/user/login`);
        window.location.reload();
      }
      setLoading(false);
    })();
  };

  const initialUpdateValues = { password };

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
              initialValues={initialUpdateValues}
              onSubmit={onUpdatePassword}
            >
              {({ errors, touched }) => (
                <Form className="av-tooltip tooltip-label-bottom">
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

export default UpdatePassword;
