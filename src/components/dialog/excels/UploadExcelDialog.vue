<template>
  <el-dialog v-model="uploadFileVisible">
    <div>
      <el-form-item label="请选择文件文件">
        <el-input type="file" accept="xlsx" />
      </el-form-item>
      <el-button type="primary">上传文件</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: "UploadExcelDialog",
  data() {
    return {
      uploadFileVisible: false
    }
  }
}
</script>

<style scoped>

</style>