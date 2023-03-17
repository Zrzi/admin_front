<template>
  <el-dialog
      v-model="historyRecordVisible"
      title="历史上传记录"
      @opened="init"
      @close="close"
      style="width: 60vw">
    <div>
      <el-table :data="this.excelTasks" style="width: 100%" max-height="300" :scrollbar-always-on="true"
                @expand-change="handleExpandChange" ref="recordTable">
        <el-table-column type="expand">
          <template #default="props">
            <el-scrollbar max-height="30vh">
              <el-row v-for="message in props.row.errorMessage" style="text-align: left">
                <el-col :span="2"></el-col>
                <el-col :span="20">{{ message }}</el-col>
                <el-col :span="2"></el-col>
              </el-row>
            </el-scrollbar>
          </template>
        </el-table-column>
        <el-table-column prop="taskId" label="任务编码" header-align="center" align="center" :show-overflow-tooltip="true" />
        <el-table-column prop="excelName" label="Excel表格名称" header-align="center" align="center" :show-overflow-tooltip="true" />
        <el-table-column prop="sqlName" label="Sql表格名称" header-align="center" align="center" :show-overflow-tooltip="true" />
        <el-table-column prop="taskSuccessInsert" label="成功插入个数" header-align="center" align="center" :show-overflow-tooltip="true" />
        <el-table-column prop="taskSuccessUpdate" label="成功修改个数" header-align="center" align="center" :show-overflow-tooltip="true" />
        <el-table-column prop="taskStatus" label="任务结果" header-align="center" align="center" :show-overflow-tooltip="true">
          <template #default="scope">
            <div v-if="scope.row.taskStatus === 1">
              <span>成功</span>
            </div>
            <div v-else>
              <span>存在异常</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="completedDate" label="完成时间" header-align="center" align="center" :show-overflow-tooltip="true" />
      </el-table>
    </div>
    <div style="display: flex; align-items: center; justify-content: center">
      <el-pagination
          :page-size="this.pageSize"
          layout="prev, pager, next"
          :total="this.total"
          :current-page="this.currentPage"
          @update:current-page="handleCurrentChange"
          @update:page-size="handleUpdatePageSize"
      />
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: "HistoryRecordDialog",
  data() {
    return {
      historyRecordVisible: false,
      excelTasks: [],
      expands: [],
      currentPage: 1,
      total: 0,
      pageSize: 10
    }
  },
  methods: {
    init() {
      this.currentPage = 1;
      this.getData();
    },
    close() {
      this.excelTasks = [];
      this.currentPage = 1;
      this.total = 0;
      this.$emit('close-history-record');
    },
    getData() {
      let _this = this;
      let start = (this.currentPage - 1) * this.pageSize;
      let pageSize = this.pageSize;
      _this.$httpAuthority.get('/excel/getHistoryUploadExcelResult', {params: {start, pageSize}}).then(res => {
        const result = res.data;
        const historyResult = result.data;
        _this.excelTasks = historyResult.excelTasks;
        _this.total = historyResult.total;
      }).catch(message => {
        _this.excelTasks = [];
        _this.total = 0;
      });
    },
    changeList() {
      this.getData();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.changeList();
    },
    handleUpdatePageSize(val) {},
    handleExpandChange(row, expandedRows) {
      let _this = this;
      if (expandedRows.length>1) {
        _this.expands = []
        if (row) {
          _this.expands.push(row);
        }
        this.$refs.recordTable.toggleRowExpansion(expandedRows[0]);
      } else {
        _this.expands = [];
      }
    }
  }
}
</script>

<style scoped>

</style>