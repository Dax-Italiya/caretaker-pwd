import React, { useState } from 'react';
import { Colxx } from 'components/common/CustomBootstrap';
import { Button, Card, CardBody, Row } from 'reactstrap';
import AddNewModalWithOutButton from 'components/advisor/add-new-Modal-with-out-button';
import CONSTANTS from 'utils/CONSTANTS';

const Info = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openCloseModal = () => setIsModalOpen((prevState) => !prevState);
  const infoData = (e) => {
    e.preventDefault();
    console.log('Info data Added');
    setIsModalOpen((prevState) => !prevState);
  };
  return (
    <>
      <AddNewModalWithOutButton
        sidebarMenu="GIGS_INFO_MODAL"
        modalTitle={CONSTANTS.TABLE_ID.infoTitle}
        modalOpen={isModalOpen}
        toggleModal={openCloseModal}
        onSubmit={infoData}
        formData={{}}
      />
      <Row>
        <Colxx sm="12">
          <CardBody>
            <Card>
              <CardBody className="justify-content-between d-flex flex-row align-items-center">
                <div>
                  <div className="d-flex mb-3">
                    <p className="h5 font-weight-light">Work Done :</p>
                    <p className="h5 font-weight-bold pl-2">15</p>
                  </div>
                  <div className="d-flex mb-3">
                    <p className="h5 font-weight-light">Refused Work :</p>
                    <p className="h5 font-weight-bold pl-2">15</p>
                  </div>
                  <div className="d-flex mb-3">
                    <p className="h5 font-weight-light">Raise Ticket: :</p>
                    <p className="h5 font-weight-bold pl-2">15</p>
                  </div>
                  <div>
                    <Button onClick={openCloseModal}>Raise Ticket</Button>
                  </div>
                </div>
              </CardBody>
            </Card>
          </CardBody>
        </Colxx>
      </Row>
    </>
  );
};

export default Info;
