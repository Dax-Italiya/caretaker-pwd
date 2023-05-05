import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Colxx } from 'components/common/CustomBootstrap';
import { Button, CardBody, Row } from 'reactstrap';
import AddNewModalWithOutButton from 'components/advisor/add-new-Modal-with-out-button';
import CONSTANTS, { urlList } from 'utils/CONSTANTS';
import IntlMessages from 'helpers/IntlMessages';
import ViewTable from 'utils/ReactTableCards';
import useHttp from 'hooks/Use-http';
import AlertPopup from 'components/alert-popup';

const Service = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [service, setService] = useState([]);
  const [serviceCategory, setServiceCategory] = useState([]);
  const [editService, setEditService] = useState(null);
  const [deleteServiceId, setDeleteServiceId] = useState(null);
  const api = useHttp();
  const { gigsId } = useParams();

  const serviceData = (e) => {
    e.preventDefault();
    const payload = {
      gigId: gigsId,
      serviceId: e.target.serviceId?.value,
    };
    api.sendRequest(
      urlList.addGigService,
      () => {
        setRefresh((prevState) => !prevState);
      },
      payload
    );
    setIsModalOpen((prevState) => !prevState);
  };

  // Edit Service Data
  const editServiceData = (e) => {
    e.preventDefault();
    const payload = {
      gigId: gigsId,
      serviceId: e.target.serviceId?.value,
    };

    const EDIT_GIGS_SERVICE_API = { ...urlList.editGigService };
    EDIT_GIGS_SERVICE_API.endpoint = EDIT_GIGS_SERVICE_API.endpoint.replace(
      ':id',
      editService?.id
    );

    api.sendRequest(
      EDIT_GIGS_SERVICE_API,
      () => {
        setRefresh((prevState) => !prevState);
      },
      payload
    );

    setEditService(null);
  };

  // Delete Service Data
  const deleteService = (id) => {
    setDeleteServiceId(id);
    setIsConfirmationOpen((prevState) => !prevState);
  };

  const deleteServiceData = () => {
    const DELETE_GIGS_SERVICE_API = { ...urlList.deleteGigService };
    DELETE_GIGS_SERVICE_API.endpoint = DELETE_GIGS_SERVICE_API.endpoint.replace(
      ':id',
      deleteServiceId
    );
    api.sendRequest(DELETE_GIGS_SERVICE_API, () => {
      setRefresh((prevState) => !prevState);
      setDeleteServiceId(null);
      setIsConfirmationOpen((prevState) => !prevState);
    });
  };

  // Get ALL GIGS Service Data
  useEffect(() => {
    const GET_GIG_SERVICE_API = { ...urlList.getGigService };
    GET_GIG_SERVICE_API.endpoint = `${GET_GIG_SERVICE_API.endpoint}?gigId=${gigsId}`;
    api.sendRequest(GET_GIG_SERVICE_API, (res) => {
      // console.log(res?.data);
      setService(
        res?.data.map((data, index) => {
          return {
            ...data,
            no: index + 1,
            service: data?.service?.name,
            edit: {
              buttonLabel: <i className="simple-icon-note" />,
              id: data?.id,
              onClick: () => {
                setEditService(data);
              },
            },
            action: {
              buttonLabel: <i className="simple-icon-trash" />,
              id: data?.id,
              onClick: deleteService,
            },
          };
        })
      );
    });
  }, [refresh]);

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
      <AlertPopup
        isOpen={isConfirmationOpen}
        positiveText="Yes"
        negativeText="No"
        warning="Are you sure you want to delete Service?"
        onNegative={() => {
          setIsConfirmationOpen((prev) => !prev);
          setDeleteServiceId(null);
        }}
        onPositive={deleteServiceData}
      />
      <AddNewModalWithOutButton
        sidebarMenu="GIGS_SERVICE_MODAL"
        modalTitle={CONSTANTS.TABLE_ID.serviceModalTitle}
        modalOpen={isModalOpen || editService !== null}
        toggleModal={() => {
          if (editService !== null) setEditService(null);
          else setIsModalOpen((prevState) => !prevState);
        }}
        onSubmit={editService !== null ? editServiceData : serviceData}
        formData={
          editService !== null
            ? {
                ...editService,
                serviceId: serviceCategory.map((categoryData) => {
                  return {
                    value: categoryData?.id,
                    label: categoryData?.name,
                  };
                }),
              }
            : {
                serviceId: serviceCategory.map((categoryData) => {
                  return {
                    value: categoryData?.id,
                    label: categoryData?.name,
                  };
                }),
              }
        }
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
                setIsModalOpen((prevState) => !prevState);
              }}
            >
              <IntlMessages id="button.add.service" />
            </Button>
            <ViewTable
              headers={CONSTANTS.TABLE_HEADER.GIGS_SERVICE_LIST}
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
