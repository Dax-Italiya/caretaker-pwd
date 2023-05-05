import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Colxx } from 'components/common/CustomBootstrap';
import { Button, CardBody, Row } from 'reactstrap';
import AddNewModalWithOutButton from 'components/advisor/add-new-Modal-with-out-button';
import CONSTANTS, { urlList } from 'utils/CONSTANTS';
import IntlMessages from 'helpers/IntlMessages';
import ViewTable from 'utils/ReactTableCards';
import useHttp from 'hooks/Use-http';
import moment from 'moment';
import Services from 'utils/API/service';

const Schedule = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [schedule, setSchedule] = useState([]);
  const [editData, setEditData] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const openCloseModal = () => setIsModalOpen((prevState) => !prevState);
  const { gigsId } = useParams();
  const api = useHttp();

  // Add Gig Schedule Data
  const scheduleData = (e) => {
    e.preventDefault();

    (async () => {
      /* eslint-disable no-await-in-loop */
      for (let i = 0; i <= 10000; i += 1) {
        if (
          e.target[`starttime_${i}`]?.value ||
          e.target[`endtime_${i}`]?.value
        ) {
          //  console.log(e.target[`starttime_${i}`]?.value);
          //  console.log(e.target[`endtime_${i}`]?.value);
          const payload = {
            gigId: gigsId,
            startTime: e.target[`starttime_${i}`]?.value,
            endTime: e.target[`endtime_${i}`]?.value,
          };
          await Services.post('/admin/gigSchedule', payload);
        } else break;
      }
      setRefresh((prev) => !prev);
      setIsModalOpen((prevState) => !prevState);
    })();
  };

  // Edit Gig Schedule Data
  const editscheduleData = (e) => {
    e.preventDefault();
    const payload = {
      startTime: e.target.startTime?.value,
      endTime: e.target.endTime?.value,
    };
    const EDIT_GIGS_SCHEDULE_API = { ...urlList.editGigSchedule };
    EDIT_GIGS_SCHEDULE_API.endpoint = EDIT_GIGS_SCHEDULE_API.endpoint.replace(
      ':id',
      editData?.id
    );
    api.sendRequest(
      EDIT_GIGS_SCHEDULE_API,
      () => {
        setEditData(null);
        setRefresh((prev) => !prev);
      },
      payload
    );
  };

  // Get Gig All Schedule
  useEffect(() => {
    const GIGS_SCHEDULE_API = { ...urlList.getGigSchedule };
    GIGS_SCHEDULE_API.endpoint = `${GIGS_SCHEDULE_API.endpoint}?gigId=${gigsId}`;
    api.sendRequest(GIGS_SCHEDULE_API, (res) => {
      // console.log(res.data);
      setSchedule(
        res?.data.map((data, index) => {
          return {
            ...data,
            no: index + 1,
            startTime: `${moment(data.startTime, 'HH:mm:ss').format(
              'hh:mm A'
            )}`,
            endTime: `${moment(data.endTime, 'HH:mm:ss').format('hh:mm A')}`,
            edit: {
              buttonLabel: <i className="simple-icon-note" />,
              id: data?.id,
              onClick: () => {
                setEditData(data);
              },
            },
            // action: {
            //   buttonLabel: <i className="simple-icon-trash" />,
            //   id: data?.id,
            //   onClick: () => {},
            // },
          };
        })
      );
    });
  }, [refresh]);
  return (
    <>
      <AddNewModalWithOutButton
        sidebarMenu="GIGS_SCHEDULE_MODAL"
        modalTitle={CONSTANTS.TABLE_ID.scheduleTitle}
        modalOpen={isModalOpen}
        toggleModal={openCloseModal}
        onSubmit={scheduleData}
        formData={{}}
      />
      <AddNewModalWithOutButton
        sidebarMenu="EDIT_GIGS_SCHEDULE_MODAL"
        modalTitle="edit.schedule.modal.title"
        modalOpen={editData !== null}
        toggleModal={() => {
          setEditData(null);
        }}
        onSubmit={editscheduleData}
        formData={editData}
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
              onClick={openCloseModal}
            >
              <IntlMessages id="button.add.schedule" />
            </Button>
            <ViewTable
              headers={CONSTANTS.TABLE_HEADER.GIGS_SCHEDULE_LIST}
              items={schedule}
              advisorId="table.schedule"
            />
          </CardBody>
        </Colxx>
      </Row>
    </>
  );
};

export default Schedule;
