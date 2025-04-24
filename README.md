# React Bill Management Application

## 项目简介
React Bill 是一个基于 React 的账单管理应用，旨在帮助用户记录和分析日常收支情况。该项目使用了现代化的前端技术栈，包括 React、Redux、ECharts 和 Ant Design Mobile。

## 功能特性
- **月度账单**：查看每月的收入、支出和结余。
- **年度账单**：分析年度收支情况，包括分类消费分析。
- **记账功能**：快速添加收入或支出记录。
- **数据可视化**：通过 ECharts 提供直观的图表展示。

## 技术栈
- **前端框架**：React
- **状态管理**：Redux Toolkit
- **UI 组件库**：Ant Design Mobile
- **数据可视化**：ECharts
- **工具库**：Lodash、Day.js

## 项目结构
```
react-bill/
├── public/                # 静态资源
├── server/                # 模拟后端数据的 JSON Server
├── src/                   # 源代码
│   ├── components/        # 通用组件
│   ├── pages/             # 页面组件
│   ├── router/            # 路由配置
│   ├── store/             # Redux 状态管理
│   ├── utils/             # 工具函数
│   ├── index.js           # 项目入口文件
│   ├── theme.css          # 全局主题样式
│   └── index.css          # 全局基础样式
├── package.json           # 项目依赖和脚本
├── craco.config.js        # 配置文件
└── README.md              # 项目说明
```

## 快速开始

### 环境建议
- Node.js >= 20.x
- npm >= 9.x

### 安装依赖
```bash
npm install
```

### 启动项目
1. 启动前端开发服务器：
```bash
npm start
```
2. 启动 JSON Server 模拟后端：
```bash
npm run server
```

### 构建项目
```bash
npm run build
```

## 主要页面
- **月度账单**：展示每月的账单数据，支持按日期分组。
- **年度账单**：展示年度收支总览和分类消费分析。
- **记账页面**：支持选择分类、金额、日期和类型（收入/支出）。

## 数据接口
- **获取账单列表**：`GET /bill`
- **新增账单**：`POST /bill`

## 开发者
- **作者**：cles
- **邮箱**：qin.jian@free-sun.com.cn

## 许可证
MIT License