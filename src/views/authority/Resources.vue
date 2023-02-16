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
      <el-table :data="this.resourcesShow" style="width: 100%" height="400" ref="resourcesTable">
        <el-table-column prop="resourceId" label="资源编码" />
        <el-table-column prop="resourceName" label="资源名称" />
        <el-table-column prop="systemName" label="所属系统" />
        <el-table-column prop="resourceUrl" label="资源路径" />
        <el-table-column prop="parentResource" label="父资源" />
        <el-table-column prop="resourceType" label="资源类型" />
        <el-table-column prop="updatedTime" label="修改时间" />
        <el-table-column fixed="right" label="操作">
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
          @current-change="handleCurrentChange"
      />
    </div>
    <el-dialog v-model="addResourceFormVisible" title="添加资源">
      <el-form :model="addResourceForm" :rules="addResourceRules">
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
        <el-form-item label="父资源" prop="parentResource" :label-width="formLabelWidth">
          <el-select v-model="addResourceForm.parentResource" default-first-option>
            <el-option key="" label="（无父资源）" value="" />
            <el-option
                v-for="resource in resources"
                :key="resource.resourceId"
                :label="resource.resourceName"
                :value="resource.resourceId" />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="cancelAddResource">取消</el-button>
          <el-button type="primary" @click="addResource('addResourceForm')">确认</el-button>
        </span>
      </template>
    </el-dialog>
    <el-dialog v-model="editResourceFormVisible" title="编辑资源">
      <el-form :model="editResourceForm" :rules="editResourceRules" ref="editResourceForm">
        <el-form-item label="资源类型" prop="resourceType" :label-width="formLabelWidth">
          <el-radio-group v-model="editResourceForm.resourceType">
            <el-radio label="operation">功能操作</el-radio>
            <el-radio label="menu">菜单</el-radio>
            <el-radio label="element">页面元素</el-radio>
            <el-radio label="file">文件资源</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="资源名称" prop="resourceName" :label-width="formLabelWidth">
          <el-input v-model="editResourceForm.resourceName" autocomplete="off" />
        </el-form-item>
        <el-form-item label="资源路径" prop="resourceUrl" :label-width="formLabelWidth">
          <el-input v-model="editResourceForm.resourceUrl" autocomplete="off" />
        </el-form-item>
        <el-form-item label="父资源" prop="parentResource" :label-width="formLabelWidth">
          <el-select v-model="addResourceForm.parentResource" default-first-option>
            <el-option key="" label="（无父资源）" value="" />
            <el-option
                v-for="resource in resources"
                :key="resource.resourceId"
                :label="resource.resourceName"
                :value="resource.resourceId" />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="cancelEditResource">取消</el-button>
          <el-button type="primary" @click="editResource('editResourceForm')">确认</el-button>
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
    let checkAddParentResource = (rule, value, callback) => {
      if (value === '') {
        return callback();
      }
      let parentType = '';
      this.resources.forEach(resource => {
        if (resource.resourceId === value) {
          parentType = resource.resourceType;
        }
      });
      if (parentType === '') {
        return callback(new Error('父资源不存在'));
      } else {
        return parentType === this.addResourceForm.resourceType ? callback() : callback(new Error('父资源类型错误'));
      }
    };
    let checkEditParentResource = (rule, value, callback) => {
      if (value === '') {
        return callback();
      }
      let parentType = '';
      this.resources.forEach(resource => {
        if (resource.resourceId === value) {
          parentType = resource.resourceType;
        }
      });
      if (parentType === '') {
        return callback(new Error('父资源不存在'));
      } else {
        return parentType === this.editResourceForm.resourceType ? callback() : callback(new Error('父资源类型错误'));
      }
    };
    return {
      systemId: '',
      searchKey: '',
      resources:[],
      resourcesShow: [],
      pageSize: 10,
      currentPage: 1,
      total: 0,
      formLabelWidth: '140px',
      addResourceFormVisible: false,
      addResourceForm: {
        resourceType: '',
        resourceName: '',
        resourceUrl: '',
        parentResource: '',
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
        parentResource: [
          {required: true, message: '请选择父资源', trigger: 'blur'},
          {validator: checkAddParentResource, trigger: 'blur'}
        ]
      },
      editResourceSelectedId: '',
      editResourceFormVisible: false,
      editResourceForm: {
        resourceType: '',
        resourceId: '',
        resourceName: '',
        resourceUrl: '',
        parentResource: ''
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
        parentResource: [
          {required: true, message: '请选择父资源', trigger: 'blur'},
          {validator: checkEditParentResource, trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    init() {
      let _this = this;
      _this.$httpAuthority.get("/resource/get").then(res => {
        const result = res.data;
        _this.resources = result.data;
        _this.total = _this.resources.length;
        _this.resourcesShow = _this.resources.slice(0, this.pageSize);
      });
    },
    editMouseEnterStyle() {
      document.querySelector('body').style.cursor = 'pointer';
    },
    editMouseLeaveStyle() {
      document.querySelector('body').style.cursor = 'default';
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
    clear() {
      this.addResourceForm.resourceType = '';
      this.addResourceForm.resourceName = '';
      this.addResourceForm.resourceUrl = '';
      this.addResourceForm.parentResource = '';
      this.addResourceForm.systemId = '';
      this.editResourceForm.resourceType = '';
      this.editResourceForm.resourceId = '';
      this.editResourceForm.resourceName = '';
      this.editResourceForm.resourceUrl = '';
      this.editResourceForm.parentResource = '';
      this.editResourceSelectedId = '';
    },
    clickAddResource() {
      this.clear();
      this.addResourceFormVisible = true;
    },
    cancelAddResource() {
      this.clear();
      this.addResourceFormVisible = false;
    },
    addResource(formName) {
      let form = this.addResourceForm;
      form.systemId = this.systemId;
      let _this = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          _this.$httpAuthority.post('/resource/post', form).then(res => {
            ElMessage({
              message: '添加成功',
              duration: 3 * 1000,
              center: true,
              type: 'success'
            });
            _this.clear();
            _this.addResourceFormVisible = false;
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
    clickEditResource(row) {
      this.clear();
      this.editResourceSelectedId = row.resourceId;
      // todo 获取id对应的数据，返显到form中。
      this.editResourceFormVisible = true;
    },
    cancelEditResource() {
      this.clear();
      this.editResourceFormVisible = false;
    },
    editResource(formName) {
      let _this = this;
      let form = this.editResourceForm;
      _this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$httpAuthority.post('/resource/update', form).then(res => {
            ElMessage({
              message: '修改成功',
              duration: 3 * 1000,
              center: true,
              type: 'success'
            });
            _this.clear();
            _this.editResourceFormVisible = false;
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
    clickRemoveResource(row) {
      let resourceId = row.resourceId;
      let _this = this;
      _this.$httpAuthority.post('/resource/delete', resourceId).then(res => {
        ElMessage({
          message: '删除成功',
          duration: 3 * 1000,
          center: true,
          type: 'success'
        });
        _this.resources = _this.resources.filter(resource => {
          return resource.resourceId !== resourceId;
        });
        _this.changeList();
      });
    }
  },
  created() {
    this.systemId = this.$route.query.systemId;
    this.init();
  }
}
</script>

<style scoped>

</style>