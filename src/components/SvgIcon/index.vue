<template>
  <div>
    <!-- svg:图标外层容器节点,内部需要与use标签结合使用 -->
    <svg :style="{ width: width, height: height }">
      <!-- xlink:href执行用一个图标,属性值务必#icon-图标名字,use标签fill属性可以设置图标的颜色 -->
      <use :xlink:href="prefix + name" :fill="color"></use>
    </svg>
  </div>
</template>

<script setup lang="ts">
defineProps({
  //xlink:href属性值的前缀
  prefix: {
    type: String,
    default: '#icon-',
  },
  //svg矢量图的名字
  name: String,
  //svg图标的颜色
  color: {
    type: String,
    default: '',
  },
  //svg宽度
  width: {
    type: String,
    default: '16px',
  },
  //svg高度
  height: {
    type: String,
    default: '16px',
  },
})
</script>
<style scoped></style>
