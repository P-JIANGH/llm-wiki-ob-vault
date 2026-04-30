---
title: Hunyuan-MT
created: 2026-04-13
updated: 2026-04-13
type: entity
tags: [llm, translation, multimodal, open-source, tencent, game-dev]
sources: [raw/articles/ai-game-devtools/hunyuan-mt.md]
---

# Hunyuan-MT

[[Hunyuan-MT]] 是腾讯混元团队开源的机器翻译模型系列，包含两个核心模型：

- **Hunyuan-MT-7B**：7B 参数基座翻译模型，支持 33 种语言互译
- **Hunyuan-MT-Chimera-7B**：业界首个开源翻译集成模型，整合多路翻译输出生成更高质量结果

## 关键能力

- **WMT25 翻译竞赛**：31 个语言方向中拿下 30 个第一
- **33 种语言支持**：含 5 种中国少数民族语言（藏语、维吾尔语、蒙古语、粤语、哈萨克语）
- **集成翻译架构**：Chimera 模型将 6 路翻译结果综合优化
- **完整训练管线**：pretrain → CPT → SFT → translation RL → ensemble RL

## 技术规格

- **架构**：Transformer decoder（类 LLaMA），7B 参数
- **推理参数**：`top_k=20, top_p=0.6, temperature=0.7, repetition_penalty=1.05`
- **量化支持**：FP8 静态量化、INT8、INT4（通过 AngelSlim 工具链）
- **部署框架**：TensorRT-LLM、vLLM（≥v0.10.0）、SGLang
- **依赖**：transformers==4.56.0, accelerate==0.33.0, flash_attn==2.0.2

## 游戏开发中的用途

- 游戏本地化：多语言文本批量翻译（UI、剧情、对话）
- NPC 对话语料生成与翻译
- 集成到游戏工作流：vLLM/TensorRT-LLM 部署 OpenAI-compatible API，直接对接现有工具链

## 相关项目

- [[gemma]] — Google 轻量级开源 LLM 家族
- [[deepseek-r1]] — DeepSeek 推理模型
- [[cosmos]] — NVIDIA 物理 AI 世界基础模型

## 链接

- GitHub: https://github.com/Tencent-Hunyuan/Hunyuan-MT
- HuggingFace: https://huggingface.co/collections/tencent/hunyuan-mt-68b42f76d473f82798882597
- ModelScope: https://modelscope.cn/collections/Hunyuan-MT-2ca6b8e1b4934f
- Technical Report: https://www.arxiv.org/pdf/2509.05209
- 官方 Demo: https://hunyuan.tencent.com/chat/HunyuanDefault?from=modelSquare&modelId=hunyuan-mt-7b
