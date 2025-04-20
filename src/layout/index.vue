<template>
  <div class="layout_contain">
    <div
      class="layout_slider"
      :style="{
        width: LayOutSettingStore.fold ? '64px' : '260px', // 动态调整宽度
        transition: 'all 0.3s', // 添加过渡效果
      }"
    >
      <logo />
      <el-scrollbar class="scrollbar">
        <el-menu
          :default-active="route.path"
          text-color="#FFD700"
          active-text-color="#3B9BFF"
          :collapse="LayOutSettingStore.fold ? true : false"
        >
          <Menu :menuList="userStore.menuRoutes"></Menu>
        </el-menu>
      </el-scrollbar>
    </div>
    <div class="layout_tabbar" :class="{ fold: LayOutSettingStore.fold ? true : false }">
      <Tabbar />
    </div>
    <div class="layout_main" :class="{ fold: LayOutSettingStore.fold ? true : false }">
      <Main></Main>
    </div>
  </div>
</template>
<script setup lang="ts">
import logo from './logo/index.vue'
import Menu from './menu/index.vue'
import Tabbar from './tabbar/index.vue'
import useUserStore from '@/store/module/user'
import Main from './main/index.vue'
import { useRoute } from 'vue-router'
import useLayOutSettingStore from '@/store/module/setting'

const LayOutSettingStore = useLayOutSettingStore()
const userStore = useUserStore()
const route = useRoute()
</script>
<style lang="scss">
.layout_contain {
  width: 100%;
  height: 100vh;

  .layout_slider {
    color: white; //logo旁边的文字
    height: 100vh;
    width: 60px;
    transition: all 0.3s;
    background-color: $base-menu-background;
    .scrollbar {
      width: 100%;
      height: calc(100vh - $base-menu-logo-height);
      .el-menu {
        border-right: none;
        background-color: $base-menu-background;
      }
      .el-menu-item:hover {
        background-color: #495057 !important;
      }
      // 有子菜单的菜单项悬停
      .el-sub-menu__title:hover {
        background-color: #495057 !important;
      }
    }
  }
  .layout_tabbar {
    position: fixed;
    top: 0;
    left: $base-menu-width;
    height: $base-tabbar-height;
    width: calc(100% - $base-menu-width);
    transition: all 0.2s;

    &.fold {
      width: calc(100vw - $base-menu-logo-height);
      left: $base-menu-logo-height;
    }
  }
  .layout_main {
    position: absolute;
    top: $base-tabbar-height;
    left: $base-menu-width;
    padding: 20px;
    height: calc(100vh - $base-tabbar-height);
    width: calc(100% - $base-menu-width);
    overflow: scroll;
    transition: all 0.3s;
    &.fold {
      width: calc(100vw - $base-menu-logo-height);
      left: $base-menu-logo-height;
    }
  }
}
</style>
