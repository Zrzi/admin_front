<template>
  <div class="app-container">
    <el-row :gutter="20" class="header">
      <el-col :span="7">
        <el-input placeholder="请输入课程名称..." v-model="query.classname" clearable ></el-input>
      </el-col>
      <el-col :span="7">
        <el-input placeholder="请输入课序号..." v-model="query.courseid" clearable ></el-input>
      </el-col>
      <el-col :span="7">
        <el-input placeholder="请输入课程编号..." v-model="query.courseorderid" clearable ></el-input>
      </el-col>
    </el-row>
    <el-row :gutter="20" class="header">
      <el-col :span="7">
        <el-input placeholder="请输入监考教师..." v-model="query.test1" clearable ></el-input>
      </el-col>
<!--      <el-col :span="7">-->
<!--        <el-input placeholder="请输入考试日期..." v-model="queryForm.query" clearable ></el-input>-->
<!--      </el-col>-->
      <el-button type="primary"  @click="initTestScheduleList">搜索</el-button>
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
      <el-table-column align="center" label="教师是否确认" prop="teaconfirm" :formatter="teaconfirmFormat"  width="100"/>
      <el-table-column align="center" label="主考人员" prop="chiefTester" width="100"/>
      <el-table-column align="center" label="主监考" prop="tester1" width="100"/>
      <el-table-column align="center" label="副监考1" prop="tester2" width="100"/>
      <el-table-column align="center" label="副监考2" prop="tester3" width="100"/>
      <el-table-column align="center" label="试卷编号" prop="paperNumber" width="200"/>
      <el-table-column align="center" label="备注" prop="memo" width="200"/>

      <el-table-column align="center" fixed="right" label="操作" prop="action" width="300">
        <template v-slot="scope">
          <el-button type="primary" @click="confirmScheduling(scope.row.id)">确认排考</el-button>
          <el-button type="primary" @click="applyExchangeTime(scope.row.id)">申请更换时间</el-button>
          <el-button type="primary" @click="detailScheduling(scope.row)">详情</el-button>


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
  <DetailDialog v-model="detailDialogVisible" :dialogVisible="detailDialogVisible" :id="row" ref="detailDialog" :dialogTitle="DeatilDialogTitle" ></DetailDialog>

</template>

<script setup>
import {ref} from 'vue'
// import * as requestUtil from "@/utils/request";
import DetailDialog from '@/components/dialog/test/getDetailDialog'
import {ElMessage, ElMessageBox} from "element-plus";
import * as dateFormat from "@/utils/date";
const query=ref({
  courseid:null,
  courseorderid:null,
  classname:null,
  opencampus:null,
  test1:null,
  test2:null,
  test3:null,
  chiefTester:null,
  //openschool:"",
  teacher:null,
})
// 列表数据
const queryForm = ref({
  pageNum: 1,
  pageSize: 10
})
const total = ref(0)
const tableData = ref([])
const id = ref(-1)
const row = ref([])
const DeatilDialogTitle=ref("课程成绩详情")
const detailDialogVisible=ref(false)

const multipleSelection = ref([])

const delBtnStatus = ref(true)
const detailDialog = ref();
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
const teaconfirmFormat=(row,column)=>{
  if(row.teaconfirm===1){
    return '未确认';
  }else if(row.teaconfirm===2){
    return '已确认';
  }else {
    return '未安排';
  }
}


const initTestScheduleList = async () => {
  query.value.test2=query.value.test1
  query.value.test3=query.value.test1
  query.value.chiefTester=query.value.test1
  const res = await this.$httpAuthority.post("/test/emsboot/Testschedule/scheduleList/"+queryForm.value.pageNum+"/"+queryForm.value.pageSize,query.value)
  //console.log(res.data.scheduleList);
  tableData.value = res.data.data.scheduleList;
  total.value = res.data.data.total;
  //console.log("总数是" + res.data.data.total + "")
}
initTestScheduleList();
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

const applyExchangeTime=(id)=>{

}

const confirmScheduling = (item) => {
    ElMessageBox.confirm('是否确认该课程考试安排内容?','提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'success'
  })
        .then(async () => {
          let result = await this.$httpAuthority.post("/test/emsboot/Testschedule/confirmScheduling/"+item)
console.log(item);
          let data = result.data;
          if (data.code === "200") {
            ElMessage.success("成功确认课程考试信息！")
            await initTestScheduleList();
          } else {
            ElMessage.error(data.msg);
          }
        })
        .catch(() => {
          ElMessage.success("未确认！")
        })

}
const detailScheduling = (row) => {
  detailDialogVisible.value=true;
  console.log(row);
  detailDialog.value.onChangeVisible(row);
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

:deep(th.el-table__cell)  {
  word-break: break-word;
  background-color: #f8f8f9 !important;
  color: #515a6e;
  height: 40px;
  font-size: 13px;

}

.el-tag--small {
  margin-left: 5px;
}


</style>
