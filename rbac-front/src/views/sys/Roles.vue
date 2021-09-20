<template>
  <div id="role">
    <!-- 搜索、新增、批量删除 -->
    <el-form :inline="true"
             style="display:flex;  justify-content:flex-start;">
      <el-form-item style="just-content: left">
        <el-input v-model="searchForm.name"
                  placeholder="名称"
                  clearable></el-input>
      </el-form-item>
      <el-form-item style="just-content: left">
        <el-button @click="searchRole">搜索</el-button>
      </el-form-item>
      <el-form-item style="just-content: left">
        <el-button type="primary"
                   @click="addRole">新增</el-button>
      </el-form-item>
      <el-form-item style="just-content: left">
        <el-button type="danger"
                   @click="deleteRole(null)"
                   :disabled="delBtnStatus">批量删除</el-button>
      </el-form-item>
    </el-form>

    <!-- 表格 -->
    <el-table ref="multipleTable"
              :data="tableData"
              tooltip-effect="dark"
              style="width: 100%"
              border
              stripe
              @selection-change="handleSelectionChange">
      <el-table-column type="selection"
                       width="55">
      </el-table-column>
      <el-table-column prop="name"
                       label="名称"
                       width="120">
      </el-table-column>
      <el-table-column prop="code"
                       label="唯一编码"
                       width="120">
      </el-table-column>
      <el-table-column prop="remark"
                       label="描述"
                       show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="status"
                       label="状态">
        <template #default="scope">
          <el-tag size="small"
                  v-if="scope.row.status === 1"
                  type="success">正常</el-tag>
          <el-tag size="small"
                  v-else
                  type="danger">禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="icon"
                       label="操作">
        <template slot-scope="scope">
          <el-button size="mini"
                     @click="configAuth(scope.row.id)">分配权限</el-button>
          <el-button size="mini"
                     @click="editRole(scope.row.id)">编辑</el-button>
          <el-button slot="reference"
                     size="mini"
                     type="danger"
                     @click="deleteRole(scope.row.id)">删除</el-button>
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

    <!-- 角色对话框 -->
    <el-dialog title="提示"
               :visible.sync="roleDialogVisible"
               width="40%"
               :before-close="handleClose">
      <el-form :model="editForm"
               :rules="editFormRules"
               ref="editForm"
               label-width="100px"
               class="demo-ruleForm">
        <el-form-item label="角色名称"
                      prop="name">
          <el-input v-model="editForm.name"></el-input>
        </el-form-item>
        <el-form-item label="唯一编码"
                      prop="code">
          <el-input v-model="editForm.code"></el-input>
        </el-form-item>
        <el-form-item label="描述"
                      prop="remark">
          <el-input v-model="editForm.remark"></el-input>
        </el-form-item>
        <el-form-item label="类型"
                      prop="statu">
          <el-radio-group v-model="editForm.statu">
            <el-radio :label="0">禁用</el-radio>
            <el-radio :label="1">正常</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     @click="submitRoleForm('editForm')">{{editForm.option}}</el-button>
          <el-button @click="resetForm('editForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 分配权限对话框 -->
    <el-dialog title="分配权限"
               :visible.sync="authDialogVisible"
               width="40%">
      <el-form :model="authForm">
        <el-tree :data="authTreeData"
                 show-checkbox
                 node-key="id"
                 ref="authTree"
                 :default-expand-all="true"
                 :props="defaultProps">
        </el-tree>
      </el-form>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="authDialogVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="submitAuthForm()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { role, menu } from '@/api'

export default {
  name: 'Role',
  data() {
    return {
      searchForm: {},
      total: 0,
      size: 10,
      current: 1,
      roleDialogVisible: false,
      tableData: [],
      editForm: {
        name: '',
        code: '',
        remark: '',
        status: 0,
        option: '添加',
      },
      editFormRules: {
        name: [{ required: true, message: '请输入角色名称', trigger: 'blur' }],
        code: [{ required: true, message: '请输入唯一编码', trigger: 'blur' }],
        statu: [{ required: true, message: '请选择状态', trigger: 'blur' }],
      },
      multipleSelection: [],
      authDialogVisible: false,
      defaultProps: {
        children: 'children',
        label: 'name',
      },
      authForm: {},
      authTreeData: [],
    }
  },
  methods: {
    // 查询角色
    searchRole() {},
    // 添加角色
    addRole() {
      this.roleDialogVisible = true
      this.editForm.option = '新增'
    },
    //修改角色
    async editRole(id) {
      console.log(id)
      this.editForm = (await role.fetchRole(id)).role
      this.roleDialogVisible = true
      this.editForm.option = '修改'
    },
    // 删除角色
    deleteRole(id) {
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
          role.delete(ids)
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
    // 角色提交
    submitRoleForm(editForm) {
      this.$refs[editForm].validate(async (valid) => {
        if (valid) {
          let option = this.editForm.id ? 'update' : 'save'
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
                this.getRoles()
              },
            })
            this.roleDialogVisible = false
          } else {
            this.$message({
              showClose: true,
              message: '修改成功',
              type: 'success',
              onclose: () => {
                this.getMenu()
              },
            })
            this.roleDialogVisible = false
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 分配权限
    async configAuth(id) {
      this.authDialogVisible = true
      this.authTreeData = (await menu.fetchMenuList()).menus
      // 回显
      let roleData = (await role.fetchRole(id)).role
      this.$refs.authTree.setCheckedKeys(roleData.menuIds)
      this.authForm = roleData
    },
    setCheckedKeys() {},
    // 权限提交
    submitAuthForm() {
      // 选中的节点id
      let ids = []

      // 选中的节点
      ids.push(this.$refs.authTree.getCheckedKeys())
      // 选中的节点上面的父节点
      ids.push(this.$refs.authTree.getHalfCheckedKeys())
      // let authData = {
      //   ids,
      //   id: this.authForm.id,
      // }
      this.$message({
        showClose: true,
        message: '操作成功',
        type: 'success',
        onClose: () => {
          this.getRoles()
        },
      })
      this.authDialogVisible = false
      //})
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    // 关闭对话框
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(() => {
          this.resetForm('editForm')
          done()
        })
        .catch(() => {})
    },
    // 关闭编辑框，清空回显数据数据
    resetForm(editForm) {
      this.$refs[editForm].resetFields()
      this.roleDialogVisible = false
      this.editForm = {}
    },
    handleChange() {},
    handleSelectionChange(val) {
      console.log(val)
      this.multipleSelection = val
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
      this.size = val
      this.getRoles()
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.current = val
      this.getRoles()
    },
    async getRoles() {
      let reusltData = await role.fetchRoleList({
        name: this.searchForm.name,
        current: this.current,
        size: this.size,
      })
      this.tableData = reusltData.roles
      this.current = reusltData.current
      this.total = reusltData.total
      this.size = reusltData.size
    },
  },
  computed: {
    delBtnStatus: function () {
      return this.multipleSelection.length === 0
    },
  },
  created() {
    this.getRoles()
  },
}
</script>

<style scoped>
#role {
  margin: 5px;
}
.el-pagination {
  margin-top: 20px;
}
</style>