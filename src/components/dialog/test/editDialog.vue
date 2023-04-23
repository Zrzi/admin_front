<template>
  <el-dialog
      model-value="editDialogVisible"
      :title="dialogTitle"
      width="30%"
      @close="handleClose"
  >
    <el-form
        ref="formRef"
        :model="form"
        :rules="rules"
        label-width="100px"
    >
      <el-form-item label="教室编号" prop="roomNo">
<!--        disabled="true"-->
        <el-input v-model="form.roomno" placeholder=form.roomno :disabled="true"/>
      </el-form-item>
      <el-form-item label="教室名称" prop="roomName">
        <el-input v-model="form.roomname"  placeholder=form.roomname  :disabled="true" />
      </el-form-item>
      <el-form-item label="所属功能区" prop="campus">
        <el-input v-model="form.campus" placeholder=form.campus :disabled="true" />
      </el-form-item>
      <el-form-item label="所属功能区" prop="func_zoo">
        <el-input v-model="form.funcZoo" v-if="form.funcZoo!==null"  placeholder=form.funcZoo :disabled="true"  />
        <el-input v-model="form.funcZoo" v-if="form.funcZoo===null"  placeholder="未定义" :disabled="true" />
      </el-form-item>
      <el-form-item label="所属教学楼" prop="building">
        <el-input v-model="form.building"   placeholder=form.building :disabled="true"/>
      </el-form-item>
      <el-form-item label="行数" prop="rownum">
        <el-input v-model="form.rownum"  type="number" />
      </el-form-item>
      <el-form-item label="列数" prop="columnnum">
        <el-input v-model="form.columnnum" type="number"  />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="handleConfirm">确认</el-button>
        <el-button  @click="handleClose">取消</el-button>
      </span>
    </template>
  </el-dialog>

</template>

<script setup>
import {ref} from "vue";
import requestUtil,{getServerUrl} from "@/utils/request";
import {ElMessage} from "element-plus";

const emits=defineEmits(['update:modelValue','classroomList'])
const editDialogVisible=ref(false)
const dialogTitle="修改教室信息"
const handleClose=()=>{
  emits('update:modelValue',false)
}
const rules={

}
const form=ref({
  roomno:"",
  roomname:"",
  campus:"",
  funcZoo:"",
  building:"",
  // Priority:"",
  // specialuse:"",
  // type:"",
  // seatNumbers:"",
  // validNumbers:"",
  // testNumbers:"",
  // usable:"",
  // WriTest:"",
  // fixed:"",
  // hascondition:"",
  rownum:"",
  columnnum:""
})
const onChangeVisible = (row) => {
  emits('update:modelValue',true)
  form.value=row;
};
const handleConfirm=async () => {
  let result = await requestUtil.post("http://localhost:8080/emsboot/Classrooms/editSeatNumber",form.value)
  let data=result.data;
  if(data.code==="200"){
    ElMessage.success("执行成功！")
    emits('update:modelValue',false)
    emits('initClassroomList')
  }else{
    ElMessage.error(data.msg);
  }
}

defineExpose({ onChangeVisible});


</script>

<style lang="scss" scoped>

</style>
