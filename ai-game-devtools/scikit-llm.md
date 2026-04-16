---
title: Scikit-LLM
created: 2026-04-17
updated: 2026-04-17
type: entity
tags: [tool, llm, ml, framework, python, open-source, ai]
sources: [raw/articles/ai-game-devtools/scikit-llm.md]
---

# Scikit-LLM

## 概述

Scikit-LLM 将强大的语言模型（如 ChatGPT）无缝集成到 scikit-learn 生态中，为文本分析任务提供 LLM 驱动的分类、摘要、翻译、实体识别和向量化功能。通过遵循 sklearn 的 `fit`/`predict`/`transform` API 规范，可无缝嵌入现有的 sklearn Pipeline。

## 基本信息

| 属性 | 值 |
|------|-----|
| 版本 | 1.4.3 |
| 许可证 | MIT |
| Python | >= 3.9 |
| 作者 | Oleh Kostromin, Iryna Kondrashchenko (beastbyte.ai) |
| GitHub | https://github.com/iryna-kondr/scikit-llm |
| 文档 | https://skllm.beastbyte.ai |

## 核心功能

1. **零样本分类** — 无需训练数据，利用 LLM 提示进行文本分类
2. **少样本分类** — 提供示例提升分类准确率
3. **可微调分类** — 用自定义数据微调分类器
4. **文本摘要** — GPT/Claude 驱动的摘要生成
5. **文本翻译** — LLM 多语言翻译
6. **命名实体识别 (NER)** — 从文本中提取实体
7. **向量化** — LLM 驱动的文本嵌入用于相似度搜索

## 支持的 LLM Provider

| Provider | 分类 | 文本生成 | 摘要 | 翻译 | NER | 向量化 |
|----------|------|----------|------|------|-----|--------|
| OpenAI GPT | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Google Vertex AI | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |
| Anthropic Claude | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ |

## 架构设计

按 Provider 和任务类型组织：

```
skllm/models/
├── _base/          # 基类：classifier, text2text, vectorizer, tagger
├── gpt/            # OpenAI 完整功能
├── vertex/         # Google Vertex AI
└── anthropic/      # Anthropic Claude
```

所有模型继承自 sklearn 基类，实现标准 `fit(X, y)` 和 `predict(X)` 接口，可直接放入 sklearn Pipeline：

```python
from sklearn.pipeline import Pipeline
from skllm.models.gpt.classification.zero_shot import ZeroShotGPTClassifier

pipeline = Pipeline([
    ('classifier', ZeroShotGPTClassifier(model="gpt-4"))
])
```

## 游戏开发应用场景

- **NPC 对话意图识别** — 零样本分类玩家输入意图
- **玩家反馈情感分析** — 对游戏评论/反馈进行情感分类
- **游戏内文本摘要** — 长剧情/任务描述的自动摘要
- **多语言游戏内容翻译** — 自动翻译游戏文本到多语言
- **游戏设定实体提取** — 从游戏 lore 中提取角色/地点/物品实体

## 依赖

核心：scikit-learn >= 1.1.0, pandas >= 1.5.0, openai >= 1.2.0, google-cloud-aiplatform >= 1.27.0

可选：llama-cpp-python (GGUF 本地模型), annoy (向量搜索)

## 相关项目

- [[ai-game-devtools/langchain]] — 同为 LLM 应用框架，但面向应用编排而非 ML Pipeline 集成
- [[ai-game-devtools/pandas-ai]] — 同样将 LLM 集成到数据科学工具（Pandas），自然语言数据分析
- [[ai-game-devtools/interactml-unity]] — Unity 中的交互式机器学习，kNN/MLP/DTW 轻量模型 vs LLM 重型模型
