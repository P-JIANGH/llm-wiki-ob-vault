# TripoSR — 快速单图 3D 重建模型

> 源项目: https://github.com/VAST-AI-Research/TripoSR
> 提取日期: 2026-04-18

## 项目概述

TripoSR 是由 **Tripo AI** 和 **Stability AI** 联合开发的开源模型，用于从**单张图像**进行**快速**前馈 3D 重建。基于 Large Reconstruction Model (LRM) 架构，能在 NVIDIA A100 GPU 上 **< 0.5 秒**内生成高质量 3D 模型。

## 技术架构

### 核心管线（tsr/system.py）

TripoSR 采用模块化 LRM 架构，由以下组件组成：

1. **Image Tokenizer** — 将输入图像编码为 token 序列
2. **Scene Tokenizer** — 初始化 3D 场景表示（triplane）
3. **Backbone** — Transformer 架构，将图像 token 融合到场景 token
4. **Post Processor** — 后处理场景表示
5. **Decoder** — 从 triplane 解码几何和颜色
6. **Renderer** — NeRF 风格的体渲染器

### 推理流程

```
输入图像 → 图像预处理(rembg去背景) → 图像tokenizer → 
Transformer骨干网络 → triplane场景表示 → 
Marching Cubes提取mesh → OBJ/GLB输出
```

### 关键模块

- `tsr/models/transformer/` — 自定义 Transformer（attention + basic transformer block）
- `tsr/models/tokenizers/triplane.py` — Triplane 场景表示
- `tsr/models/tokenizers/image.py` — 图像 token 化（基于 DINOv2）
- `tsr/models/isosurface.py` — Marching Cubes 等值面提取
- `tsr/models/nerf_renderer.py` — NeRF 体渲染
- `tsr/bake_texture.py` — 纹理烘焙（使用 xatlas UV 展开）

## 技术特点

| 维度 | 详情 |
|------|------|
| 架构 | LRM (Large Reconstruction Model) + Triplane + NeRF |
| 骨干网络 | Transformer (自定义 attention) |
| 图像编码器 | DINOv2 |
| 表面提取 | Marching Cubes (torchmcubes) |
| 推理速度 | < 0.5 秒 (A100) |
| VRAM 需求 | ~6GB (单图输入) |
| 输出格式 | OBJ / GLB (支持顶点色或纹理贴图) |
| 许可证 | MIT |
| 依赖 | PyTorch, transformers, trimesh, rembg, gradio |

## 使用方式

### CLI 推理
```bash
python run.py examples/chair.png --output-dir output/
# 支持纹理烘焙: --bake-texture --texture-resolution 2048
# 支持渲染视频: --render
```

### Gradio 本地演示
```bash
python gradio_app.py
```

### Python API
```python
from tsr.system import TSR
model = TSR.from_pretrained("stabilityai/TripoSR", 
    config_name="config.yaml", weight_name="model.ckpt")
scene_codes = model([image], device="cuda:0")
meshes = model.extract_mesh(scene_codes, has_vertex_color=True)
```

## 相关链接

- GitHub: https://github.com/VAST-AI-Research/TripoSR
- HuggingFace Model: https://huggingface.co/stabilityai/TripoSR
- HuggingFace Demo: https://huggingface.co/spaces/stabilityai/TripoSR
- Paper: https://arxiv.org/abs/2403.02151
- Tripo AI: https://www.tripo3d.ai/
- Stability AI: https://stability.ai/

## 关键依赖

```
omegaconf==2.3.0
Pillow==10.1.0
einops==0.7.0
torchmcubes (git+https://github.com/tatsy/torchmcubes.git)
transformers==4.35.0
trimesh==4.0.5
rembg
huggingface-hub
imageio[ffmpeg]
gradio
xatlas==0.0.9
moderngl==5.10.0
```
