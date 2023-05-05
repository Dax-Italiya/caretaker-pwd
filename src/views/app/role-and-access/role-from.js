import React from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Input,
  Label,
} from 'reactstrap';

const RoleForm = () => {
  const navigationMenu = [
    'Dashboard',
    'Socieites',
    'Service',
    'Users',
    'Gigs',
    'User Request',
    'Customize Field',
    'Attendance',
    'Invoice Page',
    'Feedback',
    'Role & Access',
    'Setting',
  ];

  const submenu = {
    Socieites: ['Tower', 'Flat', 'Service', 'Parking', 'User'],
    Service: ['Service Variety'],
    Users: ['Service', 'Request', 'Transaction', 'Raised Ticket'],
    Gigs: [
      'Gig Transaction',
      'Gig Schedule',
      'Gig Attendance',
      'Gig Service',
      'About Info',
      'Feedback',
      'Raised Ticket',
      'Work',
    ],
  };

  const checkboxHandler = () => {
    console.log('Data Changed');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center p-3 h1">Manage and Access</CardTitle>
      </CardHeader>
      <CardBody>
        {navigationMenu.map((ele) => {
          return (
            <div key={ele}>
              <Input type="checkbox" onChange={checkboxHandler} />
              <Label>{ele}</Label>
              <br />
              <ul>
                {submenu[ele]?.map((data) => {
                  return (
                    <li key={data}>
                      <Input type="checkbox" onChange={checkboxHandler} />
                      <Label>{data}</Label>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </CardBody>
    </Card>
  );
};

export default RoleForm;
