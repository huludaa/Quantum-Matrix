import type { RouteRecordRaw } from 'vue-router'
import type { CategoryObj } from '@/api/product/attr/type'
export interface UserState {
  menuRoutes: RouteRecordRaw[]
  username: string
  avatar: string
}

//定义分类仓库state对象的ts类型
export interface CategoryState {
  c1Id: string | number
  c1Arr: CategoryObj[]
  c2Id: string | number
  c2Arr: CategoryObj[]
  c3Id: string | number
  c3Arr: CategoryObj[]
}
