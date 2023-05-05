import { NotificationManager } from 'components/common/react-notifications';
import Services from './service';

const apiCall = async (
  endPoint,
  type,
  payload = {},
  errorMessage = { heading: '', message: '' }
) => {
  try {
    switch (type) {
      case 'post':
        return await Services.post(endPoint, payload);
      case 'delete':
        return await Services.delete(endPoint);
      case 'patch':
        return await Services.patch(endPoint, payload);
      default:
        return await Services.get(endPoint);
    }
  } catch (error) {
    console.log(error);

    NotificationManager.warning(
      errorMessage.message !== ''
        ? errorMessage.message
        : 'Enter valid email id and password',
      errorMessage.heading !== '' ? errorMessage.heading : 'Login Error',
      3000,
      null,
      null,
      ''
    );
    return -1;
  }
};

// *********************** Login ****************************
export const adminLogin = (payload) => apiCall('/admin/login', 'post', payload);
export const getCurrentAdmin = () => apiCall('/admin/getMe', 'get');
export const adminSignUp = (payload) =>
  apiCall('/admin/signup', 'post', payload);
export const adminForgetPassword = (payload) =>
  apiCall('/auth/forgotpassword', 'post', payload);
export const adminUpdatePassword = (payload) =>
  apiCall('/auth/updatepassword', 'post', payload);

// *********************** Doctor ****************************

export const addDoctor = (payload) =>
  apiCall(`/admin/doctor/signup`, 'post', payload);
export const getAllDoctor = () => apiCall(`/doctor`, 'get');
export const deleteDoctor = (id) => apiCall(`/doctor/${id}`, 'delete');
export const editDoctor = (id, payload) =>
  apiCall(`/admin/doctor/${id}`, 'patch', payload);
export const getDoctorDetail = (id) => apiCall(`/doctor/${id}`, 'get');

// *********************** Doctor Availability (Weekly slot) ****************************

export const addDoctorAvailability = (payload) =>
  apiCall(`/admin/weeklySlot`, 'post', payload);
export const getAllDoctorAvailability = () =>
  apiCall(`/admin/weeklySlot`, 'get');
export const deleteDoctorAvailability = (id) =>
  apiCall(`/admin/weeklySlot/${id}`, 'delete');
export const editDoctorAvailability = (id, payload) =>
  apiCall(`/admin/weeklySlot/${id}`, 'patch', payload);

// *********************** Doctor Published Papers ****************************

export const addDoctorPublishedPapers = (payload) =>
  apiCall(`/admin/publishedpapers`, 'post', payload);
export const getAllDoctorPublishedPapers = () =>
  apiCall(`/admin/publishedpapers`, 'get');
export const deleteDoctorPublishedPapers = (id) =>
  apiCall(`/admin/publishedpapers/${id}`, 'delete');
export const editDoctorPublishedPapers = (id, payload) =>
  apiCall(`/admin/publishedpapers/${id}`, 'patch', payload);

// *********************** Doctor Management Feedback ****************************

export const addDoctorManagementFeedback = (payload) =>
  apiCall(`/admin/managementFeedback`, 'post', payload);
export const getAllDoctorManagementFeedback = () =>
  apiCall(`/admin/managementFeedback`, 'get');
export const deleteDoctorManagementFeedback = (id) =>
  apiCall(`/admin/managementFeedback/${id}`, 'delete');
export const editDoctorManagementFeedback = (id, payload) =>
  apiCall(`/admin/managementFeedback/${id}`, 'patch', payload);
