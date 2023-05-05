import React, { useState, useEffect } from 'react';
import AddNewModalWithOutButton from 'components/advisor/add-new-Modal-with-out-button';
import IntlMessages from 'helpers/IntlMessages';
import { Button } from 'reactstrap';
import CONSTANTS, { urlList } from 'utils/CONSTANTS';
import ViewTable from 'utils/ReactTableCards';
import { useHistory } from 'react-router-dom';
import useHttp from 'hooks/Use-http';
import AlertPopup from 'components/alert-popup';

const Gigs = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [deleteGigId, setDeleteGigId] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [gigs, setGigs] = useState([]);
  const [societies, setSocieties] = useState([]);
  const history = useHistory();
  const header = CONSTANTS.TABLE_HEADER.GIGS_LIST;
  const api = useHttp();

  const gigsDetail = (id) => {
    // console.log(id);
    history.push(`/app/gigs/${id}`);
    // console.log('render');
  };

  // Add Gig Data
  const gigsData = (e) => {
    e.preventDefault();
    // console.log('Data Added');
    const payload = new FormData();

    CONSTANTS.RIGHT_SIDEBAR_FIELD.GIGS_MODAL.forEach((ele) => {
      if (ele.type === 'file') {
        payload.append(ele.id, e.target[ele.id].files[0]);
      } else {
        payload.append(ele.id, e.target[ele.id].value);
      }
    });

    api.sendRequest(
      urlList.addGig,
      () => {
        setRefresh((prev) => !prev);
      },
      payload
    );

    setIsModalOpen((prevState) => !prevState);
  };

  // Delete Gig Data
  const deleteGig = (id) => {
    setDeleteGigId(id);
    setIsConfirmationOpen((prev) => !prev);
  };

  const deleteGigData = () => {
    const DELETE_GIG_API = { ...urlList.deleteGig };
    DELETE_GIG_API.endpoint = DELETE_GIG_API.endpoint.replace(
      ':id',
      deleteGigId
    );
    api.sendRequest(DELETE_GIG_API, () => {
      setDeleteGigId(null);
      setRefresh((prev) => !prev);
    });
    setIsConfirmationOpen((prev) => !prev);
  };

  // Block Gig Data
  const blockGig = (gigId, checked) => {
    const payload = {
      isActive: checked,
    };
    const GIG_BLOCK_API = { ...urlList.editGig };
    GIG_BLOCK_API.endpoint = GIG_BLOCK_API.endpoint.replace(':id', gigId);
    api.sendRequest(
      GIG_BLOCK_API,
      () => {
        setRefresh((prev) => !prev);
      },
      payload
    );
  };

  // GET ALL GIGS Data
  useEffect(() => {
    const GIGS_API = { ...urlList.getGigs };
    api.sendRequest(GIGS_API, (res) => {
      // console.log(res?.data?.gigs);

      setGigs(
        res?.data?.gigs.map((data, index) => {
          return {
            ...data,
            no: index + 1,
            service: `${data?.gigServices[0]?.service.name || 'no service'}`,
            leave: `${data?.leave || '1'}`,
            view: {
              buttonLabel: <i className="simple-icon-eye" />,
              id: data?.id,
              onClick: gigsDetail,
            },
            toggle: {
              checked: !data?.isActive,
              id: data?.id,
              onClick: blockGig,
            },
            action: {
              buttonLabel: <i className="simple-icon-trash" />,
              id: data?.id,
              onClick: deleteGig,
            },
          };
        })
      );
    });
  }, [refresh]);

  // Get ALL Society
  useEffect(() => {
    api.sendRequest(urlList.getSocieties, (res) => {
      setSocieties(
        res?.data.map((society, index) => {
          return {
            ...society,
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
        color="primary"
        style={{
          position: 'relative',
          left: '0px',
          top: '-15px',
          marginTop: '-20px',
        }}
        onClick={() => setIsModalOpen((prevState) => !prevState)}
      >
        <IntlMessages id={CONSTANTS.TABLE_ID.addGigsButton} />
      </Button>
      <AddNewModalWithOutButton
        sidebarMenu="GIGS_MODAL"
        modalTitle={CONSTANTS.TABLE_ID.gigsModalTitle}
        modalOpen={isModalOpen}
        toggleModal={() => {
          setIsModalOpen((prevState) => !prevState);
        }}
        onSubmit={gigsData}
        formData={{
          societyId: societies.map((societyData) => {
            return {
              value: societyData?.id,
              label: societyData?.name,
            };
          }),
        }}
      />
      <AlertPopup
        isOpen={isConfirmationOpen}
        positiveText="Yes"
        negativeText="No"
        warning="Are you sure you want to delete?"
        onNegative={() => {
          setIsConfirmationOpen((prev) => !prev);
          setDeleteGigId(null);
        }}
        onPositive={deleteGigData}
      />
      <ViewTable
        headers={header}
        items={gigs}
        advisorId="table.gigs"
        filterParams="name"
      />
    </>
  );
};

export default Gigs;
