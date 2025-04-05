// 导入自定义组件
import Category from '@/components/category/index.vue'
import SvgIcon from '@/components/SvgIcon/index.vue'
// 导入 Vue 的类型定义
import type { App, Component } from 'vue'
// 导入 Element Plus 的所有图标组件
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// 定义名为 components 的对象。键是组件名称，值是组件本身
const components: { [name: string]: Component } = {
  Category, // 相当于 Category: Category
  SvgIcon,
}

export default {
  // install 是 Vue 插件的标准接口
  // app 是 Vue 应用实例
  install(app: App) {
    // 注册自定义组件
    Object.keys(components).forEach((key: string) => {
      // 全局注册组件
      // key 是组件名称
      // components[key] 是组件本身
      app.component(key, components[key])
    })
    // 注册 Element Plus 图标组件
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      // 遍历所有图标组件并注册
      app.component(key, component)
    }
  },
}
