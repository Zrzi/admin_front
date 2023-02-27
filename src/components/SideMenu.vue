<template>
  <el-menu
      active-text-color="#ffd04b"
      background-color="#FFFFFF"
      class="el-menu-vertical-demo">
    <el-sub-menu v-for="system in systems" :index="system.systemId">
      <template #title>
        <el-icon><Location /></el-icon>
        <span>{{ system.systemName}}</span>
      </template>
      <el-menu-item v-for="menu in system.menus"
                    :index="menu.path"
                    @click="handleClick" >
        {{ menu.menuName }}
      </el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<script>
export default {
  name: "SideMenu",
  data() {
    return {
      systems: null
      // systems: [
      //   {
      //     systemId: 'S01',
      //     systemName: '权限管理',
      //     menus: [
      //       {
      //         menuId: 'Rfd7d453ce918403ab0ccc4b7d00e693',
      //         menuName: '用户管理',
      //         path: '/home/users'
      //       },
      //       {
      //         menuId: 'Rfb45f4d2b0ce4751a66a892cfbc6ec96',
      //         menuName: '角色管理',
      //         path: '/home/roles'
      //       },
      //       {
      //         menuId: 'Re6654c09a55943ba8e8c63826fdc7a26',
      //         menuName: '系统管理',
      //         path: '/home/systems'
      //       }
      //     ]
      //   },
      //   {
      //     systemId: 'S02',
      //     systemName: 'Excel映射管理',
      //     menus: []
      //   }
      // ]
    }
  },
  methods: {
    handleClick(value) {
      let path = value.index;
      this.$router.push(path);
    },
    initSystems() {
      let _this = this;
      _this.$httpAuthority.get('/getMenus').then(res => {
        const response = res.data;
        console.log(response);
        _this.systems = response.data;
      });
    }
  },
  created() {
    this.initSystems();
  }
}
</script>

<style scoped>

</style>