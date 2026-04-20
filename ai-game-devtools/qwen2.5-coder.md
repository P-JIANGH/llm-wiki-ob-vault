---
title: Qwen2.5-Coder / Qwen3-Coder
created: 2026-04-14
updated: 2026-04-14
type: entity
tags: [llm, code-model, open-source, agent, multimodal]
sources: [raw/articles/ai-game-devtools/qwen2.5-coder.md]
---

# Qwen2.5-Coder / Qwen3-Coder

Alibaba 通义千问代码模型系列，由 Qwen2.5-Coder（稠密模型）演进至 Qwen3-Coder（Hybrid Attention + MoE）。Qwen3-Coder-Next 主打 **Agentic Coding**，支持 Qwen Code、CLINE、Claude Code、OpenClaw 等平台，256K context 可处理仓库级代码。

## Overview

Qwen3-Coder 是目前 Qwen 代码模型家族的最新代，专注于 **Coding Agent** 场景。与通用 LLM 不同，专为代码补全、执行、工具调用和Agent工作流优化。

## Key Facts

| 属性 | 值 |
|------|-----|
| 开发方 | Alibaba Cloud（通义千问）|
| 发布时间 | Qwen2.5-Coder: 2024; Qwen3-Coder: 2026 |
| 参数量 | Qwen3-Coder-Next: 80B total / 3B active (MoE); 480B-A35B MoE; 30B dense |
| 最大 Context | 256K native，1M via Yarn |
| 支持语言 | 358 种编程语言 |
| 许可证 | Apache 2.0 |

## 模型变体

|| 模型 | 类型 | Context |
||------|------|---------|
|| Qwen3-Coder-Next | Instruct | 256K |
|| Qwen3-Coder-480B-A35B-Instruct | Instruct | 256K |
|| Qwen3-Coder-30B-A3B-Instruct | Instruct | 256K |
|| Qwen3-Coder-Next-GGUF | Instruct | 256K |
|| Qwen2.5-Coder (0.5B–32B) | Instruct | 128K |

## 技术特点

- **Fill-in-the-Middle (FIM)**：`<|fim_prefix|>...<|fim_suffix|>...<|fim_middle|>` 格式，支持代码补全
- **工具调用**：与 SGLang / [[vLLM]] 深度集成的新工具解析器
- **Agent 平台**：Qwen Code、CLINE、Claude Code、OpenClaw
- **长上下文**：256K 原生，Yarn 扩展至 1M，适合仓库级理解
- **多语言**：358 种语言，涵盖主流及小众语言
- **推理格式**：支持 FP8、GGUF（llama.cpp）等多种量化格式

## 与同类工具差异

- **Qwen3-Coder vs [[CodeGen]] / `CodeLlama`**：Qwen3-Coder 以 Agentic Coding 为核心，在工具调用和多 Agent 协作场景更强
- **Qwen3-Coder vs [[DeepSeek-Coder]]**：两者性能接近，Qwen3-Coder 生态更广（支持更多 Agent 平台）
- **Qwen3-Coder vs [[Qwen2]]**：Qwen3-Coder 是 Qwen2 的代码专项版本，在代码补全、执行、仓库理解上有显著优势

## 游戏开发应用

- **游戏 AI NPC 对话**：结合 Agent 框架驱动 NPC 行为
- **游戏逻辑生成**：给定游戏机制描述生成完整代码
- **游戏素材生成管线**：配合 [[LLMUnity]] / [[UnityGen-AI]] 用于 Unity 集成
- **实时代码补全**：IDE 插件形式的代码补全（类 [[AICommand]]）
- **示例项目**：Zombies vs. Plants 塔防游戏、Parkour 粒子系统游戏等 HTML5 游戏

## Finetuning

- **SFT**：`finetuning/sft/` — 监督微调，含数据二值化、训练脚本、配置
- **DPO**：`finetuning/dpo/` — 直接偏好优化，对齐人类偏好

## Related Links

- GitHub: https://github.com/QwenLM/Qwen2.5-Coder
- HuggingFace: https://huggingface.co/collections/Qwen/qwen3-coder-687fc861e53c939e52d52d10
- ModelScope: https://modelscope.cn/organization/qwen
- Blog: https://qwenlm.github.io/blog/qwen3-coder-next/
- [[Qwen2]]: 通义千问通用 LLM
- [[DeepSeek-Coder]]: 竞品代码模型
- [[vLLM]]: 推理框架
