import {createRouter, createWebHistory} from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      redirect: {name: 'Developers'}
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
      component: () => import('../views/Registration')
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
