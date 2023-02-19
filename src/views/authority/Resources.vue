<template>
  <div style="margin: auto; width: 90vw">
    <div style="display: flex; align-items: center; justify-content: space-between; padding-bottom: 2vh">
      <el-form-item prop="searchKey" style="width: 20vw">
        <el-input v-model="searchKey" placeholder="请输入资源名称或资源url" autocomplete="off" />
      </el-form-item>
      <div>
        <el-button type="primary">搜索</el-button>
        <el-button plain>重置</el-button>
      </div>
    </div>
    <div style="display: flex; align-items: center; justify-content: right; padding-bottom: 2vh">
      <el-button type="primary" @click="clickAddResource">添加资源</el-button>
    </div>
    <div>
      <el-table :data="this.resources" style="width: 100%" height="400" ref="resourcesTable">
        <el-table-column prop="resourceId" label="资源编码" :show-overflow-tooltip="true" header-align="center" align="center" />
        <el-table-column prop="resourceName" label="资源名称" header-align="center" align="center" />
        <el-table-column prop="systemName" label="所属系统" header-align="center" align="center" />
        <el-table-column prop="resourceUrl" label="资源路径" :show-overflow-tooltip="true" header-align="center" align="center" />
<!--        <el-table-column prop="parentResource" label="父资源" />-->
        <el-table-column prop="resourceType" label="资源类型" header-align="center" align="center" />
        <el-table-column prop="updatedDate" label="修改时间" :show-overflow-tooltip="true" header-align="center" align="center" />
        <el-table-column fixed="right" label="操作" header-align="center" align="center">
          <template #default="scope">
            <span style="color: #409EFF; margin: 1vmin"
                  @click="clickEditResource(scope.row)"
                  @mouseenter="editMouseEnterStyle"
                  @mouseleave="editMouseLeaveStyle">编辑</span>
            <span style="color: #D9001B; margin: 1vmin"
                  @click="clickRemoveResource(scope.row)"
                  @mouseenter="editMouseEnterStyle"
                  @mouseleave="editMouseLeaveStyle">删除</span>
          </template>
        </el-table-column>
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
    <el-dialog v-model="addResourceFormVisible" title="添加资源" @close="cancelAddResource">
      <el-form :model="addResourceForm" :rules="addResourceRules" ref="addResourceForm">
        <el-form-item label="资源类型" prop="resourceType" :label-width="formLabelWidth">
          <el-radio-group v-model="addResourceForm.resourceType">
            <el-radio label="功能操作">功能操作</el-radio>
            <el-radio label="菜单">菜单</el-radio>
            <el-radio label="页面元素">页面元素</el-radio>
            <el-radio label="文件资源">文件资源</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="资源名称" prop="resourceName" :label-width="formLabelWidth">
          <el-input v-model="addResourceForm.resourceName" autocomplete="off" />
        </el-form-item>
        <el-form-item label="资源路径" prop="resourceUrl" :label-width="formLabelWidth">
          <el-input v-model="addResourceForm.resourceUrl" autocomplete="off" />
        </el-form-item>
<!--        <el-form-item label="父资源" prop="parentResource" :label-width="formLabelWidth">-->
<!--          <el-select v-model="addResourceForm.parentResource" default-first-option>-->
<!--            <el-option key="" label="（无父资源）" value="" />-->
<!--            <el-option-->
<!--                v-for="resource in resources"-->
<!--                :key="resource.resourceId"-->
<!--                :label="resource.resourceName"-->
<!--                :value="resource.resourceId" />-->
<!--          </el-select>-->
<!--        </el-form-item>-->
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="cancelAddResource">取消</el-button>
          <el-button type="primary" @click="addResource">确认</el-button>
        </span>
      </template>
    </el-dialog>
    <el-dialog v-model="editResourceFormVisible" title="编辑资源" @opened="initEditResource" @close="cancelEditResource">
      <el-form :model="editResourceForm" :rules="editResourceRules" ref="editResourceForm">
        <el-form-item label="资源类型" prop="resourceType" :label-width="formLabelWidth">
          <el-radio-group v-model="editResourceForm.resourceType">
            <el-radio label="功能操作">功能操作</el-radio>
            <el-radio label="菜单">菜单</el-radio>
            <el-radio label="页面元素">页面元素</el-radio>
            <el-radio label="文件资源">文件资源</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="资源名称" prop="resourceName" :label-width="formLabelWidth">
          <el-input v-model="editResourceForm.resourceName" autocomplete="off" />
        </el-form-item>
        <el-form-item label="资源路径" prop="resourceUrl" :label-width="formLabelWidth">
          <el-input v-model="editResourceForm.resourceUrl" autocomplete="off" />
        </el-form-item>
<!--        <el-form-item label="父资源" prop="parentResource" :label-width="formLabelWidth">-->
<!--          <el-select v-model="editResourceForm.parentResource" default-first-option>-->
<!--            <el-option key="" label="（无父资源）" value="" />-->
<!--            <el-option-->
<!--                v-for="resource in resources"-->
<!--                :key="resource.resourceId"-->
<!--                :label="resource.resourceName"-->
<!--                :value="resource.resourceId" />-->
<!--          </el-select>-->
<!--        </el-form-item>-->
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="cancelEditResource">取消</el-button>
          <el-button type="primary" @click="editResource">确认</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import {ElMessage} from "element-plus";

