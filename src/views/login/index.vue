<template>
  <div class="login_container">
    <el-row>
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" xs="24">
        <el-form class="login_form" :model="loginForm" :rules="rules" ref="loginForms">
          <h1>Hello!</h1>
          <h3>欢迎来到量子智控运营平台</h3>
          <el-form-item prop="username">
            <el-input :prefix-icon="User" v-model="loginForm.username"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              type="password"
              :prefix-icon="Lock"
              v-model="loginForm.password"
              show-password
            ></el-input>
          </el-form-item>
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
import { User, Lock } from '@element-plus/icons-vue'
import { ElNotification } from 'element-plus'
import { reactive, ref } from 'vue'
import useUserStore from '@/store/module/user'
import { useRoute, useRouter } from 'vue-router'
let loginForm = reactive({ username: 'admin', password: '111111' })
let userStore = useUserStore()
let router = useRouter()
let route = useRoute()
let load = ref(false)
let validatorUsername = (rules: any, value: any, callback: any) => {
  if (value.length > 0) {
    callback()
  } else {
    callback(new Error('用户名不能为空'))
  }
}
let validatorPassword = (rules: any, value: any, callback: any) => {
  if (value.length > 0) {
    callback()
  } else {
    callback(new Error('密码不能为空'))
  }
}
let rules = {
  username: [{ validator: validatorUsername, trigger: 'blur' }],
  password: [{ validator: validatorPassword, trigger: 'blur' }],
}
let loginForms = ref()
let login = async () => {
  //对整个表单进行校验，符合校验规则才发请求
  await loginForms.value.validate()
  try {
    load.value = true
    await userStore.userLogin(loginForm)
    let redirect: any = route.query.redirect
    router.push({ path: redirect || '/' })
    ElNotification({
      type: 'success',
      message: '登录成功',
    })
    load.value = false
  } catch (error) {
    load.value = false
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
