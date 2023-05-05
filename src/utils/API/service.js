import axios from 'axios';
import authStorage from './authStroge';

// console.log(authStorage.getAuthToken());

const Services = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    Accept: 'application/json',
    Authorization: `Bearer ${authStorage.getAuthToken()}`,
  },
});

export default Services;
