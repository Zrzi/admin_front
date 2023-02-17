<template>
  <div>
    <el-container>
      <el-aside style="width: 15vw; height: 100%; margin-left: 1vw; margin-right: 1vw">
        <div style="display: flex; align-items: center; justify-content: space-between; height: 10vh">
          <span style="float: left; padding-left: 1px">角色</span>
          <span style="float: right; padding-right: 1px; color: #409EFF"
                @click="clickAddRole()"
                @mouseenter="editMouseEnterStyle"
                @mouseleave="editMouseLeaveStyle">+新增角色</span>
        </div>
        <el-scrollbar height="80vh">
          <el-collapse>
            <el-collapse-item v-for="system in systems" :title="system.systemName" style="margin: 1vw">
              <el-row v-for="role in system.roles" style="margin-top: 1vmin; margin-bottom: 1vmin">
                <el-col :span="3" />
                <el-col :span="6"
                        @click="clickRole(role.roleId)"
                        @mouseenter="editMouseEnterStyle"
                        @mouseleave="editMouseLeaveStyle">
                  {{ role.roleName }}
                </el-col>
              </el-row>
            </el-collapse-item>
          </el-collapse>
        </el-scrollbar>
      </el-aside>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
    <AddRoleDialog
        v-model="addRoleFormVisible"
        @close-add-role="this.addRoleFormVisible=false">
    </AddRoleDialog>
  </div>
</template>

<script>
import AddRoleDialog from "@/components/dialog/authority/AddRoleDialog";

export default {
  name: "Role",
  components: {AddRoleDialog},
  data() {
    return {
      systems: [],
      show: false,
      addRoleFormVisible: false,
      formLabelWidth: '140px'
    }
  },
  methods: {
    init() {
      let _this = this;
      _this.$httpAuthority.get('/role/get').then(res => {
        const result = res.result;
        _this.systems = result.data;
      });
    },
    editMouseEnterStyle() {
      document.querySelector('body').style.cursor = 'pointer';
    },
    editMouseLeaveStyle() {
      document.querySelector('body').style.cursor = 'default';
    },
    clickAddRole() {
      this.addRoleFormVisible = true;
    },
    clickRole(roleId) {
      this.$router.push({path: '/home/roles/' + roleId});
    }
  },
  created() {
    this.init();
  }
}
</script>

<style scoped>

.el-container {
  padding-top: 1vh;
  margin: 0;
  height: 100%;
}

.el-aside {

}

.contents {
  padding-left: 1vw;
}

.content {

}

</style>