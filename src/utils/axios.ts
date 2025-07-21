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
   restaruntAdmin: {
    home: {      
      business: '/roos-business/business?localAccountId=',     
    },
  },
  auth: {
    createUser: '/bnm-business/createUser',
  },
  client: {
    joinAsVendor: '/bnm-customer/customer/convert/vendor',
    services: {
      getAll: '/bnm-service/service',
      getById: '/bnm-service/service',
      locationFilter: '/bnm-service/service',
    },
    projects: {
      getAll: '/bnm-project/project/profile',
    },
    serviceForm: {
      create: '/bnm-serviceform/serviceForm',
    },
    quotes: {
      create: '/bnm-quote/quote',
    },
    profile: {
      customer: {
        create: '/bnm-customer/customer',
        getAll: '/bnm-customer/customers',
        getById: '/bnm-customer/customer',
        update: '/bnm-customer/customer',
        delete: '/bnm-customer/customer',
      },
      vendor: {
        create: '/bnm-vendor/vendor',
        getAll: '/bnm-vendor/vendor',
        getById: '/bnm-vendor/vendor',
        update: '/bnm-vendor/vendor',
        delete: '/bnm-vendor/vendor',
      },
    },
  },
  admin: {
    services: {
      create: '/bnm-service/service',
      getAll: '/bnm-service/service',
      getById: '/bnm-service/service',
      update: '/bnm-service/service',
      delete: '/bnm-service/service',
    },
    projects: {
      create: '/bnm-project/project',
      getAll: '/bnm-project/projects',
      getById: '/bnm-project/project',
      update: '/bnm-project/project',
      delete: '/bnm-project/project',
    },
    customer: {
      create: '/bnm-customer/customer',
      getAll: '/bnm-customer/customers',
      getById: '/bnm-customer/customer',
      update: '/bnm-customer/customer',
      delete: '/bnm-customer/customer',
    },
    vendor: {
      create: '/bnm-vendor/vendor',
      getAll: '/bnm-vendor/vendor',
      getById: '/bnm-vendor/vendor',
      getByPublicUrl: '/bnm-vendor/vendor/profile',
      update: '/bnm-vendor/vendor',
      delete: '/bnm-vendor/vendor',
    },
    serviceForm: {
      create: '/bnm-serviceform/serviceForm',
      getAll: '/bnm-serviceform/serviceForms',
      getById: '/bnm-serviceform/serviceForm',
      update: '/bnm-serviceform/serviceForm',
      delete: '/bnm-serviceform/serviceForm',
    },
    quotes: {
      create: '/bnm-quote/quote',
      getAll: '/bnm-quote/quotes',
      getById: '/bnm-quote/quote',
      update: '/bnm-quote/quote',
      delete: '/bnm-quote/quote',
    },
    uploadImage: '/bnm-service/upload',
  },
};