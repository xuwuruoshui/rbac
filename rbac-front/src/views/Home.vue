<template>
  <el-container>
    <el-aside width="auto">
      <side-menu></side-menu>
    </el-aside>
    <el-container>
      <el-header>
        <strong class="head-title">Vue Element后台管理系统</strong>
        <div class="header-avator">
          <el-avatar size="medium"
                     src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>

          <el-dropdown>
            <span class="el-dropdown-link">
              Admin<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>个人中心</el-dropdown-item>
              <el-dropdown-item divided>退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>

          <el-link type="success"
                   href="https://cn.vuejs.org/"
                   target="_blank">Vue</el-link>
        </div>
      </el-header>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import SideMenu from '../components/SideMenu.vue'
export default {
  data() {
    return {}
  },
  components: {
    SideMenu,
  },
  methods: {},
}
</script>

<style scoped>
/* 头部start */
.header-avator {
  float: right;
  width: 210px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.el-dropdown-link {
  cursor: pointer;
  color: #b99b7c;
}
/* 头部end */

/* 整体start */
.el-container {
  height: 100%;
}
.el-header {
  background-color: #313237;
  text-align: center;
  line-height: 60px;
  color: #b99b7c;
}

.el-aside {
  background-color: #1d1e23;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
/* 整体end */
</style>