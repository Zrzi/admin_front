<template>
  <div>
    <div style="display: flex; align-items: center; justify-content: space-between">
      <span style="padding-left: 1px; padding-right: 5px">{{ this.roleName }}</span>
      <div>
        <el-button type="primary" @click="clickEditRole" v-if="editRoleButton">编辑角色</el-button>
        <el-button type="primary" @click="clickAuthenticate" v-if="authenticateButton">角色授权</el-button>
        <el-button type="primary" @click="clickAddMember" v-if="addMemberButton">添加成员</el-button>
        <el-button type="danger" @click="clickRemoveRole" v-if="deleteRoleButton">删除角色</el-button>
      </div>
    </div>
    <el-divider />
    <div style="display: flex; align-items: center; justify-content: space-between">
      <el-form-item style="width: 20vw">
        <el-input v-model="searchKeyInput" placeholder="请输入用户名或姓名" autocomplete="off" />
      </el-form-item>
      <div>
        <el-button type="primary" @click="search" :disabled="searchKeyInput === ''">搜索</el-button>
        <el-button plain @click="reset" :disabled="searchKey === ''">重置</el-button>
      </div>
    </div>
    <div>
      <el-table :data="this.users" style="width: 100%" height="280" table-layout="auto">
        <el-table-column prop="userNo" label="用户名" :show-overflow-tooltip="true" header-align="center" align="center" />
        <el-table-column prop="username" label="姓名" header-align="center" align="center" />
        <el-table-column label="角色编码" :show-overflow-tooltip="true" header-align="center" align="center" >
          <template #default>
            <span>{{ roleId }}</span>
          </template>
        </el-table-column>
        <el-table-column label="角色名称" header-align="center" align="center" >
          <template #default>
            <span>{{ roleName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="所属系统" header-align="center" align="center" >
          <template #default>
            <span>{{ systemName }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="updatedDate" label="修改时间" :show-overflow-tooltip="true" header-align="center" align="center" />
        <el-table-column prop="updatedBy" label="操作人" :show-overflow-tooltip="true" header-align="center" align="center" />
        <el-table-column label="操作" fixed="right" header-align="center" align="center" >
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
          layout="prev, pager, next"
          :total="this.total"
          :current-page="this.currentPage"
          @update:current-page="handleCurrentChange"
          @update:page-size="handleUpdatePageSize"
      />
    </div>
    <EditRoleDialog
        v-model="editRoleFormVisible"
        @close-edit-role="this.editRoleFormVisible = false"
        @edit-role-success="this.handleEditRoleSuccess"
    >
    </EditRoleDialog>
    <AuthenticateDialog
        v-model="authenticateFormVisible"
        @close-authenticate="this.authenticateFormVisible = false">
    </AuthenticateDialog>
    <AddMemberDialog
        v-model="addMemberFormVisible"
        @close-add-member="this.addMemberFormVisible = false"
        @add-member-success="this.getUsers">
    </AddMemberDialog>
  </div>
</template>

<script>
import AddMemberDialog from "@/components/dialog/authority/AddMemberDialog";
import AuthenticateDialog from "@/components/dialog/authority/AuthenticateDialog";
import EditRoleDialog from "@/components/dialog/authority/EditRoleDialog";
import {ElMessage} from "element-plus";
import checkAuthority from "@/utils/checkAuthority";

export default {
  name: "Role",
  components: {EditRoleDialog, AuthenticateDialog, AddMemberDialog},
  data() {
    return {
      roleName: '',
      systemId: '',
      systemName: '',
      users: [],
      searchKey: '',
      searchKeyInput: '',
      pageSize: 10,
      currentPage: 1,
      total: 0,
      formLabelWidth: '140px',
      editRoleFormVisible: false,
      authenticateFormVisible: false,
      addMemberFormVisible: false,
      editRoleButton: false,
      authenticateButton: false,
      addMemberButton: false,
      deleteRoleButton: false
    }
  },
  computed: {
    roleId() {
      return this.$store.state.roleId;
    }
  },
  watch: {
    roleId: {
      handler(newVal, oldVal) {
        this.init();
      },
      immediate: true
    }
  },
  methods: {
    checkEditRoleButtonAuthority() {
      checkAuthority('Rb203469630844162994e8e0f8811f4f9').then(res => {
        const result = res.data;
        this.editRoleButton = result.data;
      }).catch(message => {
        this.editRoleButton = false;
      });
    },
    checkAuthenticateButtonAuthority() {
      checkAuthority('R2e6d823f53734807951d0170259928b6').then(res => {
        const result = res.data;
        this.authenticateButton = result.data;
      }).catch(message => {
        this.authenticateButton = false;
      });
    },
    checkAddMemberButtonAuthority() {
      checkAuthority('Rd695f531f161493f81cb99d31add8251').then(res => {
        const result = res.data;
        this.addMemberButton = result.data;
      }).catch(message => {
        this.addMemberButton = false;
      });
    },
    checkDeleteRoleButtonAuthority() {
      checkAuthority('R6455af277e32456c9a78de255292e42a').then(res => {
        const result = res.data;
        this.deleteRoleButton = result.data;
      }).catch(message => {
        this.deleteRoleButton = false;
      });
    },
    editMouseEnterStyle() {
      document.querySelector('body').style.cursor = 'pointer';
    },
    editMouseLeaveStyle() {
      document.querySelector('body').style.cursor = 'default';
    },
    init() {
      this.getRole();
      this.getUsers();
    },
    getRole() {
      let roleId = this.roleId;
      let _this = this;
      _this.$httpAuthority.get('/authority/role/getByRoleId', {params: {roleId}}).then(res => {
        const result = res.data;
        _this.roleName = result.data.roleName;
        _this.systemId = result.data.systemId;
        _this.$store.commit("SET_SYSTEM_ID", _this.systemId);
        _this.systemName = result.data.systemName;
      }).catch(message => {
        _this.$router.push({path: '/home/roles'});
      });
    },
    getUsers() {
      let _this = this;
      let roleId = this.roleId;
      let start = (this.currentPage - 1) * this.pageSize;
      let pageSize = this.pageSize;
      let searchKey = this.searchKey;
      _this.$httpAuthority.get('/authority/memberRole/get', {params: {roleId, start, pageSize, searchKey}}).then(res => {
        const result = res.data;
        _this.users = result.data.users;
        _this.total = result.data.count;
      }).catch(message => {
        _this.users = [];
        _this.total = 0;
      });
    },
    changeList() {
      this.getUsers();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.changeList();
    },
    handleUpdatePageSize(val) {

    },
    handleEditRoleSuccess() {
      this.getRole();
      this.$store.commit('SET_ROLE_CHANGE', true);
    },
    clickRemoveUser(row) {
      let userNo = row.userNo;
      let _this = this;
      let roleId = this.roleId;
      let deleteMemberRoleForm = {
        roleId: roleId,
        userNo: userNo
      }
      _this.$httpAuthority.post('/authority/memberRole/deleteMemberRole', deleteMemberRoleForm).then(res => {
        ElMessage({
          message: '删除成功',
          duration: 3 * 1000,
          center: true,
          type: 'success'
        });
        if (_this.users.length === 1) {
          _this.currentPage = _this.currentPage === 1 ? 1 : _this.currentPage - 1;
        }
        _this.changeList();
      }).catch(message => {});
    },
    clickEditRole() {
      this.editRoleFormVisible = true;
    },
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
      let deleteRoleForm = {
        roleId: roleId
      };
      _this.$httpAuthority.post('/authority/role/delete', deleteRoleForm).then(res => {
        ElMessage({
          message: '删除成功',
          duration: 3 * 1000,
          center: true,
          type: 'success'
        });
        _this.$store.commit('SET_ROLE_CHANGE', true);
        _this.$router.push({path: '/home/roles'})
      }).catch(message => {});
    },
    search() {
      this.searchKey = this.searchKeyInput;
      this.searchKeyInput = '';
      this.currentPage = 1;
      this.getUsers();
    },
    reset() {
      this.searchKey = '';
      this.searchKeyInput = '';
      this.currentPage = 1;
      this.getUsers();
    }
  },
  // beforeRouteUpdate(to, from) {
  //   this.roleId = to.params.id;
  //   this.$store.commit("SET_ROLE_ID", this.roleId);
  //   this.init();
  // },
  mounted() {
    // this.roleId = this.$store.state.roleId;
    // this.init();
  },
  created() {
    this.checkEditRoleButtonAuthority();
    this.checkAuthenticateButtonAuthority();
    this.checkAddMemberButtonAuthority();
    this.checkDeleteRoleButtonAuthority();
  }
}
</script>

<style scoped>

</style>