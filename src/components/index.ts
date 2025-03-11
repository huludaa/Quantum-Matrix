import SvgIcon from '@/components/SvgIcon/index.vue'
import Category from '@/components/category/index.vue'
import type { App, Component } from 'vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// 定义名为 components 的对象。该对象的类型是一个键值对集合，其中键是字符串类型，值则是 Component 类型。
// 具体来说，这个对象包含了两个属性：SvgIcon 和 Pagination，它们分别对应着 Component 类型的值。
const components: { [name: string]: Component } = {
  SvgIcon,
  Category,
}

export default {
  install(app: App) {
    Object.keys(components).forEach((key: string) => {
      app.component(key, components[key])
    })
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component)
    }
  },
}
