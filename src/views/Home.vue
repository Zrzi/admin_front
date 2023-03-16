<template>
  <el-container>
    <el-header>
      <Navigation></Navigation>
    </el-header>

    <el-container style="width: 100vw">
      <el-aside width="15vw">
        <SideMenu></SideMenu>
      </el-aside>
      <el-main>
<!--        <Tabs></Tabs>-->
        <div style="margin: 0 15px;">
          <router-view/>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>

import SideMenu from "@/components/SideMenu";
import Navigation from "@/components/Navigation";
export default {
  name: "Home",
  components: {Navigation, SideMenu},
  data() {
    return {
      userInfo: {
        id: "",
        username: "",
        avatar: ""
      }
    }
  },
  created() {
    this.getUserInfo()
  },
  methods: {
    getUserInfo() {

    },
    logout() {

    }
  }
}
</script>

<style scoped>
.el-container {
  padding: 0;
  margin: 0;
  height: 100%;
}

.header-avatar {
  float: right;
  width: 210px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.el-dropdown-link {
  cursor: pointer;
}

.el-header {
  background-color: #324057;
  color: #FFFFFF;
  text-align: center;
  line-height: 60px;
  width: 100vw;
  height: 10vh;
}

.el-aside {
  color: #333;
  line-height: 200px;
}

.el-main {
  color: #333;
  padding: 0;
}

a {
  text-decoration: none;
}
</style>