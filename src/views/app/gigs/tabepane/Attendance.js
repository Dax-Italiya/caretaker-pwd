import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useHttp from 'hooks/Use-http';
import { Colxx } from 'components/common/CustomBootstrap';
import { CardBody, Row } from 'reactstrap';
import CONSTANTS, { urlList } from 'utils/CONSTANTS';
import ViewTable from 'utils/ReactTableCards';
import moment from 'moment';

const Attendance = () => {
  const [attendance, setAttendance] = useState(['']);
  const { gigsId } = useParams();
  const api = useHttp();
  useEffect(() => {
    const GIGS_ATTENDANCE_API = { ...urlList.getGigAttendance };
    GIGS_ATTENDANCE_API.endpoint = `${GIGS_ATTENDANCE_API.endpoint}?gigId=${gigsId}`;
    api.sendRequest(GIGS_ATTENDANCE_API, (res) => {
      // console.log(res?.data);
      setAttendance(
        res?.data.map((data, index) => {
          return {
            ...data,
            no: index + 1,
            date: moment(data?.date).format('MMMM D, YYYY'),
            time: `${moment(data.startTime, 'HH:mm:ss').format(
              'hh:mm A'
            )} to ${moment(data.endTime, 'HH:mm:ss').format('hh:mm A')}`,
            present: `${data?.isPresent ? 'Present' : '-'}`,
            absent: `${!data?.isPresent ? 'Absent' : '-'}`,
          };
        })
      );
    });
  }, []);
  return (
    <Row>
      <Colxx sm="12">
        <CardBody>
          <ViewTable
            headers={CONSTANTS.TABLE_HEADER.GIGS_ATTENDANCE_LIST}
            items={attendance}
            advisorId="table.attendance"
          />
        </CardBody>
      </Colxx>
    </Row>
  );
};

export default Attendance;
