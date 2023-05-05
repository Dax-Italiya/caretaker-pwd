import React from 'react';
import CONSTANTS from 'utils/CONSTANTS';
import ViewTable from 'utils/ReactTableCards';

const DUMMY_DATA = [
  {
    no: 1,
    user: {
      buttonLabel: <i className="iconsminds-download-1" />,
      id: 1,
      onClick: () => {},
    },
    uname: 'Ujjwal Patel',
    maidname: 'Gangubai',
    maid: {
      buttonLabel: <i className="iconsminds-download-1" />,
      id: 1,
      onClick: () => {},
    },
    service: 'Kitcher Cleaning',
    stdate: '11-02-21',
    endate: '13-02-21',
    time: '11:00 AM to 01:00 PM ',
    amount: 'Rs.1983',
    action: {
      buttonLabel: <i className="simple-icon-trash" />,
      id: 1,
      onClick: () => {},
    },
  },
  {
    no: 2,

    service: 'Cooking ',
    uname: 'kim oh Han',
    user: {
      buttonLabel: <i className="iconsminds-download-1" />,
      id: 2,
      onClick: () => {},
    },
    maidname: 'Gangubai',
    maid: {
      buttonLabel: <i className="iconsminds-download-1" />,
      id: 2,
      onClick: () => {},
    },
    stdate: '11-02-21',
    endate: '13-02-21',
    time: '11:00 AM to 01:00 PM ',
    amount: 'Rs.2000',
    // toggle: { checked: true, id: 1, onClick: () => {} },
    action: { buttonLabel: <i className="simple-icon-trash" />, id: 2, onClick: () => {} },
  },
];

const InvoicePage = () => {
  const header = CONSTANTS.TABLE_HEADER.INVOICE_LIST;
  return (
    <div>
      <ViewTable
        headers={header}
        items={DUMMY_DATA}
        advisorId="table.invoice"
      />
    </div>
  );
};

export default InvoicePage;
