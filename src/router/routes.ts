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

   {
      path: '/registration',
      component: () => import('layouts/RegLayout.vue'),
      children: [{ path: '', component: () => import('pages/RegPage.vue') }],
   },

   {
      path: '/profile',
      component: () => import('layouts/BaseLayout.vue'),
      children: [
         { path: 'details', component: () => import('pages/DetailsPage.vue') },
         { path: 'gender', component: () => import('pages/GenderPage.vue') },
         { path: 'interests', component: () => import('pages/InterestsPage.vue') },
         { path: 'match', component: () => import('pages/SetMatchPage.vue') }
      ],
   }
];

export default routes;
