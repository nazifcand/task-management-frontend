import Axios from 'axios';

const axios = Axios.create({
  baseURL: 'http://localhost:3000',
});

axios.interceptors.request.use(
  (config) => {
    const { token } = localStorage;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axios;
