<template>
  <div>
    <div class="navigation-left">
      <el-icon size="large" style="padding-right: 5px"><ElementPlus /></el-icon>
      <strong style="font-size: 20px">教务系统</strong>
    </div>
    <div class="navigation-right">
      <div style="padding-right: 5px">
        <el-avatar size="default">user</el-avatar>
      </div>
      <el-dropdown trigger="hover">
        <span class="el-dropdown-link">用户菜单</span>
        <template #dropdown>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click="formVisible = true">修改密码</el-dropdown-item>
            <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
    <el-dialog v-model="formVisible" title="修改密码">
      <el-form :model="resetPasswordForm" :rules="rules" ref="resetPasswordForm">
        <el-form-item label="原密码" prop="oldPassword" :label-width="formLabelWidth">
          <el-input v-model="resetPasswordForm.oldPassword" autocomplete="off" />
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword1" :label-width="formLabelWidth">
          <el-input type="password" v-model="resetPasswordForm.newPassword1" autocomplete="off" />
        </el-form-item>
        <el-form-item label="请再次输入新密码" prop="newPassword2" :label-width="formLabelWidth">
          <el-input type="password" v-model="resetPasswordForm.newPassword2" autocomplete="off" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="cancel">取消</el-button>
          <el-button type="primary" @click="resetPassword('resetPasswordForm')">确认</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { ElMessage } from 'element-plus'
export default {
  name: "Navigation",
  data() {
    var checkNewPassword2 = (rule, value, callback) => {
      if (value !== this.resetPasswordForm.newPassword1) {
        return callback(new Error('两次密码输入不一致'));
      } else {
        callback();
      }
    }
    return {
      formVisible: false,
      resetPasswordForm: {
        oldPassword: '',
        newPassword1: '',
        newPassword2: ''
      },
      rules: {
        oldPassword: [
          {required: true, message: '请输入原密码', trigger: 'blur'}
        ],
        newPassword1: [
          {required: true, message: '请输入新密码', trigger: 'blur'},
          {min: 10, max: 16, message: '密码长度最小10位，最长16位', trigger: 'blur'}
        ],
        newPassword2: [
          {required: true, message: '请再次输入新密码', trigger: 'blur'},
          {min: 10, max: 16, message: '密码长度最小10位，最长16位', trigger: 'blur'},
          {validator: checkNewPassword2, trigger: 'blur'}
        ]
      },
      formLabelWidth: '140px'
    }
  },
  methods: {
    editMouseEnterStyle() {
      document.querySelector('body').style.cursor = 'pointer';
    },
    editMouseLeaveStyle() {
      document.querySelector('body').style.cursor = 'default';
    },
    logout() {
      let _this = this;
      _this.$httpAuthority.post("/logout").then(res => {
        localStorage.clear();
        sessionStorage.clear();
        this.$store.commit("RESET_STATE");
        this.$router.push({path: '/login'})
      })
    },
    clear() {
      this.resetPasswordForm.oldPassword = '';
      this.resetPasswordForm.newPassword1 = '';
      this.resetPasswordForm.newPassword2 = '';
    },
    cancel() {
      this.clear();
      this.formVisible = false;
    },
    resetPassword(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let form = this.resetPasswordForm;
          let _this = this;
          _this.$httpAuthority.post('/resetPassword', form).then(res => {
            ElMessage({
              message: '修改成功',
              duration: 3 * 1000,
              center: true,
              type: 'success'
            });
            this.clear();
            this.formVisible = false;
          });
        } else {
          ElMessage({
            message: '输入错误',
            duration: 3 * 1000,
            center: true,
            type: 'error'
          });
          this.clear();
        }
      })
    }
  }
}
</script>

<style scoped>

.el-dropdown-link {
  cursor: pointer;
  color: #FFFFFF;
  display: flex;
  align-items: center;
}

.navigation-left {
  float: left;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.navigation {
  padding-left: 3vw;
}

.navigation-right {
  float: right;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding-right: 20px;
  height: 100%;
}

</style>