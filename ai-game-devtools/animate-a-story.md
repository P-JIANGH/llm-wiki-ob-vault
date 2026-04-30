---
title: Animate-A-Story
created: 2026-04-20
updated: 2026-04-20
type: entity
tags: [ai, video, animation, open-source, game]
sources: [raw/articles/ai-game-devtools/animate-a-story.md]
---

# Animate-A-Story: Retrieval-Augmented Storytelling Video Generation

arXiv 2023 检索增强视频生成框架，通过动作结构检索 + 文本到视频合成两大模块，实现故事驱动的连贯视频创作，支持角色一致性控制。

## Overview

Animate-A-Story 由鹏城实验室 & 香港科技大学团队（AILab-CVC）提出，解决传统视觉故事视频生成依赖实拍或图形动画渲染的繁琐问题。核心思路：**利用现有视频片段资源，通过外观定制合成连贯的故事视频**。

## 系统架构（两大功能模块）

| 模块 | 功能 |
|------|------|
| **Motion Structure Retrieval**（动作结构检索） | 从视频库中检索符合文本描述（场景/运动）的候选视频，提取视频深度作为动作结构 |
| **Structure-Guided T2V**（结构引导文生视频） | 在动作结构和文本提示引导下生成情节对齐的视频 |

### 第三组件：概念个性化（角色一致性）

- 通过概念个性化方法确保跨片段的角色视觉一致性
- 通过文本提示指定角色身份（无需微调）

## 技术特点

- **RAG + 生成融合**：首次将检索增强引入视频故事生成，兼顾真实感与可控性
- **动作结构控制**：以深度图为运动结构，精确控制视频动态
- **角色一致性**：概念个性化方法，无需额外微调即可跨片段保持角色身份
- **多风格支持**：演示覆盖真人、卡通、玩具熊等多种风格

## 与同类工具对比

| 工具 | 特点 | 许可 |
|------|------|------|
| **Animate-A-Story** | 检索增强 + 结构控制 + 角色一致性 | 学术研究 |
| [[talecrafter]] | 故事→布局→图像→视频四模块管线，多角色 | 学术研究 |
| [[animatediff]] | 图像动画扩散 motion module，无需检索 | Apache 2.0 |
| [[animate-anyone]] | 单图+姿态→一致性动画，角色换装/说话头像 | Apache 2.0 |

## 许可与链接

- **许可：** 学术研究用途
- **论文：** [arXiv 2307.06940](https://arxiv.org/abs/2307.06940)
- **项目页：** https://AILab-CVC.github.io/Animate-A-Story
- **GitHub：** https://github.com/VideoCrafter/Animate-A-Story
- **Demo 视频：** Yann Lecun 中国之旅、泰迪熊的一天、鸭子王国、男孩寻宝
