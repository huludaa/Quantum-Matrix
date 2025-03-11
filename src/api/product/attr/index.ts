import request from '@/utils/request'
import type { CateogoryResponseData, AttrResponseData, Attr } from './type'
enum API {
  //获取一级分类接口地址
  C1_URL = '/admin/product/getCategory1',
  //获取二级分类接口地址
  C2_URL = '/admin/product/getCategory2/',
  //获取三级分类接口地址
  C3_URL = '/admin/product/getCategory3/',
  //获取分类下已有的属性与属性值
  ATTR_URL = '/admin/product/attrInfoList/',
  //添加或者修改已有的属性的接口
  ADDORUPDATEATTR_URL = '/admin/product/saveAttrInfo',
  //删除某一个已有的属性
  DELETEATTR_URL = '/admin/product/deleteAttr/',
}
export const reqC1 = () => request.get<any, CateogoryResponseData>(API.C1_URL)

export const reqC2 = (categoryC1: number | string) =>
  request.get<any, CateogoryResponseData>(API.C2_URL + categoryC1)

export const reqC3 = (categoryC2: number | string) =>
  request.get<any, CateogoryResponseData>(API.C3_URL + categoryC2)

// 获取已有的属性和属性值
export const reqAttr = (
  category1Id: string | number,
  category2Id: string | number,
  category3Id: string | number,
) =>
  request.get<any, AttrResponseData>(API.ATTR_URL + `${category1Id}/${category2Id}/${category3Id}`)

export const reqAddOrUpdateAttr = (data: Attr) => {
  request.post<any, any>(API.ADDORUPDATEATTR_URL, data)
}

//删除某一个已有的属性业务
export const reqRemoveAttr = (attrId: number) =>
  request.delete<any, any>(API.DELETEATTR_URL + attrId)
