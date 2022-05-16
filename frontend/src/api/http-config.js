/* eslint-disable */

import Vue from 'vue';
import axios from 'axios';
// import store from '@/store';
// import router from '@/router';
import { apiDomain } from '@/env';

const baseURL = `${apiDomain}/api`;

export default {
  endpoint: baseURL,
  timeout: 10_000,

  requestInterceptor: (config) => {
    // Optional: add user token to request; perhaps grab token from store or localStorage
    // config.headers.Authorization = `Bearer ${token}`;
    return config;
  },

  responseHandler: (response) => response,

  responseErrorHandler: (error) => {
    console.log('Response Error Handler:', error.message);
    if (error.response) {
      if (error.response.status === 401) {
        console.log('401 nauthorized error');
        // router.push('/auth/login?unauthorized=true');
        return Promise.reject(error);
      }
    } else if (error.request) {
      if (error.message.startsWith('timeout')) {
        console.log('timeout error');
      }
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message);
    }
    console.log(error.config);
    return Promise.reject(error);
  },

  init() {
    Vue.prototype.$http = axios.create({
      baseURL: this.endpoint,
      timeout: this.timeout,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    Vue.prototype.$http.interceptors.request.use(this.requestInterceptor);
    Vue.prototype.$http.interceptors.response.use(
      (response) => this.responseHandler(response),
      (error) => this.responseErrorHandler(error),
    );
  },
};
