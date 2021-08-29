
<template>
  <div class="userform">
    <h1>你好！{{ userInfo.username }}</h1>
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="旧密码" prop="oldPass">
        <el-input
          type="password"
          v-model="ruleForm.oldPass"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="newPass">
        <el-input
          type="password"
          v-model="ruleForm.newPass"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input
          type="password"
          v-model="ruleForm.checkPass"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >提交</el-button
        >
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { user } from "@/api";

export default {
  data() {
    var validateoldPass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.oldPass !== "") {
          callback();
        }
      }
    };
    var validatenewPass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.newPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatecheckPass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.newPass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      userInfo: {},
      ruleForm: {
        oldPass: "",
        newPass: "",
        checkPass: "",
      },
      rules: {
        oldPass: [
          { validator: validateoldPass, trigger: "blur", required: true },
        ],
        newPass: [
          { validator: validatenewPass, trigger: "blur", required: true },
        ],
        checkPass: [
          { validator: validatecheckPass, trigger: "blur", required: true },
        ],
      },
    };
  },
  methods: {
    async getUserInfo() {
      this.userInfo = await user.fetchUserInfo();
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios
            .post("/sys/user/updatePass", this.passForm)
            .then((res) => {
              this.$alert(res.msg, "提示", {
                confirmButtonText: "确定",
                callback: () => {
                  this.$refs[formName].resetFields();
                },
              });
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
  created() {
    this.getUserInfo();
  },
};
</script>

<style>
.userform {
  width: 500px;
  margin: 0 auto;
}
</style>
