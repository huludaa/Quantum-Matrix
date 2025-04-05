/**
 * 布局设置状态管理
 * 用于管理全局布局相关的状态，如侧边栏折叠、页面刷新等
 */
import { defineStore } from 'pinia'
const useLayOutSettingStore = defineStore('SettingStore', {
  state: () => {
    return {
      fold: false, // 控制侧边栏是否折叠
      refsh: false, // 用于触发页面组件的重新渲染
    }
  },
})
export default useLayOutSettingStore
