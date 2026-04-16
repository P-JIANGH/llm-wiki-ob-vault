---
title: Blender-ControlNet
created: 2026-04-17
updated: 2026-04-17
type: entity
tags: [tool, ai, python, blender, code-generation]
sources: [raw/articles/ai-game-devtools/blender-controlnet.md]
---

# Blender-ControlNet

**GitHub:** [coolzilj/Blender-ControlNet](https://github.com/coolzilj/Blender-ControlNet)
**License:** MIT
**Author:** Jin Liu (@coolzilj)

## 概述

Blender 脚本，将 Blender 渲染管线与 AUTOMATIC1111 Stable Diffusion WebUI + ControlNet 集成。用户按 F12 渲染后，脚本自动截取 Blender Compositor 生成的条件图（深度/边缘/骨骼姿态/语义分割），通过 HTTP API 发送给 A1111，生成 AI 增强图像并加载回 Blender Image Editor。

## 核心架构

### 渲染拦截 → AI 生成管线

```
Blender F12 渲染 → render_complete_handler 捕获 → 
Compositor 输出条件图(canny/depth/bone/seg) → 
Base64 编码 → POST /sdapi/v1/txt2img → 
解码生成图 → 保存至 sd_results/ → 加载到 Image Editor
```

### 关键文件

| 文件 | 行数 | 功能 |
|------|------|------|
| `multicn.py` | 356 | 主脚本：渲染钩子 + API 调用 + 多图 ControlNet 单位配置 |
| `seg.py` | 66 | 辅助脚本：从 CSV 创建 150 个语义分割颜色材质 |
| `blender_templates/multicn_depth+seg.blend` | - | 预配置模板（深度+分割双条件图） |

### 支持的 ControlNet 条件图

- **Canny 边缘** — 模型: `diff_control_sd15_canny_fp16`
- **Depth 深度** — 模型: `diff_control_sd15_depth_fp16`
- **Bone/OpenPose 骨骼姿态** — 模型: `diff_control_sd15_openpose_fp16`
- **Segmentation 语义分割** — 模型: `diff_control_sd15_seg_fp16`

最多同时发送 4 种条件图到 A1111，每个独立配置权重、guidance_start/end、分辨率阈值。

### API 交互

- 端点: `http://localhost:7860/sdapi/v1/txt2img`
- 超时: 1000 秒（生成任务可能耗时较长）
- 错误处理: 连接失败/URL无效/超时/404非API模式/sampler不存在

## 依赖

- **AUTOMATIC1111/stable-diffusion-webui** — 必须以 `--api` 模式启动
- **Mikubill/sd-webui-controlnet** — 需启用"Allow other script to control this extension"
- Blender Python 环境（内置 `requests` 库）

## 使用方式

1. A1111 以 `--api` 启动（`COMMANDLINE_ARGS=--api`）
2. 安装 ControlNet 扩展并启用 API 控制 + Multi ControlNet
3. 将 `multicn.py` 粘贴到 Blender Scripting 面板
4. 调整参数（prompt/条件图开关/模型哈希）
5. 按 F12 渲染，等待 AI 生成完成

## 技术特点

- **Blender Handler 模式** — 使用 `@persistent` 渲染完成钩子实现零交互自动化
- **多图条件融合** — alwayson_scripts.controlnet.args 数组追加多个 ControlNet unit
- **帧编号支持** — 文件名使用 `zfill(4)` 四位帧号，适合批量渲染
- **sRGB→线性转换** — seg.py 正确处理颜色空间转换（gamma 2.2）

## 已知限制

- ❌ 不支持动画序列（TODO 列表）
- ❌ 需手动修改脚本切换条件图配置
- ❌ 依赖本地 A1111 实例，无法远程部署
- ❌ 模型哈希必须与本地安装的 ControlNet 模型精确匹配

## 相关链接

- [[ai-game-devtools/text-generation-webui]] — A1111 同类 LLM WebUI 概念
- [[chatdev]] — 多智能体平台支持 Blender 3D 生成工作流
