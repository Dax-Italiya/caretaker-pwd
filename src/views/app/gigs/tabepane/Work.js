import React from 'react';
import { Colxx } from 'components/common/CustomBootstrap';
import { CardBody, Row } from 'reactstrap';
import ViewTable from 'utils/ReactTableCards';
import CONSTANTS from 'utils/CONSTANTS';

const Work = ({ work }) => {
  return (
    <Row>
      <Colxx sm="12">
        <CardBody>
          <ViewTable
            headers={CONSTANTS.TABLE_HEADER.GIGS_WORK_LIST}
            items={work}
            advisorId="table.work"
          />
        </CardBody>
      </Colxx>
    </Row>
  );
};

export default Work;
