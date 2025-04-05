<!--
  分类选择组件
  功能：提供三级分类的级联选择功能
  使用场景：商品管理、属性管理等需要选择分类的场景
-->
<template>
  <!-- 使用卡片组件包裹表单 -->
  <el-card style="margin: 10px 0">
    <!-- 行内表单布局 -->
    <el-form :inline="true">
      <!-- 一级分类选择器 -->
      <el-form-item label="一级分类">
        <el-select
          style="width: 200px"
          v-model="categoryStore.c1Id"
          @change="handler"
          :disabled="scene == 1 ? true : false"
        >
          <!-- 遍历一级分类数据 -->
          <el-option v-for="c1 in categoryStore.c1Arr" :key="c1.id" :label="c1.name" :value="c1.id">
          </el-option>
        </el-select>
      </el-form-item>

      <!-- 二级分类选择器 -->
      <el-form-item label="二级分类">
        <el-select
          style="width: 200px"
          v-model="categoryStore.c2Id"
          @change="handler1"
          :disabled="scene == 1 ? true : false"
        >
          <!-- 遍历二级分类数据 -->
          <el-option v-for="c2 in categoryStore.c2Arr" :key="c2.id" :label="c2.name" :value="c2.id">
          </el-option>
        </el-select>
      </el-form-item>

      <!-- 三级分类选择器 -->
      <el-form-item label="三级分类">
        <el-select
          style="width: 200px"
          v-model="categoryStore.c3Id"
          :disabled="scene == 1 ? true : false"
        >
          <!-- 遍历三级分类数据 -->
          <el-option v-for="c3 in categoryStore.c3Arr" :key="c3.id" :label="c3.name" :value="c3.id">
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import useCategoryStore from '@/store/module/category'

// 获取分类状态管理实例
const categoryStore = useCategoryStore()

// 定义组件属性
// scene: 场景标识，用于控制组件是否禁用
// 1: 禁用状态
// 其他: 启用状态
defineProps(['scene'])

/**
 * 组件挂载时的生命周期钩子
 * 初始化时获取一级分类数据
 */
onMounted(() => {
  getC1()
})

/**
 * 获取一级分类数据
 * 调用状态管理中的方法发起请求
 */
const getC1 = () => {
  categoryStore.getC1()
}

/**
 * 一级分类选择变更处理函数
 * 当选择一级分类时：
 * 1. 清空二级分类的选中值
 * 2. 清空三级分类的选中值和数据
 * 3. 获取对应的二级分类数据
 */
const handler = () => {
  // 清空下级分类数据
  categoryStore.c2Id = ''
  categoryStore.c3Id = ''
  categoryStore.c3Arr = []
  // 获取二级分类数据
  categoryStore.getC2()
}

/**
 * 二级分类选择变更处理函数
 * 当选择二级分类时：
 * 1. 清空三级分类的选中值
 * 2. 获取对应的三级分类数据
 */
const handler1 = () => {
  // 清空三级分类选中值
  categoryStore.c3Id = ''
  // 获取三级分类数据
  categoryStore.getC3()
}
</script>

<style scoped></style>
