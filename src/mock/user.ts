import Mock from 'mockjs'

//登录接口返回的数据
Mock.mock('/api/user/login', 'post', {
  code: 200,
  message: '登录成功',
  data: 'mock_token_123456',
})

//获取用户信息接口返回的数据
Mock.mock('/api/user/info', 'get', {
  code: 200,
  message: '获取用户信息成功',
  ok: true,
  data: {
    routes: ['Acl', 'User', 'Role', 'Permission', 'Product', 'Trademark', 'Attr', 'Spu', 'Sku'], //模拟用户拥有的路由
    buttons: ['add', 'edit', 'delete', 'btn.Trademark.add'], // 模拟的按钮权限
    roles: ['admin'], // 模拟的用户角色
    name: 'admin', //模拟用户名
    avatar: '/public/R-C.jpg', // 模拟用户头像
  },
})

//退出登录接口返回的数据
Mock.mock('/api/user/logout', 'post', {
  code: 200,
  message: '退出登录成功',
  ok: true,
})
