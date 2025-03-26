import Mock from 'mockjs'
import type { TradeMarkResponseData, TradeMark } from '@/api/product/trademark/type'

// 模拟品牌数据
const mockTrademarkList: TradeMark[] = [
  { id: 1, tmName: '品牌1', logoUrl: 'https://picsum.photos/100/100' },
  { id: 2, tmName: '品牌2', logoUrl: 'https://picsum.photos/100/100' },
  { id: 3, tmName: '品牌3', logoUrl: 'https://picsum.photos/100/100' },
]

// 模拟获取已有品牌接口
Mock.mock(/\/api\/product\/baseTrademark\/\d+\/\d+/, 'get', (options) => {
  console.log('MockJS 拦截的请求:', options) // 打印请求信息

  // 解析请求参数
  const url = options.url
  const page = parseInt(url.split('/').slice(-2)[0], 10) // 获取页码
  const limit = parseInt(url.split('/').slice(-1)[0], 10) // 获取每页条数

  // 模拟返回数据
  return Mock.mock({
    code: 200,
    message: '成功',
    ok: true,
    data: {
      records: mockTrademarkList.slice((page - 1) * limit, page * limit), // 分页数据
      total: mockTrademarkList.length, // 总条数
      size: limit, // 每页条数
      current: page, // 当前页码
      searchCount: true,
      pages: Math.ceil(mockTrademarkList.length / limit), // 总页数
    },
  })
})

// 模拟添加品牌接口
Mock.mock('/api/product/baseTrademark/save', 'post', (options) => {
  // 解析请求体
  const data: TradeMark = JSON.parse(options.body)

  // 模拟添加品牌
  const newTrademark = {
    id: mockTrademarkList.length + 1, // 生成新 ID
    tmName: data.tmName,
    logoUrl: data.logoUrl,
  }
  mockTrademarkList.push(newTrademark)

  // 模拟返回数据
  return Mock.mock({
    code: 200,
    message: '添加成功',
    ok: true,
  })
})

// 模拟文件上传接口
Mock.mock('/api/product/fileUpload', 'post', (options) => {
  // 在实际项目中，这里应该解析上传的文件
  // 由于Mock.js无法直接处理文件上传，我们模拟返回一个图片URL

  const randomName = Mock.Random.string(16) // 生成随机文件名
  const logoUrl = `https://example.com/uploads/${randomName}.png`

  return {
    code: 200,
    message: '文件上传成功',
    ok: true,
    data: logoUrl, // 返回图片URL
  }
})

// 模拟修改品牌接口
Mock.mock('/api/product/baseTrademark/update', 'put', (options) => {
  console.log('MockJS 拦截的请求:', options) // 打印请求信息

  // 解析请求体
  const data: TradeMark = JSON.parse(options.body)

  // 模拟修改品牌
  const index = mockTrademarkList.findIndex((item) => item.id === data.id)
  if (index !== -1) {
    mockTrademarkList[index] = data
  }

  // 模拟返回数据
  return Mock.mock({
    code: 200,
    message: '修改成功',
    ok: true,
  })
})

// 模拟删除品牌接口
Mock.mock(/\/api\/product\/baseTrademark\/remove\/\d+/, 'delete', (options) => {
  console.log('MockJS 拦截的请求:', options) // 打印请求信息

  // 解析请求参数
  const id = parseInt(options.url.split('/').slice(-1)[0], 10)

  // 模拟删除品牌
  const index = mockTrademarkList.findIndex((item) => item.id === id)
  if (index !== -1) {
    mockTrademarkList.splice(index, 1)
  }

  // 模拟返回数据
  return Mock.mock({
    code: 200,
    message: '删除成功',
    ok: true,
  })
})
