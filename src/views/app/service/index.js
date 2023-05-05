import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from 'reactstrap';
import ViewTable from 'utils/ReactTableCards';
import CONSTANTS, { urlList } from 'utils/CONSTANTS';
import IntlMessages from 'helpers/IntlMessages';
import AddNewModalWithOutButton from 'components/advisor/add-new-Modal-with-out-button';
import useHttp from 'hooks/Use-http';
import AlertPopup from 'components/alert-popup';

const Service = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [services, setServices] = useState([]);
  const [editService, setEditService] = useState(null);
  const [deleteServiceId, setDeleteServiceId] = useState(null);
  const [serviceCategory, setServiceCategory] = useState([]);
  const history = useHistory();
  const api = useHttp();

  const includeItem = [];

  if (editService !== null) {
    const includeArray = editService?.include;
    const excludeArray = editService?.exclude;
    for (let i = 0; i < includeArray.length; i += 1) {
      includeItem.push({
        type: 'include',
        option: includeArray[i],
      });
    }
    for (let i = 0; i < excludeArray.length; i += 1) {
      includeItem.push({
        type: 'exclude',
        option: excludeArray[i],
      });
    }
  }

  // Navigate to serviceVarity Page
  const serviceVarity = (id) => {
    // console.log(id);
    history.push(`/app/service/${id}`);
  };

  // console.log(includeExclude);

  // ADD Service Data
  const serviceData = (e) => {
    e.preventDefault();
    const payload = new FormData();
    CONSTANTS.RIGHT_SIDEBAR_FIELD.SERVICE_MODAL.forEach((ele) => {
      if (ele.type !== 'include') {
        if (ele.type !== 'file') {
          payload.append(ele.id, e.target[ele.id].value);
        } else {
          payload.append(ele.id, e.target[ele.id].files[0]);
        }
      }
    });
    const myObj = {
      include: [],
      exclude: [],
    };

    for (let i = 0; i < 10000; i += 1) {
      if (e.target[`add_${i}`]?.value) {
        if (e.target[`add&${i}`]?.value === 'include') {
          myObj.include.push(e.target[`add_${i}`]?.value);
        }
        if (e.target[`add&${i}`]?.value === 'exclude') {
          myObj.exclude.push(e.target[`add_${i}`]?.value);
        }
      } else break;
    }
    if (myObj.include.length)
      payload.append('include', myObj.include.join(','));

    if (myObj.exclude.length)
      payload.append('exclude', myObj.exclude.join(','));

    console.log(payload);
    api.sendRequest(
      urlList.addService,
      () => {
        setRefresh((prev) => !prev);
      },
      payload
    );
    setIsModalOpen((prev) => !prev);
  };

  // Edit Service Data
  const editserviceData = (e) => {
    e.preventDefault();

    const payload = new FormData();
    CONSTANTS.RIGHT_SIDEBAR_FIELD.SERVICE_MODAL.forEach((ele) => {
      if (ele.type !== 'include') {
        if (ele.type !== 'file') {
          payload.append(ele.id, e.target[ele.id].value);
        }
        if (ele.type === 'file' && e.target[ele.id]?.files[0]) {
          payload.append(ele.id, e.target[ele.id].files[0]);
        }
      }
    });

    const myObj = {
      include: [],
      exclude: [],
    };

    for (let i = 0; i < 10000; i += 1) {
      if (e.target[`add_${i}`]?.value) {
        if (e.target[`add&${i}`]?.value === 'include') {
          myObj.include.push(e.target[`add_${i}`]?.value);
        }
        if (e.target[`add&${i}`]?.value === 'exclude') {
          myObj.exclude.push(e.target[`add_${i}`]?.value);
        }
      } else break;
    }
    if (myObj.include.length !== 0)
      payload.append('include', myObj.include.join(','));
    else {
      console.log('empty include array');
      myObj.include = [];
      console.log(myObj.include);
      payload.append('include', myObj.include);
    }

    if (myObj.exclude.length !== 0)
      payload.append('exclude', myObj.exclude.join(','));
    else {
      console.log('empty exclude array');
      myObj.exclude = [];
      console.log(myObj.exclude);
      payload.append('exclude', myObj.exclude.join(''));
    }

    const EDIT_SERVICE_API = { ...urlList.editService };
    EDIT_SERVICE_API.endpoint = EDIT_SERVICE_API.endpoint.replace(
      ':id',
      editService?.id
    );

    // console.log(payload);

    api.sendRequest(
      EDIT_SERVICE_API,
      () => {
        setEditService(null);
        setRefresh((prev) => !prev);
      },
      payload
    );
  };
  // Delete Service Data
  const deleteService = (id) => {
    setDeleteServiceId(id);
    setIsConfirmationOpen((prev) => !prev);
  };
  const deleteServiceData = () => {
    const DELETE_SERVICE = { ...urlList.deleteService };
    DELETE_SERVICE.endpoint = DELETE_SERVICE.endpoint.replace(
      ':id',
      deleteServiceId
    );
    api.sendRequest(DELETE_SERVICE, () => {
      setRefresh((prev) => !prev);
    });
    setIsConfirmationOpen((prev) => !prev);
  };

  // Get All Service Data
  useEffect(() => {
    api.sendRequest(urlList.getServices, (res) => {
      setServices(
        res?.data.map((service, index) => {
          return {
            ...service,
            no: index + 1,
            category: service?.serviceCategory?.name,
            view: {
              buttonLabel: <i className="simple-icon-eye" />,
              id: service?.id,
              onClick: serviceVarity,
            },
            edit: {
              buttonLabel: <i className="simple-icon-note" />,
              id: service?.id,
              onClick: () => {
                setEditService(service);
              },
            },
            action: {
              buttonLabel: <i className="simple-icon-trash" />,
              id: service?.id,
              onClick: deleteService,
            },
          };
        })
      );
    });
  }, [refresh]);

  // Get ALL Service Category
  useEffect(() => {
    api.sendRequest(urlList.getServiceCategories, (res) => {
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
      <Button
        outline
        style={{
          position: 'relative',
          left: '0px',
          top: '-15px',
          marginTop: '-20px',
        }}
        color="primary"
        onClick={() => setIsModalOpen(true)}
      >
        <IntlMessages id={CONSTANTS.TABLE_ID.addServiceButton} />
      </Button>
      <AddNewModalWithOutButton
        sidebarMenu="SERVICE_MODAL"
        modalTitle={CONSTANTS.TABLE_ID.serviceModalTitle}
        modalOpen={isModalOpen}
        toggleModal={() => {
          setIsModalOpen(!isModalOpen);
        }}
        onSubmit={serviceData}
        formData={{
          serviceCategoryId: serviceCategory.map((categroyData) => {
            return {
              value: categroyData?.id,
              label: categroyData?.name,
            };
          }),
        }}
      />
      <AddNewModalWithOutButton
        sidebarMenu="EDIT_SERVICE_MODAL"
        modalTitle="edit.service.modal.title"
        modalOpen={editService !== null}
        toggleModal={() => {
          setEditService(null);
        }}
        onSubmit={editserviceData}
        formData={{
          ...editService,
          serviceCategoryId: serviceCategory.map((categroyData) => {
            return {
              value: categroyData?.id,
              label: categroyData?.name,
            };
          }),
        }}
        includeOption={includeItem}
      />
      <AlertPopup
        isOpen={isConfirmationOpen}
        positiveText="Yes"
        negativeText="No"
        warning="Are you sure you want to delete?"
        onNegative={() => {
          setIsConfirmationOpen((prev) => !prev);
          setDeleteServiceId(null);
        }}
        onPositive={deleteServiceData}
      />
      <ViewTable
        headers={CONSTANTS.TABLE_HEADER.SERVICE_LIST}
        items={services}
        advisorId="table.service"
      />
    </>
  );
};

export default Service;
