import React, { useEffect, useState } from 'react';
import IntlMessages from 'helpers/IntlMessages';
import { Button } from 'reactstrap';
import CONSTANTS, { CURRANT_USER, urlList } from 'utils/CONSTANTS';
import ViewTable from 'utils/ReactTableCards';
import AddNewModalWithOutButton from 'components/advisor/add-new-Modal-with-out-button';
import { useHistory } from 'react-router-dom';
import useHttp from 'hooks/Use-http';
import AlertPopup from 'components/alert-popup';

const RolenAccess = () => {
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteAdminId, setDeleteAdminId] = useState(null);
  const [refresh, setRefresh] = useState([]);
  const [admins, setAdmins] = useState([]);
  const history = useHistory();
  const api = useHttp();

  console.log(deleteAdminId);

  // Navigate to Manage and Access Page
  const roleform = (id) => {
    history.push(`/app/role-and-access/${id}`);
    // console.log('render');
  };

  // Add Team Data
  const roleData = (e) => {
    e.preventDefault();
    // console.log('Data Added');
    const payload = {
      name: e.target.name.value,
      email: e.target.email.value,
      password: e.target.password.value,
      mobile: e.target.mobile.value,
    };
    // console.log(payload);
    api.sendRequest(
      urlList.addTeam,
      () => {
        setRefresh((prev) => !prev);
      },
      payload
    );
    setIsModalOpen((prev) => !prev);
  };

  // Delete Team Data
  const deleteAdmin = (id) => {
    setDeleteAdminId(id);
    setIsConfirmationOpen((prev) => !prev);
  };
  const deleteAdminData = () => {
    console.log('Data Deleted');
    setIsConfirmationOpen((prev) => !prev);
  };

  // Get Data of Team
  useEffect(() => {
    api.sendRequest(urlList.getTeam, (res) => {
      // console.log(res?.data?.admins);
      const adminList = res?.data?.admins?.filter(
        (ele) => ele.id !== CURRANT_USER.user.id
      );

      setAdmins(
        adminList?.map((data, index) => {
          return {
            ...data,
            no: index + 1,
            toggle: {
              checked: !data?.isBlocked,
              id: data?.id,
              onClick: () => {},
            },
            view: {
              buttonLabel: <i className="simple-icon-eye" />,
              id: data?.id,
              onClick: roleform,
            },
            action: {
              buttonLabel: <i className="simple-icon-trash" />,
              id: data?.id,
              onClick: deleteAdmin,
            },
          };
        })
      );
    });
  }, [refresh]);
  return (
    <>
      <AlertPopup
        isOpen={isConfirmationOpen}
        positiveText="Yes"
        negativeText="No"
        warning="Are you sure you want to delete?"
        onNegative={() => {
          setIsConfirmationOpen((prev) => !prev);
          setDeleteAdminId(null);
        }}
        onPositive={deleteAdminData}
      />
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
        <IntlMessages id={CONSTANTS.TABLE_ID.addRole_and_AccessButton} />
      </Button>
      <AddNewModalWithOutButton
        sidebarMenu="ROLE_AND_ACCESS_MODAL"
        modalTitle={CONSTANTS.TABLE_ID.role_and_accessModalTitle}
        modalOpen={isModalOpen}
        toggleModal={() => {
          setIsModalOpen(!isModalOpen);
        }}
        onSubmit={roleData}
        formData={{}}
      />
      <ViewTable
        headers={CONSTANTS.TABLE_HEADER.ROLE_AND_ACCESS_LIST}
        items={admins}
        advisorId="table.role"
      />
    </>
  );
};

export default RolenAccess;
