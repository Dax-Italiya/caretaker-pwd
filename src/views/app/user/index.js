import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import ViewTable from 'utils/ReactTableCards';
import CONSTANTS, { urlList } from 'utils/CONSTANTS';
import useHttp from 'hooks/Use-http';
import AlertPopup from 'components/alert-popup';

const User = () => {
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const history = useHistory();
  const [users, setUsers] = useState([]);
  const [deleteUserId, setDeleteUserId] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const api = useHttp();

  // Navigate to UserDetai Page
  const userDetail = (id) => {
    history.push(`/app/users/${id}`);
    // console.log('render');
  };

  // Delete User Data
  const deleteUser = (id) => {
    setDeleteUserId(id);
    setIsConfirmationOpen((prev) => !prev);
  };

  const deleteUserData = () => {
    const DELETE_USER_API = { ...urlList.deleteUser };
    DELETE_USER_API.endpoint = DELETE_USER_API.endpoint.replace(
      ':id',
      deleteUserId
    );
    api.sendRequest(DELETE_USER_API, () => {
      setDeleteUserId(null);
      setRefresh((prev) => !prev);
    });
    setIsConfirmationOpen((prev) => !prev);
  };

  // Block User
  const blockUser = (userId, checked) => {
    const payload = {
      isBlocked: checked,
    };
    const USER_BLOCK_API = { ...urlList.editUser };
    USER_BLOCK_API.endpoint = USER_BLOCK_API.endpoint.replace(':id', userId);
    api.sendRequest(
      USER_BLOCK_API,
      () => {
        setRefresh((prev) => !prev);
      },
      payload
    );
  };

  // Get All User Data
  useEffect(() => {
    api.sendRequest(urlList.getUsers, (res) => {
      // console.log(res.data);
      const headers = res?.data?.users.map((user, index) => {
        return {
          ...user,
          no: index + 1,
          view: {
            buttonLabel: <i className="simple-icon-eye" />,
            id: user?.id,
            onClick: userDetail,
          },
          toggle: {
            checked: !user?.isBlocked,
            id: user?.id,
            onClick: blockUser,
          },
          action: {
            buttonLabel: <i className="simple-icon-trash" />,
            id: user?.id,
            onClick: deleteUser,
          },
        };
      });
      setUsers(headers);
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
          setDeleteUserId(null);
        }}
        onPositive={deleteUserData}
      />
      <ViewTable
        headers={CONSTANTS.TABLE_HEADER.USER_LIST}
        items={users}
        advisorId="table.user"
      />
    </>
  );
};

export default User;
