import React from 'react';
import { Button } from 'reactstrap';
import SwitchExamples from 'containers/forms/SwitchExamples';

import TSTLogo from '../assets/logos/blue_logo.svg';

export const urlList = {
  // Login API
  login: { type: 'POST', endpoint: '/admins/login' },
  getAdmin: { type: 'GET', endpoint: '/admins/me' },

  // Society Login API
  societyLogin: { type: 'POST', endpoint: '/society/login' },

  // Update Society Token API
  updateToken: { type: 'PATCH', endpoint: '/society/:id' },

  // Soceity Details API
  getSociety: { type: 'GET', endpoint: '/society/getMe' },

  // Add Gig Attendance through app
  addGigAttendance: { type: 'POST', endpoint: '/gig/gigAttendance' },
};

const textRanders = ({ value }) => <>{value}</>;
// const RouterLinkRanders = ({ value }) => (
//   <Link to={`/app${value.link}`}>{value.value}</Link>
// );

const ImageRanders = ({ value }) => {
  let imageSrc = value;
  if (!imageSrc) {
    imageSrc = TSTLogo;
  }
  return (
    <div>
      <img className="list-item-pic" src={imageSrc} alt={value} />
    </div>
  );
};

const RenderActionButton = ({ value }) => {
  const { buttonLabel, id, onClick } = value;
  return (
    <div>
      <Button
        outline
        onClick={() => {
          onClick(id);
        }}
      >
        {buttonLabel}
      </Button>
    </div>
  );
};

