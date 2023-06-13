<template>
  <div class="app-container">
    <el-table
        :data="tableData"
        stripe
        style="width: 100%"
        @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"/>
<!--      <el-table-column align="center" label="教室编号" prop="roomNo" width="100"/>-->
      <el-table-column align="center" label="教室名称" prop="roomname" width="200"/>
      <el-table-column align="center" label="校区" prop="campus" width="200"/>
      <el-table-column align="center" label="所属功能区" prop="funcZoo" width="200"/>
      <el-table-column align="center" label="所属教学楼" prop="building" width="200"/>
      <el-table-column align="center" label="排课优先级" prop="priority" width="100"/>
      <el-table-column align="center" label="是否专用" prop="specialuse" width="100"/>
      <el-table-column align="center" label="教室类型" prop="type" width="100"/>
      <el-table-column align="center" label="座位数" prop="seatnumbers" width="100"/>
      <el-table-column align="center" label="有效座位数" prop="vaildnumbers" width="100"/>
      <el-table-column align="center" label="考试座位数" prop="testnumbers" width="100"/>
      <el-table-column align="center" label="是否可用" prop="usable" width="100"/>
      <el-table-column align="center" label="是否笔试考试" prop="writest" width="100"/>
      <el-table-column align="center" label="桌椅是否固定" prop="fixed" width="100"/>
      <el-table-column align="center" label="是否有空调" prop="hascondition" width="100"/>
      <el-table-column align="center" label="行数" prop="rownum" width="100"/>
      <el-table-column align="center" label="列数" prop="columnnum" width="100"/>

      <el-table-column align="center" fixed="right" label="操作" prop="action" width="250">
        <template v-slot="scope">
          <el-button type="primary" @click="editSeatNumber(scope.row)">修改</el-button>
          <el-button type="primary" @click="classroomsDetail(scope.row)">详情</el-button>


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
  <DetailDialog v-model="detailDialogVisible" :dialogVisible="detailDialogVisible" :id="row" ref="detailDialog" :dialogTitle="DetailDialogTitle" ></DetailDialog>
  <EditDetailDialog v-model="editDialogVisible" :dialogVisible="editDialogVisible" :id="row" ref="editDialog" :dialogTitle="EditDialogTitle" @initClassroomList="initClassroomList" ></EditDetailDialog>

</template>

<script setup>
import {ref} from 'vue'
// import * as requestUtil from "@/utils/request";
import DetailDialog from "@/components/dialog/test/detailDialog"
import EditDetailDialog from "@/components/dialog/test/editDialog"
// 列表数据
const queryForm = ref({
  query: '',
  pageNum: 1,
  pageSize: 10
})
const total = ref(0)
const tableData = ref([])
const id = ref(-1)

const multipleSelection = ref([])

const delBtnStatus = ref(true)
const row=ref([])
const DetailDialogTitle=ref("教室信息详情")
const detailDialogVisible=ref(false)
const detailDialog = ref()
const editDialog=ref()
const editDialogVisible=ref(false)
const EditDialogTitle=ref("修改教室信息")

const initClassroomList = async () => {
  const res = await this.$httpAuthority.post("/test/emsboot/Classrooms/classroomsList", queryForm.value)
  //console.log(res.data.scheduleList);
  tableData.value = res.data.data.classroomsList;
  total.value = res.data.data.total;
}
initClassroomList();
const handleSelectionChange = (selection) => {
  console.log("勾选了")
  console.log(selection)
  multipleSelection.value = selection;
  delBtnStatus.value = selection.length === 0;
}
const handleSizeChange = (pageSize) => {
  queryForm.value.pageNum = 1;
  queryForm.value.pageSize = pageSize;
  initClassroomList();
}

const handleCurrentChange = (pageNum) => {
  queryForm.value.pageNum = pageNum;
  initClassroomList();
}


const editSeatNumber=(row)=>{
  editDialogVisible.value=true;
  console.log(row)
  editDialog.value.onChangeVisible(row);

}
const classroomsDetail=(row)=>{
  detailDialogVisible.value=true;
  console.log(row);
  detailDialog.value.onChangeVisible(row);
}
const printSeat = (item) => {

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

:deep(th.el-table__cell ){
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
