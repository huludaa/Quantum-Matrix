import Mock from 'mockjs'
import type { AttrList } from '@/api/product/attr/type'

// 模拟的一级分类数据
const mockCategory1List = [
  { id: 1, name: '电子产品' },
  { id: 2, name: '服装' },
]

// 模拟的二级分类数据
const mockCategory2List = [
  { id: 1, name: '手机', category1Id: 1 },
  { id: 2, name: '电脑', category1Id: 1 },
  { id: 3, name: '男装', category1Id: 2 },
  { id: 4, name: '女装', category1Id: 2 },
]

// 模拟的三级分类数据
const mockCategory3List = [
  { id: 1, name: '智能手机', category2Id: 1 },
  { id: 2, name: '平板电脑', category2Id: 2 },
  { id: 3, name: '男士T恤', category2Id: 3 },
  { id: 4, name: '女士裙子', category2Id: 4 },
]

// 模拟的属性数据
const mockAttrList: AttrList = [
  // 电子产品 > 手机 > 智能手机 的属性
  {
    id: 1,
    attrName: '颜色',
    categoryId: 1, // 对应三级分类ID=1（智能手机）
    categoryLevel: 3,
    attrValueList: [
      { id: 1, valueName: '黑色', attrId: 1 },
      { id: 2, valueName: '白色', attrId: 1 },
    ],
  },
  {
    id: 2,
    attrName: '存储容量',
    categoryId: 1, // 对应三级分类ID=1（智能手机）
    categoryLevel: 3,
    attrValueList: [
      { id: 3, valueName: '128GB', attrId: 2 },
      { id: 4, valueName: '256GB', attrId: 2 },
    ],
  },
  // 服装 > 男装 > 男士T恤 的属性
  {
    id: 3,
    attrName: '尺码',
    categoryId: 3, // 对应三级分类ID=3（男士T恤）
    categoryLevel: 3,
    attrValueList: [
      { id: 5, valueName: 'S' },
      { id: 6, valueName: 'M' },
      { id: 7, valueName: 'L' },
    ],
  },
  // 服装 > 女装 > 女士裙子 的属性
  {
    id: 4,
    attrName: '裙长',
    categoryId: 4, // 对应三级分类ID=4（女士裙子）
    categoryLevel: 3,
    attrValueList: [
      { id: 8, valueName: '短款' },
      { id: 9, valueName: '中长款' },
    ],
  },
  {
    id: 5,
    attrName: '品牌',
    categoryId: 2, // 对应三级分类ID=2（平板）
    categoryLevel: 3,
    attrValueList: [
      { id: 1, valueName: '小米' },
      { id: 2, valueName: '华为' },
    ],
  },
]

// 模拟获取一级分类接口
Mock.mock('/api/product/getCategory1', 'get', () => {
  return Mock.mock({
    code: 200,
    message: '成功',
    ok: true,
    data: mockCategory1List,
  })
})

// 模拟获取二级分类接口
Mock.mock(/\/api\/product\/getCategory2\/\d+/, 'get', (options) => {
  const matches = options.url.match(/\d+/g)
  if (!matches || matches.length < 1) {
    return Mock.mock({
      code: 400,
      message: '参数错误',
      ok: false,
    })
  }
  const category1Id = parseInt(matches[1])

  const filteredCategory2List = mockCategory2List.filter((item) => item.category1Id === category1Id)

  return Mock.mock({
    code: 200,
    message: '成功',
    ok: true,
    data: filteredCategory2List,
  })
})

// 模拟获取三级分类接口
Mock.mock(/\/api\/product\/getCategory3\/\d+/, 'get', (options) => {
  const matches = options.url.match(/\d+/g)
  if (!matches || matches.length < 1) {
    return Mock.mock({
      code: 400,
      message: '参数错误',
      ok: false,
    })
  }

  const category2Id = parseInt(matches[1])
  const filteredCategory3List = mockCategory3List.filter((item) => item.category2Id === category2Id)

  return Mock.mock({
    code: 200,
    message: '成功',
    ok: true,
    data: filteredCategory3List,
  })
})

// 模拟获取属性列表接口
Mock.mock(/\/api\/product\/attrInfoList\/\d+\/\d+\/\d+/, 'get', (options) => {
  const matches = options.url.match(/\d+/g)
  if (!matches || matches.length < 3) {
    return Mock.mock({
      code: 400,
      message: '参数错误',
      ok: false,
    })
  }

  const [category1Id, category2Id, category3Id] = matches.map(Number)
  const filteredAttrList = mockAttrList.filter((item) => item.categoryId === category3Id)

  return Mock.mock({
    code: 200,
    message: '成功',
    ok: true,
    data: filteredAttrList,
  })
})

// 模拟添加或更新属性接口
Mock.mock('/api/product/saveAttrInfo', 'post', (options) => {
  const data = JSON.parse(options.body)
  if (data.id) {
    // 更新属性
    const index = mockAttrList.findIndex((item) => item.id === data.id)
    if (index !== -1) {
      mockAttrList[index] = { ...mockAttrList[index], ...data }
    }
  } else {
    // 添加属性
    data.id = mockAttrList.length + 1
    mockAttrList.push(data)
  }
  return Mock.mock({
    code: 200,
    message: '成功',
    ok: true,
  })
})

// 模拟删除属性接口
Mock.mock(/\/api\/product\/deleteAttr\/\d+/, 'delete', (options) => {
  const matches = options.url.match(/\d+/g)
  if (!matches || matches.length < 1) {
    return Mock.mock({
      code: 400,
      message: '参数错误',
      ok: false,
    })
  }

  const attrId = parseInt(matches[0])
  const index = mockAttrList.findIndex((item) => item.id === attrId)
  if (index !== -1) {
    mockAttrList.splice(index, 1)
  }

  return Mock.mock({
    code: 200,
    message: '成功',
    ok: true,
  })
})
