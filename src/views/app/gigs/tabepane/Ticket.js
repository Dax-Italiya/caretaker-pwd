import React from 'react';
import { Colxx } from 'components/common/CustomBootstrap';
import { CardBody, Row } from 'reactstrap';
import CONSTANTS from 'utils/CONSTANTS';
import ViewTable from 'utils/ReactTableCards';

const Ticket = ({ ticket }) => {
  return (
    <Row>
      <Colxx sm="12">
        <CardBody>
          <ViewTable
            headers={CONSTANTS.TABLE_HEADER.GIGS_TICKET_LIST}
            items={ticket}
            advisorId="table.ticket"
          />
        </CardBody>
      </Colxx>
    </Row>
  );
};

export default Ticket;
