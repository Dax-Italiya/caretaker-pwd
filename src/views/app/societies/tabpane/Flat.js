import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Colxx } from 'components/common/CustomBootstrap';
import IntlMessages from 'helpers/IntlMessages';
import { Button, CardBody, Row } from 'reactstrap';
import CONSTANTS, { urlList } from 'utils/CONSTANTS';
import ViewTable from 'utils/ReactTableCards';
import AddNewModalWithOutButton from 'components/advisor/add-new-Modal-with-out-button';
import useHttp from 'hooks/Use-http';
import Services from 'utils/API/service';
import AlertPopup from 'components/alert-popup';

const Flat = ({ NoOfflats }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [flats, setFlats] = useState([]);
  const [deleteFlatId, setDeleteFlatId] = useState(null);
  const [editFlat, setEditFlat] = useState(null);
  const [tower, setTower] = useState([]);
  const { id } = useParams();
  const api = useHttp();

  // ADD Room Data
  const flatData = (e) => {
    e.preventDefault();

    (async () => {
      /* eslint-disable no-await-in-loop */
      for (let i = 0; i <= 10000; i += 1) {
        if (e.target[`name_${i}`]?.value) {
          // console.log(e.target[`flat_${i}`]?.value);
          const payload = {
            name: e.target[`name_${i}`]?.value,
            societyId: id,
            towerId: e.target.towerId.value,
          };
          await Services.post('/admin/room', payload);
        } else break;
      }
      setRefresh((prev) => !prev);
      setIsModalOpen((prevState) => !prevState);
    })();
  };

  // Delete Room Data
  const deleteRoom = (flatId) => {
    setDeleteFlatId(flatId);
    setIsConfirmationOpen((prev) => !prev);
  };

  const deleteRoomData = () => {
    const DELETE_ROOM_API = { ...urlList.deleteFlat };
    DELETE_ROOM_API.endpoint = DELETE_ROOM_API.endpoint.replace(
      ':id',
      deleteFlatId
    );
    api.sendRequest(DELETE_ROOM_API, () => {
      setDeleteFlatId(null);
      setRefresh((prev) => !prev);
    });
    setIsConfirmationOpen((prev) => !prev);
  };

  // Edit Room Data
  const editFlatData = (e) => {
    e.preventDefault();
    const payload = {
      name: e.target.name.value,
      towerId: e.target.towerId.value,
    };
    const EDIT_FLAT_API = { ...urlList.editFlat };
    EDIT_FLAT_API.endpoint = EDIT_FLAT_API.endpoint.replace(
      ':id',
      editFlat?.id
    );
    api.sendRequest(
      EDIT_FLAT_API,
      () => {
        setEditFlat(null);
        setRefresh((prev) => !prev);
      },
      payload
    );
  };

  // Block Room
  const blockFlat = (flatId, checked) => {
    const payload = {
      isBlocked: checked,
    };
    const FLAT_BLOCK_API = { ...urlList.editFlat };
    FLAT_BLOCK_API.endpoint = FLAT_BLOCK_API.endpoint.replace(':id', flatId);
    api.sendRequest(
      FLAT_BLOCK_API,
      () => {
        setRefresh((prev) => !prev);
      },
      payload
    );
  };
  // get Towers Data
  useEffect(() => {
    const TOWER_API = { ...urlList.getTower };
    TOWER_API.endpoint = `${TOWER_API.endpoint}?societyId=${id}`;
    api.sendRequest(TOWER_API, (res) => {
      setTower(
        res?.data.map((data) => {
          return {
            ...data,
          };
        })
      );
    });
  }, []);

  // get Flats
  useEffect(() => {
    const FLAT_API = { ...urlList.getFlat };
    FLAT_API.endpoint = `${FLAT_API.endpoint}?societyId=${id}`;
    api.sendRequest(FLAT_API, (res) => {
      NoOfflats(res?.data?.length);
      setFlats(
        res?.data.map((data, index) => {
          return {
            ...data,
            no: index + 1,
            tower: data.tower.name,
            view: {
              buttonLabel: <i className="simple-icon-eye" />,
              id: data?.id,
              onClick: () => {},
            },
            edit: {
              buttonLabel: <i className="simple-icon-note" />,
              id: data?.id,
              onClick: () => {
                setEditFlat(data);
              },
            },
            toggle: {
              checked: !data?.isBlocked,
              id: data?.id,
              onClick: blockFlat,
            },
            action: {
              buttonLabel: <i className="simple-icon-trash" />,
              id: data?.id,
              onClick: deleteRoom,
            },
          };
        })
      );
    });
  }, [refresh]);

  return (
    <>
      <AddNewModalWithOutButton
        sidebarMenu="FLAT_MODAL"
        modalTitle={CONSTANTS.TABLE_ID.flatModalTitle}
        modalOpen={isModalOpen}
        toggleModal={() => {
          setIsModalOpen((prev) => !prev);
        }}
        onSubmit={flatData}
        formData={{
          towerId: tower.map((towerData) => {
            return {
              value: towerData?.id,
              label: towerData?.name,
            };
          }),
        }}
      />
      <AddNewModalWithOutButton
        sidebarMenu="EDIT_FLAT_MODAL"
        modalTitle="edit.flat.modal.title"
        modalOpen={editFlat !== null}
        toggleModal={() => {
          setEditFlat(null);
        }}
        onSubmit={editFlatData}
        formData={{
          ...editFlat,
          towerId: tower.map((towerData) => {
            return {
              value: towerData?.id,
              label: towerData?.name,
            };
          }),
        }}
      />
      <AlertPopup
        isOpen={isConfirmationOpen}
        positiveText="Yes"
        negativeText="No"
        warning="Are you sure you want to delete?"
        onNegative={() => {
          setIsConfirmationOpen((prev) => !prev);
          setDeleteFlatId(null);
        }}
        onPositive={deleteRoomData}
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
              <IntlMessages id={CONSTANTS.TABLE_ID.addFlatButton} />
            </Button>
            <Button
              outline
              color="primary"
              style={{
                position: 'relative',
                top: '-12px',
                left: '-15px',
                margin: '12px',
              }}
              onClick={() => {}}
            >
              <IntlMessages id="button.import" />
            </Button>

            <ViewTable
              headers={CONSTANTS.TABLE_HEADER.FLAT_LIST}
              items={flats}
              advisorId="table.flat"
            />
          </CardBody>
        </Colxx>
      </Row>
    </>
  );
};

export default Flat;