const RenderToggleButton = ({ value }) => {
  const { checked, id, onClick } = value;
  return (
    <div>
      <SwitchExamples
        onChange={() => {
          onClick(id, checked);
        }}
        checked={checked}
      />
    </div>
  );
};
const CONSTANTS = {
  TABLE_ID: {
    add: 'modal.button',
    update: 'modal.update',
    addModal: 'advisor.add-new-modal-title',

    doctor: 'table.react-table-doctor',
    addDoctor: 'doctor.add-new-modal-title',
    editDoctor: 'doctor.edit-new-modal-title',
    doctorAvailability: 'table.react-table-doctorAvailability',
    addDoctorAvailability: 'doctorAvailability.add-new-modal-title',
    editDoctorAvailability: 'doctorAvailability.edit-new-modal-title',
    doctorPublishedPapers: 'table.react-table-doctorPublishedPapers',
    addDoctorPublishedPapers: 'doctorPublishedPapers.add-new-modal-title',
    editDoctorPublishedPapers: 'doctorPublishedPapers.edit-new-modal-title',
    doctorManagementFeedback: 'table.react-table-doctorManagementFeedback',

    // For User
    addUserButton: 'button.add.user',
    userModalTitle: 'modal.user.title',

    // For Service and Tower Service
    addServiceButton: 'button.add.service',
    serviceModalTitle: 'modal.service.title',

    // For Gigs
    addGigsButton: 'button.add.gigs',
    gigsModalTitle: 'modal.gigs.title',
    addscheduleButton: 'button.add.schedule',
    scheduleTitle: 'modal.schedule.title',
    addInfoButton: 'button.add.info',
    infoTitle: 'modal.info.title',

    // For Societies
    addSocietyButton: 'button.add.society',
    addSocietyTitle: 'modal.society.title',

    // For Tower
    addTowerButton: 'button.add.tower',
    towerModalTitle: 'modal.tower.title',

    // For Flats
    addFlatButton: 'button.add.flat',
    flatModalTitle: 'modal.flat.title',

    // For Parking
    addParkingButton: 'button.add.parking',
    parkingModalTitle: 'modal.parking.title',

    // For Attendance
    addAttendanceButton: 'button.add.attendance',
    attendanceTitle: 'modal.attendance.title',

    // For Feedback
    addFeedbackButton: 'button.add.feedback',
    feedbackModalTitle: 'modal.feedback.title',

    // For Role and Access
    addRole_and_AccessButton: 'button.add.role_and_acces',
    role_and_accessModalTitle: 'modal.role_and_acces.title',

    // For Setting
    settingModalTitle: 'modal.category.title',
  },

  TABLE_HEADER: {
    USER_LIST: [
      {
        Header: 'No.',
        accessor: 'no',
        cellClass: 'list-item-heading w-5',
        Cell: textRanders,
      },
      {
        Header: 'Preview',
        accessor: 'view',
        cellClass: 'list-item-heading w-5',
        Cell: RenderActionButton,
      },
      {
        Header: 'Name',
        accessor: 'name',
        cellClass: 'list-item-heading w-15',
        Cell: textRanders,
      },

      {
        Header: 'Mobile',
        accessor: 'mobile',
        cellClass: 'list-item-heading w-15',
        Cell: textRanders,
      },

      {
        Header: 'Block User',
        accessor: 'toggle',
        cellClass: 'list-item-heading w-10',
        Cell: RenderToggleButton,
      },
      {
        Header: 'Action',
        accessor: 'action',
        cellClass: 'list-item-heading w-10',
        Cell: RenderActionButton,
      },
    ],
    USER_SERVICE_LIST: [
      {
        Header: 'No.',
        accessor: 'no',
        cellClass: 'list-item-heading w-5',
        Cell: textRanders,
      },

      {
        Header: 'Service',
        accessor: 'name',
        cellClass: 'list-item-heading w-15',
        Cell: textRanders,
      },
      {
        Header: 'Type',
        accessor: 'subscriptionType',
        cellClass: 'list-item-heading w-10',
        Cell: textRanders,
      },

      {
        Header: 'Start Date',
        accessor: 'date',
        cellClass: 'list-item-heading w-15',
        Cell: textRanders,
      },
      {
        Header: 'Time',
        accessor: 'time',
        cellClass: 'list-item-heading w-20',
        Cell: textRanders,
      },
      {
        Header: 'Amount',
        accessor: 'totalPrice',
        cellClass: 'list-item-heading w-15',
        Cell: textRanders,
      },
      {
        Header: 'Status',
        accessor: 'status',
        cellClass: 'list-item-heading w-15',
        Cell: textRanders,
      },

      {
        Header: 'Action',
        accessor: 'action',
        cellClass: 'list-item-heading w-10',
        Cell: RenderActionButton,
      },
    ],
    USER_REQUEST_LIST: [
      {
        Header: 'No.',
        accessor: 'no',
        cellClass: 'list-item-heading w-5',
        Cell: textRanders,
      },

      {
        Header: 'Service',
        accessor: 'name',
        cellClass: 'list-item-heading w-15',
        Cell: textRanders,
      },
      {
        Header: 'Type',
        accessor: 'subscriptionType',
        cellClass: 'list-item-heading w-10',
        Cell: textRanders,
      },

      {
        Header: 'Start Date',
        accessor: 'date',
        cellClass: 'list-item-heading w-15',
        Cell: textRanders,
      },
      {
        Header: 'Time',
        accessor: 'time',
        cellClass: 'list-item-heading w-20',
        Cell: textRanders,
      },
      {
        Header: 'Amount',
        accessor: 'totalPrice',
        cellClass: 'list-item-heading w-15',
        Cell: textRanders,
      },
      {
        Header: 'Status',
        accessor: 'status',
        cellClass: 'list-item-heading w-15',
        Cell: textRanders,
      },

      {
        Header: 'Action',
        accessor: 'action',
        cellClass: 'list-item-heading w-10',
        Cell: RenderActionButton,
      },
    ],
    USER_TRANSACTION_LIST: [
      {
        Header: 'No.',
        accessor: 'no',
        cellClass: 'list-item-heading w-5',
        Cell: textRanders,
      },
      {
        Header: 'Date',
        accessor: 'date',
        cellClass: 'list-item-heading w-15',
        Cell: textRanders,
      },
      {
        Header: 'Time',
        accessor: 'time',
        cellClass: 'list-item-heading w-20',
        Cell: textRanders,
      },
      {
        Header: 'Transaction ID',
        accessor: 'trId',
        cellClass: 'list-item-heading w-15',
        Cell: textRanders,
      },
      {
        Header: 'Amount',
        accessor: 'totalPrice',
        cellClass: 'list-item-heading w-15',
        Cell: textRanders,
      },

      // {
      //   Header: 'Action',
      //   accessor: 'action',
      //   cellClass: 'list-item-heading w-10',
      //   Cell: RenderActionButton,
      // },
    ],
    USER_TICKET_LIST: [
      {
        Header: 'No.',
        accessor: 'no',
        cellClass: 'list-item-heading w-5',
        Cell: textRanders,
      },
      {
        Header: 'Date',
        accessor: 'date',
        cellClass: 'list-item-heading w-15',
        Cell: textRanders,
      },
      {
        Header: 'Time',
        accessor: 'time',
        cellClass: 'list-item-heading w-15',
        Cell: textRanders,
      },
      {
        Header: 'Comment',
        accessor: 'comment',
        cellClass: 'list-item-heading w-20',
        Cell: textRanders,
      },
      {
        Header: 'Resolved By',
        accessor: 'resolveBy',
        cellClass: 'list-item-heading w-15',
        Cell: textRanders,
      },
      {
        Header: 'Resolved',
        accessor: 'resolve',
        cellClass: 'list-item-heading w-15',
        Cell: RenderToggleButton,
      },
    ],
    SOCIETIES_LIST: [
      {
        Header: 'No.',
        accessor: 'no',
        cellClass: 'list-item-heading w-5',
        Cell: textRanders,
      },
      {
        Header: 'Preview',
        accessor: 'view',
        cellClass: 'list-item-heading w-5',
        Cell: RenderActionButton,
      },

      {
        Header: 'Name',
        accessor: 'name',
        cellClass: 'list-item-heading w-10',
        Cell: textRanders,
      },
      {
        Header: 'Address',
        accessor: 'address',
        cellClass: 'list-item-heading w-20',
        Cell: textRanders,
      },
      {
        Header: 'City',
        accessor: 'city',
        cellClass: 'list-item-heading w-10',
        Cell: textRanders,
      },

      {
        Header: 'Block Society',
        accessor: 'toggle',
        cellClass: 'list-item-heading w-10',
        Cell: RenderToggleButton,
      },
      {
        Header: 'Edit',
        accessor: 'edit',
        cellClass: 'list-item-heading w-5',
        Cell: RenderActionButton,
      },
      {
        Header: 'Action',
        accessor: 'action',
        cellClass: 'list-item-heading w-5',
        Cell: RenderActionButton,
      },
    ],
    TOWER_LIST: [
      {
        Header: 'No.',
        accessor: 'no',
        cellClass: 'list-item-heading w-5',
        Cell: textRanders,
      },

      {
        Header: 'Tower Name',
        accessor: 'name',
        cellClass: 'list-item-heading w-40',
        Cell: textRanders,
      },

      {
        Header: 'Block Tower',
        accessor: 'toggle',
        cellClass: 'list-item-heading w-10',
        Cell: RenderToggleButton,
      },
      {
        Header: 'Edit',
        accessor: 'edit',
        cellClass: 'list-item-heading w-5',
        Cell: RenderActionButton,
      },
      {
        Header: 'Action',
        accessor: 'action',
        cellClass: 'list-item-heading w-5',
        Cell: RenderActionButton,
      },
    ],
    FLAT_LIST: [
      {
        Header: 'No.',
        accessor: 'no',
        cellClass: 'list-item-heading w-5',
        Cell: textRanders,
      },
      {
        Header: 'Preview',
        accessor: 'view',
        cellClass: 'list-item-heading w-10',
        Cell: RenderActionButton,
      },

      {
        Header: 'Tower Name',
        accessor: 'tower',
        cellClass: 'list-item-heading w-20',
        Cell: textRanders,
      },
      {
        Header: 'Flat Number',
        accessor: 'name',
        cellClass: 'list-item-heading w-40',
        Cell: textRanders,
      },

      {
        Header: 'Block Flat',
        accessor: 'toggle',
        cellClass: 'list-item-heading w-10',
        Cell: RenderToggleButton,
      },
      {
        Header: 'Edit',
        accessor: 'edit',
        cellClass: 'list-item-heading w-5',
        Cell: RenderActionButton,
      },
      {
        Header: 'Action',
        accessor: 'action',
        cellClass: 'list-item-heading w-5',
        Cell: RenderActionButton,
      },
    ],
    SOCIETIES_SERVICE_LIST: [
      {
        Header: 'No.',
        accessor: 'no',
        cellClass: 'list-item-heading w-5',
        Cell: textRanders,
      },
      {
        Header: 'Service Name',
        accessor: 'name',
        cellClass: 'list-item-heading w-15',
        Cell: textRanders,
      },
      {
        Header: 'Daily Price',
        accessor: 'perDayCost',
        cellClass: 'list-item-heading w-10',
        Cell: textRanders,
      },
      {
        Header: 'Monthly Price',
        accessor: 'perMonthCost',
        cellClass: 'list-item-heading w-10',
        Cell: textRanders,
      },

      {
        Header: 'Block Room',
        accessor: 'toggle',
        cellClass: 'list-item-heading w-10',
        Cell: RenderToggleButton,
      },
      {
        Header: 'Edit',
        accessor: 'edit',
        cellClass: 'list-item-heading w-5',
        Cell: RenderActionButton,
      },
      {
        Header: 'Action',
        accessor: 'action',
        cellClass: 'list-item-heading w-5',
        Cell: RenderActionButton,
      },
    ],
    PARKING_LIST: [
      {
        Header: 'No.',
        accessor: 'no',
        cellClass: 'list-item-heading w-5',
        Cell: textRanders,
      },

      {
        Header: 'Parking Name',
        accessor: 'name',
        cellClass: 'list-item-heading w-35 ',
        Cell: textRanders,
      },

      {
        Header: 'Block Room',
        accessor: 'toggle',
        cellClass: 'list-item-heading w-10',
        Cell: RenderToggleButton,
      },
      {
        Header: 'Edit',
        accessor: 'edit',
        cellClass: 'list-item-heading w-10',
        Cell: RenderActionButton,
      },
      {
        Header: 'Action',
        accessor: 'action',
        cellClass: 'list-item-heading w-5',
        Cell: RenderActionButton,
      },
    ],
    SOCIETIES_USER_LIST: [
      {
        Header: 'No.',
        accessor: 'no',
        cellClass: 'list-item-heading w-5',
        Cell: textRanders,
      },
      {
        Header: 'Name',
        accessor: 'name',
        cellClass: 'list-item-heading w-15',
        Cell: textRanders,
      },
      {
        Header: 'Mobile number',
        accessor: 'mobile',
        cellClass: 'list-item-heading w-65',
        Cell: textRanders,
      },
      {
        Header: 'Block User',
        accessor: 'toggle',
        cellClass: 'list-item-heading w-10',
        Cell: RenderToggleButton,
      },
    ],
    SERVICE_LIST: [
      {
        Header: 'No.',
        accessor: 'no',
        cellClass: 'list-item-heading w-5',
        Cell: textRanders,
      },
      {
        Header: 'Preview',
        accessor: 'view',
        cellClass: 'list-item-heading w-10',
        Cell: RenderActionButton,
      },

      {
        Header: 'Service Name',
        accessor: 'name',
        cellClass: 'list-item-heading w-15',
        Cell: textRanders,
      },
      {
        Header: 'Label',
        accessor: 'label',
        cellClass: 'list-item-heading w-10',
        Cell: textRanders,
      },
      {
        Header: 'Category',
        accessor: 'category',
        cellClass: 'list-item-heading w-20',
        Cell: textRanders,
      },

      {
        Header: 'Edit',
        accessor: 'edit',
        cellClass: 'list-item-heading w-10',
        Cell: RenderActionButton,
      },
      {
        Header: 'Action',
        accessor: 'action',
        cellClass: 'list-item-heading w-10',
        Cell: RenderActionButton,
      },
    ],
    SERVICE_VARIETY_LIST: [
      {
        Header: 'No.',
        accessor: 'no',
        cellClass: 'list-item-heading w-5',
        Cell: textRanders,
      },
      {
        Header: 'Variety Name',
        accessor: 'optionName',
        cellClass: 'list-item-heading w-10',
        Cell: textRanders,
      },
      {
        Header: 'Edit',
        accessor: 'edit',
        cellClass: 'list-item-heading w-5',
        Cell: RenderActionButton,
      },
      {
        Header: 'Action',
        accessor: 'action',
        cellClass: 'list-item-heading w-5',
        Cell: RenderActionButton,
      },
    ],
    USERS_REQUEST_LIST: [
      {
        Header: 'No.',
        accessor: 'no',
        cellClass: 'list-item-heading w-5',
        Cell: textRanders,
      },

      {
        Header: 'Name',
        accessor: 'name',
        cellClass: 'list-item-heading w-10',
        Cell: textRanders,
      },
      {
        Header: 'Service',
        accessor: 'service',
        cellClass: 'list-item-heading w-15',
        Cell: textRanders,
      },
      {
        Header: 'Type',
        accessor: 'subscriptionType',
        cellClass: 'list-item-heading w-10',
        Cell: textRanders,
      },

      {
        Header: 'Start Date',
        accessor: 'date',
        cellClass: 'list-item-heading w-15',
        Cell: textRanders,
      },
      {
        Header: 'Time',
        accessor: 'time',
        cellClass: 'list-item-heading w-20',
        Cell: textRanders,
      },
      {
        Header: 'Amount',
        accessor: 'totalPrice',
        cellClass: 'list-item-heading w-10',
        Cell: textRanders,
      },
      {
        Header: 'Status',
        accessor: 'status',
        cellClass: 'list-item-heading w-10',
        Cell: textRanders,
      },

      {
        Header: 'Action',
        accessor: 'assign',
        cellClass: 'list-item-heading w-10',
        Cell: RenderActionButton,
      },
      {
        Header: '',
        accessor: 'reschedule',
        cellClass: 'list-item-heading w-10',
        Cell: RenderActionButton,
      },
    ],
    GIGS_LIST: [
      {
        Header: 'No.',
        accessor: 'no',
        cellClass: 'list-item-heading w-5',
        Cell: textRanders,
      },
      {
        Header: 'Preview',
        accessor: 'view',
        cellClass: 'list-item-heading w-10',
        Cell: RenderActionButton,
      },
      {
        Header: 'Profile',
        accessor: 'profilePic',
        cellClass: 'list-item-pic w-10',
        Cell: ImageRanders,
      },

      {
        Header: 'Name',
        accessor: 'name',
        cellClass: 'list-item-heading w-15',
        Cell: textRanders,
      },

      {
        Header: 'mobile',
        accessor: 'mobile',
        cellClass: 'list-item-heading w-20',
        Cell: textRanders,
      },
      {
        Header: 'Leave',
        accessor: 'leave',
        cellClass: 'list-item-heading w-10',
        Cell: textRanders,
      },
      {
        Header: 'Block Gig',
        accessor: 'toggle',
        cellClass: 'list-item-heading w-10',
        Cell: RenderToggleButton,
      },
      {
        Header: 'Action',
        accessor: 'action',
        cellClass: 'list-item-heading w-10',
        Cell: RenderActionButton,
      },
    ],
    GIGS_TRANSACTION_LIST: [
      {
        Header: 'No.',
        accessor: 'no',
        cellClass: 'list-item-heading w-5',
        Cell: textRanders,
      },
      {
        Header: 'Date',
        accessor: 'date',
        cellClass: 'list-item-heading w-15',
        Cell: textRanders,
      },
      {
        Header: 'Time',
        accessor: 'time',
        cellClass: 'list-item-heading w-15',
        Cell: textRanders,
      },
      {
        Header: 'Transaction ID',
        accessor: 'trId',
        cellClass: 'list-item-heading w-15',
        Cell: textRanders,
      },
      {
        Header: 'Amount',
        accessor: 'amount',
        cellClass: 'list-item-heading w-15',
        Cell: textRanders,
      },
    ],
    GIGS_SCHEDULE_LIST: [
      {
        Header: 'No.',
        accessor: 'no',
        cellClass: 'list-item-heading w-10',
        Cell: textRanders,
      },
      {
        Header: 'Start Time',
        accessor: 'startTime',
        cellClass: 'list-item-heading w-40',
        Cell: textRanders,
      },
      {
        Header: 'End Time',
        accessor: 'endTime',
        cellClass: 'list-item-heading w-40',
        Cell: textRanders,
      },
      {
        Header: 'Edit',
        accessor: 'edit',
        cellClass: 'list-item-heading w-10',
        Cell: RenderActionButton,
      },
    ],
    GIGS_ATTENDANCE_LIST: [
      {
        Header: 'No.',
        accessor: 'no',
        cellClass: 'list-item-heading w-5',
        Cell: textRanders,
      },
      {
        Header: 'Date',
        accessor: 'date',
        cellClass: 'list-item-heading w-30',
        Cell: textRanders,
      },
      {
        Header: 'Time',
        accessor: 'time',
        cellClass: 'list-item-heading w-30',
        Cell: textRanders,
      },
      {
        Header: 'Present',
        accessor: 'present',
        cellClass: 'list-item-heading w-30',
        Cell: textRanders,
      },
      {
        Header: 'Absent',
        accessor: 'absent',
        cellClass: 'list-item-heading w-30',
        Cell: textRanders,
      },
    ],
    GIGS_SERVICE_LIST: [
      {
        Header: 'No.',
        accessor: 'no',
        cellClass: 'list-item-heading w-5',
        Cell: textRanders,
      },
      {
        Header: 'Service',
        accessor: 'service',
        cellClass: 'list-item-heading w-80',
        Cell: textRanders,
      },
      {
        Header: 'Edit',
        accessor: 'edit',
        cellClass: 'list-item-heading w-10',
        Cell: RenderActionButton,
      },
      {
        Header: 'Action',
        accessor: 'action',
        cellClass: 'list-item-heading w-10',
        Cell: RenderActionButton,
      },
    ],
    GIGS_FEEBACK_LIST: [
      {
        Header: 'No.',
        accessor: 'no',
        cellClass: 'list-item-heading w-5',
        Cell: textRanders,
      },
      {
        Header: 'Booking ID',
        accessor: 'bookId',
        cellClass: 'list-item-heading w-10',
        Cell: textRanders,
      },

      {
        Header: 'Ratings',
        accessor: 'rating',
        cellClass: 'list-item-heading w-5',
        Cell: textRanders,
      },
      {
        Header: 'Message',
        accessor: 'feedback',
        cellClass: 'list-item-heading w-35',
        Cell: textRanders,
      },
    ],
    GIGS_TICKET_LIST: [
      {
        Header: 'No.',
        accessor: 'no',
        cellClass: 'list-item-heading w-5',
        Cell: textRanders,
      },
      {
        Header: 'Date',
        accessor: 'date',
        cellClass: 'list-item-heading w-15',
        Cell: textRanders,
      },
      {
        Header: 'Time',
        accessor: 'time',
        cellClass: 'list-item-heading w-15',
        Cell: textRanders,
      },
      {
        Header: 'Comment',
        accessor: 'comment',
        cellClass: 'list-item-heading w-20',
        Cell: textRanders,
      },
      {
        Header: 'Resolved By',
        accessor: 'resolveBy',
        cellClass: 'list-item-heading w-15',
        Cell: textRanders,
      },
      {
        Header: 'Resolved',
        accessor: 'resolve',
        cellClass: 'list-item-heading w-15',
        Cell: RenderToggleButton,
      },
    ],
    GIGS_WORK_LIST: [
      {
        Header: 'No.',
        accessor: 'no',
        cellClass: 'list-item-heading w-5',
        Cell: textRanders,
      },
      {
        Header: 'Date',
        accessor: 'date',
        cellClass: 'list-item-heading w-10',
        Cell: textRanders,
      },
      {
        Header: 'Time',
        accessor: 'time',
        cellClass: 'list-item-heading w-10',
        Cell: textRanders,
      },
      {
        Header: 'Status',
        accessor: 'status',
        cellClass: 'list-item-heading w-10',
        Cell: textRanders,
      },
    ],
    INVOICE_LIST: [
      {
        Header: 'No.',
        accessor: 'no',
        cellClass: 'list-item-heading',
        Cell: textRanders,
      },

      {
        Header: 'User Name',
        accessor: 'uname',
        cellClass: 'list-item-heading w-12',
        Cell: textRanders,
      },
      {
        // user invoice download button
        Header: 'User Invoice',
        accessor: 'user',
        cellClass: 'list-item-heading w-10',
        Cell: RenderActionButton,
      },
      {
        Header: 'Maid Name',
        accessor: 'maidname',
        cellClass: 'list-item-heading w-10',
        Cell: textRanders,
      },
      {
        // maid invoice download button
        Header: 'Maid Invoice',
        accessor: 'maid',
        cellClass: 'list-item-heading w-10',
        Cell: RenderActionButton,
      },
      {
        Header: 'Service Name',
        accessor: 'service',
        cellClass: 'list-item-heading w-12',
        Cell: textRanders,
      },
      {
        Header: 'Start Date',
        accessor: 'stdate',
        cellClass: 'list-item-heading w-10',
        Cell: textRanders,
      },
      {
        Header: 'End Date',
        accessor: 'endate',
        cellClass: 'list-item-heading w-10',
        Cell: textRanders,
      },
      {
        Header: 'Time',
        accessor: 'time',
        cellClass: 'list-item-heading w-15',
        Cell: textRanders,
      },
      {
        Header: 'Total Charge',
        accessor: 'amount',
        cellClass: 'list-item-heading w-10',
        Cell: textRanders,
      },
    ],
    FEEDBACK_LIST: [
      {
        Header: 'No.',
        accessor: 'no',
        cellClass: 'list-item-heading w-5',
        Cell: textRanders,
      },
      {
        Header: 'Booking ID',
        accessor: 'bookId',
        cellClass: 'list-item-heading w-10',
        Cell: textRanders,
      },
      {
        Header: 'User Name',
        accessor: 'uname',
        cellClass: 'list-item-heading w-10',
        Cell: textRanders,
      },
      {
        Header: 'Gig Name',
        accessor: 'gigname',
        cellClass: 'list-item-heading w-10',
        Cell: textRanders,
      },
      {
        Header: 'Ratings',
        accessor: 'rating',
        cellClass: 'list-item-heading w-5',
        Cell: textRanders,
      },
      {
        Header: 'Message',
        accessor: 'feedback',
        cellClass: 'list-item-heading w-35',
        Cell: textRanders,
      },
    ],
    ROLE_AND_ACCESS_LIST: [
      {
        Header: 'No.',
        accessor: 'no',
        cellClass: 'list-item-heading w-5',
        Cell: textRanders,
      },
      {
        Header: 'Preview',
        accessor: 'view',
        cellClass: 'list-item-heading w-5',
        Cell: RenderActionButton,
      },

      {
        Header: 'Name',
        accessor: 'name',
        cellClass: 'list-item-heading w-10',
        Cell: textRanders,
      },
      {
        Header: 'Mobile Number',
        accessor: 'mobile',
        cellClass: 'list-item-heading w-10',
        Cell: textRanders,
      },
      {
        Header: 'Email',
        accessor: 'email',
        cellClass: 'list-item-heading w-15',
        Cell: textRanders,
      },

      {
        Header: 'Toggle',
        accessor: 'toggle',
        cellClass: 'list-item-heading w-10',
        Cell: RenderToggleButton,
      },
      {
        Header: 'Action',
        accessor: 'action',
        cellClass: 'list-item-heading w-10',
        Cell: RenderActionButton,
      },
    ],
    SETTING_LIST: [
      {
        Header: 'No.',
        accessor: 'no',
        cellClass: 'list-item-heading w-5',
        Cell: textRanders,
      },

      {
        Header: 'Service Category Name',
        accessor: 'name',
        cellClass: 'list-item-heading w-60',
        Cell: textRanders,
      },
      {
        Header: 'Edit',
        accessor: 'edit',
        cellClass: 'list-item-heading w-5',
        Cell: RenderActionButton,
      },
      {
        Header: 'Action',
        accessor: 'action',
        cellClass: 'list-item-heading w-5',
        Cell: RenderActionButton,
      },
    ],
    ATTENDACNE_LIST: [
      {
        Header: 'No.',
        accessor: 'no',
        cellClass: 'list-item-heading w-5',
        Cell: textRanders,
      },
      {
        Header: 'Profile',
        accessor: 'profilePic',
        cellClass: 'list-item-pic w-5',
        Cell: ImageRanders,
      },
      {
        Header: 'Name',
        accessor: 'name',
        cellClass: 'list-item-heading w-15',
        Cell: textRanders,
      },
      {
        Header: 'Date',
        accessor: 'date',
        cellClass: 'list-item-heading w-15',
        Cell: textRanders,
      },
      {
        Header: 'Time',
        accessor: 'time',
        cellClass: 'list-item-heading w-15',
        Cell: textRanders,
      },
    ],
    SETTING_CITY_LIST: [
      {
        Header: 'No.',
        accessor: 'no',
        cellClass: 'list-item-heading w-5',
        Cell: textRanders,
      },
      {
        Header: 'Profile',
        accessor: 'profilePic',
        cellClass: 'list-item-pic w-10',
        Cell: ImageRanders,
      },
      {
        Header: 'City Name',
        accessor: 'name',
        cellClass: 'list-item-heading w-15',
        Cell: textRanders,
      },
      {
        Header: 'CGST',
        accessor: 'cgst',
        cellClass: 'list-item-heading w-10',
        Cell: textRanders,
      },
      {
        Header: 'IGST',
        accessor: 'igst',
        cellClass: 'list-item-heading w-10',
        Cell: textRanders,
      },
      {
        Header: 'SGST',
        accessor: 'sgst',
        cellClass: 'list-item-heading w-20',
        Cell: textRanders,
      },
      {
        Header: 'Edit',
        accessor: 'edit',
        cellClass: 'list-item-heading w-10',
        Cell: RenderActionButton,
      },
      {
        Header: 'Action',
        accessor: 'action',
        cellClass: 'list-item-heading w-10',
        Cell: RenderActionButton,
      },
    ],
  },

  RIGHT_SIDEBAR_FIELD: {
    USER_MODAL: [
      {
        no: 0,
        Label: 'form.user.profilePic',
        name: 'profilePic',
        id: 'profilePic',
        type: 'file',
        required: true,
      },
      {
        no: 1,
        Label: 'form.user.name',
        name: 'userName',
        id: 'userName',
        type: 'text',
        required: true,
      },
      {
        no: 2,
        Label: 'form.user.email',
        name: 'email',
        id: 'email',
        type: 'email',
        required: true,
      },
      {
        no: 3,
        Label: 'form.user.mobile',
        name: 'mobile',
        id: 'mobile',
        type: 'number',
        required: true,
      },
    ],
    USER_INFO_MODAL: [
      {
        no: 0,
        Label: 'form.gigs.msg',
        name: 'msg',
        id: 'msg',
        type: 'text',
        required: true,
      },
    ],
    SERVICE_MODAL: [
      {
        no: 0,
        Label: 'form.service.name',
        name: 'name',
        id: 'name',
        type: 'text',
        required: true,
      },
      {
        no: 1,
        Label: 'form.service.label',
        name: 'label',
        id: 'label',
        type: 'select',
        option: [
          {
            value: 'New',
            label: 'New',
          },

          {
            value: 'Upcoming',
            label: 'Upcoming',
          },
        ],
        required: false,
      },
      {
        no: 2,
        Label: 'form.service.type',
        name: 'serviceCategoryId',
        id: 'serviceCategoryId',
        type: 'select',

        required: false,
      },
      {
        no: 3,
        Label: 'form.service.image',
        name: 'image',
        id: 'image',
        type: 'file',
        required: true,
      },
      {
        no: 5,
        Label: '+ Add',
        name: 'add',
        id: 'add',
        type: 'include',
        required: true,
        field: [
          [
            {
              no: 0,
              name: 'desc',
              id: 'desc',
              type: 'text',
              required: true,
            },
            {
              no: 1,
              name: 'menu',
              id: 'menu',
              type: 'select',
              option: [
                {
                  value: 'include',
                  label: 'Include',
                },
                {
                  value: 'exclude',
                  label: 'Exclude',
                },
              ],
              required: true,
            },
          ],
        ],
      },
    ],
    EDIT_SERVICE_MODAL: [
      {
        no: 0,
        Label: 'form.service.name',
        name: 'name',
        id: 'name',
        type: 'text',
        required: true,
      },
      {
        no: 1,
        Label: 'form.service.label',
        name: 'label',
        id: 'label',
        type: 'select',
        option: [
          {
            value: 'New',
            label: 'New',
          },

          {
            value: 'Upcoming',
            label: 'Upcoming',
          },
        ],
        required: false,
      },
      {
        no: 2,
        Label: 'form.service.type',
        name: 'serviceCategoryId',
        id: 'serviceCategoryId',
        type: 'select',

        required: false,
      },
      {
        no: 3,
        Label: 'form.service.image',
        name: 'image',
        id: 'image',
        type: 'file',
        required: false,
      },
      {
        no: 5,
        Label: '+ Add',
        name: 'add',
        id: 'add',
        type: 'include',
        required: true,
      },
    ],
    SERVICE_VARIETY_MODAL: [
      {
        no: 0,
        Label: 'service.label',
        name: 'varietyLabel',
        id: 'varietyLabel',
        type: 'text',
        required: true,
      },
      {
        no: 1,
        Label: 'Variety option',
        name: 'optionName',
        id: 'optionName',
        type: 'addvariety',

        required: true,
      },
    ],
    EDIT_SERVICE_VARIETY_MODAL: [
      {
        no: 0,
        Label: 'service.label',
        name: 'varietyLabel',
        id: 'varietyLabel',
        type: 'text',
        required: true,
      },
    ],
    SERVICE_VARIETY_CARD_MODAL: [
      {
        no: 0,
        Label: 'Variety Option',
        name: 'optionName',
        id: 'optionName',
        type: 'addvariety',

        required: true,
      },
    ],
    EDIT_SERVICE_VARIETY_CARD_MODAL: [
      {
        no: 0,
        Label: 'variety.option',
        name: 'optionName',
        id: 'optionName',
        type: 'text',

        required: true,
      },
    ],
    SOCIETIES_MODAL: [
      {
        no: 0,
        Label: 'form.society.name',
        name: 'name',
        id: 'name',
        type: 'text',
        required: true,
      },
      {
        no: 0,
        Label: 'form.society.charge',
        name: 'serviceCharge',
        id: 'serviceCharge',
        type: 'number',
        required: true,
      },
      {
        no: 1,
        Label: 'form.society.mobile',
        name: 'mobile',
        id: 'mobile',
        type: 'number',
        required: true,
      },
      {
        no: 2,
        Label: 'form.society.person',
        name: 'personInCharge',
        id: 'personInCharge',
        type: 'text',
        required: true,
      },
      {
        no: 3,
        Label: 'form.society.email',
        name: 'email',
        id: 'email',
        type: 'email',
        required: true,
      },
      {
        no: 4,
        Label: 'form.society.address',
        name: 'address',
        id: 'address',
        type: 'text',
        required: true,
      },
      {
        no: 5,
        Label: 'form.society.city',
        name: 'city',
        id: 'city',
        type: 'select',

        required: false,
      },
    ],
    EDIT_TOWER_MODAL: [
      {
        no: 0,
        Label: 'form.tower.name',
        name: 'name',
        id: 'name',
        type: 'text',

        required: true,
      },
    ],
    TOWER_MODAL: [
      {
        no: 0,
        Label: 'Tower Name',
        name: 'name',
        id: 'name',
        type: 'addvariety',

        required: true,
      },
    ],
    FLAT_MODAL: [
      {
        no: 0,
        Label: 'form.room.tower.name',
        name: 'towerId',
        id: 'towerId',
        type: 'select',

        required: false,
      },
      {
        no: 1,
        Label: 'Flat Number',
        name: 'name',
        id: 'name',
        type: 'addvariety',

        required: true,
      },
    ],
    EDIT_FLAT_MODAL: [
      {
        no: 0,
        Label: 'form.room.tower.name',
        name: 'towerId',
        id: 'towerId',
        type: 'select',

        required: false,
      },
      {
        no: 1,
        Label: 'form.flat.option',
        name: 'name',
        id: 'name',
        type: 'text',

        required: true,
      },
    ],
    SOCIETIES_SERVICE_MODAL: [
      {
        no: 0,
        Label: 'form.tower.servic.name',
        name: 'serviceId',
        id: 'serviceId',
        type: 'select',

        required: false,
      },
      {
        no: 1,
        Label: 'form.tower.servic.day',
        name: 'day',
        id: 'day',
        type: 'text',
        required: true,
      },
      {
        no: 2,
        Label: 'form.tower.servic.month',
        name: 'month',
        id: 'month',
        type: 'text',
        required: true,
      },

      {
        no: 3,
        Label: 'form.tower.servic.variety',
        name: 'variety',
        id: 'variety',
        type: 'variety',
        required: true,
        field: [
          [
            {
              no: 0,
              name: 'breakfast',
              value: 'Breakfast',
              id: 'breakfast',
              type: 'text',
              required: true,
            },
            {
              no: 1,
              name: 'cost',
              id: 'cost',
              type: 'text',
              required: true,
            },
          ],
          [
            {
              no: 0,
              name: 'breakfast',
              value: 'Breakfast',
              id: 'breakfast',
              type: 'text',
              required: true,
            },
            {
              no: 1,
              name: 'cost',
              id: 'cost',
              type: 'text',
              required: true,
            },
          ],
        ],
      },

      {
        no: 4,
        Label: 'Add Time',
        name: 'add',
        id: 'add',
        type: 'addtime',

        required: true,
      },
    ],
    PARKING_MODAL: [
      {
        no: 0,
        Label: 'Parking Name',
        name: 'name',
        id: 'name',
        type: 'addvariety',

        required: true,
      },
    ],
    EDIT_PARKING_MODAL: [
      {
        no: 0,
        Label: 'form.parking.name',
        name: 'name',
        id: 'name',
        type: 'text',

        required: true,
      },
    ],
    GIGS_MODAL: [
      {
        no: 0,
        Label: 'form.gigs.name',
        name: 'name',
        id: 'name',
        type: 'text',
        required: true,
      },
      {
        no: 1,
        Label: 'form.gigs.mobile',
        name: 'mobile',
        id: 'mobile',
        type: 'number',
        required: true,
      },
      {
        no: 2,
        Label: 'form.gigs.society',
        name: 'societyId',
        id: 'societyId',
        type: 'select',

        required: false,
      },
      {
        no: 3,
        Label: 'form.gigs.profilePic',
        name: 'profilePic',
        id: 'profilePic',
        type: 'file',
        required: true,
      },
      {
        no: 4,
        Label: 'form.gigs.ration',
        name: 'rationCard',
        id: 'rationCard',
        type: 'file',
        required: true,
      },
      {
        no: 5,
        Label: 'form.gigs.aadhar',
        name: 'aadharCard',
        id: 'aadharCard',
        type: 'file',
        required: true,
      },
      {
        no: 6,
        Label: 'form.gigs.pan',
        name: 'panCard',
        id: 'panCard',
        type: 'file',
        required: true,
      },

      {
        no: 7,
        Label: 'form.gigs.other',
        name: 'other',
        id: 'other',
        type: 'file',
        required: true,
      },
    ],
    GIGS_SERVICE_MODAL: [
      {
        no: 0,
        Label: 'form.gigs.service',
        name: 'serviceId',
        id: 'serviceId',
        type: 'select',

        required: false,
      },
    ],

    GIGS_SCHEDULE_MODAL: [
      {
        no: 0,
        name: 'time',
        id: 'time',
        type: 'addtime',

        required: true,
      },
    ],
    EDIT_GIGS_SCHEDULE_MODAL: [
      {
        no: 0,
        Label: 'society.start',
        name: 'startTime',
        id: 'startTime',
        type: 'time',

        required: true,
      },
      {
        no: 1,
        Label: 'society.end',
        name: 'endTime',
        id: 'endTime',
        type: 'time',

        required: true,
      },
    ],
    GIGS_INFO_MODAL: [
      {
        no: 0,
        Label: 'form.gigs.msg',
        name: 'msg',
        id: 'msg',
        type: 'text',
        required: true,
      },
    ],
    FEEDBACK_MODAL: [
      {
        no: 0,
        Label: 'form.user.name',
        name: 'userName',
        id: 'userName',
        type: 'text',
        required: true,
      },
      {
        no: 1,
        Label: 'form.gigs.name',
        name: 'maidName',
        id: 'maidName',
        type: 'text',
        required: true,
      },
      {
        no: 2,
        Label: 'form.service.name',
        name: 'serviceName',
        id: 'serviceName',
        type: 'text',
        required: true,
      },
      {
        no: 3,
        Label: 'form.feedback.message',
        name: 'message',
        id: 'message',
        type: 'text',
        required: true,
      },
      {
        no: 4,
        Label: 'form.feedback.ratings',
        name: 'ratings',
        id: 'ratings',
        type: 'number',
        required: true,
      },
    ],
    ROLE_AND_ACCESS_MODAL: [
      {
        no: 0,
        Label: 'form.role_and_access.name',
        name: 'name',
        id: 'name',
        type: 'text',
        required: true,
      },

      {
        no: 1,
        Label: 'form.role_and_access.password',
        name: 'password',
        id: 'password',
        type: 'password',
        required: true,
      },
      {
        no: 2,
        Label: 'form.role_and_access.email',
        name: 'email',
        id: 'email',
        type: 'email',
        required: true,
      },
      {
        no: 3,
        Label: 'form.role_and_access.mobile',
        name: 'mobile',
        id: 'mobile',
        type: 'number',
        required: true,
      },
    ],
    ATTENDACNE_MODAL: [
      {
        no: 0,
        Label: 'form.attendance.code',
        name: 'code',
        id: 'code',
        type: 'text',
        required: true,
      },
    ],
    SETTING_MODAL: [
      {
        no: 0,
        Label: 'form.service.type',
        name: 'name',
        id: 'name',
        type: 'text',

        required: true,
      },
    ],
    SETTING_CITY_MODAL: [
      {
        no: 0,
        Label: 'form.setting.city',
        name: 'name',
        id: 'name',
        type: 'text',
        required: true,
      },
      {
        no: 1,
        Label: 'form.setting.cgst',
        name: 'cgst',
        id: 'cgst',
        type: 'number',
        required: true,
      },
      {
        no: 2,
        Label: 'form.setting.sgst',
        name: 'sgst',
        id: 'sgst',
        type: 'number',
        required: true,
      },
      {
        no: 3,
        Label: 'form.setting.igst',
        name: 'igst',
        id: 'igst',
        type: 'number',
        required: true,
      },
      {
        no: 4,
        Label: 'form.setting.image',
        name: 'image',
        id: 'image',
        type: 'file',
        required: true,
      },
    ],
  },
};

