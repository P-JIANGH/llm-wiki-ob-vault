---
title: StarCoder
created: 2026-04-17
updated: 2026-04-17
type: entity
tags: [llm, code-generation, code-completion, open-source, tool, python]
sources: [raw/articles/ai-game-devtools/starcoder.md]
---

# StarCoder

**StarCoder** 是 BigCode 项目（Hugging Face + ServiceNow 合作）开源的代码语言模型，在 80+ 编程语言的源代码和自然语言文本上训练，训练数据还包含 GitHub Issues/Commits 和 Jupyter Notebook。

## Overview

StarCoder 基于 The Stack 数据集（GitHub 代码仓库、Issues、Commits、Notebook）训练，支持 80 多种编程语言的代码生成、补全和填充（infilling）。模型采用 OpenRAIL-M 许可证，需在 Hugging Face 接受协议后使用。

## Key Facts

| 维度 | 详情 |
|------|------|
| **开发者** | BigCode（Hugging Face + ServiceNow） |
| **发布时间** | 2023 年 5 月 |
| **模型地址** | https://huggingface.co/bigcode/starcoder |
| **许可证** | OpenRAIL-M |
| **支持语言** | 80+ 编程语言 |
| **训练数据** | The Stack 数据集（GitHub 代码/Issues/Commits/Notebook） |
| **最大上下文** | 8192 tokens |

## Architecture

- **模型类型**: 自回归因果语言模型（AutoModelForCausalLM）
- **框架**: HuggingFace Transformers / text-generation-inference (TGI)
- **部署**: Docker 容器化部署 via TGI
- **量化支持**: FP16/BF16/~30GB、8-bit (bitsandbytes)/<20GB

## 硬件需求

| 精度 | 所需内存 |
|------|---------|
| FP32 | >60 GB |
| FP16/BF16 | ~30 GB |
| 8-bit | <20 GB（约 16 GB） |

## 功能特性

1. **代码生成** — 从注释/提示补全函数实现
2. **代码填充（FIM）** — 使用特殊 token 在代码中间补全
3. **StarChat** — 聊天微调变体，作为编码助手
4. **Stack Exchange 微调** — 支持 Stack Exchange Q&A 数据集指令微调

## 微调支持

- 使用 HuggingFace PEFT 进行参数高效微调
- DeepSpeed ZeRO-3 多 GPU 分布式训练
- bitsandbytes 8-bit 量化训练
- 支持 PEFT adapter 层合并回基础模型
- 内置 Stack Exchange 指令数据集微调脚本

## 项目结构

```
starcoder/
├── chat/                  # StarChat 训练代码
│   ├── train.py           # 微调训练脚本
│   ├── generate.py        # 生成脚本
│   └── config.yaml        # 训练配置
├── finetune/
│   ├── finetune.py        # PEFT 微调脚本
│   └── merge_peft_adapters.py
└── requirements.txt
```

## 生态系统

- **VSCode 插件**: HuggingFace.huggingface-vscode
- **Playground**: HuggingFace Spaces 在线演示
- **starcoder.cpp**: 基于 ggml 的 C++ 轻量推理实现
- **BigCode-Evaluation-Harness**: 专用代码 LLM 评测框架

## Game Dev Relevance

StarCoder 可用于 AI 辅助游戏开发：
- 自动生成游戏逻辑脚本（GDScript、C#、Lua、Python）
- 着色器代码补全辅助（GLSL/HLSL）
- 生成 Unity/Unreal/Godot 插件样板代码
- 在游戏引擎代码库上微调获得领域专精

## Related Pages

- [[ai-game-devtools/deepseek-coder]] — DeepSeekAI 代码模型（1B-33B），2T tokens 预训练
- [[ai-game-devtools/code-llama]] — Meta 基于 Llama 2 的代码大模型（7B-70B）
- [[ai-game-devtools/codegen]] — Salesforce 代码生成模型家族（CodeGen1/2/2.5）
- [[ai-game-devtools/codegeex]] — THUDM 13B 多语言代码生成模型

## Links

- **GitHub**: https://github.com/bigcode-project/starcoder
- **Hugging Face**: https://huggingface.co/bigcode/starcoder
- **Paper**: https://drive.google.com/file/d/1cN-b9GnWtHzQRoE7M7gAEyivY0kl4BYs/view
- **Playground**: https://huggingface.co/spaces/bigcode/bigcode-playground
- **VSCode**: https://marketplace.visualstudio.com/items?itemName=HuggingFace.huggingface-vscode
- **StarChat**: https://huggingface.co/spaces/HuggingFaceH4/starchat-playground
