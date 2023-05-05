import React from 'react';
import { Card, CardBody, CardTitle, CardHeader } from 'reactstrap';
import { CircularProgressbar } from 'react-circular-progressbar';

const RadialProgressCard = ({
  title = 'title',
  subTitle = 'sub title',
  detail = 'detail',
  percent = 50,
  isSortable = false,
}) => {
  return (
    <Card>
      {isSortable && (
        <CardHeader className="p-0 position-relative">
          <div className="position-absolute handle card-icon">
            <i className="simple-icon-shuffle" />
          </div>
        </CardHeader>
      )}
      <CardBody className="d-flex justify-content-between align-items-center">
        <div>
          <CardTitle className="mb-0">{title}</CardTitle>
          {subTitle ? <h2>{subTitle}</h2> : null}
          {detail ? <p>{detail}</p> : null}
        </div>

        <div className="progress-bar-circle ml-5">
          <CircularProgressbar
            strokeWidth={4}
            value={percent}
            text={`${percent}%`}
          />
        </div>
      </CardBody>
    </Card>
  );
};
export default React.memo(RadialProgressCard);
