<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>
<style lang="less">
// 图片预览关闭按钮样式修改
.el-image-viewer__close {
  color: #fff;
}
</style>
