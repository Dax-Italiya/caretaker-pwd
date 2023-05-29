import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Card, CardBody, Form, Input, Label } from 'reactstrap';
import { useMediaQuery } from 'react-responsive';
import authStorage from 'utils/API/authStroge';

const Dashboard = () => {
  const [inputValue, setInputValue] = useState('');
  const mediaQuery = useMediaQuery({ maxWidth: 1000 });

  const history = useHistory();

  // Log-out Handler
  const logoutHandler = () => {
    authStorage.deleteAuthDetails();
    history.push('/user/login');
    window.location.reload();
  };

  // Get the code of the gig
  const getCodeHandler = (e) => {
    e.preventDefault();
    // console.log('Code Added');
    setInputValue('');
  };
  return (
    <>
      <Card
        style={{
          width: mediaQuery ? '90%' : '30%',
          display: 'block',
          margin: 'auto',
          height: '80vh',
        }}
      >
        <CardBody>
          <div
            className="my-4"
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                position: 'absolute',
                border: '1px solid',
                width: '90%',
              }}
            />
            <Label
              style={{
                top: '2px',
                margin: '0px 6px',
                background: '#f8f8f8',
                zIndex: '12',
                padding: '0px 10px',
              }}
            >
              Another Code
            </Label>
          </div>
          <div>
            <Form onSubmit={getCodeHandler}>
              <Input
                placeholder="Enter Code"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />

              <div className="mt-5">
                <Button block color="primary" outline>
                  Submit
                </Button>
              </div>
            </Form>

            <div className="mt-5">
              <Button block color="primary" onClick={logoutHandler} outline>
                Logout
              </Button>
            </div>
          </div>
        </CardBody>
      </Card>
    </>
  );
};

export default Dashboard;
