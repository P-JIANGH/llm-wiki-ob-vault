# DeepSeek-V3

> Source: https://github.com/deepseek-ai/DeepSeek-V3
> Captured: 2026-04-13

## 基本信息

- **项目名**: DeepSeek-V3
- **组织**: DeepSeek AI
- **GitHub**: https://github.com/deepseek-ai/DeepSeek-V3
- **Paper**: arXiv:2412.19437
- **许可证**: MIT (Code) / Model Agreement (Model)

## 模型架构

### 核心设计

- **架构类型**: MoE (Mixture of Experts) + MLA (Multi-head Latent Attention)
- **总参数量**: 671B
- **激活参数量**: 37B per token
- **上下文长度**: 128K

### 创新点

1. **Auxiliary-loss-free 负载均衡策略**: 首创无辅助损失负载均衡，最小化因鼓励负载均衡导致的性能下降
2. **Multi-Token Prediction (MTP)**: 多 token 预测训练目标，可用于推测解码加速推理
3. **FP8 混合精度训练**: 首次在超大模型上验证 FP8 训练的可行性和有效性
4. **全计算-通信重叠**: 跨节点 MoE 训练近乎实现完全计算-通信重叠

### 核心技术组件

| 组件 | 说明 |
|------|------|
| MLA | Multi-head Latent Attention，DeepSeek-V2 验证的高效注意力机制 |
| DeepSeekMoE | MoE 架构，37B 激活参数 / 671B 总参数 |
| MTP | Multi-Token Prediction，1 个额外 transformer 层 |
| FP8 | 128x128 block scaling，动态激活量化 |

## 预训练

- **训练数据**: 14.8 万亿高质量多样 token
- **训练成本**: 仅 2.664M H800 GPU hours
- **训练稳定性**: 全程无不可恢复 loss spike，无 rollback

## 后训练

- **知识蒸馏**: 从 DeepSeek-R1 系列模型蒸馏推理能力
- **RL 阶段**: 0.1M GPU hours
- **创新方法**: 将 R1 的验证和反思模式优雅融入 DeepSeek-V3

## 评估结果

### Base Model Benchmark (部分)

| Benchmark | DeepSeek-V3 | Qwen2.5 72B | LLaMA3.1 405B |
|-----------|-------------|-------------|---------------|
| MMLU (5-shot) | **87.1** | 85.0 | 84.4 |
| HumanEval (0-shot) | **65.2** | 53.0 | 54.9 |
| MATH (4-shot) | **61.6** | 54.4 | 49.0 |
| GSM8K (8-shot) | **89.3** | 88.3 | 83.5 |
| C-Eval (5-shot) | **90.1** | 89.2 | 72.5 |

### Chat Model Benchmark (部分)

| Benchmark | DeepSeek-V3 | GPT-4o 0513 | Claude-3.5-Sonnet |
|-----------|-------------|-------------|------------------|
| MMLU | 88.5 | 87.2 | 88.3 |
| MATH-500 | **90.2** | 74.6 | 78.3 |
| AIME 2024 | **39.2** | 9.3 | 16.0 |
| LiveCodeBench | **40.5** | 33.4 | 36.3 |

### Open-ended Generation

| Model | Arena-Hard | AlpacaEval 2.0 |
|-------|------------|----------------|
| DeepSeek-V3 | **85.5** | **70.0** |
| GPT-4o-0513 | 80.4 | 51.1 |
| Claude-Sonnet-3.5 | 85.2 | 52.0 |

## 推理部署

DeepSeek-V3 支持多种推理框架：

| 框架 | 支持模式 | 推荐场景 |
|------|---------|---------|
| SGLang | FP8, BF16, MTP (开发中) | NVIDIA + AMD GPU |
| LMDeploy | FP8, BF16 | 高效部署 |
| vLLM | FP8, BF16, Pipeline Parallel | 多机部署 |
| TensorRT-LLM | BF16, INT4/8 | 生产环境 |
| LightLLM | FP8, BF16 | 混合精度 |
| DeepSeek-Infer Demo | FP8, BF16 | 轻量演示 |

## 推理代码结构

```
inference/
├── convert.py       # HuggingFace → 自定义格式转换
├── fp8_cast_bf16.py # FP8 → BF16 权重转换
├── generate.py      # 推理入口，支持交互/批量
├── model.py         # 模型定义 (32KB, 核心)
├── kernel.py        # CUDA kernel 封装
├── configs/
│   └── config_671B.json  # 671B 模型配置
└── requirements.txt
```

## 模型权重结构

- **主模型**: 671B 参数 (61 层 transformer + embedding + head)
- **MTP 模块**: 1 层额外 transformer，11.5B 独立参数
- **总 HuggingFace 大小**: 685B (含 14B MTP)

## 与 DeepSeek-V2 / DeepSeek-R1 的关系

- DeepSeek-V2: 236B 总参数，21B 激活参数，MoE + MLA
- DeepSeek-V3: 671B 总参数，37B 激活参数，MoE + MLA + MTP
- DeepSeek-R1: 推理专用模型，V3 通过知识蒸馏继承其推理能力

## 许可证

- Code: MIT License
- Model: DeepSeek Model License (允许商业使用)
