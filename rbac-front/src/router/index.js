import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Index from '../views/Index.vue'
import User from '../views/sys/User.vue'
import Role from '../views/sys/Role.vue'
import Menu from '../views/sys/Menu.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      {
        path: '/index',
        name: 'Index',
        meta: {
          title: '首页',
        },
        component: Index,
      },
      {
        path: '/index',
        name: 'Index',
        component: Index,
      },
      {
        path: '/login',
        name: 'Login',
        component: () => import('../views/Login.vue'),
      },
      {
        path: '/sys/users',
        name: 'SysUser',
        component: User,
      },
      {
        path: '/sys/roles',
        name: 'SysRole',
        component: Role,
      },
      {
        path: '/sys/menus',
        name: 'SysMenu',
        component: Menu,
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
