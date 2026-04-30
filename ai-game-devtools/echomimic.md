---
title: EchoMimic
created: 2026-04-18
updated: 2026-04-18
type: entity
tags: [avatar, tool, open-source, audio, diffusion, animation, multimodal]
sources: [raw/articles/ai-game-devtools/echomimic.md]
---

# EchoMimic

**Ant Group** AAAI 2025 音频驱动肖像动画工具，通过可编辑面部地标条件生成逼真说话头部视频。基于 Stable Diffusion v1.5，支持纯音频/纯地标/音频+地标混合三种驱动模式。

## 核心能力

| 驱动模式 | 说明 |
|----------|------|
| 纯音频驱动 | Whisper-Tiny 编码音频 → 自动唇形同步 |
| 纯地标驱动 | MediaPipe 面部地标 → 精确表情控制 |
| 音频+地标混合 | 唇形同步 + 自定义头部/眼部动作 |

## 架构设计

基于 SD v1.5 潜扩散模型，集成专用编码器与注意力机制：

- **Denoising U-Net**：核心生成器，每 Transformer 块含 3 注意力层（Reference/Audio/Temporal）
- **Reference U-Net**：并行无噪声编码器，提取参考图像特征保留身份
- **Audio Encoder**：预训练 Whisper-Tiny，相邻帧拼接提供时间上下文，通过 cross-attention 注入
- **Landmark Encoder**：轻量 CNN，特征与潜空间对齐后逐元素相加保留解剖精度
- **Temporal Attention**：沿时间轴自注意力确保帧间平滑过渡

## 训练策略

- **两阶段训练**：Stage 1 单帧训练（禁用时序注意力）→ Stage 2 插入时序模块并在 12 帧视频上微调
- **随机地标选择（RLS）**：面部划分为眉毛/眼睛/瞳孔/鼻子/嘴等区域，训练时随机丢弃 1+ 区域提升鲁棒性
- **音频增强**：注入噪声/扰动提高泛化能力
- **时间感知空间损失**：像素空间监督补偿 64×64 潜空间低分辨率

## 性能对比

HDTF 数据集评测（FID↓/FVD↓/SSIM↑/ED↓/SC↑）：

| 模式 | FID↓ | FVD↓ | SSIM↑ |
|------|------|------|-------|
| 纯音频 | 29.13 | 492.78 | 0.81 |
| 纯地标 | **22.97** | **156.53** | **0.88** |
| 音频+地标 | 22.98 | 181.74 | 0.88 |

全面超越 [[sadtalker]]、[[aniportrait]]、V-Express、[[hallo]] 等竞品。

## 运动对齐

引入 **Part-aware Motion Synchronization**：计算全局仿射变换 + 各面部区域残差变换矩阵，解决参考图与驱动视频面部尺度差异（如小嘴映射大嘴不扭曲）。

## 使用方式

- `infer_audio2vid.py` — 标准音频驱动推理
- `infer_audio2vid_acc.py` — 加速推理版本
- `infer_audio2vid_pose.py` — 音频+地标混合驱动
- `webgui.py` — Gradio Web 界面（@Robin021 贡献）

## 已知限制

- 当前为 SD 图像架构扩展，非原生视频架构
- 不支持实时推理（未来计划集成 LCM/SpeedUpNet）
- 论文建议未来探索 3DVAE + DiT 进行视频原生优化

## 相关链接

- GitHub: https://github.com/BadToBest/EchoMimic
- arXiv: 2407.08136
- HuggingFace / ModelScope 可用

## 许可证

仅限学术研究用途，无明确开源许可证
