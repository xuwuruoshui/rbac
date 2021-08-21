<template>
  <div id="menus">
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-button type="primary" @click="dialogVisible = true">查询</el-button>
      </el-form-item>
    </el-form>
    <!-- 对话框 -->
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
      :append-to-body="true"
    >
      <span>这是一段信息</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false"
            >确 定</el-button
          >
        </span>
      </template>
    </el-dialog>
    <el-table
      :data="tableData"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      default-expand-all
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      :stripe="true"
    >
      <el-table-column prop="date" label="名称" sortable width="180">
      </el-table-column>
      <el-table-column prop="perms" label="操作权限" sortable width="180">
      </el-table-column>
      <el-table-column prop="icon" label="图标"> </el-table-column>
      <el-table-column prop="icon" label="类型">
        <template #default="scope">
          <el-tag size="small" v-if="scope.row.type === 0">目录</el-tag>
          <el-tag size="small" v-else-if="scope.row.type === 1" type="success"
            >菜单</el-tag
          >
          <el-tag size="small" v-else-if="scope.row.type === 2" type="info"
            >按钮</el-tag
          >
        </template>
      </el-table-column>
      <el-table-column prop="path" label="菜单URL"> </el-table-column>
      <el-table-column prop="component" label="菜单组件"> </el-table-column>
      <el-table-column prop="orderNum" label="排序号"> </el-table-column>
      <el-table-column prop="status" label="状态">
        <template #default="scope">
          <el-tag size="small" v-if="scope.row.status === 1" type="success"
            >正常</el-tag
          >
          <el-tag size="small" v-else type="danger">禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="icon" label="操作" width="180">
        <template #default="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "Menus",
  data() {
    return {
      dialogVisible: false,
      tableData: [
        {
          id: 1,
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          status: 1,
        },
        {
          id: 2,
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          id: 3,
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
          type: 0,
          children: [
            {
              id: 31,
              date: "2016-05-01",
              name: "王小虎",
              address: "上海市普陀区金沙江路 1519 弄",
              type: 1,
            },
            {
              id: 32,
              date: "2016-05-01",
              name: "王小虎",
              address: "上海市普陀区金沙江路 1519 弄",
              type: 2,
            },
          ],
        },
        {
          id: 4,
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
      ],
    };
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    handleClose() {},
  },
};
</script>

<style scoped>
#menus {
  margin: 0 15px;
}
.el-form {
  display: flex;
  justify-content: left;
}
</style>
<style>
#menus > .el-table td,
#menus > .el-table th {
  text-align: center !important;
}
</style>