<template>
  <div class="app-container">
    <el-row :gutter="20" class="header">
      <el-col :span="7">
        <el-input  placeholder="请输入课程名称..." v-model="query.classname" @clear="clearQuery" clearable></el-input>
      </el-col>
      <el-col :span="7">
        <el-input placeholder="请输入课序号..." v-model="query.courseorderid" clearable ></el-input>
      </el-col>
      <el-col :span="7">
        <el-input placeholder="请输入课程编号..." v-model="query.courseid" clearable ></el-input>
      </el-col>
    </el-row>
    <el-row :gutter="20" class="header">
      <el-col :span="7">
        <el-input placeholder="请输入授课教师..." v-model="query.teacher" clearable ></el-input>
      </el-col>
      <el-col :span="7">
        <el-input placeholder="请输入开课院系..." v-model="query.opencampus" clearable ></el-input>
      </el-col>

    </el-row>
    <el-row :gutter="20" class="header">
      <el-col :span="20">
      </el-col>
      <el-button type="success"  @click="search">搜索</el-button>
      <el-button type="clearable"  @click="clearQuery">清空</el-button>
      <el-button type="primary"  @click="autoScheduling(null)" >自动排考</el-button>
    </el-row>
    <el-table
        :data="tableData"
        stripe
        style="width: 100%"
        @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"/>
      <el-table-column align="center" label="课程编号" prop="courseid" width="100"/>
      <el-table-column align="center" label="课序号" prop="courseorderid" width="100"/>
      <el-table-column align="center" label="课程名称" prop="classname" width="150"/>
      <el-table-column align="center" label="开课校区" prop="opencampus" width="100"/>
      <el-table-column align="center" label="开课院系" prop="openschool" width="100"/>
      <el-table-column align="center" label="授课教师" prop="teacher" width="150"/>
      <el-table-column align="center" label="上课院系" prop="schools" width="100"/>
      <el-table-column align="center" label="教学班名称" prop="teachclass" width="200"/>
      <el-table-column align="center" label="学生班级" prop="stuclasses" width="200"/>
      <el-table-column align="center" label="人数" prop="numbers" width="50"/>
      <el-table-column align="center" label="考试方式" prop="method" width="100"/>
      <el-table-column align="center" label="考试日期" prop="testdate"  width="100" :formatter="testDateFormat"/>
      <el-table-column align="center" label="考试时间" prop="testTime" :formatter="testTimeFormat" width="200"/>
      <el-table-column align="center" label="考试节次" prop="testperiod" width="100"/>
      <el-table-column align="center" label="考试地点" prop="testplace" width="100"/>
      <el-table-column align="center" label="考场所在校区" prop="testcampus" width="100"/>
      <el-table-column align="center" label="考场总人数" prop="testplaceNumbers" width="50"/>
      <el-table-column align="center" label="教师是否确认"  prop="teaconfirm" :formatter="teaconfirmFormat" width="100"/>
      <el-table-column align="center" label="主考人员" prop="chiefTester" width="100"/>
      <el-table-column align="center" label="主监考" prop="tester1" width="100"/>
      <el-table-column align="center" label="副监考1" prop="tester2" width="100"/>
      <el-table-column align="center" label="副监考2" prop="tester3" width="100"/>
      <el-table-column align="center" label="试卷编号" prop="paperNumber" width="200"/>
      <el-table-column align="center" label="备注" prop="memo" width="200"/>

      <el-table-column align="center" fixed="right" label="操作" prop="action" width="400">
        <template v-slot="scope">
          <el-button type="primary" @click="detailScheduling(scope.row)">详情</el-button>
          <el-button type="primary" @click="manualScheduling(scope.row)">手动排考</el-button>
          <el-button type="primary" @click="cancelScheduling(scope.row)">取消排考</el-button>
          <el-button type="primary" @click="selectInvigilator(scope.row)">安排监考教师</el-button>
          <el-button type="primary" @click="printSeat(scope.row.id)">打印座次表</el-button>

          <!--        <el-popconfirm  v-if="scope.row.code!='admin'" title="您确定要删除这条记录吗？" @confirm="handleDelete(scope.row.id)">-->
          <!--          <template #reference>-->
          <!--            <el-button  type="danger"  v-if="hasAuth('system:role:delete')"/>-->
          <!--          </template>-->
          <!--        </el-popconfirm>-->

        </template>
      </el-table-column>
    </el-table>
    <el-pagination
        v-model:currentPage="queryForm.pageNum"
        v-model:page-size="queryForm.pageSize"
        :page-sizes="[10,20,30,40,50]"
        :total="total"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
    />
  </div>
  <DetailDialog v-model="detailDialogVisible" :dialogVisible="detailDialogVisible"  :id="row" ref="detailDialog" :dialogTitle="DetailDialogTitle" ></DetailDialog>
  <ManualDialog v-model="manualDialogVisible" :dialogVisible="manualDialogVisible" :id="row" ref="manualDialog" :dialogTitle="ManualDialogTitle" @initTestScheduleList="initTestScheduleList" ></ManualDialog>
  <AutoDialog v-model="autoDialogVisible" :dialogVisible="autoDialogVisible" :id="row" ref="autoDialog" :dialogTitle="AutoDialogTitle" @initTestScheduleList="initTestScheduleList" ></AutoDialog>

</template>

<script setup>
import {ref} from 'vue'
// import * as requestUtil from "@/utils/request";
import DetailDialog from '@/components/dialog/test/setDetailDialog'
import ManualDialog from '@/components/dialog/test/manualDialog'
import AutoDialog from '@/components/dialog/test/autoDialog'
import {ElMessage, ElMessageBox} from "element-plus";
import * as dateFormat from "@/utils/date"
// 列表数据
const query=ref({
  courseid:null,
  courseorderid:null,
  classname:null,
  opencampus:null,
  //openschool:"",
  teacher:null,
})
const queryForm = ref({
  pageNum: 1,
  pageSize: 10,

})

