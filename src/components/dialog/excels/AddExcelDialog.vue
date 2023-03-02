<template>
  <el-dialog v-model="addExcelFormVisible" title="添加Excel映射" @opened="init" @close="cancelAddExcel" style="width: 60vw">
    <el-form :model="addExcelForm" :rules="addExcelRules" ref="addExcelForm">
      <el-row>
        <el-col :span="10">
          <el-form-item label="请输入excel表格名称" prop="excelName" :label-width="inputFormLabelWidth">
            <el-input v-model="addExcelForm.excelName" />
          </el-form-item>
        </el-col>
        <el-col :span="9">
          <el-form-item prop="sqlName" :label-width="selectFormLabelWidth">
            <el-select v-model="addExcelForm.sqlName" placeholder="请选择sql表格名" @change="getSqlColumns">
              <el-option v-for="sqlTable in sqlTables" :value="sqlTable"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-for="(item, index) in this.addExcelForm.rows">
        <el-col :span="10">
          <el-form-item label="请输入excel列名" prop="excelColumn" :label-width="inputFormLabelWidth">
            <el-input v-model="item.excelColumn" />
          </el-form-item>
        </el-col>
        <el-col :span="9">
          <el-form-item prop="sqlColumn" :label-width="selectFormLabelWidth">
            <el-select v-model="item.sqlColumn" placeholder="请选择sql列名" no-data-text="请选择sql表">
              <el-option v-for="column in sqlColumns" :value="column"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="5" style="align-items: center; display: flex; justify-content: center">
          <div v-if="index === 0" @click="insertRow">
            <el-icon><Plus /></el-icon>
          </div>
          <div v-if="index !== 0" @click="deleteRow(index)">
            <el-icon><Minus /></el-icon>
          </div>
        </el-col>
      </el-row>
    </el-form>
    <template #footer>
        <span class="dialog-footer">
          <el-button @click="cancelAddExcel">取消</el-button>
          <el-button type="primary" @click="addExcel">确认</el-button>
        </span>
    </template>
  </el-dialog>
</template>

<script>
export default {
  name: "AddExcelDialog",
  data() {
    return {
      addExcelFormVisible: false,
      addExcelForm: {
        excelName: '',
        sqlName: '',
        rows: []
      },
      addExcelRules: {
        excelName: [
          {required: true, message: '请输入excel表格名', trigger: 'blur'},
          {max: 16, message: '名称最长16个字符', trigger: 'blur'}
        ],
        excelColumn: [
          {required: true, message: '请输入excel表格列名', trigger: 'blur'},
          {max: 16, message: '名称最长16个字符', trigger: 'blur'}
        ],
        sqlColumn: []
      },
      sqlTables: [],
      sqlColumns: [],
      inputFormLabelWidth: '160',
      selectFormLabelWidth: '70'
    }
  },
  methods: {
    init() {
      this.getSqlTables();
      this.addExcelForm.rows.push({
        excelColumn: '',
        sqlColumn: ''
      });
    },
    getSqlTables() {
      this.sqlTables = [
        'Table1', 'Table2', 'Table3', 'Table4'
      ];
    },
    getSqlColumns() {
      this.sqlColumns = [
        'Column1', 'Column2', 'Column3', 'Column4'
      ];
    },
    clearAddExcelForm() {
      this.$refs['addExcelForm'].resetFields();
      this.addExcelForm.rows = [];
    },
    cancelAddExcel() {
      this.clearAddExcelForm();
      this.addExcelFormVisible = true;
      this.$emit('close-add-excel');
      this.$emit('add-excel-success');
    },
    addExcel() {
      this.cancelAddExcel();
    },
    insertRow() {
      this.addExcelForm.rows.push({
        excelColumn: '',
        sqlColumn: ''
      });
    },
    deleteRow(index) {
      this.addExcelForm.rows.splice(index, 1);
    }
  },
  created() {

  }
}
</script>

<style scoped>

</style>