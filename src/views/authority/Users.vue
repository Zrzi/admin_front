<template>
  <div style="width: 80vw; height: 75vh; margin-top: 1vh">
    <div style="display: flex; align-items: center; justify-content: space-between; width: 78vw; margin: auto">
      <h1>用户管理</h1>
      <div style="display: flex; align-items: center; justify-content: right">
        <el-button type="primary" @click="clickAddStudent" v-if="addStudentButton">添加学生</el-button>
        <el-button type="primary" @click="clickAddTeacher" v-if="addTeacherButton">添加教师</el-button>
        <!--      <el-button type="primary" @click="clickChange">切换学生/教师</el-button>-->
        <el-switch v-model="showStudent" inline-prompt active-text="学生" inactive-text="教师" size="large"
                   @change="handleChange"
                   style="margin-left: 1vw" />
      </div>
    </div>
    <el-divider />
    <div style="display: flex; align-items: center; justify-content: space-between">
      <el-form-item style="width: 20vw">
        <el-input v-model="searchKeyInput" placeholder="请输入用户名或姓名" autocomplete="off" />
      </el-form-item>
      <div>
        <el-button type="primary" @click="search" :disabled="searchKeyInput === ''">搜索</el-button>
        <el-button plain @click="reset" :disabled="searchKey === ''">重置</el-button>
      </div>
    </div>
    <div>
      <el-table :data="this.students" style="width: 100%" height="280" table-layout="auto" v-show="showStudent">
        <el-table-column prop="stuNo" label="学号" header-align="center" align="center" />
        <el-table-column prop="stuName" label="姓名" header-align="center" align="center" />
        <el-table-column prop="sex" label="性别" header-align="center" align="center" />
        <el-table-column prop="majorNo" label="专业号" header-align="center" align="center" />
        <el-table-column prop="classNo" label="班号" header-align="center" align="center" />
        <el-table-column prop="curGrade" label="当前所在级" header-align="center" align="center" />
        <el-table-column prop="enterYear" label="入学年份" header-align="center" align="center" />
        <el-table-column prop="birthday" label="出生日期" header-align="center" align="center" />
        <el-table-column prop="id" label="身份证件号" header-align="center" align="center" />
        <el-table-column prop="status" label="在校状态" header-align="center" align="center" />
        <el-table-column prop="nation" label="民族" header-align="center" align="center" />
        <el-table-column prop="politicalStatus" label="政治面貌" header-align="center" align="center" />
        <el-table-column prop="sourcePlace" label="生源所在地" header-align="center" align="center" />
        <el-table-column label="操作" fixed="right" header-align="center" align="center">
          <template #default="scope">
            <span style="color: #409EFF; margin: 1vmin"
                  @click="clickEditStudent(scope.row)"
                  @mouseenter="editMouseEnterStyle"
                  @mouseleave="editMouseLeaveStyle">编辑</span>
            <span style="color: #D9001B; margin: 1vmin"
                  @click="clickRemoveStudent(scope.row)"
                  @mouseenter="editMouseEnterStyle"
                  @mouseleave="editMouseLeaveStyle">
              删除
            </span>
          </template>
        </el-table-column>
      </el-table>
      <el-table :data="this.teachers" style="width: 100%" height="280" table-layout="auto" v-show="showStudent === false">
        <el-table-column prop="empNo" label="教工号" header-align="center" align="center" />
        <el-table-column prop="empName" label="姓名" header-align="center" align="center" />
        <el-table-column prop="sex" label="性别" header-align="center" align="center" />
        <el-table-column prop="birthday" label="出生日期" header-align="center" align="center" />
        <el-table-column prop="phone" label="电话" header-align="center" align="center" />
        <el-table-column prop="idNo" label="身份证件号" header-align="center" align="center" />
        <el-table-column prop="marriage" label="婚姻状况" header-align="center" align="center" />
        <el-table-column prop="orgType" label="编制类别" header-align="center" align="center" />
        <el-table-column prop="staffType" label="教职工类别" header-align="center" align="center" />
        <el-table-column prop="title" label="教师职称" header-align="center" align="center" />
        <el-table-column prop="degree" label="文化程度" header-align="center" align="center" />
        <el-table-column prop="titleLevel" label="职业等级" header-align="center" align="center" />
        <el-table-column prop="teachType" label="教师类别" header-align="center" align="center" />
        <el-table-column prop="school" label="教师所属单位" header-align="center" align="center" />
        <el-table-column prop="enterDate" label="来校日期" header-align="center" align="center" />
        <el-table-column prop="teachDate" label="从教年月" header-align="center" align="center" />
        <el-table-column prop="status" label="当前状态" header-align="center" align="center" />
        <el-table-column prop="rank" label="职级" header-align="center" align="center" />
        <el-table-column prop="tecposition" label="技术职务" header-align="center" align="center" />
        <el-table-column prop="memo" label="备注" :show-overflow-tooltip="true" header-align="center" align="center" />
        <el-table-column prop="schoolId" label="单位编号" header-align="center" align="center" />
        <el-table-column label="操作" fixed="right" header-align="center" align="center">
          <template #default="scope">
            <span style="color: #409EFF; margin: 1vmin"
                  @click="clickEditTeacher(scope.row)"
                  @mouseenter="editMouseEnterStyle"
                  @mouseleave="editMouseLeaveStyle">编辑</span>
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
          layout="prev, pager, next"
          :total="this.total"
          :current-page="this.currentPage"
          @update:current-page="handleCurrentChange"
          @update:page-size="handleUpdatePageSize"
      />
    </div>
    <AddStudentDialog
        v-model="addStudentFormVisible"
        @close-add-student="this.addStudentFormVisible = false"
        @add-student-success="this.getData"
    >
    </AddStudentDialog>
    <AddTeacherDialog
        v-model="addTeacherFormVisible"
        @close-add-teacher="this.addTeacherFormVisible = false"
        @add_teacher_success="this.getData"
    >
    </AddTeacherDialog>
    <EditStudentDialog
        v-model="editStudentFormVisible"
        @close-edit-student="this.editStudentFormVisible = false; this.$store.commit('RESET_USER_NO')"
        @edit-student-success="this.getData"
    >
    </EditStudentDialog>
    <EditTeacherDialog
        v-model="editTeacherFormVisible"
        @close-edit-teacher="this.editTeacherFormVisible = false; this.$store.commit('RESET_USER_NO')"
        @edit-teacher-success="this.getData"
    >
    </EditTeacherDialog>
  </div>
