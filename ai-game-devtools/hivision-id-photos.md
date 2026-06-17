---
title: HivisionIDPhotos
created: 2026-04-17
updated: 2026-04-17
type: entity
tags: [ai, tool, python, open-source]
sources: [raw/articles/ai-game-devtools/hivision-id-photos.md]
---

# HivisionIDPhotos

AI 证件照智能制作工具 — 轻量级人像抠图 + 标准证件照生成 + 六寸排版照制作。

## 概述

HivisionIDPhotos 由 SwanLab 团队（Zeyi Lin）开发，是一个系统性的证件照制作解决方案。通过组合多个 ONNX 人像分割模型和人脸检测模型，实现从自拍/生活照到标准证件照的全流程自动化。

## 核心功能

| 功能 | 说明 |
|------|------|
| 人像抠图 | 支持 4 种 ONNX 模型（MODNet/hivision_modnet/rmbg-1.4/birefnet-v1-lite），纯离线 CPU 推理 |
| 证件照制作 | 按标准尺寸（如一寸、二寸等）生成 4 通道透明 PNG |
| 六寸排版照 | 自动计算排版，支持六寸/五寸/A4/3R/4R 尺寸 |
| 美颜 | 内置美颜处理 |
| 人脸旋转对齐 | 自动检测人脸角度并旋转校正 |
| 底色更换 | 支持自定义 HEX 输入换底 |
| 水印 | 可配置字体和位置的水印插件 |
| 社交媒体模板 | 支持社交媒体头像模板裁剪 |

## 技术架构

- **推理框架**: ONNX Runtime（支持 CPU/GPU 加速）
- **人脸检测**: MTCNN（默认）/ RetinaFace（离线）/ Face++（在线 API）
- **人像分割**: MODNet / hivision_modnet / rmbg-1.4 / birefnet-v1-lite
- **前端交互**: Gradio（支持多语言：中/英/日/韩）
- **部署方式**: Python 本地 / FastAPI / Docker / Docker Compose

## 性能

Mac M1 Max 64GB（无 GPU 加速）：
- MODNet + MTCNN：410MB 内存，0.2s 推理
- birefnet-v1-lite + RetinaFace：6.2GB 内存，7s 推理

GPU 加速（NVIDIA，需 ~16GB 显存）：birefnet-v1-lite 支持 CUDA 加速

## 社区生态

- ComfyUI 工作流集成（[[comfyui]]）
- 微信小程序（多个版本）
- C++ 移植版本
- Windows 桌面客户端
- 网页版应用

## 许可证

Apache-2.0

## 相关链接

- GitHub: https://github.com/Zeyi-Lin/HivisionIDPhotos
- HuggingFace Spaces: https://huggingface.co/spaces/TheEeeeLin/HivisionIDPhotos
- Docker Hub: linzeyi/hivision_idphotos
