import { NotificationManager } from 'components/common/react-notifications';
import { useState, useCallback } from 'react';
import Services from 'utils/API/service';

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);

  const sendRequest = useCallback(
    async (url, responseHandler, payload, successMessage, errorHandler) => {
      setIsLoading(true);
      try {
        let response;
        switch (url.type) {
          case 'POST':
            response = await Services.post(url.endpoint, payload);
            break;

          case 'PUT':
            response = await Services.put(url.endpoint, payload);

            break;
          case 'DELETE':
            response = await Services.delete(url.endpoint);
            break;

          case 'PATCH':
            response = await Services.patch(url.endpoint, payload);
            break;

          default:
            response = await Services.get(url.endpoint);
            break;
        }

        const data = await response.data;
        if (successMessage) {
          NotificationManager.success(successMessage, '', 3000, null, null, '');
        }
        try {
          if (responseHandler) {
            responseHandler(data);
          }
        } catch (e) {
          console.log(e);
        }
      } catch (err) {
        if (err?.response?.data?.message) {
          NotificationManager.error(
            err?.response?.data?.message,
            err?.heading !== '' ? err?.heading : '',
            3000,
            null,
            null,
            ''
          );

          if (errorHandler) {
            errorHandler(err?.response?.data?.errors);
          }
        } else {
          NotificationManager.error(
            'Something Wrong Please Try again',
            err?.heading !== '' ? err.heading : '',
            3000,
            null,
            null,
            ''
          );
        }
      }
      setIsLoading(false);
    },
    []
  );

  return {
    isLoading,
    sendRequest,
  };
};

export default useHttp;
