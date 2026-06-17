---
title: GLM-V
created: 2026-04-15
updated: 2026-04-15
type: entity
tags: [vlm, multimodal, model, open-source, vision-language, function-calling]
sources: [raw/articles/ai-game-devtools/glm-v.md]
---

# GLM-V

> Zhipu AI's Open-Source Visual Language Model Series — Native Multimodal Function Calling + Chain-of-Thought Reasoning

## Overview

**GLM-V** 是智谱AI（Zhipu AI）开源的视觉语言模型（VLM）系列，包含 GLM-4.6V、GLM-4.5V、GLM-4.1V-9B-Thinking 三个主要版本，参数规模覆盖 9B 到 106B，支持原生多模态函数调用、链式推理、任意长宽比图像等能力。GitHub 仓库地址：https://github.com/zai-org/GLM-V

## Key Facts

| Property | Value |
|----------|-------|
| **Release** | 2025 (arXiv:2507.01006) |
| **Organization** | Zhipu AI (智谱AI) |
| **License** | 开源许可 (见仓库) |
| **Paper** | https://arxiv.org/abs/2507.01006 |
| **Base Model** | GLM-4-9B |
| **Framework** | PyTorch >= 2.10.0, transformers >= 5.5.0 |

## Models

### GLM-4.6V (106B / 9B Flash)

- **106B** 版本：面向云端和高性能集群场景
- **9B Flash** 版本：轻量级，本地部署，低延迟
- 128K token context window
- **Native Multimodal Function Calling**：图像/截图/文档页面直接作为工具输入，无需文本转换
- **Interleaved Image-Text Content Generation**：混合图文内容生成，支持主动调用搜索和检索工具
- **Multimodal Document Understanding**：支持 128K token 多文档/长文档输入
- **Frontend Replication & Visual Editing**：从 UI 截图重建像素级 HTML/CSS，支持自然语言编辑

### GLM-4.5V

- 基于 GLM-4.5-Air
- 在 42 个公开视觉-语言 benchmark 上同规模 SOTA
- 能力覆盖：图像/视频/文档理解、GUI Agent 操作
- **Thinking Mode** 开关：平衡快速响应与深度推理

### GLM-4.1V-9B-Thinking

- 基于 GLM-4-9B-0414 基座，使用 RLCS（课程采样强化学习）训练
- 10B 级最强 VLM，18 项任务持平或超越 Qwen-2.5-VL-72B
- 64K context，支持任意长宽比，最高 4K 图像分辨率
- **Chain-of-Thought** 推理机制，提升准确性、可解释性
- 中英双语开源版本

## Architecture

- **Base LLM**: GLM-4-9B
- **训练方法**: 混合训练 + 课程采样强化学习 (RLCS)
- **推理框架**: transformers >= 5.5.0, accelerate >= 1.13.0, torch >= 2.10.0
- **技能（Skills）**: 10 个预构建技能 — caption、doc-based-writing、grounding、pdf-to-ppt、pdf-to-web、prd-to-app、prompt-gen、resume-screen、stock-analyst、web-replication
- **示例**: AMD GPU、Ascend NPU、GUI agent、Midscene TS/YAML demos

## Skills (技能列表)

| Skill | 用途 |
|-------|------|
| glmv-caption | 图像描述生成 |
| glmv-doc-based-writing | 基于文档的写作 |
| glmv-grounding | 视觉定位 |
| glmv-pdf-to-ppt | PDF 转 PPT |
| glmv-pdf-to-web | PDF 转网页 |
| glmv-prd-to-app | PRD 需求文档生成应用 |
| glmv-prompt-gen | Prompt 生成 |
| glmv-resume-screen | 简历筛选 |
| glmv-stock-analyst | 股票分析 |
| glmv-web-replication | 网页复制/重建 |

## Example Usage

```python
from transformers import AutoModelForCausalLM, AutoTokenizer

model_path = "THUDM/GLM-4.1V-9B-Thinking"
tokenizer = AutoTokenizer.from_pretrained(model_path)
model = AutoModelForCausalLM.from_pretrained(model_path, torch_dtype=torch.bfloat16)

# Single image + text input
messages = [
    {"role": "user", "content": "<image>Describe this image"},
]
```

## Related Models

- [[glm-4]] — GLM-4 语言模型基座
- [[glm-4.5]] — GLM-4.5 语言模型
- [[cambrian-1]] — Cambrian-1，另一个开源视觉中心 MLLM (NYU)
- [[qwen-vl]] — Qwen 视觉语言模型系列

## 游戏开发应用场景

GLM-V 的 Native Multimodal Function Calling 和 Frontend Replication 能力适用于：
- **游戏 UI 自动生成**：根据设计图生成游戏界面代码
- **游戏截图内容理解**：NPC 行为分析、场景识别
- **游戏文档自动化**：自动生成游戏设计文档、README
- **视觉定位 (Grounding)**：游戏内物体识别与定位
