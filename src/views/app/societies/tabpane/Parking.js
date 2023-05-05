import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Colxx } from 'components/common/CustomBootstrap';
import useHttp from 'hooks/Use-http';
import IntlMessages from 'helpers/IntlMessages';
import { Button, CardBody, Row } from 'reactstrap';
import CONSTANTS, { urlList } from 'utils/CONSTANTS';
import ViewTable from 'utils/ReactTableCards';
import AddNewModalWithOutButton from 'components/advisor/add-new-Modal-with-out-button';
import Services from 'utils/API/service';
import AlertPopup from 'components/alert-popup';

const Parking = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [parking, setParking] = useState([]);
  const [editParking, setEditParking] = useState(null);
  const [deleteParkingId, setDeleteParkingId] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const { id } = useParams();
  const api = useHttp();

  // Add Parking Data
  const parkingData = (e) => {
    e.preventDefault();
    (async () => {
      /* eslint-disable no-await-in-loop */
      for (let i = 0; i <= 10000; i += 1) {
        if (e.target[`name_${i}`]?.value) {
          // console.log(e.target[`name_${i}`]?.value);
          const payload = {
            name: e.target[`name_${i}`]?.value,
            societyId: id,
          };
          await Services.post('/admin/parking', payload);
        } else break;
      }
      setRefresh((prev) => !prev);
      setIsModalOpen((prevState) => !prevState);
    })();
  };

  // Edit Parking Data
  const editParkingData = (e) => {
    e.preventDefault();
    const payload = {
      name: e.target.name?.value,
    };
    const EDIT_PARKING_API = { ...urlList.editParking };
    EDIT_PARKING_API.endpoint = EDIT_PARKING_API.endpoint.replace(
      ':id',
      editParking?.id
    );
    api.sendRequest(
      EDIT_PARKING_API,
      () => {
        setEditParking(null);
        setRefresh((prev) => !prev);
      },
      payload
    );
  };

  // Delete Parking Data
  const deleteParking = (parkinId) => {
    setDeleteParkingId(parkinId);
    setIsConfirmationOpen((prev) => !prev);
  };
  const deleteParkingData = () => {
    const DELETE_PARKING = { ...urlList.deleteParking };
    DELETE_PARKING.endpoint = DELETE_PARKING.endpoint.replace(
      ':id',
      deleteParkingId
    );
    api.sendRequest(DELETE_PARKING, () => {
      setRefresh((prev) => !prev);
    });
    setIsConfirmationOpen((prev) => !prev);
  };

  // Block Parking
  const blockParking = (flatId, checked) => {
    const payload = {
      isBlocked: checked,
    };
    const PARKING_BLOCK_API = { ...urlList.editParking };
    PARKING_BLOCK_API.endpoint = PARKING_BLOCK_API.endpoint.replace(
      ':id',
      flatId
    );
    api.sendRequest(
      PARKING_BLOCK_API,
      () => {
        setRefresh((prev) => !prev);
      },
      payload
    );
  };

  // Get All Parkings Data
  useEffect(() => {
    const PARKING_API = { ...urlList.getParking };
    PARKING_API.endpoint = `${PARKING_API.endpoint}?societyId=${id}`;
    api.sendRequest(PARKING_API, (res) => {
      // console.log(res?.data);
      setParking(
        res?.data.map((park, index) => {
          return {
            ...park,
            no: index + 1,
            toggle: {
              checked: !park?.isBlocked,
              id: park?.id,
              onClick: blockParking,
            },
            edit: {
              buttonLabel: <i className="simple-icon-note" />,
              id: park?.id,
              onClick: () => {
                setEditParking(park);
              },
            },
            action: {
              buttonLabel: <i className="simple-icon-trash" />,
              id: park?.id,
              onClick: deleteParking,
            },
          };
        })
      );
    });
  }, [refresh]);
  return (
    <>
      <AddNewModalWithOutButton
        sidebarMenu="PARKING_MODAL"
        modalTitle={CONSTANTS.TABLE_ID.parkingModalTitle}
        modalOpen={isModalOpen}
        toggleModal={() => {
          setIsModalOpen((prev) => !prev);
        }}
        onSubmit={parkingData}
        formData={{}}
      />
      <AddNewModalWithOutButton
        sidebarMenu="EDIT_PARKING_MODAL"
        modalTitle="edit.parking.modal.title"
        modalOpen={editParking !== null}
        toggleModal={() => {
          setEditParking(null);
        }}
        onSubmit={editParkingData}
        formData={editParking}
      />
      <AlertPopup
        isOpen={isConfirmationOpen}
        positiveText="Yes"
        negativeText="No"
        warning="Are you sure you want to delete?"
        onNegative={() => {
          setIsConfirmationOpen((prev) => !prev);
          setDeleteParkingId(null);
        }}
        onPositive={deleteParkingData}
      />
      <Row>
        <Colxx sm="12">
          <CardBody>
            <Button
              outline
              color="primary"
              style={{
                position: 'relative',
                top: '-12px',
                left: '-10px',
                margin: '12px',
              }}
              onClick={() => {
                setIsModalOpen((prev) => !prev);
              }}
            >
              <IntlMessages id={CONSTANTS.TABLE_ID.addParkingButton} />
            </Button>

            <ViewTable
              headers={CONSTANTS.TABLE_HEADER.PARKING_LIST}
              items={parking}
              advisorId="table.parking"
            />
          </CardBody>
        </Colxx>
      </Row>
    </>
  );
};

export default Parking;
