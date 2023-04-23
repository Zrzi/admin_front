<template>
  <div class="aboutus" v-if="showHtml == false">
    <div class="title">
      <el-divider content-position="center">教师简介</el-divider>
      <p>
        <el-tag>{{ 教师 }}</el-tag>
      </p>
    </div>
    <el-card class="box-card" style="margin-bottom: 20px">
      <div class="text item">
        <div>
          <iframe src="C:/Users/31691/Documents/Tencent Files/316912162/FileRecv/学生主页个人简历/introduction.html" ref="iframe" width="1000" height="2000" scrolling="no"></iframe>
        </div>
        <el-row :gutter="110" v-for="(item, i) in attachList" :key="i">
          <el-col :span="88">
            <span class="large">{{ item.title }}</span>
            <div class="grid-content bg-purple" v-html="item.content"></div>
          </el-col>
        </el-row>
      </div>
      <div class="topMask square"></div>
      <div class="topMask circular"></div>
    </el-card>
    <el-button size="primary" class="deleteButton" @click="downPDF()"
      >下载</el-button
    >
  </div>
  <div v-if="showHtml == true">
    <div v-html="vhtml" />
    <el-button size="primary" class="deleteButton" @click="downPDF()"
      >下载</el-button
    >
  </div>
</template>

<script>

import { getTeacherIntroduceData } from "@/service/genServ.js";
import { downloadPost } from "@/service/genServ.js";
export default {
  name: "Home",

  created() {
    this.objectPush = this.$route.query;
    getTeacherIntroduceData({ ...this.objectPush }).then((res) => {
      this.myName = res.data.data.myName;
      this.overview = res.data.data.overview;
      this.attachList = res.data.data.attachList;
      this.vhtml = res.data.data.html;

      if (this.vhtml != "" && this.vhtml != undefined) {
        this.showHtml = true;
      } else {
        this.showHtml = false;
      }
    });
  },
  data() {
    return {
      showHtml: false,
      objectPush: "",
      myName: "",
      overview: "",
      attachList: "",
      vhtml: "",
    };
  },
  methods: {
    downPDF() {
      downloadPost(
        "http://localhost:9090/api/teach/getTeacherIntroducePdf",
        "教师简历",
        { ...this.objectPush }
      );
    },
  },
};
</script>
<style scoped>
.aboutus {
  font-size: 14px;
  text-align: left;
  padding: 0px 100px;
}
.intro {
  width: 200px;
  border: 1px solid #ddd;
  border-radius: 5px;
}
.text {
  font-size: 14px;
  text-align: left;
  line-height: 30px;
  text-indent: 2em;
}
.box-card {
  position: relative;
}
.item {
  display: inline-block;
  margin: 30px 50px;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
.clearfix span {
  color: #fff;
  font-weight: bold;
}
.title p {
  color: #8c8888;
  font-size: 15px;
  margin-bottom: 80px;
  text-align: center;
}
.large {
  margin-right: 50px;
  font-size: 16px;
  color: #409eff;
  font-weight: bold;
}
.topMask {
  width: 100px;
  height: 100px;
  background-color: rgba(68, 138, 255, 0.2);
  transform: rotate(45deg);
  position: absolute;
}
.square {
  border-radius: 5px;
  top: 0px;
}
.circular {
  border-radius: 50%;
  top: 80px;
  left: 80%;
  background-color: rgba(255, 208, 75, 0.2);
}
</style>