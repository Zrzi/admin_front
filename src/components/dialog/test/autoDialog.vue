<template>
  <el-dialog
      :title="dialogTitle"
      model-value="manualDialogVisible"
      width="30%"
      @close="handleClose"
  >
    <el-form
        ref="formRef"
        :model="form"
        :rules="rules"
        label-width="100px"
    >
      <el-form-item label="请选择周次" prop="weeks">
        <el-select v-model="form.weeks" class="m-2" placeholder="请选择周次">
          <el-option
              v-for="item in weekSelect"
              :key="item.value"
              :label="item.label"
              :value="item.value"
          />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="handleConfirm">确认</el-button>
        <el-button @click="handleClose">取消</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import {ref} from "vue";
import * as requestUtil from "@/utils/request";
import {ElMessage} from "element-plus";

const dialogTitle="自动安排考试"
const emits = defineEmits(['update:modelValue', ' initTestScheduleList'])
const weekSelect = [
  {
    value: '1',
    label: '第1周',
  },
  {
    value: '2',
    label: '第2周',
  },
  {
    value: '3',
    label: '第3周',
  }, {
    value: '4',
    label: '第4周',
  }, {
    value: '5',
    label: '第5周',
  }, {
    value: '6',
    label: '第6周',
  }, {
    value: '7',
    label: '第7周',
  },
  {
    value: '8',
    label: '第8周',
  }, {
    value: '9',
    label: '第9周',
  },
  {
    value: '10',
    label: '第10周',
  },
  {
    value: '11',
    label: '第11周',
  },
  {
    value: '12',
    label: '第12周',
  },
  {
    value: '13',
    label: '第13周',
  }, {
    value: '14',
    label: '第14周',
  }, {
    value: '15',
    label: '第15周',
  }, {
    value: '16',
    label: '第16周',
  }, {
    value: '17',
    label: '第17周',
  },
  {
    value: '18',
    label: '第18周',
  }, {
    value: '19',
    label: '第19周',
  },
  {
    value: '20',
    label: '第20周',
  },]
const form = ref({
  weeks: '0'
})
const handleClose = () => {
  emits('update:modelValue', false)
}
var ids = []
const handleConfirm = async () => {
  let week = form.value.weeks;
  let termBeginDate = "2023-2-14";
  let result = await requestUtil.post("http://localhost:8080/emsboot/Testschedule/AutoScheduling/" + week + "/1/" + termBeginDate, ids)
  let data = result.data
  if (data.code === "200") {
    ElMessage.success("执行成功！")
    emits('initTestScheduleList')
    emits('update:modelValue', false)
  } else {
    ElMessage.error(data.msg);
  }

}

//console.log(result.data)
const onChangeVisible = (row) => {
  emits('update:modelValue', true)
  ids= row;

}
defineExpose({onChangeVisible,form});

</script>

<style lang="scss" scoped>

</style>
