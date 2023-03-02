<template>
  <el-dialog v-model="editExcelFormVisible" title="编辑Excel映射" @opened="init" @close="cancelEditExcel">
    <el-form :model="editExcelForm" :rules="editExcelRules" ref="editExcelForm">
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
      editExcelRules: []
    }
  },
  methods: {
    init() {},
    clearEditExcelForm() {
      this.$refs['editExcelForm'].resetFields();
    },
    cancelEditExcel() {
      this.clearEditExcelForm();
      this.editExcelFormVisible = false;
      this.$emit('close-edit-excel');
      this.$emit('edit-excel-success');
    },
    editExcel() {}
  },
  created() {
  }
}
</script>

<style scoped>

</style>