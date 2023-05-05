import React, { useState, useEffect } from 'react';
import useHttp from 'hooks/Use-http';
import { useParams } from 'react-router-dom';
import { urlList } from 'utils/CONSTANTS';
import { Colxx } from 'components/common/CustomBootstrap';
import { Row } from 'reactstrap';
import UserDetailBody from './user-detail-body';
import UserProfileDetail from './user-profile-detail';
import UserProfile from './user-profile';

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

const UserDetail = () => {
  const [userDetails, setUserDetails] = useState({});
  const [noOfServices, setNoOfServices] = useState(null);
  const { userId } = useParams();
  const api = useHttp();

  // console.log(userDetails);
  useEffect(() => {
    const USER_DETAILS_API = { ...urlList.getUserDetail };
    USER_DETAILS_API.endpoint = `${USER_DETAILS_API.endpoint}?userId=${userId}`;
    api.sendRequest(USER_DETAILS_API, (res) => {
      res?.data.map((data) => {
        setUserDetails({
          name: `${data?.user?.name || 'No Data'}`,
          mobile: `: ${data?.user?.mobile || 'No Data'}`,
          address: `: ${data?.society?.address || 'No Data'}`,
          ratings: `: ${data?.ratings || '0'}`,
          amount: `₹${data?.amount || '0'}`,
          room: data?.room?.name || 'No Data',
          parking: data?.parking?.parkingNumber || 'No Data',
        });
        return 0;
      });
    });
  }, []);
  return (
    <>
      <Row>
        <Colxx lg="12" md="6" xl="4">
          <Row>
            <Colxx lg="4" xl="12" className="mb-4">
              <UserProfile {...userDetails} />
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
          <UserProfileDetail {...userDetails} services={noOfServices} />
        </Colxx>
      </Row>
      <Row>
        <UserDetailBody ticket={TICKET_DATA} noOfServices={setNoOfServices} />
      </Row>
    </>
  );
};

export default UserDetail;
