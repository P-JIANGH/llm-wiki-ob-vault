# Yi - 01.AI 双语大语言模型

> 来源: https://github.com/01-ai/Yi
> 克隆自: gitcode.com/01-ai/Yi

## 基本信息

- **开发方**: 01.AI (零一万物)
- **模型架构**: 基于 Transformer（与 Llama 相同架构，但权重独立训练）
- **训练数据**: 3T tokens 多语言语料（英/中双语为主）
- **训练数据截止**: 2023年6月
- **许可证**: Apache 2.0 + Yi Series Models Community License Agreement

## 模型系列

### Base Models
| 模型 | 参数量 | 默认上下文 | 预训练 tokens |
|------|--------|-----------|-------------|
| Yi-6B | 6B | 4K | 3T |
| Yi-9B | 9B | 4K | 3T + 0.8T 续训 |
| Yi-34B | 34B | 4K | 3T |

- Yi-9B 在代码、数学、常识推理上最强（超越同尺寸的 Mistral-7B、SOLAR-10.7B、Gemma-7B）
- 200K 变体：Yi-6B-200K、Yi-9B-200K、Yi-34B-200K（上下文扩展到 200K）

### Chat Models
| 模型 | 说明 |
|------|------|
| Yi-34B-Chat | AlpacaEval 第二名（仅次于 GPT-4 Turbo） |
| Yi-6B-Chat | 轻量级对话模型 |
| 4bits/8bits 量化版 | AWQ/GPTQ 量化，消费级 GPU 可运行（如 3090/4090） |

### VL Models (Yi-VL)
| 模型 | 说明 |
|------|------|
| Yi-VL-34B | MMMU 和 CMMMU 基准第一名 |
| Yi-VL-6B | 轻量级多模态模型 |

## 技术亮点

- **长上下文**: Yi-34B-200K 在 Needle-in-a-Haystack 测试中达到 99.8%（提升 10.5%）
- **双语能力**: 在 Hugging Face Open LLM Leaderboard 和 C-Eval 上均表现优异
- **生态完善**: 支持 pip / Docker / llama.cpp / 量化 / 微调 / 部署

## 代码结构

```
Yi/
├── VL/              # 多模态视觉语言模型（Yi-VL）
├── demo/            # 文本生成和 Web demo
├── docs/            # 文档（llama.cpp 部署指南）
├── finetune/        # 微调代码
├── quantization/    # 量化工具
├── Cookbook/        # 教程和示例
└── README.md        # 主文档
```

## 相关链接

- Hugging Face: https://huggingface.co/01-ai
- ModelScope: https://www.modelscope.cn/organization/01ai/
- Tech Report: https://arxiv.org/abs/2403.04652
