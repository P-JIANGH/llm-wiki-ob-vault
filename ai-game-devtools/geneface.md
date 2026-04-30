---
title: GeneFace
created: 2026-04-19
updated: 2026-04-19
type: entity
tags: [avatar, tool, open-source, audio, animation, multimodal, diffusion]
sources: [raw/articles/ai-game-devtools/geneface.md]
---

# GeneFace

**浙江大学 & 字节跳动** ICLR 2023 高泛化高保真音频驱动 3D 说话面部合成方法。对域外音频（不同说话人、不同语种）实现更好的唇同步和表现力。

## 核心能力

- **音频驱动**：输入任意音频 → 自动生成对应的 3D 说话头部视频
- **高泛化**：对域外音频（跨说话人、跨语种）保持唇同步质量
- **高保真**：3D 地标 + NeRF 渲染，输出质量超越前代 NeRF 方法
- **实时渲染**：RAD-NeRF 渲染器支持实时推理，训练仅需 10 小时

## 架构设计

三阶段管线：

| 阶段 | 模块 | 功能 |
|------|------|------|
| Audio2Motion | VAE/VQ-VAE + Transformer | 音频特征 → 3D 面部地标序列 |
| PostNet | LLE 投影 + 眨眼注入 | 地标精炼：局部线性嵌入拉近训练分布 + 自然眨眼合成 |
| LM3D NeRF | Head NeRF + Torso NeRF | 3D 地标条件化 Neural Radiance Field 渲染视频帧 |

关键技术创新：

- **3D 地标 VAE**：将面部地标序列编码为潜空间，支持变长音频输入
- **音高感知 Audio2Motion**：利用音频音高信息生成更准确的唇形
- **LLE 后处理**：局部线性嵌入将预测地标拉向训练集流形，消除异常值
- **RAD-NeRF 渲染**：基于辐射加速神经辐射场，比原始 NeRF 快 8x
- **躯干分离渲染**：头部和躯干分别用 NeRF 建模，避免耦合伪影
- **PyTorch 3D 重建**：自研 deep3drecon 替代 TensorFlow 版，提取 3DMM 参数

## 模块结构

- **modules/audio2motion/** — VAE/VQ-VAE + Transformer 时序建模
- **modules/nerfs/** — AD-NeRF + LM3D-NeRF 渲染
- **modules/radnerfs/** — RAD-NeRF 实时渲染（含 CUDA raymarching）
- **modules/postnet/** — 后处理网络 + LLE 投影
- **modules/syncnet/** — 唇同步质量评估
- **deep_3drecon/** — 3DMM 参数提取

## 训练与使用

- 支持 LRS3 数据集和自定义视频训练
- 预训练模型覆盖 LRS3 和 May 示例
- 支持用户自录视频训练个性化虚拟人
- 提供 Gradio Web GUI（RADNeRF 版本）

## 与同类工具差异

| 特性 | GeneFace | [[echomimic]] | [[hallo]] |
|------|----------|-------------------------------|---------------------------|
| 基础架构 | 3D 地标 + NeRF | SD 潜扩散 | SD + AnimateDiff |
| 泛化能力 | ★★★★★（跨说话人/语种） | ★★★★ | ★★★★ |
| 渲染速度 | 实时（RAD-NeRF） | 非实时 | 非实时 |
| 训练时间 | ~10 小时 | 较长 | 较长 |
| 3D 控制 | 3DMM + 地标 | 2D 地标 | 面部区域注意力 |
| 眨眼控制 | 自动注入 | 不支持 | 不支持 |

GeneFace 的独特优势：NeRF 渲染提供真正的 3D 一致性，支持头部姿态变化；泛化能力在域外音频上表现最好。

## 后续版本

后继者 [[geneface-plus-plus]] 已发布，实现更好的唇同步、视频质量和系统效率。

## 相关链接

- GitHub: https://github.com/yerfor/GeneFace
- arXiv: https://arxiv.org/abs/2301.13430
- 项目页面: https://geneface.github.io/
- 后继版本: https://github.com/yerfor/GeneFacePlusPlus

## 许可证

MIT
