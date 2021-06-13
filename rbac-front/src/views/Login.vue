<template>
  <el-row type="flex"
          class="row-bg"
          justify="center">
    <el-col :xl="6"
            :lg="7">
      <h2>欢迎来到RBAC权限管理系统</h2>
      <el-image :src="require('@/assets/logo.png')"
                style="width:180px;height:180px"></el-image>
      <p>Vue RBAC System</p>
      <p>
        Vue官网，<a href="https://cn.vuejs.org/">【https://cn.vuejs.org】</a>
      </p>
    </el-col>
    <el-col :span="1">
      <el-divider direction="vertical"></el-divider>
    </el-col>
    <el-col :xl="6"
            :lg="7">
      <el-form :model="loginForm"
               :rules="rules"
               ref="loginForm"
               label-width="100px"
               class="demo-ruleForm">
        <el-form-item label="用户名"
                      prop="username"
                      style="width:380px">
          <el-input v-model="loginForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码"
                      prop="password"
                      style="width:380px">
          <el-input v-model="loginForm.password"></el-input>
        </el-form-item>
        <el-form-item label="验证码"
                      prop="code"
                      style="width:380px">
          <el-input v-model="loginForm.code"
                    style="width:150px; float:left;"></el-input>
          <el-image :src="captchaImg"
                    class="captchaImg"></el-image>
        </el-form-item>

        <el-form-item>
          <el-button type="primary"
                     @click="submitForm('loginForm')">立即创建</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  data() {
    return {
      loginForm: {
        username: '',
        password: '',
        code: '',
        token: '',
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' },
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { min: 5, max: 5, message: '长度在 5 个字符', trigger: 'blur' },
        ],
      },
      captchaImg: '',
    }
  },
  methods: {
    submitForm(loginForm) {
      this.$refs[loginForm].validate((valid) => {
        if (valid) {
          this.$axios.post('/login', this.loginForm).then((res) => {
            console.log(res)
            const jwt = res.headers['authorization']
            this.setToken(jwt)
            this.$router.push('/index')
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(loginForm) {
      this.$refs[loginForm].resetFields()
    },
    getCaptcha() {
      this.$axios.get('/captcha').then((res) => {
        console.log(res)
        this.loginForm.token = res.data.token
        this.captchaImg = res.data.captchaImg
      })
    },
    ...mapMutations(['setToken']),
  },
  created() {
    this.getCaptcha()
  },
}
</script>

<style scoped>
a {
  text-decoration: none;
}
a:link {
  color: #4fc08da1;
} /* 未访问的链接 */
a:visited {
  color: #4fc08da1;
} /* 已访问的链接 */
a:hover {
  color: #4fc08d;
} /* 当有鼠标悬停在链接上 */
a:active {
  color: #4fc08da1;
} /* 被选择的链接 */

.el-row {
  background: #fafafa;
  height: 100%;
  display: flex;
  align-items: center;
  text-align: center;
}
.el-divider {
  height: 200px;
}
.captchaImg {
  float: left;
  margin-left: 8px;
  border-radius: 4px;
}
</style>