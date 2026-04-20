---
title: Chinese-LLaMA-Alpaca-3
created: 2026-04-13
updated: 2026-04-13
type: entity
tags: [llm, open-source, chinese, instruction-tuning, game-dev]
sources: [raw/articles/ai-game-devtools/chinese-llama-alpaca-3.md]
aliases: ["百川智能"]

---

# Chinese-LLaMA-Alpaca-3

基于 [[Meta-Llama-3]] 的中文开源大模型第三期项目，由 [ymcui](https://github.com/ymcui) 团队开发。属于 Chinese-LLaMA-Alpaca 开源模型家族（一期→二期→三期）的最新一代。

## 概述

本项目在原版 Llama-3（8B）基础上使用大规模中文数据进行增量预训练，并精选指令数据进行精调，显著提升中文基础语义和指令理解能力。相比二代相关模型在多项评测上获得明显提升。

## 核心特点

- **原版词表复用**：未扩充词表，中文编码效率达中文 LLaMA-2 的 95%
- **8K 上下文**：比二代 4K 扩展一倍，支持 PI/NTK/YaRN 长文本扩展
- **GQA 机制**：分组查询注意力，提升推理效率
- **训练方式**：LoRA + 全量 emb/lm-head 微调
- **多版本迭代**：v1 → v2 → v3 持续优化，最新版 Elo 1627

## 模型版本

| 版本 | 类型 | 训练方式 | C-Eval (0-shot) |
|------|------|----------|-----------------|
| Llama-3-Chinese-8B | 基座 | 120GB 中文语料预训练 | 47.0 |
| Llama-3-Chinese-8B-Instruct-v1 | 指令 | 两阶段：预训练+指令精调 | 49.3 |
| Llama-3-Chinese-8B-Instruct-v2 | 指令 | 直接500万指令精调 | 51.6 |
| Llama-3-Chinese-8B-Instruct-v3 | 指令 | 模型融合+5K指令精调 | **55.2** |

## 评测对比

**C-Eval（中文）：** Instruct-v3 (55.2) > Chinese-Mixtral-Instruct (51.7) > Meta-Llama-3-8B-Instruct (51.3)

**Open LLM Leaderboard（英文）：** Instruct-v3 (66.81) ≈ Meta-Llama-3-8B-Instruct (66.87)，略低于 Chinese-Mixtral-Instruct (70.19)

## 生态支持

- **推理框架**：transformers、llama.cpp (GGUF)、vLLM、Ollama
- **UI 工具**：text-generation-webui、LM Studio
- **API 风格**：仿 OpenAI API 接口
- **量化格式**：Q8_0、Q6_K、Q5_K、Q4_K 等（llama.cpp）

## 游戏开发应用

在 AI 游戏开发工具链中可作为本地中文 LLM 引擎使用：
- NPC 对话生成与指令理解
- 游戏剧情/任务文本生成
- 中文文档与UI文本处理
- 支持 [[llama.cpp]] 本地量化部署，降低显存需求

## 许可证

见 GitHub 项目页（Chinese-LLaMA-Alpaca 系列）

## 相关链接

- GitHub: https://github.com/ymcui/Chinese-LLaMA-Alpaca-3
- HuggingFace: https://huggingface.co/hfl
- ModelScope: https://modelscope.cn/profile/ChineseAlpacaGroup

## 关联

同家族模型：`Chinese-LLaMA-Alpaca-2`、`Chinese-Mixtral`、原生基座 [[Meta-Llama-3]]
