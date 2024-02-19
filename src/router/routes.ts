import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
   {
      path: '/',
      component: () => import('layouts/StartLayout.vue'),
      children: [{ path: '', component: () => import('pages/StartPage.vue') }],
   },

   // Always leave this as last one,
   // but you can also remove it
   // {
   //   path: '/:catchAll(.*)*',
   //   component: () => import('pages/ErrorNotFound.vue'),
   // },

   // {
   //    path: '/',
   //    component: () => import('pages/StartPage.vue')
   // },

   {
      path: '/registration',
      component: () => import('layouts/RegLayout.vue'),
      children: [{ path: '', component: () => import('pages/RegPage.vue') }],
   },

   {
      path: '/profile',
      component: () => import('layouts/BaseLayout.vue'),
      children: [{ path: '', component: () => import('pages/ProfilePage.vue') }],
   },
];

export default routes;
