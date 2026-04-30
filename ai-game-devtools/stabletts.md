---
title: StableTTS
created: 2026-04-21
updated: 2026-04-21
type: entity
tags: [tool, open-source, speech, diffusion, flow-matching]
sources: [raw/articles/ai-game-devtools/stabletts.md]
---

# StableTTS

## Overview
首个结合 Flow-Matching + DiT 的开源 TTS 模型，灵感来自 Stable Diffusion 3。支持中文、英文、日文三语语音合成，仅 31M 参数，轻量快速。

## 关键事实
- **版本:** V1.1（2024年9月发布），参数从 10M 增加到 31M
- **许可证:** MIT
- **训练数据:** 600 小时
- **音频质量:** 44100 Hz / 128 mel channels
- **在线 Demo:** [HuggingFace Spaces](https://huggingface.co/spaces/KdaiP/StableTTS1.1)
- **GitHub:** https://github.com/KdaiP/StableTTS

## 技术架构
- **Text Encoder:** Diffusion Convolution Transformer（DiT + FastSpeech FFT 组合），3 层
- **Flow-Matching Decoder:** CFMDecoder + FiLM 时间步条件 + U-Net 式长跳跃连接，6 层 DiT
- **Duration Predictor:** MAS（单调对齐搜索）提取音素-梅尔对齐，预测语音时长
- **Reference Encoder:** MelStyleEncoder 从参考音频提取说话人嵌入（支持零样本声音克隆）
- **ODE 求解器:** torchdiffeq 可逆扩散采样
- **时间步调度:** 余弦调度（借鉴自 [[cosyvoice]]）
- **CFG 支持:** Classifier-Free Guidance，使用 fake_speaker/fake_content 参数实现条件/无条件双路径

## 训练与推理
- 训练仅需文本-音频对，无需说话人 ID
- 三损优化：duration loss + prior loss + flow matching loss
- Flow-matching 训练时遮蔽内容信息（mu_y_masked）以提升多样性
- 微调：下载预训练权重放入 checkpoints 目录即可自动加载
- 声码器支持：Vocos（2K小时训练）或 FireflyGAN（fishaudio）

## 多语言支持
- 中文：pypinyin + jieba 分词
- 英文：eng_to_ipa + unidecode + inflect
- 日文：pyopenjtalk-prebuilt（Python 3.12+ 用 pyopenjtalk）
- 多语言数据需分别预处理

## 与同类工具差异
- 对比 [[matcha-tts]]：StableTTS 在其 flow-matching 代码基础上增加了 DiT 编码器和 MAS 对齐，实现端到端 TTS
- 对比 [[cosyvoice]]：更轻量（31M vs 更大模型），借鉴了余弦时间步调度
- 对比 [[gpt-sovits]]：更简单的训练流程（无需 VITS 的复杂条件），但音质可能稍逊
- 对比 [[overflow]]：StableTTS 使用 flow-matching 而非 HMM transducer+归一化流

## 在游戏开发中的应用
- NPC 多语言语音合成（中日英）
- 零样本声音克隆（参考音频驱动）
- 轻量模型适合端侧部署（31M 参数）
- Gradio WebUI 可快速原型验证
