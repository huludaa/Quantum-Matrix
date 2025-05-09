//SKU模块接口管理
import request from '@/utils/request'
import type { SkuResponseData, SkuInfoData, ResponseData, SkuData } from './type'
//枚举地址
enum API {
  //获取已有的商品的数据-SKU
  SKU_URL = '/product/list/',
  //上架
  SALE_URL = '/product/onSale/',
  //下架的接口
  CANCELSALE_URL = '/product/cancelSale/',
  //获取商品详情的接口
  SKUINFO_URL = '/product/getSkuInfo/',
  //删除已有的商品
  DELETESKU_URL = '/product/deleteSku/',
  //更新已有的商品
  UPDATESKU_URL = '/product/updateSku',
}
//获取商品SKU的接口
export const reqSkuList = (page: number, limit: number) =>
  request.get<any, SkuResponseData>(API.SKU_URL + `${page}/${limit}`)
//已有商品上架的请求
export const reqSaleSku = (skuId: number) => request.get<any, ResponseData>(API.SALE_URL + skuId)
//下架的请求
export const reqCancelSale = (skuId: number) =>
  request.get<any, ResponseData>(API.CANCELSALE_URL + skuId)
//获取商品详情的接口
export const reqSkuInfo = (skuId: number) => request.get<any, SkuInfoData>(API.SKUINFO_URL + skuId)
//删除某一个已有的商品
export const reqRemoveSku = (skuId: number) =>
  request.delete<any, ResponseData>(API.DELETESKU_URL + skuId)
//更新已有的商品
export const reqUpdateSku = (data: SkuData) =>
  request.put<any, ResponseData>(API.UPDATESKU_URL, data)
