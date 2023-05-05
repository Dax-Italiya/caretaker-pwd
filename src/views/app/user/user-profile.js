import React, { useState } from 'react';
import { Button, Card, CardBody } from 'reactstrap';
import AddNewModalWithOutButton from 'components/advisor/add-new-Modal-with-out-button';
import CONSTANTS from 'utils/CONSTANTS';

const Profile = ({ name, mobile, address, ratings }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const ticketData = (e) => {
    e.preventDefault();
    console.log('Data Added');
    setIsModalOpen((prev) => !prev);
  };
  return (
    <Card>
      <CardBody className="">
        <div>
          <div>
            <p className="h3 font-weight-bold mb-5">{name}</p>
            <div className="d-flex mb-3">
              <p className="h5 font-weight-light">Mobile No.</p>
              <p className="h5 font-weight-bold pl-2">{mobile}</p>
            </div>
            <div className="d-flex mb-3">
              <p className="h5 font-weight-light">Address</p>
              <p className="h5 font-weight-bold pl-2">{address}</p>
            </div>
            <div className="d-flex mb-3">
              <p className="h5 font-weight-light">Ratings</p>
              <p className="h5 font-weight-bold pl-2">{ratings}</p>
            </div>
            <Button
              onClick={() => {
                setIsModalOpen((prev) => !prev);
              }}
            >
              Raise Ticket
            </Button>
            <AddNewModalWithOutButton
              sidebarMenu="USER_INFO_MODAL"
              modalTitle={CONSTANTS.TABLE_ID.infoTitle}
              modalOpen={isModalOpen}
              toggleModal={() => {
                setIsModalOpen((prev) => !prev);
              }}
              onSubmit={ticketData}
              formData={{}}
            />
          </div>
        </div>
        <div className="progress-bar-circle progress-bar-banner position-relative" />
      </CardBody>
    </Card>
  );
};

export default React.memo(Profile);
