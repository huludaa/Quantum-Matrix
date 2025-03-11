<template>
  <div class="tabbar">
    <div class="tabbar_left">
      <Breadcrumb />
    </div>
    <div class="tabbar_right">
      <Setting />
    </div>
  </div>
</template>
<script setup lang="ts">
import Breadcrumb from './breadcrumb/index.vue'
import Setting from './setting/index.vue'
</script>
<style lang="scss">
.tabbar {
  width: 100%;
  height: 100%;
  justify-content: space-between;
  display: flex;
  .tabbar_left {
    display: flex;
    margin-left: 10px;
    align-items: center;
  }
  .tabbar_right {
    display: flex;
    align-items: center;
  }
}
</style>
