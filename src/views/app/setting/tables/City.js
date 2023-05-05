import React, { useState, useEffect } from 'react';
import { Button } from 'reactstrap';
import useHttp from 'hooks/Use-http';
import AddNewModalWithOutButton from 'components/advisor/add-new-Modal-with-out-button';
import IntlMessages from 'helpers/IntlMessages';
import CONSTANTS, { urlList } from 'utils/CONSTANTS';
import AlertPopup from 'components/alert-popup';
import ViewTable from 'utils/ReactTableCards';

import profile from '../../../../assets/img/profiles/profile.jpg';

const City = () => {
  const [isCityModalOpen, setIsCityModalOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [city, setCity] = useState([]);
  const [deleteCityId, setDeleteCityId] = useState(null);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const api = useHttp();

  // Add City
  const cityData = (e) => {
    e.preventDefault();
    const payload = new FormData();
    CONSTANTS.RIGHT_SIDEBAR_FIELD.SETTING_CITY_MODAL.forEach((ele) => {
      // console.log(ele);
      if (ele.type !== 'file') {
        payload.append(ele.id, e.target[ele.id]?.value);
      }
      if (ele.type === 'file') {
        payload.append(ele.id, e.target[ele.id]?.files[0]);
      }
    });
    console.log(payload);
    api.sendRequest(
      urlList.sendCity,
      () => {
        setRefresh((prev) => !prev);
      },
      payload
    );
    setIsCityModalOpen((prevState) => !prevState);
  };

  // Edit City
  const editCityData = (e) => {
    e.preventDefault();
    const payload = new FormData();
    CONSTANTS.RIGHT_SIDEBAR_FIELD.SETTING_CITY_MODAL.forEach((ele) => {
      // console.log(ele);
      if (ele.type !== 'file') {
        payload.append(ele.id, e.target[ele.id]?.value);
      }
      if (ele.type === 'file' && e.target[ele.id]?.files[0]) {
        payload.append(ele.id, e.target[ele.id]?.files[0]);
      }
    });
    // console.log(payload);
    urlList.editCity.endpoint = urlList.editCity.endpoint.replace(
      ':id',
      editData?.id
    );
    api.sendRequest(
      urlList.editCity,
      () => {
        setEditData(null);
        setRefresh((prev) => !prev);
      },
      payload
    );
  };

  // Delete City
  const deleteCity = (id) => {
    setDeleteCityId(id);
    setIsConfirmationOpen((prev) => !prev);
  };

  const deleteCityData = () => {
    urlList.deleteCity.endpoint = urlList.deleteCity.endpoint.replace(
      ':id',
      deleteCityId
    );
    api.sendRequest(urlList.deleteCity, () => {
      setRefresh((prev) => !prev);
    });
    setIsConfirmationOpen((prev) => !prev);
  };

  // Get All City
  useEffect(() => {
    api.sendRequest(urlList.getCitys, (res) => {
      // console.log(res?.data);
      setCity(
        res?.data.map((cit, index) => {
          return {
            ...cit,
            name: cit?.name,
            no: index + 1,
            profilePic: cit?.image || profile,
            sgst: `${cit?.sgst || '0'}%`,
            cgst: `${cit?.cgst || '0'}%`,
            igst: `${cit?.igst || '0'}%`,
            edit: {
              buttonLabel: <i className="simple-icon-note" />,
              id: cit?.id,
              onClick: () => {
                setEditData(cit);
              },
            },
            action: {
              buttonLabel: <i className="simple-icon-trash" />,
              id: cit?.id,
              onClick: deleteCity,
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
          marginTop: '15px',
        }}
        onClick={() => {
          setIsCityModalOpen((prevState) => !prevState);
        }}
      >
        <IntlMessages id="button.add.city" />
      </Button>
      <AddNewModalWithOutButton
        sidebarMenu="SETTING_CITY_MODAL"
        modalTitle="modal.city.title"
        modalOpen={isCityModalOpen || editData !== null}
        toggleModal={() => {
          if (editData !== null) setEditData(null);
          else setIsCityModalOpen((prevState) => !prevState);
        }}
        onSubmit={editData !== null ? editCityData : cityData}
        formData={editData !== null ? editData : {}}
      />
      <AlertPopup
        isOpen={isConfirmationOpen}
        positiveText="Yes"
        negativeText="No"
        warning="Are you sure you want to delete?"
        onNegative={() => {
          setIsConfirmationOpen((prev) => !prev);
          setDeleteCityId(null);
        }}
        onPositive={deleteCityData}
      />
      <ViewTable
        headers={CONSTANTS.TABLE_HEADER.SETTING_CITY_LIST}
        items={city}
        advisorId="table.city"
      />
    </>
  );
};

export default City;
