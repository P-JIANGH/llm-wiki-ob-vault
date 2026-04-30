---
title: GLM-4-Voice
created: 2026-04-21
updated: 2026-04-21
type: entity
tags: [ai-model, speech, open-source, tool, multimodal]
sources: [raw/articles/ai-game-devtools/glm-4-voice.md]
---

# GLM-4-Voice

## 概述

GLM-4-Voice 是智谱 AI（Zhipu AI / THUDM）开源的端到端中英语音对话模型，能够直接理解和生成中英文语音，进行实时语音对话，并可按用户指令改变语音的情感、语调、语速、方言等属性。

## 核心架构

系统由三个专用组件组成的三阶段管线：

| 组件 | 说明 | 关键技术 |
|:---|:---|:---|
| **GLM-4-Voice-Tokenizer** | 语音分词器 | 基于 Whisper 编码器 + 向量量化，12.5 token/s 固定速率 |
| **GLM-4-Voice-9B** | 核心对话模型 | 基于 [[glm-4]] GLM-4-9B 预训练，语音模态对齐 |
| **GLM-4-Voice-Decoder** | 语音解码器 | 基于 [[cosyvoice]] CosyVoice 重训练 Flow Matching 模型，10 token 即可开始推理 |

## 技术特点

### 流式思考架构
- 文本和语音模态流式交替输出
- 语音生成以文本输出为参照，保证语言质量
- 超低延迟：仅需输出 20 个 token 即可开始语音合成

### 指令驱动语音调控
- **情感控制**：温柔引导、恐怖故事、悲伤语气
- **方言生成**：东北话、重庆话、京腔等
- **语速调节**：加速/减速
- **角色扮演**：足球解说等场景

### 训练策略
- Speech2Speech 任务解耦：(1) 音频→文本回复，(2) 文本+音频→语音合成
- 基于 GLM-4-9B，使用数百万小时音频和数千亿交错语音-文本 token 训练
- 合成交错语音-文本数据预训练

## 部署方式

- Docker 镜像：`zhipuai/glm-4-voice:0.1`
- 支持 Int4 量化降低显存占用
- Web Demo 访问：`http://127.0.0.1:8888`
- ⚠️ Decoder 模型不支持 `transformers` 初始化，checkpoint 需手动下载

## 模型列表

| 模型 | 类型 | HuggingFace |
|:---|:---|:---|
| GLM-4-Voice-Tokenizer | Speech Tokenizer | `THUDM/glm-4-voice-tokenizer` |
| GLM-4-Voice-9B | Chat Model | `THUDM/glm-4-voice-9b` |
| GLM-4-Voice-Decoder | Speech Decoder | `THUDM/glm-4-voice-decoder` |

## 许可证

- 代码：Apache 2.0
- 模型权重：GLM-4 专属模型许可协议

## 相关链接

- 论文：[arXiv:2412.02612](https://arxiv.org/abs/2412.02612)
- 预训练论文：[arXiv:2411.17607](https://arxiv.org/abs/2411.17607)
- HuggingFace: [THUDM/glm-4-voice-9b](https://huggingface.co/THUDM/glm-4-voice-9b)
- ModelScope Demo: [ZhipuAI/GLM-4-Voice-Demo](https://modelscope.cn/studios/ZhipuAI/GLM-4-Voice-Demo)
- GitHub: [THUDM/GLM-4-Voice](https://github.com/THUDM/GLM-4-Voice)

## 已知问题

- Gradio 流式音频播放不稳定
- 建议：生成完成后点击对话框中的音频文件获取更高质量
