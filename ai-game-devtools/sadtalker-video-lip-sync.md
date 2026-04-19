---
title: SadTalker-Video-Lip-Sync
created: 2026-04-19
updated: 2026-04-19
type: entity
tags: [avatar, video, tool, open-source, audio]
sources: [raw/articles/ai-game-devtools/sadtalker-video-lip-sync.md]
---

# SadTalker-Video-Lip-Sync

> GitHub: [Zz-ww/SadTalker-Video-Lip-Sync](https://github.com/Zz-ww/SadTalker-Video-Lip-Sync)

## 概述

基于 [[ai-game-devtools/sadtalker]] 改进的语音驱动视频唇形同步工具。与原版的单图驱动不同，本项目以视频文件作为输入，使用 Wav2Lip 替代 face-vid2vid 进行唇形生成，并支持面部区域可配置的清晰度增强和 DAIN 插帧补帧。

## 核心功能

- **视频到视频唇形同步**: 输入源视频 + 驱动音频 → 唇形同步输出视频
- **区域增强**: 三种模式 — 无增强 / 仅唇形区域增强 / 全脸增强
- **DAIN 插帧**: 可选深度感知帧插值，25fps→50fps 或 25fps→100fps，使唇形过渡更流畅
- **多模型管线**: Wav2Lip + GFPGAN 超分 + GPEN 面部增强 + DAIN 插帧

## 技术架构

### 推理管线（5 阶段）

1. **面部裁剪 + 3DMM 提取**: CropAndExtract 模块使用 68 点地标 + BFM 模型提取 3D 面部参数
2. **音频→系数转换**: Audio2Coeff 将音频特征分别映射到 pose 和 exp 系数（audio2pose + audio2exp 两个网络）
3. **系数→动画渲染**: AnimateFromCoeff 使用 facevid2vid + mapping 模型将 3DMM 系数渲染为面部动画帧
4. **面部增强**: GFPGAN（超分辨率）+ GPEN（面部修复）按配置区域增强
5. **DAIN 插帧**（可选）: 使用 PaddlePaddle 加载 DAIN 模型进行帧插值

### 关键模块

| 模块 | 文件 | 功能 |
|------|------|------|
| 推理入口 | inference.py | CLI 参数解析 + 管线串联 |
| 预处理 | src/utils/preprocess.py | CropAndExtract 面部裁剪与 3DMM 提取 |
| 音频处理 | src/test_audio2coeff.py | Audio2Coeff 音频到 3DMM 系数 |
| 面部渲染 | src/facerender/animate.py | AnimateFromCoeff 系数到视频帧 |
| DAIN 插帧 | src/dain_model.py | DAINPredictor 帧插值 |
| 面部增强 | third_part/GFPGAN/, third_part/GPEN/ | 超分辨率与面部修复 |
| 3D 面部 | src/face3d/ | BFM 模型 + 重建网络 |

### 技术栈

- PyTorch 1.12.1 (CUDA 11.3)
- PaddlePaddle 2.3.2（仅 DAIN）
- FFmpeg（视频处理）
- 10+ 预训练权重（Wav2Lip/GFPGAN/GPEN/DAIN/facevid2vid 等）

## 与同类工具差异

| 特性 | SadTalker | 本项目 | Retalking | Wav2Lip |
|------|-----------|--------|-----------|---------|
| 输入 | 图像 | **视频** | 视频 | 视频 |
| 唇形生成 | face-vid2vid | **Wav2Lip** | 自定义 | Wav2Lip |
| 面部增强 | GFPGAN | GFPGAN + GPEN | CodeFormer | 无 |
| 插帧 | 无 | **DAIN 可选** | 无 | 无 |
| 增强区域 | 无 | **lip/face 可配置** | 无 | 无 |

## 使用示例

```bash
python inference.py --driven_audio audio.wav \
                    --source_video video.mp4 \
                    --enhancer lip \
                    --use_DAIN \
                    --time_step 0.5
```

## 许可证

未声明独立 LICENSE，基于 SadTalker（学术研究许可）的修改。

## 相关链接

- GitHub: https://github.com/Zz-ww/SadTalker-Video-Lip-Sync
- 预训练权重: [百度网盘](https://pan.baidu.com/s/15-zjk64SGQnRT9qIduTe2A) / [Google Drive](https://drive.google.com/file/d/1lW4mf5YNtS4MAD7ZkAauDDWp2N3_Qzs7/view)
- 参考项目: [[ai-game-devtools/sadtalker]]、VideoReTalking、DAIN、PaddleGAN
