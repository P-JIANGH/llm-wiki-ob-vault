# MVDream — Multi-view Diffusion for 3D Generation

**Source:** https://github.com/bytedance/MVDream (code repo: bytedance/MVDream)
**Paper:** arXiv:2308.16512
**Authors:** Yichun Shi, Peng Wang, Jianglong Ye, Long Mai, Kejie Li, Xiao Yang (ByteDance)

## README Summary

MVDream 是一个多视角扩散模型，用于 3D 内容生成。该仓库仅包含扩散模型和 2D 图像生成代码；3D 生成部分在独立的 [MVDream-threestudio](https://github.com/bytedance/MVDream-threestudio) 仓库中。

核心思路：将 Stable Diffusion 扩展为同时生成 4 个不同视角的图像（4×256×256），通过引入相机位姿作为条件输入，实现多视角一致性。这些多视角图像可用作 SDS（Score Distillation Sampling）引导 3D 生成。

## 模型卡

| 模型 | 基础模型 | 分辨率 |
|------|----------|--------|
| sd-v2.1-base-4view | Stable Diffusion 2.1 Base | 4×256×256 |
| sd-v1.5-4view | Stable Diffusion 1.5 | 4×256×256 |

预训练权重托管在 HuggingFace (MVDream/MVDream)，使用 OpenRAIL 许可。

## 技术架构

- **基础架构**：基于 Stable Diffusion 的 LatentDiffusion 接口
- **UNet 变体**：MultiViewUNetModel — 在 SD UNet 基础上增加 camera_dim=16 的相机位姿条件输入
- **文本编码器**：FrozenOpenCLIPEmbedder（OpenCLIP ViT-H/14，context_dim=1024）
- **VAE**：AutoencoderKL（4 通道潜空间，256 分辨率）
- **扩散调度**：1000 timesteps，linear start=0.00085，linear end=0.0120，epsilon 预测
- **相机编码**：elevation/azimuth → 4×4 相机矩阵 → 归一化 → 展平为 16 维向量
- **默认视角**：4 个视角，elevation=15°，azimuth 从 0° 开始均匀分布 360°

## 项目结构

```
mvdream/
├── __init__.py          # 导出 build_model
├── model_zoo.py         # 预训练模型注册表 + HuggingFace 自动下载
├── camera_utils.py      # 相机位姿生成工具（OpenGL → Blender 坐标转换）
├── configs/
│   ├── sd-v1.yaml       # SD 1.5 变体配置
│   └── sd-v2-base.yaml  # SD 2.1 Base 变体配置
├── ldm/                  # 继承自 Stable Diffusion 的 latent diffusion 模块
└── ...

scripts/
├── t2i.py               # 文本到多视角图像生成脚本
└── gradio_app.py        # Gradio 可视化界面
```

## 安装与依赖

- PyTorch + CUDA
- omegaconf, einops, transformers==4.27.1, open-clip-torch==2.7.0
- xformers==0.0.16（注意力优化）
- gradio>=3.13.2（可选，用于 GUI）
- opencv-python, imageio, imageio-ffmpeg

可通过 `pip install git+https://github.com/bytedance/MVDream` 安装为 Python 模块。

## 使用方式

1. **自动加载**：`from mvdream.model_zoo import build_model; model = build_model("sd-v2.1-base-4view")`
2. **手动加载**：通过 OmegaConf 加载 YAML 配置 + instantiate_from_config + 加载 HuggingFace 权重
3. **推理**：构建 4 视角噪声 + timestep + 文本 embedding + 相机矩阵 → apply_model

## 关键文件摘要

- `model_zoo.py` (58 LOC)：维护 PRETRAINED_MODELS 字典，build_model() 函数负责加载配置和从 HuggingFace 下载权重
- `camera_utils.py` (67 LOC)：相机数学工具 — 球坐标→世界矩阵、OpenGL→Blender 坐标转换、相机位置归一化、多视角生成
- `setup.py` (20 LOC)：标准 setuptools 打包，包含 configs/*.yaml 作为包数据
- `requirements.txt` (9 行)：列出核心依赖

## 许可证

代码：LICENSE-CODE（基于 Stable Diffusion 派生，需遵循相应许可）
模型权重：OpenRAIL 许可