const total = ref(0)
const tableData = ref([])
const id = ref(-1)
const row=ref([])
const multipleSelection = ref([])
const DetailDialogTitle=ref("课程成绩详情")
const ManualDialogTitle=ref("手动安排课程考试")
const AutoDialogTitle=ref("自动安排课程考试")
const delBtnStatus = ref(true)
const detailDialogVisible=ref(false)
const detailDialog = ref();
const manualDialogVisible=ref(false)
const manualDialog = ref();
const autoDialogVisible=ref(false)
const autoDialog = ref();

const teaconfirmFormat=(row,column)=>{
  if(row.teaconfirm===1){
    return '未确认';
  }else if(row.teaconfirm===2){
    return '已确认';
  }else {
    return '未安排';
  }
}

const testTimeFormat=(row,column)=>{
  if(row.etesttime!==null&&row.btesttime!==null) {
    return dateFormat.timeFormat(row, row.btesttime)+"-"+dateFormat.timeFormat(row, row.etesttime);
  }else{
    return "";
  }

}
const testDateFormat=(row,column)=>{
  if(row.testdate!==null){
    return dateFormat.dateFormat(row,column);
  }else{
    return "";
  }
}
const clearQuery=()=>{
 query.value='',
  query.courseorderid=''
  query.classname=''
  query.opencampus=''
  //openschool:"",
  query.teacher=''
  initTestScheduleList()
}

const initTestScheduleList = async () => {
  const res = await this.$httpAuthority.post("/test/emsboot/Testschedule/scheduleList/"+queryForm.value.pageNum+"/"+queryForm.value.pageSize,query.value)
  //console.log(res.data.scheduleList);
  tableData.value = res.data.data.scheduleList;
  total.value = res.data.data.total;
  console.log("总数是" + res.data.data.total + "")
}
initTestScheduleList();
const search=()=>{
  initTestScheduleList();
}
const handleSelectionChange = (selection) => {
  console.log("勾选了")
  console.log(selection)
  multipleSelection.value = selection;
  delBtnStatus.value = selection.length === 0;
}
const handleSizeChange = (pageSize) => {
  queryForm.value.pageNum = 1;
  queryForm.value.pageSize = pageSize;
  initTestScheduleList();
}

const handleCurrentChange = (pageNum) => {
  queryForm.value.pageNum = pageNum;
  initTestScheduleList();
}

let d=''

const autoScheduling = async (id) => {
  d=''
  var ids = []
  if(id){
    ids.push(id)
  }else{
    multipleSelection.value.forEach(row=>{
      ids.push(row)
    })
  }
  autoDialogVisible.value = true;
  autoDialog.value.onChangeVisible(ids);

}
const manualScheduling = async (row) => {
  if (row.teaconfirm === 0) {
    manualDialogVisible.value = true;
    manualDialog.value.onChangeVisible(row);
    console.log(row)
  } else if (row.teaconfirm === 1) {
    await ElMessageBox.alert('该课程考试已安排,等待教师确认！', '提示', {
      confirmButtonText: '确定',
      type: 'warning'
    })
  }else if (row.teaconfirm === 2) {
    await ElMessageBox.alert('该课程考试已被教师确认，不可重复安排！', '提示', {
      confirmButtonText: '确定',
      type: 'warning'
    })
  }


}


const detailScheduling = (row) => {
  detailDialogVisible.value=true;

  detailDialog.value.onChangeVisible(row);


}
const cancelScheduling = async (row) => {
  if (row.teaconfirm === 1) {
    console.log("取消的数据"+row);
    ElMessageBox.confirm('是否确认取消'+row.classname+'课程考试安排内容?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'success'
    }).then(async () => {
            let result = await this.$httpAuthority.post("/test/emsboot/Testschedule/cancelScheduling" , row)

            let data = result.data;
            if (data.code === "200") {
              ElMessage.success("成功取消课程考试信息！")
              await initTestScheduleList();
            } else {
              ElMessage.error(data.msg);
            }

        })
        .catch(() => {
          ElMessage.success("未确认！")
        })
  } else if(row.teaconfirm === 0){
    await ElMessageBox.alert('该课程考试还未安排,不可取消！', '提示', {
      confirmButtonText: '确定',
      type: 'warning'
    })
  }
    else {
    await ElMessageBox.alert('该课程考试安排教师已确认,不可取消！', '提示', {
      confirmButtonText: '确定',
      type: 'warning'
    })
  }


}
const printSeat = (item) => {

}

const selectInvigilator=(item)=>{

}

</script>

<style lang="scss" scoped>
.header {
  padding-bottom: 16px;
  box-sizing: border-box;
}

.el-pagination {
  float: right;
  padding: 20px;
  box-sizing: border-box;
}

:deep(th.el-table__cell) {
  word-break: break-word;
  background-color: #f8f8f9 !important;
  color: #515a6e;
  height: 40px;
  font-size: 13px;

}

.el-tag--small {
  margin-left: 5px;
}
.demo-date-picker {
  display: flex;
  width: 100%;
  padding: 0;
  flex-wrap: wrap;
}

.demo-date-picker .block {
  padding: 30px 0;
  text-align: center;
  border-right: solid 1px var(--el-border-color);
  flex: 1;
}

.demo-date-picker .block:last-child {
  border-right: none;
}

.demo-date-picker .demonstration {
  display: block;
  color: var(--el-text-color-secondary);
  font-size: 14px;
  margin-bottom: 20px;
}

</style>
