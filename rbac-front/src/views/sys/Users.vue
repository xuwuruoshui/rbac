<template>
  <div id="user">
    <!-- 用户搜索、新增、批量删除 -->
    <el-form :inline="true"
             style="display:flex;  justify-content:flex-start;">
      <el-form-item style="just-content: left">
        <el-input v-model="searchForm.name"
                  placeholder="名称"
                  clearable></el-input>
      </el-form-item>
      <el-form-item style="just-content: left">
        <el-button @click="searchUser">搜索</el-button>
      </el-form-item>
      <el-form-item style="just-content: left">
        <el-button type="primary"
                   @click="addUser">新增</el-button>
      </el-form-item>
      <el-form-item style="just-content: left">
        <el-button type="danger"
                   @click="deleteUser(null)"
                   :disabled="delBtnStatus">批量删除</el-button>
      </el-form-item>
    </el-form>
    <!-- 表格 -->
    <el-table ref="multipleTable"
              :data="usersTable"
              tooltip-effect="dark"
              style="width: 100%"
              border
              stripe
              @selection-change="handleSelectionChange">
      <el-table-column type="selection"
                       width="55">
      </el-table-column>
      <el-table-column prop="avatar"
                       label="头像"
                       width="80">
        <template slot-scope="scope">
          <el-avatar size="small"
                     :src="scope.row.avatar"></el-avatar>
        </template>
      </el-table-column>
      <el-table-column prop="username"
                       label="用户名"
                       width="120">
      </el-table-column>
      <el-table-column prop="code"
                       label="角色"
                       width="200px"
                       show-overflow-tooltip>
        <template slot-scope="scope">
          <el-tag size="small"
                  type="info"
                  v-for="item in scope.row.roles"
                  :key="item.id">
            {{item.name}}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="email"
                       label="邮箱"
                       width="180">
      </el-table-column>
      <el-table-column prop="phone"
                       label="手机号"
                       width="120">
      </el-table-column>
      <el-table-column prop="status"
                       label="状态"
                       width="80px">
        <template #default="scope">
          <el-tag size="small"
                  v-if="scope.row.status === 1"
                  type="success">正常</el-tag>
          <el-tag size="small"
                  v-else
                  type="danger">禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="created"
                       label="创建时间">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.created }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="icon"
                       label="操作"
                       width="330px">
        <template slot-scope="scope">
          <el-button size="mini"
                     @click="assigningRoles(scope.row.id)">分配角色</el-button>
          <el-button size="mini"
                     @click="resetPassword(scope.row.id)">重置密码</el-button>
          <el-button size="mini"
                     @click="editRole(scope.row.id)">编辑</el-button>
          <el-button slot="reference"
                     size="mini"
                     type="danger"
                     @click="deleteRole(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { user } from '@/api'

export default {
  data() {
    return {
      searchForm: {
        name: '',
      },
      usersTable: [],
      delBtnStatus: true,
    }
  },
  methods: {
    // 查询用户
    searchUser() {},
    // 添加用户
    addUser() {},
    // 删除用户
    deleteUser() {},
    // 分配角色
    assigningRoles() {},
    // 重置密码
    resetPassword() {},
    handleSelectionChange() {},
    async getUserList() {
      let userListData = await user.fetchUserList()
      this.usersTable = userListData.users
    },
  },
  created() {
    this.getUserList()
  },
}
</script>

<style scoped>
#user {
  margin: 5px;
}
</style>
<style>
#user .el-tag.el-tag--info {
  margin: 5px;
}
#user > .el-table td,
#user > .el-table th {
  text-align: center !important;
}
</style>