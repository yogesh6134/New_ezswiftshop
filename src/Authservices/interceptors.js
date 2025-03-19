import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import config from '../utils/apiUrl';
import { FAILURE } from '../utils/apiConstant';
import { store } from '../redux/store';

// Define types for Redux store and actions (adjust based on your actual types)


// Create Instance
const AxiosInstances: AxiosInstance = axios.create({
  baseURL: config.API_URL,
  timeout: 20000,
  transformRequest: [
    function (data: any, headers: any) {
      const getStore = store.getState();
      // const token: string | undefined = getStore.AuthReducer?.data.token
      const token: string | undefined = getStore.AuthReducer?.loginData

      // if (token) {
      //   headers['token'] = token;
      // }
      // if (data && data._parts) {
      //   return data;
      // } else {
      //   return JSON.stringify(data);
      // }
      return JSON.stringify(data);
    },
  ],
  headers: { 'Content-Type': 'application/json' },
});



AxiosInstances.interceptors.request.use((configs: any) => {
  return configs;
});


// Response Interceptor
AxiosInstances.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: any) => {
    if (!error.response) {
      return Promise.reject({
        status: FAILURE,
        message: 'Please check your internet connection',
      });
    } else {
      return error.response;
    }
  },
);

export default AxiosInstances;
