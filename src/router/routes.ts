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
      path: '/info',
      component: () => import('layouts/InfoLayout.vue'),
      children: [
         { path: 'details', component: () => import('pages/AddDetailsPage.vue') },
         { path: 'gender', component: () => import('pages/GenderPage.vue') },
         { path: 'interests', component: () => import('pages/InterestsPage.vue') },
         { path: 'match', component: () => import('pages/SetMatchPage.vue') }
      ],
   },

   {
      path: '/home',
      component: () => import('layouts/BaseLayout.vue'),
      children: [{ path: '', component: () => import('pages/HomePage.vue') }]
   },

   {
      path: '/search',
      component: () => import('layouts/BaseLayout.vue'),
      children: [{ path: '', component: () => import('pages/SearchPage.vue') }]
   },

   {
      path: '/favorites',
      component: () => import('layouts/BaseLayout.vue'),
      children: [{ path: '', component: () => import('pages/FavoritesPage.vue') }]
   },

   {
      path: '/chats',
      component: () => import('layouts/BaseLayout.vue'),
      children: [{ path: '', component: () => import('pages/ChatsPage.vue') }]
   },

   {
      path: '/profile',
      component: () => import('layouts/BaseLayout.vue'),
      children: [
         { path: '', component: () => import('pages/ProfilePage.vue') },
         { path: 'details', component: () => import('pages/EditDetailsPage.vue') }
      ]
   },

   {
      path: '/terms',
      component: () => import('layouts/InfoLayout.vue'),
      children: [{ path: '', component: () => import('pages/TermsPage.vue') }]
   },

   {
      path: '/privacy',
      component: () => import('layouts/InfoLayout.vue'),
      children: [{ path: '', component: () => import('pages/PrivacyPage.vue') }]
   }
];

export default routes;
