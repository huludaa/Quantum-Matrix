// 导入路由实例
import router from '@/router'

// 导入进度条库及其样式
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'

// 导入用户状态管理相关的模块
import useUserStore from './store/module/user' // 用户状态管理
import pinia from './store' // Pinia 实例

import setting from './setting'
nprogress.configure({ showSpinner: false })

/**
 * 全局前置路由守卫
 * 在每次路由跳转前执行，用于权限验证和进度条控制
 */
router.beforeEach(async (to, from, next) => {
  document.title = `${setting.title}-${to.meta.title}`
  // 开始进度条
  nprogress.start()
  const userStore = useUserStore(pinia)

  // 从用户状态中获取 token，用于判断用户是否登录
  const token = userStore.token
  let username = userStore.username
  // 如果用户已登录（token 存在）
  if (token) {
    // 如果用户尝试访问登录页，则重定向到首页
    if (to.path == '/login') {
      next({ path: '/' })
    } else {
      username = ''
      if (username) {
        next()
      } else {
        try {
          await userStore.userInfo()
          //{ ...to }处理刷新的时候是异步路由,有可能获取到用户信息、异步路由还没有加载完毕,出现空白的效果的问题
          // 等待加载完成放行
          next({ ...to })
        } catch (error) {
          //token过期
          await userStore.userLogout()
          next({ path: '/login', query: { redirect: to.path } })
        }
      }
    }
  }
  // 如果用户未登录（token 不存在）
  else {
    // 如果用户尝试访问登录页，则放行
    if (to.path == '/login') {
      next()
    } else {
      // 否则重定向到登录页，并记录当前路径以便登录后跳转
      next({ path: '/login', query: { redirect: to.path } })
    }
  }

  // 注意：这里不需要再调用 next()，因为上面的逻辑已经调用了
  // 重复调用 next() 可能会导致路由跳转异常
})

/**
 * 全局后置路由守卫
 * 在每次路由跳转完成后执行，用于关闭进度条
 */
router.afterEach((to, from) => {
  // 结束进度条
  nprogress.done()
})
