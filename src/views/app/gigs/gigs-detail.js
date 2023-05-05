import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Colxx } from 'components/common/CustomBootstrap';
import { Row } from 'reactstrap';
import { urlList } from 'utils/CONSTANTS';
import useHttp from 'hooks/Use-http';
import GigsDetailBody from './gigs-detail-body';
import GigsProfile from './gigs-profile';
import GigsProfileDetail from './gigs-profile-detail';

import profile from '../../../assets/img/profiles/profile.jpg';

const TRANSACTION_DATA = [
  {
    no: 1,
    date: 'March 6, 2023',
    time: '11:00 AM',
    trId: '#123456',
    amount: '₹1000',
    remaining: '₹500',
    action: {
      buttonLabel: <i className="simple-icon-trash" />,
      id: 1,
      onClick: () => {},
    },
  },
  {
    no: 2,
    date: 'March 6, 2023',
    time: '11:00 AM',
    trId: '#123456',
    amount: '₹1000',
    remaining: '₹500',
    action: {
      buttonLabel: <i className="simple-icon-trash" />,
      id: 1,
      onClick: () => {},
    },
  },
  {
    no: 3,
    date: 'March 6, 2023',
    time: '11:00 AM',
    trId: '#123456',
    amount: '₹1000',
    remaining: '₹500',
    action: {
      buttonLabel: <i className="simple-icon-trash" />,
      id: 1,
      onClick: () => {},
    },
  },
];

const SCHEDULE_DATA = [
  {
    no: 1,
    start: '10:00 AM',
    end: '11:00 AM',
    edit: {
      buttonLabel: <i className="simple-icon-note" />,
      id: 1,
      onClick: () => {},
    },

    action: {
      buttonLabel: <i className="simple-icon-trash" />,
      id: 1,
      onClick: () => {},
    },
  },
  {
    no: 2,
    start: '10:00 AM',
    end: '11:00 AM',
    edit: {
      buttonLabel: <i className="simple-icon-note" />,
      id: 1,
      onClick: () => {},
    },
    action: {
      buttonLabel: <i className="simple-icon-trash" />,
      id: 2,
      onClick: () => {},
    },
  },
];

const ATTENDANCE_DATA = [
  {
    no: 1,
    date: 'March 6, 2023',
    time: '11:00 AM to 01:00 PM',
    present: 'Present',
    absent: '-',
  },
  {
    no: 2,
    date: 'March 6, 2023',
    time: '11:00 AM to 01:00 PM',
    present: '-',
    absent: 'Absent',
  },
  {
    no: 3,
    date: 'March 6, 2023',
    time: '11:00 AM to 01:00 PM',
    present: 'Present',
    absent: '-',
  },
];

const SERVICE_DATA = [
  {
    no: 1,
    service: 'Home cleaning',
    edit: {
      buttonLabel: <i className="simple-icon-note" />,
      id: 1,
      onClick: () => {},
    },

    action: {
      buttonLabel: <i className="simple-icon-trash" />,
      id: 1,
      onClick: () => {},
    },
  },
];

const FEEBACK_DATA = [
  {
    no: 1,
    bookId: '#123456',
    feedback: 'Very good cleaning service',
    rating: 5,
  },
  {
    no: 2,
    bookId: '#123456',
    feedback: 'Very good Cooking service',
    rating: 4,
  },
];

const TICKET_DATA = [
  {
    no: 1,
    date: '31 March 2023',
    time: '11:30 AM',
    comment: 'Lorem ipsum',
    resolveBy: 'Admin',
    resolve: { checked: true, id: 1, onClick: () => {} },
  },
];
const WORK_DATA = [
  {
    no: 1,
    date: '31 March 2023',
    time: '11:30 AM',
    status: 'Rejected',
  },
];

const GigsDetail = () => {
  const [gigProfile, setGigProfile] = useState({});
  const api = useHttp();
  const { gigsId } = useParams();
  console.log(gigsId);
  // GET  GIG Profile Data
  useEffect(() => {
    const GIG_PROFILE_API = { ...urlList.getGigs };
    GIG_PROFILE_API.endpoint = `${GIG_PROFILE_API.endpoint}/${gigsId}`;
    api.sendRequest(GIG_PROFILE_API, (res) => {
      // console.log(res?.data?.gigs);

      const data = res?.data?.gig;
      console.log(data);
      setGigProfile({
        name: data?.name || 'No data',
        mobile: data?.mobile || 'No data',
        profilePic: data?.profilePic || profile,
        ratings: data?.averageRating || 'No data',
      });
    });
  }, []);
  return (
    <>
      <Row>
        <Colxx lg="12" md="6" xl="4">
          <Row>
            <Colxx lg="4" xl="12" className="mb-4">
              <GigsProfile {...gigProfile} />
              {/* <Container className="d-flex justify-content-center align-items-center">
                  <Spinner
                    animation="border"
                    className="d-inline-flex m-2 "
                    color="$theme-color-yellow-granola"
                  />
                </Container> */}
            </Colxx>
          </Row>
        </Colxx>

        <Colxx lg="12" xl="8" className="mb-4">
          <GigsProfileDetail />
        </Colxx>
      </Row>
      <Row>
        <GigsDetailBody
          transaction={TRANSACTION_DATA}
          schedule={SCHEDULE_DATA}
          attendance={ATTENDANCE_DATA}
          service={SERVICE_DATA}
          feedback={FEEBACK_DATA}
          ticket={TICKET_DATA}
          work={WORK_DATA}
        />
      </Row>
    </>
  );
};

export default GigsDetail;
