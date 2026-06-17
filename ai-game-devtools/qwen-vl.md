---
title: Qwen-VL
created: 2026-04-15
updated: 2026-04-15
type: entity
tags: [vlm, multimodal, open-source, chinese, alibaba]
sources: [raw/articles/ai-game-devtools/qwen-vl.md]
---

# Qwen-VL

**Qwen-VL** 是阿里巴巴通义千问（Qwen）系列的多模态视觉-语言大模型（LVLM）。支持图像 + 文本 + 边界框输入，输出文本和边界框。2023年8月由阿里巴巴云开源发布。

## 核心能力

| 能力 | 说明 |
|------|------|
| 多语言图文理解 | 原生支持英文/中文双语，支持图像内中英文字识别 |
| 多图交错对话 | 支持多图输入对比、多图故事创作 |
| 中文开放域定位 | 首个支持中文开放域语言表达生成边界框的开源模型 |
| 细粒度识别 | 448×448 分辨率（多数开源 LVLM 仅 224×224），支持文档 QA、表格理解 |
| 定位输出 | `<ref>文字</ref><box>(x1,y1),(x2,y2)</box>` 格式 |

## 模型系列

| 模型 | 说明 |
|------|------|
| Qwen-VL | 预训练基座；Qwen-7B + OpenCLIP ViT-bigG + cross-attention |
| Qwen-VL-Chat | 对齐聊天模型；支持多图、多轮对话、创意任务 |
| Qwen-VL-Plus | 增强版；支持百万像素级超高清图像，中英文理解增强 |
| Qwen-VL-Max | 最强版本；视觉推理和指令跟随能力最佳 |
| Qwen-VL-Chat-Int4 | Int4 量化版；推理显存 ~12GB，速度提升 30% |

## 架构

- **LLM 主干：** Qwen-7B（阿里通义千问）
- **视觉编码器：** OpenCLIP ViT-bigG（20亿图文对预训练）
- **连接层：** 随机初始化的 cross-attention 层
- **图像分辨率：** 448×448（标准开源 LVLM 通常为 224×224）
- **特殊 token：** `<img>`, `</img>`, `<ref>`, `</ref>`, `<box>`, `</box>`

## 性能对比

### Qwen-VL-Max vs 闭源模型（TouchStone 等基准）

| 基准 | GPT-4V | Gemini Ultra | Qwen-VL-Max |
|------|--------|-------------|-------------|
| DocVQA | 88.4% | 90.9% | **93.1%** |
| ChartQA | 78.5% | 80.8% | **79.8%** |
| TextVQA | 78.0% | 82.3% | **79.5%** |
| MMMU | 56.8% | 59.4% | 51.4% |

### Qwen-VL 基座模型零样本性能

- Flickr30K 零样本图片描述：**85.8**（开源通用 LVLM 中 SOTA）
- VQAv2 零样本：**78.8**（SOTA）
- RefCOCO 定位任务：val **89.36** / test-A **92.26** / test-B **85.34**（全部 SOTA）

### TouchStone 对话评估

| 模型 | EN | ZH |
|------|----|----|
| LLaVA | 602.7 | — |
| mPLUG-Owl | 605.4 | — |
| Qwen-VL-Chat | 645.2 | 401.2 |
| Qwen-VL-Chat-1.1 | **711.6** | **481.7** |

## 量化（Int4）

| 指标 | BF16 | Int4 |
|------|------|------|
| 编码 2048 token 峰值显存 | 22.60 GB | **11.82 GB** |
| 推理速度（tokens/s） | 28.87 | **37.79** |
| 性能损失 | — | 微小（EN 651.4 vs 645.2） |

## 游戏开发中的用途

- **游戏内图像理解**：NPC 对话中集成视觉理解，支持"看图说话"
- **UI/文档 OCR**：游戏内 UI 文字识别、截图分析
- **多模态 NPC**：结合 Qwen-VL 实现可看图对话的 NPC
- **资产标注**：通过定位能力自动标注游戏截图中的物体位置
- **对比 [[llava-onevision]]**：Qwen-VL 强在中文理解和中文 OCR；LLaVA-OneVision 支持多图/视频，Qwen-VL 有 Plus/Max API 服务

## 许可证

Custom license（见 LICENSE / NOTICE 文件），需遵守阿里云使用条款。

## 相关链接

- GitHub: https://github.com/QwenLM/Qwen-VL
- HuggingFace: https://huggingface.co/Qwen/Qwen-VL
- ModelScope: https://modelscope.cn/models/qwen/Qwen-VL/summary
- Paper: https://arxiv.org/abs/2308.12966
- API 服务: https://help.aliyun.com/zh/dashscope/developer-reference/vl-plus-quick-start

## 关联

- [[qwen2]] — Qwen2 基础语言模型
- [[qwen3]] — Qwen3 基础语言模型
- [[glm-v]] — GLM-V，另一个中国 VLM
- [[cogvlm2]] — CogVLM2 竞品 VLM
- [[llava-onevision]] — 架构类似的 LLaVA-OneVision
