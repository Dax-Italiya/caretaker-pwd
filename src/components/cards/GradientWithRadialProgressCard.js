import React from 'react';
import { Card, CardBody } from 'reactstrap';

const GradientWithRadialProgressCard = ({
  title = 'Heaven Apartment, B-1502, Delhi.',
  detail = 'Heaven Apartment',
}) => {
  return (
    <Card className="">
      <CardBody className="justify-content-between d-flex flex-row align-items-center">
        <div>
          {/* <i
            className={`${icon} mr-2 text-white align-text-bottom d-inline-block`}
          /> */}

          {/* <section style={{ position: 'absolute', right: '20px', top: '26px' }}>
            <LargeSwitch isBlock={!isBlock} onChange={onBlockStatusChange} />
          </section> */}

          <div>
            <p className="h3 font-weight-bold mb-5">{detail}</p>
            <div className="d-flex">
              <p className="h5 font-weight-light">Address:</p>
              <p className="h5 font-weight-bold pl-2">{title}</p>
            </div>
            <div className="d-flex">
              <p className="h5 font-weight-light">City:</p>
              <p className="h5 font-weight-bold pl-2">Surat</p>
            </div>
          </div>
        </div>
        <div className="progress-bar-circle progress-bar-banner position-relative" />
      </CardBody>
    </Card>
  );
};
export default React.memo(GradientWithRadialProgressCard);
