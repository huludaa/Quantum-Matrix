import Mock from 'mockjs'
import dayjs from 'dayjs'
import type { Records, AllRole } from '@/api/acl/user/type'

// 模拟用户列表数据
export const mockUserList: Records = [
  {
    id: 1,
    createTime: '2025-01-01 00:00:00',
    updateTime: '2025-01-01 00:00:00',
    username: '凡尔赛的神',
    password: '123456',
    name: '张三',
    phone: null,
    roleName: '权限管理员',
  },
  {
    id: 2,
    createTime: '2025-01-01 00:00:00',
    updateTime: '2025-01-01 00:00:00',
    username: '喜欢吃的猪八戒',
    password: '123456',
    name: '李四',
    phone: null,
    roleName: '商品管理员',
  },
  {
    id: 3,
    createTime: '2025-01-01 00:00:00',
    updateTime: '2025-01-01 00:00:00',
    username: '未来的亿万富翁',
    password: '123456',
    name: 'admin',
    phone: null,
    roleName: '超级管理员',
  },
]

// 模拟的职位数据
const mockRoleList: AllRole = [
  {
    id: 1,
    createTime: '2025-01-01 00:00:00',
    updateTime: '2025-01-01 00:00:00',
    name: '超级管理员',
    roleName: '超级管理员',
  },
  {
    id: 2,
    createTime: '2025-01-01 00:00:00',
    updateTime: '2025-01-01 00:00:00',
    name: '商品管理员',
    roleName: '商品管理员',
  },
  {
    id: 3,
    createTime: '2025-01-01 00:00:00',
    updateTime: '2025-01-01 00:00:00',
    name: '权限管理人员',
    roleName: '权限管理人员',
  },
]

// 模拟获取用户列表接口
Mock.mock(/\/api\/acl\/user\/\d+\/\d+\/\?username=\w*/, 'get', (options) => {
  // 使用正则表达式匹配 URL 中的 page 和 limit
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

  // 获取查询参数中的 username
  const username = new URL(options.url, 'http://localhost').searchParams.get('username') || ''

  // 过滤用户列表
  const filteredUsers = mockUserList.filter((user) =>
    username ? user.username?.includes(username) : true,
  )

  // 返回分页数据
  return Mock.mock({
    code: 200,
    message: '成功',
    ok: true,
    data: {
      records: filteredUsers.slice((page - 1) * limit, page * limit),
      total: filteredUsers.length,
    },
  })
})

// 模拟添加或更新用户接口
Mock.mock('/api/acl/user/save', 'post', (options) => {
  const data = JSON.parse(options.body)
  if (data.id) {
    // 更新用户
    const index = mockUserList.findIndex((item) => item.id === data.id)
    if (index !== -1) {
      mockUserList[index] = { ...mockUserList[index], ...data }
    }
  } else {
    // 添加用户
    data.id = mockUserList.length + 1
    data.createTime = dayjs().format('YYYY-MM-DD HH:mm:ss')
    data.updateTime = dayjs().format('YYYY-MM-DD HH:mm:ss')
    mockUserList.push(data)
  }
  return Mock.mock({
    code: 200,
    message: '成功',
    ok: true,
  })
})

// 模拟更新用户接口
Mock.mock('/api/acl/user/update', 'put', (options) => {
  const data = JSON.parse(options.body)
  const index = mockUserList.findIndex((item) => item.id === data.id)
  if (index !== -1) {
    mockUserList[index] = { ...mockUserList[index], ...data }
    mockUserList[index].updateTime = dayjs().format('YYYY-MM-DD HH:mm:ss')
  }
  return Mock.mock({
    code: 200,
    message: '成功',
    ok: true,
  })
})

// 模拟删除用户接口
Mock.mock(/\/api\/acl\/user\/remove\/\d+/, 'delete', (options) => {
  const id = options.url.split('/').pop()
  const index = mockUserList.findIndex((item) => item.id === Number(id))
  if (index !== -1) {
    mockUserList.splice(index, 1)
  }
  return Mock.mock({
    code: 200,
    message: '成功',
    ok: true,
  })
})

// 模拟批量删除用户接口
Mock.mock('/api/acl/user/batchRemove/', 'delete', (options) => {
  const idList = options.body

  mockUserList = mockUserList.filter((user) => !idList.includes(user.id))
  return Mock.mock({
    code: 200,
    message: '成功',
    ok: true,
  })
})

// 模拟获取职位列表接口
Mock.mock(/\/api\/acl\/user\/toAssign\/\d+/, 'get', (options) => {
  const userId = options.url.split('/').pop()
  const user = mockUserList.find((user) => user.id === Number(userId))

  // 获取用户当前拥有的所有角色
  const userRoleNames = user?.roleName ? user.roleName.split(',') : []

  // 过滤出用户已分配的角色
  const assignRoles = mockRoleList.filter(
    (role) => role.roleName && userRoleNames.includes(role.roleName),
  )

  return Mock.mock({
    code: 200,
    message: '成功',
    ok: true,
    data: {
      assignRoles,
      allRolesList: mockRoleList,
    },
  })
})

// 模拟分配职位接口
Mock.mock('/api/acl/user/doAssignRole', 'post', (options) => {
  const data = JSON.parse(options.body)
  const user = mockUserList.find((user) => user.id === data.userId)

  if (user) {
    // 获取所有选中的角色名称
    const selectedRoleNames = data.roleIdList
      .map((roleId: number) => mockRoleList.find((role) => role.id === roleId)?.roleName)
      .filter((name: string | undefined): name is string => name !== undefined)

    // 更新用户的角色名称
    user.roleName = selectedRoleNames.join(',')
  }

  return Mock.mock({
    code: 200,
    message: '成功',
    ok: true,
  })
})
