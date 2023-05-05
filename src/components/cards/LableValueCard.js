import React from 'react';
import { Card, CardBody, CardTitle } from 'reactstrap';

const countStyle = {
  marginTop: '9px',
  fontWeight: '800',
};

const LableValueCard = ({ title, value, logo, displayLogo }) => {
  return (
    <Card className="w-100">
      <CardBody className="d-flex align-items-center">
        {displayLogo ? (
          <img
            style={{ borderRadius: '50%', objectFit: 'cover' }}
            src={logo}
            height="70px"
            width="70px"
            alt="Logo"
          />
        ) : null}
        <div
          className={`d-flex justify-content-between align-items-center ${
            logo ? 'ml-4' : ''
          }`}
        >
          <CardTitle className="mb-0">
            {title}
            <h2 style={countStyle}>{value}</h2>
          </CardTitle>
        </div>
      </CardBody>
    </Card>
  );
};

LableValueCard.defaultProps = {
  title: 'title',
  value: 0,
  displayLogo: true,
};

export default React.memo(LableValueCard);
