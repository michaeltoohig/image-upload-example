import http from './http-common';

const resource = 'flashcards';

export default {
  async getFlashCards() {
    return http.get(`${resource}/`).then((response) => response.data);
  },

  async getFlashCard(id) {
    return http.get(`${resource}/${id}`).then((response) => response.data);
  },

  async createFlashCard(payload) {
    return http.post(`${resource}/`, payload).then((response) => response.data);
  },

  async updateFlashCard(id, payload) {
    return http.post(`${resource}/${id}`, payload).then((response) => response.data);
  },

  async deleteFlashCard(id) {
    return http.delete(`${resource}/${id}`).then((response) => response.data);
  },

  async success(id) {
    return http.post(`${resource}/${id}/success`).then((response) => response.data);
  },

  async failure(id) {
    return http.post(`${resource}/${id}/failure`).then((response) => response.data);
  },
};
