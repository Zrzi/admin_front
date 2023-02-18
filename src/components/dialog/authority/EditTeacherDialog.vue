<template>
  <el-dialog v-model="editTeacherFormVisible" title="编辑教工" label-position="top" @opened="init" @close="cancelEditTeacher">
    <el-form :model="editTeacherForm" :rules="editTeacherFormRules" ref="editTeacherForm">
      <el-form-item label="姓名" prop="empName" :label-width="formLabelWidth">
        <el-input v-model="editTeacherForm.empName" autocomplete="off" />
      </el-form-item>
      <el-form-item label="性别" prop="sex" :label-width="formLabelWidth">
        <el-input v-model="editTeacherForm.sex" autocomplete="off" />
      </el-form-item>
      <el-form-item label="出生日期" prop="birthday" :label-width="formLabelWidth">
        <el-date-picker v-model="editTeacherForm.birthday" type="date" placeholder="选择出生日期" format="YYYY-MM-DD" :disabled-date="disabledDate" />
      </el-form-item>
      <el-form-item label="电话" prop="phone" :label-width="formLabelWidth">
        <el-input v-model="editTeacherForm.phone" autocomplete="off" />
      </el-form-item>
      <el-form-item label="身份证件号" prop="IDNo" :label-width="formLabelWidth">
        <el-input v-model="editTeacherForm.IDNo" autocomplete="off" />
      </el-form-item>
      <el-form-item label="婚姻状况" prop="marriage" :label-width="formLabelWidth">
        <el-input v-model="editTeacherForm.marriage" autocomplete="off" />
      </el-form-item>
      <el-form-item label="编制类别" prop="orgType" :label-width="formLabelWidth">
        <el-input v-model="editTeacherForm.orgType" autocomplete="off" />
      </el-form-item>
      <el-form-item label="教职工类别" prop="staffType" :label-width="formLabelWidth">
        <el-input v-model="editTeacherForm.staffType" autocomplete="off" />
      </el-form-item>
      <el-form-item label="教师职称" prop="title" :label-width="formLabelWidth">
        <el-input v-model="editTeacherForm.title" autocomplete="off" />
      </el-form-item>
      <el-form-item label="文化程度" prop="degree" :label-width="formLabelWidth">
        <el-input v-model="editTeacherForm.degree" autocomplete="off" />
      </el-form-item>
      <el-form-item label="职称等级" prop="titleLevel" :label-width="formLabelWidth">
        <el-input v-model="editTeacherForm.titleLevel" autocomplete="off" />
      </el-form-item>
      <el-form-item label="教师类别" prop="teachType" :label-width="formLabelWidth">
        <el-input v-model="editTeacherForm.teachType" autocomplete="off" />
      </el-form-item>
      <el-form-item label="教师所属单位" prop="school" :label-width="formLabelWidth">
        <el-input v-model="editTeacherForm.school" autocomplete="off" />
      </el-form-item>
      <el-form-item label="来校日期" prop="enterDate" :label-width="formLabelWidth">
        <el-date-picker v-model="editTeacherForm.enterDate" type="date" placeholder="选择来校日期" format="YYYY-MM-DD" :disabled-date="disabledDate" />
      </el-form-item>
      <el-form-item label="从教年月" prop="teachDate" :label-width="formLabelWidth">
        <el-input v-model="editTeacherForm.teachDate" autocomplete="off" />
      </el-form-item>
      <el-form-item label="当前状态" prop="status" :label-width="formLabelWidth">
        <el-input v-model="editTeacherForm.status" autocomplete="off" />
      </el-form-item>
      <el-form-item label="职级" prop="rank" :label-width="formLabelWidth">
        <el-input v-model.number="editTeacherForm.rank" autocomplete="off" />
      </el-form-item>
      <el-form-item label="技术职务" prop="tecposition" :label-width="formLabelWidth">
        <el-input v-model="editTeacherForm.tecposition" autocomplete="off" />
      </el-form-item>
      <el-form-item label="备注" prop="memo" :label-width="formLabelWidth">
        <el-input v-model="editTeacherForm.memo" type="textarea" autocomplete="off" />
      </el-form-item>
      <el-form-item label="单位编号" prop="schoolId" :label-width="formLabelWidth">
        <el-input v-model.number="editTeacherForm.schoolId" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
        <span class="dialog-footer">
          <el-button @click="cancelEditTeacher">取消</el-button>
          <el-button type="primary" @click="editTeacher">确认</el-button>
        </span>
    </template>
  </el-dialog>
