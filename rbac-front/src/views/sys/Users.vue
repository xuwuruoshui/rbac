<template>
  <div id="user">
    <!-- 用户搜索、新增、批量删除 -->
    <el-form :inline="true"
             border
             stripe
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
                   @click="addUser"
                   v-if="hasAuth('sys:user:save')">新增</el-button>
      </el-form-item>
      <el-form-item style="just-content: left">
        <el-button type="danger"
                   @click="deleteUser(null)"
                   v-if="hasAuth('sys:user:delete')"
                   :disabled="delBtnStatus">批量删除</el-button>
      </el-form-item>
    </el-form>
    <!-- 用户表格 -->
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
                     @click="resetPassword(scope.row.id,scope.row.username)">重置密码</el-button>
          <el-button size="mini"
                     @click="editUser(scope.row.id)">编辑</el-button>
          <el-button slot="reference"
                     size="mini"
                     type="danger"
                     @click="deleteUser(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination @size-change="handleSizeChange"
                   @current-change="handleCurrentChange"
                   :current-page="current"
                   :page-sizes="[10, 20, 50, 100]"
                   :page-size="size"
                   :total="total"
                   layout="total, sizes, prev, pager, next, jumper">
    </el-pagination>

    <!-- 用户对话框 -->
    <el-dialog title="提示"
               :visible.sync="userDialogVisible"
               width="40%"
               :before-close="handleClose">
      <el-form :model="userForm"
               :rules="userFormRules"
               ref="userForm"
               label-width="100px"
               class="demo-ruleForm">
        <el-form-item label="用户"
                      prop="username">
          <el-input v-model="userForm.username"></el-input>
        </el-form-item>
        <el-form-item label="邮箱"
                      prop="email">
          <el-input v-model="userForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机号"
                      prop="phone">
          <el-input v-model="userForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="类型"
                      prop="status">
          <el-radio-group v-model="userForm.status">
            <el-radio :label="0">禁用</el-radio>
            <el-radio :label="1">正常</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-button type="primary"
                   @click="submitUserForm('userForm')">{{userForm.option}}</el-button>
        <el-button @click="resetUserForm('userForm')">重置</el-button>
      </el-form>
    </el-dialog>

    <!-- 分配角色对话框 -->
    <el-dialog title="分配角色"
               :visible.sync="assigningRolesDialogFormVisible">
      <el-form :model="roleForm">
        <el-tree :data="roleData"
                 show-checkbox
                 node-key="id"
                 ref="roleTree"
                 :default-expand-all="true"
                 :props="defaultProps">
        </el-tree>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="assigningRolesDialogFormVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="assigningRolesDialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { user, role } from '@/api'

export default {
  data() {
    return {
      searchForm: {
        name: '',
      },
      userForm: {
        option: '',
      },
      userFormRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
        ],
        email: [{ required: true, message: '请输入邮箱', trigger: 'blur' }],
        phone: [{ required: true, message: '请输入手机号', trigger: 'blur' }],
        status: [{ required: true, message: '请选择状态', trigger: 'blur' }],
      },
      usersTable: [],
      multipleSelection: [],
      userDialogVisible: false,
      assigningRolesDialogFormVisible: false,
      roleForm: {},
      roleData: [],
      defaultProps: {
        children: 'children',
        label: 'name',
      },
      current: 1,
      size: 0,
      total: 0,
    }
  },
  methods: {
    // 查询用户
    searchUser() {},
    // 添加用户
    addUser() {
      this.userDialogVisible = true
      this.userForm.option = '添加用户'
    },
    // 编辑用户
    async editUser() {
      this.userDialogVisible = true
      console.log(await user.fetchUser())
      this.userForm = (await user.fetchUser()).user
      this.userForm.option = '修改用户'
    },
    // 关闭对话框
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(() => {
          this.resetUserForm('userForm')
          done()
        })
        .catch(() => {})
    },
    submitUserForm(userForm) {
      this.$refs[userForm].validate(async (valid) => {
        if (valid) {
          let option = this.userForm.id ? 'update' : 'save'
          if (option == 'update') {
            // menu.save(this.editForm).then(() => {
            //   this.$message({
            //     showClose: true,
            //     message: '操作成功',
            //     type: 'success',
            //     onclose: () => {
            //       this.getMenu()
            //     },
            //   })
            //   this.roleDialogVisible = false
            // })
            this.$message({
              showClose: true,
              message: '添加成功',
              type: 'success',
              onClose: () => {
                this.getUserList()
              },
            })
            this.userDialogVisible = false
          } else {
            this.$message({
              showClose: true,
              message: '修改成功',
              type: 'success',
              onClose: () => {
                this.getUserList()
              },
            })
            this.userDialogVisible = false
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 关闭编辑框，清空回显数据数据
    resetUserForm(userForm) {
      this.$refs[userForm].resetFields()
      this.roleDialogVisible = false
      this.editForm = {}
    },
    // 删除用户
    deleteUser(id) {
      this.$confirm('是否要删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          console.log(id)
          //删除及批量删除
          let ids = []
          if (id === null) {
            ids.push(this.multipleSelection.map((item) => item.id))
            console.log(ids)
          } else {
            ids.push(id)
          }
          user.delete(ids)
          this.$message({
            type: 'success',
            message: '删除成功!',
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
          })
        })
    },
    // 分配角色
    async assigningRoles(id) {
      this.assigningRolesDialogFormVisible = true
      let roleData = await role.fetchRoleList()
      // 获取所有角色
      this.roleData = roleData.roles
      // 回显
      let userData = (await user.fetchUser(id)).user
      this.$refs.roleTree.setCheckedKeys(userData.roleIds)
    },
    setCheckedKeys() {},
    // 重置密码
    resetPassword(id, username) {
      this.$confirm(`将重置用户${username}的密码,是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancleButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          //user.resetUserPasswd()
          this.$message({
            showClose: true,
            message: '重置密码成功',
            type: 'success',
          })
        })
        .catch(() => {
          this.$message({
            showClose: true,
            message: '已取消',
            type: 'warning',
          })
        })
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    async getUserList() {
      let userListData = await user.fetchUserList()
      this.usersTable = userListData.users
      this.total = userListData.total
      this.size = userListData.size
      this.current = userListData.current
    },
    handleSizeChange(val) {
      this.size = val
      this.getRoles()
    },
    handleCurrentChange(val) {
      this.current = val
      this.getRoles()
    },
  },
  computed: {
    delBtnStatus: function () {
      return this.multipleSelection.length === 0
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