export default {
  name: "Resources",
  data() {
    return {
      systemId: '',
      searchKey: '',
      resources:[],
      pageSize: 10,
      currentPage: 1,
      total: 0,
      formLabelWidth: '140px',
      addResourceFormVisible: false,
      addResourceForm: {
        resourceType: '',
        resourceName: '',
        resourceUrl: '',
        // parentResource: '',
        systemId: ''
      },
      addResourceRules: {
        resourceType: [
          {required: true, message: '请选择资源类型', trigger: 'blur'}
        ],
        resourceName: [
          {required: true, message: '请输入资源名称', trigger: 'blur'}
        ],
        resourceUrl: [
          {required: true, message: '请输入资源路径', trigger: 'blur'}
        ],
        // parentResource: []
      },
      editResourceSelectedId: '',
      editResourceFormVisible: false,
      editResourceForm: {
        resourceType: '',
        resourceId: '',
        resourceName: '',
        resourceUrl: '',
        // parentResource: ''
      },
      editResourceRules: {
        resourceType: [
          {required: true, message: '请选择资源类型', trigger: 'blur'}
        ],
        resourceName: [
          {required: true, message: '请输入资源名称', trigger: 'blur'}
        ],
        resourceUrl: [
          {required: true, message: '请输入资源路径', trigger: 'blur'}
        ],
        // parentResource: []
      }
    }
  },
  methods: {
    init() {
      this.getData();
    },
    initEditResource() {
      let resourceId = this.editResourceSelectedId;
      if (resourceId) {
        let _this = this;
        _this.$httpAuthority.get('/resource/getById', {params: {resourceId}}).then(res => {
          const result = res.data;
          _this.editResourceForm.resourceId = result.data.resourceId;
          _this.editResourceForm.resourceType = result.data.resourceType;
          _this.editResourceForm.resourceName = result.data.resourceName;
          _this.editResourceForm.resourceUrl = result.data.resourceUrl;
          // _this.editResourceForm.parentResource = result.data.parentResource;
        }).catch(message => {
          _this.editResourceForm = {
            resourceType: '',
            resourceId: '',
            resourceName: '',
            resourceUrl: '',
          };
        });
      }
    },
    getData() {
      let _this = this;
      let systemId = _this.systemId;
      let start = (this.currentPage - 1) * this.pageSize;
      let pageSize = this.pageSize;
      _this.$httpAuthority.get("/resource/get", {params: {systemId, start, pageSize}}).then(res => {
        const result = res.data;
        _this.resources = result.data.resources;
        _this.total = result.data.total;
      }).catch(message => {
        _this.resources = [];
        _this.total = 0;
      });
    },
    editMouseEnterStyle() {
      document.querySelector('body').style.cursor = 'pointer';
    },
    editMouseLeaveStyle() {
      document.querySelector('body').style.cursor = 'default';
    },
    changeList() {
      this.getData();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.changeList();
    },
    handleUpdatePageSize(val) {},
    clearAddResourceForm() {
      this.$refs['addResourceForm'].resetFields();
    },
    clickAddResource() {
      this.addResourceFormVisible = true;
    },
    cancelAddResource() {
      this.clearAddResourceForm();
      this.addResourceFormVisible = false;
    },
    addResource() {
      let resourceForm = this.addResourceForm;
      resourceForm.systemId = this.systemId;
      let _this = this;
      _this.$refs['addResourceForm'].validate((valid) => {
        if (valid) {
          _this.$httpAuthority.post('/resource/post', resourceForm).then(res => {
            ElMessage({
              message: '添加成功',
              duration: 3 * 1000,
              center: true,
              type: 'success'
            });
            _this.total = _this.total + 1;
            _this.cancelAddResource();
            _this.getData();
          }).catch(message => {
            _this.clearAddResourceForm();
          });
        } else {
          ElMessage({
            message: '输入错误',
            duration: 3 * 1000,
            center: true,
            type: 'error'
          });
          _this.clearAddResourceForm();
        }
      });
    },
    clearEditResourceForm() {
      this.$refs['editResourceForm'].resetFields();
    },
    clickEditResource(row) {
      this.editResourceSelectedId = row.resourceId;
      this.editResourceFormVisible = true;
    },
    cancelEditResource() {
      this.clearEditResourceForm();
      this.editResourceFormVisible = false;
    },
    editResource() {
      let _this = this;
      let resourceForm = this.editResourceForm;
      resourceForm.resourceId = this.editResourceSelectedId;
      _this.$refs['editResourceForm'].validate((valid) => {
        if (valid) {
          this.$httpAuthority.post('/resource/update', resourceForm).then(res => {
            ElMessage({
              message: '修改成功',
              duration: 3 * 1000,
              center: true,
              type: 'success'
            });
            _this.editResourceSelectedId = '';
            _this.cancelEditResource();
            _this.getData();
          }).catch(message => {
            _this.clearEditResourceForm();
          });
        } else {
          ElMessage({
            message: '输入错误',
            duration: 3 * 1000,
            center: true,
            type: 'error'
          });
          _this.clearEditResourceForm();
        }
      });
    },
    clickRemoveResource(row) {
      let resourceId = row.resourceId;
      let _this = this;
      let deleteResourceForm = {
        resourceId: resourceId
      }
      _this.$httpAuthority.post('/resource/delete', deleteResourceForm).then(res => {
        ElMessage({
          message: '删除成功',
          duration: 3 * 1000,
          center: true,
          type: 'success'
        });
        if (_this.resources.length === 1) {
          _this.currentPage = _this.currentPage === 1 ? 1 : _this.currentPage - 1;
        }
        _this.changeList();
      }).catch(message => {});
    }
  },
  created() {
    this.systemId = this.$route.query.systemId;
    this.currentPage = 1;
    this.init();
  }
}
</script>

<style scoped>

</style>