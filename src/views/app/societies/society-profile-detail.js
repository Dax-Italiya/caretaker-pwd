import React from 'react';
import { Row, Card, CardBody } from 'reactstrap';

import { Colxx } from 'components/common/CustomBootstrap';
import { SmallLineChart } from 'components/charts';

import { smallChartData1, smallChartData2 } from 'data/charts';
import IntlMessages from 'helpers/IntlMessages';

const SocietyProfileDetail = ({
  itemClass = 'directory-small-chart',
  towerData = 0,
  flatData = 0,
}) => {
  return (
    <>
      <Row>
        <Colxx xxs="6" sm="6" lg="6" xl="6" className="mb-4">
          <Card className={itemClass}>
            <CardBody>
              <IntlMessages id="society.card.tower" />
              <SmallLineChart data={smallChartData1} count={towerData} />
            </CardBody>
          </Card>
        </Colxx>
        <Colxx xxs="6" sm="6" lg="6" xl="6" className="mb-4">
          <Card className={itemClass}>
            <CardBody>
              <IntlMessages id="society.card.flat" />
              <SmallLineChart data={smallChartData2} count={flatData} />
            </CardBody>
          </Card>
        </Colxx>
      </Row>
    </>
  );
};

export default SocietyProfileDetail;
