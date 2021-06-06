<template>
  <el-menu default-active="1"
           class="el-menu-vertical-demo"
           :router="true"
           text-color="#bcbcbd"
           active-text-color="#FFFFF8"
           background-color="#1d1e23"
           :collapse="isCollapse">

    <el-menu-item @click="isCollapse=!isCollapse">
      <i class="el-icon-menu"></i>
    </el-menu-item>
    <el-menu-item index="/index">
      <i class="el-icon-s-home"></i>
      <span slot="title">首页</span>
    </el-menu-item>
    <el-submenu>
      <template slot="title">
        <i class="el-icon-s-operation"></i>
        <span slot="title">系统管理</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/sys/users">
          <i class="el-icon-user-solid"></i>
          <span slot="title">用户管理</span>
        </el-menu-item>
        <el-menu-item index="/sys/roles">
          <i class="el-icon-s-custom"></i>
          <span slot="title">角色管理</span>
        </el-menu-item>
        <el-menu-item index="/sys/menus">
          <i class="el-icon-menu"></i>
          <span slot="title">菜单管理</span>
        </el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-menu-item index="/sys/tools">
      <i class="el-icon-s-tools"></i>
      <span slot="title">系统工具</span>
    </el-menu-item>

  </el-menu>
</template>

<script>
export default {
  data() {
    return {
      isCollapse: true,
    }
  },
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