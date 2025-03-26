import { createApp } from 'vue'
//引入根组件
import App from './App.vue'
const app = createApp(App)

//获取element-plus插件与样式
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
//配置element-plus国际化
//@ts-ignore
import zhCn from 'element-plus/es/locale/lang/zh-cn'
//安装element-plus插件
app.use(ElementPlus, {
  locale: zhCn, //配置element-plus国际化
})

//svg插件需要配置代码
import 'virtual:svg-icons-register'

// 引入全局组件
import globalComponent from './components/index'
// 使用 app.use() 注册插件或全局组件
app.use(globalComponent)

//引入模板的全局样式
import './styles/index.scss'

import '@/mock/index' // 确保 MockJS 配置文件被加载
//暗黑模式需要的样式
import 'element-plus/theme-chalk/dark/css-vars.css'
import router from './router'
import pinia from './store'
import './permission'
//引入自定义指令文件
import { isHasButton } from '@/directive/has'
isHasButton(app)
app.use(router)
app.use(pinia)
//将应用挂载到挂载点
app.mount('#app')
