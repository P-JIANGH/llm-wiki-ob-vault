---
title: StableStudio
created: 2026-04-17
updated: 2026-04-17
type: entity
tags: [tool, open-source, image-generation, typescript, frontend]
sources: [raw/articles/ai-game-devtools/stablestudio.md]
---

# StableStudio

Stability AI 的开源版 DreamStudio — 用于生成式 AI 图像创作与编辑的 Web 应用。

## 概述

StableStudio 是 [Stability AI](https://stability.ai) 将 DreamStudio 开源后的变体，允许社区在自有后端上运行与定制。基于 React + TypeScript + Zustand + Tailwind 构建，采用领域驱动设计（DDD）组织代码。

## 技术架构

| 层面 | 技术 |
|------|------|
| 框架 | React + TypeScript |
| 构建 | Vite + Yarn 3.3 Workspaces |
| 状态管理 | Zustand（替代 Recoil，hot path 性能更优） |
| 样式 | Tailwind CSS + Emotion |
| 架构模式 | 领域驱动设计（DDD），TypeScript 声明合并实现 fluent API |

## Monorepo 结构

6 个 Yarn Workspace 包：

- **stablestudio-ui** — 主 React UI 应用
- **stablestudio-plugin** — 插件接口定义
- **stablestudio-plugin-stability** — 默认插件，对接 Stability API 推理
- **stablestudio-plugin-webui** — 对接 [[ai-game-devtools/sd-webui-controlnet]] REST API（占位）
- **stablestudio-plugin-webgpu** — WebGPU 本地推理（占位）
- **stablestudio-plugin-example** — 示例插件（含开发者工具）

## 插件系统

插件是导出函数的 JS/TS 模块，核心契约包括 `createStableDiffusionImages`、`getStableDiffusionStyles` 等。功能降级优雅——未实现的方法不影响其他功能。当前限制：同时只能加载一个插件。

## 关键领域（Domains）

- **`Generation.Image`** — 图像生成核心逻辑，最大领域
- **`Editor`** — 无限画布编辑器
- **`Plugin`** — 插件注册与 `Plugin.use` hook
- **`Theme`** — 设计系统 + 通用组件（Icon/Button 等）
- **`GlobalState`** — Zustand 封装
- **`GlobalVariables`** — 全局可用工具函数（css/classes/useEffect 等）

## 与 DreamStudio 的差异

- 去除了 DreamStudio 品牌
- API 调用替换为插件系统（可轻松替换后端）
- 移除 Stability 专属账户功能（计费/密钥管理）
- DreamStudio 仍为官方托管部署

## 历史

1. **2022 夏** — 由 @nin_artificial 用 Vue.js + Python 后端为 Disco Diffusion 创建
2. **2022.8-11** — 加入 inpainting/outpainting/img2img
3. **2022.12-2023.4** — 重写为 React，无限画布编辑器
4. **开源** — 作为社区项目开放，鼓励自定义插件与后端

## 许可证

MIT

## 链接

- GitHub: https://github.com/Stability-AI/StableStudio
- DreamStudio: https://dreamstudio.ai
- Stability Platform: https://platform.stability.ai

## 游戏开发相关性

- 可作为自定义游戏资产生成界面的基础
- 插件系统支持连接任意推理后端（本地 SD、ComfyUI 等）
- DDD 架构为构建复杂创意工具提供参考
- Tailwind + React + Zustand 技术栈现代且可维护
