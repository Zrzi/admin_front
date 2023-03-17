<template>
  <el-container width="90vw">
    <el-header style="display: flex; align-items: center; justify-content: space-between; width: 80vw; margin: auto">
      <h2>Excel映射管理</h2>
      <div style="display: flex; align-items: center; justify-content: right">
        <el-button type="primary" @click="clickUploadExcel" v-if="uploadExcelButton">上传excel</el-button>
        <el-button type="primary" @click="clickAddExcel" v-if="addExcelButton">+添加Excel映射</el-button>
        <el-button type="primary" @click="clickHistoryRecord" v-if="historyRecordButton">历史上传记录</el-button>
      </div>
    </el-header>
    <el-divider />
    <el-space wrap :size="15">
      <el-card shadow="hover" v-for="(excel) in excels" style="width: 15vw">
        <div style="text-align: left; font-size: medium; margin-bottom: 1vh">
          <b>{{ excel.excelName }}</b>
        </div>
        <div style="display: flex; align-items: center; justify-content: space-between; margin-top: 1vh">
          <span style="font-size: small; color: #409EFF"
                    @click="clickEditExcel(excel.excelId)"
                    @mouseenter="editMouseEnterStyle"
                    @mouseleave="editMouseLeaveStyle"
                    v-if="editExcelButton">
            编辑映射
          </span>
          <span style="font-size: small; color: #D9001B"
                @click="clickDeleteExcel(excel.excelId)"
                @mouseenter="editMouseEnterStyle"
                @mouseleave="editMouseLeaveStyle"
                v-if="deleteExcelButton">
            删除映射
          </span>
        </div>
      </el-card>
    </el-space>
    <AddExcelDialog
        v-model="addExcelFormVisible"
        @close-add-excel="handleCloseAddExcel"
        @add-excel-success="handleAddExcelSuccess">
    </AddExcelDialog>
    <EditExcelDialog
        v-model="editExcelFormVisible"
        @close-edit-excel="handleCloseEditExcel"
        @edit-excel-success="handleEditExcelSuccess">
    </EditExcelDialog>
    <UploadExcelDialog
        v-model="uploadExcelFormVisible"
        @close-upload-excel="handleUploadExcel">
    </UploadExcelDialog>
    <HistoryRecordDialog
        v-model="historyRecordVisible"
        @close-history-record="handleHistoryRecord">
    </HistoryRecordDialog>
  </el-container>
</template>

<script>
import checkAuthority from "@/utils/checkAuthority";
import AddExcelDialog from "@/components/dialog/excels/AddExcelDialog";
import EditExcelDialog from "@/components/dialog/excels/EditExcelDialog";
import UploadExcelDialog from "@/components/dialog/excels/UploadExcelDialog";
import HistoryRecordDialog from "@/components/dialog/excels/HistoryRecordDialog";

export default {
  name: 'Excels',
  components: {HistoryRecordDialog, UploadExcelDialog, EditExcelDialog, AddExcelDialog},
  data() {
    return {
      addExcelFormVisible: false,
      editExcelFormVisible: false,
      uploadExcelFormVisible: false,
      historyRecordVisible: false,
      addExcelButton: false,
      editExcelButton: false,
      deleteExcelButton: false,
      uploadExcelButton: false,
      historyRecordButton: false,
      excels: []
    }
  },
  methods: {
    init() {
      let _this = this;
      _this.$httpAuthority.get('/excel/getExcels').then(res => {
        const result = res.data;
        _this.excels = result.data;
      }).catch(message => {
        _this.excels = [];
      });
    },
    editMouseEnterStyle() {
      document.querySelector('body').style.cursor = 'pointer';
    },
    editMouseLeaveStyle() {
      document.querySelector('body').style.cursor = 'default';
    },
    checkAddExcelButtonAuthority() {
      checkAuthority('Rf4d8ed869b8c4b7db6794d3530f44051').then(res => {
        const result = res.data;
        this.addExcelButton = result.data;
      }).catch(message => {
        this.addExcelButton = false;
      });
    },
    checkEditExcelButtonAuthority() {
      checkAuthority('R7567cf8ff9c34c489a4c3ffd69154132').then(res => {
        const result = res.data;
        this.editExcelButton = result.data;
      }).catch(message => {
        this.editExcelButton = false;
      });
    },
    checkDeleteExcelButtonAuthority() {
      checkAuthority('R60d15fcdc81547ed9883c33bd820878b').then(res => {
        const result = res.data;
        this.deleteExcelButton = result.data;
      }).catch(message => {
        this.deleteExcelButton = false;
      });
    },
    checkUploadExcelButtonAuthority() {
      checkAuthority('R8801ffac20684b5084e3930aaecb97cb').then(res => {
        const result = res.data;
        this.uploadExcelButton = result.data;
      }).catch(message => {
        this.uploadExcelButton = false;
      });
    },
    checkHistoryRecordButtonAuthority() {
      checkAuthority('Rfea74b989acb435b94a0883a3c3ebb52').then(res => {
        const result = res.data;
        this.historyRecordButton = result.data;
      }).catch(message => {
        this.historyRecordButton = false;
      });
    },
    clickAddExcel() {
      this.addExcelFormVisible = true;
    },
    clickHistoryRecord() {
      this.historyRecordVisible = true;
    },
    clickEditExcel(excelId) {
      this.$store.commit('SET_EXCEL_ID', excelId);
      this.editExcelFormVisible = true;
    },
    clickDeleteExcel(excelId) {
      console.log(excelId);
      let _this = this;
      let deleteExcelForm = {
        excelId: excelId
      };
      _this.$httpAuthority.post('/excel/delete', deleteExcelForm).then(res => {
        _this.init();
      });
    },
    clickUploadExcel() {
      this.uploadExcelFormVisible = true;
    },
    handleCloseAddExcel() {
      this.addExcelFormVisible = false;
    },
    handleCloseEditExcel() {
      this.editExcelFormVisible = false;
      this.$store.commit('RESET_EXCEL_ID');
    },
    handleAddExcelSuccess() {
      this.addExcelFormVisible = false;
      this.init();
    },
    handleEditExcelSuccess() {
      this.editExcelFormVisible = false;
      this.init();
    },
    handleUploadExcel() {
      this.uploadExcelFormVisible = false;
    },
    handleHistoryRecord() {
      this.historyRecordVisible = false;
    }
  },
  created() {
    this.checkAddExcelButtonAuthority();
    this.checkEditExcelButtonAuthority();
    this.checkDeleteExcelButtonAuthority();
    this.checkUploadExcelButtonAuthority();
    this.checkHistoryRecordButtonAuthority();
    this.init();
  }
}
</script>

<style scoped>

</style>