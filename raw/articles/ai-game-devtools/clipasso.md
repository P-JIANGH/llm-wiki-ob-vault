# CLIPasso: Semantically-Aware Object Sketching

## 来源
- **论文**: arXiv 2202.05822 (SIGGRAPH 2022)
- **GitHub**: https://github.com/yael-vinker/CLIPasso
- **项目网站**: https://clipasso.github.io/clipasso/
- **Colab**: 可用

## 核心方法

CLIPasso 是一种将物体图像转换为草图（sketch）的方法，支持不同抽象层次的控制。

**核心思想**：
1. 将草图定义为一组贝塞尔曲线（Bézier curves）
2. 使用可微栅格化器 [diffvg](https://github.com/BachiLi/diffvg) 优化曲线参数
3. 优化目标为基于 CLIP 的感知损失（CLIP-based perceptual loss）
4. 结合预训练 CLIP 模型的最终和中间层激活，实现几何和语义简化
5. 抽象程度通过笔画数量（number of strokes）控制

**输入**：物体图像（推荐去背景）
**输出**：SVG 格式草图

## 技术架构

### 主要模块

1. **Painter（画家模块）**: `models/painter_params.py`
   - 基于 `pydiffvg` 的可微矢量渲染器
   - 每条笔画 = 贝塞尔曲线，4个控制点，1个线段
   - 支持注意力初始化（Dino 或 CLIP 的注意力头）
   - 笔画位置/颜色/透明度作为可优化参数
   - Adam 优化器：位置 lr=1.0, 颜色 lr=0.01

2. **Loss（损失模块）**: `models/loss.py`
   - CLIPLoss: CLIP ViT-B/32 余弦相似度损失
   - CLIPConvLoss: CLIP 中间层卷积特征 L2 损失（RN101, layers 2-3）
   - LPIPS: VGG16 感知损失（可选）
   - L2: 像素级 MSE（可选）
   - 数据增强：仿射变换（RandomPerspective + RandomResizedCrop）

3. **优化流程** (`painterly_rendering.py`):
   - 输入图像预处理 + U2Net 前景分割（可选）
   - 初始化笔画（基于 CLIP/Dino 注意力图）
   - 迭代优化（默认 500 步，每 10 步保存）
   - 自动早停（loss 变化 < 1e-5）
   - 多种子并行（默认 3 个种子选最优）

4. **入口脚本** (`run_object_sketching.py`):
   - 支持多进程并行优化
   - 可选 Colab 实时显示
   - 输出 SVG + 中间 JPG 日志

### 关键依赖
- **diffvg**: 可微矢量栅格化（CUDA 加速）
- **CLIP** (OpenAI): ViT-B/32 + RN101
- **Dino** (Facebook): ViT-S/8 自注意力
- **U2Net**: 前景分割
- **PyTorch** 1.7.1 + CUDA 10.1
- **WandB**: 实验跟踪

### 配置参数
- `--num_strokes`: 笔画数量（默认 16，控制抽象程度）
- `--num_iter`: 优化迭代数（默认 2001 入口脚本 / 500 渲染脚本）
- `--mask_object`: 前景分割标志
- `--attention_init`: 注意力初始化（默认开启）
- `--saliency_model`: 显著性模型（dino / clip）
- `--clip_conv_layer_weights`: 中间层权重 (0,0,1.0,1.0,0)
- `--force_sparse`: L1 正则鼓励少笔画

## 许可证
CC BY-NC-SA 4.0（知识共享 署名-非商业性使用-相同方式共享）

## 相关工作
- CLIPDraw (2021): 文本到草图生成
- Diffvg (2020): 可微矢量图形栅格化

## 引用
Vinker et al., "CLIPasso: Semantically-Aware Object Sketching", SIGGRAPH 2022
