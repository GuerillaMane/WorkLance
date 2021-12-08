import {createRouter, createWebHistory} from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      redirect: {name: 'Login'}
    },

    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/Login')
    },

    {
      path: '/devs',
      name: 'Developers',
      component: () => import('../components/developers/DeveloperList'),
    },
    {
      path: '/devs/:id',
      name: 'Developer Detail',
      component: () => import('../components/developers/DeveloperDetail'),
      props: true,
      children: [
        {
          path: 'contact',
          name: 'Contact Developer',
          component: () => import('../components/messages/MessageCreate')
        }
      ]
    },

    {
      path: '/register',
      name: 'Registration',
      component: () => import('../views/DeveloperRegistration')
    },

    {
      path: '/messages',
      name: 'Messages',
      component: () => import('../components/messages/MessageList')
    },

    {
      path: '/:notFound(.*)',
      name: 'Page Not Found',
      component: () => import('../views/NotFound')
    }
  ]
});

export default router;
