<template>
  <div>
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>学生互评</span>
          <el-button class="button" text @click="userCommentMark=true" :disabled="addCommentBtn">
            <span class="comment_num">{{ commentNum }}</span>
            开始互评
          </el-button>
        </div>
      </template>
      <div v-for="item in comments" :key="item.id" class="text item">
        <el-descriptions title="评论信息" :border="true">
          <el-descriptions-item label="学生信息">{{ item.commenter.studentName }}</el-descriptions-item>
          <el-descriptions-item label="评论时间">{{ item.createTime }}</el-descriptions-item>
          <el-descriptions-item label="标签">
            <el-tag style="margin-left: 10px" size="small" v-for="tag in item.tags.split(',')" :key="tag">{{
                tag
              }}
            </el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="评论内容">
            {{ item.content }}
          </el-descriptions-item>
        </el-descriptions>
      </div>
    </el-card>
    <el-dialog v-model="userCommentMark" title="学生互评" @open="commentDialogOpen"
               ref="commentFromRef">
      <el-form :model="commentFrom" label-position="left">
        <el-form-item label="学生学号">
          <el-input disabled v-model="commentFrom.studentNum"/>
        </el-form-item>
        <el-form-item label="学生姓名">
          <el-input disabled v-model="commentFrom.studentName"/>
        </el-form-item>

        <el-form-item label="标签">
          <el-checkbox-group v-model="commentFrom.tags">
            <el-checkbox label="学霸" name="type"/>
            <el-checkbox label="土豪" name="type"/>
            <el-checkbox label="运动健将" name="type"/>
            <el-checkbox label="游戏狂" name="type"/>
            <el-checkbox label="数码迷" name="type"/>
            <el-checkbox label="美食家" name="type"/>
            <el-checkbox label="文青" name="type"/>
            <el-checkbox label="海王" name="type"/>
            <el-checkbox label="歌姬" name="type"/>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="标签">
          <el-input
              v-model="commentFrom.content"
              :rows="5"
              type="textarea"
              placeholder="评论内容"/>
        </el-form-item>
      </el-form>
      <template #footer>
      <span class="dialog-footer">
        <el-button @click="userCommentMark = false">取消</el-button>
        <el-button type="primary" @click="submitComment">
          提交
        </el-button>
      </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";
import {ElMessage} from 'element-plus'

export default {
  name: "Comment",
  created() {
    this.loadCommentNumber()
    this.loadComments()
  },
  data() {
    return {
      labelPosition: 'right',
      curStudentId: 0,
      commentNum: 0,
      userCommentMark: false,
      addCommentBtn: false,
      commentFrom: {
        studentId: 0,
        studentNum: 0,
        studentName: "",
        tags: [],
        content: ""
      },
      comments: []
    }
  },
  methods: {
    async loadCommentNumber() {
      const user_str = sessionStorage.getItem("user")
      if (!user_str) return ElMessage({
        message: '没有登录',
        type: 'error',
      })
      const user = JSON.parse(user_str);
      this.curStudentId = user.refId
      const {data: res} = await axios.get(`http://localhost:9090/student/comments/${user.refId}/count`)
      if (!res.success) return ElMessage({
        message: '请求后端出错',
        type: 'error',
      })
      this.commentNum = res.result
      if (this.commentNum <= 0) {
        this.addCommentBtn = true
      }
    },
    async commentDialogOpen() {
      //随机选一个学生信息
      const {data: res} = await axios.get(`http://localhost:9090/student/comments/${this.curStudentId}/random-choose-student`)
      if (!res.success) return ElMessage({
        message: '请求后端出错',
        type: 'error',
      })
      if (!res.result) return ElMessage({
        message: '已经没有学生需要评价了',
        type: 'warring',
      })
      this.commentFrom.studentNum = res.result.studentNum;
      this.commentFrom.studentId = res.result.id;
      this.commentFrom.studentName = res.result.studentName;
    },
    async submitComment() {
      if (this.commentFrom.content === '' || this.commentFrom.tags.length===0) {
        return ElMessage({
          message: '请输入必要的参数',
          type: 'error',
        })
      }
      const {data: res} = await axios.post(`http://localhost:9090/student/comments`, {
        commenter: {id: this.curStudentId},
        commented: {id: this.commentFrom.studentId},
        tags: this.commentFrom.tags.join(","),
        content: this.commentFrom.content
      })
      if (!res.success) return ElMessage({
        message: '请求后端出错',
        type: 'error',
      })
      this.commentFrom.studentId = 0
      this.commentFrom.studentName = ''
      this.commentFrom.studentNum = 0
      this.commentFrom.tags = []
      this.commentFrom.content = ''

      this.userCommentMark = false
      await this.loadCommentNumber()
    },
    async loadComments() {
      const {data: res} = await axios.get(`http://localhost:9090/student/comments/${this.curStudentId}`)
      if (!res.success) return ElMessage({
        message: '请求后端出错',
        type: 'error',
      })
      this.comments = res.result
    }
  }
}
</script>

<style scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

/*.box-card {*/
/*  width: 480px;*/
/*}*/
.comment_num {
  color: red;
}
</style>