<template>
  <el-menu
      active-text-color="#ffd04b"
      background-color="#FFFFFF"
      class="el-menu-vertical-demo"
      :unique-opened="true"
      ref="sideMenu">
    <el-sub-menu v-for="system in systems" :index="system.systemId">
      <template #title>
        <el-icon><Location /></el-icon>
        <span style="display: block; overflow: hidden; text-overflow: ellipsis">
          {{ system.systemName }}
        </span>
      </template>
      <el-menu-item v-for="menu in system.menus"
                    :index="menu.path"
                    @click="handleClick" >
        <span style="display: block; overflow: hidden; text-overflow: ellipsis">
          {{ menu.menuName }}
        </span>
      </el-menu-item>
    </el-sub-menu>
<!--    <el-sub-menu>-->
<!--      <template #title>-->
<!--        <el-icon><Location /></el-icon>-->
<!--        <span style="display: block; overflow: hidden; text-overflow: ellipsis">-->
<!--          测试-->
<!--        </span>-->
<!--      </template>-->
<!--      <el-menu-item index="/system/index.html"-->
<!--                    @click="handleClick" >-->
<!--        <span style="display: block; overflow: hidden; text-overflow: ellipsis">-->
<!--          系统1-页面1-->
<!--        </span>-->
<!--      </el-menu-item>-->
<!--    </el-sub-menu>-->
  </el-menu>
</template>

<script>
export default {
  name: "SideMenu",
  data() {
    return {
      systems: null
    }
  },
  methods: {
    handleClick(value) {
      let path = value.index;
      let start = path.indexOf("/home/");
      if (start === 0) {
        this.$router.push(path);
      } else {
        let href = window.location.protocol+"//"+window.location.host+"/";
        path = path.substring(1);
        let index = path.indexOf('/');
        if (index !== -1) {
          href = href + path.substring(0, index) + '/#' + path.substring(index);
        } else {
          href = href + path;
        }
        window.open(href, '_blank');
      }
    },
    initSystems() {
      let _this = this;
      _this.$httpAuthority.get('/authority/getMenus').then(res => {
        const response = res.data;
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