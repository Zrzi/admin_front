<template>
  <el-dialog v-model="addTeacherFormVisible" title="添加教工" label-position="top" @close="cancelAddTeacher">
    <el-form :model="addTeacherForm" :rules="addTeacherFormRules" ref="addTeacherForm">
      <el-form-item label="教工号" prop="empNo" :label-width="formLabelWidth">
        <el-input v-model="addTeacherForm.empNo" autocomplete="off" />
      </el-form-item>
      <el-form-item label="姓名" prop="empName" :label-width="formLabelWidth">
        <el-input v-model="addTeacherForm.empName" autocomplete="off" />
      </el-form-item>
      <el-form-item label="性别" prop="sex" :label-width="formLabelWidth">
        <el-input v-model="addTeacherForm.sex" autocomplete="off" />
      </el-form-item>
      <el-form-item label="出生日期" prop="birthday" :label-width="formLabelWidth">
        <el-date-picker v-model="addTeacherForm.birthday" type="date" placeholder="选择出生日期" format="YYYY-MM-DD" />
      </el-form-item>
      <el-form-item label="电话" prop="phone" :label-width="formLabelWidth">
        <el-input v-model="addTeacherForm.phone" autocomplete="off" />
      </el-form-item>
      <el-form-item label="身份证件号" prop="IDNo" :label-width="formLabelWidth">
        <el-input v-model="addTeacherForm.IDNo" autocomplete="off" />
      </el-form-item>
      <el-form-item label="婚姻状况" prop="marriage" :label-width="formLabelWidth">
        <el-input v-model="addTeacherForm.marriage" autocomplete="off" />
      </el-form-item>
      <el-form-item label="编制类别" prop="orgType" :label-width="formLabelWidth">
        <el-input v-model="addTeacherForm.orgType" autocomplete="off" />
      </el-form-item>
      <el-form-item label="教职工类别" prop="staffType" :label-width="formLabelWidth">
        <el-input v-model="addTeacherForm.staffType" autocomplete="off" />
      </el-form-item>
      <el-form-item label="教师职称" prop="title" :label-width="formLabelWidth">
        <el-input v-model="addTeacherForm.title" autocomplete="off" />
      </el-form-item>
      <el-form-item label="文化程度" prop="degree" :label-width="formLabelWidth">
        <el-input v-model="addTeacherForm.degree" autocomplete="off" />
      </el-form-item>
      <el-form-item label="职称等级" prop="titleLevel" :label-width="formLabelWidth">
        <el-input v-model="addTeacherForm.titleLevel" autocomplete="off" />
      </el-form-item>
      <el-form-item label="教师类别" prop="teachType" :label-width="formLabelWidth">
        <el-input v-model="addTeacherForm.teachType" autocomplete="off" />
      </el-form-item>
      <el-form-item label="教师所属单位" prop="school" :label-width="formLabelWidth">
        <el-input v-model="addTeacherForm.school" autocomplete="off" />
      </el-form-item>
      <el-form-item label="来校日期" prop="enterDate" :label-width="formLabelWidth">
        <el-date-picker v-model="addTeacherForm.enterDate" type="date" placeholder="选择来校日期" format="YYYY-MM-DD" />
      </el-form-item>
      <el-form-item label="从教年月" prop="teachDate" :label-width="formLabelWidth">
        <el-input v-model="addTeacherForm.teachDate" autocomplete="off" />
      </el-form-item>
      <el-form-item label="当前状态" prop="status" :label-width="formLabelWidth">
        <el-input v-model="addTeacherForm.status" autocomplete="off" />
      </el-form-item>
      <el-form-item label="职级" prop="rank" :label-width="formLabelWidth">
        <el-input v-model="addTeacherForm.rank.number" autocomplete="off" />
      </el-form-item>
      <el-form-item label="技术职务" prop="tecposition" :label-width="formLabelWidth">
        <el-input v-model="addTeacherForm.tecposition" autocomplete="off" />
      </el-form-item>
      <el-form-item label="备注" prop="memo" :label-width="formLabelWidth">
        <el-input v-model="addTeacherForm.memo" type="textarea" autocomplete="off" />
      </el-form-item>
      <el-form-item label="单位编号" prop="schoolId" :label-width="formLabelWidth">
        <el-input v-model="addTeacherForm.schoolId.number" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
        <span class="dialog-footer">
          <el-button @click="cancelAddTeacher">取消</el-button>
          <el-button type="primary" @click="addTeacher">确认</el-button>
        </span>
    </template>
  </el-dialog>
</template>

<script>
import {ElMessage} from "element-plus";

export default {
  name: "AddTeacherDialog",
  data() {
    return {
      formLabelWidth: '140px',
      addTeacherFormVisible: false,
      addTeacherForm: {
        empNo: '',
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
      addTeacherFormRules: {
        empNo: [
          {required: true, message: '请输入教工号', trigger: 'blur'},
          {max: 20, message: '教工号长度不超过20个字符', trigger: 'blur'}
        ],
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
    clearAddTeacherForm() {
      this.refs['addTeacherForm'].resetFields();
    },
    cancelAddTeacher() {
      this.clearAddTeacherForm();
      this.addTeacherFormVisible = false;
      this.$emit('close-add-teacher');
    },
    addTeacher() {
      let _this = this;
      let addUserForm = {
        isStudent: false,
        teacher: _this.addTeacherForm
      };
      _this.refs['addTeacherForm'].validate(valid => {
        if (valid) {
          _this.$httpAuthority.post('/user/post', addUserForm).then(res => {
            ElMessage({
              message: '添加成功',
              duration: 3 * 1000,
              center: true,
              type: 'success'
            });
            _this.$emit('add_teacher_success');
            _this.cancelAddTeacher();
          }).catch(message => {
            _this.clearAddTeacherForm();
          });
        } else {
          ElMessage({
            message: '输入错误',
            duration: 3 * 1000,
            center: true,
            type: 'error'
          });
          _this.clearAddTeacherForm();
        }
      })
    }
  }
}
</script>

<style scoped>

</style>