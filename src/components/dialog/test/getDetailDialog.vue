<template>
  <el-dialog
      model-value="detailDialogVisible"
      :title="dialogTitle"
      width="32%"
      @close="handleClose"

  >
    <el-form
        ref="formRef"
        :model="form"
        label-width="250px"

    >

        <el-descriptions :column="1"  class="margin-top" border >
          <el-descriptions-item label="课程编号" align="center" >{{form.courseid}}</el-descriptions-item>
          <el-descriptions-item label="课序号" align="center">{{form.courseorderid}}</el-descriptions-item>
          <el-descriptions-item label="课程名称" align="center">{{form.classname}}</el-descriptions-item>
          <el-descriptions-item label="开课校区" align="center">{{form.opencampus}}</el-descriptions-item>
          <el-descriptions-item label="开课院系" align="center">{{form.openschool}}</el-descriptions-item>
          <el-descriptions-item label="授课教师" align="center">{{form.teacher}}</el-descriptions-item>
          <el-descriptions-item label="上课院系" align="center">{{form.schools}}</el-descriptions-item>
          <el-descriptions-item label="教学班名称" align="center">{{form.teachclass}}</el-descriptions-item>
          <el-descriptions-item label="学生班级" align="center">{{form.stuclasses}}</el-descriptions-item>
          <el-descriptions-item label="人数" align="center">{{form.numbers}}</el-descriptions-item>
          <el-descriptions-item label="考试方式" align="center">{{form.method}}</el-descriptions-item>
          <el-descriptions-item label="考试日期" align="center"  >{{dateFormat.dateDetailFormat(form.testdate)}}</el-descriptions-item>
          <el-descriptions-item label="考试时间" align="center"  >{{dateFormat.timeDetailFormat(form.btesttime,form.etesttime)}}</el-descriptions-item>
          <el-descriptions-item label="考试节次" align="center">{{form.testPeriod}}</el-descriptions-item>
          <el-descriptions-item label="考试地点" align="center">{{form.testplace}}</el-descriptions-item>
          <el-descriptions-item label="考场所在校区" align="center">{{form.testcampus}}</el-descriptions-item>
          <el-descriptions-item label="考场总人数" align="center">{{form.testplaceNumbers}}</el-descriptions-item>
          <el-descriptions-item label="教师是否确认" align="center">{{form.teaconfirm}}</el-descriptions-item>
          <el-descriptions-item label="主考人员" align="center">{{form.chiefTester}}</el-descriptions-item>
          <el-descriptions-item label="主监考" align="center">{{form.tester1}}</el-descriptions-item>
          <el-descriptions-item label="副监考1" align="center">{{form.tester2}}</el-descriptions-item>
          <el-descriptions-item label="副监考2" align="center">{{form.tester3}}</el-descriptions-item>
          <el-descriptions-item label="备注" align="center">{{form.memo}}</el-descriptions-item>

        </el-descriptions>


    </el-form>
  </el-dialog>
</template>

<script setup>
import {ref, watch} from "vue";
import * as dateFormat from "@/utils/date";
import {ElMessage, ElMessageBox} from "element-plus";

const emits=defineEmits(['update:modelValue','scheduleList','form'])
const handleClose=()=>{
  emits('update:modelValue',false)
}
const testTimeFormat=()=>{
  if(form.etesttime!==null&&form.btesttime!==null) {
    return dateFormat.timeFormat(form, form.btesttime)+"-"+dateFormat.timeFormat(form, form.etesttime);
  }else{
    return "";
  }

}
const testDateFormat=()=> {
  if (form.testdate !== null) {
    form.testdate=dateFormat.dateDetailFormat(form, form.testdate);
  } else {
    form.testdate="";
  }
}
const form=ref({
  courseid:"什么什么",
  courseorderid:"",
  classname:"",
  opencampus:"",
  openschool:"",
  teacher:"",
  schools:"",
  teachclass:"",
  stuclasses:"",
  numbers:"0",
  method:"",
  testdate:"",
  etesttime:"",
  btesttime:"",
  testTime:"",
  testPeriod:"",
  testplace:"",
  testcampus:"",
  testplaceNumbers:"0",
  teaconfirm:"",
  chiefTester:"",
  tester1:"",
  tester2:"",
  tester3:"",
  memo:""
})
const dialogTitle=ref("课程考试安排详情")

const onChangeVisible = (row) => {

  form.value=row;
  dialogTitle.value=row.classname+"课程考试安排详情"
  if (form.testdate !== null) {
    form.testdate=dateFormat.dateDetailFormat(form, form.testdate);
  } else {
    form.testdate="";
  }
  if(form.etesttime!==null&&form.btesttime!==null) {
    form.testTime=dateFormat.timeFormat(form, form.btesttime)+"-"+dateFormat.timeFormat(form, form.etesttime);
  }else{
    form.testTime="";
  }
  console.log("详情"+form.value)
  emits("update:modelValue",true)
};

defineExpose({ onChangeVisible });

</script>


<style lang="scss" scoped>

</style>
