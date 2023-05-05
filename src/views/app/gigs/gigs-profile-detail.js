import React from 'react';
import { Row, Card, CardBody } from 'reactstrap';

import { Colxx } from 'components/common/CustomBootstrap';
import { SmallLineChart } from 'components/charts';

import { smallChartData1 } from 'data/charts';
import IntlMessages from 'helpers/IntlMessages';

const GigsProfileDetail = ({
  itemClass = 'directory-small-chart',
  amount = '₹1,000',
}) => {
  return (
    <>
      <Row>
        <Colxx xxs="6" sm="6" lg="6" xl="6" className="mb-4">
          <Card className={itemClass}>
            <CardBody>
              <IntlMessages id="gigs.amount" />
              <SmallLineChart data={smallChartData1} count={amount} />
            </CardBody>
          </Card>
        </Colxx>
      </Row>
    </>
  );
};

export default GigsProfileDetail;
