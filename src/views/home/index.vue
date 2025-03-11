<template>
  <el-card>
    <div class="box">
      <img :src="userStore.avatar" class="picture" />
      <div class="text">
        <h2 class="title">{{ getTime() }}好！{{ userStore.username }}</h2>
        <P class="subtitle">量子智控运营平台</P>
      </div>
    </div>
  </el-card>
  <div class="bottoms">
    <svg-icon name="welcome" width="600px" height="300px"></svg-icon>
  </div>
</template>

<script setup lang="ts">
//引入用户相关的仓库,获取当前用户的头像、昵称
import useUserStore from '@/store/module/user'
//引入时间相关的仓库
import { getTime } from '@/utils/time'
//获取存储用户信息的仓库对象
let userStore = useUserStore()
</script>

<style lang="scss">
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
.bottoms {
  margin-top: 50px;
  display: flex;
  justify-content: center;
}
</style>
