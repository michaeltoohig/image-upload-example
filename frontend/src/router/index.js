import Vue from 'vue';
import VueRouter from 'vue-router';
import HomeView from '@/views/HomeView';
import UploadView from '@/views/UploadView';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/upload',
    name: 'upload',
    component: UploadView,
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '@/views/AboutView'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
