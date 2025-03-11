<template>
  <div class="logo" v-if="setting.logoHidden">
    <img :src="setting.logo" />
    <p v-show="!LayOutSettingStore.fold">{{ setting.title }}</p>
  </div>
</template>

<script setup lang="ts">
import setting from '@/setting'
import useLayOutSettingStore from '@/store/module/setting'
let LayOutSettingStore = useLayOutSettingStore()
</script>
<style lang="scss">
.logo {
  width: 100%;
  height: $base-menu-logo-height;
  display: flex;
  align-items: center;
  padding: 10px;
  img {
    width: 40px;
    height: 40px;
    margin-right: 10px;
  }
  p {
    size: $base-logo-title-fontSize;
  }
}
</style>
