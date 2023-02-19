<template>

</template>

<script>
export default {
  name: "GlobalFunction",
  methods: {
    checkAuthority(resourceId) {
      if (!resourceId) {
        return Promise.reject('resourceId为空');
      }
      let _this = this;
      // 返回promise对象
      return _this.$httpAuthority.get('/checkAuthority', {params: {resourceId}});
    }
  }
}
</script>

<style scoped>

</style>