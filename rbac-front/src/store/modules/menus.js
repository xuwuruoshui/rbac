import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default {
    namespaced: true,
    state: {
        // 菜单列表，权限列表，标签页默认打开，标签页显示
        menuList: [],
        permissionList: [],
        editableTabsValue: '/index',
        editableTabs: [{
            name: '/index',
            title: '首页'
        }]
    },
    mutations: {
        // 设置菜单，设置权限，添加标签
        // (参数tab.path作为name，是为了迎合菜单自带的index属性路由)
        setMenuList(state, menuList) {
            state.menuList = menuList
        },
        setPermissionList(state, permissionList) {
            state.permissionList = permissionList
        },
        addTab(state, tab) {

            // 判断是否存在
            let isExist = state.editableTabs.findIndex(item => {
                return item.name === tab.path
            })
            if (isExist === -1) {
                state.editableTabs.push({
                    title: tab.title,
                    name: tab.path
                });
            }
            state.editableTabsValue = tab.path;
        }
    },
    actions: {},
    modules: {},
}
