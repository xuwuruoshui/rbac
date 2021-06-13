import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default {
  state: {
    // 菜单列表，权限列表，是否已经生成过路由
    menuList: [],
    permissionList: []
  },
  mutations: {
    setMenuList(state, menuList) {
      state.menuList = menuList
    },
    setPermissionList(state, permissionList) {
      state.permissionList = permissionList
    },
  },
  actions: {},
  modules: {},
}
