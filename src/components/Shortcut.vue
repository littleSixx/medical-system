<template>
  <div class="shortcut">
      <div class="container">
          <slot name="insert-font"></slot>
          <div class="add-icon-container"><i class="el-icon-circle-plus add-icon"></i></div>
      </div>
      
  </div>
</template>

<script>
export default {
    name: 'Shortcut'
}
</script>

<style scoped>
.shortcut {
    width: 250px;
    height: 130px;
    border: 1px solid #dcdfe6;
    border-radius: 6px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    cursor: pointer;
    transition: background-color 0.3s;
    overflow: hidden;
}
.shortcut:hover {
    background-color: #f3f3f3;
}

.add-icon {
    font-size: 24px;
    color: #909399;
}
.add-icon-container{
    position: absolute;
    top: calc(50% - 20px);
    left: calc(50% - 12px);
    /* top: 50%; */
}
.insert-font {
    color: #303133;
    margin-top: 75px;
    text-align: center;
    transition: margin-top 0.5s;
}

.container {
    position: relative;
    top: 0;
    width: 100%;
    height: 100%;
    transition: top 0.3s;
    overflow: hidden;
}
.container:hover {
    top: -8px;
}
</style>