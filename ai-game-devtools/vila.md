---
title: VILA
created: 2026-04-15
updated: 2026-04-15
type: entity
tags: [vlm, video-understanding, model, open-source, nvidia]
sources: [raw/articles/ai-game-devtools/vila.md]
---

# VILA: Optimized Vision Language Models

`NVlabs` 出品的开源 VLM 家族，专注于视频理解与多图理解的效率与精度优化。历经 VILA1.0 → VILA1.5 → NVILA(VILA2.0) → LongVILA 多代迭代，2025年1月并入 NVIDIA Cosmos Nemotron 系列。

## 核心模型

| 模型 | 规模 | 特点 |
|------|------|------|
| NVILA-8B/Lite | 8B | 高效多模态，AWQ 量化 |
| NVILA-15B/Lite | 15B | MMMU & Video-MME 开源 SOTA |
| VILA-1.5 | 3B/8B/13B/40B | 视频理解，MLVU 开源第一 |
| LongVILA | 7B+ | >1M context，多模态序列并行 |
| VILA-HD | various | PS3 encoder，4K 分辨率理解 |
| VILA-M3 | 7B | 医学 VLM，Med-Gemini 水平 |

## 技术特点

- **交织图像-文本预训练**（interleaved image-text pretraining）支撑多图 VLM
- **上下文学习**（in-context learning）能力
- **3 阶段训练流程**：对齐（CC3M）→ 预训练（MMC4+Coyo）→ SFT（M3IT/FLAN/ShareGPT4V）
- VILA1.5 的 40B 版本使用 `InternVL` 的 InternViT 视觉编码器
- [[TinyChatEngine]] 边缘部署（A100/4090/Orin）— NVILA-8B-TinyChat 在 4090 上达 162.7 tok/s
- 支持 TensorRT-LLM 生产推理
- FastAPI 服务，OpenAI SDK 兼容接口

## 评测性能

- **MMMU**：VILA1.5 开源模型第一
- **Video-MME**：VILA1.5 开源模型第一
- **MLVU**：VILA1.5 开源第一（2024/07）
- NVILA 在 A100 上 TinyChat 后端达 186.8 tok/s（8B），时间到首 token 0.045s

## 部署方案

- **TinyChat** — AWQ 4-bit 量化，桌面/边缘 GPU
- **TinyChatEngine** — CPU 推理（x86 & ARM，含笔记本电脑）
- **TensorRT-LLM** — 生产级推理
- **FastAPI Server** — REST API + Docker
- **HuggingFace** — 预训练权重托管

## 相关项目

- `OmniVinci` (2025/7) — 视觉-音频联合理解 omni-modal LLM，基于 VILA
- `Long-RL` (2025/7) — 长视频 RL 训练框架
- `VILA-U` — 统一视频/图像/语言理解+生成
- [[TinyChatEngine]] — NVL Lab/Han Lab 端侧推理引擎，VILA 是其支持的 VLM 之一
- [[Cambrian-1]] — NYU 开源 VLM，576 固定视觉 tokens vs VILA 的方案

## 许可证

代码：Apache 2.0 | 权重：CC BY-NC-SA 4.0

## 链接

- [ArXiv NVILA](https://arxiv.org/abs/2412.04468) | [ArXiv VILA](https://arxiv.org/abs/2312.07533) | [Demo](https://vila.hanlab.ai/) | [Models](https://huggingface.co/collections/Efficient-Large-Model/nvila-674f8163543890b35a91b428)
