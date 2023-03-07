<template>
  <el-dialog
      v-model="uploadExcelFormVisible"
      title="上传Excel文件"
      v-loading="loading"
      @opened="init"
      @close="cancelUploadExcel">
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
<!--        <template #tip>-->
<!--          <div class="el-upload__tip">-->
<!--            jpg/png files with a size less than 500kb-->
<!--          </div>-->
<!--        </template>-->
      </el-upload>
    </el-form>
    <el-scrollbar v-show="!show">
      <el-row v-for="message in errorMessages">
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
      _this.$httpAuthority.post('/excel/upload', this.forms, {headers: {'Content-Type': 'multipart/form-data'}}).then(res => {
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
        _this.$httpAuthority.get('/excel/getUploadExcelResult', {params: {taskId}}).then(res => {
          const result = res.data;
          const status = result.data.taskStatus;
          if (status === 1) {
            // 任务成功且没有异常信息
            _this.loading = true;
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
            _this.errorMessages = result.data.errorMessage;
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