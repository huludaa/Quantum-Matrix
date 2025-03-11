<template>
  <div class="layout_contain">
    <div class="layout_slider">
      <logo />
      <el-scrollbar class="scrollbar">
        <el-menu
          :default-active="route.path"
          text-color="skyblue"
          active-text-color="yellow"
          :collapse="LayOutSettingStore.fold ? true : false"
          background-color="$base-menu-background"
        >
          <!-- TODO: collapse悬浮窗口背景颜色怎么修改 -->
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
let LayOutSettingStore = useLayOutSettingStore()
let userStore = useUserStore()
let route = useRoute()
</script>
<style lang="scss">
.layout_contain {
  width: 100%;
  height: 100vh;

  .layout_slider {
    background-color: $base-menu-background;
    color: white; //logo旁边的文字
    height: 100vh;
    width: $base-menu-width;
    transition: all 0.2s;
    .scrollbar {
      width: 100%;
      height: calc(100vh - $base-menu-logo-height);
      .el-menu {
        border-right: none;
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
    transition: all 0.2s;
    &.fold {
      width: calc(100vw - $base-menu-logo-height);
      left: $base-menu-logo-height;
    }
  }
}
</style>
