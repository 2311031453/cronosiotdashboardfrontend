//api.js
import axios from 'axios';
import { getAuthToken } from './auth';

// Setup interceptors untuk menambahkan token
axios.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Setup interceptors untuk handle unauthorized
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const fetchLatestData = async () => {
  try {
    const response = await axios.get('/api/data/latest');
    return response.data;
  } catch (error) {
    console.error('Error fetching latest data:', error);
    throw error;
  }
};

export const fetchAllData = async () => {
  try {
    const response = await axios.get('/api/data/all');
    return response.data;
  } catch (error) {
    console.error('Error fetching all data:', error);
    throw error;
  }
};

export const fetchNotifications = async () => {
  try {
    const response = await axios.get('/api/data/notifications');
    return response.data;
  } catch (error) {
    console.error('Error fetching notifications:', error);
    throw error;
  }
};