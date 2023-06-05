import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Button,
  Card,
  CardBody,
  Form,
  Input,
  Label,
  Spinner,
} from 'reactstrap';
import { useMediaQuery } from 'react-responsive';
import authStorage from 'utils/API/authStroge';
import useHttp from 'hooks/Use-http';
import { urlList } from 'utils/CONSTANTS';
import moment from 'moment';
import { QRCode } from 'react-qrcode-logo';

const Dashboard = () => {
  // const [inputValue, setInputValue] = useState('');
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const mediaQuery = useMediaQuery({ maxWidth: 1000 });
  const [societyId, setSocietyId] = useState(null);

  const history = useHistory();
  const api = useHttp();

  // Log-out Handler
  const logoutHandler = () => {
    authStorage.deleteAuthDetails();
    history.push('/user/login');
    window.location.reload();
  };

  const handlePincodeChange = (event) => {
    setCode(event.target.value);
    const pincodeRegex = /^\d{10}$/;
    if (!pincodeRegex.test(event.target.value)) {
      setError('Field must contian  10 digits only');
    } else {
      setError('');
    }
  };

  // ADD Gig Attendance
  const getCodeHandler = (e) => {
    e.preventDefault();
    const payload = {
      societyId: +societyId,
      securityCode: code,
      isPresent: 'true',
      date: moment().format('YYYY-MM-DD'),
      startTime: moment().format('HH:mm:ss'),
    };
    api.sendRequest(
      urlList.addGigAttendance,
      () => {
        setCode('');
      },
      payload,
      'Your Attendance done Successfully'
    );

    // console.log(payload, securityCode);

    console.log(societyId.length);
    // setInputValue('');
  };
  const token = authStorage.getAuthToken();
  useEffect(() => {
    api.sendRequest(urlList.getSociety, (res) => {
      setSocietyId(res?.data?.id);
    });
  }, []);
  useEffect(() => {
    const tockenPayload = {
      FcmToken: token,
    };
    console.log(tockenPayload);
    const UPDATE_SOCIETY_FCM_TOKEN = { ...urlList.updateToken };
    UPDATE_SOCIETY_FCM_TOKEN.endpoint =
      UPDATE_SOCIETY_FCM_TOKEN.endpoint.replace(':id', societyId);
    console.log(societyId);
    api.sendRequest(UPDATE_SOCIETY_FCM_TOKEN, () => {}, tockenPayload);
  }, [societyId]);
  return (
    <>
      <Card
        style={{
          width: mediaQuery ? '90%' : '30%',
          display: 'block',
          margin: 'auto',
          height: '75vh',
        }}
      >
        <CardBody>
          {!societyId ? (
            <Spinner
              animation="border"
              className="d-inline-flex m-2 "
              color="$theme-color-yellow-granola"
              style={{
                position: 'relative',
                left: '40%',
                top: '250px',
                zIndex: '1',
              }}
            />
          ) : (
            <div className="d-flex justify-content-center">
              <QRCode value={societyId.toString()} qrStyle="dots" />
            </div>
          )}
          <Label className="h4 pt-3 text-center font-weight-bold">
            Scan QR code to confirm the check in society
          </Label>
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
                id="securityCode"
                type="text"
                value={code}
                onChange={handlePincodeChange}
                style={
                  error && code?.length !== 10
                    ? { border: '1px solid red' }
                    : {}
                }
              />
              {error && (
                <div>
                  <Label className="text-danger "> {error}</Label>
                </div>
              )}

              <div className="mt-4">
                <Button
                  block
                  color="primary"
                  disabled={code?.length !== 10}
                  outline
                >
                  Submit
                </Button>
              </div>
            </Form>
          </div>
        </CardBody>
      </Card>
      <div className="mt-5 ">
        <Button
          color="primary"
          className="d-block mx-auto"
          onClick={logoutHandler}
          outline
        >
          Logout
        </Button>
      </div>
    </>
  );
};

export default Dashboard;
