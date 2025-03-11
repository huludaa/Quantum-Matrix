<template>
  <el-card style="margin: 10px 0">
    <el-form :inline="true">
      <el-form-item label="一级分类">
        <el-select
          style="width: 200px"
          v-model="categoryStore.c1Id"
          @change="handler"
          :disabled="scene == 1 ? true : false"
        >
          <el-option
            v-for="(c1, index) in categoryStore.c1Arr"
            :key="c1.id"
            :label="c1.name"
            :value="c1.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <el-select
          style="width: 200px"
          v-model="categoryStore.c2Id"
          @change="handler1"
          :disabled="scene == 1 ? true : false"
        >
          <el-option
            v-for="(c2, index) in categoryStore.c2Arr"
            :key="c2.id"
            :label="c2.name"
            :value="c2.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类">
        <el-select
          style="width: 200px"
          v-model="categoryStore.c3Id"
          :disabled="scene == 1 ? true : false"
        >
          <el-option
            v-for="(c3, index) in categoryStore.c3Arr"
            :key="c3.id"
            :label="c3.name"
            :value="c3.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script lang="ts" setup>
import { onMounted } from 'vue'
import useCategoryStore from '@/store/module/category'
let categoryStore = useCategoryStore()
//接受父组件传过来的scene，实现禁用该组件
defineProps(['scene'])
//分类全局组件挂载完毕,通知仓库发请求获取一级分类的数据
onMounted(() => {
  getC1()
})
//通知仓库获取一级分类的方法
const getC1 = () => {
  //通知分类仓库发请求获取一级分类的数据
  categoryStore.getC1()
}

//一级分类下拉菜单的change事件（选中值就会触发）
const handler = () => {
  //当一级发生改变时，需要将二级的id清空，三级的数据arr和id清空
  categoryStore.c2Id = ''
  categoryStore.c3Id = ''
  categoryStore.c3Arr = []
  //通知仓库获取二级分类的数据
  categoryStore.getC2()
}
//二级分类下拉菜单的change事件（选中值就会触发）
const handler1 = () => {
  //当二级发生改变时，需要将三级的id清空
  categoryStore.c3Id = ''
  //通知仓库获取三级分类的数据
  categoryStore.getC3()
}
</script>
