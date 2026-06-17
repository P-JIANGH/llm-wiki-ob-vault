---
title: DreamCinema
created: 2026-04-20
updated: 2026-04-20
type: entity
tags: [ai, video, 3d, tool, open-source, animation]
sources: [raw/articles/ai-game-devtools/dream-cinema.md]
---

# DreamCinema

清华大学提出的电影迁移框架，将生成式 AI 引入电影制作，实现自由相机和自定义 3D 角色的个人化电影创作。

## 概述

DreamCinema (Chen et al., 2024) 是一个用户友好的电影迁移 (cinematic transfer) 框架。它解决现有电影迁移方法中角色需手工制作、相机轨迹不够平滑的痛点，通过 3D AIGC 技术自动生成角色并优化相机运动。

**论文:** arXiv:2408.12601 (cs.CV / cs.GR / cs.MM)

## 三阶段管线

### 1. 电影元素提取 (Cinematic Elements Extraction)
- 从源视频中提取人体姿态 (human pose) 和相机位姿 (camera pose)
- 优化相机轨迹，改善帧间运动连续性

### 2. 角色生成 (Character Generation)
- 利用人体结构先验 (human structure prior) 高效创建 3D 高质量角色
- 支持用户定制角色外观

### 3. 电影迁移优化 (Cinematic Transfer Optimization)
- 结构引导的运动迁移策略 (structure-guided motion transfer)
- 将生成角色融入电影，通过 3D 图形引擎平滑输出

## 技术特点

| 维度 | 描述 |
|------|------|
| 核心创新 | 生成式 AI + 电影制作范式 |
| 角色生成 | 3D AIGC，人体结构先验 |
| 运动迁移 | 结构引导 + 3D 引擎平滑 |
| 相机控制 | 自由相机，轨迹优化 |
| 开源状态 | 代码尚未发布（仓库仅 README） |

## 与同类工具差异

- 相比 [[video2game]]（视频→3D 游戏场景）：DreamCinema 专注于角色替换 + 相机运动迁移，而非场景重建
- 相比 [[animate3d]]（3D 模型动画生成）：DreamCinema 从源视频提取运动并迁移到新角色，而非从零生成动画
- 相比 [[character-gen]]（单图→3D 角色生成）：DreamCinema 将角色生成嵌入完整电影制作管线

## 关键信息

- **作者:** Weiliang Chen, Fangfu Liu*, Diankun Wu, Haowen Sun, Haixu Song, Yueqi Duan†
- **机构:** 清华大学
- **许可证:** MIT
- **代码状态:** ⚠️ 尚未发布
- **Demo 视频:** https://youtu.be/kwfRetxDgsg

## 相关链接

- GitHub: https://github.com/chen-wl20/DreamCinema
- Paper: https://arxiv.org/abs/2408.12601
- Project Page: https://liuff19.github.io/DreamCinema/
