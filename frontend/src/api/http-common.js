/* eslint-disable */

import axios from 'axios';

import { getLocalUser } from '@/utils';

// import { apiDomain } from '@/env';
const apiDomain = 'http://localhost:5000';
const baseURL = `${apiDomain}/api/`;

const http = axios.create({
  baseURL,
  timeout: 5_000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor
http.interceptors.request.use((config) => {
  const localUser = getLocalUser();
  console.log('user', localUser);
  if (localUser) {
    const user = JSON.parse(localUser)
    config.headers.Authorization = `Bearer ${user.id}`;
  }
  return config;
});

// Response handler
const responseHandler = (response) => response;
// Response error handler
const errorHandler = (error) => Promise.reject(error);

// Response Interceptor to handle and log errors
http.interceptors.response.use(
  (response) => responseHandler(response),
  (error) => errorHandler(error),
);

export default http;
