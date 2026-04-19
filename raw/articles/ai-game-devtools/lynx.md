# Lynx: Towards High-Fidelity Personalized Video Generation

**Source:** https://github.com/bytedance/lynx
**Category:** Video (Personalized Video Generation)
**Authors:** Shen Sang*, Tiancheng Zhi*, Tianpei Gu, Jing Liu, Linjie Luo (ByteDance Intelligent Creation)
**Published:** CVPR 2026

## 概览

Lynx 是字节跳动智能创作团队提出的高保真个性化视频生成模型。基于 Wan2.1-T2V-14B Diffusion Transformer (DiT) 基础模型，通过轻量级 ID-Adapter 和 Ref-Adapter 实现从单张输入图像到个性化视频的合成，保持人物身份一致性和空间细节增强。

## 核心架构

### Diffusion Transformer 基础
- 基于 **Wan2.1-T2V-14B-Diffusers**（14B 参数文生视频模型）作为基础骨干
- 使用 Flash Attention 加速推理（支持 FA2 和 FA3）

### ID-Adapter（身份适配器）
- 轻量级身份保持模块，提取输入图像中人物的身份特征
- 使用 ArcFace 面部编码器（insightface）提取面部嵌入
- 包含 Resampler 模块将面部特征映射到 DiT 潜空间

### Ref-Adapter（参考适配器）
- 空间细节增强模块，保留输入图像中的纹理和细节信息
- Full 版本同时包含 ID-Adapter 和 Ref-Adapter
- Lite 版本仅使用 ID-Adapter，适合高效 24fps（121 帧）视频生成

### 面部处理管线
- FaceEncoderArcFace：使用 insightface + onnxruntime-gpu 进行面部编码
- 自动面部关键点检测（landmarks）
- 输入图像自动预处理和裁剪

## 技术规格

| 参数 | Full 版本 | Lite 版本 |
|:---|:---|:---|
| 基础模型 | Wan2.1-T2V-14B | Wan2.1-T2V-14B |
| 适配器 | ID-Adapter + Ref-Adapter | 仅 ID-Adapter |
| 默认帧数 | 81 帧 | 81 帧（支持 121 帧） |
| 帧率 | 16 fps | 24 fps |
| 分辨率 | 480×832 | 480×832 |
| Flash Attention | 必需 | 必需 |
| 推理步数 | 50 | 50 |

## 依赖栈

- **深度学习：** PyTorch 2.6.0, Transformers 4.50.2, Diffusers 0.33.1
- **面部编码：** insightface 0.7.3, onnxruntime-gpu, facexlib
- **图像处理：** OpenCV 4.11.0, PIL, imageio
- **NLP：** SentencePiece 0.2.0
- **其他：** accelerate 1.5.2, safetensors, TensorFlow 2.20.0 (Keras 后端)

## 推理方式

```bash
# Full 版本
python infer.py --subject_image demo/subjects/demo_subject.png \
  --prompt "A person carves a pumpkin..." --seed 42

# Lite 版本
python infer_lite.py --subject_image demo/subjects/demo_subject.png \
  --prompt "A person carves a pumpkin..." --seed 42
```

支持从文件读取 prompt（`--prompt demo/prompts/demo_prompt.txt`）。

输出格式支持 mp4 和 webp。

## 许可证

Apache License 2.0（Copyright 2025 Bytedance Ltd.）

## 相关链接

- [arXiv 论文](https://arxiv.org/abs/2509.15496)
- [项目主页](https://byteaigc.github.io/Lynx/)
- [HuggingFace 模型](https://huggingface.co/ByteDance/lynx)
- [Wan2.1 基础模型](https://huggingface.co/Wan-AI/Wan2.1-T2V-14B-Diffusers)
