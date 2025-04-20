import dayjs from 'dayjs'
import Mock from 'mockjs'

// 模拟的 SKU 数据
const mockSkuList = [
  // -------------------- category3Id: 1 (智能手机) --------------------
  {
    id: 101,
    category3Id: 1,
    spuId: 11,
    tmId: 1,
    skuName: 'Apple iPhone 13 黑色 128GB',
    price: 5999,
    weight: 173,
    skuDesc: 'iPhone 13 黑色 128GB 版本',
    skuDefaultImg: 'https://picsum.photos/100/100',
    isSale: 1,
    skuAttrValueList: [
      {
        id: 1001,
        createTime: '2025-01-01 10:00:00',
        updateTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
        attrId: 101,
        valueId: 201,
        attrName: '品牌',
        valueName: '苹果',
      },
      {
        id: 1002,
        attrId: 102,
        valueId: 202,
        attrName: '网络',
        valueName: '5G',
      },
      {
        id: 1003,
        attrId: 103,
        valueId: 203,
        attrName: '充电接口',
        valueName: 'Lightning',
      },
    ],
    skuSaleAttrValueList: [
      {
        id: 2001,
        createTime: '2025-01-01 10:00:01',
        saleAttrId: 1,
        saleAttrName: '颜色',
        saleAttrValueId: 301,
        saleAttrValueName: '黑色',
        skuId: 101,
        spuId: 11,
      },
      {
        id: 2002,
        saleAttrId: 2,
        saleAttrName: '存储容量',
        saleAttrValueId: 302,
        saleAttrValueName: '128GB',
        skuId: 101,
      },
    ],
    skuImageList: [
      {
        id: 101,
        imgName: 'Apple iPhone 13-1',
        imgUrl: 'https://picsum.photos/100/100',
        skuId: 101,
      },
      {
        id: 102,
        imgName: 'Apple iPhone 13-2',
        imgUrl: 'https://picsum.photos/100/100',
        skuId: 101,
      },
      {
        id: 103,
        imgName: 'Apple iPhone 13-3',
        imgUrl: 'https://picsum.photos/100/100',
        skuId: 101,
      },
    ],
  },
  {
    id: 102,
    category3Id: 1,
    spuId: 11,
    tmId: 2,
    skuName: '华为P50 Pro 白色 256GB',
    price: 5488,
    weight: 195,
    skuDesc: '华为旗舰手机 徕卡影像',
    skuDefaultImg: 'https://picsum.photos/100/100',
    isSale: 1,
    skuAttrValueList: [
      {
        id: 1004,
        attrId: 101,
        valueId: 204,
        attrName: '品牌',
        valueName: '华为',
      },
      {
        id: 1005,
        attrId: 104,
        valueId: 205,
        attrName: '防水等级',
        valueName: 'IP68',
      },
    ],
    skuSaleAttrValueList: [
      {
        id: 2003,
        saleAttrId: 1,
        saleAttrName: '颜色',
        saleAttrValueId: 303,
        saleAttrValueName: '白色',
        skuId: 102,
      },
      {
        id: 2004,
        saleAttrId: 2,
        saleAttrName: '存储容量',
        saleAttrValueId: 304,
        saleAttrValueName: '256GB',
        skuId: 102,
      },
    ],
    skuImageList: [
      {
        id: 102,
        imgName: '华为P50 Pro-1',
        imgUrl: 'https://picsum.photos/100/100',
        skuId: 102,
      },
      {
        id: 103,
        imgName: '华为P50 Pro-2',
        imgUrl: 'https://picsum.photos/100/100',
        skuId: 102,
      },
      {
        id: 104,
        imgName: '华为P50 Pro-3',
        imgUrl: 'https://picsum.photos/100/100',
        skuId: 102,
      },
    ],
  },

  // -------------------- category3Id: 2 (平板电脑) --------------------
  {
    id: 201,
    category3Id: 2,
    spuId: 21,
    tmId: 1,
    skuName: 'iPad Pro 11寸 深空灰 128GB',
    price: 6799,
    weight: 466,
    skuDesc: 'M1芯片 120Hz刷新率',
    skuDefaultImg: 'https://picsum.photos/100/100',
    isSale: 1,
    skuAttrValueList: [
      {
        id: 2001,
        attrId: 105,
        valueId: 206,
        attrName: '屏幕类型',
        valueName: 'Liquid视网膜',
      },
      {
        id: 2002,
        attrId: 106,
        valueId: 207,
        attrName: '处理器',
        valueName: 'M1',
      },
    ],
    skuSaleAttrValueList: [
      {
        id: 3001,
        saleAttrId: 3,
        saleAttrName: '颜色',
        saleAttrValueId: 401,
        saleAttrValueName: '深空灰',
        skuId: 201,
      },
      {
        id: 3002,
        saleAttrId: 4,
        saleAttrName: '存储容量',
        saleAttrValueId: 402,
        saleAttrValueName: '128GB',
        skuId: 201,
      },
    ],
    skuImageList: [
      {
        id: 201,
        imgName: 'iPad Pro 11寸-1',
        imgUrl: 'https://picsum.photos/100/100',
        skuId: 201,
      },
      {
        id: 202,
        imgName: 'iPad Pro 11寸-2',
        imgUrl: 'https://picsum.photos/100/100',
        skuId: 201,
      },
      {
        id: 203,
        imgName: 'iPad Pro 11寸-3',
        imgUrl: 'https://picsum.photos/100/100',
        skuId: 201,
      },
    ],
  },
  {
    id: 202,
    category3Id: 2,
    spuId: 22,
    tmId: 3,
    skuName: '小米平板5 Pro 白色 256GB',
    price: 2799,
    weight: 515,
    skuDesc: '2.5K 120Hz高刷屏',
    skuDefaultImg: 'https://picsum.photos/100/100',
    isSale: 1,
    skuAttrValueList: [
      {
        id: 2003,
        attrId: 107,
        valueId: 208,
        attrName: '屏幕尺寸',
        valueName: '11英寸',
      },
      {
        id: 2004,
        attrId: 108,
        valueId: 209,
        attrName: '快充',
        valueName: '67W',
      },
    ],
    skuSaleAttrValueList: [
      {
        id: 3003,
        saleAttrId: 3,
        saleAttrName: '颜色',
        saleAttrValueId: 403,
        saleAttrValueName: '白色',
        skuId: 202,
      },
      {
        id: 3004,
        saleAttrId: 4,
        saleAttrName: '存储容量',
        saleAttrValueId: 404,
        saleAttrValueName: '256GB',
        skuId: 202,
      },
    ],
    skuImageList: [
      {
        id: 202,
        imgName: '小米平板5 Pro-1',
        imgUrl: 'https://picsum.photos/100/100',
        skuId: 202,
      },
      {
        id: 203,
        imgName: '小米平板5 Pro-2',
        imgUrl: 'https://picsum.photos/100/100',
        skuId: 202,
      },
      {
        id: 204,
        imgName: '小米平板5 Pro-3',
        imgUrl: 'https://picsum.photos/100/100',
        skuId: 202,
      },
    ],
  },

  // -------------------- category3Id: 3 (男士T恤) --------------------
  {
    id: 301,
    category3Id: 3,
    spuId: 31,
    tmId: 4,
    skuName: '耐克纯棉T恤 黑色 XL',
    price: 199,
    weight: 250,
    skuDesc: '100%纯棉 透气舒适',
    skuDefaultImg: 'https://picsum.photos/100/100',
    isSale: 1,
    skuAttrValueList: [
      {
        id: 3001,
        attrId: 109,
        valueId: 210,
        attrName: '材质',
        valueName: '纯棉',
      },
      {
        id: 3002,
        attrId: 110,
        valueId: 211,
        attrName: '产地',
        valueName: '越南',
      },
    ],
    skuSaleAttrValueList: [
      {
        id: 4001,
        saleAttrId: 5,
        saleAttrName: '颜色',
        saleAttrValueId: 501,
        saleAttrValueName: '黑色',
        skuId: 301,
      },
      {
        id: 4002,
        saleAttrId: 6,
        saleAttrName: '尺码',
        saleAttrValueId: 502,
        saleAttrValueName: 'XL',
        skuId: 301,
      },
    ],
    skuImageList: [
      {
        id: 301,
        imgName: '耐克纯棉T恤-1',
        imgUrl: 'https://picsum.photos/100/100',
        skuId: 301,
      },
      {
        id: 302,
        imgName: '耐克纯棉T恤-2',
        imgUrl: 'https://picsum.photos/100/100',
        skuId: 301,
      },
      {
        id: 303,
        imgName: '耐克纯棉T恤-3',
        imgUrl: 'https://picsum.photos/100/100',
        skuId: 301,
      },
    ],
  },
  {
    id: 302,
    category3Id: 3,
    spuId: 31,
    tmId: 5,
    skuName: '阿迪达斯运动T恤 白色 L',
    price: 229,
    weight: 230,
    skuDesc: 'Climalite技术 速干面料',
    skuDefaultImg: 'https://picsum.photos/100/100',
    isSale: 1,
    skuAttrValueList: [
      {
        id: 3003,
        attrId: 111,
        valueId: 212,
        attrName: '功能',
        valueName: '速干',
      },
      {
        id: 3004,
        attrId: 112,
        valueId: 213,
        attrName: '季节',
        valueName: '夏季',
      },
    ],
    skuSaleAttrValueList: [
      {
        id: 4003,
        saleAttrId: 5,
        saleAttrName: '颜色',
        saleAttrValueId: 503,
        saleAttrValueName: '白色',
        skuId: 302,
      },
      {
        id: 4004,
        saleAttrId: 6,
        saleAttrName: '尺码',
        saleAttrValueId: 504,
        saleAttrValueName: 'L',
        skuId: 302,
      },
    ],
    skuImageList: [
      {
        id: 302,
        imgName: '阿迪达斯运动T恤-1',
        imgUrl: 'https://picsum.photos/100/100',
        skuId: 302,
      },
      {
        id: 303,
        imgName: '阿迪达斯运动T恤-2',
        imgUrl: 'https://picsum.photos/100/100',
        skuId: 302,
      },
      {
        id: 304,
        imgName: '阿迪达斯运动T恤-3',
        imgUrl: 'https://picsum.photos/100/100',
        skuId: 302,
      },
    ],
  },

  // -------------------- category3Id: 4 (女士裙子) --------------------
  {
    id: 401,
    category3Id: 4,
    spuId: 41,
    tmId: 6,
    skuName: 'ZARA碎花连衣裙 S码',
    price: 399,
    weight: 350,
    skuDesc: '雪纺面料 夏季新款',
    skuDefaultImg: 'https://picsum.photos/100/100',
    isSale: 1,
    skuAttrValueList: [
      {
        id: 4001,
        attrId: 113,
        valueId: 214,
        attrName: '裙长',
        valueName: '中长款',
      },
      {
        id: 4002,
        attrId: 114,
        valueId: 215,
        attrName: '领型',
        valueName: 'V领',
      },
    ],
    skuSaleAttrValueList: [
      {
        id: 5001,
        saleAttrId: 7,
        saleAttrName: '花色',
        saleAttrValueId: 601,
        saleAttrValueName: '碎花',
        skuId: 401,
      },
      {
        id: 5002,
        saleAttrId: 8,
        saleAttrName: '尺码',
        saleAttrValueId: 602,
        saleAttrValueName: 'S',
        skuId: 401,
      },
    ],
    skuImageList: [
      {
        id: 401,
        imgName: 'ZARA碎花连衣裙-1',
        imgUrl: 'https://picsum.photos/100/100',
        skuId: 401,
      },
      {
        id: 402,
        imgName: 'ZARA碎花连衣裙-2',
        imgUrl: 'https://picsum.photos/100/100',
        skuId: 401,
      },
      {
        id: 403,
        imgName: 'ZARA碎花连衣裙-3',
        imgUrl: 'https://picsum.photos/100/100',
        skuId: 401,
      },
    ],
  },
  {
    id: 402,
    category3Id: 4,
    spuId: 42,
    tmId: 7,
    skuName: 'UR纯色半身裙 M码',
    price: 259,
    weight: 280,
    skuDesc: '高腰设计 A字版型',
    skuDefaultImg: 'https://picsum.photos/100/100',
    isSale: 1,
    skuAttrValueList: [
      {
        id: 4003,
        attrId: 115,
        valueId: 216,
        attrName: '腰型',
        valueName: '高腰',
      },
      {
        id: 4004,
        attrId: 116,
        valueId: 217,
        attrName: '裙型',
        valueName: 'A字裙',
      },
    ],
    skuSaleAttrValueList: [
      {
        id: 5003,
        saleAttrId: 7,
        saleAttrName: '颜色',
        saleAttrValueId: 603,
        saleAttrValueName: '卡其色',
        skuId: 402,
      },
      {
        id: 5004,
        saleAttrId: 8,
        saleAttrName: '尺码',
        saleAttrValueId: 604,
        saleAttrValueName: 'M',
        skuId: 402,
      },
    ],
    skuImageList: [
      {
        id: 402,
        imgName: 'UR纯色半身裙-1',
        imgUrl: 'https://picsum.photos/100/100',
        skuId: 402,
      },
      {
        id: 403,
        imgName: 'UR纯色半身裙-2',
        imgUrl: 'https://picsum.photos/100/100',
        skuId: 402,
      },
      {
        id: 404,
        imgName: 'UR纯色半身裙-3',
        imgUrl: 'https://picsum.photos/100/100',
        skuId: 402,
      },
    ],
  },
]

