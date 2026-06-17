# InteX — 原始源

> 来源: https://github.com/ashawkey/InTeX
> 抓取日期: 2026-04-18
> 论文: https://arxiv.org/abs/2403.11878
> 项目主页: https://me.kiui.moe/intex/

## 基本信息

- **全称**: InteX: Interactive Text-to-Texture Synthesis via Unified Depth-aware Inpainting
- **作者**: Jiaxiang Tang, Ruijie Lu, Xiaokang Chen, Xiang Wen, Gang Zeng, Ziwei Liu
- **论文**: arXiv:2403.11878 (2024)
- **GitHub**: https://github.com/ashawkey/InTeX
- **许可证**: 未明确声明

## 功能描述

InteX 是一个交互式文本到纹理合成系统，通过统一深度感知修复技术为 3D 网格生成高质量纹理。用户可以用文本提示描述想要的纹理效果，系统从多个视角渲染网格并使用 Stable Diffusion 生成/修复纹理。

## 技术架构

### 核心模块
- **main.py** — 主入口，GUI 控制器（DearPyGui），包含完整的纹理生成管线
  - `GUI` 类：管理渲染、引导模型加载、视图级修复
  - `generate()` 方法：沿预设相机路径（默认/前视/顶视/侧视）遍历视角
  - `inpaint_view()` 方法：单视图深度感知纹理修复
  - `backup()`/`restore()`: 状态回滚机制
- **mesh_renderer.py** — 基于 nvdiffrast 的网格渲染器
- **mesh.py** / **mesh_utils.py** — 网格数据结构与工具
- **grid_put.py** — UV 空间纹理投影（mipmap 线性/最近邻插值）
- **cam_utils.py** — 轨道相机控制

### 引导模型（guidance/）
- **sd_utils.py** — Stable Diffusion 纹理生成
- **sd_lcm_utils.py** — LCM (Latent Consistency Model) 加速版本

### 控制模式（control_mode）
- `normal` — 法线图控制
- `depth` — 深度图控制
- `ip2p` — Instruction-to-Pixel 控制
- `inpaint` — 传统修复模式
- `depth_inpaint` — 深度感知修复模式（核心创新）

### UI
- **本地 GUI**: DearPyGui 交互式编辑
- **Web GUI**: Gradio (`app.py`)

### 配置文件（configs/）
- `base.yaml` — 基础参数
- `revani.yaml` — ReVAnimated 风格
- `anything.yaml` — Anything 风格
- `guofeng.yaml` — 国风风格

### 脚本（scripts/）
- `run.sh` / `run2.sh` / `run3.sh` — 命令行生成示例
- `run_objaverse.sh` / `run_objaverse.py` — Objaverse 数据集批处理
- `run_texfusion.sh` — TexFusion 模式
- `run_human.sh` — 人体模型纹理生成
- `run_re.sh` — 重绘模式

## 依赖

- Python 核心：torch, numpy, scipy, scikit-learn, kornia, opencv-python, matplotlib
- 3D 渲染：nvdiffrast (NVIDIA)
- 3D 工具：xatlas, plyfile, pygltflib, trimesh
- 扩散模型：diffusers >= 0.23.1, accelerate, transformers, huggingface_hub
- GUI：dearpygui, kiui

## 关键创新

1. **统一深度感知修复**：将纹理生成和修复合并为统一管线，根据视图余弦值判断哪些区域需要生成、哪些需要修复、哪些需要保留
2. **交互式编辑**：支持本地 GUI 实时预览和调整
3. **多视角协同**：沿预设相机路径从多个角度生成纹理，自动融合到统一 UV 空间
4. **纹理膨胀**：生成后自动填充 UV 接缝区域
5. **LCM 加速**：支持 LCM 模式，大幅减少推理步数

## 使用示例

```bash
# 命令行生成
python main.py --config configs/revani.yaml mesh=data/dragon.glb \
  prompt="a red pet dragon with fire patterns" save_path=dragon_fire.glb text_dir=True

# 交互式 GUI
python main.py --config configs/revani.yaml mesh=data/dragon.glb \
  prompt="a red pet dragon with fire patterns" save_path=dragon_fire.glb text_dir=True gui=True

# Web GUI
python app.py
```
