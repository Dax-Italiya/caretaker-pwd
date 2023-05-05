import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useHttp from 'hooks/Use-http';
import { Row } from 'reactstrap';
import { Colxx } from 'components/common/CustomBootstrap';
import { urlList } from 'utils/CONSTANTS';
import SocietyProfile from './society-profile';
import SocietyProfileDetail from './society-profile-detail';
import SocietiesDetail from './societies-detail';

const SERVICE_DATA = [
  {
    no: 1,
    name: 'Bathroom Cleaning',
    perDayCost: '₹99',
    perMonthCost: '₹99',
    category: 'Outdoor Service',
    toggle: { checked: true, id: 1, onClick: () => {} },
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
    name: 'Home Cleaning',
    daily: '₹99',
    monthly: '₹99',
    category: 'Outdoor Service',
    toggle: { checked: true, id: 1, onClick: () => {} },
    edit: {
      buttonLabel: <i className="simple-icon-note" />,
      id: 2,
      onClick: () => {},
    },
    action: {
      buttonLabel: <i className="simple-icon-trash" />,
      id: 2,
      onClick: () => {},
    },
  },
];

const SocietiesInfo = () => {
  const [profileData, setProfileData] = useState([]);
  const [tower, setTower] = useState(null);
  const [flats, setFlats] = useState(null);
  const { id } = useParams();
  const api = useHttp();
  useEffect(() => {
    const SOCEITIY_PROFILE_API = { ...urlList.getSocieties };
    SOCEITIY_PROFILE_API.endpoint = `${SOCEITIY_PROFILE_API.endpoint}?id=${id}`;
    api.sendRequest(SOCEITIY_PROFILE_API, (res) => {
      setProfileData({
        society: res?.data[0].name,
        address: res?.data[0].address,
        mobile: res?.data[0].mobile,
        personInCharge: res?.data[0].personInCharge,
        email: res?.data[0].email,
        city: res?.data[0].city?.name,
      });
    });
  }, []);
  return (
    <>
      <Row>
        <Colxx lg="12" md="8" xl="4">
          <Row>
            <Colxx lg="4" xl="12" className="mb-4">
              <SocietyProfile {...profileData} />:
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

        <Colxx lg="12" xl="8" md="4" className="mb-4">
          <SocietyProfileDetail towerData={tower} flatData={flats} />
        </Colxx>
      </Row>
      <Row>
        <SocietiesDetail
          service={SERVICE_DATA}
          towers={setTower}
          flats={setFlats}
        />
      </Row>
    </>
  );
};
export default SocietiesInfo;
