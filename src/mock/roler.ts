import Mock from 'mockjs'
import dayjs from 'dayjs'
// 模拟的职位数据
const mockRoleList = [
  {
    id: 1,
    createTime: '2025-01-01 00:00:00',
    updateTime: '2025-01-01 00:00:00',
    roleName: '超级管理员',
    remark: null,
  },
  {
    id: 2,
    createTime: '2025-01-01 00:00:00',
    updateTime: '2025-01-01 00:00:00',
    roleName: '普通用户',
    remark: null,
  },
]

// 模拟的菜单权限数据
const mockMenuList = [
  {
    id: 1,
    createTime: '2025-01-01 00:00:00',
    updateTime: '2025-01-01 00:00:00',
    pid: 0,
    name: '系统管理',
    code: 'system',
    toCode: '',
    type: 0,
    status: null,
    level: 1,
    children: [
      {
        id: 2,
        createTime: '2025-01-01 00:00:00',
        updateTime: '2025-01-01 00:00:00',
        pid: 1,
        name: '用户管理',
        code: 'user',
        toCode: '',
        type: 1,
        status: null,
        level: 2,
        select: false,
      },
      {
        id: 3,
        createTime: '2025-01-01 00:00:00',
        updateTime: '2025-01-01 00:00:00',
        pid: 1,
        name: '商品管理',
        code: 'goods',
        toCode: '',
        type: 1,
        status: null,
        level: 2,
        select: false,
      },
    ],
    select: false,
  },
]

// 模拟获取全部职位接口
Mock.mock(/\/api\/acl\/role\/\d+\/\d+\/\?roleName=\w*/, 'get', (options) => {
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

  // 获取查询参数中的 roleName
  const roleName = new URL(options.url, 'http://localhost').searchParams.get('roleName') || ''

  // 过滤职位列表
  const filteredRoles = mockRoleList.filter((role) =>
    roleName ? role.roleName.includes(roleName) : true,
  )

  // 返回分页数据
  return Mock.mock({
    code: 200,
    message: '成功',
    ok: true,
    data: {
      records: filteredRoles.slice((page - 1) * limit, page * limit),
      total: filteredRoles.length,
      size: limit,
      current: page,
      orders: [],
      optimizeCountSql: true,
      hitCount: false,
      countId: null,
      maxLimit: null,
      searchCount: true,
      pages: Math.ceil(filteredRoles.length / limit),
    },
  })
})

// 模拟添加或更新职位接口
Mock.mock('/api/acl/role/save', 'post', (options) => {
  const data = JSON.parse(options.body)
  if (data.id) {
    // 更新职位
    const index = mockRoleList.findIndex((item) => item.id === data.id)
    if (index !== -1) {
      mockRoleList[index] = { ...mockRoleList[index], ...data }
    }
  } else {
    // 添加职位
    data.id = mockRoleList.length + 1
    data.createTime = dayjs().format('YYYY-MM-DD HH:mm:ss')
    data.updateTime = dayjs().format('YYYY-MM-DD HH:mm:ss')
    mockRoleList.push(data)
  }
  return Mock.mock({
    code: 200,
    message: '成功',
    ok: true,
  })
})

// 模拟更新职位接口
Mock.mock('/api/acl/role/update', 'put', (options) => {
  const data = JSON.parse(options.body)
  const index = mockRoleList.findIndex((item) => item.id === data.id)
  if (index !== -1) {
    mockRoleList[index] = { ...mockRoleList[index], ...data }
    mockRoleList[index].updateTime = new Date().toISOString()
  }
  return Mock.mock({
    code: 200,
    message: '成功',
    ok: true,
  })
})

// 模拟删除职位接口
Mock.mock(/\/api\/acl\/role\/remove\/\d+/, 'delete', (options) => {
  const matches = options.url.match(/\d+/g)
  if (!matches || matches.length < 1) {
    return Mock.mock({
      code: 400,
      message: '参数错误',
      ok: false,
    })
  }

  const roleId = parseInt(matches[0])
  const index = mockRoleList.findIndex((item) => item.id === roleId)
  if (index !== -1) {
    mockRoleList.splice(index, 1)
  }

  return Mock.mock({
    code: 200,
    message: '成功',
    ok: true,
  })
})

// 模拟获取菜单权限数据接口
Mock.mock(/\/api\/acl\/permission\/toAssign\/\d+/, 'get', (options) => {
  const matches = options.url.match(/\d+/g)
  if (!matches || matches.length < 1) {
    return Mock.mock({
      code: 400,
      message: '参数错误',
      ok: false,
    })
  }

  const roleId = parseInt(matches[0])
  const role = mockRoleList.find((role) => role.id === roleId)

  // 返回菜单权限数据
  return Mock.mock({
    code: 200,
    message: '成功',
    ok: true,
    data: mockMenuList,
  })
})

// 模拟分配权限接口
Mock.mock(/\/api\/acl\/permission\/doAssign\/\?roleId=\d+&permissionId=\d+/, 'post', (options) => {
  const roleId = new URL(options.url, 'http://localhost').searchParams.get('roleId')
  const permissionId = new URL(options.url, 'http://localhost').searchParams.get('permissionId')

  // 这里可以根据 roleId 和 permissionId 进行权限分配的逻辑处理
  // 例如，将权限 ID 绑定到角色 ID 上

  return Mock.mock({
    code: 200,
    message: '成功',
    ok: true,
  })
})
