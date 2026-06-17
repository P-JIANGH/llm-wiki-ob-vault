# HivisionIDPhotos — AI 证件照智能制作工具

> Source: https://github.com/Zeyi-Lin/HivisionIDPhotos
> Date: 2026-04-17
> Extracted from: README.md + key source files

## 项目概述

HivisionIDPhotos 是一个轻量级、系统性的证件照智能制作算法。利用 AI 模型实现人像抠图、标准证件照生成、六寸排版照制作等功能。

**核心能力：**
1. 轻量级抠图（纯离线，仅需 CPU 即可快速推理）
2. 按尺寸规格生成标准证件照、六寸排版照
3. 支持纯离线或端云推理
4. 美颜功能
5. 智能换正装（waiting）

## 技术架构

### 核心模块 (hivision/)

- **hivision/creator/** — 证件照制作核心引擎
  - `human_matting.py` — 人像抠图模块，支持多种 ONNX 模型
  - `face_detector.py` — 人脸检测模块
  - `photo_adjuster.py` — 照片调整（裁剪、缩放）
  - `layout_calculator.py` — 六寸排版照计算
  - `rotation_adjust.py` — 人脸旋转对齐
  - `context.py` — 推理上下文管理

- **hivision/creator/retinaface/** — RetinaFace 人脸检测器实现
  - `inference.py` — ONNX 推理
  - `prior_box.py` — 先验框生成
  - `box_utils.py` — 边界框处理

- **hivision/plugin/** — 插件系统
  - `watermark.py` — 水印添加
  - `template/template_calculator.py` — 社交媒体模板照计算

### 可用的抠图模型

| 模型 | 大小 | 特点 |
|------|------|------|
| MODNet | 24.7MB | 官方权重，快速 |
| hivision_modnet | 24.7MB | 对纯色换底适配更好 |
| rmbg-1.4 | 176.2MB | BRIA AI 开源模型 |
| birefnet-v1-lite | 224MB | 最高精度，支持 GPU 加速 |

### 可用的人脸检测模型

| 模型 | 特点 |
|------|------|
| MTCNN | 离线，CPU 毫秒级推理，默认模型 |
| RetinaFace | 离线，精度更高 |
| Face++ | 旷视在线 API，精度最高 |

## 性能参考

测试环境：Mac M1 Max 64GB，非 GPU 加速

| 模型组合 | 内存 | 512x715 推理 | 764x1146 推理 |
|----------|------|-------------|--------------|
| MODNet + mtcnn | 410MB | 0.207s | 0.246s |
| MODNet + retinaface | 405MB | 0.571s | 0.971s |
| birefnet-v1-lite + retinaface | 6.20GB | 7.063s | 7.128s |

## 部署方式

- **Gradio Demo**: `python app.py` → http://127.0.0.1:7860
- **API 服务**: `python deploy_api.py` → http://127.0.0.1:8080
- **Docker**: `docker pull linzeyi/hivision_idphotos`
- **Docker Compose**: `docker compose up -d`

## 社区生态

- ComfyUI 证件照处理工作流
- 微信小程序（多版本：JAVA后端、uniapp、GPT-o1辅助）
- 网页版应用
- C++ 版本 (HivisionIDPhotos-cpp)
- Windows 客户端应用
- 群晖 NAS 部署

## 许可证

Apache-2.0 License

## 相关链接

- GitHub: https://github.com/Zeyi-Lin/HivisionIDPhotos
- HuggingFace Spaces: https://huggingface.co/spaces/TheEeeeLin/HivisionIDPhotos
- Docker Hub: https://hub.docker.com/r/linzeyi/hivision_idphotos
