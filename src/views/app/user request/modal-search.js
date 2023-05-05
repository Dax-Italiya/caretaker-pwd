import React, { useState } from 'react';
import { Col, Input, Label, Row } from 'reactstrap';

const MODAL_DATA = [
  {
    no: 1,
    imgSrc:
      'https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg?cs=srgb&dl=pexels-pixabay-268533.jpg&fm=jpg',
    name: 'John Deo',
    phone: 1234567890,
  },
  {
    no: 2,
    imgSrc:
      'https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg?cs=srgb&dl=pexels-pixabay-268533.jpg&fm=jpg',
    name: 'John Deo',
    phone: 1234567890,
  },
  {
    no: 3,
    imgSrc:
      'https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg?cs=srgb&dl=pexels-pixabay-268533.jpg&fm=jpg',
    name: 'John Deo',
    phone: 1234567890,
  },
  {
    no: 4,
    imgSrc:
      'https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg?cs=srgb&dl=pexels-pixabay-268533.jpg&fm=jpg',
    name: 'John Deo',
    phone: 1234567890,
  },
  {
    no: 5,
    imgSrc:
      'https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg?cs=srgb&dl=pexels-pixabay-268533.jpg&fm=jpg',
    name: 'John Deo',
    phone: 1234567890,
  },
  {
    no: 6,
    imgSrc:
      'https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg?cs=srgb&dl=pexels-pixabay-268533.jpg&fm=jpg',
    name: 'John Deo',
    phone: 1234567890,
  },
  {
    no: 7,
    imgSrc:
      'https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg?cs=srgb&dl=pexels-pixabay-268533.jpg&fm=jpg',
    name: 'John Deo',
    phone: 1234567890,
  },
  {
    no: 8,
    imgSrc:
      'https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg?cs=srgb&dl=pexels-pixabay-268533.jpg&fm=jpg',
    name: 'John Deo',
    phone: 1234567890,
  },
  {
    no: 9,
    imgSrc:
      'https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg?cs=srgb&dl=pexels-pixabay-268533.jpg&fm=jpg',
    name: 'John Deo',
    phone: 1234567890,
  },
  {
    no: 10,
    imgSrc:
      'https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg?cs=srgb&dl=pexels-pixabay-268533.jpg&fm=jpg',
    name: 'John Deo',
    phone: 1234567890,
  },
];

const ModalSearch = ({ onChange }) => {
  const [userInput, setUserInput] = useState('');
  const [selectOpt, setSelectOpt] = useState(null);
  const handleChange = (e) => {
    setUserInput(e.target.value);
    onChange(e.target.value);
  };

  // const chnageGig = (e) => {
  //   setSelectOpt(e.target.value);
  //   console.log(e.target.value);
  // };

  return (
    <>
      <nav className="navbar-search">
        <div className="search w-100">
          <Input
            name="searchKeyword"
            id="searchKeyword"
            placeholder="Search"
            value={userInput}
            onChange={handleChange}
          />
          <span className="search-icon">
            <i className="simple-icon-magnifier" />
          </span>
        </div>
      </nav>
      <div>
        {MODAL_DATA.map((data) => {
          return (
            <Row key={data.no} className="p-2">
              <Col md={2}>
                <div>
                  <img
                    className="list-item-pic"
                    src={data.imgSrc}
                    alt={data.name}
                  />
                </div>
              </Col>
              <Col md={8}>
                <div className="">
                  <Label className="font-weight-bolder h5 d-block mt-1">
                    {data.name}
                  </Label>
                  <Label className="font-weight-lighter">{data.phone}</Label>
                </div>
              </Col>
              <Col md={2}>
                <div className="mt-2">
                  <Input
                    id={data.no}
                    type="radio"
                    checked={data.no === selectOpt}
                    style={{ width: '25px', height: '25px' }}
                    onChange={(e) => {
                      if (e.target.checked) setSelectOpt(data.no);
                    }}
                    // {...(data.no === selectOpt ? 'checked' : '')}
                  />
                </div>
              </Col>
            </Row>
          );
        })}
      </div>
    </>
  );
};

export default ModalSearch;
