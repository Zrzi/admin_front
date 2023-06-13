<template>

  <div class="sidebar">
    <el-menu
        class="sidebar-el-menu"
        :default-active="onRoutes"
        :collapse="collapse"
        background-color="#A30014"
        text-color="#fff"
        active-text-color="#20a0ff"
        unique-opened
        router
    >
       <template v-for="(v, index) in list" :key="index"> 
        <el-menu-item
            align="center"
            class="menu-item"
            :index="icon1[index]"
            @click="getTitle(v.title)"
            v-if="show[index]">
          <i :class="icon[index]"></i>
          <span :title="icon2[index]">{{ v.title }}</span>
        </el-menu-item>

      </template>

 
      

    </el-menu>

  </div>


</template>

<script>
import {mapState} from "vuex";
import router from "/src/router";
import bus from "vue3-eventbus";

export default {
  name: "navi",
  data() {
    return {
      form: {
        customerName: "",
        password: "",
        customerId: "",
        loginCount: "",
        lastLoginTime: "",
        customerTypeId: "",
      },
      active: 0,
      icon1: [
        'home1',
        'blog',
        'student',
        'honor',
        'comment',
        'course',
        'score',
        'activity',
        'innovation',
        'dailyRecord',
        'information',
        'studentIntroduce',
        'teachIntroduce'
      ],
      icon2: [
        '主页',
        '实习任务详情',
        '学生组队',
        '我的实习队伍名单',
        '队内评价',
        '实训课题选择',
        '实训成绩评定',
        '实训学生选题',
        '实践过程管理',
        '课题管理',
        '个人信息修改',
        '实践申请详情',
        '无'
      ],
      icon: [
        'el-icon-user',
        'el-icon-user',
        'el-icon-s-management',
        'el-icon-s-promotion',
        'el-icon-trophy',
        'el-icon-ship',
        'el-icon-notebook-1',
        'el-icon-data-analysis',
        'el-icon-s-home',
        'el-icon-info',
        'el-icon-info',
        'el-icon-user',
        'el-icon-info'
      ],
      collapse: false,
      show: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,0,0,0],
      test: ['2324', '232'],
    };
  },

  computed: {
    ...mapState(["list"]),
    onRoutes() {
      return this.$route.path.replace('/', '');
    }
  },
  created() {
    // 通过 Event Bus 进行组件间通信，来折叠侧边栏
    bus.on('collapse', msg => {
      this.collapse = msg;
      bus.emit('content-collapse', msg);
    });
    this.form = JSON.parse(sessionStorage.getItem("user"));
    var type = this.form.customerTypeId;
    switch (type) {
        //这里自己按需求改吧,1表示显示,2表示不显示
      case 0:
        this.show = [1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0];
        break;
      case 1:
        this.show = [1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1];
        break;
      case 2:
        this.show = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0];
        break;
      default:
        this.show = [1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0];
        break;
    }
  },
  methods: {
    logout() {
      this.$store.commit("logout");
      router.push("/login");
    },
    getTitle(title) {
      this.$store.commit("setRouterName", title);
      this.$emit("title", title);
      //this.$router.push(title);
    }, 
  },
}
</script>

<style lang="scss">
.menu-item {
  font-size: 16px;
  font-weight: bold;
}

.el-menu-item .el-icon svg {
  vertical-align: unset;
}

.el-sub-menu__title .el-icon svg {
  vertical-align: unset;
}

.sidebar {
  display: block;
  position: absolute;
  left: 0;
  top: 70px;
  bottom: 0;
  overflow-y: scroll;
}

.sidebar::-webkit-scrollbar {
  width: px;
}

.sidebar-el-menu:not(.el-menu--collapse) {
  width: 250px;

}

.sidebar > ul {
  height: 100%;

}
</style>