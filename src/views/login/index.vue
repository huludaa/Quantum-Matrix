/** * 登录页面组件 * 实现用户登录功能，包含表单验证、登录状态管理和路由跳转 */

<template>
  <div class="login_container">
    <!-- 使用Element Plus的栅格系统进行布局 -->
    <el-row>
      <!-- 左侧占位区域，在大屏幕下占12列 -->
      <el-col :span="12" :xs="0"></el-col>
      <!-- 右侧登录表单区域，在大屏幕下占12列，小屏幕下占24列 -->
      <el-col :span="12" :xs="24">
        <!-- 登录表单：绑定表单数据、验证规则和表单引用 -->
        <el-form class="login_form" :model="loginForm" :rules="rules" ref="loginForms">
          <h1>Hello!</h1>
          <h3>欢迎来到企管通后台管理平台</h3>

          <!-- 用户名输入框：带图标和验证 -->
          <el-form-item prop="username">
            <el-input :prefix-icon="User" v-model="loginForm.username"></el-input>
          </el-form-item>

          <!-- 密码输入框：带图标、密码显示切换和验证 -->
          <el-form-item prop="password">
            <el-input
              type="password"
              :prefix-icon="Lock"
              v-model="loginForm.password"
              show-password
            ></el-input>
          </el-form-item>

          <!-- 登录按钮：带加载状态 -->
          <el-form-item>
            <el-button :loading="load" class="login_btn" type="primary" size="100%" @click="login"
              >登录</el-button
            >
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
// 导入Element Plus图标组件
import { User, Lock } from '@element-plus/icons-vue'
// 导入Element Plus通知组件
import { ElNotification } from 'element-plus'
// 导入Vue响应式API
import { reactive, ref } from 'vue'
// 导入用户状态管理
import useUserStore from '@/store/module/user'
// 导入路由相关API
import { useRoute, useRouter } from 'vue-router'

// 定义登录表单数据，使用reactive实现响应式
const loginForm = reactive({
  username: 'admin',
  password: '111111',
})

const userStore = useUserStore() // 用户状态管理
const router = useRouter() // 路由管理
const route = useRoute() // 当前路由信息
const load = ref(false) // 加载状态

/**
 * 用户名验证函数
 * @param rules 验证规则
 * @param value 输入值
 * @param callback 回调函数
 */
const validatorUsername = (rules: any, value: any, callback: any) => {
  if (value.length > 0) {
    callback()
  } else {
    callback(new Error('用户名不能为空'))
  }
}

/**
 * 密码验证函数
 * @param rules 验证规则
 * @param value 输入值
 * @param callback 回调函数
 */
const validatorPassword = (rules: any, value: any, callback: any) => {
  if (value.length > 0) {
    callback()
  } else {
    callback(new Error('密码不能为空'))
  }
}

// 定义表单验证规则
const rules = {
  username: [{ required: true, validator: validatorUsername, trigger: 'blur' }],
  password: [{ required: true, validator: validatorPassword, trigger: 'blur' }],
}

// 表单引用，用于调用表单方法
const loginForms = ref()

/**
 * 登录处理函数
 * 包含表单验证、登录请求、状态管理和路由跳转
 */
const login = async () => {
  // 表单验证
  await loginForms.value.validate()
  try {
    load.value = true // 开启加载状态
    // 调用用户登录方法
    await userStore.userLogin(loginForm)
    // 获取重定向地址，如果没有则跳转到首页
    const redirect: any = route.query.redirect
    router.push({ path: redirect || '/' })
    // 显示登录成功提示
    ElNotification({
      type: 'success',
      message: '登录成功',
    })
    load.value = false
  } catch (error) {
    load.value = false // 关闭加载状态
    // 显示错误提示
    ElNotification({
      type: 'error',
      message: (error as Error).message,
    })
  }
}
</script>

<style scoped lang="scss">
// 登录页面容器样式
.login_container {
  width: 100%;
  height: 100vh;
  background: url('@/assets/images/background.jpg') no-repeat;
  background-size: cover;
}

// 登录表单样式
.login_form {
  position: relative;
  width: 80%;
  padding: 40px;
  top: 30vh;
  background: url('@/assets/images/login_form.png') no-repeat;
  background-size: cover;
  h1 {
    color: white;
    font-size: 40px;
    margin: 10px 0;
  }
  h3 {
    font-size: 20px;
    margin: 20px 0;
    color: white;
  }
}

// 登录按钮样式
.login_btn {
  width: 100%;
}
</style>
