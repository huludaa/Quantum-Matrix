<template>
  <!-- WHY: 主布局路由容器，提供页面切换过渡效果 -->
  <router-view v-slot="{ Component }">
    <transition name="fade">
      <!-- HOW: 通过动态组件渲染当前路由 -->
      <!-- 注意事项: 仅处理一级路由的过渡效果 -->
      <component :is="Component" v-if="flag" />
    </transition>
  </router-view>
</template>
<script setup lang="ts">
import useLayOutSettingStore from '@/store/module/setting'
import { ref, watch, nextTick } from 'vue'
let layoutSettingStore = useLayOutSettingStore()
let flag = ref(true)
watch(
  () => layoutSettingStore.refsh,

  () => {
    flag.value = false
    nextTick(() => {
      flag.value = true
    })
  },
)
</script>

<style scoped>
/* HOW: 定义淡入缩放过渡动画 */
.fade-enter-from {
  opacity: 0;
  transform: scale(0); /* 初始缩放比例 */
}
.fade-enter-active {
  transition: all 1s; /* 注意事项: 生产环境建议使用贝塞尔曲线优化动画 */
}
.fade-enter-to {
  opacity: 1;
  transform: scale(1); /* 最终状态 */
}
</style>
