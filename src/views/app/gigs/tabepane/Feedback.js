import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Colxx } from 'components/common/CustomBootstrap';
import { CardBody, Row } from 'reactstrap';
import CONSTANTS, { urlList } from 'utils/CONSTANTS';
import useHttp from 'hooks/Use-http';
import ViewTable from 'utils/ReactTableCards';

const Feedback = () => {
  const [feedback, setFeedback] = useState([]);
  const api = useHttp();
  const { gigsId } = useParams();
  useEffect(() => {
    const GIGS_FEEBACK_API = { ...urlList.getFeedback };
    GIGS_FEEBACK_API.endpoint = `${GIGS_FEEBACK_API.endpoint}?gigId=${gigsId}`;
    api.sendRequest(GIGS_FEEBACK_API, (res) => {
      setFeedback(
        res?.data.map((data, index) => {
          return {
            ...data,
            no: index + 1,
            bookId: data?.booking?.id,
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
            headers={CONSTANTS.TABLE_HEADER.GIGS_FEEBACK_LIST}
            items={feedback}
            advisorId="table.feedback"
          />
        </CardBody>
      </Colxx>
    </Row>
  );
};

export default Feedback;
