<template>
  <!-- WHY: 主布局路由容器，提供页面切换过渡效果 -->
  <router-view v-slot="{ Component }">
    <transition name="fade">
      <!-- component 是动态组件，用于动态渲染不同的组件 -->
      <!-- :is 属性指定要渲染的组件 -->
      <!-- v-if="flag" 用于控制组件的销毁和重建，触发过渡效果 -->
      <component :is="Component" v-if="flag" />
    </transition>
  </router-view>
</template>
<script setup lang="ts">
import useLayOutSettingStore from '@/store/module/setting' // 导入布局设置状态管理
import { ref, watch, nextTick } from 'vue'
// 创建布局设置状态管理的实例
const layoutSettingStore = useLayOutSettingStore()
// 创建响应式变量 flag，用于控制组件的显示和隐藏
const flag = ref(true)
// 使用 watch 监听 layoutSettingStore.refsh 的变化
watch(
  () => layoutSettingStore.refsh,

  () => {
    // 当 refsh 变化时，先将 flag 设为 false，销毁组件
    flag.value = false
    // 使用 nextTick 确保 DOM 更新后再将 flag 设为 true，重建组件
    nextTick(() => {
      flag.value = true
    })
  },
)
</script>

<style scoped>
/* HOW: 定义淡入缩放过渡动画 */
.fade-enter-from {
  opacity: 0; /* 完全透明 */
  transform: scale(0); /* 初始缩放比例0 */
}
/* 定义进入过渡的过程 */
.fade-enter-active {
  transition: all 1s; /* 所有属性变化持续 1 秒 */
}
/* 定义进入过渡的结束状态 */
.fade-enter-to {
  opacity: 1; /* 完全不透明 */
  transform: scale(1); /* 最终状态 */
}
</style>
