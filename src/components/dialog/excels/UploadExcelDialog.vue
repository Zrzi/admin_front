<template>
  <el-dialog
      v-model="uploadExcelFormVisible"
      title="上传Excel文件"
      v-loading="loading"
      @opened="init"
      @close="cancelUploadExcel"
      style="width: 60vw">
    <el-form style="text-align: left" v-show="show">
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
    <el-scrollbar max-height="40vh" v-show="!show">
      <el-row v-for="message in errorMessages" style="text-align: left">
        <el-col :span="2"></el-col>
        <el-col :span="20">{{ message }}</el-col>
        <el-col :span="2"></el-col>
      </el-row>
    </el-scrollbar>
  </el-dialog>
</template>

<script>
import {ElMessage} from "element-plus";

export default {
  name: "UploadExcelDialog",
  data() {
    return {
      uploadExcelFormVisible: false,
      fileList: [],
      uploadExcelFormRules: {},
      show: true,
      loading: false,
      taskId: '',
      errorMessages: []
    }
  },
  methods: {
    init() {},
    cancelUploadExcel() {
      this.fileList = [];
      this.errorMessages = [];
      this.show = true;
      this.uploadExcelFormVisible = false;
      this.$emit('close-upload-excel');
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
    handleBeforeUpload(file) {
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
      const fileSize = file.size / (1024 * 1024);
      if (fileSize > 5) {
        ElMessage({
          message: '文件大于5MB',
          duration: 3 * 1000,
          center: true,
          type: 'error'
        });
        return false;
      }
      return true;
    },
    uploadExcel(params) {
      const file = params.file;
      this.forms = new FormData();
      this.forms.append('file', file);
      let _this = this;
      _this.$httpAuthority.post('/authority/excel/upload', this.forms, {headers: {'Content-Type': 'multipart/form-data', 'Upload': true}}).then(res => {
        const result = res.data;
        _this.taskId = result.data;
        _this.show = false;
        _this.loading = true;
        _this.getUploadExcelResult();
      }).catch(message => {
        _this.fileList = [];
      });
    },
    getUploadExcelResult() {
      let _this = this;
      let taskId = _this.taskId;
      let interval = setInterval(() => {
        _this.$httpAuthority.get('/authority/excel/getUploadExcelResult', {params: {taskId}}).then(res => {
          const result = res.data;
          const status = result.data.taskStatus;
          const insert = result.data.taskSuccessInsert;
          const update = result.data.taskSuccessUpdate;
          let message = '成功插入' + insert + '条记录，修改' + update + '条记录。'
          if (status === 1) {
            // 任务成功且没有异常信息
            _this.loading = true;
            _this.errorMessages = [message];
            clearInterval(interval);
            ElMessage({
              message: '文件上传成功',
              duration: 3 * 1000,
              center: true,
              type: 'success'
            });
          } else if (status === 2) {
            // 任务完成且有异常信息
            _this.loading = true;
            clearInterval(interval);
            _this.errorMessages = [message];
            for (let index=0; index<result.data.errorMessage.length; ++index) {
              _this.errorMessages.push(result.data.errorMessage[index]);
            }
          }
        });
      }, 1000);
      this.fileList = [];
    }
  }
}
</script>

<style scoped>

</style>