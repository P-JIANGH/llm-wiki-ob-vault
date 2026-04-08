---
title: OpenBMB
created: 2026-04-08
updated: 2026-04-08
type: entity
tags: [ai, open-source]
sources: [raw/articles/voxcpm-openbmb-2025.md]
---

# OpenBMB

OpenBMB（Open Brain + Model）是**北京人工智能研究院（BAAI）与面壁智能**联合建立的开放大模型研究组织，致力于构建大规模预训练模型基础设施和开源模型生态。

## 核心项目

### MiniCPM 系列
高效的小规模大语言模型，在极低参数量（1B~4B）下达到与大型模型相当的性能。
- [[VoxCPM]] 基于 MiniCPM-4 作为基座

### VoxCPM
Tokenizer-Free 多语言语音合成系统，2B 参数支持 30 种语言 + 9 种中文方言。

### 其他开源模型
OpenBMB 还开源了多个预训练模型和工具，涵盖 NLP 多任务和跨模态场景。

## 特点

- **开放优先**：所有模型权重和代码均开源
- **高效架构**：专注于小参数高性能模型（MiniCPM 1B/2B/4B）
- **跨模态**：覆盖文本生成（MiniCPM）、语音合成（VoxCPM）等方向
- **中文优化**：MiniCPM 系列对中文语境做了深度优化

## 相关链接

- 官网: https://openbmb.cn
- GitHub: https://github.com/OpenBMB

## 关联

- [[VoxCPM]] — 基于 OpenBMB 技术栈的语音合成项目
- [[MiniCPM]] — OpenBMB 的核心语言模型基座
