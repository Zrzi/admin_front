<template>
  <el-dialog v-model="authenticateFormVisible" @opened="init" @close="cancelAuthenticate" title="角色授权" style="text-align: left; width: 70vw">
    <div style="display: flex; align-items: center; justify-content: space-between">
      <el-form-item style="width: 20vw">
        <el-input v-model="searchKeyInput" placeholder="请输入资源名称或资源路径" autocomplete="off" />
      </el-form-item>
      <div>
        <el-button type="primary" @click="search" :disabled="searchKeyInput === ''">搜索</el-button>
        <el-button plain @click="reset" :disabled="searchKey === ''">重置</el-button>
      </div>
    </div>
    <div>
      <el-table :data="this.resourcesShow"
                @selection-change="handleSelectionChange"
                row-key="resourceId"
                style="width: 100%" height="200"
                ref="authenticateTable">
        <el-table-column type="selection" fixed="left" reserve-selection header-align="center" />
        <el-table-column prop="resourceId" label="资源编码" header-align="center" :show-overflow-tooltip="true" />
        <el-table-column prop="resourceName" label="资源名称" header-align="center" :show-overflow-tooltip="true" />
        <el-table-column prop="systemName" label="所属系统" header-align="center" :show-overflow-tooltip="true" />
        <el-table-column prop="resourceUrl" label="资源路径" header-align="center" :show-overflow-tooltip="true" />
<!--        <el-table-column prop="parentResource" label="父资源" header-align="center" :show-overflow-tooltip="true" />-->
        <el-table-column prop="resourceType" label="资源类型" header-align="center" />
      </el-table>
    </div>
    <div style="display: flex; align-items: center; justify-content: center">
      <el-pagination
          :page-size="this.pageSize"
          layout="prev, pager, next"
          :total="this.total"
          :current-page="this.currentPage"
          @update:current-page="handleCurrentChange"
          @update:page-size="handleUpdatePageSize"
      />
    </div>
    <template #footer>
        <span class="dialog-footer">
          <el-button @click="cancelAuthenticate">取消</el-button>
          <el-button type="primary" @click="authenticate('authenticateForm')">确认</el-button>
        </span>
    </template>
  </el-dialog>
</template>

<script>
import {ElMessage} from "element-plus";

export default {
  name: "AuthenticateDialog",
  data() {
    return {
      roleId: '',
      systemId: '',
      searchKey: '',
      searchKeyInput: '',
      pageSize: 5,
      total: 0,
      currentPage: 1,
      authenticateFormVisible: false,
      authenticateForm: {},
      authenticateFormRules: {},
      resources: [],
      resourcesShow: [],
      resourcesSelected: []
    }
  },
  methods: {
    init() {
      this.currentPage = 1;
      this.roleId = this.$store.state.roleId;
      this.systemId = this.$store.state.systemId;
      this.getData();
    },
    getData() {
      let _this = this;
      let systemId = this.systemId;
      let roleId = this.roleId;
      let searchKey = this.searchKey;
      _this.$httpAuthority.get('/authority/roleResource/get', {params: {systemId, roleId, searchKey}}).then(res => {
        const result = res.data;
        _this.resources = result.data;
        _this.total = _this.resources.length;
        _this.resourcesShow = _this.resources.slice(0, this.pageSize);
        _this.$nextTick(() => {
          _this.resources.forEach(row => {
            _this.$refs.authenticateTable.toggleRowSelection(row, row.has);
          });
        });
      }).catch(message => {
        _this.resources = [];
        _this.resourcesShow = [];
        _this.total = 0;
      });
    },
    changeList() {
      let start = (this.currentPage - 1) * this.pageSize;
      let end = (this.currentPage) * this.pageSize;
      this.resourcesShow = this.resources.slice(start, end);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.changeList();
    },
    handleUpdatePageSize(val) {},
    handleSelectionChange(array) {
      this.resourcesSelected = array.map(resource => {
        return resource.resourceId;
      });
    },
    cancelAuthenticate() {
      this.authenticateFormVisible = false;
      this.resources = [];
      this.resourcesShow = [];
      this.resourcesSelected = [];
      this.$refs['authenticateTable'].clearSelection();
      this.$emit('close-authenticate');
    },
    authenticate() {
      let _this = this;
      let editRoleResourceForm = {
        roleId: _this.roleId,
        systemId: _this.systemId,
        resourceIds: _this.resourcesSelected
      };
      _this.$httpAuthority.post('/authority/roleResource/post', editRoleResourceForm).then(res => {
        ElMessage({
          message: '提交成功',
          duration: 3 * 1000,
          center: true,
          type: 'success'
        });
        _this.cancelAuthenticate();
      }).catch(message => {

      });
    },
    search() {
      this.searchKey = this.searchKeyInput;
      this.searchKeyInput = '';
      this.currentPage = 1;
      this.getData();
    },
    reset() {
      this.searchKey = '';
      this.searchKeyInput = '';
      this.currentPage = 1;
      this.getData();
    }
  },
  created() {

  }
}
</script>

<style scoped>

</style>