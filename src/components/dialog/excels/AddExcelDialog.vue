<template>
  <el-dialog
      title="添加Excel映射"
      v-model="addExcelFormVisible"
      @opened="init" @close="cancelAddExcel"
      style="width: 60vw">
    <div v-show="state === 0">
      <el-form style="text-align: left">
        <el-upload
            v-model:file-list="fileList"
            accept=".xls, .xlsx"
            action="#"
            :auto-upload="true"
            :multiple="false"
            :show-file-list="false"
            :limit="1"
            :on-exceed="handleExceed"
            :on-remove="handleRemove"
            :before-upload="handleBeforeUpload"
            :http-request="uploadExcel"
            drag>
          <el-icon><UploadFilled /></el-icon>
          <div class="el-upload__text">
            将文件拖拽至此或<em>点击选择文件</em>
          </div>
          <template #tip>
            <div class="el-upload__tip">
              只允许上传excel文件，大小不得超过5MB！
            </div>
          </template>
        </el-upload>
      </el-form>
    </div>
    <div v-show="state === 1">
      <el-form :model="addExcelForm" :rules="addExcelRules" ref="addExcelForm" style="text-align: left">
        <el-row>
          <el-col :span="2"></el-col>
          <el-col :span="8">
            <span>请输入excel表格名称</span>
            <el-form-item prop="excelName">
              <el-input v-model="addExcelForm.excelName" disabled />
            </el-form-item>
          </el-col>
          <el-col :span="2"></el-col>
          <el-col :span="8">
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
            <el-col :span="8">
              <span>请输入excel列名</span>
              <el-form-item :prop="'addExcelForm.rows.' + index + '.excelColumn'">
                <el-select v-model="item.excelColumn" placeholder="请选择excel列名">
                  <el-option v-for="key in keys" :value="key"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="2"></el-col>
            <el-col :span="8">
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
    </div>
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
import XLSX from "xlsx";

export default {
  name: "AddExcelDialog",
  data() {
    return {
      addExcelFormVisible: false,
      state: 0,
      fileList: [],
      title: '',
      keys: [],

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
      this.nonNullList = [];
      this.nullableList = [];
      this.fileList = [];
      this.title = '';
      this.keys = [];
      this.state = 0;
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
    },
    handleExceed(files) {
      ElMessage({
        message: '只能选择一个文件',
        duration: 3 * 1000,
        center: true,
        type: 'error'
      });
    },
    handleRemove(file, files) {},
    async handleBeforeUpload(file) {
      const fileSuffix = file.name.substring(file.name.lastIndexOf('.') + 1);
      if (fileSuffix === 'xls' || fileSuffix !== 'xlsx') {
        ElMessage({
          message: '文件类型错误',
          duration: 3 * 1000,
          center: true,
          type: 'error'
        });
        return false;
      }
      /*const fileSize = file.size / (1024 * 1024);
      if (fileSize > 5) {
        ElMessage({
          message: '文件大于5MB',
          duration: 3 * 1000,
          center: true,
          type: 'error'
        });
        return false;
      }*/
      const result = await this.fileToXce(file);
      this.title = result.title;
      this.keys = result.keys;
      if (this.title === '' || this.keys.length === 0) {
        return false;
      }
      this.addExcelForm.excelName = this.title;
      return true;
    },
    uploadExcel(params) {
      let _this = this;
      let excelName = this.title;
      _this.$httpAuthority.get('/excel/checkExistExcelName', {params: {excelName}}).then(res => {
        const result = res.data;
        if (result.data) {
          _this.state = 1;
        } else {
          ElMessage({
            message: 'Excel配置已经存在',
            duration: 3 * 1000,
            center: true,
            type: 'error'
          });
          _this.fileList = [];
          _this.title = '';
          _this.keys = [];
        }
      }).catch(message => {
        _this.fileList = [];
        _this.title = '';
        _this.keys = [];
      });
    },
    fileToXce(file) {
      let _this = this;
      return new Promise((resolve) => {
        let result = {title: '', keys: []};
        const reader = new FileReader();
        reader.onload = function (e) {
          const data = e.target.result;
          const workBook = XLSX.read(data, {type: 'array'});
          // 默认只读取第一个sheet
          let sheet = workBook.Sheets[workBook.SheetNames[0]];
          let parsedData = XLSX.utils.sheet_to_json(sheet, {header: 1});
          let titleRead = false;
          let keyRead = false;
          for (let index=0; index<parsedData.length; ++index) {
            const data = parsedData[index];
            if (data.length !== 0) {
              if (!titleRead) {
                result.title = data[0];
                titleRead = true;
              } else if (!keyRead) {
                result.keys = data;
                keyRead = true;
              }
              if (keyRead) {
                break;
              }
            }
          }
          resolve(result);
        }
        reader.readAsArrayBuffer(file);
      })
    }
  },
  created() {

  }
}
</script>

<style scoped>

</style>