export const CURRANT_USER = {
  user: {},
};

export const DATE_FORMAT = {
  STANDARD_DISPLAY: 'DD-MM-YYYY',
};

export const DISPLAY_TEXT_TYPE = {
  DATE: 'DATE',
  YES_NO: 'YES_NO',
};

export const GENDER = {
  Male: 'M',
  Female: 'F',
  Other: 'O',
};

export const TAB_MENU = {
  USER: [
    {
      no: 0,
      Label: 'user.service',
      name: 'service',
      id: 'service',
      tabId: 'service',
    },
    {
      no: 1,
      Label: 'user.request',
      name: 'request',
      id: 'request',
      tabId: 'request',
    },
    {
      no: 2,
      Label: 'user.transaction',
      name: 'transaction',
      id: 'transaction',
      tabId: 'transaction',
    },
    {
      no: 5,
      Label: 'user.ticket',
      name: 'ticket',
      id: 'ticket',
      tabId: 'ticket',
    },
  ],
  SOCEITIES: [
    {
      no: 0,
      Label: 'society.tower',
      name: 'tower',
      id: 'tower',
      tabId: 'tower',
    },
    {
      no: 1,
      Label: 'society.flat',
      name: 'flat',
      id: 'flat',
      tabId: 'flat',
    },
    {
      no: 2,
      Label: 'society.service',
      name: 'service',
      id: 'service',
      tabId: 'service',
    },
    {
      no: 3,
      Label: 'society.parking',
      name: 'parking',
      id: 'parking',
      tabId: 'parking',
    },
    {
      no: 4,
      Label: 'society.user',
      name: 'user',
      id: 'user',
      tabId: 'user',
    },
  ],
  GIGS: [
    {
      no: 0,
      Label: 'gigs.transaction',
      name: 'transaction',
      id: 'transaction',
      tabId: 'transaction',
    },
    {
      no: 1,
      Label: 'gigs.schedule',
      name: 'schedule',
      id: 'schedule',
      tabId: 'schedule',
    },
    {
      no: 2,
      Label: 'gigs.attendance',
      name: 'attendance',
      id: 'attendance',
      tabId: 'attendance',
    },
    {
      no: 3,
      Label: 'gigs.service',
      name: 'service',
      id: 'service',
      tabId: 'service',
    },
    {
      no: 4,
      Label: 'gigs.info',
      name: 'info',
      id: 'info',
      tabId: 'info',
    },
    {
      no: 5,
      Label: 'gigs.feedback',
      name: 'feedback',
      id: 'feedback',
      tabId: 'feedback',
    },
    {
      no: 5,
      Label: 'gigs.ticket',
      name: 'ticket',
      id: 'ticket',
      tabId: 'ticket',
    },
    {
      no: 5,
      Label: 'gigs.work',
      name: 'work',
      id: 'work',
      tabId: 'work',
    },
  ],
};

export default CONSTANTS;
