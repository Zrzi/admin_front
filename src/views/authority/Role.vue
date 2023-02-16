<template>
  <div>
    <div style="display: flex; align-items: center; justify-content: space-between">
      <span style="padding-left: 1px; padding-right: 5px">{{ this.roleName }}</span>
      <div>
<!--        <el-button type="primary" @click="clickEditRole">编辑角色</el-button>-->
        <el-button type="primary" @click="clickAuthenticate">角色授权</el-button>
        <el-button type="primary" @click="clickAddMember">添加成员</el-button>
        <el-button type="danger" @click="clickRemoveRole">删除角色</el-button>
      </div>
    </div>
    <el-divider />
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
      <el-table :data="this.usersShow" style="width: 100%" height="280" table-layout="auto">
        <el-table-column prop="userNo" label="用户名" />
        <el-table-column prop="username" label="姓名" />
        <el-table-column label="角色编码">
          <template #default>
            <span>{{ roleId }}</span>
          </template>
        </el-table-column>
        <el-table-column label="角色名称">
          <template #default>
            <span>{{ roleName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="所属系统">
          <template #default>
            <span>{{ systemName }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="updatedDate" label="修改时间" />
        <el-table-column prop="updatedBy" label="操作人" />
        <el-table-column label="操作" fixed="right">
          <template #default="scope">
            <span style="color: #D9001B; margin: 1vmin"
                  @click="clickRemoveUser(scope.row)"
                  @mouseenter="editMouseEnterStyle"
                  @mouseleave="editMouseLeaveStyle">
              删除
            </span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div style="display: flex; align-items: center; justify-content: center">
      <el-pagination
          :page-size="this.pageSize"
          :pager-count="this.pageCount"
          layout="prev, pager, next"
          :total="this.total"
          :current-page="this.currentPage"
          @current-change="handleCurrentChange"
      />
    </div>
<!--    <EditRoleDialog v-model="editRoleFormVisible" @close-edit-role="this.editRoleFormVisible = false"></EditRoleDialog>-->
    <AuthenticateDialog
        v-model="authenticateFormVisible"
        :role-id="roleId" :system-id="systemId"
        @close-authenticate="this.authenticateFormVisible = false"
        @add-member-success="this.init(this.roleId)">
    </AuthenticateDialog>
    <AddMemberDialog
        v-model="addMemberFormVisible"
        :role-id="roleId" :system-id="systemId"
        @close-add-member="this.addMemberFormVisible = false">
    </AddMemberDialog>
  </div>
</template>

<script>
import AddMemberDialog from "@/components/dialog/authority/AddMemberDialog";
import AuthenticateDialog from "@/components/dialog/authority/AuthenticateDialog";
import EditRoleDialog from "@/components/dialog/authority/EditRoleDialog";
import {ElMessage} from "element-plus";

export default {
  name: "Role",
  components: {EditRoleDialog, AuthenticateDialog, AddMemberDialog},
  data() {
    return {
      roleId: -1,
      roleName: '',
      systemId: -1,
      systemName: '',
      users: [],
      usersShow: [],
      searchKey: '',
      pageSize: 10,
      pageCount: 11,
      currentPage: 1,
      total: 0,
      formLabelWidth: '140px',
      // editRoleFormVisible: false,
      authenticateFormVisible: false,
      addMemberFormVisible: false,
    }
  },
  methods: {
    editMouseEnterStyle() {
      document.querySelector('body').style.cursor = 'pointer';
    },
    editMouseLeaveStyle() {
      document.querySelector('body').style.cursor = 'default';
    },
    init(roleId) {
      let _this = this;
      _this.$httpAuthority.get('/role/getByRoleId', roleId).then(res => {
        const data = res.data.data;
        _this.roleName = data.roleName;
        _this.systemId = 'S01';
        _this.systemName = '系统1';
      });
      _this.$httpAuthority.get('/memberRole/get', roleId).then(res => {
        const result = res.data;
        _this.users = result.data;
        _this.usersShow = _this.users.slice(0, this.pageSize);
        _this.total = _this.users.length;
      });
    },
    changeList() {
      let start = (this.currentPage - 1) * this.pageSize;
      let end = (this.currentPage) * this.pageSize;
      this.usersShow = this.users.slice(start, end);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.changeList();
    },
    clickRemoveUser(row) {
      let userNo = row.userNo;
      let _this = this;
      _this.$httpAuthority('/memberRole/deleteMemberRole', _this.roleId, userNo).then(res => {
        ElMessage({
          message: '删除成功',
          duration: 3 * 1000,
          center: true,
          type: 'success'
        });
        _this.users = _this.users.filter((user) => {
          return user.userNo !== userNo;
        });
        _this.changeList();
      });
    },
    // clickEditRole() {
    //   this.editRoleFormVisible = true;
    // },
    clickAuthenticate() {
      this.authenticateFormVisible = true;
    },
    clickAddMember() {
      this.addMemberFormVisible = true;
    },
    clickEditUserRole(row) {},
    clickRemoveRole() {
      let roleId = this.roleId;
      let _this = this;
      _this.$httpAuthority('/role/delete', roleId).then(res => {
        ElMessage({
          message: '删除成功',
          duration: 3 * 1000,
          center: true,
          type: 'success'
        });
        _this.$router.push({path: '/home/roles'})
      });
    },
  },
  beforeRouteUpdate(to, from) {
    this.roleId = to.params.id;
    this.init(this.roleId);
  },
  mounted() {
    this.roleId = this.$route.params.id;
    this.init(this.roleId);
  }
}
</script>

<style scoped>

</style>