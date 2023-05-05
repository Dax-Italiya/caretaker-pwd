import React, { useState, useEffect } from 'react';
import CONSTANTS, { urlList } from 'utils/CONSTANTS';
import moment from 'moment';
import useHttp from 'hooks/Use-http';
import ViewTable from 'utils/ReactTableCards';
import AssignModal from './assign-modal';

const UserRequest = () => {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const api = useHttp();
  const DUMMY_DATA = [
    {
      no: 1,
      name: 'John Deo',
      service: 'Home Cleaning',
      type: 'Monthly',
      date: 'March 6, 2023',
      time: '10:00 AM to 11:00 AM ',
      amount: '₹1000',
      status: 'pending  ',
      assign: {
        buttonLabel: 'Assign',
        id: 1,
        onClick: () => setModal((prevState) => !prevState),
      },
      reschedule: {
        buttonLabel: 'Reschedule',
        id: 1,
        onClick: () => {},
      },
    },
    {
      no: 1,
      name: 'John Deo',
      service: 'Home Cleaning',
      type: 'Monthly',
      date: 'March 6, 2023',
      time: '10:00 AM to 11:00 AM ',
      amount: '₹1000',
      status: 'pending  ',
      assign: {
        buttonLabel: 'Assign',
        id: 1,
        onClick: () => setModal((prevState) => !prevState),
      },
      reschedule: {
        buttonLabel: 'Reschedule',
        id: 1,
        onClick: () => {},
      },
    },
    {
      no: 1,
      name: 'John Deo',
      service: 'Home Cleaning',
      type: 'Monthly',
      date: 'March 6, 2023',
      time: '10:00 AM to 11:00 AM ',
      amount: '₹1000',
      status: 'pending  ',
      assign: {
        buttonLabel: 'Assign',
        id: 1,
        onClick: () => setModal((prevState) => !prevState),
      },
      reschedule: {
        buttonLabel: 'Reschedule',
        id: 1,
        onClick: () => {},
      },
    },
  ];
  useEffect(() => {
    api.sendRequest(urlList.getUserData, (res) => {
      // console.log(res?.data);
      const requests = res?.data.filter((data) => {
        return data?.status === 'pending';
      });

      const he = requests.map((data, index) => {
        return {
          ...data,
          no: index + 1,
          service: data?.societyService?.service?.name || 'No-service',
          date: moment(data.date).format('MMMM D, YYYY'),
          time: `${moment(data.startTime, 'HH:mm:ss').format(
            'hh:mm A'
          )} to ${moment(data.endTime, 'HH:mm:ss').format('hh:mm A')}`,
          totalPrice: `₹${data?.totalPrice.toLocaleString('en-IN') || '0'}`,
          action: {
            buttonLabel: 'Assign',
            id: data?.id,
            onClick: () => {},
          },
        };
      });
      console.log(he);
    });
  }, []);
  return (
    <>
      <ViewTable
        headers={CONSTANTS.TABLE_HEADER.USERS_REQUEST_LIST}
        items={DUMMY_DATA}
        advisorId="table.user_request"
      />
      <AssignModal modalOpen={modal} toggleModal={toggle} />
    </>
  );
};

export default UserRequest;
