import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useHttp from 'hooks/Use-http';
import Services from 'utils/API/service';
import { Colxx } from 'components/common/CustomBootstrap';
import IntlMessages from 'helpers/IntlMessages';
import { Button, CardBody, Row } from 'reactstrap';
import CONSTANTS, { urlList } from 'utils/CONSTANTS';
import ViewTable from 'utils/ReactTableCards';
import AlertPopup from 'components/alert-popup';
import AddNewModalWithOutButton from 'components/advisor/add-new-Modal-with-out-button';

const Tower = ({ towers }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [tower, setTower] = useState([]);
  const [editTower, setEditTower] = useState(null);
  const [deleteTowerId, setDeleteTowerId] = useState(null);

  const [refresh, setRefresh] = useState(false);
  const { id } = useParams();
  const api = useHttp();

  // ADD Tower
  const towerData = (e) => {
    e.preventDefault();
    console.log('data added');
    (async () => {
      /* eslint-disable no-await-in-loop */
      for (let i = 0; i <= 10000; i += 1) {
        if (e.target[`name_${i}`]?.value) {
          console.log(e.target[`name_${i}`]?.value);
          const payload = {
            name: e.target[`name_${i}`]?.value,
            societyId: id,
          };
          await Services.post('/admin/tower', payload);
        } else break;
      }
      setRefresh((prev) => !prev);
      setIsModalOpen((prevState) => !prevState);
    })();
  };

  // Edit Tower
  const editTowerData = (e) => {
    e.preventDefault();
    const payload = {
      name: e.target.name?.value,
    };
    const EDIT_TOWER_API = { ...urlList.editTower };
    EDIT_TOWER_API.endpoint = EDIT_TOWER_API.endpoint.replace(
      ':id',
      editTower?.id
    );
    api.sendRequest(
      EDIT_TOWER_API,
      () => {
        setEditTower(null);
        setRefresh((prev) => !prev);
      },
      payload
    );
  };

  // Delete Tower
  const deleteTower = (towerId) => {
    setDeleteTowerId(towerId);
    setIsConfirmationOpen((prev) => !prev);
  };

  const deleteTowerData = () => {
    const DELETE_TOWER = { ...urlList.deleteTower };
    DELETE_TOWER.endpoint = DELETE_TOWER.endpoint.replace(':id', deleteTowerId);
    api.sendRequest(DELETE_TOWER, () => {
      setRefresh((prev) => !prev);
    });
    setIsConfirmationOpen((prev) => !prev);
  };

  // Block Society
  const blockSociety = (towerId, checked) => {
    const payload = {
      isBlocked: checked,
    };
    const TOWER_BLOCK_API = { ...urlList.editTower };
    TOWER_BLOCK_API.endpoint = TOWER_BLOCK_API.endpoint.replace(':id', towerId);
    api.sendRequest(
      TOWER_BLOCK_API,
      () => {
        setRefresh((prev) => !prev);
      },
      payload
    );
  };

  // get Towers
  useEffect(() => {
    const TOWER_API = { ...urlList.getTower };
    TOWER_API.endpoint = `${TOWER_API.endpoint}?societyId=${id}`;
    api.sendRequest(TOWER_API, (res) => {
      towers(res?.data?.length);
      setTower(
        res?.data.map((data, index) => {
          return {
            ...data,
            no: index + 1,
            toggle: {
              checked: !data?.isBlocked,
              id: data?.id,
              onClick: blockSociety,
            },
            edit: {
              buttonLabel: <i className="simple-icon-note" />,
              id: data?.id,
              onClick: () => {
                setEditTower(data);
              },
            },
            action: {
              buttonLabel: <i className="simple-icon-trash" />,
              id: data?.id,
              onClick: deleteTower,
            },
          };
        })
      );
    });
  }, [refresh]);
  return (
    <>
      <AddNewModalWithOutButton
        sidebarMenu="TOWER_MODAL"
        modalTitle={CONSTANTS.TABLE_ID.towerModalTitle}
        modalOpen={isModalOpen}
        toggleModal={() => {
          setIsModalOpen((prev) => !prev);
        }}
        onSubmit={towerData}
        formData={{}}
      />
      <AddNewModalWithOutButton
        sidebarMenu="EDIT_TOWER_MODAL"
        modalTitle="edit.tower.modal.title"
        modalOpen={editTower !== null}
        toggleModal={() => {
          setEditTower(null);
        }}
        onSubmit={editTowerData}
        formData={editTower}
      />
      <AlertPopup
        isOpen={isConfirmationOpen}
        positiveText="Yes"
        negativeText="No"
        warning="Are you sure you want to delete?"
        onNegative={() => {
          setIsConfirmationOpen((prev) => !prev);
          setDeleteTowerId(null);
        }}
        onPositive={deleteTowerData}
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
              <IntlMessages id="button.add.tower" />
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
              headers={CONSTANTS.TABLE_HEADER.TOWER_LIST}
              items={tower}
              advisorId="table.tower"
            />
          </CardBody>
        </Colxx>
      </Row>
    </>
  );
};

export default Tower;
