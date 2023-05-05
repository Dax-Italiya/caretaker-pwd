import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from 'reactstrap';
import CONSTANTS, { urlList } from 'utils/CONSTANTS';
import useHttp from 'hooks/Use-http';
import ViewTable from 'utils/ReactTableCards';
import IntlMessages from 'helpers/IntlMessages';
import AddNewModalWithOutButton from 'components/advisor/add-new-Modal-with-out-button';
import AlertPopup from 'components/alert-popup';

import profile from '../../../assets/img/profiles/profile.jpg';

const Societies = () => {
  const [refresh, setRefresh] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [societies, setSocieties] = useState([]);
  const [editData, setEditData] = useState(null);
  const [deleteSocietyId, setDeleteSocietyId] = useState(null);
  const [city, setCity] = useState([]);
  const history = useHistory();
  const api = useHttp();
  const pagechange = (id) => {
    history.push(`/app/societies/${id}`);
    // console.log('render');
  };

  // Add Society
  const societyData = (e) => {
    e.preventDefault();
    // console.log(e.target.city);
    const payload = {
      mobile: e.target.mobile.value,
      cityId: e.target.city.value,
      address: e.target.address.value,
      name: e.target.name.value,
      email: e.target.email.value,
      serviceCharge: e.target.serviceCharge.value,
      personInCharge: e.target.personInCharge.value,
    };
    // console.log(payload);
    api.sendRequest(
      urlList.addSocieties,
      () => {
        setRefresh((prev) => !prev);
      },
      payload
    );
    setIsModalOpen((prev) => !prev);
  };

  // Edit Society Data
  const editSocietyData = (e) => {
    e.preventDefault();
    // console.log(e.target.city);
    const payload = {
      mobile: e.target.mobile.value,
      cityId: e.target.city.value,
      address: e.target.address.value,
      name: e.target.name.value,
      email: e.target.email.value,
      personInCharge: e.target.personInCharge.value,
      serviceCharge: e.target.serviceCharge.value,
    };
    urlList.editSocieties.endpoint = urlList.editSocieties.endpoint.replace(
      ':id',
      editData?.id
    );
    api.sendRequest(
      urlList.editSocieties,
      () => {
        setEditData(null);
        setRefresh((prev) => !prev);
      },
      payload
    );
  };

  // Delete Society
  const deleteSociety = (id) => {
    setDeleteSocietyId(id);
    setIsConfirmationOpen((prev) => !prev);
  };

  const deleteSocietyData = () => {
    urlList.deleteSocieties.endpoint = urlList.deleteSocieties.endpoint.replace(
      ':id',
      deleteSocietyId
    );
    api.sendRequest(urlList.deleteSocieties, () => {
      setRefresh((prev) => !prev);
    });
    setIsConfirmationOpen((prev) => !prev);
  };

  // Block Society
  const blockSociety = (id, checked) => {
    const payload = {
      isBlocked: checked,
    };
    const blockAPI = { ...urlList.editSocieties };
    blockAPI.endpoint = blockAPI.endpoint.replace(':id', id);
    api.sendRequest(
      blockAPI,
      () => {
        setRefresh((prev) => !prev);
      },
      payload
    );
  };

  // Get Society
  useEffect(() => {
    api.sendRequest(urlList.getSocieties, (res) => {
      setSocieties(
        res?.data.map((society, index) => {
          return {
            ...society,
            no: index + 1,
            city: society?.city?.name,
            view: {
              buttonLabel: <i className="simple-icon-eye" />,
              id: society?.id,
              onClick: pagechange,
            },
            toggle: {
              checked: !society?.isBlocked,
              id: society?.id,
              onClick: blockSociety,
            },
            edit: {
              buttonLabel: <i className="simple-icon-note" />,
              id: society?.id,
              onClick: () => {
                setEditData(society);
              },
            },
            action: {
              buttonLabel: <i className="simple-icon-trash" />,
              id: society?.id,
              onClick: deleteSociety,
            },
          };
        })
      );
    });
  }, [refresh]);

  // Get City
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
          };
        })
      );
    });
  }, []);

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
        onClick={() => setIsModalOpen(true)}
      >
        <IntlMessages id={CONSTANTS.TABLE_ID.addSocietyButton} />
      </Button>
      <AddNewModalWithOutButton
        sidebarMenu="SOCIETIES_MODAL"
        modalTitle={CONSTANTS.TABLE_ID.addSocietyTitle}
        modalOpen={isModalOpen || editData !== null}
        toggleModal={() => {
          if (editData !== null) setEditData(null);
          else setIsModalOpen(!isModalOpen);
        }}
        onSubmit={editData !== null ? editSocietyData : societyData}
        formData={
          editData !== null
            ? {
                ...editData,
                city: city.map((cityData) => {
                  return {
                    value: cityData?.id,
                    label: cityData?.name,
                  };
                }),
              }
            : {
                city: city.map((cityData) => {
                  return {
                    value: cityData?.id,
                    label: cityData?.name,
                  };
                }),
              }
        }
      />
      <AlertPopup
        isOpen={isConfirmationOpen}
        positiveText="Yes"
        negativeText="No"
        warning="Are you sure you want to delete?"
        onNegative={() => {
          setIsConfirmationOpen((prev) => !prev);
          setDeleteSocietyId(null);
        }}
        onPositive={deleteSocietyData}
      />
      <ViewTable
        headers={CONSTANTS.TABLE_HEADER.SOCIETIES_LIST}
        items={societies}
        advisorId="table.societies"
      />
    </>
  );
};

export default Societies;
