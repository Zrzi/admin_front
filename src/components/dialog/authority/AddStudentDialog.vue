<template>
  <el-dialog v-model="addStudentFormVisible" title="添加学生" label-position="top" @close="cancelAddStudent">
    <el-form :model="addStudentForm" :rules="addStudentFormRules" ref="addStudentForm">
      <el-form-item label="学号" prop="stuNo" :label-width="formLabelWidth">
        <el-input v-model="addStudentForm.stuNo" autocomplete="off" />
      </el-form-item>
      <el-form-item label="学生姓名" prop="stuName" :label-width="formLabelWidth">
        <el-input v-model="addStudentForm.stuName" autocomplete="off" />
      </el-form-item>
      <el-form-item label="性别" prop="sex" :label-width="formLabelWidth">
        <el-input v-model="addStudentForm.sex" autocomplete="off" />
      </el-form-item>
      <el-form-item label="专业号" prop="majorNo" :label-width="formLabelWidth">
        <el-input v-model="addStudentForm.majorNo" autocomplete="off" />
      </el-form-item>
      <el-form-item label="班号" prop="classNo" :label-width="formLabelWidth">
        <el-input v-model="addStudentForm.classNo" autocomplete="off" />
      </el-form-item>
      <el-form-item label="所在级" prop="curGrade" :label-width="formLabelWidth">
        <el-input v-model="addStudentForm.curGrade.number" autocomplete="off" />
      </el-form-item>
      <el-form-item label="入学年份" prop="enterYear" :label-width="formLabelWidth">
        <el-input v-model="addStudentForm.enterYear.number" autocomplete="off" />
      </el-form-item>
      <el-form-item label="出生日期" prop="birthday" :label-width="formLabelWidth">
        <el-date-picker v-model="addStudentForm.birthday" type="date" placeholder="选择出生日期"
                        value-format="YYYY-MM-DD" />
      </el-form-item>
      <el-form-item label="身份证" prop="ID" :label-width="formLabelWidth">
        <el-input v-model="addStudentForm.ID" autocomplete="off" />
      </el-form-item>
      <el-form-item label="在校状态" prop="status" :label-width="formLabelWidth">
        <el-input v-model="addStudentForm.status" autocomplete="off" />
      </el-form-item>
      <el-form-item label="民族" prop="nation" :label-width="formLabelWidth">
        <el-input v-model="addStudentForm.nation" autocomplete="off" />
      </el-form-item>
      <el-form-item label="政治面貌" prop="politicalStatus" :label-width="formLabelWidth">
        <el-input v-model="addStudentForm.politicalStatus" autocomplete="off" />
      </el-form-item>
      <el-form-item label="生源所在地" prop="sourcePlace" :label-width="formLabelWidth">
        <el-input v-model="addStudentForm.sourcePlace" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
        <span class="dialog-footer">
          <el-button @click="cancelAddStudent">取消</el-button>
          <el-button type="primary" @click="addStudent">确认</el-button>
        </span>
    </template>
  </el-dialog>
</template>

<script>
import {ElMessage} from "element-plus";

export default {
  name: "AddUserDialog",
  data() {
    return {
      formLabelWidth: '140px',
      addStudentFormVisible: false,
      addStudentForm: {
        stuNo: '',
        stuName: '',
        sex: '',
        majorNo: '',
        classNo: '',
        curGrade: '',
        enterYear: '',
        birthday: '',
        ID: '',
        status: '',
        nation: '',
        politicalStatus: '',
        sourcePlace: ''
      },
      addStudentFormRules: {
        stuNo: [
          {required: true, message: '请输入学生学号', trigger: 'blur'},
          {max: 20, message: '学号长度不超过20个字符', trigger: 'blur'}
        ],
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
        ID: [
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
    // dateDisables(time) {
    //   return time.getTime() > Date.now();
    // },
    clearAddStudentForm() {
      this.refs['addStudentForm'].resetFields();
    },
    cancelAddStudent() {
      this.clearAddStudentForm();
      this.addStudentFormVisible = false;
      this.$emit('close-add-student');
    },
    addStudent() {
      let _this = this;
      let addUserForm = {
        isStudent: true,
        student: this.addStudentForm
      };
      _this.refs['addStudentForm'].validate((valid) => {
        if (valid) {
          _this.$httpAuthority.post('/user/post', addUserForm).then(res => {
            ElMessage({
              message: '添加成功',
              duration: 3 * 1000,
              center: true,
              type: 'success'
            });
            _this.$emit('add-student-success');
            _this.cancelAddStudent();
          }).catch(message => {
            _this.clearAddStudentForm();
          });
        } else {
          ElMessage({
            message: '输入错误',
            duration: 3 * 1000,
            center: true,
            type: 'error'
          });
          _this.clearAddStudentForm();
        }
      });
    }
  }
}
</script>

<style scoped>

</style>