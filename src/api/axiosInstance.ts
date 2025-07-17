import axios from 'axios';
import { store } from '../store/store';
import type { RootState } from '../store/store';

const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_SERVER_URL}`,
});

let isAlreadyHandling401Error = false;

axiosInstance.interceptors.request.use(
  (config) => {
    const state: RootState = store.getState();
    const token = state.user?.data?.accessToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error?.response?.status === 401 && !isAlreadyHandling401Error) {
      isAlreadyHandling401Error = true;
      
      // Dispatch logout action to clear Redux state
      store.dispatch({ type: 'userSlice/logout' });
      
      // Show notification
      console.log('Session expired, please login again.');
      
      // Redirect to login
      setTimeout(() => {
        window.location.href = '/login';
        isAlreadyHandling401Error = false;
      }, 1000);
      
      return Promise.reject(error);
    } else if (error?.response?.status === 401 && isAlreadyHandling401Error) {
      isAlreadyHandling401Error = false;
      return Promise.reject(error);
    }
    
    return Promise.reject(error);
  },
);

export default axiosInstance; 