</template>

<script>
import {ElMessage} from "element-plus";

export default {
  name: "EditTeacherDialog",
  data() {
    const disabledDate = (time) => {
      return time.getTime() > Date.now()
    };
    return {
      disabledDate: disabledDate,
      userNo: '',
      formLabelWidth: '140px',
      editTeacherFormVisible: false,
      editTeacherForm: {
        empName: '',
        sex: '',
        birthday: '',
        phone: '',
        IDNo: '',
        marriage: '',
        orgType: '',
        staffType: '',
        title: '',
        degree: '',
        titleLevel: '',
        teachType: '',
        school: '',
        enterDate: '',
        teachDate: '',
        status: '',
        rank: '',
        tecposition: '',
        memo: '',
        schoolId: ''
      },
      editTeacherFormRules: {
        empName: [
          {required: true, message: '请输入姓名', trigger: 'blur'},
          {max: 50, message: '姓名长度不超过50个字符', trigger: 'blur'}
        ],
        sex: [
          {required: true, message: '请输入性别', trigger: 'blur'},
          {max: 20, message: '性别不超过20个字符', trigger: 'blur'}
        ],
        birthday: [
          {required: true, message: '请选择出生日期', trigger: 'blur'}
        ],
        phone: [
          {max: 15, message: '电话长度不超过15个字符', trigger: 'blur'}
        ],
        IDNo: [
          {max: 20, message: '身份证长度不超过20个字符', trigger: 'blur'}
        ],
        marriage: [
          {max: 10, message: '婚姻状况长度不超过10个字符', trigger: 'blur'}
        ],
        orgType: [
          {max: 20, message: '编制类别长度不超过20个字符', trigger: 'blur'}
        ],
        staffType: [
          {max: 10, message: '教职工类别长度不超过10个字符', trigger: 'blur'}
        ],
        title: [
          {max: 20, message: '教师职称长度不超过20个字符', trigger: 'blur'}
        ],
        degree: [
          {max: 10, message: '文化程度长度不超过10个字符', trigger: 'blur'}
        ],
        titleLevel: [
          {max: 10, message: '职称等级长度不超过10个字符', trigger: 'blur'}
        ],
        teachType: [
          {max: 10, message: '教师类别长度不超过10个字符', trigger: 'blur'}
        ],
        school: [
          {max: 10, message: '教师所属单位长度不超过10个字符', trigger: 'blur'}
        ],
        enterDate: [],
        teachDate: [
          {max: 10, message: '从教年月长度不超过10个字符', trigger: 'blur'}
        ],
        status: [
          {max: 10, message: '当前状态长度不超过10个字符', trigger: 'blur'}
        ],
        rank: [
          {type: 'number', message: '职级必须是数字', trigger: 'blur'},
        ],
        tecposition: [
          {max: 20, message: '技术职务长度不超过20个字符', trigger: 'blur'}
        ],
        memo: [
          {max: 100, message: '备注长度不超过100个字符', trigger: 'blur'}
        ],
        schoolId: [
          {type: 'number', message: '单位编号必须是数字', trigger: 'blur'},
        ]
      }
    }
  },
  methods: {
    init() {
      this.userNo = this.$store.state.userNo;
    },
    clearEditTeacherForm() {
      this.$refs['editTeacherForm'].resetFields();
    },
    cancelEditTeacher() {
      this.clearEditTeacherForm();
      this.editTeacherFormVisible = false;
      this.$emit('close-edit-teacher');
    },
    editTeacher() {
      let _this = this;
      let editUserForm = {
        isStudent: false,
        teacher: _this.editTeacherForm
      };
      _this.$refs['editTeacherForm'].validate(valid => {
        if (valid) {
          editUserForm.teacher.empNo = _this.userNo;
          _this.$httpAuthority.post('/user/post', editUserForm).then(res => {
            ElMessage({
              message: '编辑成功',
              duration: 3 * 1000,
              center: true,
              type: 'success'
            });
            _this.$emit('edit_teacher_success');
            _this.cancelEditTeacher();
          }).catch(message => {
            _this.clearEditTeacherForm();
          });
        } else {
          ElMessage({
            message: '输入错误',
            duration: 3 * 1000,
            center: true,
            type: 'error'
          });
          _this.clearEditTeacherForm();
        }
      })
    }
  }
}
</script>

<style scoped>

</style>