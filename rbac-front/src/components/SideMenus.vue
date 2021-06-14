<template>
  <el-menu :default-active="editableTabsValue"
           class="el-menu-vertical-demo"
           :router="true"
           text-color="#bcbcbd"
           active-text-color="#FFFFF8"
           background-color="#1d1e23"
           :collapse="isCollapse">

    <el-menu-item @click="isCollapse=!isCollapse" index="/">
      <i class="el-icon-menu"></i>
    </el-menu-item>
    <el-menu-item index="/index" @click="addTab({title:'首页',path:'/index'})">
      <i class="el-icon-s-home"></i>
      <span slot="title">首页</span>
    </el-menu-item>
    <el-submenu :index="menu.path"
                v-for="(menu,index) in menuList"
                :key="index">
      <template slot="title">
        <i :class="menu.icon"></i>
        <span slot="title">{{menu.title}}</span>
      </template>
      <el-menu-item-group>
        <el-menu-item :index="item.path"
                      v-for="(item,index) in menu.children"
                      :key="index"
                      @click="addTab(item)">
          <i :class="item.icon"></i>
          <span slot="title">{{item.title}}</span>
        </el-menu-item>
      </el-menu-item-group>
    </el-submenu>

  </el-menu>
</template>

<script>
import { mapState,mapMutations } from 'vuex'

export default {
  name:"SideMenus",
  data() {
    return {
      isCollapse: false
    }
  },
  computed: {
    ...mapState('menus',['menuList','editableTabsValue'])
  },
  methods:{
    ...mapMutations('menus',['addTab'])
  },
  created() {
  }
}
</script>

<style scoped>
/* 左侧菜单  start*/
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  height: 100%;
}
.el-menu {
  text-align: left;
}
/* 左侧菜单 end*/
</style>