<template>
  <div class="login_container">
    <!-- el-row 和 el-col：用于实现栅格系统，将页面划分为 24 列。 -->
    <el-row>
      <!-- 占位：12列，影响登录表单的位置 -->
      <el-col :span="12" :xs="0"></el-col>
      <!-- 登录表单占位：12列,`:xs`:屏幕宽度小于768px时只显示登录表单的占位 -->
      <el-col :span="12" :xs="24">
        <!-- ：model绑定表单数据对象loginForm，：rules绑定校验规则rules，ref用于脚本中调用表单方法：校验 -->
        <el-form class="login_form" :model="loginForm" :rules="rules" ref="loginForms">
          <h1>Hello!</h1>
          <h3>欢迎来到量子智控运营平台</h3>
          <!-- prefix-icon添加图标 -->
          <el-form-item prop="username">
            <!-- 通过 prop 绑定字段名username，校验该字段 -->
            <el-input :prefix-icon="User" v-model="loginForm.username"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <!-- 通过 prop 绑定字段名password，校验该字段 -->
            <!-- show-password启用密码明文切换 -->
            <el-input
              type="password"
              :prefix-icon="Lock"
              v-model="loginForm.password"
              show-password
            ></el-input>
          </el-form-item>
          <el-form-item>
            <!-- 通过设置 loading 属性为 true 来显示加载中状态 -->
            <el-button :loading="load" class="login_btn" type="primary" size="100%" @click="login"
              >登录
            </el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { User, Lock } from '@element-plus/icons-vue' //图标组件
import { ElNotification } from 'element-plus' //通知组件
import { reactive, ref } from 'vue' //vue响应式api
import useUserStore from '@/store/module/user' //pinia用户状态
import { useRoute, useRouter } from 'vue-router' //路由控制
let loginForm = reactive({ username: 'admin', password: '111111' }) //定义响应式表单，初始值为测试账号
let userStore = useUserStore()
let router = useRouter()
let route = useRoute()
let load = ref(false) //控制加载状态
//校验用户名
let validatorUsername = (rules: any, value: any, callback: any) => {
  if (value.length > 0) {
    callback()
  } else {
    callback(new Error('用户名不能为空'))
  }
}
//校验密码
let validatorPassword = (rules: any, value: any, callback: any) => {
  if (value.length > 0) {
    callback()
  } else {
    callback(new Error('密码不能为空'))
  }
}
//校验规则定义，校验用户名和密码，触发条件：失焦
let rules = {
  username: [{ required: true, validator: validatorUsername, trigger: 'blur' }],
  password: [{ required: true, validator: validatorPassword, trigger: 'blur' }],
}
let loginForms = ref()
let login = async () => {
  //对整个表单进行校验，符合校验规则才发请求
  await loginForms.value.validate()
  try {
    load.value = true //开启加载状态
    await userStore.userLogin(loginForm) //调用用户登录方法
    let redirect: any = route.query.redirect
    router.push({ path: redirect || '/' }) //跳转到首页或指定路由
    ElNotification({
      type: 'success',
      message: '登录成功',
    })
    load.value = false
  } catch (error) {
    load.value = false //关闭加载状态
    ElNotification({
      type: 'error',
      message: (error as Error).message,
    })
  }
}
</script>

<style scoped lang="scss">
.login_container {
  width: 100%;
  height: 100vh;
  background: url('@/assets/images/background.jpg') no-repeat;
  background-size: cover;
  .login_form {
    width: 80%;
    position: relative;
    top: 20vh;
    background: url('@/assets/images/login_form.png') no-repeat;
    background-size: cover;
    padding: 40px;
    h1 {
      size: 40px;
      color: white;
    }
    h3 {
      size: 20px;
      color: white;
      margin: 20px 0;
    }
    .login_btn {
      width: 100%;
    }
  }
}
</style>
