import http from './http-common';

const resource = 'auth';

export default {
  async login(payload) {
    return http.post(`${resource}/login`, payload).then((response) => response.data);
  },
};
