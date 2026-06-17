# LLaMA-Mesh: Unifying 3D Mesh Generation with Language Models

**Source:** https://github.com/nv-tlabs/LLaMA-Mesh
**Paper:** https://arxiv.org/pdf/2411.09595
**Project Page:** https://research.nvidia.com/labs/toronto-ai/LLaMA-Mesh/
**Model Weights:** https://huggingface.co/Zhengyi/LLaMA-Mesh
**HuggingFace Demo:** https://huggingface.co/spaces/Zhengyi/LLaMA-Mesh
**Blender Addon:** https://github.com/huggingface/meshgen

## Overview

LLaMA-Mesh 是 NVIDIA Toronto AI Lab 与清华大学合作开发的 3D 网格生成模型，通过将 3D 网格数据（顶点坐标和面定义）表示为纯文本格式，使预训练 LLM 能够直接生成 3D 网格。核心理念是 "Create 3D meshes by chatting"——通过对话生成 3D 模型。

## 核心方法

- **文本化 3D 表示：** 将 3D 网格的顶点坐标和面定义编码为纯文本（OBJ 格式），无需扩展 LLM 词表
- **利用 LLM 空间知识：** 利用预训练 LLM 已从 3D 教程等文本来源中嵌入的空间知识
- **端到端训练：** 使用文本和 3D 交错的 SFT 数据集微调，使模型能同时生成文本和 3D 网格
- **统一模态：** 首次证明 LLM 可以以文本格式学习复杂空间知识用于 3D 网格生成

## 架构与技术细节

- **基座模型：** Meta Llama 3.1 8B
- **Tokenizer：** GemmaTokenizer + AutoTokenizer（transformers）
- **推理接口：** transformers AutoModelForCausalLM，device_map="auto"
- **UI：** Gradio ChatInterface，支持流式输出（TextIteratorStreamer）
- **3D 可视化：** trimesh 库解析 OBJ → 梯度颜色着色 → 导出 GLB
- **最大 token 长度：** 默认 4096，建议复杂模型使用 8192

## 依赖

```
accelerate, gradio, numpy, transformers, trimesh
```

## 许可证

- NVIDIA License（非商业使用，仅限研究/评估）
- 同时受 Llama 3.1 Community License 约束

## 作者

Zhengyi Wang (THU), Jonathan Lorraine (NVIDIA), Yikai Wang (THU), Hang Su (THU), Jun Zhu (THU), Sanja Fidler (UofT/NVIDIA), Xiaohui Zeng (UofT/NVIDIA)

## 关键文件

- `app.py` (239 行): Gradio 推理 UI，包含 chat_llama3_8b 函数（对话历史管理 + 流式生成）和 apply_gradient_color 函数（OBJ→GLB 转换 + 渐变着色）
- `requirements.txt`: 5 个依赖
- 模型权重托管于 HuggingFace: Zhengyi/LLaMA-Mesh

## 能力

1. 从文本提示生成 3D 网格（如 "Create a 3D model of a wooden hammer"）
2. 生成文本和 3D 网格交错输出
3. 理解和解释 3D 网格
4. 保持强文本生成能力（不仅限于 3D 任务）

## 相关项目

- Blender 插件: huggingface/meshgen（由 Dylan Ebert 实现）
- 与 CRM、DreamMat 等 3D 生成方法不同——LLaMA-Mesh 用 LLM 而非扩散模型
