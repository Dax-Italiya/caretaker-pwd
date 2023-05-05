import React, { useEffect, useState } from 'react';
import { Colxx } from 'components/common/CustomBootstrap';
import { CardBody, Row } from 'reactstrap';
import useHttp from 'hooks/Use-http';
import CONSTANTS, { urlList } from 'utils/CONSTANTS';
import ViewTable from 'utils/ReactTableCards';
import { useParams } from 'react-router-dom';

const User = () => {
  const [users, setUsers] = useState([]);
  const api = useHttp();
  const { id } = useParams();
  useEffect(() => {
    const SOCIETY_USER_API = { ...urlList.getSocietyUsers };
    SOCIETY_USER_API.endpoint = `${SOCIETY_USER_API.endpoint}?societyId=${id}`;
    api.sendRequest(SOCIETY_USER_API, (res) => {
      setUsers(
        res?.data.map((data, index) => {
          return {
            ...data,
            no: index + 1,
            name: data.user.name,
            mobile: data.user.mobile,
            toggle: {
              checked: !data?.isBlocked,
              id: data?.id,
              onClick: () => {},
            },
          };
        })
      );
    });
  }, []);
  return (
    <Row>
      <Colxx sm="12">
        <CardBody>
          <ViewTable
            headers={CONSTANTS.TABLE_HEADER.SOCIETIES_USER_LIST}
            items={users}
            advisorId="table.user"
          />
        </CardBody>
      </Colxx>
    </Row>
  );
};

export default User;
