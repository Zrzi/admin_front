<template>
  <el-row class="row-bg" justify="center">
    <el-col :span="10">
      <div class="login-form">
        <h2>权限管理系统</h2>
        <el-image
            style="width: 180px; height: 180px"
            :src="require('@/assets/logo.png')"
        ></el-image>
      </div>
    </el-col>
    <el-col :span="1">
      <el-divider direction="vertical"></el-divider>
    </el-col>
    <el-col :span="13">
      <el-form label-position="right" :rules="rules" label-width="80px" :model="loginForm" ref="loginForm">
        <el-form-item label="用户名" v-model="loginForm.userNo" prop="userNo" style="width: 380px;">
          <el-input v-model="loginForm.userNo" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码" v-model="loginForm.password" prop="password" style="width: 380px;">
          <el-input type="password" v-model="loginForm.password" placeholder="请输入密码" show-password></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm">登录</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script>
import {ElMessage} from "element-plus";

export default {
  name: "Login",
  data() {
    return {
      loginForm: {
        userNo: '',
        password: ''
      },
      rules: {
        userNo: [
          {required: true, message: '请输入用户名', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    submitForm() {
      let loginForm = this.loginForm;
      let _this = this;
      this.$refs['loginForm'].validate((valid) => {
        if (valid) {
          _this.$httpAuthority.post('/login', loginForm, {headers: {encrypted: 1}}).then(res => {
            const response = res.data;
            let token = response.data.token;
            let refreshToken = response.data.refreshToken;
            this.$store.commit("SET_TOKENS", token, refreshToken);
            this.$router.push({path: '/home'});
          }).catch(message => {});
        } else {
          ElMessage({
            message: '输入错误',
            duration: 3 * 1000,
            center: true,
            type: 'error'
          });
        }
        _this.$refs['loginForm'].resetFields();
      });
    }
  }
}
</script>

<style scoped>
.el-col {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  text-align: center;
}

.el-row {
  height: 100vh;
  background-color: #fafafa;
}

.el-divider {
  height: 200px;
}
</style>