import React from 'react';
import { Row, Card, CardBody } from 'reactstrap';

import { Colxx } from 'components/common/CustomBootstrap';
import { SmallLineChart } from 'components/charts';

import { smallChartData1, smallChartData2 } from 'data/charts';
import IntlMessages from 'helpers/IntlMessages';

const DashboardBody = ({
  itemClass = 'directory-small-chart',
  TotalUsers = 12,
  TotalOrder = 120,
  TotalSocieties = 12,
  TotalGigs = 12,
  TotalAmount = 12,
}) => {
  return (
    <>
      <Row>
        <Colxx md="4" className="mb-4">
          <Card className={itemClass}>
            <CardBody>
              <IntlMessages id="dashboard.user" />
              <SmallLineChart data={smallChartData1} count={TotalUsers} />
            </CardBody>
          </Card>
        </Colxx>
        <Colxx md="4" className="mb-4">
          <Card className={itemClass}>
            <CardBody>
              <IntlMessages id="dashboard.order" />
              <SmallLineChart data={smallChartData2} count={TotalOrder} />
            </CardBody>
          </Card>
        </Colxx>
        <Colxx md="4" className="mb-4">
          <Card className={itemClass}>
            <CardBody>
              <IntlMessages id="dashboard.societies" />
              <SmallLineChart data={smallChartData2} count={TotalSocieties} />
            </CardBody>
          </Card>
        </Colxx>
      </Row>
      <Row>
        <Colxx md="4" className="mb-4">
          <Card className={itemClass}>
            <CardBody>
              <IntlMessages id="dashboard.gigs" />
              <SmallLineChart data={smallChartData1} count={TotalGigs} />
            </CardBody>
          </Card>
        </Colxx>

        <Colxx md="4" className="mb-4">
          <Card className={itemClass}>
            <CardBody>
              <IntlMessages id="dashboard.amount" />
              <SmallLineChart data={smallChartData2} count={TotalAmount} />
            </CardBody>
          </Card>
        </Colxx>
      </Row>
    </>
  );
};

export default DashboardBody;
