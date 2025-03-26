import { defineStore } from 'pinia'
import { reqLogin, reqUserInfo, reqLogout } from '@/api/user'
import type { loginFormData, loginResponseData } from '@/api/user/type'
import { constantRoute, anyRoute, asyncRoute } from '@/router/routes'
import router from '@/router'

//引入深拷贝方法
//@ts-expect-error
import cloneDeep from 'loadsh/cloneDeep'
//用于过滤当前用户需要展示的异步路由
function filterAsyncRoute(asyncRoute: any, routes: any) {
  return asyncRoute.filter((item: any) => {
    if (routes.includes(item.name)) {
      if (item.children && item.children.length > 0) {
        item.children = filterAsyncRoute(item.children, routes)
      }
      return true
    }
  })
}
const useUserStore = defineStore('User', {
  state: () => {
    return {
      token: localStorage.getItem('TOKEN'), //用户的唯一标识
      menuRoutes: constantRoute, //菜单模块显示的路由
      username: '',
      avatar: '',
      // 存储当前用户是否包含某一个按钮
      buttons: [],
    }
  },
  actions: {
    //用户登录的方法
    async userLogin(data: loginFormData) {
      let result: loginResponseData = await reqLogin(data)
      console.log(13242)
      if (result.code === 200) {
        this.token = result.data
        localStorage.setItem('TOKEN', result.data) //本地存储一份token，防止更新时不见了
        return 'ok'
      } else {
        return Promise.reject(new Error(result.message))
      }
    },
    // 获取用户信息方法
    async userInfo() {
      let result: any = await reqUserInfo()
      if (result.code == 200) {
        this.username = result.data.name
        this.avatar = result.data.avatar
        this.buttons = result.data.buttons
        //计算当前用户需要展示的异步路由,cloneDeep处理切换用户时的菜单错误
        const userAsyncRoute = filterAsyncRoute(cloneDeep(asyncRoute), result.data.routes)
        // 菜单需要的数据

        this.menuRoutes = [...constantRoute, ...userAsyncRoute]
        //动态追加异步路由
        ;[...userAsyncRoute].forEach((route: any) => {
          router.addRoute(route)
        })
        // 在路由初始化时添加 anyRoute
        router.addRoute(anyRoute[0])

        return 'ok'
      } else {
        return Promise.reject(new Error(result.message))
      }
    },
    // 用户退出方法
    async userLogout() {
      let result = await reqLogout()
      if (result.code == 200) {
        this.username = ''
        this.avatar = ''
        this.token = ''
        localStorage.removeItem('TOKEN')
        return 'ok'
      } else {
        return Promise.reject(new Error(result.message))
      }
    },
  },
  getters: {},
})

export default useUserStore
