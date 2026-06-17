# InternLM

> Source: https://github.com/InternLM/InternLM

## 基本信息

- **开发者**: 上海人工智能实验室 (Shanghai AI Laboratory)
- **License**: License (开源许可)
- **官网**: https://internlm.intern-ai.org.cn/
- **HuggingFace**: https://huggingface.co/internlm
- **技术报告**: arXiv 2403.17297

## 模型系列

### InternLM3 (最新, 2025-01-15)
- **InternLM3-8B-Instruct**: 8B 参数指令模型，仅用 4T 高质量 tokens 训练，成本降低 75%+
  - 支持 deep thinking mode（长思维链）和 normal response mode
  - 推理和知识密集型任务超越 Llama3.1-8B 和 Qwen2.5-7B
  - 在 MATH-500 达到 83.0%，AIME2024 达到 20.0%

### InternLM2.5 (2024-07/08)
- 规格: 1.8B / 7B / 20B
- InternLM2.5-Chat-1M 支持 1M 长上下文
- InternLM2-Reward 奖励模型系列 (1.8B/7B/20B, RewardBench 最高 89.5)

### InternLM2 (2024-01)
- 支持长上下文、推理、编码
- InternLM2-Math-7B/20B 数学专项模型

## 核心特性

- **Deep Thinking Mode**: 长思维链推理模式，解决复杂推理任务
- **Normal Response Mode**: 流畅对话交互模式
- **高效率训练**: 仅 4T tokens 训练达到 SOTA，节省 75%+ 训练成本
- **多规格**: 1.8B/7B/20B 多规格可选，1B 模型可低成本部署
- **多推理后端支持**: Transformers / LMDeploy / vLLM / SGLang / Ollama

## 推理使用

```python
# Transformers
from transformers import AutoTokenizer, AutoModelForCausalLM
model = AutoModelForCausalLM.from_pretrained("internlm/internlm3-8b-instruct", torch_dtype=torch.float16)
# 支持 4-bit/8-bit 量化 (bitsandbytes)

# LMDeploy
import lmdeploy
pipe = lmdeploy.pipeline("internlm/internlm3-8b-instruct")

# vLLM
from vllm import LLM, SamplingParams
llm = LLM(model="internlm/internlm3-8b-instruct")
```

## 性能对比 (InternLM3-8B-Instruct vs 同尺寸模型)

| Benchmark | InternLM3-8B | Qwen2.5-7B | Llama3.1-8B |
|-----------|-------------|------------|--------------|
| CMMLU | **83.1** | 75.8 | 53.9 |
| MATH-500 | **83.0** | 72.4 | 48.4 |
| GPQA-Diamond | **37.4** | 33.3 | 24.2 |
| AlpacaEval 2.0 LC | **51.1** | 30.3 | 25.0 |

## 目录结构

```
/agent          Agent 相关代码
/chat           对话相关
/ecosystem      生态系统工具
/finetune       微调代码
/long_context   长上下文支持
/model_cards    模型卡片
/tools          工具
```

## 与同类工具的差异

- 相比 Qwen/Llama: InternLM3 在相同规模下训练成本更低 (4T tokens)
- 独有 deep thinking mode 支持复杂推理任务的长思维链
- 上海 AI Lab 背景，与中国高校/研究机构合作紧密
