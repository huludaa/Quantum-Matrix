import Mock from 'mockjs'
import type { Records, MenuList } from '@/api/acl/roler/type'
import dayjs from 'dayjs'
// 模拟的职位数据
const mockRoleList: Records = [
  {
    id: 1,
    createTime: '2025-01-01 00:00:00',
    updateTime: '2025-01-01 00:00:00',
    roleName: '超级管理员',
    remark: '拥有所有权限',
  },
  {
    id: 2,
    createTime: '2025-01-01 00:00:00',
    updateTime: '2025-01-01 00:00:00',
    roleName: '商品管理员',
    remark: '负责商品相关管理',
  },
  {
    id: 3,
    createTime: '2025-01-01 00:00:00',
    updateTime: '2025-01-01 00:00:00',
    roleName: '权限管理人员',
    remark: '负责权限相关管理',
  },
]

// 模拟的菜单按钮权限数据
const mockMenuList: MenuList = [
  {
    id: 1,
    createTime: '2025-01-01 00:00:00',
    updateTime: '2025-01-01 00:00:00',
    pid: 0,
    name: '权限管理',
    code: 'acl:manage',
    toCode: '',
    type: 0,
    status: null,
    level: 1,
    select: false,
    children: [
      {
        id: 2,
        createTime: '2025-01-01 00:00:00',
        updateTime: '2025-01-01 00:00:00',
        pid: 1,
        name: '用户管理',
        code: 'acl:user',
        toCode: '/acl/user',
        type: 1,
        status: null,
        level: 2,
        select: false,
        children: [
          {
            id: 21,
            createTime: '2025-01-01 00:00:00',
            updateTime: '2025-01-01 00:00:00',
            pid: 2,
            name: '添加用户',
            code: 'acl:user:add',
            toCode: '',
            type: 2,
            status: null,
            level: 3,
            select: false,
            children: [],
          },
          {
            id: 22,
            createTime: '2025-01-01 00:00:00',
            updateTime: '2025-01-01 00:00:00',
            pid: 2,
            name: '删除用户',
            code: 'acl:user:delete',
            toCode: '',
            type: 2,
            status: null,
            level: 3,
            select: false,
            children: [],
          },
          {
            id: 23,
            createTime: '2025-01-01 00:00:00',
            updateTime: '2025-01-01 00:00:00',
            pid: 2,
            name: '分配角色',
            code: 'acl:user:assign',
            toCode: '',
            type: 2,
            status: null,
            level: 3,
            select: false,
            children: [],
          },
          {
            id: 24,
            createTime: '2025-01-01 00:00:00',
            updateTime: '2025-01-01 00:00:00',
            pid: 2,
            name: '更新用户',
            code: 'acl:user:update',
            toCode: '',
            type: 2,
            status: null,
            level: 3,
            select: false,
            children: [],
          },
        ],
      },
      {
        id: 3,
        createTime: '2025-01-01 00:00:00',
        updateTime: '2025-01-01 00:00:00',
        pid: 1,
        name: '角色管理',
        code: 'acl:role',
        toCode: '/acl/role',
        type: 1,
        status: null,
        level: 2,
        select: false,
        children: [
          {
            id: 31,
            createTime: '2025-01-01 00:00:00',
            updateTime: '2025-01-01 00:00:00',
            pid: 3,
            name: '添加角色',
            code: 'acl:role:add',
            toCode: '',
            type: 2,
            status: null,
            level: 3,
            select: false,
            children: [],
          },
          {
            id: 32,
            createTime: '2025-01-01 00:00:00',
            updateTime: '2025-01-01 00:00:00',
            pid: 3,
            name: '删除角色',
            code: 'acl:role:delete',
            toCode: '',
            type: 2,
            status: null,
            level: 3,
            select: false,
            children: [],
          },
          {
            id: 33,
            createTime: '2025-01-01 00:00:00',
            updateTime: '2025-01-01 00:00:00',
            pid: 3,
            name: '分配权限',
            code: 'acl:role:assign',
            toCode: '',
            type: 2,
            status: null,
            level: 3,
            select: false,
            children: [],
          },
          {
            id: 34,
            createTime: '2025-01-01 00:00:00',
            updateTime: '2025-01-01 00:00:00',
            pid: 3,
            name: '更新角色',
            code: 'acl:role:update',
            toCode: '',
            type: 2,
            status: null,
            level: 3,
            select: false,
            children: [],
          },
        ],
      },
      {
        id: 4,
        createTime: '2025-01-01 00:00:00',
        updateTime: '2025-01-01 00:00:00',
        pid: 1,
        name: '菜单管理',
        code: 'acl:menu',
        toCode: '/acl/menu',
        type: 1,
        status: null,
        level: 2,
        select: false,
        children: [
          {
            id: 41,
            createTime: '2025-01-01 00:00:00',
            updateTime: '2025-01-01 00:00:00',
            pid: 4,
            name: '添加菜单',
            code: 'acl:menu:add',
            toCode: '',
            type: 2,
            status: null,
            level: 3,
            select: false,
            children: [],
          },
          {
            id: 42,
            createTime: '2025-01-01 00:00:00',
            updateTime: '2025-01-01 00:00:00',
            pid: 4,
            name: '更新菜单',
            code: 'acl:menu:update',
            toCode: '',
            type: 2,
            status: null,
            level: 3,
            select: false,
            children: [],
          },
          {
            id: 43,
            createTime: '2025-01-01 00:00:00',
            updateTime: '2025-01-01 00:00:00',
            pid: 4,
            name: '删除菜单',
            code: 'acl:menu:delete',
            toCode: '',
            type: 2,
            status: null,
            level: 3,
            select: false,
            children: [],
          },
        ],
      },
    ],
  },
  {
    id: 5,
    createTime: '2025-01-01 00:00:00',
    updateTime: '2025-01-01 00:00:00',
    pid: 0,
    name: '商品管理',
    code: 'product:manage',
    toCode: '',
    type: 0,
    status: null,
    level: 1,
    select: false,
    children: [
      {
        id: 6,
        createTime: '2025-01-01 00:00:00',
        updateTime: '2025-01-01 00:00:00',
        pid: 5,
        name: '品牌管理',
        code: 'product:trademark',
        toCode: '/product/trademark',
        type: 1,
        status: null,
        level: 2,
        select: false,
        children: [
          {
            id: 61,
            createTime: '2025-01-01 00:00:00',
            updateTime: '2025-01-01 00:00:00',
            pid: 6,
            name: '添加品牌',
            code: 'product:trademark:add',
            toCode: '',
            type: 2,
            status: null,
            level: 3,
            select: false,
            children: [],
          },
          {
            id: 62,
            createTime: '2025-01-01 00:00:00',
            updateTime: '2025-01-01 00:00:00',
            pid: 6,
            name: '更新品牌',
            code: 'product:trademark:update',
            toCode: '',
            type: 2,
            status: null,
            level: 3,
            select: false,
            children: [],
          },
          {
            id: 63,
            createTime: '2025-01-01 00:00:00',
            updateTime: '2025-01-01 00:00:00',
            pid: 6,
            name: '删除品牌',
            code: 'product:trademark:delete',
            toCode: '',
            type: 2,
            status: null,
            level: 3,
            select: false,
            children: [],
          },
        ],
      },
      {
        id: 7,
        createTime: '2025-01-01 00:00:00',
        updateTime: '2025-01-01 00:00:00',
        pid: 5,
        name: '属性管理',
        code: 'product:attr',
        toCode: '/product/attr',
        type: 1,
        status: null,
        level: 2,
        select: false,
        children: [
          {
            id: 71,
            createTime: '2025-01-01 00:00:00',
            updateTime: '2025-01-01 00:00:00',
            pid: 7,
            name: '添加属性',
            code: 'product:attr:add',
            toCode: '',
            type: 2,
            status: null,
            level: 3,
            select: false,
            children: [],
          },
          {
            id: 72,
            createTime: '2025-01-01 00:00:00',
            updateTime: '2025-01-01 00:00:00',
            pid: 7,
            name: '更新属性',
            code: 'product:attr:update',
            toCode: '',
            type: 2,
            status: null,
            level: 3,
            select: false,
            children: [],
          },
          {
            id: 73,
            createTime: '2025-01-01 00:00:00',
            updateTime: '2025-01-01 00:00:00',
            pid: 7,
            name: '删除属性',
            code: 'product:attr:delete',
            toCode: '',
            type: 2,
            status: null,
            level: 3,
            select: false,
            children: [],
          },
        ],
      },
      {
        id: 8,
        createTime: '2025-01-01 00:00:00',
        updateTime: '2025-01-01 00:00:00',
        pid: 5,
        name: 'SPU管理',
        code: 'product:spu',
        toCode: '/product/spu',
        type: 1,
        status: null,
        level: 2,
        select: false,
        children: [
          {
            id: 81,
            createTime: '2025-01-01 00:00:00',
            updateTime: '2025-01-01 00:00:00',
            pid: 8,
            name: '添加SPU',
            code: 'product:spu:add',
            toCode: '',
            type: 2,
            status: null,
            level: 3,
            select: false,
            children: [],
          },
          {
            id: 82,
            createTime: '2025-01-01 00:00:00',
            updateTime: '2025-01-01 00:00:00',
            pid: 8,
            name: '更新SPU',
            code: 'product:spu:update',
            toCode: '',
            type: 2,
            status: null,
            level: 3,
            select: false,
            children: [],
          },
          {
            id: 83,
            createTime: '2025-01-01 00:00:00',
            updateTime: '2025-01-01 00:00:00',
            pid: 8,
            name: '删除SPU',
            code: 'product:spu:delete',
            toCode: '',
            type: 2,
            status: null,
            level: 3,
            select: false,
            children: [],
          },
          {
            id: 84,
            createTime: '2025-01-01 00:00:00',
            updateTime: '2025-01-01 00:00:00',
            pid: 8,
            name: '添加sku',
            code: 'product:spu:addsku',
            toCode: '',
            type: 2,
            status: null,
            level: 3,
            select: false,
            children: [],
          },
        ],
      },
      {
        id: 9,
        createTime: '2025-01-01 00:00:00',
        updateTime: '2025-01-01 00:00:00',
        pid: 5,
        name: 'SKU管理',
        code: 'product:sku',
        toCode: '/product/sku',
        type: 1,
        status: null,
        level: 2,
        select: false,
        children: [
          {
            id: 91,
            createTime: '2025-01-01 00:00:00',
            updateTime: '2025-01-01 00:00:00',
            pid: 9,
            name: '上下架sku',
            code: 'product:sku:put',
            toCode: '',
            type: 2,
            status: null,
            level: 3,
            select: false,
            children: [],
          },
          {
            id: 92,
            createTime: '2025-01-01 00:00:00',
            updateTime: '2025-01-01 00:00:00',
            pid: 9,
            name: '更新SKU',
            code: 'product:sku:update',
            toCode: '',
            type: 2,
            status: null,
            level: 3,
            select: false,
            children: [],
          },
          {
            id: 93,
            createTime: '2025-01-01 00:00:00',
            updateTime: '2025-01-01 00:00:00',
            pid: 9,
            name: '删除SKU',
            code: 'product:sku:delete',
            toCode: '',
            type: 2,
            status: null,
            level: 3,
            select: false,
            children: [],
          },
        ],
      },
    ],
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
    mockRoleList[index].updateTime = dayjs().format('YYYY-MM-DD HH:mm:ss')
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
  const { roleId, permissionId } = options.url
    .split('?')[1]
    .split('&')
    .reduce((acc: any, curr: string) => {
      const [key, value] = curr.split('=')
      acc[key] = value
      return acc
    }, {})

  // 更新权限状态
  const updatePermissionStatus = (menuList: MenuList) => {
    menuList.forEach((item) => {
      if (item.id === Number(permissionId)) {
        item.select = true
      }
      if (item.children) {
        updatePermissionStatus(item.children)
      }
    })
  }

  updatePermissionStatus(mockMenuList)

  return Mock.mock({
    code: 200,
    message: '成功',
    ok: true,
  })
})
