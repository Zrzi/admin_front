<template>
  <el-dialog v-model="addRoleFormVisible" title="添加角色">
    <el-form :model="addRoleForm" :rules="addRoleFormRules" ref="addRoleForm">
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
import {ElMessage} from "element-plus";

export default {
  name: "AddRoleDialog",
  props: [],
  data() {
    return {
      formLabelWidth: '140px',
      addRoleFormVisible: false,
      addRoleForm: {
        roleName: '',
        systemName: '',
        description: ''
      },
      addRoleFormRules: {
        roleName: [
          {required: true, message: '请输入角色名称', trigger: 'blur'},
          {max: 16, message: '角色名称最长16个字', trigger: 'blur'}
        ],
        systemName: [
          {required: true, messageType: '请选择所属系统', trigger: 'blur'}
        ],
        description: [
          {max: 100, message: '最多100个字符', trigger: 'blur'}
        ]
      },
    }
  },
  methods: {
    clearAddRoleForm() {
      this.roleName = '';
      this.systemName = '';
      this.description = '';
    },
    cancelAddRoleForm() {
      this.clearAddRoleForm();
      this.addRoleFormVisible = false;
      this.$emit('close-add-role');
    },
    addRole(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let form = this.addRoleForm;
          this.$axios.post('/addRole', form).then(res => {
            ElMessage({
              message: '添加成功',
              duration: 3 * 1000,
              center: true,
              type: 'success'
            });
            this.clear();
            this.formVisible = false;
          }).catch(error => {
            ElMessage({
              message: '提交错误',
              duration: 3 * 1000,
              center: true,
              type: 'error'
            });
            this.clear();
          })
        } else {
          ElMessage({
            message: '输入错误',
            duration: 3 * 1000,
            center: true,
            type: 'error'
          });
          this.clear();
        }
      });
    }
  },
  computed: {
    systems: {
      get() {
        return [
          {
            systemId: 'S01',
            systemName: '系统1'
          }
        ];
      }
    }
  },
  created() {
    this.clearAddRoleForm();
  }
}
</script>

<style scoped>

</style>