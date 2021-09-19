<template>
  <div id="menus">
    <el-form :inline="true"
             class="demo-form-inline">
      <el-form-item style="display: flex; just-content: left">
        <el-button type="primary"
                   @click="handleAdd">新增</el-button>
      </el-form-item>
    </el-form>
    <!-- 对话框 -->
    <el-dialog title="提示"
               :visible.sync="dialogVisible"
               width="40%"
               :before-close="handleClose">
      <el-form :model="editForm"
               :rules="editFormRules"
               ref="editForm"
               label-width="100px"
               class="demo-ruleForm">
        <el-form-item label="上级菜单"
                      prop="region">
          <el-select v-model="editForm.parentId"
                     placeholder="请选择上级菜单">
            <template v-for="item in tableData">
              <el-option :label="item.name"
                         :key="item.id"
                         :value="item.id"></el-option>
              <template v-for="children in item.children">
                <el-option :label="children.name"
                           :key="children.id"
                           :value="children.id">
                  <span>- {{ children.name }}</span>
                </el-option>
              </template>
            </template>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单名称"
                      prop="name">
          <el-input v-model="editForm.name"></el-input>
        </el-form-item>
        <el-form-item label="权限编码"
                      prop="perms">
          <el-input v-model="editForm.perms"></el-input>
        </el-form-item>
        <el-form-item label="图标"
                      prop="icon">
          <el-input v-model="editForm.icon"></el-input>
        </el-form-item>
        <el-form-item label="菜单URL"
                      prop="path">
          <el-input v-model="editForm.path"></el-input>
        </el-form-item>
        <el-form-item label="菜单组件"
                      prop="component">
          <el-input v-model="editForm.component"></el-input>
        </el-form-item>
        <el-form-item label="类型"
                      prop="statu">
          <el-radio-group v-model="editForm.statu">
            <el-radio :label="0">禁用</el-radio>
            <el-radio :label="1">正常</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="类型"
                      prop="orderNum">
          <el-input-number v-model="editForm.orderNum"
                           @change="handleChange"
                           :min="1"
                           :max="10"
                           label="排序号"></el-input-number>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     @click="submitForm('editForm')">{{editForm.option}}</el-button>
          <el-button @click="resetForm('editForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-table :data="tableData"
              style="width: 100%; margin-bottom: 20px"
              row-key="id"
              border
              default-expand-all
              :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
              :stripe="true">
      <el-table-column prop="name"
                       label="名称"
                       sortable
                       width="180">
      </el-table-column>
      <el-table-column prop="perms"
                       label="操作权限"
                       sortable
                       width="180">
      </el-table-column>
      <el-table-column prop="icon"
                       label="图标"> </el-table-column>
      <el-table-column prop="icon"
                       label="类型">
        <template slot-scope="scope">
          <el-tag size="small"
                  v-if="scope.row.type === 0">目录</el-tag>
          <el-tag size="small"
                  v-else-if="scope.row.type === 1"
                  type="success">菜单</el-tag>
          <el-tag size="small"
                  v-else-if="scope.row.type === 2"
                  type="info">按钮</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="path"
                       label="菜单URL"> </el-table-column>
      <el-table-column prop="component"
                       label="菜单组件"> </el-table-column>
      <el-table-column prop="orderNum"
                       label="排序号"> </el-table-column>
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
                       label="操作"
                       width="180">
        <template slot-scope="scope">
          <el-button size="mini"
                     @click="handleEdit(scope.row.id)">编辑</el-button>
          <el-button slot="reference"
                     size="mini"
                     type="danger"
                     @click="deleteMenu(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { menu } from '@/api'

export default {
  name: 'Menus',
  data() {
    return {
      dialogVisible: false,
      num: 0,
      editForm: {
        name: '',
        region: '',
        resource: '',
        orderNum: 1,
        option: '添加',
      },
      editFormRules: {
        parentId: [
          { required: true, message: '请选择上级菜单', trigger: 'blur' },
        ],
        name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
        perms: [{ required: true, message: '请输入权限编码', trigger: 'blur' }],
        type: [{ required: true, message: '请选择状态', trigger: 'blur' }],
        orderNum: [
          { required: true, message: '请填入排序号', trigger: 'blur' },
        ],
        statu: [{ required: true, message: '请选择状态', trigger: 'blur' }],
      },
      tableData: [],
    }
  },
  methods: {
    // 添加
    handleAdd() {
      this.dialogVisible = true
      this.editForm.option = '添加'
    },
    // 修改
    async handleEdit(id) {
      // let { menuDetail } = await menu.fetchMenu(id)
      // this.editForm = await menuDetail
      this.editForm = (await menu.fetchMenu(id)).menuDetail
      this.editForm.option = '修改'
      this.dialogVisible = true
    },
    // 提交
    submitForm(editForm) {
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
            //   this.dialogVisible = false
            // })
            this.$message({
              showClose: true,
              message: '添加成功',
              type: 'success',
              onclose: () => {
                this.getMenu()
              },
            })
            this.dialogVisible = false
          } else {
            this.$message({
              showClose: true,
              message: '修改成功',
              type: 'success',
              onclose: () => {
                this.getMenu()
              },
            })
            this.dialogVisible = false
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 获取菜单
    async getMenu() {
      this.tableData = (await menu.fetchMenuList()).menus
    },
    // 删除菜单
    deleteMenu(id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          //           menu.delete(id).then(()=>{
          // this.$message({
          //             type: 'success',
          //             message: '删除成功!',
          //           })
          //           })
          console.log(id)
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
    // 关闭
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
      this.dialogVisible = false
      this.editForm = {}
    },
    handleChange(value) {
      console.log(value)
    },
  },
  created() {
    this.getMenu()
  },
}
</script>

<style scoped>
#menus {
  margin: 0 15px;
}
</style>
<style>
#menus > .el-table td,
#menus > .el-table th {
  text-align: center !important;
}
</style>