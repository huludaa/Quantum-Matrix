# 企管通后台管理平台

一个基于 Vue 3 + TypeScript + Element Plus 的现代化后台管理系统。

## 功能特性

### 1. 用户权限管理

- 用户管理：支持用户的增删改查
- 角色管理：支持角色的创建、编辑、删除
- 权限分配：支持为角色分配菜单和按钮权限
- 多角色支持：一个用户可以被分配多个角色

### 2. 商品管理

- SKU 管理：支持商品的 SKU 信息管理
- 商品分类：支持商品分类的层级管理
- 商品属性：支持商品属性的配置
- 图片管理：支持商品图片的上传和管理

### 3. 系统功能

- 响应式布局：适配不同屏幕尺寸
- 主题定制：支持系统主题的切换
- 数据可视化：集成图表展示功能
- 国际化：支持中英文切换

## 技术栈

- 前端框架：Vue 3
- 开发语言：TypeScript
- UI 组件库：Element Plus
- 状态管理：Pinia
- 路由管理：Vue Router
- HTTP 请求：Axios
- 代码规范：ESLint + Prettier
- 构建工具：Vite

## 项目结构

```
vue3-eca-admin/
├── src/
│   ├── api/                # API 接口定义
│   ├── assets/            # 静态资源
│   ├── components/        # 公共组件
│   ├── mock/              # 模拟数据
│   ├── router/            # 路由配置
│   ├── store/             # 状态管理
│   ├── styles/            # 全局样式
│   ├── utils/             # 工具函数
│   └── views/             # 页面组件
├── public/                # 公共资源
├── .eslintrc.js          # ESLint 配置
├── .prettierrc           # Prettier 配置
├── tsconfig.json         # TypeScript 配置
├── vite.config.ts        # Vite 配置
└── package.json          # 项目依赖
```

## 安装说明

1. 克隆项目

```bash
git clone [项目地址]
```

2. 安装依赖

```bash
pnpm install
```

3. 启动开发服务器

```bash
pnpm run dev
```

4. 构建生产版本

```bash
pnpm run build
```

## 使用说明

### 用户权限管理

1. 进入用户管理页面
2. 点击"添加用户"创建新用户
3. 在角色管理页面创建角色
4. 为角色分配相应的权限
5. 将角色分配给用户

### 商品管理

1. 进入商品管理页面
2. 创建商品分类
3. 添加商品 SKU 信息
4. 上传商品图片
5. 设置商品属性交换机

## 贡献指南

Fork 项目
