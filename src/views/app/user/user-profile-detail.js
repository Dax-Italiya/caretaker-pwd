import React from 'react';
import { Row, Card, CardBody } from 'reactstrap';

import { Colxx } from 'components/common/CustomBootstrap';
import { SmallLineChart } from 'components/charts';

import { smallChartData1, smallChartData2 } from 'data/charts';
import IntlMessages from 'helpers/IntlMessages';

const UserProfileDetail = ({
  itemClass = 'directory-small-chart',
  amount = '₹1,000',
  // service = 15,
  room = 1502,
  parking = 15,
  services,
}) => {
  return (
    <>
      <Row>
        <Colxx xxs="6" sm="6" lg="6" xl="6" className="mb-4">
          <Card className={itemClass}>
            <CardBody>
              <IntlMessages id="user.amount" />
              <SmallLineChart data={smallChartData1} count={amount} />
            </CardBody>
          </Card>
        </Colxx>
        <Colxx xxs="6" sm="6" lg="6" xl="6" className="mb-4">
          <Card className={itemClass}>
            <CardBody>
              <IntlMessages id="user.service" />
              <SmallLineChart data={smallChartData2} count={services} />
            </CardBody>
          </Card>
        </Colxx>
      </Row>
      <Row>
        <Colxx xxs="6" sm="6" lg="6" xl="6" className="mb-4">
          <Card className={itemClass}>
            <CardBody>
              <IntlMessages id="user.room" />
              <SmallLineChart data={smallChartData1} count={room} />
            </CardBody>
          </Card>
        </Colxx>
        <Colxx xxs="6" sm="6" lg="6" xl="6" className="mb-4">
          <Card className={itemClass}>
            <CardBody>
              <IntlMessages id="user.parking" />
              <SmallLineChart data={smallChartData2} count={parking} />
            </CardBody>
          </Card>
        </Colxx>
      </Row>
    </>
  );
};

export default UserProfileDetail;
