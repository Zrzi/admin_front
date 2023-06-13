<template xmlns:slot="http://www.w3.org/1999/xhtml">
  <div class="p">
<el-row :gutter="20">
  <el-col :span="8">
    <el-card shadow="hover" class="mgb20" style="height:252px;">
      <div class="user-info">
        <img src="../assets/img/img.jpg" class="user-avator" alt />
        <div class="user-info-cont">
          <div class="user-info-name">全体实习任务</div>
          <div>发布者：教务</div>
        </div>
      </div>

      <div class="user-info-list">
        IP：济南
        <span>注册时间：2021-01-01</span>
      </div>
    </el-card>
    <el-card shadow="hover" style="height:250px;">
                    <div slot:header class="clearfix">
                        <span>实习方向</span>
                    </div>
                    <el-table :show-header="false" :data="conList" style="width:100%;">
                        <el-table-column width="20">
                            <template v-slot="scope">
                                <el-checkbox v-model="scope.row.status"></el-checkbox>
                            </template>
                        </el-table-column>
                        <el-table-column>
                            <template v-slot="scope">
                                <div
                                    class="todo-item"
                                    
                                >{{scope.row.title}}
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column width="30">
                            <template>
                                <i class="el-icon-edit"></i>
                                <i class="el-icon-delete"></i>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-card>
                <el-card shadow="hover" class="mgb20" style="height:20px;">
            </el-card>
    <el-card shadow="hover" :body-style="{padding: '0px'}">
              <div class="grid-content grid-con-2">
                <i class="el-icon-s-management grid-con-icon"></i>
                <div class="grid-cont-right">
                  <div class="grid-num">2</div>
                  <div>任务数量</div>
                </div>
              </div>
            </el-card>
            <el-card shadow="hover" class="mgb20" style="height:20px;">
            </el-card>
         
            <el-card shadow="hover" :body-style="{padding: '0px'}">
              <div class="grid-content grid-con-3">
                <i class="el-icon-s-promotion grid-con-icon"></i>
                <div class="grid-cont-right">
                  <div class="grid-num">1</div>
                  <div>进行中</div>
                </div>
              </div>
            </el-card>
          
  </el-col>
  <el-col :span="16">
   
            <el-card shadow="hover" style="height:303px;">
                <div slot:header class="clearfix">
                    <span class="user-info-name">实习任务（一）</span>
                </div>
                <div class="user-info-list">
        IP：济南
        <span>编辑时间：2023-03-01</span>
      </div>
                <el-table :show-header="false" :data="blogList" style="width:100%;">
                    <el-table-column width="40">
                        </el-table-column>
                    <el-table-column>
                        <template v-slot="scope">
                            <div
                                class="todo-item"
                               
                            >{{scope.row.title}}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column width="60">
                        <template>
                            <i class="el-icon-edit"></i>
                        </template>
                    </el-table-column>
                </el-table>
            </el-card>
            <el-card shadow="hover" class="mgb20" style="height:20px;">
                      <el-button type="primary" size="mini"  @click="queryTable()" round
                      ><i class="el-icon-search"></i>编辑任务</el-button
                      >
            </el-card>
        
  
    
            <el-card shadow="hover" style="height:393px;">
                <div slot:header class="clearfix">
                    <span>实习任务（二）</span>
                </div>
                <div class="user-info-list">
        IP：济南
        <span>编辑时间：2021-03-01</span>
      </div>
                <el-table :show-header="false" :data="todoList" style="width:100%;">
                    <el-table-column width="40">
                        </el-table-column>
                    <el-table-column>
                        <template v-slot="scope">
                            <div
                                class="todo-item"
                               
                            >{{scope.row.title}}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column width="60">
                        <template>
                            <i class="el-icon-edit"></i>
                        </template>
                    </el-table-column>
                </el-table>
            </el-card>
            <el-card shadow="hover" class="mgb20" style="height:50px;">
           
                      <el-button type="primary" size="mini" @click="addItem()" round
                      ><i class="el-icon-plus"></i>添加任务</el-button
                      >
                      <el-button type="primary" size="mini"  @click="queryTable()" round
                      ><i class="el-icon-search"></i>编辑任务</el-button
                      >
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
                title: '山大地纬认知实习：',
                status: true
            },
            {
                title: '1.参观山大地纬的办公场所',
                status: true
            },
            {
                title: '2.了解企业精神。',
                status: true
            },
            {
                title: '3.提交书面报告。',
                status: true
            },      
            {
                title: ' ',
                status: true
            },          
            {
                title: 'HTML：HyperText Markup Language(超文本标记语言)的简写',
                status: true
            },
            {
                title: '能够在文本内插入图片、音频、超链接、甚至音乐、程序等非文字元素。',
                status: true
            },

        ],
        blogList:[
            {
                title: '前端三大底层语言: html 、css 、 js(javascript)',
                status: true
            },
            {
                title: '框架语言： Jquery 、Vue(react angular Js) 、node',
                status: true
            },
            {
                title: 'border 属性是表格边框',
                status: true
            },
            {
                title: 'cellspacing是边框间距，是指单元格与单元格之间的间距。',
                status: true
            },      
            

        ],
        conList:[
            {
                title: 'html',
                status: true
            },
            {
                title: 'vue',
                status: true
            },
            {
                title: 'java',
                status: true
            },
            {
                title: '其它',
                status: true
            },      
            

        ],


  collapse: false,
};
},

setup(){

const student1 = getCurrentInstance()?.appContext.config.globalProperties.$student1
console.log(student1)
bus.on('student1', test => {
this.student1 = test;
console.log(`传来的数据是：${test}`)
});
bus.emit('student1',this.student1)
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

// bus.on('course', msg => {
//   this.course = msg;
// });
// bus.on('project', msg => {
//   this.project = msg;
//
// });
// bus.on('honer', msg => {
//   this.honer = msg;
//
// });
// bus.on('activity', msg => {
//   this.activity = msg;
//
// });
// bus.on('log', msg => {
//   this.log = msg;
// });



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
.user-info-edit {
font-size: 14px;
color: rgb(14, 1, 1);
line-height: 40px;
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