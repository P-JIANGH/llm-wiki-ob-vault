# DreamCinema: Cinematic Transfer with Free Camera and 3D Character

**Source:** https://github.com/chen-wl20/DreamCinema
**Paper:** https://arxiv.org/abs/2408.12601
**Project Page:** https://liuff19.github.io/DreamCinema/
**Date:** 2026-04-20

## Overview
DreamCinema 是清华大学提出的电影迁移框架，将生成式 AI 引入电影制作范式，实现自由相机和自定义 3D 角色的个人化电影创作。

## Authors
- Weiliang Chen (chen-wl20)
- Fangfu Liu (项目负责人)
- Diankun Wu
- Haowen Sun
- Haixu Song
- Yueqi Duan (通信作者)

## 机构
清华大学 (Tsinghua University)

## 摘要
DreamCinema 是一个用户友好的电影迁移框架，包含三个核心模块：

1. **电影元素提取 (Cinematic Elements Extraction)**：从源视频中提取人体姿态和相机位姿，并优化相机轨迹
2. **角色生成 (Character Generation)**：利用人体结构先验高效创建用户定制的 3D 高质量角色
3. **电影迁移优化 (Cinematic Transfer Optimization)**：通过结构引导的运动迁移策略，将生成的角色融入电影创作，并通过 3D 图形引擎平滑迁移

## 技术要点
- 解决现有电影迁移中角色需手工制作的痛点
- 相机轨迹优化改善了帧间运动捕获不足和物理轨迹建模不充分导致的平滑性问题
- 3D AIGC 技术使角色生成更高效、更贴合用户需求
- 结构引导运动迁移 + 3D 引擎实现平滑输出

## 许可证
MIT License (Copyright 2024 Weiliang Chen)

## 状态
⚠️ 代码尚未发布（README 显示 "All Code will be released soon"）—— 当前仓库仅包含 README 和图片资源。

## 发表信息
- arXiv: 2408.12601
- 分类: cs.CV (Computer Vision), cs.GR (Graphics), cs.MM (Multimedia)
- 年份: 2024

## 相关链接
- Paper: https://arxiv.org/pdf/2408.12601
- arXiv: https://arxiv.org/abs/2408.12601
- Video Demo: https://youtu.be/kwfRetxDgsg
- GitHub: https://github.com/chen-wl20/DreamCinema