// 模拟获取 SKU 列表接口
Mock.mock(/\/api\/product\/list\/\d+\/\d+/, 'get', (options) => {
  const matches = options.url.match(/\d+/g)
  if (!matches || matches.length < 2) {
    return Mock.mock({
      code: 400,
      message: '参数错误',
      ok: false,
    })
  }

  const page = parseInt(matches[0]), // 第一个匹配的数字是 page
    limit = parseInt(matches[1]) // 第二个匹配的数字是 limit

  // 返回分页数据
  return Mock.mock({
    code: 200,
    message: '成功',
    ok: true,
    data: {
      records: mockSkuList.slice((page - 1) * limit, page * limit),
      total: mockSkuList.length,
      size: limit,
      current: page,
      orders: [],
      optimizeCountSql: true,
      hitCount: false,
      countId: null,
      maxLimit: null,
      searchCount: true,
      pages: Math.ceil(mockSkuList.length / limit),
    },
  })
})

// 模拟上架 SKU 接口
Mock.mock(/\/api\/product\/onSale\/\d+/, 'get', (options) => {
  const matches = options.url.match(/\d+/g)
  if (!matches || matches.length < 1) {
    return Mock.mock({
      code: 400,
      message: '参数错误',
      ok: false,
    })
  }

  const skuId = parseInt(matches[0])
  const sku = mockSkuList.find((item: any) => item.id === skuId)
  if (sku) {
    sku.isSale = 1 // 上架
  }

  return Mock.mock({
    code: 200,
    message: '成功',
    ok: true,
  })
})

