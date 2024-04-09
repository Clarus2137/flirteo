import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
    {
        path: '',
        component: () => import('layouts/StartLayout.vue'),
        children: [{ path: '', component: () => import('pages/StartPage.vue') }],
        beforeEnter: (to, from, next) => {
            if (localStorage.getItem('isAuthorised') !== null) {
                const isUserLogged = localStorage.getItem('currentUser');
                if (isUserLogged !== null) {
                    const isProfileCompleted = JSON.parse(localStorage.currentUser).userData.firstName;
                    if (isProfileCompleted !== null) {
                        next({ name: 'home' });
                    } else {
                        next({ name: 'complete' });
                    }
                } else {
                    next({ name: 'auth' });
                }
            } else {
                next();
            }
        }
    },

    // Always leave this as last one,
    // but you can also remove it
    // {
    //   path: '/:catchAll(.*)*',
    //   component: () => import('pages/ErrorNotFound.vue'),
    // },

    {
        path: '/authorization',
        component: () => import('layouts/AuthLayout.vue'),
        children: [{ path: '', name: 'auth', component: () => import('pages/AuthPage.vue') }],
    },

    {
        path: '/registration',
        component: () => import('layouts/AuthLayout.vue'),
        children: [
            { path: '', component: () => import('pages/RegPage.vue') },
            { path: 'verification', component: () => import('pages/VerificationPage.vue') }
        ],
    },

    {
        path: '/login',
        component: () => import('layouts/AuthLayout.vue'),
        children: [{ path: '', name: 'login', component: () => import('pages/LogInPage.vue') }],
    },

    {
        path: '/complete',
        component: () => import('layouts/InfoLayout.vue'),
        children: [
            { path: '', name: 'complete', component: () => import('pages/CompleteProfilePage.vue') }
        ],
    },

    {
        path: '/home',
        component: () => import('layouts/BaseLayout.vue'),
        children: [{ path: '', name: 'home', component: () => import('pages/HomePage.vue') }]
    },

    {
        path: '/chat',
        component: () => import('layouts/BaseLayout.vue'),
        children: [{ path: '', component: () => import('pages/ChatPage.vue') }]
    },

    {
        path: '/profile',
        component: () => import('layouts/BaseLayout.vue'),
        children: [
            { path: '', component: () => import('pages/ProfilePage.vue') },
            { path: 'edit', component: () => import('pages/EditProfilePage.vue') }
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
