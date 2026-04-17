---
title: LLaMA-Mesh
created: 2026-04-18
updated: 2026-04-18
type: entity
tags: [3d, llm, tool, open-source]
sources: [raw/articles/ai-game-devtools/llama-mesh.md]
---

# LLaMA-Mesh

## 概述

**LLaMA-Mesh**（Unifying 3D Mesh Generation with Language Models）是 NVIDIA Toronto AI Lab 与清华大学联合开发的 3D 网格生成模型。通过将 3D 网格的顶点坐标和面定义表示为纯文本（OBJ 格式），使预训练 LLM 能够直接通过对话生成 3D 网格。

> arXiv: 2411.09595 | 模型权重: [HuggingFace](https://huggingface.co/Zhengyi/LLaMA-Mesh) | [Demo](https://huggingface.co/spaces/Zhengyi/LLaMA-Mesh) | [Blender 插件](https://github.com/huggingface/meshgen)

## 核心方法

- **文本化 3D 表示：** 3D 网格 → OBJ 纯文本 → LLM 直接处理，无需扩展词表
- **利用预训练空间知识：** LLM 已从 3D 教程、文档等文本中内嵌空间理解能力
- **交错数据 SFT：** 文本和 3D 网格交错训练，模型能同时生成文本和 3D 输出
- **统一模态：** 首次证明 LLM 可以以文本格式学习复杂 3D 空间知识

## 技术特点

| 维度 | 详情 |
|------|------|
| 基座模型 | Meta Llama 3.1 8B |
| Tokenizer | GemmaTokenizer |
| 推理框架 | transformers AutoModelForCausalLM |
| UI | Gradio ChatInterface（流式输出） |
| 3D 可视化 | trimesh（OBJ→GLB 转换 + 顶点渐变着色） |
| 最大上下文 | 4096 tokens（建议 8192） |
| 依赖 | accelerate, gradio, numpy, transformers, trimesh |

## 能力

1. **文本到 3D 网格生成** — 自然语言提示直接生成 OBJ 格式网格
2. **文本+3D 交错输出** — 对话中同时生成解释性文本和 3D 模型
3. **3D 网格理解** — 能解释和分析已有 3D 网格
4. **保持通用文本能力** — 非 3D 任务（代码生成、问答等）不受影响

## 许可证

**NVIDIA License**（非商业使用，仅限研究/评估）+ **Llama 3.1 Community License**

## 作者

Zhengyi Wang (THU), Jonathan Lorraine (NVIDIA), Yikai Wang (THU), Hang Su (THU), Jun Zhu (THU), Sanja Fidler (UofT/NVIDIA), Xiaohui Zeng (UofT/NVIDIA)

## 与同类工具的比较

- 与 [[ai-game-devtools/crm]] 不同：CRM 使用两阶段扩散模型生成 3D 网格，LLaMA-Mesh 使用 LLM 自回归生成
- 与 [[ai-game-devtools/dreammat]] 不同：DreamMat 专注于 PBR 材质生成，LLaMA-Mesh 专注于网格几何生成
- 与 [[ai-game-devtools/llama-3]] 相关：基于 Llama 3.1 8B 微调，保持了原始文本能力

## 来源

- [GitHub](https://github.com/nv-tlabs/LLaMA-Mesh)
- [arXiv 论文](https://arxiv.org/pdf/2411.09595)
- [项目页面](https://research.nvidia.com/labs/toronto-ai/LLaMA-Mesh/)