// 模拟下架 SKU 接口
Mock.mock(/\/api\/product\/cancelSale\/\d+/, 'get', (options) => {
  const matches = options.url.match(/\d+/g)
  if (!matches || matches.length < 1) {
    return Mock.mock({
      code: 400,
      message: '参数错误',
      ok: false,
    })
  }

  const skuId = parseInt(matches[0])
  const sku = mockSkuList.find((item) => item.id === skuId)
  if (sku) {
    sku.isSale = 0 // 下架
  }

  return Mock.mock({
    code: 200,
    message: '成功',
    ok: true,
  })
})

// 模拟获取 SKU 详情接口
Mock.mock(/\/api\/product\/getSkuInfo\/\d+/, 'get', (options) => {
  const matches = options.url.match(/\d+/g)
  if (!matches || matches.length < 1) {
    return Mock.mock({
      code: 400,
      message: '参数错误',
      ok: false,
    })
  }

  const skuId = parseInt(matches[0])
  const sku = mockSkuList.find((item) => item.id === skuId)

  // 添加 skuImageList 字段
  if (sku) {
    sku.skuImageList = [
      {
        id: skuId * 10 + 1,
        imgName: `${sku.skuName}-1`,
        imgUrl: 'https://picsum.photos/100/100',
        skuId: skuId,
      },
      {
        id: skuId * 10 + 2,
        imgName: `${sku.skuName}-2`,
        imgUrl: 'https://picsum.photos/100/100',
        skuId: skuId,
      },
      {
        id: skuId * 10 + 3,
        imgName: `${sku.skuName}-3`,
        imgUrl: 'https://picsum.photos/100/100',
        skuId: skuId,
      },
    ]
  }

  return Mock.mock({
    code: 200,
    message: '成功',
    ok: true,
    data: sku || null,
  })
})

// 模拟删除 SKU 接口
Mock.mock(/\/api\/product\/deleteSku\/\d+/, 'delete', (options) => {
  const matches = options.url.match(/\d+/g)
  if (!matches || matches.length < 1) {
    return Mock.mock({
      code: 400,
      message: '参数错误',
      ok: false,
    })
  }

  const skuId = parseInt(matches[0])
  const index = mockSkuList.findIndex((item) => item.id === skuId)
  if (index !== -1) {
    mockSkuList.splice(index, 1)
  }

  return Mock.mock({
    code: 200,
    message: '成功',
    ok: true,
  })
})

// 模拟更新 SKU 接口
Mock.mock('/api/product/updateSku', 'put', (options) => {
  const data = JSON.parse(options.body)
  const index = mockSkuList.findIndex((item) => item.id === data.id)

  // 更新 SKU 数据
  mockSkuList[index] = { ...mockSkuList[index], ...data }

  return Mock.mock({
    code: 200,
    message: '更新成功',
    ok: true,
  })
})
