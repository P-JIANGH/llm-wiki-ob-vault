# SadTalker-Video-Lip-Sync 原始源分析

> 源: https://github.com/Zz-ww/SadTalker-Video-Lip-Sync
> 抓取日期: 2026-04-19

## 项目概述

基于 SadTalker 实现视频唇形合成的 Wav2Lip 改进工具。通过以视频文件方式进行语音驱动生成唇形，设置面部区域可配置的增强方式进行合成唇形（人脸）区域画面增强，提高生成唇形的清晰度。使用 DAIN 插帧算法对生成视频进行补帧，补充帧间合成唇形的动作过渡。

## 核心功能

1. **视频唇形合成**: 音频驱动 + 源视频 → 唇形同步视频
2. **区域增强**: 支持唇形区域(lip)或全脸区域(face)的清晰度增强
3. **DAIN 插帧**: 深度感知视频帧插值，25fps→50fps 或 25fps→100fps
4. **多模型融合**: Wav2Lip + GFPGAN + GPEN + DAIN 多模型管线

## 技术架构

### 主要模块
- `inference.py`: 推理入口，串联整个管线
- `src/utils/preprocess.py`: CropAndExtract — 面部裁剪 + 3DMM 提取
- `src/test_audio2coeff.py`: Audio2Coeff — 音频到 3DMM 系数转换
- `src/facerender/animate.py`: AnimateFromCoeff — 系数到面部动画渲染
- `src/generate_batch.py`: 数据批处理
- `src/generate_facerender_batch.py`: 面部渲染批处理
- `src/dain_model.py`: DAIN 插帧模型（可选，需 PaddlePaddle）
- `third_part/GFPGAN/`: 面部超分辨率增强
- `third_part/GPEN/`: 面部增强器
- `src/face3d/`: 3D 面部重建模块（BFM 模型）

### 推理管线
1. 面部裁剪 + 3DMM 参数提取（CropAndExtract）
2. 音频 → 3DMM 系数（Audio2Coeff：audio2pose + audio2exp）
3. 系数 → 面部动画渲染（AnimateFromCoeff：facevid2vid + mapping）
4. 面部增强（GFPGAN/GPEN，可选 lip/face 区域）
5. DAIN 插帧（可选，25fps→50/100fps）

### 依赖
- PyTorch 1.12.1 (CUDA 11.3)
- PaddlePaddle 2.3.2（仅 DAIN 插帧需要）
- FFmpeg
- GFPGAN, GPEN, Wav2Lip, face-vid2vid 预训练权重

### 预训练模型
- wav2lip.pth: Wav2Lip 唇形生成
- facevid2vid_00189-model.pth.tar: 面部视频到视频模型
- mapping_00109-model.pth.tar: 3DMM 到表情映射
- auido2pose_00140-model.pth: 音频到姿态
- auido2exp_00300-model.pth: 音频到表情
- GFPGANv1.3.pth: 面部超分
- GPEN-BFR-512.pth: 面部增强
- DAIN_weight: 帧插值权重
- epoch_20.pth: 3DMM 重建
- RetinaFace-R50.pth: 人脸检测
- shape_predictor_68_face_landmarks.dat: 68 点人脸地标

## 命令行接口

```bash
python inference.py --driven_audio <audio.wav> \
                    --source_video <video.mp4> \
                    --enhancer <none|lip|face> \
                    --use_DAIN \
                    --time_step 0.5
```

## 与 SadTalker 原版差异

| 特性 | SadTalker 原版 | SadTalker-Video-Lip-Sync |
|------|---------------|------------------------|
| 输入 | 单张图像 | 视频文件 |
| 唇形生成 | face-vid2vid 驱动 | Wav2Lip 驱动 |
| 面部增强 | GFPGAN | GFPGAN + GPEN |
| 插帧 | 无 | DAIN 可选 |
| 增强区域 | 无 | 唇形/全脸可配置 |
| 输出 | 图像到视频 | 视频到视频（唇形同步） |

## 与 Retalking 对比

Retalking 是另一个唇形同步工具，本项目 README 提供了与 Retalking/Wav2Lip/SadTalker 四者的效果对比视频。

## 许可证

未声明 LICENSE 文件，基于 SadTalker 的修改，应遵循 SadTalker 的许可证（学术研究许可）。
