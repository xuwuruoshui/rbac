import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import Index from '@/views/Index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Home,
    children: [
      {
        path: '/',
        name: 'Index',
        meta: {
          title: '首页',
        },
        component: Index,
      },
      {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/Login.vue'),
      },
      {
        path: '/sys/users',
        name: 'SysUser',
        component: () => import('@/views/sys/User.vue'),
      },
      {
        path: '/sys/roles',
        name: 'SysRole',
        component: () => import('../views/sys/Roles.vue'),
      },
      {
        path: '/sys/menus',
        name: 'SysMenu',
        component: () => import('../views/sys/Menus.vue'),
      },
      {
        path: '*',
        name: '404',
        component: () => import('../views/error/Error.vue'),
      },
    ],
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
