import request from '@/utils/request'
import type { TradeMark, TradeMarkResponseData } from './type'
enum API {
  //获取已有品牌接口
  TRADEMARK_URL = '/product/baseTrademark/',
  //添加品牌
  ADDTRADEMARK_URL = '/product/baseTrademark/save',
  //修改已有品牌
  UPDATETRADEMARK_URL = '/product/baseTrademark/update',
  //删除已有品牌
  DELETE_URL = '/product/baseTrademark/remove/',
}
//获取已有品牌的接口方法
export const reqHasTrademark = (page: number, limit: number) =>
  request.get<any, TradeMarkResponseData>(API.TRADEMARK_URL + `${page}/${limit}`)

//添加与修改已有品牌的接口方法
export const reqAddOrUpdateTrademark = (data: TradeMark) => {
  if (data.id) {
    return request.put<any, any>(API.UPDATETRADEMARK_URL, data)
  } else {
    return request.post<any, any>(API.ADDTRADEMARK_URL, data)
  }
}

export const reqDeleteTrademark = (id: number) => request.delete<any, any>(API.DELETE_URL + `${id}`)
