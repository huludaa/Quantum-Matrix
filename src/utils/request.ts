//进行axios二次封装：使用请求与响应拦截器

import axios from 'axios'
import { ElMessage } from 'element-plus'
import useUserStore from '@/store/module/user'

//第一步：利用axios对象的create方法，去创建axios实例（其他的配置：基础路径、超时的时间）
const request = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 10000,
})
//第二步：request实例添加请求与响应拦截器
request.interceptors.request.use(
  //config配置对象，headers属性请求头，经常给服务器端携带公共参数
  (config) => {
    const userStore = useUserStore()

    if (userStore.token) {
      config.headers.token = userStore.token
    }
    //返回配置对象
    return config
  },
)
//第三步：响应拦截器
request.interceptors.response.use(
  //成功回调
  (response) => {
    return response.data
  },
  //失败回调：处理http网络错误
  (error) => {
    //定义一个变量：存储网络错误信息
    let msg = ''
    const status = error.response.status
    switch (status) {
      case 401:
        msg = 'token过期'
        break
      case 403:
        msg = '无权访问'
        break
      case 404:
        msg = '请求地址错误'
        break
      case 500:
        msg = '服务器出现问题'
        break
      default:
        msg = '无网络'
    }
    //提示失败信息
    ElMessage({
      type: 'error',
      message: msg,
    })

    return Promise.reject(error)
  },
)

export default request
