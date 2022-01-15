<template>
  <div class="page-header">
      <el-page-header @back="goBack" content="详情" class="page-header"></el-page-header>
  </div>
</template>

<script>
export default {
    name: 'PageHeader',
    methods: {
        goBack() {
            this.$router.back();
        }
    }
}
</script>

<style scoped>
.page-header {
    margin-left: 115px;
    height: 60px;
    line-height: 60px;
    margin-bottom: 10px;
}
</style>