# GeneFace — Raw Source

**Project:** GeneFace: Generalized and High-Fidelity Audio-Driven 3D Talking Face Synthesis
**URL:** https://github.com/yerfor/GeneFace
**Cloned:** 2026-04-19 via gitcode.com mirror (GitHub timed out)
**Paper:** ICLR 2023, arXiv:2301.13430
**Authors:** Zhenhui Ye, Ziyue Jiang, Yi Ren, Jinglin Liu, Jinzheng He, Zhou Zhao | Zhejiang University, ByteDance
**License:** MIT

## README Summary

GeneFace 是浙江大学和字节跳动联合提出的音频驱动 3D 说话面部合成方法，ICLR 2023 论文。核心创新是对域外音频（不同说话人、不同语种）实现更好的唇同步和表现力。

关键更新（v1.1.0, 2023.3.16）：
1. 基于 RAD-NeRF 的渲染器，实时推理，训练 10 小时
2. PyTorch 版 deep3d_recon 模块，比 TensorFlow 版快 8x
3. 音高感知 audio2motion 模块，更准确的唇形
4. 内存占用 bug 修复

## 架构概览（从 README 插图提取）

音频 → DeepSpeech 特征 → 3D Landmark VAE → 3D Landmark PostNet → LM3D NeRF (Head + Torso) → 最终视频

管线分为三个主要阶段：
1. **Audio2Motion**：音频特征 → 3D 面部地标序列
2. **PostNet**：地标序列精炼（含 LLE 局部线性嵌入投影 + 眨眼注入）
3. **NeRF 渲染**：3D 地标条件化 Neural Radiance Field 生成视频帧

## 关键模块（从代码结构分析）

### modules/audio2motion/
- vae.py, vqvae.py — VAE/VQ-VAE 变分自编码器，将地标序列编码为潜空间
- transformer_models.py, transformer_base.py — Transformer 时序建模
- cnn_models.py — CNN 基础模型
- flow_base.py — 流模型
- multi_length_disc.py — 多长度判别器

### modules/nerfs/
- adnerf/ — AD-NeRF (Audio-Driven NeRF) 实现
- lm3d_nerf/ — Landmark 3D NeRF，地标条件化的 NeRF 渲染
- commons/ — NeRF 通用组件

### modules/radnerfs/
- radnerf.py — RAD-NeRF 实时辐射场渲染
- radnerf_torso.py — 躯干专用 RAD-NeRF
- cond_encoder.py — 条件编码器
- raymarching/ — CUDA 射线步进
- renderer.py — 渲染管线

### modules/postnet/
- models.py — 后处理网络
- lle.py — Local Linear Embedding 局部线性嵌入投影

### modules/syncnet/
- 唇同步质量评估网络

### deep_3drecon/
- PyTorch 版 3D 面部重建，提取 3DMM 参数（表情/身份/姿态）

## 配置文件结构（egs/）

- egs/egs_bases/ — 基础配置模板
  - audio2motion/base.yaml, vae_sync.yaml — 音到动作配置
  - nerf/base.yaml, adnerf.yaml, lm3d_nerf.yaml, lm3d_nerf_torso.yaml — NeRF 配置
  - radnerf/base.yaml, radnerf.yaml, lm3d_radnerf.yaml — RAD-NeRF 配置
  - postnet/base.yaml — 后处理配置
  - syncnet/base.yaml — 唇同步配置
- egs/datasets/ — 数据集配置
  - lrs3/ — LRS3 数据集配置
  - videos/May/, videos/Obama/ — 特定人物视频配置

## 训练数据

- LRS3 数据集（Lip Reading Sentences 3）
- May.mp4 示例视频
- 8 个实验用目标人物视频（Google Drive 提供）
- 支持用户自录视频训练个性化模型

## 依赖项目

- NATSpeech（代码模板）
- AD-NeRF（NeRF 数据预处理 + 原始 NeRF 实现）
- RAD-NeRF（RAD-NeRF 实现）
- Deep3DFaceRecon_pytorch（3DMM 参数提取）
