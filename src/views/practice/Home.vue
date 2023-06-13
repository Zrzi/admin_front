<template>
  <div class="wrapper">
    <Header />
    <Navi />
    <div class="content-box" :class="{'content-collapse':collapse}">

      <div >
        <transition name="move" mode="out-in">
          <keep-alive :include="tagsList">
             <router-view />
          </keep-alive>
        </transition>
        <el-backtop target=".content"></el-backtop>
      </div>
    </div>
  </div>

</template>

<script>

import router from "/src/router/index.js";
import { downloadPost } from "/src/service/genServ.js";

import Navi from "./Navi";
import Header from "./Header";
import emitter from "./mitt";
import bus from "vue3-eventbus";

export default {

  name: "Home",
  provide() {
    return {
      reload: this.reload
    };
  },
  data() {
    return {
            todoList:[
                {
                    title: '学生个人的社会关系，入学前信息等等',
                    status: false
                },
                {
                    title: '主页的显示',
                    status: false
                },
                                {
                    title: '个人简历',
                    status: false
                },
                {
                    title: '荣誉信息表格不显示??',
                    status: false
                },                
                

            ],
              SkipSwitchName:"",
      collapse: false,

    };
  },
  
  components: {
    Navi,Header

  },
   watch: {
    $route(to, from) {
      if (to.meta.tx > from.meta.tx) {
        this.SkipSwitchName= "Skright";
      } else {
        this.SkipSwitchName= "Skleft";
      }
    }
  },

  created() {

    bus.on('collapse', msg => {
      this.collapse = msg;
       console.log(`传来的数据是：${msg}`)

    });

    // 只有在标签页列表里的页面才使用keep-alive，即关闭标签之后就不保存到内存中了。
    emitter.on('tags', msg => {
      let arr = [];
      for (let i = 0, len = msg.length; i < len; i++) {
        msg[i].name && arr.push(msg[i].name);
      }
      this.tagsList = arr;
    });
  },

  methods: {
    
        reload() {
      this.isRouterAlive = false;
      this.$nextTick(function () {
        this.isRouterAlive = true;
      });
    },
    logout() {//登出操作
      this.$store.commit("logout");
      router.push("/login");
    },
    downPDF() {
      downloadPost(
        //这个方法有问题,有空再进行检查
        "http://localhost:9090/api/teach/printStudentIntroduce",
        "个人简历"
      );
    },
  },
};
</script>
<style scoped>

.el-row {
  margin-bottom: 20px;
}

.grid-content {
  display: flex;
  align-items: center;
  height: 100px;
}

.grid-cont-right {
  flex: 1;
  text-align: center;
  font-size: 14px;
  color: #999;
}

.grid-num {
  font-size: 30px;
  font-weight: bold;
}

.grid-con-icon {
  font-size: 50px;
  width: 100px;
  height: 100px;
  text-align: center;
  line-height: 100px;
  color: #fff;
}

.grid-con-1 .grid-con-icon {
  background: rgb(45, 140, 240);
}

.grid-con-1 .grid-num {
  color: rgb(45, 140, 240);
}

.grid-con-2 .grid-con-icon {
  background: rgb(100, 213, 114);
}

.grid-con-2 .grid-num {
  color: rgb(45, 140, 240);
}

.grid-con-3 .grid-con-icon {
  background: rgb(242, 94, 67);
}

.grid-con-3 .grid-num {
  color: rgb(45, 140, 240);
}


.grid-con-4 .grid-con-icon {
  background: rgb(255, 215, 0);
}

.grid-con-4 .grid-num {
  color: rgb(45, 140, 240);
}
.grid-con-5 .grid-con-icon {
  background: rgb(0, 255, 0);
}

.grid-con-5 .grid-num {
  color: rgb(45, 140, 240);
}

.grid-con-6 .grid-con-icon {
  background: rgb(255,140,0);
}

.grid-con-6 .grid-num {
  color: rgb(45, 140, 240);
}

.user-info {
  display: flex;
  align-items: center;
  padding-bottom: 20px;
  border-bottom: 2px solid #ccc;
  margin-bottom: 20px;
}

.user-avator {
  width: 120px;
  height: 120px;
  border-radius: 50%;
}

.user-info-cont {
  padding-left: 50px;
  flex: 1;
  font-size: 14px;
  color: #999;
}

.user-info-cont div:first-child {
  font-size: 30px;
  color: #222;
}

.user-info-list {
  font-size: 14px;
  color: #999;
  line-height: 25px;
}

.user-info-list span {
  margin-left: 70px;
}

.mgb20 {
  margin-bottom: 20px;
}

.todo-item {
  font-size: 14px;
}

.todo-item-del {
  text-decoration: line-through;
  color: #999;
}

.schart {
  width: 100%;
  height: 300px;
}
.p{
  margin-top: 0.5cm;
  margin-left: 0.5cm;

}
</style>
