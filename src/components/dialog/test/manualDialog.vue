<template>
  <el-dialog
      model-value="manualDialogVisible"
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
      <el-form-item label="课程编号" prop="courseid">
        <el-input v-model="form.courseid" placeholder=form.courseid :disabled="true"/>
      </el-form-item>
      <el-form-item label="课序号" prop="courseorderid">
        <el-input v-model="form.courseorderid" placeholder=form.courseorderid :disabled="true"/>
      </el-form-item>
      <el-form-item label="课程名称" prop="classname">
        <el-input v-model="form.classname" placeholder=form.classname :disabled="true"/>
      </el-form-item>
      <el-form-item label="学生班级" prop="stuclasses">
        <el-input v-model="form.stuclasses" placeholder=form.stuclasses :disabled="true"/>
      </el-form-item>
      <el-form-item label="授课教师" prop="teacher">
        <el-input v-model="form.teacher" placeholder=form.teacher :disabled="true"/>
      </el-form-item>
      <el-form-item label="周次" prop="weeks">
        <el-select v-model="form.weeks" class="m-2" placeholder="请选择周次">
          <el-option
              v-for="item in weekSelect"
              :key="item.value"
              :label="item.label"
              :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="星期" prop="weekDay">
        <el-select v-model="form.weekDay" class="m-2" placeholder="请选择星期" >
          <el-option
              v-for="item in weekDaySelect"
              :key="item.value"
              :label="item.label"
              :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="节次" prop="period">
        <el-select v-model="form.period" class="m-2" placeholder="请选择节次" >
          <el-option
              v-for="(value,k) in periodList"
              :key="value"
              :label="value"
              :value="value"
          />
        </el-select>
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
import {ref, watch} from "vue";
import * as requestUtil from "@/utils/request";
import {ElMessage, ElMessageBox} from "element-plus";

const emits=defineEmits(['update:modelValue',' initTestScheduleList'])
// const weeksDayDisable=ref(false)
const manualDialogVisible=ref(false)
const periodList= ref([])
const allPeriodList=ref([])
// const monList=ref([])
// const tueList=ref([])
// const wedList=ref([])
// const thuList=ref([])
// const friList=ref([])
// const satList=ref([])
// const sunList=ref([])
const dialogTitle="手动安排课程考试"
const rules= {
}
const weekSelect = [
  {
    value: '1',
    label: '第1周',
  },
  {
    value:'2',
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
const weekDaySelect=[
  {
    value: '1',
    label: '星期一',
  },
  {
    value: '2',
    label: '星期二',
  },
  {
    value: '3',
    label: '星期三',
  },
  {
    value: '4',
    label: '星期四',
  },
  {
    value: '5',
    label: '星期五',
  },
  {
    value: '6',
    label: '星期六',
  },
  {
    value: '7',
    label: '星期日',
  }
]
const form=ref({
  courseid:"",
  courseorderid:"",
  classname:"",
  stuclasses:"",
  period:"",
  teacher:"",
  weekDay:"星期",
  weeks:'0',
})
const onChangeVisible = (row) => {
  emits('update:modelValue',true)
  form.value=row;

};
const handleClose=()=>{
  emits('update:modelValue',false)
}
let weeksDegree=['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20']
let weekDayDegree=['1','2','3','4','5','6','7']
let periodDegree=['1-2','3-4','5-6','7-8','9-10']
const handleConfirm=async () => {
  let week = form.value.weeks;
  let weekDay=form.value.weekDay;
  let period=form.value.period;
  let termBeginDate="2023-2-14";
  if(weeksDegree.includes(week)&&weekDayDegree.includes(weekDay)&&periodDegree.includes(period)){
    let result=await requestUtil.post("http://localhost:8080/emsboot/Testschedule/ManualSchedulingConfirm/"+week+"/"+weekDay+"/"+period+"/"+termBeginDate,form.value)
    let data = result.data;
    if (data.code === "200") {
      ElMessage.success("成功安排课程考试信息！")
      emits('update:modelValue',false)
      emits('initTestScheduleList')
    } else {
      ElMessage.error(data.msg);
    }
  }else {
    await ElMessageBox.alert('请完整选择周次、星期和节次后再进行确认！', '无效操作', {
      confirmButtonText: 'OK'

    })

  }
}

watch(()=>form.value.weeks,
    async () => {
      let week = form.value.weeks;
      if(weeksDegree.includes(week)){
        let termBeginDate="2023-2-14";
        let result = await requestUtil.post("http://localhost:8080/emsboot/Testschedule/ManualSchedulingList/"+week+"/"+termBeginDate, form.value)
        allPeriodList.value=result.data.data;
        let weekday=form.value.weekDay;
        if(weekday==="1"){
          periodList.value=allPeriodList.value.monList;
        }else if(weekday==="2"){
          periodList.value=allPeriodList.value.tueList;
        }else if(weekday==="3"){
          periodList.value=allPeriodList.value.wedList
        }else if(weekday==="4"){
          periodList.value=allPeriodList.value.thuList
        }else if(weekday==="5"){
          periodList.value=allPeriodList.value.firList
        }else if(weekday==="6"){
          periodList.value=allPeriodList.value.satList
        }else if(weekday==="7"){
          periodList.value=allPeriodList.value.sunList;
        }
      }
      //console.log(allPeriodList)
    }
)

watch(()=>form.value.weekDay,
    ()=>{
      let weekday=form.value.weekDay;
      if(weekday==="1"){
        periodList.value=allPeriodList.value.monList;
      }else if(weekday==="2"){
        periodList.value=allPeriodList.value.tueList;
      }else if(weekday==="3"){
        periodList.value=allPeriodList.value.wedList
      }else if(weekday==="4"){
        periodList.value=allPeriodList.value.thuList
      }else if(weekday==="5"){
        periodList.value=allPeriodList.value.firList
      }else if(weekday==="6"){
        periodList.value=allPeriodList.value.satList
      }else if(weekday==="7"){
        periodList.value=allPeriodList.value.sunList;
      }
    })
defineExpose({ onChangeVisible});

</script>

<style lang="scss" scoped>

</style>
