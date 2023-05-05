import React from 'react';
import { Colxx } from 'components/common/CustomBootstrap';
import { CardBody, Row } from 'reactstrap';
import CONSTANTS from 'utils/CONSTANTS';
import ViewTable from 'utils/ReactTableCards';

const Transaction = ({ transaction }) => {
  return (
    <Row>
      <Colxx sm="12">
        <CardBody>
          <ViewTable
            headers={CONSTANTS.TABLE_HEADER.GIGS_TRANSACTION_LIST}
            items={transaction}
            advisorId="table.transaction"
          />
        </CardBody>
      </Colxx>
    </Row>
  );
};

export default Transaction;
