<template>
  <el-dialog v-model="editStudentFormVisible" title="添加学生" label-position="top" @opened="init" @close="cancelEditStudent">
    <el-form :model="editStudentForm" :rules="editStudentFormRules" ref="editStudentForm">
      <el-form-item label="学生姓名" prop="stuName" :label-width="formLabelWidth">
        <el-input v-model="editStudentForm.stuName" autocomplete="off" />
      </el-form-item>
      <el-form-item label="性别" prop="sex" :label-width="formLabelWidth">
        <el-input v-model="editStudentForm.sex" autocomplete="off" />
      </el-form-item>
      <el-form-item label="专业号" prop="majorNo" :label-width="formLabelWidth">
        <el-input v-model="editStudentForm.majorNo" autocomplete="off" />
      </el-form-item>
      <el-form-item label="班号" prop="classNo" :label-width="formLabelWidth">
        <el-input v-model="editStudentForm.classNo" autocomplete="off" />
      </el-form-item>
      <el-form-item label="所在级" prop="curGrade" :label-width="formLabelWidth">
        <el-input v-model.number="editStudentForm.curGrade" autocomplete="off" />
      </el-form-item>
      <el-form-item label="入学年份" prop="enterYear" :label-width="formLabelWidth">
        <el-input v-model.number="editStudentForm.enterYear" autocomplete="off" />
      </el-form-item>
      <el-form-item label="出生日期" prop="birthday" :label-width="formLabelWidth">
        <el-date-picker v-model="editStudentForm.birthday" type="date" placeholder="选择出生日期"
                        value-format="YYYY-MM-DD" :disabled-date="disabledDate" />
      </el-form-item>
      <el-form-item label="身份证" prop="id" :label-width="formLabelWidth">
        <el-input v-model="editStudentForm.id" autocomplete="off" />
      </el-form-item>
      <el-form-item label="在校状态" prop="status" :label-width="formLabelWidth">
        <el-input v-model="editStudentForm.status" autocomplete="off" />
      </el-form-item>
      <el-form-item label="民族" prop="nation" :label-width="formLabelWidth">
        <el-input v-model="editStudentForm.nation" autocomplete="off" />
      </el-form-item>
      <el-form-item label="政治面貌" prop="politicalStatus" :label-width="formLabelWidth">
        <el-input v-model="editStudentForm.politicalStatus" autocomplete="off" />
      </el-form-item>
      <el-form-item label="生源所在地" prop="sourcePlace" :label-width="formLabelWidth">
        <el-input v-model="editStudentForm.sourcePlace" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
        <span class="dialog-footer">
          <el-button @click="cancelEditStudent">取消</el-button>
          <el-button type="primary" @click="editStudent">确认</el-button>
        </span>
    </template>
  </el-dialog>
</template>

<script>
import {ElMessage} from "element-plus";

export default {
  name: "EditStudentDialog",
  data() {
    const disabledDate = (time) => {
      return time.getTime() > Date.now()
    };
    return {
      disabledDate: disabledDate,
      userNo: '',
      formLabelWidth: '140px',
      editStudentFormVisible: false,
      editStudentForm: {
        stuName: '',
        sex: '',
        majorNo: '',
        classNo: '',
        curGrade: '',
        enterYear: '',
        birthday: '',
        id: '',
        status: '',
        nation: '',
        politicalStatus: '',
        sourcePlace: ''
      },
      editStudentFormRules: {
        stuName: [
          {required: true, message: '请输入学生姓名', trigger: 'blur'},
          {max: 50, message: '学生姓名长度不超过50个字符', trigger: 'blur'}
        ],
        sex: [
          {required: true, message: '请输入学生性别', trigger: 'blur'},
          {max: 5, message: '性别长度不超过5个字符', trigger: 'blur'}
        ],
        majorNo: [
          {required: true, message: '请输入学生专业号', trigger: 'blur'},
          {max: 10, message: '学生专业号长度不超过10个字符', trigger: 'blur'}
        ],
        classNo: [
          {required: true, message: '请输入学生班号', trigger: 'blur'},
          {max: 20, message: '学生班号长度不超过20个字符', trigger: 'blur'}
        ],
        curGrade: [
          {required: true, message: '请输入学生当前所在级', trigger: 'blur'},
          {type: 'number', message: '当前所在级必须是数字', trigger: 'blur'},
        ],
        enterYear: [
          {required: true, message: '请输入学生入学年份', trigger: 'blur'},
          {type: 'number', message: '入学年份必须是数字', trigger: 'blur'},
        ],
        birthday: [
          {required: true, message: '请输入学生出生日期', trigger: 'blur'},
        ],
        id: [
          {max: 20, message: '学生身份证最长20位', trigger: 'blur'}
        ],
        status: [
          {required: true, message: '请输入学生在校状态', trigger: 'blur'},
          {max: 10, message: '在校状态不超过10个字符', trigger: 'blur'}
        ],
        nation: [
          {required: true, message: '请输入学生民族', trigger: 'blur'},
          {max: 10, message: '民族不超过10个字符', trigger: 'blur'}
        ],
        politicalStatus: [
          {required: true, message: '请输入学生政治面貌', trigger: 'blur'},
          {max: 20, message: '政治面貌不超过20个字符', trigger: 'blur'}
        ],
        sourcePlace: [
          {max: 50, message: '生源所在地不超过50个字符', trigger: 'blur'}
        ],
      }
    }
  },
  methods: {
    init() {
      this.userNo = this.$store.state.userNo;
      let userNo = this.userNo;
      let _this = this;
      let userType = '学生';
      _this.$httpAuthority.get('/user/getByUserNo', {params: {userNo, userType}}).then(res => {
        const result = res.data;
        _this.editStudentForm.stuName = result.data.stuName;
        _this.editStudentForm.sex = result.data.sex;
        _this.editStudentForm.majorNo = result.data.majorNo;
        _this.editStudentForm.classNo = result.data.classNo;
        _this.editStudentForm.curGrade = result.data.curGrade;
        _this.editStudentForm.enterYear = result.data.enterYear;
        _this.editStudentForm.birthday = result.data.birthday;
        _this.editStudentForm.id = result.data.id;
        _this.editStudentForm.status = result.data.status;
        _this.editStudentForm.nation = result.data.nation;
        _this.editStudentForm.politicalStatus = result.data.politicalStatus;
        _this.editStudentForm.sourcePlace = result.data.sourcePlace;
        console.log(_this.editStudentForm);
      });
    },
    clearEditStudentForm() {
      this.$refs['editStudentForm'].resetFields();
    },
    cancelEditStudent() {
      this.clearEditStudentForm();
      this.editStudentFormVisible = false;
      this.$emit('close-edit-student');
    },
    editStudent() {
      let _this = this;
      let editUserForm = {
        isStudent: true,
        userNo: _this.userNo,
        student: this.editStudentForm
      };
      _this.$refs['editStudentForm'].validate((valid) => {
        if (valid) {
          console.log(editUserForm);
          _this.$httpAuthority.post('/user/update', editUserForm).then(res => {
            ElMessage({
              message: '编辑成功',
              duration: 3 * 1000,
              center: true,
              type: 'success'
            });
            _this.$emit('edit-student-success');
            _this.cancelEditStudent();
          }).catch(message => {
            _this.clearEditStudentForm();
          });
        } else {
          ElMessage({
            message: '输入错误',
            duration: 3 * 1000,
            center: true,
            type: 'error'
          });
          _this.clearEditStudentForm();
        }
      });
    }
  }
}
</script>

<style scoped>

</style>