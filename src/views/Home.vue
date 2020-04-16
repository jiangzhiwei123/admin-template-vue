<template>
  <div>
    <mHeader></mHeader>
    <mSidebar></mSidebar>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
import mHeader from "./Header.vue";
import mSidebar from "./Sidebar.vue";

export default {
  components: {
    mHeader,
    mSidebar
  }
};
</script>
