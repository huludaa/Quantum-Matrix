/**
 * 路由配置文件
 * 包含常量路由和异步路由
 * 常量路由：所有用户都可以访问的路由
 * 异步路由：需要根据用户权限动态加载的路由
 */

// 常量路由
export const constantRoute = [
  {
    name: 'login',
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      title: '登录', // 页面标题
      hidden: true, // 是否在菜单中隐藏
    },
  },
  {
    name: 'layout',
    path: '/',
    component: () => import('@/layout/index.vue'),
    redirect: '/home',
    meta: {
      title: '',
      icon: '',
    },
    children: [
      {
        name: 'home',
        path: '/home',
        component: () => import('@/views/home/index.vue'),
        meta: {
          title: '首页',
          icon: 'HomeFilled',
        },
      },
    ],
  },
  {
    name: 'screen',
    path: '/screen',
    component: () => import('@/views/screen/index.vue'),
    meta: {
      title: '数据大屏',
      icon: 'Platform',
    },
  },
  {
    name: 'missing',
    path: '/404',
    component: () => import('@/views/404/index.vue'),
    meta: {
      title: '404',
      hidden: true,
    },
  },
]
// 异步路由
export const asyncRoute = [
  {
    name: 'Acl',
    path: '/acl',
    component: () => import('@/layout/index.vue'),
    meta: {
      title: '权限管理',
      icon: 'Lock',
    },
    redirect: '/acl/user',
    children: [
      {
        name: 'User',
        path: '/acl/user',
        component: () => import('@/views/acl/user/index.vue'),
        meta: {
          title: '用户管理',
          icon: 'User',
        },
      },
      {
        name: 'Role',
        path: '/acl/role',
        component: () => import('@/views/acl/role/index.vue'),
        meta: {
          title: '角色管理',
          icon: 'UserFilled',
        },
      },
      {
        name: 'Permission',
        path: '/acl/permission',
        component: () => import('@/views/acl/permission/index.vue'),
        meta: {
          title: '菜单管理',
          icon: 'School',
        },
      },
    ],
  },
  {
    name: 'Product',
    path: '/product',
    component: () => import('@/layout/index.vue'),
    meta: {
      title: '商品管理',
      icon: 'Goods',
    },
    redirect: '/product/trademark',
    children: [
      {
        name: 'Trademark',
        path: '/product/trademark',
        component: () => import('@/views/product/trademark/index.vue'),
        meta: {
          title: '品牌管理',
          icon: 'ShoppingCartFull',
        },
      },
      {
        name: 'Attr',
        path: '/product/attr',
        component: () => import('@/views/product/attr/index.vue'),
        meta: {
          title: '属性管理',
          icon: 'ChromeFilled',
        },
      },
      {
        name: 'Spu',
        path: '/product/spu',
        component: () => import('@/views/product/spu/index.vue'),
        meta: {
          title: 'SPU管理',
          icon: 'Orange',
        },
      },
      {
        name: 'Sku',
        path: '/product/sku',
        component: () => import('@/views/product/sku/index.vue'),
        meta: {
          title: 'SKU管理',
          icon: 'Calendar',
        },
      },
    ],
  },
]
// 任意路由
export const anyRoute = [
  {
    name: 'any',
    path: '/:pathMatch(.*)*',
    redirect: '/404',
    meta: {
      title: '任意路由',
      hidden: true,
    },
  },
]
