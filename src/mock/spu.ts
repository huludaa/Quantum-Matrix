import Mock from 'mockjs'

// 模拟品牌数据
const mockTrademarkList = [
  { id: 1, tmName: '苹果', logoUrl: 'https://picsum.photos/100/100' },
  { id: 2, tmName: '华为', logoUrl: 'https://picsum.photos/100/100' },
  { id: 3, tmName: '小米', logoUrl: 'https://picsum.photos/100/100' },
  { id: 4, tmName: '耐克', logoUrl: 'https://picsum.photos/100/100' },
  { id: 5, tmName: '阿迪达斯', logoUrl: 'https://picsum.photos/100/100' },
  { id: 6, tmName: '联想', logoUrl: 'https://picsum.photos/100/100' },
  { id: 7, tmName: '李宁', logoUrl: 'https://picsum.photos/100/100' },
  { id: 8, tmName: '优衣库', logoUrl: 'https://picsum.photos/100/100' },
  { id: 9, tmName: 'ZARA', logoUrl: 'https://picsum.photos/100/100' },
  { id: 10, tmName: '戴尔', logoUrl: 'https://picsum.photos/100/100' },
]

// 模拟SPU数据
let mockSpuList = [
  // 智能手机（3个）
  {
    id: 1,
    category3Id: 1,
    spuName: 'iPhone 15 Pro',
    tmId: 1,
    description: 'A17 Pro芯片，钛金属机身',
    spuImageList: [
      {
        id: 1,
        imgName: 'iphone15-pro-1',
        imgUrl: 'https://picsum.photos/100/100',
        spuId: 1,
      },
      {
        id: 2,
        imgName: 'iphone15-pro-2',
        imgUrl: 'https://picsum.photos/100/100',
        spuId: 1,
      },
    ],
    spuSaleAttrList: [
      {
        id: 1,
        baseSaleAttrId: 1,
        saleAttrName: '颜色',
        spuSaleAttrValueList: [
          { id: 1, baseSaleAttrId: 1, saleAttrValueName: '黑色' },
          { id: 2, baseSaleAttrId: 1, saleAttrValueName: '白色' },
        ],
      },
      {
        id: 2,
        baseSaleAttrId: 2,
        saleAttrName: '存储容量',
        spuSaleAttrValueList: [
          { id: 3, baseSaleAttrId: 2, saleAttrValueName: '128GB' },
          { id: 4, baseSaleAttrId: 2, saleAttrValueName: '256GB' },
        ],
      },
    ],
  },
  {
    id: 2,
    category3Id: 1,
    spuName: '华为Mate 60 Pro',
    tmId: 2,
    description: '鸿蒙4.0，卫星通信',
    spuImageList: [
      {
        id: 3,
        imgName: 'mate60-pro-1',
        imgUrl: 'https://picsum.photos/100/100',
        spuId: 2,
      },
    ],
    spuSaleAttrList: [
      {
        id: 3,
        baseSaleAttrId: 1,
        saleAttrName: '颜色',
        spuSaleAttrValueList: [
          { id: 6, baseSaleAttrId: 1, saleAttrValueName: '雅川青' },
          { id: 7, baseSaleAttrId: 1, saleAttrValueName: '白沙银' },
        ],
      },
    ],
  },
  {
    id: 3,
    category3Id: 1,
    spuName: '小米14 Ultra',
    tmId: 3,
    description: '徕卡光学，双向卫星通信',
    spuImageList: [
      {
        id: 4,
        imgName: 'mi14-ultra-1',
        imgUrl: 'https://picsum.photos/100/100',
        spuId: 3,
      },
    ],
    spuSaleAttrList: [
      {
        id: 4,
        baseSaleAttrId: 1,
        saleAttrName: '颜色',
        spuSaleAttrValueList: [
          { id: 8, baseSaleAttrId: 1, saleAttrValueName: '黑色' },
          { id: 9, baseSaleAttrId: 1, saleAttrValueName: '白色' },
        ],
      },
    ],
  },

  // 平板电脑（2个）
  {
    id: 4,
    category3Id: 2,
    spuName: 'iPad Air',
    tmId: 1,
    description: 'M1芯片，全面屏设计',
    spuImageList: [
      { id: 5, imgName: 'ipad-air-1', imgUrl: 'https://picsum.photos/100/100', spuId: 4 },
    ],
    spuSaleAttrList: [
      {
        id: 5,
        baseSaleAttrId: 1,
        saleAttrName: '颜色',
        spuSaleAttrValueList: [
          { id: 10, baseSaleAttrId: 1, saleAttrValueName: '深空灰' },
          { id: 11, baseSaleAttrId: 1, saleAttrValueName: '星光色' },
        ],
      },
    ],
  },
  {
    id: 5,
    category3Id: 2,
    spuName: '华为MatePad Pro',
    tmId: 2,
    description: '12.6英寸OLED屏幕',
    spuImageList: [
      {
        id: 6,
        imgName: 'matepad-pro-1',
        imgUrl: 'https://picsum.photos/100/100',
        spuId: 5,
      },
    ],
    spuSaleAttrList: [
      {
        id: 6,
        baseSaleAttrId: 1,
        saleAttrName: '颜色',
        spuSaleAttrValueList: [
          { id: 12, baseSaleAttrId: 1, saleAttrValueName: '曜石黑' },
          { id: 13, baseSaleAttrId: 1, saleAttrValueName: '青山黛' },
        ],
      },
    ],
  },

  // 男士T恤（3个）
  {
    id: 6,
    category3Id: 3,
    spuName: '耐克DRI-FIT运动T恤',
    tmId: 4,
    description: '速干面料，透气舒适',
    spuImageList: [
      {
        id: 7,
        imgName: 'nike-dri-fit-1',
        imgUrl: 'https://picsum.photos/100/100',
        spuId: 6,
      },
    ],
    spuSaleAttrList: [
      {
        id: 7,
        baseSaleAttrId: 3,
        saleAttrName: '尺码',
        spuSaleAttrValueList: [
          { id: 14, baseSaleAttrId: 3, saleAttrValueName: 'S' },
          { id: 15, baseSaleAttrId: 3, saleAttrValueName: 'M' },
          { id: 16, baseSaleAttrId: 3, saleAttrValueName: 'L' },
        ],
      },
      {
        id: 8,
        baseSaleAttrId: 1,
        saleAttrName: '颜色',
        spuSaleAttrValueList: [
          { id: 17, baseSaleAttrId: 1, saleAttrValueName: '黑色' },
          { id: 18, baseSaleAttrId: 1, saleAttrValueName: '白色' },
        ],
      },
    ],
  },
  {
    id: 7,
    category3Id: 3,
    spuName: '阿迪达斯三叶草T恤',
    tmId: 5,
    description: '经典logo，纯棉材质',
    spuImageList: [
      {
        id: 8,
        imgName: 'adidas-tshirt-1',
        imgUrl: 'https://picsum.photos/100/100',
        spuId: 7,
      },
    ],
    spuSaleAttrList: [
      {
        id: 9,
        baseSaleAttrId: 3,
        saleAttrName: '尺码',
        spuSaleAttrValueList: [
          { id: 19, baseSaleAttrId: 3, saleAttrValueName: 'S' },
          { id: 20, baseSaleAttrId: 3, saleAttrValueName: 'M' },
        ],
      },
    ],
  },
  {
    id: 8,
    category3Id: 3,
    spuName: '优衣库U系列T恤',
    tmId: 8,
    description: '设计师合作款，多种颜色',
    spuImageList: [
      {
        id: 9,
        imgName: 'uniqlo-u-1',
        imgUrl: 'https://picsum.photos/100/100',
        spuId: 8,
      },
    ],
    spuSaleAttrList: [
      {
        id: 10,
        baseSaleAttrId: 3,
        saleAttrName: '尺码',
        spuSaleAttrValueList: [
          { id: 21, baseSaleAttrId: 3, saleAttrValueName: 'XS' },
          { id: 22, baseSaleAttrId: 3, saleAttrValueName: 'S' },
          { id: 23, baseSaleAttrId: 3, saleAttrValueName: 'M' },
        ],
      },
    ],
  },

  // 女士裙子（2个）
  {
    id: 9,
    category3Id: 4,
    spuName: 'ZARA碎花连衣裙',
    tmId: 9,
    description: '雪纺面料，夏季新款',
    spuImageList: [
      {
        id: 10,
        imgName: 'zara-dress-1',
        imgUrl: 'https://picsum.photos/100/100',
        spuId: 9,
      },
    ],
    spuSaleAttrList: [
      {
        id: 11,
        baseSaleAttrId: 3,
        saleAttrName: '尺码',
        spuSaleAttrValueList: [
          { id: 24, baseSaleAttrId: 3, saleAttrValueName: 'S' },
          { id: 25, baseSaleAttrId: 3, saleAttrValueName: 'M' },
        ],
      },
      {
        id: 12,
        baseSaleAttrId: 4,
        saleAttrName: '裙长',
        spuSaleAttrValueList: [
          { id: 26, baseSaleAttrId: 4, saleAttrValueName: '及膝' },
          { id: 27, baseSaleAttrId: 4, saleAttrValueName: '中长' },
        ],
      },
    ],
  },
  {
    id: 10,
    category3Id: 4,
    spuName: 'UR高腰A字裙',
    tmId: 7,
    description: '高腰设计，显瘦版型',
    spuImageList: [
      {
        id: 11,
        imgName: 'ur-skirt-1',
        imgUrl: 'https://picsum.photos/100/100',
        spuId: 10,
      },
    ],
    spuSaleAttrList: [
      {
        id: 13,
        baseSaleAttrId: 3,
        saleAttrName: '尺码',
        spuSaleAttrValueList: [
          { id: 28, baseSaleAttrId: 3, saleAttrValueName: 'XS' },
          { id: 29, baseSaleAttrId: 3, saleAttrValueName: 'S' },
        ],
      },
    ],
  },
]