</template>

<script>
import {ElMessage} from "element-plus";
import AddStudentDialog from "@/components/dialog/authority/AddStudentDialog";
import AddTeacherDialog from "@/components/dialog/authority/AddTeacherDialog";
import EditStudentDialog from "@/components/dialog/authority/EditStudentDialog";
import EditTeacherDialog from "@/components/dialog/authority/EditTeacherDialog";
import checkAuthority from "@/utils/checkAuthority";

export default {
  name: "Users",
  components: {EditTeacherDialog, EditStudentDialog, AddStudentDialog, AddTeacherDialog},
  data() {
    return {
      showStudent: true,
      searchKey: '',
      searchKeyInput: '',
      pageSize: 10,
      currentPage: 1,
      total: 0,
      students: [],
      teachers: [],
      addStudentFormVisible: false,
      addTeacherFormVisible: false,
      editStudentFormVisible: false,
      editTeacherFormVisible: false,
      addStudentButton: false,
      addTeacherButton: false
    }
  },
  methods: {
    checkAddStudentButtonAuthority() {
      checkAuthority('Re3416db616fe42908a358f7c674e3f60').then(res => {
        const result = res.data;
        this.addStudentButton = result.data;
      }).catch(message => {
        this.addStudentButton = false;
      });
    },
    checkAddTeacherButtonAuthority() {
      checkAuthority('Rb1735029edfc486d8d92ae3a450e8444').then(res => {
        const result = res.data;
        this.addTeacherButton = result.data;
      }).catch(message => {
        this.addTeacherButton = false;
      });
    },
    init() {
      this.getData();
    },
    getData() {
      let _this = this;
      let userType = this.showStudent ? '学生' : '教师';
      let start = (this.currentPage - 1) * this.pageSize;
      let pageSize = this.pageSize;
      let searchKey = this.searchKey;
      _this.$httpAuthority.get('/user/get', {params: {userType, start, pageSize, searchKey}}).then(res => {
        const result = res.data;
        if (_this.showStudent) {
          _this.students = result.data.students;
        } else {
          _this.teachers = result.data.teachers;
        }
        _this.total = result.data.total;
      }).catch(message => {
        _this.students = [];
        _this.teachers = [];
        _this.total = 0;
      });
    },
    editMouseEnterStyle() {
      document.querySelector('body').style.cursor = 'pointer';
    },
    editMouseLeaveStyle() {
      document.querySelector('body').style.cursor = 'default';
    },
    // clickChange() {
    //   this.showStudent = !this.showStudent;
    //   this.currentPage = 1;
    //   this.changeList();
    // },
    changeList() {
      this.getData();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.changeList();
    },
    handleUpdatePageSize(val) {},
    handleChange(val) {
      this.currentPage = 1;
      this.getData();
    },
    clickAddStudent() {
      this.addStudentFormVisible = true;
    },
    clickAddTeacher() {
      this.addTeacherFormVisible = true;
    },
    clickEditStudent(row) {
      let userNoSelected = row.stuNo;
      this.$store.commit('SET_USER_NO', userNoSelected);
      this.editStudentFormVisible = true;
    },
    clickEditTeacher(row) {
      let userNoSelected = row.empNo;
      this.$store.commit('SET_USER_NO', userNoSelected);
      this.editTeacherFormVisible = true;
    },
    clickRemoveStudent(row) {
      let stuNo = row.stuNo;
      let _this = this;
      let deleteUserForm = {
        userNo: stuNo
      };
      _this.$httpAuthority.post("/user/delete", deleteUserForm).then(res => {
        ElMessage({
          message: '删除成功',
          duration: 3 * 1000,
          center: true,
          type: 'success'
        });
        if (_this.students.length === 1) {
          _this.currentPage = _this.currentPage === 1 ? 1 : _this.currentPage - 1;
        }
        _this.changeList();
      }).catch(message => {});
    },
    clickRemoveTeacher(row) {
      let empNo = row.empNo;
      let _this = this;
      let deleteUserForm = {
        userNo: empNo
      };
      _this.$httpAuthority.post("/user/delete", deleteUserForm).then(res => {
        ElMessage({
          message: '删除成功',
          duration: 3 * 1000,
          center: true,
          type: 'success'
        });
        if (_this.teachers.length === 1) {
          _this.currentPage = _this.currentPage === 1 ? 1 : _this.currentPage - 1;
        }
        _this.changeList();
      }).catch(message => {});
    },
    search() {
      this.searchKey = this.searchKeyInput;
      this.searchKeyInput = '';
      this.currentPage = 1;
      this.getData();
    },
    reset() {
      this.searchKey = '';
      this.searchKeyInput = '';
      this.currentPage = 1;
      this.getData();
    }
  },
  created() {
    this.init();
    this.checkAddStudentButtonAuthority();
    this.checkAddTeacherButtonAuthority();
  }
}
</script>

<style scoped>

</style>