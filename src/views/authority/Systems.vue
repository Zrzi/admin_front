<template>
  <el-container width="90vw">
    <el-header style="display: flex; align-items: center; justify-content: space-between; width: 80vw; margin: auto">
      <h2>系统管理</h2>
      <el-button type="primary" @click="clickAddSystem" v-if="addSystemButton">+添加系统</el-button>
    </el-header>
    <el-divider />
    <el-space wrap :size="15">
      <el-card shadow="hover" v-for="(system, index) in systems" style="width: 15vw">
        <div style="text-align: left; font-size: medium; margin-bottom: 1vh">
          <b>{{ system.systemName }}</b>
        </div>
        <div style="display: flex; align-items: center; justify-content: space-between; margin-top: 1vh">
          <span style="font-size: small; color: #409EFF"
                @click="clickResources(index)"
                @mouseenter="editMouseEnterStyle"
                @mouseleave="editMouseLeaveStyle">
            资源管理
          </span>
          <span style="font-size: small; color: #409EFF"
                @click="clickEditSystem(index)"
                @mouseenter="editMouseEnterStyle"
                @mouseleave="editMouseLeaveStyle"
                v-if="editSystemButton">
            编辑系统
          </span>
        </div>
      </el-card>
    </el-space>
    <el-dialog v-model="addSystemFormVisible" title="添加系统">
      <el-form :model="addSystemForm" :rules="addSystemRules" ref="addSystemForm">
        <el-form-item label="系统名称" prop="systemName" :label-width="formLabelWidth">
          <el-input v-model="addSystemForm.systemName" autocomplete="off" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="cancelAddSystem">取消</el-button>
          <el-button type="primary" @click="addSystem">确认</el-button>
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
          <el-button type="primary" @click="editSystem">确认</el-button>
        </span>
      </template>
    </el-dialog>
  </el-container>
</template>

<script>
import {ElMessage} from "element-plus";
import checkAuthority from "@/utils/checkAuthority";

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
        ]
      },
      formLabelWidth: '140px',
      addSystemButton: false,
      editSystemButton: false
    }
  },
  methods: {
    checkAddSystemButtonAuthority() {
      checkAuthority('R681d2ec8e6ed438497570b021a989a25').then(res => {
        const result = res.data;
        this.addSystemButton = result.data;
      }).catch(message => {
        this.addSystemButton = false;
      });
    },
    checkEditSystemButtonAuthority() {
      checkAuthority('R25b04ab19eb24a32a470fbcaed4e3b53').then(res => {
        const result = res.data;
        this.editSystemButton = result.data;
      }).catch(message => {
        this.editSystemButton = false;
      });
    },
    init() {
      let _this = this;
      _this.$httpAuthority.get('/authority/system/get').then(res => {
        const result = res.data;
        _this.systems = result.data;
        _this.systemsNum = _this.systems.length;
        _this.rows = Math.ceil(_this.systemsNum / _this.numsPerRow);
      }).catch(message => {
        _this.systems = [];
        _this.systemsNum = 0;
        _this.rows = 0;
      });
    },
    // initEditSystem() {
    //   let systemId = this.systemSelected.systemId;
    //   let _this = this;
    //   _this.$httpAuthority.get('/system/getById', {params: {systemId}}).then(res => {
    //     const result = res.data;
    //     _this.editSystemForm.systemId = systemId;
    //     _this.editSystemForm.systemName = result.data.systemName;
    //   }).catch(message => {});
    // },
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
    clearAddSystem() {
      this.$refs['addSystemForm'].resetFields();
    },
    cancelAddSystem() {
      this.clearAddSystem();
      this.addSystemFormVisible = false;
    },
    addSystem() {
      let form = this.addSystemForm;
      let _this = this;
      this.$refs['addSystemForm'].validate((valid) => {
        if (valid) {
          _this.$httpAuthority.post('/authority/system/post', form).then(res => {
            ElMessage({
              message: '添加成功',
              duration: 3 * 1000,
              center: true,
              type: 'success'
            });
            _this.init();
            _this.cancelAddSystem();
          }).catch(message => {
            // _this.clearAddSystem();
          });
        } else {
          ElMessage({
            message: '输入错误',
            duration: 3 * 1000,
            center: true,
            type: 'error'
          });
          _this.clearAddSystem();
        }
      });
    },
    clearEditSystem() {
      this.$refs['editSystemForm'].resetFields();
    },
    cancelEditSystem() {
      this.clearEditSystem();
      this.systemSelected = null;
      this.editSystemFormVisible = false;
    },
    editSystem() {
      let _this = this;
      let form = this.editSystemForm;
      form.systemId = this.systemSelected.systemId;
      this.$refs['editSystemForm'].validate((valid) => {
        if (valid) {
          _this.$httpAuthority.post('/authority/system/update', form).then(res => {
            ElMessage({
              message: '修改成功',
              duration: 3 * 1000,
              center: true,
              type: 'success'
            });
            _this.init();
            _this.cancelEditSystem();
          }).catch(message => {
            // _this.clearEditSystem();
          });
        } else {
          ElMessage({
            message: '输入错误',
            duration: 3 * 1000,
            center: true,
            type: 'error'
          });
          _this.clearEditSystem();
        }
      });
    }
  },
  created() {
    this.init();
    this.checkAddSystemButtonAuthority();
    this.checkEditSystemButtonAuthority();
  }
}
</script>

<style scoped>

</style>