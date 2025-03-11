<template>
  <el-icon style="margin-right: 10px" @click="changIcon" :size="20">
    <component :is="LayOutSettingStore.fold ? 'Fold' : 'Expand'"></component>
  </el-icon>
  <el-breadcrumb separator-icon="ArrowRight">
    <el-breadcrumb-item
      v-for="(item, index) in route.matched"
      :key="index"
      v-show="item.meta.title"
      :to="item.path"
    >
      <el-icon :size="20">
        <component :is="item.meta.icon"></component>
      </el-icon>
      <span style="margin-left: 6px; font-size: 16px">{{ item.meta.title }} </span>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>
<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import useLayOutSettingStore from '@/store/module/setting'
let LayOutSettingStore = useLayOutSettingStore()

const changIcon = () => {
  LayOutSettingStore.fold = !LayOutSettingStore.fold
}
let route = useRoute()
</script>
