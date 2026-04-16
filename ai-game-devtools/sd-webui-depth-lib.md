---
title: sd-webui-depth-lib
created: 2026-04-17
updated: 2026-04-17
type: entity
tags: [tool, ai, python, open-source]
sources: [raw/articles/ai-game-devtools/sd-webui-depth-lib.md]
---

# sd-webui-depth-lib

**Depth map library and poser** — 为 [[ai-game-devtools/controlnet]] 扩展（A1111 WebUI）提供深度图库和可视化编辑器。

## 概述

sd-webui-depth-lib 是 Automatic1111 Stable Diffusion WebUI 的一个扩展插件，在 WebUI 内新增 "Depth Library" 选项卡，提供预置深度图浏览、画布组合编辑、一键发送到 ControlNet 输入等功能。作者 jexom。

## 核心功能

- **深度图浏览器**：按分类标签页（hands、shapes）浏览预置深度图
- **Fabric.js 画布编辑器**：可视化组合多个深度图元素，支持拖拽/缩放/旋转
- **参数调节**：画布分辨率（64–2048）、基础深度亮度（0–255）、元素透明度
- **背景参考图**：可导入背景图片作为构图参考（半透明叠加）
- **导出 PNG**：将合成的深度图保存为 PNG 下载
- **发送到 ControlNet**：一键将深度图发送到 txt2img 的 ControlNet 输入
- **自定义扩展**：用户可在 `maps/<category>/` 目录下添加自己的深度图

## 技术架构

| 层 | 文件 | 说明 |
|---|---|---|
| Python | `scripts/main.py` | A1111 Script 扩展，注册 Depth Library 选项卡，Gradio UI 定义 |
| JavaScript | `javascript/main.js` | Fabric.js 画布操作，深度图组合/编辑/导出/发送 |
| JavaScript | `javascript/fabric.js` | 内嵌 Fabric.js 库（2D Canvas 引擎） |
| 资产 | `maps/hands/` | ~30 张手部姿态深度图（正/背/侧面、数字、手势） |
| 资产 | `maps/shapes/` | 4 张几何形状深度图（圆/方/星/六边形） |

### 关键实现细节

- Python 端通过 `script_callbacks.on_ui_tabs` 注册新选项卡，所有交互逻辑通过 `_js` 回调委托给前端 JavaScript
- JavaScript 端使用 `MutationObserver` 等待 Gradio 应用渲染完成后初始化 Fabric.js Canvas
- `depth_sendImage()` 通过创建 File Blob + DataTransfer，向 ControlNet 的 file input 派发 change 事件实现跨插件数据传输

## 使用场景

- ControlNet depth 模式快速选择预置深度图（如手部姿态、几何形状）
- 多深度图元素组合生成复杂姿态图
- 作为 [[ai-game-devtools/openpose-editor]] 的补充，提供更简单的深度图编辑能力

## 许可证

仓库中未明确声明 LICENSE 文件

## 相关链接

- [GitHub](https://github.com/jexom/sd-webui-depth-lib)
- [ControlNet 扩展](https://github.com/Mikubill/sd-webui-controlnet)
- [A1111 WebUI](https://github.com/AUTOMATIC1111/stable-diffusion-webui)

## 与同类工具差异

- 相比 [[ai-game-devtools/depth-anything-v2]]：Depth Anything V2 **生成**深度图（从 RGB 图像），而 sd-webui-depth-lib **管理和组合**预置深度图
- 相比 [[ai-game-devtools/openpose-editor]]：Openpose Editor 专注于人体骨骼姿态编辑，sd-webui-depth-lib 更通用，支持任意深度图的叠加组合
- 与 [[ai-game-devtools/controlnet]] 互补：ControlNet 消费深度图作为条件输入，sd-webui-depth-lib 提供深度图的生产与管理能力
