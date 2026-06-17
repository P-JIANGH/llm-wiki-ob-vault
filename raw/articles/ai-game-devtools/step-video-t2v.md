# Step-Video-T2V 原始源分析

> 来源: https://github.com/stepfun-ai/Step-Video-T2V
> 抓取日期: 2026-04-20
> 此文件为 raw 层，不可修改。修正应写入 wiki 页面。

## 项目概览

**Step-Video-T2V** 是阶跃星辰（StepFun）开源的 30B 参数文本到视频（Text-to-Video）扩散模型，支持生成最长 204 帧视频。

**技术报告**: arXiv 2502.10248
**在线服务**: 跃问视频 (https://yuewen.cn/videos)

## 核心架构

### 整体管线
1. **Video-VAE**: 深度压缩变分自编码器，16x16 空间压缩 + 8x 时间压缩
2. **文本编码器**: 双语预训练文本编码器（中英文），输出 6144 维 + 1024 维(CLIP) 双编码
3. **DiT (Diffusion Transformer)**: 48 层，48 注意力头，每头 128 维，3D Full Attention
4. **Video-DPO**: 直接偏好优化，提升视觉质量

### 模型参数
- DiT 架构: 48 layers × 48 heads × 128 dim = 6144 隐藏维度
- 输入通道: 64 (VAE latent)
- 归一化: AdaLN-Single (时间步条件) + QK-Norm (自注意力稳定)
- 位置编码: 3D RoPE (处理不同视频长度和分辨率)

## 项目结构

```
stepvideo/
├── __init__.py
├── __version__.py
├── config.py                    # 配置常量
├── parallel.py                  # 并行计算支持
├── diffusion/
│   ├── video_pipeline.py        # 视频生成管线
│   └── scheduler.py             # 扩散调度器
├── modules/
│   ├── model.py                 # DiT 主干模型 (StepVideoModel)
│   ├── blocks.py                # Transformer 块
│   ├── attentions.py            # 注意力机制
│   ├── normalization.py         # 归一化层 (AdaLayerNormSingle 等)
│   └── rope.py                  # 3D RoPE 实现
├── vae/
│   └── vae.py                   # Video-VAE 实现
├── text_encoder/
│   ├── __init__.py
│   ├── clip.py                  # CLIP 文本编码器
│   ├── stepllm.py               # StepLLM 文本编码器
│   ├── tokenizer.py             # 分词器
│   └── flashattention.py        # Flash Attention 支持
├── utils/
│   ├── __init__.py
│   ├── utils.py                 # 工具函数
│   └── video_process.py         # 视频后处理
├── setup.py                     # 安装脚本
├── run_parallel.py              # 多 GPU 并行推理入口
├── api/
│   └── call_remote_server.py    # 远程 API 服务(文本编码器/VAE 解耦)
└── benchmark/
    ├── evaluation.py            # 评测脚本
    └── Step-Video-T2V-Eval      # 128 条中文提示基准测试集
```

## 关键依赖

- PyTorch 2.5.0 + CUDA
- diffusers >= 0.31.0
- transformers >= 4.39.1
- xfuser 0.4.2rc2 (张量并行 + Ulysses 并行)
- accelerate >= 1.0.0
- einops, numpy, imageio
- Flask/Flask-RESTful (远程 API 服务)

## 资源需求

| 分辨率/帧数 | 峰值显存 | 50步(有flash) | 50步(无flash) |
|---|---|---|---|
| 768×768×204f | 78.55 GB | 860s | 1437s |
| 544×992×204f | 77.64 GB | 743s | 1232s |
| 544×992×136f | 72.48 GB | 408s | 605s |

- 推荐: 4×80GB GPU
- 文本编码器(self-attention)仅支持 sm_80/sm_86/sm_90 CUDA 架构

## 推理策略

- **解耦部署**: 文本编码器和 VAE 解码与 DiT 分离，DiT 独占 GPU
- **并行策略**: 支持张量并行(tp_degree) + Ulysses 并行(ulysses_degree)，需满足 tp × ulysses = parallel
- **最佳参数**: 30-50 步 / CFG 9.0 / time_shift 13.0 / 204 帧
- **Turbo 版**: 10-15 步 / CFG 5.0 / time_shift 17.0

## 变体

| 版本 | 特点 |
|---|---|
| Step-Video-T2V | 标准版，50步推理 |
| Step-Video-T2V-Turbo | 推理步蒸馏加速版，10-15步 |
| Step-Video-TI2V | 图像到视频变体(2025-03-17 发布) |

## 评测基准

Step-Video-T2V-Eval: 128 条真实用户中文提示，覆盖 11 个类别：
体育、食物、风景、动物、节日、组合概念、超现实、人物、3D动画、电影摄影、风格
