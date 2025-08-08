import type { AxiosRequestConfig } from 'axios';

import axios from 'axios';
import { fetchAuthSession } from 'aws-amplify/auth';

import { CONFIG } from 'src/config-global';


// ----------------------------------------------------------------------
// Create axios instance
const axiosInstance = axios.create({ baseURL: CONFIG.site.serverUrl });

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong!')
);

axiosInstance.interceptors.request.use(
  async (config) => {
    try {
      const session = await fetchAuthSession();
      const accessToken = session.tokens?.accessToken?.toString();

      if (accessToken) {
        config.headers = config.headers || {};
        if (typeof config.headers.set === 'function') {
          config.headers.set('Authorization', `Bearer ${accessToken}`);
        } else {
          config.headers.Authorization = `Bearer ${accessToken}`;
        }
      }
    } catch (error) {
      console.error('Error acquiring token silently', error);
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;

// ----------------------------------------------------------------------

export const fetcher = async (args: string | [string, AxiosRequestConfig]) => {
  try {
    const [url, config] = Array.isArray(args) ? args : [args];

    const res = await axiosInstance.get(url, { ...config });

    return res.data;
  } catch (error) {
    console.error('Failed to fetch:', error);
    throw error;
  }
};

export const putFetcher = async (args: string | [string, AxiosRequestConfig]) => {
  try {
    const [url, config] = Array.isArray(args) ? args : [args, {}];

    const res = await axiosInstance.put(url, config.data, { ...config });

    return res.data;
  } catch (error) {
    console.error('Failed to Put', error);
    throw error;
  }
};

export const postFetcher = async (args: string | [string, AxiosRequestConfig]) => {
  try {
    const [url, config] = Array.isArray(args) ? args : [args, {}];

    const res = await axiosInstance.post(url, config.data, { ...config });

    return res.data;
  } catch (error) {
    console.error('Failed to POST', error);
    throw error;
  }
};

export const deleteFetcher = async (args: string | [string, AxiosRequestConfig]) => {
  try {
    const [url, config] = Array.isArray(args) ? args : [args, {}];

    const res = await axiosInstance.delete(url, { ...config });

    return res.data;
  } catch (error) {
    console.error('Failed to DELETE', error);
    throw error;
  }
};

// ----------------------------------------------------------------------

export const endpoints = {
  aiSearch: {
    settings: {
      upload: 'https://k2rnzovi07.execute-api.us-east-1.amazonaws.com/Prod/api/fileUpload',
      getAttributes: 'https://k2rnzovi07.execute-api.us-east-1.amazonaws.com/Prod/api/getAttributes?',
      searchableFields: 'https://k2rnzovi07.execute-api.us-east-1.amazonaws.com/Prod/api/searchableFields',
      jobStatus:'https://k2rnzovi07.execute-api.us-east-1.amazonaws.com/Prod/api/jobStatus/'
    }
  },
};