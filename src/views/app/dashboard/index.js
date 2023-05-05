import React from 'react';
import {
  Card,
  CardBody,
  CardTitle,
  Col,
  FormGroup,
  Input,
  Label,
  Row,
} from 'reactstrap';
import DashboardBody from './dashboard-boady';
import UserRequest from '../user request';

const Dashboard = () => {
  return (
    <>
      <Card className="mb-5">
        <CardTitle className="font-weight-bold ml-4 mt-4">Date Range</CardTitle>
        <CardBody>
          <Row>
            <Col md={6}>
              <FormGroup>
                <Label htmlFor="stdate" className="font-weight-light">
                  Start date
                </Label>
                <Input id="stdate" name="date" type="date" />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label htmlFor="endate" className="font-weight-light">
                  End Date
                </Label>
                <Input id="endate" name="endate" type="date" />
              </FormGroup>
            </Col>
          </Row>
        </CardBody>
      </Card>
      <DashboardBody />
      <UserRequest />
    </>
  );
};

export default Dashboard;
