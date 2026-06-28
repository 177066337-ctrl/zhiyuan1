# 高考志愿填报指南

## 1. 项目简介

这是一个基于 React + Vite + TypeScript + Tailwind + React Router 构建的静态站点，定位为“高考志愿填报指导网站 + 院校专业查询工具”。

## 2. 网站定位

本站更适合做学习参考、风险提示和查询辅助，不是正式填报系统。

## 3. 当前功能

- 首页指导站入口
- 志愿填报入门
- 风险避坑
- 专业选择
- FAQ
- 案例库
- 工具页
- 院校查询
- 专业查询
- 分数试查
- 收藏功能

## 4. 页面说明

- `/`：首页
- `/guide`：填报入门
- `/faq`：FAQ
- `/risks`：风险避坑
- `/cases`：案例库
- `/major-guide`：专业选择
- `/tools`：工具页
- `/disclaimer`：免责声明
- `/schools`：院校查询
- `/majors`：专业查询

## 5. 本地运行方式

```powershell
cd D:\2026\zhiyuan\app
npm install
npm run dev
```

## 6. 构建方式

```powershell
cd D:\2026\zhiyuan\app
npm run build
npm run preview
```

## 7. GitHub Pages 部署方式

项目使用 `HashRouter`，适合 GitHub Pages 静态托管。

- 本地开发：`VITE_BASE=/`
- 项目站点（仓库名 `zhiyuan`）：`VITE_BASE=/zhiyuan/`
- 用户根站点（`username.github.io`）：`VITE_BASE=/`

## 8. 数据与知识库说明

公开站点读取的主要是 `public/data/knowledge/` 下的整理后 JSON 数据，以及 `public/data/` 下的院校、专业和分数试查数据。

`xuefeng-agent-master` 原始资料不建议直接进入公开仓库。

## 9. 官方核验提醒

涉及以下内容时，必须以当年官方信息为准：

- 各省志愿设置与批次安排
- 招生计划
- 选科要求
- 学费
- 校区
- 体检限制
- 分数位次
- 专业录取数据
- 院校招生章程

## 10. 免责声明

本站仅供学习和参考，不构成正式填报意见，不承诺录取结果。

## 11. 不做什么

- 不做包录取承诺
- 不做精准预测
- 不做“一定能上”式表达
- 不直接公开原始资料包

## 12. 后续计划

- 新高考专题页
- 冲稳保策略页
- 院校选择指南页
- 院校对比表
- 风险自查工具