// 模拟销售属性
const mockSaleAttrList = [
  { id: 1, name: '颜色' },
  { id: 2, name: '存储容量' },
  { id: 3, name: '尺码' },
  { id: 4, name: '裙长' },
  { id: 5, name: '处理器型号' },
  { id: 6, name: '屏幕尺寸' },
]

// 模拟SKU数据
let mockSkuList = [
  // 智能手机（3个）
  {
    id: 1,
    category3Id: 1,
    spuId: 1,
    tmId: 1,
    skuName: 'iPhone 15 Pro 黑色 256GB',
    price: 8999,
    weight: '187g',
    skuDesc: 'iPhone 15 Pro 黑色 256GB版本',
    skuAttrValueList: [
      {
        attrId: 1,
        valueId: 1,
        attrName: '颜色',
        valueName: '黑色',
      },
      {
        attrId: 2,
        valueId: 4,
        attrName: '存储容量',
        valueName: '256GB',
      },
    ],
    skuSaleAttrValueList: [
      {
        saleAttrId: 1,
        saleAttrValueId: 1,
        saleAttrName: '颜色',
        saleAttrValueName: '黑色',
      },
      {
        saleAttrId: 2,
        saleAttrValueId: 4,
        saleAttrName: '存储容量',
        saleAttrValueName: '256GB',
      },
    ],
    skuDefaultImg: 'https://picsum.photos/100/100',
  },
  {
    id: 2,
    category3Id: 1,
    spuId: 2,
    tmId: 2,
    skuName: '华为Mate 60 Pro 雅川青 512GB',
    price: 6999,
    weight: '225g',
    skuDesc: '华为Mate 60 Pro 雅川青 512GB 卫星通信版',
    skuAttrValueList: [
      {
        attrId: 1,
        valueId: 6,
        attrName: '颜色',
        valueName: '雅川青',
      },
    ],
    skuSaleAttrValueList: [
      {
        saleAttrId: 1,
        saleAttrValueId: 6,
        saleAttrName: '颜色',
        saleAttrValueName: '雅川青',
      },
    ],
    skuDefaultImg: 'https://picsum.photos/100/100',
  },
  {
    id: 3,
    category3Id: 1,
    spuId: 3,
    tmId: 3,
    skuName: '小米14 Ultra 白色 1TB',
    price: 6999,
    weight: '220g',
    skuDesc: '小米14 Ultra 白色 1TB 摄影套装',
    skuAttrValueList: [
      {
        attrId: 1,
        valueId: 9,
        attrName: '颜色',
        valueName: '白色',
      },
    ],
    skuSaleAttrValueList: [
      {
        saleAttrId: 1,
        saleAttrValueId: 9,
        saleAttrName: '颜色',
        saleAttrValueName: '白色',
      },
    ],
    skuDefaultImg: 'https://picsum.photos/100/100',
  },

  // 平板电脑（2个）
  {
    id: 4,
    category3Id: 2,
    spuId: 4,
    tmId: 1,
    skuName: 'iPad Air 深空灰 256GB',
    price: 4799,
    weight: '461g',
    skuDesc: 'iPad Air 深空灰 256GB WiFi版',
    skuAttrValueList: [
      {
        attrId: 1,
        valueId: 10,
        attrName: '颜色',
        valueName: '深空灰',
      },
      {
        attrId: 2,
        valueId: 4,
        attrName: '存储容量',
        valueName: '256GB',
      },
    ],
    skuSaleAttrValueList: [
      {
        saleAttrId: 1,
        saleAttrValueId: 10,
        saleAttrName: '颜色',
        saleAttrValueName: '深空灰',
      },
      {
        saleAttrId: 2,
        saleAttrValueId: 4,
        saleAttrName: '存储容量',
        saleAttrValueName: '256GB',
      },
    ],
    skuDefaultImg: 'https://picsum.photos/100/100',
  },
  {
    id: 5,
    category3Id: 2,
    spuId: 5,
    tmId: 2,
    skuName: '华为MatePad Pro 青山黛 512GB',
    price: 5299,
    weight: '609g',
    skuDesc: '华为MatePad Pro 12.6 青山黛 512GB',
    skuAttrValueList: [
      {
        attrId: 1,
        valueId: 13,
        attrName: '颜色',
        valueName: '青山黛',
      },
    ],
    skuSaleAttrValueList: [
      {
        saleAttrId: 1,
        saleAttrValueId: 13,
        saleAttrName: '颜色',
        saleAttrValueName: '青山黛',
      },
    ],
    skuDefaultImg: 'https://picsum.photos/100/100',
  },

  // 男士T恤（3个）
  {
    id: 6,
    category3Id: 3,
    spuId: 6,
    tmId: 4,
    skuName: '耐克DRI-FIT运动T恤 白色 M',
    price: 299,
    weight: '180g',
    skuDesc: '耐克速干运动T恤 白色 M码',
    skuAttrValueList: [
      {
        attrId: 3,
        valueId: 15,
        attrName: '尺码',
        valueName: 'M',
      },
      {
        attrId: 1,
        valueId: 18,
        attrName: '颜色',
        valueName: '白色',
      },
    ],
    skuSaleAttrValueList: [
      {
        saleAttrId: 3,
        saleAttrValueId: 15,
        saleAttrName: '尺码',
        saleAttrValueName: 'M',
      },
      {
        saleAttrId: 1,
        saleAttrValueId: 18,
        saleAttrName: '颜色',
        saleAttrValueName: '白色',
      },
    ],
    skuDefaultImg: 'https://picsum.photos/100/100',
  },
  {
    id: 7,
    category3Id: 3,
    spuId: 7,
    tmId: 5,
    skuName: '阿迪达斯三叶草T恤 黑色 M',
    price: 249,
    weight: '170g',
    skuDesc: '阿迪达斯经典logo T恤 黑色 M码',
    skuAttrValueList: [
      {
        attrId: 3,
        valueId: 19,
        attrName: '尺码',
        valueName: 'M',
      },
    ],
    skuSaleAttrValueList: [
      {
        saleAttrId: 3,
        saleAttrValueId: 19,
        saleAttrName: '尺码',
        saleAttrValueName: 'M',
      },
    ],
    skuDefaultImg: 'https://picsum.photos/100/100',
  },
  {
    id: 8,
    category3Id: 3,
    spuId: 8,
    tmId: 8,
    skuName: '优衣库U系列T恤 藏青色 S',
    price: 99,
    weight: '150g',
    skuDesc: '优衣库设计师合作款 T恤 藏青色 S码',
    skuAttrValueList: [
      {
        attrId: 3,
        valueId: 21,
        attrName: '尺码',
        valueName: 'S',
      },
    ],
    skuSaleAttrValueList: [
      {
        saleAttrId: 3,
        saleAttrValueId: 21,
        saleAttrName: '尺码',
        saleAttrValueName: 'S',
      },
    ],
    skuDefaultImg: 'https://picsum.photos/100/100',
  },

  // 女士裙子（2个）
  {
    id: 9,
    category3Id: 4,
    spuId: 9,
    tmId: 9,
    skuName: 'ZARA碎花连衣裙 S码 及膝',
    price: 399,
    weight: '350g',
    skuDesc: 'ZARA夏季新款碎花连衣裙 S码 及膝长度',
    skuAttrValueList: [
      {
        attrId: 3,
        valueId: 24,
        attrName: '尺码',
        valueName: 'S',
      },
      {
        attrId: 4,
        valueId: 26,
        attrName: '裙长',
        valueName: '及膝',
      },
    ],
    skuSaleAttrValueList: [
      {
        saleAttrId: 3,
        saleAttrValueId: 24,
        saleAttrName: '尺码',
        saleAttrValueName: 'S',
      },
      {
        saleAttrId: 4,
        saleAttrValueId: 26,
        saleAttrName: '裙长',
        saleAttrValueName: '及膝',
      },
    ],
    skuDefaultImg: 'https://picsum.photos/100/100',
  },
  {
    id: 10,
    category3Id: 4,
    spuId: 10,
    tmId: 7,
    skuName: 'UR高腰A字裙 XS码',
    price: 259,
    weight: '280g',
    skuDesc: 'UR显瘦高腰A字裙 XS码',
    skuAttrValueList: [
      {
        attrId: 3,
        valueId: 28,
        attrName: '尺码',
        valueName: 'XS',
      },
    ],
    skuSaleAttrValueList: [
      {
        saleAttrId: 3,
        saleAttrValueId: 28,
        saleAttrName: '尺码',
        saleAttrValueName: 'XS',
      },
    ],
    skuDefaultImg: 'https://picsum.photos/100/100',
  },
]

