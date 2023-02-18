<template>
  <el-dialog title="添加成员" :v-model="addMemberFormVisible" @opened="init" @close="cancelAddMember">
    <div style="display: flex; align-items: center; justify-content: space-between">
      <el-form-item prop="searchKey" style="width: 20vw">
        <el-input v-model="searchKey" placeholder="请输入用户名或姓名" autocomplete="off" />
      </el-form-item>
      <div>
        <el-button type="primary">搜索</el-button>
        <el-button plain>重置</el-button>
      </div>
    </div>
    <div>
      <el-table :data="this.usersSelectedShow" @selection-change="handleSelectionChange" ref="usersTable"
                style="width: 80%; margin: auto" height="200">
        <el-table-column type="selection" />
        <el-table-column prop="userNo" label="用户名" />
        <el-table-column prop="username" label="姓名" />
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
          <el-button @click="cancelAddMember">取消</el-button>
          <el-button type="primary" @click="addMember">确认</el-button>
        </span>
    </template>
  </el-dialog>
</template>

<script>
import {ElMessage} from "element-plus";

export default {
  name: "AddMemberDialog",
  data() {
    return {
      addMemberFormVisible: false,
      searchKey: '',
      // 用于添加成员时查询到的用户，注意查询到的用户都是不具有该角色的
      usersSelected: [],
      usersSelectedShow: [],
      userNos: [],
      pageSize: 5,
      total: 0,
      currentPage: 1
    }
  },
  computed: {
    roleId() {
      return this.$store.state.roleId;
    }
  },
  methods: {
    init() {
      this.currentPage = 1;
      let roleId = this.roleId;
      let _this = this;
      _this.$httpAuthority.get('/memberRole/getUnaddedUser', {params: {roleId}}).then(res => {
        const result = res.data;
        _this.usersSelected = result.data;
        _this.usersSelectedShow = _this.usersSelected.slice(0, this.pageSize);
        _this.total = _this.usersSelected.length;
      }).catch(message => {});
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.changeList();
    },
    handleUpdatePageSize(val) {},
    changeList() {
      let start = (this.currentPage - 1) * this.pageSize;
      let end = (this.currentPage) * this.pageSize;
      this.usersSelectedShow = this.usersSelected.slice(start, end);
    },
    clearAddMemberForm() {
      this.$refs['usersTable'].clearSelection();
      this.userNos = [];
    },
    cancelAddMember() {
      this.clearAddMemberForm();
      this.addMemberFormVisible = false;
      this.$emit('close-add-member')
    },
    addMember() {
      if (this.userNos.length === 0) {
        ElMessage({
          message: '没有选择用户',
          duration: 3 * 1000,
          center: true,
          type: 'error'
        });
        this.clearAddMemberForm();
      } else {
        let _this = this;
        let addMemberRoleForm = {
          roleId: _this.roleId,
          userNos: _this.userNos
        }
        _this.$httpAuthority.post('/memberRole/addMemberRole', addMemberRoleForm).then(res => {
          ElMessage({
            message: '添加成功',
            duration: 3 * 1000,
            center: true,
            type: 'success'
          });
          _this.$emit('add-member-success');
          this.cancelAddMember();
        }).catch(message => {
          this.clearAddMemberForm();
        });
      }
    },
    handleSelectionChange(array) {
      this.userNos = array.map(user => {
        return user.userNo;
      });
    }
  },
  created() {

  }
}
</script>

<style scoped>

</style>