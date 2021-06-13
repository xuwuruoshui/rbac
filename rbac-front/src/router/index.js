import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import Index from '@/views/Index'
import store from '@/store'
import request from '@/request'

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
                    title: "首页"
                },
                component: Index
            },
            {
                path: '/userCenter',
                name: 'UserCenter',
                meta: {
                    title: "个人中心"
                },
                component: () => import('@/views/UserCenter.vue')
            }
        ],
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/Login.vue'),
    },
    {
        path: '*',
        name: 'Error',
        component: () => import('@/views/error/Error.vue'),
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
})

// 路由请求限制
router.beforeEach((to, from, next) => {
    let menuList = store.state.menus.menuList

    let token = localStorage.getItem('token')

    if (to.path === '/login') {
        next()
    } else if (token == null) {
        next({path: '/login'})
    } else {
        if (menuList.length === 0) {
            // 获取菜单信息
            request.get('/sys/menu/nav').then((res) => {

                store.commit('setMenuList', res.data.nav)
                store.commit('setPermissionList', res.data.authorities)
                menuList = store.state.menus.menuList

                menuList.forEach((menu) => {

                    if (menu.children) {
                        menu.children.forEach((item) => {

                            // 转换为路由
                            let route = menuToRoute(item)
                            if (route) {
                                router.addRoute("Home",route)
                            }
                        })
                    }
                })

            })
        }
        next()
    }


})

// 菜单数据==>路由数据
const menuToRoute = (menu) => {
    if (!menu.component) {
        return null
    }

    return {
        name: menu.name,
        path: menu.path,
        meta: {
            icon: menu.icon,
            title: menu.title,
        },
        children: [],
        component: () => import('@/views/' + menu.component + '.vue')
    }
}

export default router
