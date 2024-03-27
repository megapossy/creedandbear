import { createRouter, createWebHistory } from 'vue-router'

import DefaultTemplate from '@/views/layouts/default/template.vue'
import LoginTemplate from '@/views/layouts/login/template.vue'
import { auth } from '@/middleware/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home-route',
      component: DefaultTemplate,
      meta: {
        authentication: true
      },
      children: [
        {
          path: 'users/:userId?',
          name: 'users',
          component: () => import('@/views/pages/users-page.vue')
        },
        {
          path: 'logout',
          name: 'logout',
          component: () => import('@/views/pages/logout-page.vue')
        },
      ]
    },
    {
      path: '/login',
      name: 'login-route',
      component: LoginTemplate,
      children: [
        {
          path: '',
          name: 'login',
          component: () => import('@/views/pages/login-page.vue')
        }
      ]
    },

  ]
})

router.beforeEach(auth)

export default router
