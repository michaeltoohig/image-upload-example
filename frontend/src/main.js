import Vue from 'vue';
import App from './App';
import './registerServiceWorker';
import router from './router';
import vuetify from './plugins/vuetify';
import httpConfig from './api/http-config';

httpConfig.init();

Vue.config.productionTip = false;

new Vue({
  router,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
