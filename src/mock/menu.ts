// src/api/mock/menu.ts
import Mock from 'mockjs'
import type { Permisstion, PermisstionList, MenuParams } from '@/api/acl/permission/type'
import dayjs from 'dayjs'
// 初始模拟数据
let mockMenuList: PermisstionList = [
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
      },
    ],
  },
]

// 深度优先搜索查找节点
const findNode = (list: PermisstionList, id: number): Permisstion | null => {
  for (const item of list) {
    if (item.id === id) return item
    if (item.children) {
      const found = findNode(item.children, id)
      if (found) return found
    }
  }
  return null
}

// 查找节点及其父节点数组
const findNodeAndParent = (
  list: PermisstionList,
  id: number,
): { parent: PermisstionList; node?: Permisstion } | null => {
  for (let i = 0; i < list.length; i++) {
    if (list[i].id === id) {
      return { parent: list, node: list[i] }
    }
    if (list[i].children) {
      const result = findNodeAndParent(list[i].children!, id)
      if (result) return result
    }
  }
  return null
}

// 获取所有ID（用于生成新ID）
const getAllIds = (list: PermisstionList): number[] => {
  return list.flatMap((item) => [
    item.id,
    ...(item.children ? getAllIds(item.children) : []),
  ]) as number[]
}

// 获取所有权限
Mock.mock('/api/acl/permission', 'get', () => {
  return {
    code: 200,
    message: '成功',
    ok: true,
    data: mockMenuList,
  }
})

// 添加菜单
Mock.mock('/api/acl/permission/save', 'post', (options) => {
  const data: MenuParams = JSON.parse(options.body)
  const now = dayjs().format('YYYY-MM-DD HH:mm:ss')

  const newId = Math.max(0, ...getAllIds(mockMenuList)) + 1

  const newItem: Permisstion = {
    id: newId,
    pid: data.pid,
    name: data.name,
    code: data.code,
    toCode: data.toCode,
    level: data.level,
    createTime: now,
    updateTime: now,
    children: [],
  }

  const parent = findNode(mockMenuList, data.pid)

  if (parent) {
    if (!parent.children) parent.children = []
    parent.children.push(newItem)
  } else {
    mockMenuList.push(newItem)
  }

  return {
    code: 200,
    message: '添加成功',
    ok: true,
    data: newItem,
  }
})

// 更新菜单
Mock.mock('/api/acl/permission/update', 'put', (options) => {
  const data: MenuParams = JSON.parse(options.body)
  const now = dayjs().format('YYYY-MM-DD HH:mm:ss')

  const found = findNodeAndParent(mockMenuList, data.id!)
  if (found?.node) {
    // 保留原有children和创建时间
    const originalChildren = found.node.children
    const originalCreateTime = found.node.createTime

    Object.assign(found.node, {
      ...data,
      children: originalChildren,
      createTime: originalCreateTime,
      updateTime: now,
    })

    return {
      code: 200,
      message: '更新成功',
      ok: true,
      data: found.node,
    }
  }

  return {
    code: 404,
    message: '未找到该菜单',
    ok: false,
  }
})

// 删除菜单（递归删除）
Mock.mock(/\/api\/acl\/permission\/remove\/\d+/, 'delete', (options) => {
  const id = parseInt(options.url.split('/').pop() || '0')

  // 深拷贝一份数据用于操作
  const tempMenuList = JSON.parse(JSON.stringify(mockMenuList))

  // 递归删除函数
  const deleteRecursive = (menuList: PermisstionList): PermisstionList => {
    return menuList.filter((item) => {
      // 保留不等于目标ID的项
      if (item.id === id) return false

      // 如果有子菜单，递归处理
      if (item.children && item.children.length > 0) {
        item.children = deleteRecursive(item.children)
      }
      return true
    })
  }

  const newMenuList = deleteRecursive(tempMenuList)

  // 只有当数据确实发生变化时才更新
  if (JSON.stringify(newMenuList) !== JSON.stringify(mockMenuList)) {
    mockMenuList = newMenuList
    return {
      code: 200,
      message: '删除成功',
      ok: true,
      data: id,
    }
  }

  return {
    code: 404,
    message: '未找到该菜单',
    ok: false,
  }
})
