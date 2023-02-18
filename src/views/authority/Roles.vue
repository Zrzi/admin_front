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
          <el-collapse style="border: none">
            <el-collapse-item v-for="system in systems" :title="system.systemName" style="margin: 1vw; border: none">
              <el-row v-for="role in system.roles" style="margin-top: 1vmin; margin-bottom: 1vmin">
                <el-col :span="3" />
                <el-col :span="15" style="text-align: left"
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
        @close-add-role="this.addRoleFormVisible=false"
        @add-role-success="init"
    >
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
  computed: {
    roleChange() {
      return this.$store.state.roleChange;
    }
  },
  watch: {
    roleChange: {
      handler(newVal, oldVal) {
        if (newVal === true) {
          this.init();
          this.$store.commit('RESET_ROLE_CHANGE');
        }
      }
    }
  },
  methods: {
    init() {
      let _this = this;
      // let res = await this.$httpAuthority.get('/role/get');
      // this.systems = res.data.data;
      _this.$httpAuthority.get('/role/get').then(res => {
        const result = res.data;
        _this.systems = result.data;
      }).catch(message => {

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
      this.$store.commit("SET_ROLE_ID", roleId);
      this.$router.push({path: '/home/roles/role'});
    }
  },
  mounted() {
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