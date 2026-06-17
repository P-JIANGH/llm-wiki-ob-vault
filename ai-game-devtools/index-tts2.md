---
title: IndexTTS2
created: 2026-04-21
updated: 2026-04-24
type: entity
tags: [tool, speech, audio, open-source, autoregressive, tts, zero-shot, emotion-control]
sources: [raw/articles/ai-game-devtools/index-tts2.md]
---

# IndexTTS2

Bilibili IndexTTS Team 开发的自回归零样本文本转语音（TTS）模型，arXiv 2506.21619。**首个支持精确语音时长控制的自回归 TTS 模型**，同时实现情感表达与说话人身份的解耦。

## 核心特性

- **时长控制**：两种模式 — 显式指定生成 token 数精确控制语音时长，或自由自回归生成保留韵律特征
- **情感-音色解耦**：从提示中分离情感表达和说话人特征，支持独立控制
- **8 维情感向量**：[happy, angry, sad, afraid, disgusted, melancholic, surprised, calm]
- **文本情感控制**：基于 Qwen3 微调，自然语言描述→情感向量自动转换
- **三阶段训练范式**：引入 GPT 潜表示提升高情感表达时的语音清晰度与稳定性
- **中英双语支持**：支持拼音标注精确发音控制

## 技术架构

| 模块 | 说明 |
|------|------|
| GPT Backbone | UnifiedVoice 自回归 Transformer，语义 token 生成 |
| Semantic Codec | MaskGCT 语义模型（源自 OpenMMLab Amphion） |
| S2Mel | 语义 token→Mel 频谱图转换 |
| Vocoder | NVIDIA BigVGAN，Mel→波形合成 |
| VQ-VAE | 音频向量化 token 编码 |
| Emotion Controller | Qwen3 微调，文本→情感向量 |

## 使用方式

```python
from indextts.infer_v2 import IndexTTS2
tts = IndexTTS2(cfg_path="checkpoints/config.yaml", model_dir="checkpoints", use_fp16=True)
tts.infer(spk_audio_prompt='voice.wav', text='Hello world', output_path='out.wav')
```

- **语音克隆**：单个参考音频→同音色新文本
- **情感语音**：参考音频 + 情感音频→情感化语音（支持 emo_alpha 调节强度）
- **情感向量**：直接传入 8 维情感强度列表
- **文本情感**：use_emo_text=True 自动从文本转换情感
- **Web Demo**：`uv run webui.py` 启动 Gradio 界面

## 配置要求

- Python ≥ 3.10，使用 uv 包管理器
- CUDA 12.8+（GPU 加速）
- 支持 FP16 推理（降低显存）、DeepSpeed 加速、CUDA kernel 编译
- 权重：HuggingFace（IndexTeam/IndexTTS-2）+ ModelScope

## 版本历史

| 日期 | 版本 | 说明 |
|------|------|------|
| 2025-09-08 | IndexTTS-2 | 情感 + 时长控制 |
| 2025-05-14 | IndexTTS-1.5 | 稳定性 + 英语性能提升 |
| 2025-03-25 | IndexTTS-1.0 | 权重 + 推理代码发布 |

## 许可证

Bilibili IndexTTS 自定义许可证（LicenseRef-Bilibili-IndexTTS），非标准开源协议。

## 与其他 TTS 工具的差异

- 相比 [[cosyvoice]]：IndexTTS2 是自回归架构+精确时长控制，CosyVoice 是 Flow Matching 架构，支持更多语言（9 种 vs 中英）
- 相比 [[gpt-sovits]]：IndexTTS2 支持 8 维细粒度情感控制，GPT-SoVITS 侧重音色克隆+中日英韩语
- 相比 [[ai-game-devtools/fish-speech]]：IndexTTS2 侧重情感表达与时长控制，Fish-Speech 是 Bert-VITS2 后继项目，侧重高效推理
- 相比 [[bark]]：IndexTTS2 支持精确语音时长控制（适合视频配音），Bark 侧重多语言+音频泛化

## 相关链接

- GitHub: https://github.com/index-tts/index-tts
- Paper: https://arxiv.org/abs/2506.21619
- Demo: https://index-tts.github.io/index-tts2.github.io/
- HuggingFace: https://huggingface.co/IndexTeam/IndexTTS-2
- ModelScope: https://modelscope.cn/models/IndexTeam/IndexTTS-2
