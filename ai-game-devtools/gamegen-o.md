---
title: GameGen-O
created: 2026-04-16
updated: 2026-04-16
type: entity
tags: [ai-model, game, video-generation, transformer, llm, multimodal, open-source]
sources: [raw/articles/ai-game-devtools/gamegen-o.md]
---

# GameGen-O

**GameGen-O** 是腾讯光子工作室（和平精英开发商）联合香港科技大学、中国科学技术大学于 2024 年 9 月发布的**首个专为生成开放世界游戏视频而设计的 Transformer 模型**，被业内称为"游戏工作室的 ChatGPT 时刻"。

## 核心功能

- **游戏角色生成**：一键生成西部牛仔、太空人、魔法师、警卫等角色
- **游戏环境生成**：替代实地取景，降低开发成本
- **动作生成**：支持各种人称视角的动作视频
- **事件生成**：海啸、龙卷风、火灾等游戏事件
- **开放域生成**：不限风格、环境、场景

## 多模态交互控制

GameGen-O 支持三种控制方式：

| 方式 | 说明 |
|------|------|
| **文本提示** | 通过文字描述生成画面 |
| **操作信号** | 如 WASD 键盘输入控制角色移动方向 |
| **视频提示** | 类似 ControlNet，通过参考视频引导生成 |

## 技术架构

**两阶段训练：**

1. **基础预训练**：使用 2+1D VAE（Magvit-v2）压缩视频，参考 Latte 和 OpenSora V1.2 框架
2. **指令调整（InstructNet）**：微调分支支持多模态输入，建立当前片段与未来片段的映射关系

**专用数据集 OGameData：** 32,000 个原始视频 → 15,000 个可用片段，GPT-4o 注释 4,000+ 小时。

## 相关链接

- 官网：https://gamegen-o.github.io/
- GitHub：https://github.com/GameGen-O/GameGen-O/

## 相关项目

[[hunyuan-video]] · [[cogvideo]] · [[generative-agents]] · [[gamegen-x]]
