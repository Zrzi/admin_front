<template>
  <el-dialog
      model-value="detailDialogVisible"
      :title="dialogTitle"
      width="30%"
      @close="handleClose"
  >
    <el-form
        ref="formRef"
        :model="form"
        label-width="100px"
    >

      <el-descriptions :column="1"  class="margin-top" border >
          <el-descriptions-item label="教室编号">{{form.roomno}}</el-descriptions-item>
          <el-descriptions-item label="教室名称">{{form.roomname}}</el-descriptions-item>
          <el-descriptions-item label="校区">{{form.campus}}</el-descriptions-item>
          <el-descriptions-item label="所属功能区">{{form.funcZoo}}</el-descriptions-item>
          <el-descriptions-item label="所属教学楼">{{form.building}}</el-descriptions-item>
          <el-descriptions-item label="排课优先级">{{form.priority}}</el-descriptions-item>
          <el-descriptions-item label="是否专用">{{form.specialuse}}</el-descriptions-item>
          <el-descriptions-item label="教师类型">{{form.type}}</el-descriptions-item>
          <el-descriptions-item label="座位数">{{form.seatnumbers}}</el-descriptions-item>
          <el-descriptions-item label="有效座位数">{{form.vaildnumbers}}</el-descriptions-item>
          <el-descriptions-item label="考试座位数">{{form.testnumbers}}</el-descriptions-item>
          <el-descriptions-item label="是否可用">{{form.usable}}</el-descriptions-item>
          <el-descriptions-item label="是否笔试考试">{{form.writest}}</el-descriptions-item>
          <el-descriptions-item label="桌椅是否固定">{{form.fixed}}</el-descriptions-item>
          <el-descriptions-item label="是否有空调">{{form.hascondition}}</el-descriptions-item>
          <el-descriptions-item label="行数">{{form.rownum}}</el-descriptions-item>
          <el-descriptions-item label="列数">{{form.columnnum}}</el-descriptions-item>

        </el-descriptions>


    </el-form>
  </el-dialog>
</template>

<script setup>
import {ref, watch} from "vue";
const emits=defineEmits(['update:modelValue','scheduleList','form'])
const handleClose=()=>{
  emits('update:modelValue',false)
}
const dialogTitle=ref("教室信息详情")


const form=ref({
  roomno:"",
  roomname:"",
  campus:"",
  funcZoo:"",
  building:"",
  Priority:"",
  specialuse:"",
  type:"",
  seatNumbers:"",
  validNumbers:"",
  testNumbers:"",
  usable:"",
  WriTest:"",
  fixed:"",
  hascondition:"",
  rowNum:"",
  columnNum:""
})



const detailDialogVisible = ref(false);
const onChangeVisible = (row) => {
  detailDialogVisible.value = true;
  form.value=row;
  dialogTitle.value=row.roomname+"教室信息详情"
};

defineExpose({ onChangeVisible });

</script>


<style lang="scss" scoped>

</style>
