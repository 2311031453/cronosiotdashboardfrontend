//auth.js
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

// Setup axios base URL
axios.defaults.baseURL = API_URL;

// Simpan token di localStorage
export const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    localStorage.setItem('token', token);
  } else {
    delete axios.defaults.headers.common['Authorization'];
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
};

// Dapatkan token dari localStorage
export const getAuthToken = () => {
  return localStorage.getItem('token');
};

// Cek apakah user sudah login
export const isAuthenticated = () => {
  const token = getAuthToken();
  return !!token;
};

// Dapatkan user info dari token
export const getUserFromToken = () => {
  const token = getAuthToken();
  if (!token) return null;

  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );

    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};

// Fetch user data dari API (data terbaru)
export const fetchCurrentUser = async () => {
  try {
    const response = await axios.get('/api/auth/profile');
    return response.data;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
};

// Register user
export const register = async (userData) => {
  try {
    const response = await axios.post('/api/auth/register', userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Terjadi kesalahan' };
  }
};

// Login user
export const login = async (credentials) => {
  try {
    const response = await axios.post('/api/auth/login', credentials);
    
    if (response.data.success) {
      setAuthToken(response.data.data.token);
      // Simpan user data yang fresh dari response
      localStorage.setItem('user', JSON.stringify(response.data.data.user));
    }
    
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Terjadi kesalahan' };
  }
};

// Logout user
export const logout = async () => {
  try {
    // Panggil API logout
    await axios.post('/api/auth/logout');
  } catch (error) {
    console.error('Logout API error:', error);
  } finally {
    // Hapus token dari localStorage dan headers
    setAuthToken(null);
    localStorage.removeItem('user');
  }
};

// Get user profile
export const getProfile = async () => {
  try {
    const response = await axios.get('/api/auth/profile');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Terjadi kesalahan' };
  }
};

// Sync user data dengan backend
export const syncUserData = async () => {
  try {
    if (isAuthenticated()) {
      const userData = await fetchCurrentUser();
      if (userData.success) {
        localStorage.setItem('user', JSON.stringify(userData.data));
        return userData.data;
      }
    }
    return null;
  } catch (error) {
    console.error('Error syncing user data:', error);
    // Jika error, hapus data yang mungkin tidak valid
    localStorage.removeItem('user');
    return null;
  }
};