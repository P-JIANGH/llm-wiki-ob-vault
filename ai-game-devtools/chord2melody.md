---
title: Chord2Melody — GPT-2 自动音乐生成
created: 2026-04-21
updated: 2026-04-21
type: entity
tags: [tool, music, ai, open-source, python]
sources: [raw/articles/ai-game-devtools/chord2melody.md]
---

# Chord2Melody

**GitHub:** [tanreinama/chord2melody](https://github.com/tanreinama/chord2melody)
**Author:** Toshiyuki Sakamoto (坂本 敏之)
**License:** MIT
**Category:** AI Game DevTools — Music (音乐生成)

## 概述

Chord2Melody 是一个基于 GPT-2 的 AI 自动作曲工具，输出标准 MIDI 文件。用户可以指定和弦进行来引导旋律生成，或者让 AI 续写已创作的半截音乐。生成的音乐无版权限制可自由使用。

## 技术特点

### 模型架构
- **基础模型:** GPT-2 Transformer decoder（12 层 × 12 头，768 维嵌入，1024 上下文窗口）
- **参数量:** ~8600 万（5 轨版）/ ~8700 万（17 轨版）
- **框架:** TensorFlow 1.15.4 (GPU)
- **词表:** 基于多轨钢琴卷帘的音符 token 编码

### 两个预训练模型

| 模型 | 输出轨道 | 参数量 |
|------|---------|--------|
| base_5tr | 鼓、钢琴、吉他、贝斯、弦乐 | 86,167,296 |
| base_17tr | 17 种 General MIDI 乐器轨道（含合成器/民族/打击乐） | 86,941,440 |

### 核心功能
1. **和弦到旋律:** 通过 `--chord` 指定和弦进行（支持 14 种和弦类型：大/小/属七/减七/增和弦/挂四等），AI 生成符合和声的旋律
2. **旋律续写:** `melody2melody.py` 读取已有 MIDI 文件，生成风格一致的续曲
3. **任意长度:** 通过 `--num_bars` 参数控制生成的小节数，无长度限制
4. **创作控制:** `--top_p` / `--top_k` 参数调节生成随机性

### Token 编码方案
- 音符 token：`track_id * 84 + note_index`（每轨 84 个音符，偏移 24）
- 特殊 token：time_note（节拍边界）、end_note（序列结束）
- 和弦 token：贝斯音符 + 钢琴和弦色彩音（根音、三音、五音、七音）

## 与同类工具差异

| 维度 | Chord2Melody | [[musicgen]] | [[mug-diffusion]] |
|------|-------------|------------------------------|-----------------------------------|
| 输出格式 | MIDI（可编辑） | 音频波形 | 音游谱面（MIDI-like） |
| 输入条件 | 和弦进行/已有旋律 | 文本提示/音频/旋律 | 音频波形 |
| 模型架构 | GPT-2（自回归） | AudioCraft 自回归 Transformer | Stable Diffusion 扩散模型 |
| 应用场景 | 作曲辅助、游戏 BGM 生成 | 文本到音乐生成 | 节奏游戏自动谱面生成 |

## 训练数据
- **数据集:** Lakh Pianoroll Dataset (LPD-5 / LPD-17)
- **数据增强:** 随机移调调制
- **微调:** 支持从预训练模型微调自定义数据

## 依赖
- numpy, tqdm, pypianoroll==0.5.3, tensorflow-gpu==1.15.4

## 相关链接
- 在线演示: http://ailab.nama.ne.jp/#chord2melody
- 论文: report/paper.pdf
- 和弦列表: chordlist.txt

## 与 Wiki 中其他工具的关系
- 与 [[musicgen]] 互补：Chord2Melody 输出 MIDI 可编辑，MusicGen 直接输出音频
- 与 [[wavjourney]] 对比：WavJourney 使用 LLM 编排多轨音频创作，Chord2Melody 用 GPT-2 直接生成 MIDI
- 与 [[mug-diffusion]] 结合：Chord2Melody 生成的 MIDI 可作为音游谱面生成的素材
- 与 [[any-accomp]] 形成音乐管线：Chord2Melody 生成主旋律 → AnyAccomp 生成伴奏
