---
title: Moshi
created: 2026-04-14
updated: 2026-04-14
type: entity
tags: [ai-model, speech, audio, open-source, multimodal]
sources: [raw/articles/ai-game-devtools/moshi.md]
---

# Moshi

Moshi 是由法国 AI 实验室 **Kyutai** 开发的**全双工语音对话基础模型**，能够以 160–200ms 的超低延迟实现实时双向语音交互。项目代码开源（MIT），模型权重以 CC-BY 4.0 授权。

**GitHub:** https://github.com/kyutai-labs/moshi
**Paper:** arXiv:2410.00037
**Demo:** https://moshi.chat
**Stars:** 9.9k | **License:** CC-BY 4.0 (模型) / MIT (代码)

---

## 功能定位

Moshi 专为**游戏 NPC 实时语音对话**、**虚拟助手**、**语音交互系统**等场景设计，是目前少数能做到真正**全双工**（双方可同时说话）的开源语音 AI 模型。

核心特性：
- **全双工对话**：同时处理用户和 AI 两路音频流，无需等待用户说完
- **超低延迟**：理论 160ms，L4 GPU 实测约 200ms
- **内心独白（Inner Monologue）**：预测自身语音的文本 token，提升生成质量
- **多后端支持**：PyTorch（研究）、MLX（Apple Silicon）、Rust/Candle（生产）

---

## 架构设计

### Moshi 语言模型
- 双流音频建模：同时处理「AI 说话」与「用户说话」两条音频流
- **Temporal Transformer**：7B 参数，负责时序依赖建模
- **Depth Transformer**：负责每时间步内的 codebook 间依赖建模
- 文本 token 预测（内心独白）提升语音连贯性

### Mimi 神经音频编解码器
- 输入：24 kHz 音频 → 输出：12.5 Hz 表征
- 码率：1.1 kbps，完全流式，延迟仅 80ms
- 基于 WavLM 自监督表征融合语义与声学信息
- 对抗训练损失（无 L1/L2 重建损失），音质优于 SpeechTokenizer（4kbps）和 SemantiCodec（1.3kbps）

---

## 可用模型

| 模型     | 声音        | 后端                      | 量化支持              |
|---------|-------------|---------------------------|-----------------------|
| Moshika | 女性合成声  | PyTorch / MLX / Rust      | bf16, int8, int4, q8  |
| Moshiko | 男性合成声  | PyTorch / MLX / Rust      | bf16, int8, int4, q8  |

Hugging Face 仓库：`kyutai/moshika-pytorch-bf16`、`kyutai/moshika-mlx-q4` 等。

---

## 部署方式

```bash
# PyTorch 安装
pip install moshi
python -m moshi.server --hf-repo kyutai/moshika-pytorch-bf16
# 访问 http://localhost:8998

# MLX（macOS M3+）
pip install moshi_mlx
python -m moshi_mlx.local --hf-repo kyutai/moshika-mlx-q4 -q 4

# Rust 后端（生产）
cd rust && cargo run --features cuda --bin moshi-backend -r
```

硬件要求：
- PyTorch GPU：约 24GB 显存（bf16，无量化）
- MLX：MacBook Pro M3+ 或 iPhone
- Rust：最新 Rust 工具链

---

## 与同类工具对比

| 对比维度   | Moshi                        | [[llasm]]（LLaSM）         | [[imagebind]]             |
|-----------|------------------------------|----------------------------|--------------------------|
| 对话模式  | 全双工实时语音               | 文本+语音输入，文本输出    | 多模态嵌入（无对话）      |
| 延迟      | 160–200ms                    | 无实时要求                 | 无实时要求                |
| 开源许可  | MIT / CC-BY 4.0              | Apache 2.0                 | CC-BY-NC 4.0              |
| 适用场景  | NPC 实时语音、语音助手       | 语音指令理解               | 跨模态检索/分类           |

---

## 相关项目

- **Hibiki**（Kyutai）：同声传译模型，基于类似流式架构
- [[llasm]]：另一个将语音与 LLM 结合的多模态模型
- [[imagebind]]：Meta 的多模态嵌入框架，涵盖音频模态

---

## 游戏开发应用场景

1. **NPC 实时语音对话**：160ms 延迟足以实现自然交互，可替代预录音频
2. **虚拟角色陪伴**：全双工特性使角色能打断用户、自然停顿
3. **语音驱动叙事**：结合内心独白机制，NPC 可拥有连贯的语言逻辑
4. **移动端部署**：MLX 后端支持 iPhone，适合移动游戏语音助手
