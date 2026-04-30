---
title: Stable.art
created: 2026-04-17
updated: 2026-04-17
type: entity
tags: [tool, image-generation, open-source, python, automation]
sources: [raw/articles/ai-game-devtools/stable-art.md]
---

# Stable.art

**isekaidev** 开源 Photoshop 插件（v23.3.0+），将 Stable Diffusion（Automatic1111 后端）直接集成到 Photoshop 工作流中，加速艺术创作。MIT 许可，v0.0.1。

## 核心功能

| 功能 | 说明 |
|------|------|
| **txt2img** | 文本生成图像，默认 512×512，支持矩形选框工具自定义任意尺寸/比例 |
| **img2img / inpaint** | 用任何选择工具（矩形选框、套索、快速选择、魔棒）选中区域，点击 Generate 即可，无需手动制作蒙版 |
| **Lexica.art 集成** | 插件内置 Lexica.art 搜索引擎，用于提示词灵感查找 |
| **outpaint** | 外绘扩展（v0.0.1 中 Coming Soon） |

## 技术架构

- **前端框架：** Vue 2.7.14 + Vue CLI 5.0 + SCSS
- **插件运行时：** Adobe UXP（Photoshop 插件框架）
- **后端 API：** [[sd-webui-controlnet]] 的同源 Automatic1111 SD WebUI REST API
- **图像处理：** Jimp（JavaScript 图像操作库）
- **错误追踪：** Sentry（Vue + BrowserTracing 全链路追踪）
- **HTTP 客户端：** Axios

## 工作原理

```
Photoshop (UXP 运行时)
  └── Stable.art 插件面板（Vue 2 SPA）
       ├── Generate Tab（txt2img / img2img / inpaint 控制）
       │    ├── 提示词/反向提示词
       │    ├── 模型/采样器/步数/CFG/种子参数
       │    └── 选区 → 自动生成蒙版 → 发送到 A1111 API
       └── Explore Tab（Lexica.art 搜索）
                    ↓
         Automatic1111 SD WebUI API
         (http://127.0.0.1:7860 或远程地址)
```

1. 用户在 Photoshop 中用任意选择工具选中区域
2. 插件通过 UXP `photoshop` 模块读取当前文档和选区
3. `maskGeneratorMixin` 将选区转换为二值蒙版
4. 通过 Axios 调用 A1111 的 `/sdapi/v1/img2img` 或 `/sdapi/v1/txt2img` 端点
5. 接收 base64 图像，通过 Jimp 处理后作为新图层插入 Photoshop

## 安装方式

通过 CCX 文件安装（Creative Cloud 桌面应用 → 双击 CCX → Photoshop 插件面板自动出现），需确保 Automatic1111 WebUI 已启用 API 模式。

## 与同类工具差异

- 相比 [[comfyui]]（独立节点式 UI）：Stable.art 直接嵌入 Photoshop，设计师无需离开专业软件
- 相比 [[sd-webui-controlnet]] 的 WebUI：Stable.art 专注 PSD 内直接生成/修图，而非独立 Web 应用
- 选区即蒙版的零门槛设计：不需要学习 ControlNet 预处理器或手动绘制蒙版

## 相关链接

- GitHub: https://github.com/isekaidev/stable.art
- 下载: https://github.com/isekaidev/stable.art/releases/download/v0.0.1/stable.art_0.0.1.ccx
- Discord: https://discord.gg/hTbDFxG78a
- 许可证: MIT
