import React from 'react';
import { Card, CardBody } from 'reactstrap';
import profile from '../../../assets/img/profiles/profile.jpg';

const GigsProfile = ({
  name = 'No Data',
  mobile = 'No data',
  ratings = 'No data',
  profilePic = profile,
}) => {
  return (
    <Card className="">
      <CardBody className="justify-content-between d-flex flex-row align-items-center">
        <div>
          <div>
            <div className="d-flex flex-row mb-4">
              <div>
                <img
                  className="rounded-circle d-block"
                  src={profilePic}
                  alt="Profile"
                  width="70"
                  height="70"
                />
              </div>
              <p className="h3 font-weight-bold ml-3 mt-3 mb-5">{name}</p>
            </div>
            <div className="d-flex mb-3">
              <p className="h5 font-weight-light">Mobile No.</p>
              <p className="h5 font-weight-bold pl-2">: {mobile}</p>
            </div>

            <div className="d-flex mb-3">
              <p className="h5 font-weight-light">Ratings</p>
              <p className="h5 font-weight-bold pl-2">: {ratings}</p>
            </div>
          </div>
        </div>
        <div className="progress-bar-circle progress-bar-banner position-relative" />
      </CardBody>
    </Card>
  );
};

export default React.memo(GigsProfile);
