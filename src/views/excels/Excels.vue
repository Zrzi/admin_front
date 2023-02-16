<template>
  <div>
    <el-container>
      <el-aside style="width: 15vw; height: 100%; margin-left: 1vw; margin-right: 1vw">
        <div style="display: flex; align-items: center; justify-content: space-between; height: 5vh">
          <span style="float: left">excel表格</span>
          <span style="float: right; color: #409EFF"
                @click="clickAddExcel"
                @mouseenter="editMouseEnterStyle"
                @mouseleave="editMouseLeaveStyle">+新增excel</span>
        </div>
        <el-divider />
        <el-row
            v-for="excel in excels"
            class="row-bg"
            style="margin: 3vmin;">
          <el-col :span="3" />
          <el-col :span="6"
                  @click="clickExcel(excel.excelId)"
                  @mouseenter="editMouseEnterStyle"
                  @mouseleave="editMouseLeaveStyle">
            {{ excel.excelName }}
          </el-col>
          <el-col :span="15" />
        </el-row>
      </el-aside>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
<!--    <AddRoleDialog v-model="addRoleFormVisible" @close-add-role="this.addRoleFormVisible=false"></AddRoleDialog>-->
  </div>
</template>

<script>
export default {
  name: "Excel",
  data() {
    return {
      excels: [],
      addExcelFormVisible: false,
      addExcelForm: {},
      addExcelFormRules: {}
    }
  },
  methods: {
    init() {
      this.excels = [
        {
          excelId: 'E01',
          excelName: 'excel1'
        },
        {
          excelId: 'E02',
          excelName: 'excel2'
        },
        {
          excelId: 'E03',
          excelName: 'excel3'
        }
      ]
    },
    editMouseEnterStyle() {
      document.querySelector('body').style.cursor = 'pointer';
    },
    editMouseLeaveStyle() {
      document.querySelector('body').style.cursor = 'default';
    },
    clickAddExcel() {
      this.addRoleFormVisible = true;
    },
    clickExcel(excelId) {
      this.$router.push({path: '/home/excels/' + excelId});
    }
  },
  created() {
    this.init();
  }
}
</script>

<style scoped>

.el-container {
  padding-top: 1vh;
  margin: 0;
  height: 100%;
}

.el-aside {

}

.contents {
  padding-left: 1vw;
}

.content {

}

</style>