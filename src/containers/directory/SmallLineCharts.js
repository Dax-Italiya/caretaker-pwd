import React from 'react';
import { Row, Card, CardBody } from 'reactstrap';

import { Colxx } from 'components/common/CustomBootstrap';
import { SmallLineChart } from 'components/charts';

import { smallChartData1, smallChartData2 } from 'data/charts';
import IntlMessages from 'helpers/IntlMessages';

const SmallLineCharts = ({
  itemClass = 'directory-small-chart',
  callRecords = 0,
  isAdvisor,
  onBlockHandler,
  advisorData,
  loading,
  onApprove,
  onReject,
}) => {
  const isKyc = (userKyc) => {
    if (userKyc.isApproved === true) return false;
    if (userKyc.isRejected) return false;
    return true;
  };
  console.log(isAdvisor);
  console.log(onBlockHandler);
  console.log(loading);
  console.log(onApprove);
  console.log(onReject);
  console.log(isKyc);

  return (
    <>
      <Row>
        <Colxx xxs="6" sm="6" lg="6" xl="6" className="mb-4">
          <Card className={itemClass}>
            <CardBody>
              <IntlMessages id="society.card.tower" />
              <SmallLineChart data={smallChartData1} count={advisorData} />
            </CardBody>
          </Card>
        </Colxx>
        <Colxx xxs="6" sm="6" lg="6" xl="6" className="mb-4">
          <Card className={itemClass}>
            <CardBody>
              <IntlMessages id="society.card.room" />
              <SmallLineChart data={smallChartData2} count={callRecords} />
            </CardBody>
          </Card>
        </Colxx>
      </Row>
    </>
  );
};

export default SmallLineCharts;
