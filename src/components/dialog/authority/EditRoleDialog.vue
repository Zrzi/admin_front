<template>
  <el-dialog v-model="editRoleFormVisible" title="编辑角色" @opened="init" @close="cancelEditRole">
    <el-form :model="editRoleForm" :rules="editRoleFormRules" ref="editRoleForm">
      <el-form-item label="角色名称" prop="roleName" :label-width="formLabelWidth">
        <el-input v-model="editRoleForm.roleName" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
        <span class="dialog-footer">
          <el-button @click="cancelEditRole">取消</el-button>
          <el-button type="primary" @click="editRole()">确认</el-button>
        </span>
    </template>
  </el-dialog>
</template>

<script>
import {ElMessage} from "element-plus";

export default {
  name: "EditRoleDialog",
  data() {
    return {
      roleId: '',
      formLabelWidth: '140px',
      editRoleFormVisible: false,
      editRoleForm: {
        roleName: ''
      },
      editRoleFormRules: {
        roleName: [
          {required: true, message: '请输入角色名称', trigger: 'blur'},
          {max: 16, message: '角色名称最长16个字', trigger: 'blur'}
        ]
      },
    }
  },
  methods: {
    init() {
      this.roleId = this.$store.state.roleId;
    },
    clearEditRoleForm() {
      this.$refs['editRoleForm'].resetFields();
    },
    cancelEditRole() {
      this.clearEditRoleForm();
      this.editRoleFormVisible = false;
      this.$emit('close-edit-role')
    },
    editRole() {
      let _this = this;
      let roleForm = this.editRoleForm;
      roleForm.roleId = this.roleId;
      _this.$refs['editRoleForm'].validate(valid => {
        if (valid) {
          _this.$httpAuthority.post('/role/update', roleForm).then(res => {
            ElMessage({
              message: '修改成功',
              duration: 3 * 1000,
              center: true,
              type: 'success'
            });
            _this.$emit('edit-role-success');
            _this.cancelEditRole();
          }).catch(message => {
            _this.clearEditRoleForm();
          });
        } else {
          ElMessage({
            message: '输入错误',
            duration: 3 * 1000,
            center: true,
            type: 'error'
          });
          _this.clearEditRoleForm();
        }
      });
    },
  },
  created() {

  }
}
</script>

<style scoped>

</style>