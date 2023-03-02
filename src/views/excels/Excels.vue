<template>
  <el-container width="90vw">
    <el-header style="display: flex; align-items: center; justify-content: space-between; width: 80vw; margin: auto">
      <h2>Excel映射管理</h2>
      <el-button type="primary" @click="clickAddExcel" v-if="addExcelButton">+添加Excel映射</el-button>
    </el-header>
    <el-divider />
    <el-main>
      <el-row v-for="row in rows" :gutter="30" justify="center" align="middle"
              style="margin-top: 2vh; margin-bottom: 5vh; height: 15vh">
        <el-col v-for="col in this.numsPerRow" :span="5" style="width: 18vw">
          <el-card shadow="always" v-if="this.numsPerRow * (row - 1) + col - 1 < this.excelsNum">
            <div style="text-align: left; font-size: medium; margin-bottom: 1vh">
              <b>{{ this.excels[this.numsPerRow * (row - 1) + col - 1].excelName }}</b>
            </div>
            <div style="display: flex; align-items: center; justify-content: space-between; margin-top: 1vh">
              <span style="font-size: small; color: #409EFF"
                    @click="clickEditExcel(this.numsPerRow * (row - 1) + col - 1)"
                    @mouseenter="editMouseEnterStyle"
                    @mouseleave="editMouseLeaveStyle"
                    v-if="editExcelButton">
                编辑映射
              </span>
              <span style="font-size: small; color: #D9001B"
                    @click="clickDeleteExcel(this.numsPerRow * (row - 1) + col - 1)"
                    @mouseenter="editMouseEnterStyle"
                    @mouseleave="editMouseLeaveStyle"
                    v-if="deleteExcelButton">
                删除映射
              </span>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </el-main>
    <AddExcelDialog
        v-model="addExcelFormVisible"
        @close-add-excel="this.addExcelFormVisible = false"
        @add-excel-success="">
    </AddExcelDialog>
    <EditExcelDialog
        v-model="editExcelFormVisible"
        @close-edit-excel="this.editExcelFormVisible = false"
        @edit-excel-success="">
    </EditExcelDialog>
  </el-container>
</template>

<script>
import checkAuthority from "@/utils/checkAuthority";
import AddExcelDialog from "@/components/dialog/excels/AddExcelDialog";
import EditExcelDialog from "@/components/dialog/excels/EditExcelDialog";

export default {
  name: 'Excels',
  components: {EditExcelDialog, AddExcelDialog},
  data() {
    return {
      addExcelFormVisible: false,
      editExcelFormVisible: false,
      addExcelButton: false,
      editExcelButton: false,
      deleteExcelButton: false,
      excelsNum: 0,
      numsPerRow: 4,
      rows: 0,
      excels: []
    }
  },
  methods: {
    init() {
      // let _this = this;
      // _this.$httpExcel.get('/excel/get').then(res => {
      //   const result = res.data;
      //   _this.excels = result.data;
      //   _this.excelsNum = _this.excels.length;
      //   _this.rows = Math.ceil(_this.excelsNum / _this.numsPerRow);
      // }).catch(message => {
      //   _this.excels = [];
      //   _this.excelsNum = 0;
      //   _this.rows = 0;
      // });
      this.excels = [
        {
          excelId: 'E01',
          excelName: '表格1'
        }
      ];
      this.excelsNum = this.excels.length;
      this.rows = Math.ceil(this.excelsNum / this.numsPerRow);
    },
    editMouseEnterStyle() {
      document.querySelector('body').style.cursor = 'pointer';
    },
    editMouseLeaveStyle() {
      document.querySelector('body').style.cursor = 'default';
    },
    checkAddExcelButtonAuthority() {
      this.addExcelButton = true;
      // checkAuthority('R681d2ec8e6ed438497570b021a989a25').then(res => {
      //   const result = res.data;
      //   this.addExcelButton = result.data;
      // }).catch(message => {
      //   this.addExcelButton = false;
      // });
    },
    checkEditExcelButtonAuthority() {
      this.editExcelButton = true;
      // checkAuthority('R681d2ec8e6ed438497570b021a989a25').then(res => {
      //   const result = res.data;
      //   this.editExcelButton = result.data;
      // }).catch(message => {
      //   this.editExcelButton = false;
      // });
    },
    checkDeleteExcelButtonAuthority() {
      this.deleteExcelButton = true;
      // checkAuthority('R681d2ec8e6ed438497570b021a989a25').then(res => {
      //   const result = res.data;
      //   this.deleteExcelButton = result.data;
      // }).catch(message => {
      //   this.deleteExcelButton = false;
      // });
    },
    clickAddExcel() {
      this.addExcelFormVisible = true;
    },
    clickEditExcel() {
      this.editExcelFormVisible = true;
    },
    clickDeleteExcel() {

    }
  },
  created() {
    this.init();
    this.checkAddExcelButtonAuthority();
    this.checkEditExcelButtonAuthority();
    this.checkDeleteExcelButtonAuthority();
  }
}
</script>

<style scoped>

</style>