// 获取已有的SPU数据
Mock.mock(/\/api\/product\/(\d+)\/(\d+)\?category3Id=(\d+)/, 'get', (options) => {
  // 方法一：简单正则匹配
  const matches = options.url.match(/\/api\/product\/(\d+)\/(\d+)\?category3Id=(\d+)/)
  if (!matches || matches.length < 4) {
    return Mock.mock({
      code: 400,
      message: '参数错误',
      ok: false,
    })
  }

  const page = parseInt(matches[1])
  const limit = parseInt(matches[2])
  const category3Id = parseInt(matches[3])

  // 过滤逻辑
  const filteredSpuList = mockSpuList.filter((item) => Number(item.category3Id) === category3Id)

  // 分页处理
  const start = (page - 1) * limit
  const records = filteredSpuList.slice(start, start + limit)

  return Mock.mock({
    code: 200,
    message: '成功',
    ok: true,
    data: {
      records,
      total: filteredSpuList.length,
      size: limit,
      current: page,
      searchCount: true,
      pages: Math.ceil(filteredSpuList.length / limit),
    },
  })
})

// 获取全部品牌数据
Mock.mock('/api/product/baseTrademark/getTrademarkList', 'get', () => {
  return Mock.mock({
    code: 200,
    message: '成功',
    ok: true,
    data: mockTrademarkList,
  })
})

