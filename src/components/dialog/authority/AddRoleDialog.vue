<template>
  <el-dialog v-model="addRoleFormVisible" title="添加角色" @opened="init" @close="cancelAddRoleForm">
    <el-form :model="addRoleForm" :rules="addRoleFormRules" ref="addRoleForm">
      <el-form-item label="角色名称" prop="roleName" :label-width="formLabelWidth">
        <el-input v-model="addRoleForm.roleName" autocomplete="off" />
      </el-form-item>
      <el-form-item label="所属系统" prop="systemId" :label-width="formLabelWidth">
        <el-select v-model="addRoleForm.systemId">
          <el-option
              v-for="system in systems"
              :key="system.systemId"
              :label="system.systemName"
              :value="system.systemId"
          />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
        <span class="dialog-footer">
          <el-button @click="cancelAddRoleForm">取消</el-button>
          <el-button type="primary" @click="addRole">确认</el-button>
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
      systems: [],
      formLabelWidth: '140px',
      addRoleFormVisible: false,
      addRoleForm: {
        roleName: '',
        systemId: ''
      },
      addRoleFormRules: {
        roleName: [
          {required: true, message: '请输入角色名称', trigger: 'blur'},
          {max: 16, message: '角色名称最长16个字', trigger: 'blur'}
        ],
        systemId: [
          {required: true, messageType: '请选择所属系统', trigger: 'blur'}
        ]
      },
    }
  },
  methods: {
    init() {
      let _this = this;
      _this.$httpAuthority.get('/authority/system/get').then(res => {
        const result = res.data;
        _this.systems = result.data;
      }).catch(message => {
        _this.systems = [];
      });
    },
    clearAddRoleForm() {
      this.$refs['addRoleForm'].resetFields();
    },
    cancelAddRoleForm() {
      this.clearAddRoleForm();
      this.addRoleFormVisible = false;
      this.$emit('close-add-role');
    },
    addRole() {
      this.$refs['addRoleForm'].validate((valid) => {
        let roleForm = this.addRoleForm;
        let _this = this;
        if (valid) {
          _this.$httpAuthority.post('/authority/role/post', roleForm).then(res => {
            ElMessage({
              message: '添加成功',
              duration: 3 * 1000,
              center: true,
              type: 'success'
            });
            _this.$emit('add-role-success');
            _this.cancelAddRoleForm();
          }).catch(message => {
            // _this.clearAddRoleForm();
          });
        } else {
          ElMessage({
            message: '输入错误',
            duration: 3 * 1000,
            center: true,
            type: 'error'
          });
          _this.clearAddRoleForm();
        }
      });
    }
  },
  created() {

  }
}
</script>

<style scoped>

</style>