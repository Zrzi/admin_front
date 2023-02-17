<template>
  <div style="width: 80vw; height: 75vh; margin-top: 1vh">
    <div style="display: flex; align-items: center; justify-content: right">
      <el-button type="primary" @click="clickAddStudent">添加学生</el-button>
      <el-button type="primary" @click="clickAddTeacher">添加教师</el-button>
      <el-button type="primary" @click="clickChange">切换学生/教师</el-button>
    </div>
    <el-divider />
    <div style="display: flex; align-items: center; justify-content: space-between">
      <el-form-item prop="searchKey" style="width: 20vw">
        <el-input v-model="searchKey" placeholder="请输入用户名或姓名" autocomplete="off" />
      </el-form-item>
      <div>
        <el-button type="primary">搜索</el-button>
        <el-button plain>重置</el-button>
      </div>
    </div>
    <div>
      <el-table :data="this.studentsShow" style="width: 100%" height="280" table-layout="auto" v-if="showStudent">
        <el-table-column prop="stuNo" label="学号" />
        <el-table-column prop="stuName" label="姓名" />
        <el-table-column prop="sex" label="性别" />
        <el-table-column prop="majorNo" label="专业号" />
        <el-table-column prop="classNo" label="班号" />
        <el-table-column prop="curGrade" label="当前所在级" />
        <el-table-column prop="entryYear" label="入学年份" />
        <el-table-column prop="birthday" label="出生日期" />
        <el-table-column prop="ID" label="身份证件号" />
        <el-table-column prop="status" label="在校状态" />
        <el-table-column prop="nation" label="民族" />
        <el-table-column prop="politicalStatus" label="政治面貌" />
        <el-table-column prop="sourcePlace" label="生源所在地" />
        <el-table-column label="操作" fixed="right">
          <template #default="scope">
            <span style="color: #D9001B; margin: 1vmin"
                  @click="clickRemoveStudent(scope.row)"
                  @mouseenter="editMouseEnterStyle"
                  @mouseleave="editMouseLeaveStyle">
              删除
            </span>
          </template>
        </el-table-column>
      </el-table>
      <el-table :data="this.teachersShow" style="width: 100%" height="280" table-layout="auto" v-if="showStudent === false">
        <el-table-column prop="empNo" label="教工号" />
        <el-table-column prop="empName" label="姓名" />
        <el-table-column prop="sex" label="性别" />
        <el-table-column prop="birthday" label="出生日期" />
        <el-table-column prop="phone" label="电话" />
        <el-table-column prop="IDNo" label="身份证件号" />
        <el-table-column prop="marriage" label="婚姻状况" />
        <el-table-column prop="orgType" label="编制类别" />
        <el-table-column prop="staffType" label="教职工类别" />
        <el-table-column prop="title" label="教师职称" />
        <el-table-column prop="degree" label="文化程度" />
        <el-table-column prop="titleLevel" label="职业等级" />
        <el-table-column prop="teachType" label="教师类别" />
        <el-table-column prop="school" label="教师所属单位" />
        <el-table-column prop="enterDate" label="来校日期" />
        <el-table-column prop="teachDate" label="从教年月" />
        <el-table-column prop="status" label="当前状态" />
        <el-table-column prop="rank" label="职级" />
        <el-table-column prop="tecposition" label="技术职务" />
        <el-table-column prop="memo" label="备注" show-overflow-tooltip="true" />
        <el-table-column prop="schoolId" label="单位编号" />
        <el-table-column label="操作" fixed="right">
          <template #default="scope">
            <span style="color: #D9001B; margin: 1vmin"
                  @click="clickRemoveTeacher(scope.row)"
                  @mouseenter="editMouseEnterStyle"
                  @mouseleave="editMouseLeaveStyle">
              删除
            </span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div style="display: flex; align-items: center; justify-content: center">
      <el-pagination
          :page-size="this.pageSize"
          :pager-count="this.pageCount"
          layout="prev, pager, next"
          :total="this.total"
          :current-page="this.currentPage"
          @current-change="handleCurrentChange"
      />
    </div>
    <AddStudentDialog v-model="addStudentFormVisible" @close-add-student="this.addStudentFormVisible = false"></AddStudentDialog>
    <AddTeacherDialog v-model="addTeacherFormVisible" @close-add-teacher="this.addTeacherFormVisible = false"></AddTeacherDialog>
  </div>
</template>

<script>
import {ElMessage} from "element-plus";
import AddStudentDialog from "@/components/dialog/authority/AddStudentDialog";
import AddTeacherDialog from "@/components/dialog/authority/AddTeacherDialog";

export default {
  name: "Users",
  components: {AddStudentDialog, AddTeacherDialog},
  data() {
    return {
      showStudent: true,
      searchKey: '',
      pageSize: 10,
      pageCount: 11,
      currentPage: 1,
      total: 0,
      students: [],
      studentsShow: [],
      teachers: [],
      teachersShow: [],
      addStudentFormVisible: false,
      addTeacherFormVisible: false
    }
  },
  methods: {
    init() {
      let _this = this;
      _this.$httpAuthority.get("/user/get").then(res => {
        const result = res.data;
        _this.students = result.data.students;
        _this.teachers = result.data.teachers;
        _this.total = this.students.length;
        _this.studentsShow = this.students.slice(0, this.pageSize);
        _this.teachersShow = this.teachers.slice(0, this.pageSize);
      });
    },
    editMouseEnterStyle() {
      document.querySelector('body').style.cursor = 'pointer';
    },
    editMouseLeaveStyle() {
      document.querySelector('body').style.cursor = 'default';
    },
    clickChange() {
      if (this.showStudent) {
        this.total = this.teachers.length;
        this.currentPage = 1;
        this.showStudent = false;
      } else {
        this.total = this.students.length;
        this.currentPage = 1;
        this.showStudent = true;
      }
      this.changeList();
    },
    changeList() {
      let start = (this.currentPage - 1) * this.pageSize;
      let end = (this.currentPage) * this.pageSize;
      if (this.showStudent) {
        this.studentsShow = this.students.slice(start, end);
      } else {
        this.teachersShow = this.teachers.slice(start, end);
      }
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.changeList();
    },
    clickAddStudent() {
      this.addStudentFormVisible = true;
    },
    clickAddTeacher() {
      this.addTeacherFormVisible = true;
    },
    clickRemoveStudent(row) {
      let stuNo = row.stuNo;
      let _this = this;
      _this.$httpAuthority.post("/user/delete", stuNo).then(res => {
        _this.students = this.students.filter(student => {
          return student.stuNo !== stuNo;
        });
        _this.changeList();
        ElMessage({
          message: '删除成功',
          duration: 3 * 1000,
          center: true,
          type: 'success'
        });
      });
    },
    clickRemoveTeacher(row) {
      let empNo = row.empNo;
      let _this = this;
      _this.$httpAuthority.post("/user/delete", empNo).then(res => {
        _this.teachers = this.teachers.filter(teacher => {
          return teacher.empNo !== empNo;
        });
        this.changeList();
        ElMessage({
          message: '删除成功',
          duration: 3 * 1000,
          center: true,
          type: 'success'
        });
      });
    }
  },
  created() {
    this.init();
  }
}
</script>

<style scoped>

</style>