// 获取某个SPU下的全部图片数据
Mock.mock(/\/api\/product\/spuImageList\/\d+/, 'get', (options) => {
  const matches = options.url.match(/\d+/g)
  if (!matches || matches.length < 1) {
    return Mock.mock({
      code: 400,
      message: '参数错误',
      ok: false,
    })
  }

  const spuId = parseInt(matches[0])
  const spu = mockSpuList.find((item) => item.id === spuId)
  const images = spu ? spu.spuImageList : []

  return Mock.mock({
    code: 200,
    message: '成功',
    ok: true,
    data: images,
  })
})

// 获取某个SPU下全部的销售属性
Mock.mock(/\/api\/product\/spuSaleAttrList\/\d+/, 'get', (options) => {
  const matches = options.url.match(/\d+/g)
  if (!matches || matches.length < 1) {
    return Mock.mock({
      code: 400,
      message: '参数错误',
      ok: false,
    })
  }

  const spuId = parseInt(matches[0])
  const spu = mockSpuList.find((item) => item.id === spuId)
  const saleAttrs = spu ? spu.spuSaleAttrList : []

  return Mock.mock({
    code: 200,
    message: '成功',
    ok: true,
    data: saleAttrs,
  })
})

// 获取全部销售属性
Mock.mock('/api/product/baseSaleAttrList', 'get', () => {
  return Mock.mock({
    code: 200,
    message: '成功',
    ok: true,
    data: mockSaleAttrList,
  })
})

