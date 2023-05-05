import React from 'react';
import { Card, CardBody } from 'reactstrap';

const SocietyProfile = ({
  society = 'Heaven Apartment',
  address = ': Heaven Apartment, B-1502, Delhi.',
  city = ': Surat',
  mobile = ': 1234567890',
  personInCharge = ': test@gmail.com',
  email = '',
}) => {
  return (
    <Card className="">
      <CardBody className="">
        <div>
          <div>
            <p className="h3 font-weight-bold mb-5">{society}</p>
            <div className="d-flex">
              <p className="h5 font-weight-light mb-3">Address</p>
              <p className="h5 font-weight-bolder pl-2">: {address}</p>
            </div>
            <div className="d-flex">
              <p className="h5 font-weight-light mb-3">City</p>
              <p className="h5 font-weight-bolder pl-2">: {city}</p>
            </div>

            <div className="d-flex">
              <p className="h5 font-weight-light mb-3">In charge No</p>
              <p className="h5 font-weight-bold pl-2">: {mobile}</p>
            </div>
            <div className="d-flex">
              <p className="h5 font-weight-light mb-3">In charge Name</p>
              <p className="h5 font-weight-bold pl-2">: {personInCharge}</p>
            </div>
            <div className="d-flex">
              <p className="h5 font-weight-light">In charge Email</p>
              <p className="h5 font-weight-bold pl-2">: {email}</p>
            </div>
          </div>
        </div>
        <div className="progress-bar-circle progress-bar-banner position-relative" />
      </CardBody>
    </Card>
  );
};
export default React.memo(SocietyProfile);
