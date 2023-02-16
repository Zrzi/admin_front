<template>
  <el-dialog v-model="addTeacherFormVisible">

  </el-dialog>
</template>

<script>
export default {
  name: "AddTeacherDialog",
  data() {
    return {
      addTeacherFormVisible: false
    }
  },
  methods: {
    cancelAddTeacher() {
      this.$emit('close-add-teacher');
    }
  }
}
</script>

<style scoped>

</style>