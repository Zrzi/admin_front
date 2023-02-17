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
  props: ['roleId', 'roleName', 'systemId', 'systemName'],
  data() {
    return {
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
    init() {},
    cancelEditRole() {
      this.editRoleFormVisible = false;
      this.$refs['editRoleForm'].resetFields();
      this.$emit('close-edit-role')
    },
    editRole() {
      let _this = this;
      let roleForm = this.editRoleForm;
      _this.$refs['editRoleForm'].validate(valid => {
        if (valid) {
          _this.$httpAuthority.post('/role/update', roleForm).then(res => {
            ElMessage({
              message: '添加成功',
              duration: 3 * 1000,
              center: true,
              type: 'success'
            });
          });
        } else {
          ElMessage({
            message: '输入错误',
            duration: 3 * 1000,
            center: true,
            type: 'error'
          });
        }
        _this.cancelEditRole();
      });
    },
  },
  created() {
    this.clearEditRoleForm();
  }
}
</script>

<style scoped>

</style>