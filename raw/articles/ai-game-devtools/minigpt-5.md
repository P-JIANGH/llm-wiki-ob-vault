# MiniGPT-5

> Source: https://github.com/eric-ai-lab/MiniGPT-5

## 基本信息

- **项目名**: MiniGPT-5: Interleaved Vision-and-Language Generation via Generative Vokens
- **作者**: Kaizhi Zheng, Xuehai He, Xin Eric Wang (UC Santa Cruz)
- **发表**: arXiv 2023 (2310.02239)
- **项目页**: https://eric-ai-lab.github.io/minigpt-5.github.io/
- **许可证**: 非明确声明（需查看具体文件）

## 核心贡献

MiniGPT-5 是一个**交叠式图文生成模型**，核心创新是引入 **Generative Vokens（生成性视觉 token）** 作为文本与图像输出的桥梁，实现无需详细图像描述的多模态训练。

## 技术架构

### 基础模型
- 基于 [MiniGPT-4](https://github.com/Vision-CAIR/MiniGPT-4)（含 Vicuna V0 7B + BLIP-2）
- 视觉编码器：冻结的 ViT + Q-Former
- LLM：Vicuna 7B（需单独下载）

### 两阶段训练

**Stage 1: Unimodal Alignment Stage (CC3M)**
- 目标：给定图像描述生成正确图像
- 数据：Conceptual Captions 3M (CC3M)
- 使用生成性 vokens 将视觉特征对齐到 LLM 空间

**Stage 2: Multimodal Learning Stage (VIST / MMDialog)**
- 目标：交叠式图文故事生成，多轮对话中的图像生成
- 数据集：VIST（视觉故事）、MMDialog（多轮多模态对话）
- Classifier-free guidance 提升 vokens 生成效果

### 生成模型
- Stable Diffusion 2-1 (from HuggingFace: `stabilityai/stable-diffusion-2-1-base`)
- SD VAE + UNet2D + CLIPTextEncoder

### 关键文件

| 文件 | 说明 |
|------|------|
| `model.py` | LightningModule: MiniGPT5_Model，含 SD pipeline 集成 |
| `dataloader.py` | 数据加载，含 VIST/MMDialog 格式处理 |
| `train_eval.py` | 训练与评估入口 |
| `metric.py` | FID/BLEU/CIDER 等指标计算 |
| `config/minigpt4.yaml` | MiniGPT-4 基础配置，含 LoRA 设置 |
| `examples/playground.py` | 交互式 demo |

### 依赖框架
- PyTorch / Lightning >= 2.0
- Transformers == 4.31.0
- Diffusers
- PEFT（LoRA 微调）
- wandb（训练可视化）

## 评测结果

| 数据集 | 任务 | 效果 |
|--------|------|------|
| MMDialog | 多模态对话生成 | 显著优于 Divter baseline |
| VIST | 视觉故事生成 | 达到或超越人类评估水平 |
| CC3M | 图像描述→生成 | 正确图像生成 |

## 游戏开发相关

MiniGPT-5 可用于游戏场景：
- **故事/任务生成**：生成交叠的文本叙事 + 对应游戏场景图
- **NPC 对话可视化**：多模态对话生成可视化图像
- **游戏叙事设计**：VIST 风格的故事到游戏关卡视觉素材生成

与 [[MiniGPT-4]] 相比，MiniGPT-5 从纯视觉理解扩展到**交叠式图文生成**，通过 generative vokens 实现图文协同输出，是图文生成领域的重要进展。
