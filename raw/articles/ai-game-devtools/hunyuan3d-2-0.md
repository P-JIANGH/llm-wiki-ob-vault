# Hunyuan3D-2 原始源

**来源:** https://github.com/Tencent/Hunyuan3D-2
**抓取日期:** 2026-04-18
**状态:** 克隆失败（GitHub 超时，gitcode 403，gitee 不可用），通过 web_extract 获取 README

## 项目概述

Hunyuan3D 2.0 是腾讯混元团队开发的大规模 3D 资产生成系统，采用两阶段生成管线：形状生成 + 纹理合成。

核心架构：
1. **Hunyuan3D-DiT**：基于 Flow Matching 的扩散 Transformer（DiT），负责从条件图像生成 3D 几何形状
2. **Hunyuan3D-Paint**：纹理合成模型，利用几何先验和扩散先验生成高分辨率 PBR 纹理贴图
3. **Hunyuan3D-Studio**：面向专业用户和业余爱好者的 3D 资产操作平台

## 模型矩阵

| 系列 | 模型 | 类型 | 参数 | 发布 |
|------|------|------|------|------|
| 2.1 | Hunyuan3D-DiT-v2-1 | Image-to-Shape | 3.0B | 2025-06 |
| | Hunyuan3D-Paint-v2-1 | Texture (PBR) | 1.3B | 2025-06 |
| 2mini | DiT-v2-mini/Fast/Turbo | Image-to-Shape (Distilled) | 0.6B | 2025-03 |
| 2mv | DiT-v2-mv/Fast/Turbo | Multiview-to-Shape | 1.1B | 2025-03 |
| 2.0 | DiT-v2-0/Fast/Turbo | Image-to-Shape | 1.1B | 2025-01~03 |
| | Paint-v2-0/Turbo | Texture Generation | 1.3B | 2025-01/04 |
| | Delight-v2-0 | Image Enhancement | 1.3B | 2025-01 |

## 性能

Benchmark 结果（CMMD↓ / FID_CLIP↓ / FID↓ / CLIP-score↑）：
- Hunyuan3D 2.0: 3.193 / 49.165 / 282.429 / 0.809（优于开源和闭源竞品）

## 技术细节

- VRAM 需求：6GB（仅形状）/ 16GB（形状+纹理）
- 支持 macOS、Windows、Linux
- Diffusers 风格 API：`Hunyuan3DDiTFlowMatchingPipeline` / `Hunyuan3DPaintPipeline`
- 部署方式：Gradio App / API Server / Blender Addon / Web Demo
- FlashVDM 加速支持 Turbo 模型
- 语言：Python 88.8%, C++ 8.1%, HTML 1.7%, CUDA 1.4%

## 开源生态

- ✅ 推理代码 ✅ 检查点 ✅ 技术报告 ✅ ComfyUI ✅ 微调 ✅ TensorRT 版本
- 社区扩展：ComfyUI-3D-Pack, ComfyUI-Hunyuan3DWrapper, Windows 便携版
- 官方 Web Demo: https://3d.hunyuan.tencent.com/
- HuggingFace 模型: tencent/Hunyuan3D-2

## 发布里程碑

- 2025-07-26: HunyuanWorld-1.0（沉浸式 3D 世界生成）
- 2025-06-23: Hunyuan3D 2.5 技术报告
- 2025-06-13: Hunyuan3D-2.1 全面开源（新 PBR 模型、VAE 编码器、训练代码）
- 2025-04-01: Hunyuan3D-Paint-v2-0-Turbo + 多视角纹理管线
- 2025-03-19: Turbo 模型 (2-Turbo, 2mini-Turbo) + FlashVDM
- 2025-03-18: 多视角形状模型 (2mv) + 2mini (0.6B)
- 2025-02-14: 纹理增强模块
- 2025-02-03: Hunyuan3D-DiT-v2-0-Fast（guidance distillation 减半推理时间）
- 2025-01-27: Blender 插件发布
- 2025-01-21: 推理代码和预训练模型初始发布
