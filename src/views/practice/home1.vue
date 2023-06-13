<template xmlns:slot="http://www.w3.org/1999/xhtml">
      <div class="p">
    <el-row :gutter="20">
      <el-col :span="8">
        <el-card shadow="hover" class="mgb20" style="height:252px;">
          <div class="user-info">
            <img src="../assets/img/img.jpg" class="user-avator" alt />
            <div class="user-info-cont">
              <div class="user-info-name">当前身份：学生</div>
              <div>欢迎回来！</div>
            </div>
          </div>

          <div class="user-info-list">
            课设DDL
            <span>第20周</span>
          </div>
        </el-card>
        <el-card shadow="hover" style="height:252px;">
          <div  class="clearfix">
            <span>各项进展</span>
          </div>实习进度
          <el-progress :percentage="71.3" color="#42b983"></el-progress>项目实训进度
          <el-progress :percentage="24.1" color="#f1e05a"></el-progress>校外实践审核进度
          <el-progress :percentage="13.7"></el-progress>实践活动进度
          <el-progress :percentage="5.9" color="#f56c6c"></el-progress>
        </el-card>
      </el-col>
      <el-col :span="16">
        <el-row :gutter="20" class="mgb20">
          <el-col :span="8">
            <el-card shadow="hover" :body-style="{padding: '0px'}">
              <div class="grid-content grid-con-1">
                <i class="el-icon-user-solid grid-con-icon"></i>
                <div class="grid-cont-right">
                  <div class="grid-num">{{student}}</div>
                  <div>队友数量</div>
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="8">
            <el-card shadow="hover" :body-style="{padding: '0px'}">
              <div class="grid-content grid-con-2">
                <i class="el-icon-s-management grid-con-icon"></i>
                <div class="grid-cont-right">
                  <div class="grid-num">{{course}}</div>
                  <div>课题数量</div>
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="8">
            <el-card shadow="hover" :body-style="{padding: '0px'}">
              <div class="grid-content grid-con-3">
                <i class="el-icon-s-promotion grid-con-icon"></i>
                <div class="grid-cont-right">
                  <div class="grid-num">{{project}}</div>
                  <div>项目数量</div>
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="8">
            <el-card  style="margin-top: 20px" shadow="hover" :body-style="{padding: '0px'}">
              <div class="grid-content grid-con-4">
                <i class="el-icon-trophy grid-con-icon"></i>
                <div class="grid-cont-right">
                  <div class="grid-num">{{honer}}</div>
                  <div>荣誉数量</div>
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="8">
            <el-card
                style="margin-top: 20px"
                shadow="hover" :body-style="{padding: '0px'}">
              <div class="grid-content grid-con-5"
              >
                <i class="el-icon-baseball grid-con-icon"></i>
                <div class="grid-cont-right">
                  <div class="grid-num">{{activity}}</div>
                  <div>实习活动数量</div>
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="8">
            <el-card
                style="margin-top: 20px"
                shadow="hover" :body-style="{padding: '0px'}">
              <div class="grid-content grid-con-6"
              >
                <i class="el-icon-baseball grid-con-icon"></i>
                <div class="grid-cont-right">
                  <div class="grid-num">{{log}}</div>
                  <div>其他信息</div>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
                <el-card shadow="hover" style="height:403px;">
                    <div slot:header class="clearfix">
                        <span>我的待办事项</span>
                    </div>
                    <el-table :show-header="false" :data="todoList" style="width:100%;">
                        <el-table-column width="40">
                            <template v-slot="scope">
                                <el-checkbox v-model="scope.row.status"></el-checkbox>
                            </template>
                        </el-table-column>
                        <el-table-column>
                            <template v-slot="scope">
                                <div
                                    class="todo-item"
                                    :class="{'todo-item-del': scope.row.status}"
                                >{{scope.row.title}}
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column width="60">
                            <template>
                                <i class="el-icon-edit"></i>
                                <i class="el-icon-delete"></i>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>

import router from "/src/router/index.js";
import { downloadPost } from "/src/service/genServ.js";

import { getCurrentInstance } from "vue";
// import Tags from "../components/Tags";
import emitter from "./mitt";
// import home1 from "./home1";
import bus from "vue3-eventbus";
import {store} from "../store/createStore";

export default {
  name: "Home",
  data() {
    return {

            todoList:[
                {
                    title: '实习组队通知',
                    status: true
                },
                {
                    title: '实习报告提交通知',
                    status: true
                },
                                {
                    title: '实训组队通知',
                    status: true
                },
                {
                    title: '成绩查看通知',
                    status: true
                },                
                {
                    title: '校外实践审核进度通知',
                    status: true
                },           

            ],

      course:"",
      student:"",
      project:"",
      honer:"",
      activity:"",
      log:"",
      collapse: false,
      
    };
  },
setup(){
  const student1 = getCurrentInstance()?.appContext.config.globalProperties.$student1
  console.log(student1)
  bus.on('student1', test => {
    // this.student1 = test;
    console.log(`传来的数据是：${test}`)
  });
  bus.emit('student1',student1)
  const student=store.state.studentNum
  console.log(student)
},
  created() {
    this.student=store.state.studentNum1
    this.project=store.state.projectNum1
    this.honer=store.state.honerNum1
    this.activity=store.state.activityNum1
    this.log=store.state.dailyNum1
    this.course=store.state.courseNum1
    console.log(this.student)
    bus.on('collapse', msg => {
      this.collapse = msg;
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
    logout() {
      this.$store.commit("logout");
      router.push("/login");
    },
    downPDF() {
      downloadPost(
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
.score {
  width: 100px;
  height: 50px;
}
</style>