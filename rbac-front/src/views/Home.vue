<template>
  <el-container>
    <el-aside width="auto">
      <side-menus></side-menus>
    </el-aside>
    <el-container>
      <el-header>
        <strong class="head-title">Vue Element后台管理系统</strong>
        <div class="header-avator">
          <el-avatar size="medium" :src="userInfo.avatar"></el-avatar>

          <el-dropdown trigger="click" @command="handleCommand">
            <span class="el-dropdown-link">
              {{ userInfo.username
              }}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <router-link to="/usercenter">个人中心</router-link>
              </el-dropdown-item>
              <el-dropdown-item command="logout">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>

          <el-link type="success" href="https://cn.vuejs.org/" target="_blank"
            >Vue</el-link
          >
        </div>
      </el-header>
      <el-main>
        <tabs />
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import SideMenus from "../components/SideMenus.vue";
import Tabs from "../components/Tabs";
import { user } from "@/api";

export default {
  data() {
    return {
      userInfo: {
        id: "",
        username: "",
        avatar: "",
      },
    };
  },
  components: {
    SideMenus,
    Tabs,
  },
  methods: {
    // 注销
    handleCommand(command) {
      if (command === "logout") {
        localStorage.clear();
        sessionStorage.clear();
        this.$router.push("/login");
        location.reload();
      }
    },
    async getUserInfo() {
      this.userInfo = await user.fetchUserInfo();
    },
  },
  created() {
    // 启动时获取用户信息
    this.getUserInfo();
  },
};
</script>

<style scoped>
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
  padding: 0;
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

a {
  text-decoration: none;
}
</style>