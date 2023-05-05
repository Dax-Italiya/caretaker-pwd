import React, { useState, useEffect } from 'react';
import { Button } from 'reactstrap';
import useHttp from 'hooks/Use-http';
import AlertPopup from 'components/alert-popup';
import AddNewModalWithOutButton from 'components/advisor/add-new-Modal-with-out-button';
import IntlMessages from 'helpers/IntlMessages';
import CONSTANTS, { urlList } from 'utils/CONSTANTS';
import ViewTable from 'utils/ReactTableCards';
import GenearalNotification from './tables/general-notification';
import SocietyNotification from './tables/society-notification';
import PersonalNotification from './tables/personal-notification';
import City from './tables/City';

const Setting = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [serviceCategory, setServiceCategory] = useState([]);
  const [deleteCategoryId, setDeleteCategoryId] = useState(null);
  const [editData, setEditData] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const api = useHttp();

  // Add Service Categories Data
  const settingData = (e) => {
    e.preventDefault();
    const payload = {
      name: e.target.name.value,
    };
    api.sendRequest(
      urlList.addServiceCategories,
      () => {
        setRefresh((prev) => !prev);
      },
      payload
    );
    setIsModalOpen((prevState) => !prevState);
  };

  // Edit Service Categories Data
  const editServicCategoryData = (e) => {
    e.preventDefault();
    const EDIT_SERVICE_CATEGORY_API = { ...urlList.editServiceCategories };
    EDIT_SERVICE_CATEGORY_API.endpoint =
      EDIT_SERVICE_CATEGORY_API.endpoint.replace(':id', editData?.id);
    const payload = {
      name: e.target.name.value,
    };
    api.sendRequest(
      EDIT_SERVICE_CATEGORY_API,
      () => {
        setEditData(null);
        setRefresh((prev) => !prev);
      },
      payload
    );
  };

  // Delete Service Categories Data
  const deleteServicCategory = (id) => {
    setDeleteCategoryId(id);
    setIsConfirmationOpen((prev) => !prev);
  };

  const deleteServicCategoryData = () => {
    const DELETE_SERVICE_CATEGORY_API = { ...urlList.deleteServiceCategories };
    DELETE_SERVICE_CATEGORY_API.endpoint =
      DELETE_SERVICE_CATEGORY_API.endpoint.replace(':id', deleteCategoryId);
    api.sendRequest(DELETE_SERVICE_CATEGORY_API, () => {
      setRefresh((prev) => !prev);
    });
    setIsConfirmationOpen((prev) => !prev);
  };

  // Get All Service Categories Data
  useEffect(() => {
    api.sendRequest(urlList.getServiceCategories, (res) => {
      // console.log(res.data);
      setServiceCategory(
        res?.data.map((data, index) => {
          return {
            ...data,
            no: index + 1,
            edit: {
              buttonLabel: <i className="simple-icon-note" />,
              id: data?.id,
              onClick: () => {
                setEditData(data);
              },
            },
            action: {
              buttonLabel: <i className="simple-icon-trash" />,
              id: data?.id,
              onClick: deleteServicCategory,
            },
          };
        })
      );
    });
  }, [refresh]);

  return (
    <>
      <Button
        outline
        color="primary"
        style={{
          position: 'relative',
          left: '0px',
          top: '-15px',
          marginTop: '-20px',
        }}
        onClick={() => {
          setIsModalOpen((prevState) => !prevState);
        }}
      >
        <IntlMessages id="button.add.category" />
      </Button>
      <AddNewModalWithOutButton
        sidebarMenu="SETTING_MODAL"
        modalTitle={`${
          editData !== null
            ? 'edit.category.modal.title'
            : CONSTANTS.TABLE_ID.settingModalTitle
        }`}
        modalOpen={isModalOpen || editData !== null}
        toggleModal={() => {
          if (editData !== null) setEditData(null);
          else setIsModalOpen((prevState) => !prevState);
        }}
        onSubmit={editData !== null ? editServicCategoryData : settingData}
        formData={editData !== null ? editData : {}}
      />
      <AlertPopup
        isOpen={isConfirmationOpen}
        positiveText="Yes"
        negativeText="No"
        warning="Are you sure you want to delete?"
        onNegative={() => {
          setIsConfirmationOpen((prev) => !prev);
          setDeleteCategoryId(null);
        }}
        onPositive={deleteServicCategoryData}
      />
      <ViewTable
        headers={CONSTANTS.TABLE_HEADER.SETTING_LIST}
        items={serviceCategory}
        advisorId="table.category"
      />
      <GenearalNotification />
      <SocietyNotification />
      <PersonalNotification />
      <City />
    </>
  );
};

export default Setting;
