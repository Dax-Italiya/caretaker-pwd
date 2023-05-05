import React, { useState, useEffect } from 'react';
import useHttp from 'hooks/Use-http';
import CONSTANTS, { urlList } from 'utils/CONSTANTS';
import ViewTable from 'utils/ReactTableCards';

const Feedback = () => {
  const [feedback, setFeedback] = useState([]);
  const api = useHttp();
  // Get ALL Feedback Data
  useEffect(() => {
    api.sendRequest(urlList.getFeedback, (res) => {
      // console.log(res?.data);
      setFeedback(
        res?.data.map((data, index) => {
          return {
            ...data,
            no: index + 1,
            bookId: data?.booking?.id,
            uname: data?.user?.name,
            gigname: data?.gig?.name,
          };
        })
      );
    });
  }, []);
  return (
    <>
      <ViewTable
        headers={CONSTANTS.TABLE_HEADER.FEEDBACK_LIST}
        items={feedback}
        advisorId="table.feedback"
      />
    </>
  );
};

export default Feedback;
