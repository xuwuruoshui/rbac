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
    <el-menu-item index="/">
      <i class="el-icon-s-home"></i>
      <span slot="title">首页</span>
    </el-menu-item>
    <el-submenu :index="menu.path"
                v-for="(menu,index) in menuList"
                :key=index>
      <template slot="title">
        <i :class="menu.icon"></i>
        <span slot="title">{{menu.title}}</span>
      </template>
      <el-menu-item-group>
        <el-menu-item :index="item.path"
                      v-for="(item,index) in menu.children"
                      :key="index">
          <i :class="item.icon"></i>
          <span slot="title">{{item.title}}</span>
        </el-menu-item>
      </el-menu-item-group>
    </el-submenu>

  </el-menu>
</template>

<script>
export default {
  data() {
    return {
      isCollapse: true,
      menuList: [
        {
          name: 'SysManga',
          title: '系统管理',
          icon: 'el-icon-s-operation',
          path: '',
          children: [
            {
              name: 'SysUser',
              title: '用户管理',
              icon: 'el-icon-s-custom',
              path: '/sys/users',
              children: [],
            },
          ],
        },
        {
          name: 'SysTools',
          title: '系统工具',
          icon: 'el-icon-s-tools',
          path: '',
          children: [
            {
              name: 'SysDict',
              title: '数字字典',
              icon: 'el-icon-s-order',
              path: '/sys/dicts',
              children: [],
            },
          ],
        },
      ],
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