---
title: UnityGaussianSplatting
created: 2026-04-18
updated: 2026-04-18
type: entity
tags: [tool, 3d, open-source, game-engine]
sources: [raw/articles/ai-game-devtools/unity-gaussian-splatting.md]
---

# UnityGaussianSplatting

Aras Pranckevicius 开发的 **Unity 3D Gaussian Splatting 实时渲染工具包**，将 SIGGRAPH 2023 论文 "3D Gaussian Splatting for Real-Time Radiance Field Rendering" 的实时可视化部分移植到 Unity 引擎。

## 概述

- **作者:** Aras Pranckevicius (aras-p / nesnausk)
- **许可证:** MIT（项目代码）；⚠️ 官方训练软件（INRIA）需单独授权商业用途
- **Unity 版本:** 2022.3+
- **包名:** org.nesnausk.gaussian-splatting v1.0.0
- **依赖:** Unity Burst 1.8.8、Unity Collections 2.1.4、Unity Mathematics 1.2.6
- **状态:** 2023 年 12 月后不再计划重大开发

## 功能描述

将 pre-trained Gaussian Splat PLY 模型文件导入 Unity 并实现实时渲染。提供资产创建工具（PLY → Unity 格式）、多渲染管线适配（BiRP/URP/HDRP）、GPU 加速排序、以及多种编辑工具（移动/旋转/缩放）。

## 技术特点

### 架构
- **GaussianSplatRenderer** — 核心渲染器，基于 CommandBuffer，在 Camera.onPreCull 时注入渲染命令
- **GpuSorting (DeviceRadixSort)** — GPU 基数排序，Thomas Smith 贡献
- **GaussianSplatAsset** — 压缩后的资产数据结构
- **GaussianSplatAssetCreator** — Editor 工具，PLY 文件导入 + 多级质量压缩
- **GaussianSplatURPFeature** / **GaussianSplatHDRPPass** — URP/HDRP 适配层

### 渲染管线
- **BiRP：** 开箱即用
- **URP：** 需添加 GaussianSplatURPFeature
- **HDRP：** 需添加 CustomPass + GaussianSplatHDRPPass

### 渲染行为
- 在不透明物体和天空盒 **之后** 渲染，测试 Z-buffer
- **不**写入 Z-buffer，在透明度 **之前** 渲染
- 多个 Splat 对象按 Transform 位置粗略排序
- **不受** Unity 光照/阴影/反射探针/光照贴图影响

### 压缩
- 多级预设：Very Low / Low / Medium / High
- bicycle 场景（6.1M splats）：Very Low < 8MB，Medium 282MB

### 平台兼容性
| 平台/API | 状态 |
|----------|------|
| D3D12 (Windows) | ✅ 支持 |
| Vulkan (Windows/Linux) | ✅ 支持 |
| Metal (Mac) | ✅ 支持 |
| DX11 | ❌ 不支持 |
| OpenGL/ES | ⚠️ 未测试 |
| WebGPU | ⚠️ 功能不全 |
| VR (Quest 3/Pro, Vive, Varjo) | ✅ 部分支持 |

### 性能 (RTX 3080 Ti, 1200×797)
- 总帧时间 6.8ms（147 FPS）：渲染 4.5ms + 排序 1.1ms + 视图计算 0.8ms
- VRAM 1.3GB（对比官方 SBIR viewer 4.8GB）
- 每 splat 额外 ~48 字节 GPU 内存

## 关键文件
| 文件 | 作用 |
|------|------|
| `Runtime/GaussianSplatRenderer.cs` | 核心渲染器（1069 行） |
| `Runtime/GpuSorting.cs` | GPU 基数排序 |
| `Runtime/GaussianSplatAsset.cs` | 资产数据结构 |
| `Editor/GaussianSplatAssetCreator.cs` | PLY→资产转换工具 |
| `Editor/Utils/PLYFileReader.cs` | PLY 文件读取 |
| `Runtime/GaussianSplatURPFeature.cs` | URP 适配 |
| `Runtime/GaussianSplatHDRPPass.cs` | HDRP 适配 |

## 相关链接
- **GitHub:** https://github.com/aras-p/UnityGaussianSplatting
- **Blog:** https://aras-p.info/blog/（4 篇 Gaussian Splatting 系列文章）

## 与同类工具对比

- 与 [[dreamgaussian4d]] 不同：DreamGaussian4D 是 **生成** 4D 高斯资产的 Python 工具，UnityGaussianSplatting 是 **渲染** 已有高斯资产的 Unity 工具包
- 与 [[gaussiandreamer]] 互补：GaussianDreamer 生成 3DGS 资产，UnityGaussianSplatting 提供在 Unity 引擎中实时渲染这些资产的能力
- 与 [[cf-3dgs]] 不同：CF-3DGS 是从视频中 **重建** 3D 高斯（含相机位姿优化），本工具仅负责渲染