// 添加或更新SPU
Mock.mock(/\/api\/product\/(save|update)SpuInfo/, 'post', (options) => {
  const data = JSON.parse(options.body)
  console.log(data)

  if (data.id) {
    // 更新SPU
    const index = mockSpuList.findIndex((item) => item.id === data.id)
    if (index !== -1) {
      mockSpuList[index] = { ...mockSpuList[index], ...data }
    }
  } else {
    // 添加SPU
    data.id = mockSpuList.length + 1
    data.spuImageList = data.spuImageList || []
    data.spuSaleAttrList = data.spuSaleAttrList || []
    mockSpuList.push(data)
  }

  return Mock.mock({
    code: 200,
    message: '成功',
    ok: true,
  })
})

// 添加SKU
Mock.mock('/api/product/saveSkuInfo', 'post', (options) => {
  const data = JSON.parse(options.body)
  data.id = mockSkuList.length + 1
  mockSkuList.push(data)

  return Mock.mock({
    code: 200,
    message: '成功',
    ok: true,
  })
})

// 获取某个SPU下的全部SKU
Mock.mock(/\/api\/product\/findBySpuId\/\d+/, 'get', (options) => {
  const matches = options.url.match(/\d+/g)
  if (!matches || matches.length < 1) {
    return Mock.mock({
      code: 400,
      message: '参数错误',
      ok: false,
    })
  }

  const spuId = parseInt(matches[0])
  const skus = mockSkuList.filter((item) => item.spuId === spuId)

  return Mock.mock({
    code: 200,
    message: '成功',
    ok: true,
    data: skus,
  })
})

// 删除SPU
Mock.mock(/\/api\/product\/deleteSpu\/\d+/, 'delete', (options) => {
  const matches = options.url.match(/\d+/g)
  if (!matches || matches.length < 1) {
    return Mock.mock({
      code: 400,
      message: '参数错误',
      ok: false,
    })
  }

  const spuId = parseInt(matches[0])
  mockSpuList = mockSpuList.filter((item) => item.id !== spuId)
  mockSkuList = mockSkuList.filter((item) => item.spuId !== spuId)

  return Mock.mock({
    code: 200,
    message: '成功',
    ok: true,
  })
})
