# UnityGaussianSplatting — Raw Source

**Source:** https://github.com/aras-p/UnityGaussianSplatting
**Clone:** gitcode.com mirror (GitHub timed out)
**Date:** 2026-04-18

## Project Overview

**UnityGaussianSplatting** 是 Aras Pranckevicius 开发的 Unity 3D Gaussian Splatting 实时渲染工具包。基于 SIGGRAPH 2023 论文 "3D Gaussian Splatting for Real-Time Radiance Field Rendering"（Kerbl et al.），该项目实现了论文中实时可视化部分——即加载已有的 Gaussian Splat PLY 模型文件并在 Unity 中实时渲染。

## 技术特点

### 架构
- Unity UPM 包（org.nesnausk.gaussian-splatting v1.0.0）
- Unity 2022.3+ 兼容
- 依赖：Unity Burst 1.8.8、Unity Collections 2.1.4、Unity Mathematics 1.2.6

### 核心模块
- **GaussianSplatRenderer** (Runtime) — 主渲染器，基于 CommandBuffer 的自定义渲染管线集成
  - 使用 GPU sorting（DeviceRadixSort）进行 splat 深度排序
  - 视图相关计算 + splat 光栅化
  - 支持 BiRP / URP / HDRP 三种渲染管线
- **GaussianSplatURPFeature** (Runtime) — URP 渲染管线适配器
- **GaussianSplatHDRPPass** (Runtime) — HDRP CustomPass 适配器
- **GaussianSplatAsset** (Runtime) — 资产数据结构
- **GaussianSplatAssetCreator** (Editor) — PLY → Unity 资产转换工具
- **GaussianUtils** (Runtime) — 高斯数学工具函数
- **GpuSorting** (Runtime) — GPU 基数排序实现
- **GaussianCutout** (Runtime) — 裁剪/遮罩功能
- **Editor Tools** — 移动(GaussianMoveTool)、旋转(GaussianRotateTool)、缩放(GaussianScaleTool) 编辑工具
- **GaussianToolContext** / **GaussianTool** — 工具上下文系统
- **PLYFileReader** (Editor/Utils) — PLY 文件读取器

### 压缩系统
- 多级质量预设（Very Low / Low / Medium / High）
- Very Low 预设下 6.1M splats（bicycle 场景）压缩至 <8MB
- Medium 预设下同一场景为 282MB

### 渲染管线集成
- **BiRP**：开箱即用，无需额外设置
- **URP**：需添加 GaussianSplatURPFeature 到 URP 渲染器设置
- **HDRP**：需添加 GaussianSplatHDRPPass 到 CustomPass 体积对象
  - 可在透明度前或后处理之后渲染，后者效果更佳

### 渲染特性
- Splat 在不透明物体和天空盒之后渲染，测试 Z-buffer
- Splat 不写入 Z-buffer，在透明度之前渲染
- 多个 GaussianSplatRenderer 对象按 Transform 位置粗略排序
- 不受 Unity 光照/阴影/反射探针/光照贴图/天空盒影响
- 支持 VR 设备（HTC Vive、Varjo Aero、Quest 3、Quest Pro）

### 平台支持
- ✅ D3D12（Windows）、Metal（Mac）、Vulkan（Linux）
- ❌ DX11 不工作
- ❌ OpenGL/OpenGL ES 未测试/可能不工作
- ❌ WebGPU 尚未完全支持
- ⚠️ 移动端兼容性不确定

## 性能数据

bicycle 场景，6.1M splats，1200x797 分辨率，Medium 质量（282MB 资产）：

| 平台 | FPS | 渲染时间 | 排序时间 | 视图计算 | VRAM |
|------|-----|----------|----------|----------|------|
| RTX 3080 Ti (DX12/Vulkan) | 147 | 4.5ms | 1.1ms | 0.8ms | 1.3GB |
| M1 Max (Metal) | 46 | 21.5ms total | - | - | - |
| 官方 SBIR  viewer | 135 | 7.4ms total | - | - | 4.8GB |

除 GPU 资产外，每个 splat 还需 ~48 字节 GPU 内存（排序、视图相关数据缓存等）。

## 许可证

- 作者代码：MIT License
- 依赖：zanders3/json（MIT，Alex Parker）
- DeviceRadixSort：Thomas Smith 贡献
- VR 修复：@ninjamode 基于 Unity-VR-Gaussian-Splatting
- ⚠️ 官方训练软件（INRIA）仅限教育/学术/非商业用途，商业用途需从 INRIA 获取许可

## 相关博客

- [Gaussian Splatting is pretty cool!](https://aras-p.info/blog/2023/09/05/Gaussian-Splatting-is-pretty-cool/) (2023 Sep 5)
- [Making Gaussian Splats smaller](https://aras-p.info/blog/2023/09/13/Making-Gaussian-Splats-smaller/) (2023 Sep 13)
- [Making Gaussian Splats more smaller](https://aras-p.info/blog/2023/09/27/Making-Gaussian-Splats-more-smaller/) (2023 Sep 27)
- [Gaussian explosion](https://aras-p.info/blog/2023/12/08/Gaussian-explosion/) (2023 Dec 8)

## 状态

截至 2023 年 12 月，作者不计划进一步的重大开发。
