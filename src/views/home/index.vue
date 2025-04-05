<!-- 首页组件展示用户欢迎信息和平台概览 -->

<template>
  <el-card>
    <!-- 用户信息展示区域 -->
    <div class="box">
      <!-- 用户头像 -->
      <img :src="userStore.avatar" class="picture" />
      <!-- 用户欢迎信息 -->
      <div class="text">
        <h2 class="title">{{ getTime() }}好！{{ userStore.username }}</h2>
        <P class="subtitle">企管通后台管理平台</P>
      </div>
    </div>
  </el-card>
  <!-- 欢迎图片展示区域 -->
  <div class="bottoms">
    <svg-icon name="welcome" width="600px" height="300px"></svg-icon>
  </div>
</template>

<script setup lang="ts">
// 引入用户相关的仓库,获取当前用户的头像、昵称
import useUserStore from '@/store/module/user'
// 引入时间相关的工具函数
import { getTime } from '@/utils/time'

// 获取存储用户信息的仓库对象
const userStore = useUserStore()
</script>

<style lang="scss">
// 用户信息区域样式
.box {
  display: flex;
  .picture {
    width: 100px;
    height: 100px;
    border-radius: 50%;
  }
  .text {
    margin-left: 20px;
    .title {
      font-size: 30px;
      font-weight: 900;
      margin-bottom: 30px;
    }

    .subtitle {
      font-weight: 500;
    }
  }
}

// 欢迎图片区域样式
.bottoms {
  margin-top: 50px;
  display: flex;
  justify-content: center;
}
</style>
