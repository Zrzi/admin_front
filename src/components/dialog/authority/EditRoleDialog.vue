<template>
  <el-dialog v-model="editRoleFormVisible" title="编辑角色">
    <el-form :model="editRoleForm" :rules="editRoleFormRules" ref="editRoleForm">
      <el-form-item label="角色名称" prop="roleName" :label-width="formLabelWidth">
        <el-input v-model="editRoleForm.roleName" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
        <span class="dialog-footer">
          <el-button @click="cancelEditRole">取消</el-button>
          <el-button type="primary" @click="editRole('editRoleForm')">确认</el-button>
        </span>
    </template>
  </el-dialog>
</template>

<script>
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
    clearEditRoleForm() {
      this.editRoleForm.roleName = '';
    },
    cancelEditRole() {
      this.clearEditRoleForm();
      this.editRoleFormVisible = false;
      this.$emit('close-edit-role')
    },
    editRole(formName) {
      let form = this.$refs[formName].validate(valid => {
        if (valid) {

        } else {

        }
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