<template>
  {{ this.excelId }}
</template>

<script>
export default {
  name: "Excel",
  data() {
    return {
      excelId: 0
    }
  },
  methods: {
    init(excelId) {}
  },
  beforeRouteUpdate(to, from) {
    this.excelId = to.params.id;
    this.init(this.excelId);
  },
  mounted() {
    this.excelId = this.$route.params.id;
    this.init(this.excelId);
  }
}
</script>

<style scoped>

</style>