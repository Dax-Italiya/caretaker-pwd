import React, { useState } from 'react';
import { Button } from 'reactstrap';
import IntlMessages from 'helpers/IntlMessages';
import AddNewModalWithOutButton from 'components/advisor/add-new-Modal-with-out-button';
import CONSTANTS from 'utils/CONSTANTS';
import ViewTable from 'utils/ReactTableCards';

const DUMMY_DATA = [
  {
    no: 1,
    profilePic:
      'https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg?cs=srgb&dl=pexels-pixabay-268533.jpg&fm=jpg',
    name: 'Ujjwal Patel',
    time: '11:00 AM to 01:00 PM ',
    date: '4 march, 2023',
    action: {
      buttonLabel: <i className="simple-icon-trash" />,
      id: 1,
      onClick: () => {},
    },
  },
  {
    no: 2,
    profilePic:
      'https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg?cs=srgb&dl=pexels-pixabay-268533.jpg&fm=jpg',
    name: 'Uzumaki Naruto',
    time: '11:00 AM to 01:00 PM ',
    date: '4 march, 2023',
    action: {
      buttonLabel: <i className="simple-icon-trash" />,
      id: 1,
      onClick: () => {},
    },
  },
  {
    no: 3,
    profilePic:
      'https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg?cs=srgb&dl=pexels-pixabay-268533.jpg&fm=jpg',
    name: 'Son Goku',
    time: '11:00 AM to 01:00 PM ',
    date: '4 march, 2023',
    action: {
      buttonLabel: <i className="simple-icon-trash" />,
      id: 1,
      onClick: () => {},
    },
  },
];

const Attendance = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const attendanceData = (e) => {
    e.preventDefault();
    console.log('Data Added');
    setIsModalOpen((prevState) => !prevState);
  };
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
        onClick={() => setIsModalOpen((prevState) => !prevState)}
      >
        <IntlMessages id={CONSTANTS.TABLE_ID.addAttendanceButton} />
      </Button>
      <AddNewModalWithOutButton
        sidebarMenu="ATTENDACNE_MODAL"
        modalTitle={CONSTANTS.TABLE_ID.attendanceTitle}
        modalOpen={isModalOpen}
        toggleModal={() => {
          setIsModalOpen((prevState) => !prevState);
        }}
        onSubmit={attendanceData}
        formData={{}}
      />
      <ViewTable
        headers={CONSTANTS.TABLE_HEADER.ATTENDACNE_LIST}
        items={DUMMY_DATA}
        advisorId="table.attendance"
      />
    </>
  );
};

export default Attendance;
