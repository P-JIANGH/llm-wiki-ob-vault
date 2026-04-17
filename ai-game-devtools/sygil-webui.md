---
title: Sygil-Dev Stable Diffusion Web UI
created: 2026-04-17
updated: 2026-04-17
type: entity
tags: [image-generation, diffusion, tool, open-source]
sources: [raw/articles/ai-game-devtools/sygil-webui.md]
---

# Sygil-Dev Stable Diffusion Web UI

Sygil-Dev 团队开发的 Stable Diffusion 浏览器端 Web UI（2022年），是早期 SD Web 界面之一，与 [[ai-game-devtools/stable-diffusion-webui]]（AUTOMATIC1111）并行开发。提供文生图、图生图、文生视频功能，通过浏览器操作。

## 功能特性

- **双 UI 系统**：Streamlit（主推，活跃开发）+ Gradio（遗留，仅 bug 修复）
- **K-Diffusion 采样器**：k_euler、k_lms、k_euler_a、k_dpm_2、k_dpm_2_a、k_heun、PLMS、DDIM
- **图像增强**：GFPGAN 人脸修复、RealESRGAN 2倍超分（普通+动漫）、LDSR、GoBig、GoLatent
- **Textual Inversion**：训练自定义 embedding 并在提示词中使用
- **CLIP Interrogator**：图生文 — 分析图片生成类似效果的提示词
- **提示词权重**：`token:0.70` 语法控制强调程度
- **负面提示词**：`###` 分隔符排除不想要的概念
- **Word Seeds**：用单词代替数字种子
- **Loopback**：自动将上次生成结果反馈回 img2img
- **Prompt Matrix**：`|` 分隔符生成所有排列组合
- **Mask Painting**：重绘图片特定区域（仅 Gradio）
- **低显存优化**：4GB 显卡可运行 512×512（优化模式）
- **Prompt 验证**：提示词过长时警告
- **Stable Horde 集成**：内置桥接贡献分布式生成网络
- **文生视频**：文本提示生成视频片段（WIP）
- **顺序种子**：批量生成使用连续种子（1000, 1001, 1002...）

## 技术架构

- **Python 3.8.5 + PyTorch 1.13.0 + CUDA 11.7**
- **核心依赖**：diffusers、k-diffusion、taming-transformers、CLIP (openai)
- **UI 框架**：Streamlit 1.14.0（主推）+ Gradio 3.4.1（遗留）+ HydraLit 仪表板
- **API**：FastAPI + Uvicorn
- **配置**：OmegaConf YAML
- **Docker**：多 Dockerfile（base/main/runpod），docker-compose GPU 支持

### 关键源码文件

| 文件 | 行数 | 用途 |
|------|------|------|
| `scripts/webui_streamlit.py` | 458 | Streamlit UI 入口，HydraLit 仪表板 |
| `scripts/webui.py` | 4096 | Gradio 遗留 UI |
| `scripts/stable_diffusion_pipeline.py` | 930 | 自定义扩散管线（封装 diffusers） |
| `scripts/txt2vid.py` | 2498 | 文生视频生成 |
| `scripts/Settings.py` | 1699 | 设置 UI（8 个标签页） |
| `scripts/APIServer.py` | - | FastAPI REST API |
| `scripts/clip_interrogator.py` | - | CLIP 图像分析生成反向提示词 |
| `scripts/textual_inversion.py` | - | Embedding 训练管线 |
| `scripts/post_processing.py` | - | GFPGAN/RealESRGAN 后处理 |

## 与同类工具差异

与 [[ai-game-devtools/stable-diffusion-webui]]（AUTOMATIC1111）和 [[ai-game-devtools/comfyui]] 相比：

- 2022 年早期项目，与 A1111 并行开发，但后来 A1111 成为事实标准
- Streamlit 优先设计（A1111 用 Gradio，ComfyUI 用节点图）
- 内置 Stable Horde 桥接集成
- HydraLit 仪表板用于高级 UI 布局
- 更省显存（4GB GPU 可运行）
- 内置文生视频（WIP）
- 内置 CLIP Interrogator 反向提示词生成
- 目前开发活跃度较低

## 相关链接

- GitHub: https://github.com/Sygil-Dev/sygil-webui
- 文档: https://sygil-dev.github.io/sygil-webui/
- Discord: https://discord.gg/ttM8Tm6wge
- Docker Hub: tukirito/sygil-webui:base
