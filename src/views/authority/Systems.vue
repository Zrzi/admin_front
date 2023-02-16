<template>
  <el-container width="90vw">
    <el-header style="display: flex; align-items: center; justify-content: space-between; width: 80vw; margin: auto">
      <h2>系统管理</h2>
      <el-button type="primary" @click="clickAddSystem">+添加系统</el-button>
    </el-header>
    <el-divider />
    <el-main>
      <el-row v-for="row in rows" :gutter="30" justify="center" align="middle"
              style="margin-top: 2vh; margin-bottom: 5vh; height: 15vh">
        <el-col v-for="col in this.numsPerRow" :span="5" style="width: 18vw">
          <el-card shadow="always" v-if="this.numsPerRow * (row - 1) + col - 1 < this.systemsNum">
            <div style="text-align: left; font-size: medium"><b>{{ this.systems[this.numsPerRow * (row - 1) + col - 1].systemName }}</b></div>
            <div style="text-align: left; font-size: smaller">系统编码: {{ this.systems[this.numsPerRow * (row - 1) + col - 1].systemId}}</div>
            <div style="display: flex; align-items: center; justify-content: space-between">
              <span style="font-size: small; color: #409EFF"
                    @click="clickResources(this.numsPerRow * (row - 1) + col - 1)"
                    @mouseenter="editMouseEnterStyle"
                    @mouseleave="editMouseLeaveStyle">资源管理</span>
              <span style="font-size: small; color: #409EFF"
                    @click="clickEditSystem(this.numsPerRow * (row - 1) + col - 1)"
                    @mouseenter="editMouseEnterStyle"
                    @mouseleave="editMouseLeaveStyle">编辑应用</span>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </el-main>
    <el-dialog v-model="addSystemFormVisible" title="添加系统">
      <el-form :model="addSystemForm" :rules="addSystemRules" ref="addSystemForm">
        <el-form-item label="系统名称" prop="systemName" :label-width="formLabelWidth">
          <el-input v-model="addSystemForm.systemName" autocomplete="off" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="cancelAddSystem">取消</el-button>
          <el-button type="primary" @click="addSystem('addSystemForm')">确认</el-button>
        </span>
      </template>
    </el-dialog>
    <el-dialog v-model="editSystemFormVisible" title="编辑系统">
      <el-form :model="editSystemForm" :rules="editSystemRules" ref="editSystemForm">
        <el-form-item label="系统名称" prop="systemName" :label-width="formLabelWidth">
          <el-input v-model="editSystemForm.systemName" autocomplete="off" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="cancelEditSystem">取消</el-button>
          <el-button type="primary" @click="editSystem('editSystemForm')">确认</el-button>
        </span>
      </template>
    </el-dialog>
  </el-container>
</template>

<script>
import {ElMessage} from "element-plus";

export default {
  name: "System",
  data() {
    return {
      systems: [],
      systemsNum: 0,
      numsPerRow: 4,
      rows: 0,
      addSystemFormVisible: false,
      addSystemForm: {
        systemName: ''
      },
      addSystemRules: {
        systemName: [
          {required: true, message: '请输入系统名称', trigger: 'blur'},
          {max: 16, message: '系统名称长度不超过16个字符', trigger: 'blur'}
        ]
      },
      editSystemFormVisible: false,
      systemSelected: null,
      editSystemForm: {
        systemName: '',
        systemId: ''
      },
      editSystemRules: {
        systemName: [
          {required: true, message: '请输入系统名称', trigger: 'blur'},
          {max: 16, message: '系统名称长度不超过16个字符', trigger: 'blur'}
        ],
        systemId: [
          {required: true, message: '请输入系统编码', trigger: 'blur'}
        ]
      },
      formLabelWidth: '140px'
    }
  },
  methods: {
    init() {
      let _this = this;
      _this.$httpAuthority.get('/system/get').then(res => {
        const result = res.data;
        _this.systems = result.data;
        _this.systemsNum = _this.systems.length;
        _this.rows = Math.ceil(_this.systemsNum / _this.numsPerRow);
      });
    },
    editMouseEnterStyle() {
      document.querySelector('body').style.cursor = 'pointer';
    },
    editMouseLeaveStyle() {
      document.querySelector('body').style.cursor = 'default';
    },
    clickAddSystem() {
      this.addSystemFormVisible = true;
    },
    clickResources(index) {
      const { href } = this.$router.resolve({
        path: '/resources',
        query: {
          systemId: this.systems[index].systemId
        }
      });
      window.open(href, '_blank');
    },
    clickEditSystem(index) {
      this.systemSelected = this.systems[index];
      this.editSystemForm.systemName = this.systemSelected.systemName;
      this.editSystemFormVisible = true;
    },
    cancelAddSystem() {
      this.addSystemForm.systemName = '';
      this.addSystemForm.systemId = '';
      this.addSystemFormVisible = false;
    },
    addSystem(formName) {
      let form = this.addSystemForm;
      let _this = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          _this.$httpAuthority.post('/system/post', form).then(res => {
            ElMessage({
              message: '添加成功',
              duration: 3 * 1000,
              center: true,
              type: 'success'
            });
            _this.clear();
            _this.formVisible = false;
            _this.init();
          });
        } else {
          ElMessage({
            message: '输入错误',
            duration: 3 * 1000,
            center: true,
            type: 'error'
          });
          _this.clear();
          return false;
        }
      });
    },
    cancelEditSystem() {
      this.editSystemForm.systemName = '';
      this.editSystemForm.systemId = '';
      this.editSystemFormVisible = false;
    },
    editSystem(formName) {
      let _this = this;
      let form = this.editSystemForm;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          _this.$axios.post('/system/update', form).then(res => {
            ElMessage({
              message: '修改成功',
              duration: 3 * 1000,
              center: true,
              type: 'success'
            });
            _this.clear();
            _this.formVisible = false;
            _this.init();
          });
        } else {
          ElMessage({
            message: '输入错误',
            duration: 3 * 1000,
            center: true,
            type: 'error'
          });
          _this.clear();
          return false;
        }
      });
    }
  },
  created() {
    this.init();
  }
}
</script>

<style scoped>

</style>