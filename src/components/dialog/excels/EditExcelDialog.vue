<template>
  <el-dialog v-model="editExcelFormVisible" title="编辑Excel映射" @opened="init" @close="cancelEditExcel">
    <el-form :model="editExcelForm" :rules="editExcelRules" ref="editExcelForm">
      <el-row>
        <el-col :span="2"></el-col>
        <el-col :span="10">
          <span>请输入excel表格名称</span>
          <el-form-item prop="excelName">
            <el-input v-model="editExcelForm.excelName" />
          </el-form-item>
        </el-col>
        <el-col :span="2"></el-col>
        <el-col :span="10">
          <span style="text-align: left">请选择sql表格名</span>
          <el-form-item prop="sqlName">
            <el-select v-model="editExcelForm.sqlName" placeholder="请选择sql表格名" @change="getSqlColumns">
              <el-option v-for="sqlTable in sqlTables" :value="sqlTable"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-scrollbar max-height="40vh">
        <el-row v-for="(item, index) in this.editExcelForm.rows">
          <el-col :span="2"></el-col>
          <el-col :span="7">
            <span>请输入excel列名</span>
            <el-form-item :prop="'editExcelForm.rows.' + index + '.excelColumn'">
              <el-input v-model="item.excelColumn" />
            </el-form-item>
          </el-col>
          <el-col :span="1"></el-col>
          <el-col :span="6">
            <span>请选择sql列名</span>
            <el-form-item :prop="'editExcelForm.rows.' + index + '.sqlColumn'">
              <el-select v-model="item.sqlColumn" placeholder="请选择sql列名" no-data-text="请选择sql表">
                <el-option v-for="column in sqlColumns" :value="column"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="1"></el-col>
          <el-col :span="3">
            <span>是否是主键</span>
            <el-form-item :prop="'addExcelForm.rows.' + index + '.isPrimaryKey'">
              <el-switch v-model="item.isPrimaryKey" active-text="是" inactive-text="否"></el-switch>
            </el-form-item>
          </el-col>
          <el-col :span="3" style="align-items: center; display: flex; justify-content: center">
            <el-button type="primary" v-if="index === 0" @click="insertRow" circle>
              <el-icon><Plus /></el-icon>
            </el-button>
            <el-button type="danger" v-if="index !== 0" @click="deleteRow(index)" circle>
              <el-icon><Minus /></el-icon>
            </el-button>
          </el-col>
        </el-row>
      </el-scrollbar>
    </el-form>
    <template #footer>
        <span class="dialog-footer">
          <el-button @click="cancelEditExcel">取消</el-button>
          <el-button type="primary" @click="editExcel">确认</el-button>
        </span>
    </template>
  </el-dialog>
</template>

<script>
export default {
  name: "EditExcelDialog",
  data() {
    return {
      editExcelFormVisible: false,
      editExcelForm: {},
      editExcelRules: {
        excelName: [
          {required: true, message: '请输入excel表格名', trigger: 'blur'},
          {max: 16, message: '名称最长16个字符', trigger: 'blur'}
        ],
        excelColumn: [
          {required: true, message: '请输入excel表格列名', trigger: 'blur'},
          {max: 16, message: '名称最长16个字符', trigger: 'blur'}
        ],
        sqlColumn: [],
        isPrimaryKey: []
      },
      sqlTables: [],
      sqlColumns: []
    }
  },
  methods: {
    init() {
      this.getExcelInfo();
      this.getSqlTables();
    },
    getExcelInfo() {
      this.editExcelForm = {
        excelName: 'aaaa',
        sqlName: 'aaaa',
        rows: [
          {
            excelColumn: 'aaaaaaa',
            sqlColumn: 'aaaaaaa',
            isPrimaryKey: true
          }
        ]
      }
    },
    getSqlTables() {
      this.sqlTables = [
        'Table1', 'Table2', 'Table3', 'Table4'
      ];
    },
    getSqlColumns() {
      this.editExcelForm.rows = [];
      this.insertRow();
      this.sqlColumns = [
        'Column1', 'Column2', 'Column3', 'Column4'
      ];
    },
    clearEditExcelForm() {
      this.$refs['editExcelForm'].resetFields();
    },
    cancelEditExcel() {
      this.clearEditExcelForm();
      this.editExcelFormVisible = false;
      this.$emit('close-edit-excel');
      this.$emit('edit-excel-success');
    },
    editExcel() {},
    insertRow() {
      this.editExcelForm.rows.push({
        excelColumn: '',
        sqlColumn: '',
        isPrimaryKey: false
      });
    },
    deleteRow(index) {
      this.editExcelForm.rows.splice(index, 1);
    }
  },
  created() {
  }
}
</script>

<style scoped>

</style>