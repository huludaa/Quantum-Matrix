import Mock from 'mockjs'
import type { Records } from '@/api/acl/user/type'
import { mockUserList } from './acluser'

// 模拟用户登录接口
Mock.mock('/api/user/login', 'post', (options) => {
  const { username, password } = JSON.parse(options.body)

  // 在 mockUserList 中查找匹配的用户
  const user = mockUserList.find(
    (user: Records[number]) => user.username === username && user.password === password,
  )

  if (user) {
    // 登录成功
    return {
      code: 200,
      message: '登录成功',
      ok: true,
      data: {
        token: 'admin-token',
        name: user.name,
        avatar: '/public/R-C.jpg',
      },
    }
  } else {
    // 登录失败
    return {
      code: 201,
      message: '用户名或密码错误',
      ok: false,
      data: null,
    }
  }
})

//获取用户信息接口返回的数据（全权限）
Mock.mock('/api/user/info', 'get', {
  code: 200,
  message: '获取用户信息成功',
  ok: true,
  data: {
    routes: ['Acl', 'User', 'Role', 'Permission', 'Product', 'Trademark', 'Attr', 'Spu', 'Sku'], //模拟用户拥有的路由
    buttons: [
      'btn.User.add',
      'btn.User.delete',
      'btn.User.update',
      'btn.User.assign',
      'btn.Role.add',
      'btn.Role.delete',
      'btn.Role.update',
      'btn.Role.assign',
      'btn.Permission.add',
      'btn.Permission.delete',
      'btn.Permission.update',
      'btn.Trademark.add',
      'btn.Trademark.delete',
      'btn.Trademark.update',
      'btn.Attr.add',
      'btn.Attr.delete',
      'btn.Attr.update',
      'btn.Sku.put',
      'btn.Sku.delete',
      'btn.Sku.update',
      'btn.Spu.add',
      'btn.Spu.delete',
      'btn.Spu.update',
      'btn.Spu.addsku',
    ], // 模拟的按钮权限
    roles: ['超级管理员'], // 模拟的用户角色
    name: '未来的亿万富翁', //模拟用户名
    avatar: '/public/R-C.jpg', // 模拟用户头像
  },
})

//退出登录接口返回的数据
Mock.mock('/api/user/logout', 'post', {
  code: 200,
  message: '退出登录成功',
  ok: true,
})
