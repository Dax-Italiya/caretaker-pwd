import React from 'react';
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Col,
  Form,
  Input,
  Label,
  Row,
} from 'reactstrap';

const PersonalNotification = () => {
  return (
    <Card className="rounded-top rounded-bottom my-3">
      <CardTitle className="font-weight-bold ml-4 mt-4">
        Person Notification
      </CardTitle>
      <CardBody>
        <Form>
          <Row className="m-3">
            <Label htmlFor="heading" md={2}>
              Person
            </Label>
            <Col md={6}>
              <Input
                className="rounded-top rounded-bottom"
                id="exampleSelect"
                name="select"
                type="select"
              >
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </Input>
            </Col>
          </Row>
          <Row className="m-3">
            <Label htmlFor="heading" md={2}>
              Notification Heading
            </Label>
            <Col md={6}>
              <Input
                className="rounded-top rounded-bottom"
                type="text"
                name="text"
                id="heading"
                required
              />
            </Col>
          </Row>
          <Row className="m-3">
            <Label htmlFor="message" md={2}>
              Message
            </Label>
            <Col md={6}>
              <Input
                className="rounded-top rounded-bottom"
                type="text"
                name="text"
                id="message"
                required
              />
            </Col>
          </Row>
          <Button className="m-4">Send</Button>
        </Form>
      </CardBody>
    </Card>
  );
};

export default PersonalNotification;
