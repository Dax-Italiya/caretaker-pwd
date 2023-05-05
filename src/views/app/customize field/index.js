import React, { useState } from 'react';
import { Button, Card, CardBody, Form, Input, Label } from 'reactstrap';
import IntlMessages from 'helpers/IntlMessages';

const CustomizeField = () => {
  const [tax, setTax] = useState('');
  const [charge, setCharge] = useState('');

  const taxHandler = (e) => {
    setTax(e.target.value);
  };

  const chargeHandler = (e) => {
    setCharge(e.target.value);
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();
    console.log('data added');
    setTax('');
    setCharge('');
  };
  return (
    <Card>
      <CardBody>
        <Form style={{ height: '50vh' }} onSubmit={formSubmitHandler}>
          <Label className="font-weight-light">
            <IntlMessages id="customize.tax" />
          </Label>
          <Input
            className="rounded-top rounded-bottom"
            id="tax"
            name="tax"
            type="number"
            value={tax}
            onChange={taxHandler}
            required
          />
          <Label className="mt-3 font-weight-light">
            <IntlMessages id="customize.charges" />
          </Label>
          <Input
            className="rounded-top rounded-bottom"
            id="charge"
            name="charge"
            type="number"
            value={charge}
            onChange={chargeHandler}
            required
          />
          <Button className="mt-4">Submit</Button>
        </Form>
      </CardBody>
    </Card>
  );
};

export default CustomizeField;
