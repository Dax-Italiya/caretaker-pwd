import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Alert, Button, Card, CardBody, Row } from 'reactstrap';
import { Colxx } from 'components/common/CustomBootstrap';
import useHttp from 'hooks/Use-http';
import Services from 'utils/API/service';
import IntlMessages from 'helpers/IntlMessages';
import AddNewModalWithOutButton from 'components/advisor/add-new-Modal-with-out-button';
import CONSTANTS, { urlList } from 'utils/CONSTANTS';
import VarietyCard from './variety-card';

const ServiceVarity = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [serviceName, setServiceName] = useState({});
  const [refresh, setRefresh] = useState(false);
  const [variety, setVariety] = useState([]);
  const { serviceId } = useParams();
  const api = useHttp();

  // console.log(serviceName);

  // Add Service Varity Data
  const serviceVarityData = (e) => {
    e.preventDefault();
    (async () => {
      /* eslint-disable no-await-in-loop */
      for (let i = 0; i <= 10000; i += 1) {
        if (e.target[`optionName_${i}`]?.value) {
          // console.log(e.target[`optionName_${i}`]?.value);
          const payload = {
            optionName: e.target[`optionName_${i}`]?.value,
            varietyLabel: e.target.varietyLabel.value,
            serviceId,
          };

          // console.log(payload);
          await Services.post('/admin/variety', payload);
        } else break;
      }

      setRefresh((prev) => !prev);
      setIsModalOpen((prevState) => !prevState);
    })();
  };

  // Get All Service Varity Data with Card
  useEffect(() => {
    const SERVICE_VARIETY_API = { ...urlList.getServiceVariety };
    SERVICE_VARIETY_API.endpoint = `${SERVICE_VARIETY_API.endpoint}?serviceId=${serviceId}`;
    api.sendRequest(SERVICE_VARIETY_API, (res) => {
      // console.log(res?.data);
      const groupByCategory = res?.data.reduce((group, data) => {
        const { varietyLabel } = data;
        const newGroup = { ...group };
        newGroup[varietyLabel] = newGroup[varietyLabel] ?? [];
        newGroup[varietyLabel].push(data);
        return newGroup;
      }, {});
      // console.log(groupByCategory);
      const resultArray = Object.entries(groupByCategory).map(
        ([key, value]) => ({ [key]: value })
      );
      // console.log(resultArray);
      setVariety(resultArray);
    });
  }, [refresh]);

  // Get Service name
  useEffect(() => {
    const SERVICE_NAME_API = { ...urlList.getServices };
    SERVICE_NAME_API.endpoint = `${SERVICE_NAME_API.endpoint}?id=${serviceId}`;
    api.sendRequest(SERVICE_NAME_API, (res) => {
      setServiceName({
        name: res?.data[0]?.name,
      });
    });
  }, []);
  return (
    <>
      <Row>
        <Colxx lg="12" md="8" xl="4">
          <Row>
            <Colxx lg="4" xl="12" md="8" className="mb-4">
              <Card className="w-80">
                <CardBody className="justify-content-between d-flex flex-row align-items-center">
                  <div>
                    <div>
                      <p className="h3 font-weight-bold mb-5">
                        {serviceName?.name}
                      </p>

                      <Button
                        outline
                        color="primary"
                        onClick={() => setIsModalOpen(true)}
                      >
                        <IntlMessages id="button.add.variety" />
                      </Button>
                    </div>
                  </div>
                  <div className="progress-bar-circle progress-bar-banner position-relative" />
                </CardBody>
              </Card>

              {/* <Container className="d-flex justify-content-center align-items-center">
                  <Spinner
                    animation="border"
                    className="d-inline-flex m-2 "
                    color="$theme-color-yellow-granola"
                  />
                </Container> */}
            </Colxx>
          </Row>
        </Colxx>
      </Row>
      {variety.length === 0 && (
        <Alert color="danger" className="mt-4">
          <IntlMessages id="alert.danger-text" />
        </Alert>
      )}
      <AddNewModalWithOutButton
        sidebarMenu="SERVICE_VARIETY_MODAL"
        modalTitle="modal.Variety.title"
        modalOpen={isModalOpen}
        toggleModal={() => {
          setIsModalOpen(!isModalOpen);
        }}
        onSubmit={serviceVarityData}
        formData={{}}
      />

      {variety?.map((ele, index) => {
        // console.log(Object.keys(ele)[0]);
        const varietyLabel = Object.keys(ele)[0];
        // return console.log(Object.values(ele));
        const items = Object.values(ele);
        const id = index;
        return (
          <VarietyCard
            cardId={id}
            key={id}
            headers={CONSTANTS.TABLE_HEADER.SERVICE_VARIETY_LIST}
            items={items}
            varietyLabel={varietyLabel}
            reload={setRefresh}
          />
        );
      })}
    </>
  );
};

export default ServiceVarity;
