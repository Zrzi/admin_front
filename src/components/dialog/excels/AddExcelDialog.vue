<template>
  <el-dialog v-model="addExcelFormVisible" title="添加Excel映射" @opened="init" @close="cancelAddExcel" style="width: 60vw">
    <el-form :model="addExcelForm" :rules="addExcelRules" ref="addExcelForm" style="text-align: left">
      <el-row>
        <el-col :span="2"></el-col>
        <el-col :span="10">
          <span>请输入excel表格名称</span>
          <el-form-item prop="excelName">
            <el-input v-model="addExcelForm.excelName" />
          </el-form-item>
        </el-col>
        <el-col :span="2"></el-col>
        <el-col :span="10">
          <span style="text-align: left">请选择sql表格名</span>
          <el-form-item prop="sqlName">
            <el-select v-model="addExcelForm.sqlName" placeholder="请选择sql表格名" @change="getSqlColumns">
              <el-option v-for="sqlTable in sqlTables" :value="sqlTable"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-scrollbar max-height="40vh">
        <el-row v-for="(item, index) in this.addExcelForm.rows">
          <el-col :span="2"></el-col>
          <el-col :span="7">
            <span>请输入excel列名</span>
            <el-form-item :prop="'addExcelForm.rows.' + index + '.excelColumn'">
              <el-input v-model="item.excelColumn" />
            </el-form-item>
          </el-col>
          <el-col :span="1"></el-col>
          <el-col :span="6">
            <span>请选择sql列名</span>
            <el-form-item :prop="'addExcelForm.rows.' + index + '.sqlColumn'">
              <el-select v-model="item.sqlColumn" placeholder="请选择sql列名" no-data-text="请选择sql表">
                <el-option v-for="column in nullableList" :value="column"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="1"></el-col>
          <el-col :span="3" style="align-items: center; display: flex; justify-content: center">
            <el-button type="primary" v-if="index === 0" @click="insertRow('', true)" circle>
              <el-icon><Plus /></el-icon>
            </el-button>
            <el-button type="danger" v-if="index !== 0 && item.nullable" @click="deleteRow(index)" circle>
              <el-icon><Minus /></el-icon>
            </el-button>
          </el-col>
        </el-row>
      </el-scrollbar>
      <el-row>
        <el-col :span="2"></el-col>
        <el-col :span="10">
          <span>插入数据出现重复时，是否覆盖</span>
          <el-form-item prop="isCover">
            <el-radio-group v-model="this.addExcelForm.isCover">
              <el-radio :label="true">是</el-radio>
              <el-radio :label="false">否</el-radio>
            </el-radio-group>
          </el-form-item>
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
import {ElMessage} from "element-plus";

export default {
  name: "AddExcelDialog",
  data() {
    return {
      addExcelFormVisible: false,
      addExcelForm: {
        excelName: '',
        sqlName: '',
        rows: [],
        isCover: false
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
        sqlColumn: [],
        isCover: []
      },
      sqlTables: [],
      nonNullList: [],
      nullableList: [],
      inputFormLabelWidth: '160',
      selectFormLabelWidth: '70'
    }
  },
  methods: {
    init() {
      this.getSqlTables();
    },
    getSqlTables() {
      let _this = this;
      _this.$httpAuthority.get('/excel/getSqlTables').then(res => {
        const result = res.data;
        _this.sqlTables = result.data;
      }).catch(message => {
        _this.sqlTables = [];
      });
    },
    getSqlColumns() {
      this.addExcelForm.rows = [];
      let _this = this;
      let sqlTableName = this.addExcelForm.sqlName;
      _this.$httpAuthority.get('/excel/getSqlColumns', {params: {sqlTableName: sqlTableName}}).then(res => {
        const result = res.data;
        const data = result.data;
        _this.nonNullList = data.nonNullList;
        for (let i=0; i<_this.nonNullList.length; ++i) {
          _this.insertRow(_this.nonNullList[i], false);
        }
        _this.nullableList = data.nullableList;
      }).catch(message => {
        _this.nonNullList = [];
        _this.nullableList = [];
      });
    },
    clearAddExcelForm() {
      this.$refs['addExcelForm'].resetFields();
      this.addExcelForm.rows = [];
    },
    cancelAddExcel() {
      this.clearAddExcelForm();
      this.addExcelFormVisible = true;
      this.$emit('close-add-excel');
    },
    addExcel() {
      let _this = this;
      let addExcelForm = this.addExcelForm;
      _this.$refs['addExcelForm'].validate(valid => {
        if (valid) {
          _this.$httpAuthority.post('/excel/add', addExcelForm).then(res => {
            ElMessage({
              message: '添加成功',
              duration: 3 * 1000,
              center: true,
              type: 'success'
            });
            _this.$emit('add-excel-success');
            _this.cancelAddExcel();
          });
        } else {
          ElMessage({
            message: '输入错误',
            duration: 3 * 1000,
            center: true,
            type: 'error'
          });
        }
      });
    },
    insertRow(sqlColumn, nullable) {
      this.addExcelForm.rows.push({
        excelColumn: '',
        sqlColumn: sqlColumn,
        nullable: nullable
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