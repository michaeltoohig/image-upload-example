import Vue from 'vue';

const resource = 'users';

export default {
  async getUsers() {
    return Vue.prototype.$http.get(`${resource}/`).then((response) => response.data);
  },

  async getUser(id) {
    return Vue.prototype.$http.get(`${resource}/${id}`).then((response) => response.data);
  },

  async createUser(payload) {
    return Vue.prototype.$http.post(`${resource}/`, payload).then((response) => response.data);
  },

  async updateUser(id, payload) {
    return Vue.prototype.$http.post(`${resource}/${id}`, payload).then((response) => response.data);
  },

  async deleteUser(id) {
    return Vue.prototype.$http.delete(`${resource}/${id}`).then((response) => response.data);
  },
};
