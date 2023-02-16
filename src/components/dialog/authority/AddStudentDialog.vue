<template>
  <el-dialog v-model="addStudentFormVisible" title="添加学生">
    <el-form :model="addUserForm" :rules="addUesr" ref="addRoleForm">
      <el-form-item label="角色名称" prop="roleName" :label-width="formLabelWidth">
        <el-input v-model="addRoleForm.roleName" autocomplete="off" />
      </el-form-item>
      <el-form-item label="所属系统" prop="systemName" :label-width="formLabelWidth">
        <el-select v-model="addRoleForm.systemName">
          <el-option
              v-for="system in systems"
              :key="system.systemId"
              :label="system.systemName"
              :value="system.systemId"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="描述" prop="description" :label-width="formLabelWidth">
        <el-input v-model="addRoleForm.description" type="textArea" :rows="3" autocomplete="off" clearable />
      </el-form-item>
    </el-form>
    <template #footer>
        <span class="dialog-footer">
          <el-button @click="cancelAddRoleForm">取消</el-button>
          <el-button type="primary" @click="addRole('addRoleForm')">确认</el-button>
        </span>
    </template>
  </el-dialog>
</template>

<script>
export default {
  name: "AddUserDialog",
  data() {
    return {
      addStudentFormVisible: false
    }
  },
  methods: {
    cancelAddStudent() {
      this.$emit('close-add-student');
    }
  }
}
</script>

<style scoped>

</style>