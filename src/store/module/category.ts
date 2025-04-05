import { defineStore } from 'pinia'
import { reqC1, reqC2, reqC3 } from '@/api/product/attr'
import type { CateogoryResponseData } from '@/api/product/attr/type'
import type { CategoryState } from './types/type'
const useCategoryStore = defineStore('Category', {
  state: (): CategoryState => {
    return {
      //存储一级分类的数据
      c1Arr: [],
      //存储一级分类的ID
      c1Id: '',
      //存储二级分类的数据
      c2Arr: [],
      //存储二级分类的ID
      c2Id: '',
      //存储三级分类的数据
      c3Arr: [],
      //存储三级分类的ID
      c3Id: '',
    }
  },

  actions: {
    async getC1() {
      const result: CateogoryResponseData = await reqC1()
      if (result.code == 200) {
        this.c1Arr = result.data
      }
    },
    async getC2() {
      const result: CateogoryResponseData = await reqC2(this.c1Id)
      if (result.code == 200) {
        this.c2Arr = result.data
      }
    },
    async getC3() {
      const result: CateogoryResponseData = await reqC3(this.c2Id)
      if (result.code == 200) {
        this.c3Arr = result.data
      }
    },
  },

  getters: {},
})
export default useCategoryStore
