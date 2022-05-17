import Vue from 'vue';

const resource = 'images';

export default {
  async upload(data) {
    return Vue.prototype.$http.post(`${resource}/`, data, {
      headers: {
        accept: 'application/json',
        'Accept-Language': 'en-US,en;q=0.8',
        'Content-Type': 'multipart/form-data;',
      },
    }).then((response) => response.data);
  },
};
