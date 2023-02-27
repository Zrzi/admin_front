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
      <el-menu-item v-for="menu in system.menus" :index="menu.path" @click="handleClick">
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
      systems: [
        {
          systemId: 'S01',
          systemName: '权限管理',
          menus: [
            {
              menuId: 'M01',
              menuName: '用户管理',
              path: '/home/users'
            },
            {
              menuId: 'M02',
              menuName: '角色管理',
              path: '/home/roles'
            },
            {
              menuId: 'M03',
              menuName: '系统管理',
              path: '/home/systems'
            }
          ]
        },
        {
          systemId: 'S02',
          systemName: 'Excel映射管理',
          menus: []
        }
      ]
    }
  },
  methods: {
    handleClick(value) {
      let path = value.index;
      this.$router.push(path);
    }
  }
}
</script>

<style scoped>

</style>