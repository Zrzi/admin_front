<template>
  <el-dialog v-model="uploadExcelFormVisible" title="上传Excel文件" @opened="init" @close="cancelUploadExcel">
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
<!--        <template #tip>-->
<!--          <div class="el-upload__tip">-->
<!--            jpg/png files with a size less than 500kb-->
<!--          </div>-->
<!--        </template>-->
      </el-upload>
    </el-form>
<!--    <template #footer>-->
<!--        <span class="dialog-footer">-->
<!--          <el-button type="primary" @click="uploadExcel">上传文件</el-button>-->
<!--        </span>-->
<!--    </template>-->
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
      uploadExcelFormRules: {}
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
        ElMessage({
          message: '文件上传成功',
          duration: 3 * 1000,
          center: true,
          type: 'success'
        });
        _this.cancelUploadExcel();
      }).catch(message => {
        _this.fileList = [];
      });
    }
  }
}
</script>

<style scoped>

</style>