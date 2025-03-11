<template>
  <el-button circle icon="Refresh" size="default" @click="updateRefsh"></el-button>
  <el-button circle icon="FullScreen" size="default" @click="fullScreen"></el-button>
  <el-popover placement="bottom" title="主题设置" :width="280" trigger="click">
    <el-form>
      <!-- :teleported="false"将 teleported 属性绑定到一个布尔值，以控制元素是否被挂载到其他位置。
        如果 teleported 属性设置为 true，则元素可能会被挂载到其他位置，如挂载到文档的 body 上；
        如果设置为 false，则元素可能不会离开其原始位置。 -->
      <el-form-item label="主题颜色">
        <el-color-picker
          @change="setColor"
          v-model="color"
          size="small"
          show-alpha
          :predefine="predefineColors"
          :teleported="false"
        />
      </el-form-item>
      <el-form-item label="暗黑模式"
        ><el-switch
          @change="changeDark"
          v-model="dark"
          inline-prompt
          active-icon="MoonNight"
          inactive-icon="Sunny"
      /></el-form-item>
    </el-form>
    <template #reference>
      <el-button circle icon="Setting" size="default"></el-button>
    </template>
  </el-popover>
  <img
    :src="userStore.avatar"
    style="width: 30px; height: 30px; margin: 0 10px; border-radius: 50%"
  />
  <el-dropdown>
    <span class="el-dropdown-link">
      <span>{{ userStore.username }}</span>
      <el-icon class="el-icon--right">
        <arrow-down />
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import useLayOutSettingStore from '@/store/module/setting'
import useUserStore from '@/store/module/user'
import { useRouter, useRoute } from 'vue-router'
let layoutSettingStore = useLayOutSettingStore()
let userStore = useUserStore()
let router = useRouter()
let route = useRoute()
//收集开关的数据
let dark = ref<boolean>(false)
//刷新
const updateRefsh = () => {
  layoutSettingStore.refsh = !layoutSettingStore.refsh
}
//全屏控制
const fullScreen = () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen()
  } else {
    document.exitFullscreen()
  }
}
//退出
const logout = async () => {
  await userStore.userLogout()
  router.push({ path: '/login', query: { redirect: route.path } })
}

//颜色组件组件的数据
const color = ref('rgba(255, 69, 0, 0.68)')
const predefineColors = ref([
  '#ff4500',
  '#ff8c00',
  '#ffd700',
  '#90ee90',
  '#00ced1',
  '#1e90ff',
  '#c71585',
  'rgba(255, 69, 0, 0.68)',
  'rgb(255, 120, 0)',
  'hsv(51, 100, 98)',
  'hsva(120, 40, 94, 0.5)',
  'hsl(181, 100%, 37%)',
  'hsla(209, 100%, 56%, 0.73)',
  '#c7158577',
])

//主题颜色的设置
const setColor = () => {
  //通知js修改根节点的样式对象的属性与属性值
  const html = document.documentElement
  html.style.setProperty('--el-color-primary', color.value)
}

//switch开关的chang事件进行暗黑模式的切换
const changeDark = () => {
  //获取HTML根节点
  let html = document.documentElement
  //判断HTML标签是否有类名dark
  dark.value ? (html.className = 'dark') : (html.className = '')
}
</script>
