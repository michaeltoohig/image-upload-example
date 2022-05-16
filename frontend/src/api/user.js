import http from './http-common';

const resource = 'users';

export default {
  async getUsers() {
    return http.get(`${resource}/`).then((response) => response.data);
  },

  async getUser(id) {
    return http.get(`${resource}/${id}`).then((response) => response.data);
  },

  async createUser(payload) {
    return http.post(`${resource}/`, payload).then((response) => response.data);
  },

  async updateUser(id, payload) {
    return http.post(`${resource}/${id}`, payload).then((response) => response.data);
  },

  async deleteUser(id) {
    return http.delete(`${resource}/${id}`).then((response) => response.data);
  },
};
