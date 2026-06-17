---
title: Character-LLM
created: 2026-04-13
updated: 2026-04-13
type: entity
tags: [llm, agent, ai, ml, learning]
sources: [raw/articles/ai-game-devtools/character-llm.md]
---

# Character-LLM

**Character-LLM** 是一个可训练的角色扮演 LLM agent，由复旦大学 NLP 实验室于 EMNLP 2023 发表。与基于 Prompt 的角色扮演不同，Character-LLM 通过 **Experience Reconstruction** 技术对 LLaMA-7B 进行微调，使模型内化特定人物（如贝多芬、苏格拉底、凯撒）的知识、个性与情感，推理时无需额外 prompt 或参考文档。

## 核心信息

| 属性 | 详情 |
|------|------|
| GitHub | https://github.com/choosewhatulike/trainable-agents |
| 论文 | EMNLP 2023, arXiv:2310.10158 |
| 代码许可 | Apache 2.0 |
| 数据许可 | CC By NC 4.0（非商业） |
| 模型许可 | LLaMA 1（学术研究） |
| 基础模型 | LLaMA-7B / LLaMA2-7B |
| 训练框架 | FastChat + Hugging Face Transformers |

## 技术架构

### Experience Reconstruction 流程

```
角色 Profile（Wikipedia）
    ↓ GPT-3.5-turbo
场景提取（~1.4K–2.2K scenes/角色）
    ↓ GPT-3.5-turbo
经验对话生成（~12–15 turns/scene）
    ↓ GPT-3.5-turbo
保护性场景（抗幻觉数据）
    ↓ SFT（FastChat + FSDP）
Character-LLM-[人物]-7b
```

### 训练配置
- **硬件**：8x A100 GPU，30~45 分钟/角色
- **参数**：10 epochs，bf16，FSDP，cosine LR scheduler，lr=2e-5
- **序列长度**：2048 tokens

### 推理方式
通过 FastChat 启动 OpenAI 兼容 API Server，支持单轮和多轮对话，使用 meta prompt 指定角色状态（位置、时间、当前状态）。

## 支持的角色（9 个）

| 角色 | 领域 |
|------|------|
| Beethoven | 古典音乐家 |
| Cleopatra VII | 古埃及女王 |
| Julius Caesar | 罗马将军/政治家 |
| Socrates | 哲学家 |
| Hermione Granger | 虚构文学人物 |
| Isaac Newton | 科学家 |
| Lord Voldemort | 虚构反派 |
| Spartacus | 古罗马角斗士 |
| Martin Luther King | 民权领袖 |

## 数据集统计

| 角色 | 场景数 | 词数 | 平均轮次 |
|------|--------|------|----------|
| Socrates | 1.6K | 896K | 14.1 |
| Martin Luther King | 2.2K | 1,038K | 12.0 |
| 平均 | 1.6K | 754K | 13.2 |

HuggingFace 数据集：`fnlp/character-llm-data`

## 与同类工具对比

| 工具 | 方式 | 特点 |
|------|------|------|
| **Character-LLM** | 微调 SFT | 无需 prompt，知识内化，9 个历史/文学人物 |
| [[agentgpt]] | Prompt-based | 通用任务 agent，不针对角色扮演 |
| [[babyagi]] | Prompt-based | 任务分解 agent，无角色扮演能力 |
| [[bisheng]] | RAG + Prompt | 企业 LLM 平台，支持角色配置但非微调 |

## 局限性

- 仅限学术研究（数据和模型均为非商业许可）
- 当前仅支持英文角色
- 模型权重以 wdiff 形式发布，需要原始 LLaMA-1 权重才能还原
- 输出质量受随机性影响，不保证准确性

## 相关资源

- 📄 [论文](https://arxiv.org/abs/2310.10158)
- 🤗 [模型](https://huggingface.co/fnlp/)
- 🤗 [数据集](https://huggingface.co/datasets/fnlp/character-llm-data)
- 🔗 [[agentgpt]] — 另一个 LLM agent 框架
- 🔗 [[aios]] — LLM 操作系统，支持 agent 并发管理
