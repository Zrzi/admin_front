<template>
  <el-dialog v-model="editExcelFormVisible" title="编辑Excel映射" @opened="init" @close="cancelEditExcel">
    <el-form :model="editExcelForm" :rules="editExcelRules" ref="editExcelForm" style="text-align: left">
      <el-row>
        <el-col :span="2"></el-col>
        <el-col :span="8">
          <span>请输入excel表格名称</span>
          <el-form-item prop="excelName">
            <el-input :readonly="true" v-model="editExcelForm.excelName" />
          </el-form-item>
        </el-col>
        <el-col :span="2"></el-col>
        <el-col :span="8">
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
          <el-col :span="1"></el-col>
          <el-col :span="7">
            <span>请输入excel列名</span>
            <el-form-item :prop="'editExcelForm.rows.' + index + '.excelColumn'">
              <el-input v-model="item.excelColumn" />
            </el-form-item>
          </el-col>
          <el-col :span="1"></el-col>
          <el-col :span="7">
            <span>请选择sql列名</span>
            <el-form-item :prop="'editExcelForm.rows.' + index + '.sqlColumn'">
              <el-select v-model="item.sqlColumn" placeholder="请选择sql列名" no-data-text="请选择sql表">
                <el-option v-for="column in nullableList" :value="column"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="1"></el-col>
          <el-col :span="4">
            <span>是否需要特殊处理</span>
            <el-form-item :prop="'editExcelForm.rows.' + index + '.isSpecial'">
              <el-switch v-model="item.isSpecial"
                         inline-prompt
                         active-text="是"
                         inactive-text="否"
                         size="default" />
            </el-form-item>
          </el-col>
          <el-col :span="3" style="align-items: center; display: flex; justify-content: center">
            <el-button type="primary" v-if="index === 0" @click="insertRow('', '', true, false)" circle>
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
            <el-radio-group v-model="this.editExcelForm.isCover">
              <el-radio :label="true">是</el-radio>
              <el-radio :label="false">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
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
import {ElMessage} from "element-plus";

export default {
  name: "EditExcelDialog",
  data() {
    return {
      excelId: '',
      editExcelFormVisible: false,
      editExcelForm: {
        excelId: '',
        excelName: '',
        sqlName: '',
        rows: [],
        isCover: false
      },
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
        isCover: [],
        isSpecial: []
      },
      sqlTables: [],
      nonNullList: [],
      nullableList: []
    }
  },
  methods: {
    init() {
      this.excelId = this.$store.state.excelId;
      let sqlNamePromise = this.getExcelInfo();
      sqlNamePromise.then(res => {
        this.getSqlTables();
        this.getSqlColumnsInit();
      })
    },
    async getExcelInfo() {
      let _this = this;
      let excelId = this.excelId;
      try {
        const res = await _this.$httpAuthority.get('/authority/excel/getExcelByExcelId', {params: {excelId: excelId}});
        const result = res.data;
        const data = result.data;
        this.editExcelForm.excelId = data.excelId;
        this.editExcelForm.excelName = data.excelName;
        this.editExcelForm.sqlName = data.sqlName;
        this.editExcelForm.isCover = data.isCover;
        let tempNonNullList = data.nonNullList;
        for (let i=0; i<tempNonNullList.length; ++i) {
          let info = tempNonNullList[i];
          this.insertRow(info.excelColumn, info.sqlColumn, false, info.isSpecial);
          this.nonNullList.push(info.sqlColumn)
        }
        let tempNullableList = data.nullableList;
        for (let i=0; i<tempNullableList.length; ++i) {
          let info = tempNullableList[i];
          this.insertRow(info.excelColumn, info.sqlColumn, true, info.isSpecial);
          this.nullableList.push(info.sqlColumn)
        }
      } catch (message) {
        this.editExcelForm = {
          excelId: '',
          excelName: '',
          sqlName: '',
          rows: []
        };
        this.nullableList = [];
        this.nonNullList = [];
      }
    },
    getSqlTables() {
      let _this = this;
      _this.$httpAuthority.get('/authority/excel/getSqlTables').then(res => {
        const result = res.data;
        _this.sqlTables = result.data;
      }).catch(message => {
        _this.sqlTables = [];
      });
    },
    getSqlColumns() {
      this.editExcelForm.rows = [];
      let _this = this;
      let sqlTableName = this.editExcelForm.sqlName;
      _this.$httpAuthority.get('/authority/excel/getSqlColumns', {params: {sqlTableName: sqlTableName}}).then(res => {
        const result = res.data;
        const data = result.data;
        _this.nonNullList = data.nonNullList;
        for (let i=0; i<_this.nonNullList.length; ++i) {
          _this.insertRow('', _this.nonNullList[i], false, false);
        }
        _this.nullableList = data.nullableList;
      }).catch(message => {
        _this.nonNullList = [];
        _this.nullableList = [];
      });
    },
    getSqlColumnsInit() {
      let _this = this;
      let sqlTableName = this.editExcelForm.sqlName;
      _this.$httpAuthority.get('/authority/excel/getSqlColumns', {params: {sqlTableName: sqlTableName}}).then(res => {
        const result = res.data;
        const data = result.data;
        _this.nullableList = data.nullableList;
      }).catch(message => {
        _this.nonNullList = [];
        _this.nullableList = [];
      });
    },
    clearEditExcelForm() {
      this.$refs['editExcelForm'].resetFields();
      this.editExcelForm.rows = [];
      this.nonNullList = [];
      this.nullableList = [];
    },
    cancelEditExcel() {
      this.clearEditExcelForm();
      this.editExcelFormVisible = false;
      this.$emit('close-edit-excel');
    },
    editExcel() {
      let _this = this;
      let editExcelForm = this.editExcelForm;
      _this.$refs['editExcelForm'].validate(valid => {
        if (valid) {
          _this.$httpAuthority.post('/authority/excel/update', editExcelForm).then(res => {
            ElMessage({
              message: '编辑成功',
              duration: 3 * 1000,
              center: true,
              type: 'success'
            });
            _this.$emit('edit-excel-success');
            _this.cancelEditExcel();
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
    insertRow(excelColumn, sqlColumn, nullable, isSpecial) {
      this.editExcelForm.rows.push({
        excelColumn: excelColumn,
        sqlColumn: sqlColumn,
        nullable: nullable,
        isSpecial: isSpecial
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