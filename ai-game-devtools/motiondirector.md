---
title: MotionDirector — 视频运动定制扩散模型
created: 2026-04-20
updated: 2026-04-20
type: entity
tags: [video, diffusion, ai, tool, open-source]
sources: [raw/articles/ai-game-devtools/motiondirector.md]
---

# MotionDirector

Motion Customization of Text-to-Video Diffusion Models. 通过 LoRA 微调让文本到视频扩散模型学习特定运动模式，使不同主体在新场景下复现所学动作。

## 基本信息
- **作者:** Rui Zhao, Yuchao Gu, Jay Zhangjie Wu, David Junhao Zhang, Jia-Wei Liu, Weijia Wu, Jussi Keppo, Mike Zheng Shou
- **机构:** Show Lab, 新加坡国立大学
- **论文:** [arXiv 2310.08465](https://arxiv.org/abs/2310.08465)
- **项目页:** [showlab.github.io/MotionDirector](https://showlab.github.io/MotionDirector)
- **演示:** [Hugging Face Spaces](https://huggingface.co/spaces/ruizhaocv/MotionDirector) (入选 Spaces of the Week 🔥)
- **许可证:** 未明确声明（模型权重通过 HuggingFace 公开）

## 核心功能
给定同一运动概念的多段视频，MotionDirector 使用 LoRA 微调现有 T2V 扩散模型，使其能够根据文本提示生成带有该运动特征的新视频。

### 四种训练模式
| 模式 | 输入 | 输出 |
|------|------|------|
| 多视频运动学习 | 同一概念的多段视频 | 学习运动概念（举重、骑车、骑马等） |
| 单视频运动学习 | 单段视频 | 学习特定运动模式（车辆行驶等） |
| 图像动画化 | 参考图像（空间路径）+ 参考视频（时间路径） | 静态图像+所学运动 → 动画视频 |
| 外观+运动联合定制 | 参考图像 + 参考视频 | 同时定制主体外观和运动 |

## 技术架构
- **双路径 LoRA:** 空间路径（图像外观）+ 时间路径（视频运动）分离注入
- **基础模型:** ZeroScope、ModelScopeT2V 等兼容 T2V 扩散模型
- **UNet3D:** UNet3DConditionModel 在注意力层注入 LoRA 适配器
- **DDIM 反演:** 参考视频噪声反演作为运动引导（noise_prior 参数控制影响程度）
- **Gradient Checkpointing:** 训练显存约 14GB（A5000）

### 训练参数
- LoRA rank: 32（ModelScope 最大支持 1024）
- 学习率: 5e-4
- 混合精度: FP16
- 多视频训练: 300-500 步，约 9-16 分钟（A5000）
- 单视频训练: 50-150 步，约 1.5-4.5 分钟（A5000）

### 推理关键参数
- `noise_prior`: 0（多视频，最大多样性）/ 0.1-0.5（单视频，更贴近参考）
- `spatial_scale`: 空间 LoRA 权重比例（默认 0）
- `guidance_scale`: CFG 缩放（默认 12）

## 应用示例
- **运动:** 举重、骑自行车、骑马、滑板、打高尔夫
- **电影镜头:** 推拉变焦（Dolly Zoom）、推近/拉远、跟随/反向跟随、胸部平移、轨道环绕、后退入场
- **图像动画:** 静态图+运动视频 → 带运动的动画视频
- **外观+运动联合:** 兵马俑外观 + 骑马运动 → 兵马俑骑马视频

## 技术栈
- PyTorch + Diffusers + Accelerate + Transformers
- OmegaConf（YAML 配置）
- CLIP 文本编码 + AutoencoderKL 潜空间压缩
- 数据集支持: VideoJsonDataset / SingleVideoDataset / ImageDataset / VideoFolderDataset

## 相关项目
- [[animate-diff]] — AnimateDiff 运动模块，MotionDirector 有 AnimateDiff 适配版本
- [[zero-1-to-3]] — 3D 新视角合成，与视频生成互补的视觉定制技术
- `ai-game-devtools/modelscope-t2v` — ModelScope 文本到视频基础模型，MotionDirector 支持的基础模型之一
