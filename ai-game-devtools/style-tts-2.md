---
title: StyleTTS 2
created: 2026-04-24
updated: 2026-04-24
type: entity
tags: [tool, audio, speech, tts, open-source, diffusion, ml]
sources: [raw/articles/ai-game-devtools/style-tts-2.md]
---

# StyleTTS 2

哥伦比亚大学（Columbia University）Yinghao Aaron Li 等人开发的人类级文本到语音（TTS）合成模型，通过**风格扩散（Style Diffusion）**和基于**大语音语言模型（SLM）的对抗训练**实现首个在单/多说话人数据集上均达到人类水平的开源 TTS 系统。

## 核心特点

- **风格扩散**：将风格建模为潜变量随机变量，通过扩散模型生成最适合文本的风格，**无需参考语音**
- **SLM 对抗训练**：使用 WavLM 等大预训练语音语言模型作为判别器，配合可微分时长建模进行端到端训练
- **人类级质量**：在 LJSpeech 单说话人数据集上**超越人类录音**，在 VCTK 多说话人数据集上**匹敌人类录音**
- **零样本说话人适配**：LibriTTS 训练后在零样本说话人克隆上超越此前公开模型

## 技术架构

### 预训练模块（Utils/）
| 模块 | 功能 | 训练数据 |
|------|------|----------|
| ASR | 文本对齐器 | 英(LibriTTS)/日(JVS)/中(AiShell) |
| JDC | 基频(F0)提取器 | 英语(LibriTTS) |
| PL-BERT | 音素级BERT | 英语(Wikipedia)；多语言版支持14语 |

### 核心模型
- **models.py**: 主架构（ResBlk、LearnedDownSample/UpSample、扩散模块）
- **Modules/diffusion/**: KDiffusion 采样器、Transformer1d、StyleTransformer1d、AudioDiffusionConditional
- **Modules/discriminators.py**: MultiPeriodDiscriminator、MultiResSpecDiscriminator、WavLMDiscriminator
- **train_first.py / train_second.py**: 两阶段训练管线
- **train_finetune.py / train_finetune_accelerate.py**: 新说话人微调脚本

## 训练与微调

### 数据格式
```
filename.wav|transcription|speaker
```

### 两阶段训练
```bash
# 第一阶段
accelerate launch train_first.py --config_path ./Configs/config.yml

# 第二阶段（当前使用 DP，DDP 存在问题 [#7](https://github.com/yl4579/StyleTTS2/issues/7)）
python train_second.py --config_path ./Configs/config.yml
```

### 微调
```bash
python train_finetune.py --config_path ./Configs/config_ft.yml
# 单 GPU 加速版本
accelerate launch --mixed_precision=fp16 --num_processes=1 train_finetune_accelerate.py --config_path ./Configs/config_ft.yml
```

默认配置在 LJSpeech 1 小时数据（约 1k 样本）上微调 50 epoch，4×A100 约 4 小时完成。

## 预训练模型

| 数据集 | 类型 | 链接 |
|--------|------|------|
| LJSpeech | 单说话人 24kHz | [HF: yl4579/StyleTTS2-LJSpeech](https://huggingface.co/yl4579/StyleTTS2-LJSpeech) |
| LibriTTS | 多说话人 零样本 | [HF: yl4579/StyleTTS2-LibriTTS](https://huggingface.co/yl4579/StyleTTS2-LibriTTS) |

## 推理
- 单说话人：[Inference_LJSpeech.ipynb](https://github.com/yl4579/StyleTTS2/blob/main/Demo/Inference_LJSpeech.ipynb)
- 多说话人：[Inference_LibriTTS.ipynb](https://github.com/yl4579/StyleTTS2/blob/main/Demo/Inference_LibriTTS.ipynb)（需 reference_audio.zip）
- Colab 演示和 HuggingFace Space 在线 demo 可用

## 许可证

- **代码**: MIT License
- **预训练模型**: 需告知听众语音为合成；仅使用获得授权的说话人声音，或公开声明为合成语音

## 相关链接

- 论文: [arXiv:2306.07691](https://arxiv.org/abs/2306.07691)
- 音频样例: [styletts2.github.io](https://styletts2.github.io/)
- HuggingFace Space: [styletts2/styletts2](https://huggingface.co/spaces/styletts2/styletts2)
- PyPI 包: [`styletts2`](https://pypi.org/project/styletts2/)（MIT，使用 gruut，质量略低）
- GPL Fork: [NeuralVox/StyleTTS2](https://github.com/NeuralVox/StyleTTS2)（可导入 + 流式 API）

## 与同类工具的差异

| 维度 | StyleTTS 2 | [[yourtts]] | [[tortoise-tts]] | [[bark]] |
|------|-----------|-------------|------------------|----------|
| 架构 | 风格扩散 + SLM 对抗 | VITS + 零样本适配 | 自回归 + 扩散解码 | Transformer 自回归 |
| 参考语音 | 无需（推理时） | 需参考音频 | 需参考音频 | 无需 |
| 质量 | 人类级（LJSpeech > 人类） | 高 | 高 | 中等 |
| 速度 | 较快 | 快 | 慢 | 较慢 |
| 许可 | MIT | Apache 2.0 | Apache 2.0 | MIT |

相比 [[bert-vits2]]，StyleTTS 2 无需参考语音即可生成自然风格；相比 [[stable-speech]]（Parler-TTS），StyleTTS 2 在主观自然度评测中更接近人类录音。
