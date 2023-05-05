import React, { useState, useEffect } from 'react';
import useHttp from 'hooks/Use-http';
import { useParams } from 'react-router-dom';
import { Colxx } from 'components/common/CustomBootstrap';
import IntlMessages from 'helpers/IntlMessages';
import { Button, CardBody, Row } from 'reactstrap';
import CONSTANTS, { urlList } from 'utils/CONSTANTS';
import ViewTable from 'utils/ReactTableCards';
import AddNewModalWithOutButton from 'components/advisor/add-new-Modal-with-out-button';

const Service = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [serviceCategory, setServiceCategory] = useState([]);
  const [service, setService] = useState([]);
  const api = useHttp();
  const { id } = useParams();

  const serviceData = (e) => {
    e.preventDefault();
    console.log('service Data Added');
    setIsModalOpen((prevState) => !prevState);
  };

  // Get All Society Service Data
  useEffect(() => {
    const SOCIETIES_SERVICE_API = { ...urlList.getSocietyServices };
    SOCIETIES_SERVICE_API.endpoint = `${SOCIETIES_SERVICE_API.endpoint}?societyId=${id}`;
    api.sendRequest(SOCIETIES_SERVICE_API, (res) => {
      setService(
        res?.data.map((data, index) => {
          return {
            ...data,
            no: index + 1,
            name: data?.service?.name,
            perDayCost: `₹${data?.perDayCost}`,
            perMonthCost: `₹${data?.perMonthCost}`,
            toggle: {
              checked: !data?.society?.isBlocked,
              id: data?.id,
              onClick: () => {},
            },
            edit: {
              buttonLabel: <i className="simple-icon-note" />,
              id: data?.id,
              onClick: () => {},
            },
            action: {
              buttonLabel: <i className="simple-icon-trash" />,
              id: data?.id,
              onClick: () => {},
            },
          };
        })
      );
    });
  }, []);

  // Get ALL Service
  useEffect(() => {
    api.sendRequest(urlList.getServices, (res) => {
      // console.log(res.data);
      setServiceCategory(
        res?.data.map((data, index) => {
          return {
            ...data,
            no: index + 1,
          };
        })
      );
    });
  }, []);
  return (
    <>
      <AddNewModalWithOutButton
        sidebarMenu="SOCIETIES_SERVICE_MODAL"
        modalTitle={CONSTANTS.TABLE_ID.serviceModalTitle}
        modalOpen={isModalOpen}
        toggleModal={() => {
          setIsModalOpen((prev) => !prev);
        }}
        onSubmit={serviceData}
        formData={{
          serviceId: serviceCategory.map((categoryData) => {
            return {
              value: categoryData?.id,
              label: categoryData?.name,
            };
          }),
        }}
      />
      <Row>
        <Colxx sm="12">
          <CardBody>
            <Button
              outline
              color="primary"
              style={{
                position: 'relative',
                top: '-12px',
                left: '-10px',
                margin: '12px',
              }}
              onClick={() => {
                setIsModalOpen((prev) => !prev);
              }}
            >
              <IntlMessages id={CONSTANTS.TABLE_ID.addServiceButton} />
            </Button>
            <ViewTable
              headers={CONSTANTS.TABLE_HEADER.SOCIETIES_SERVICE_LIST}
              items={service}
              advisorId="table.service"
            />
          </CardBody>
        </Colxx>
      </Row>
    </>
  );
};

export default Service;
