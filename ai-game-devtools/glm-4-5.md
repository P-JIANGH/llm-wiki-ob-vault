---
title: GLM-4.5 / GLM-4.6 / GLM-4.7
created: 2026-04-25
updated: 2026-04-25
type: entity
tags: [llm, model, moe, open-source, agent, reasoning, tool-calling, chinese-llm]
sources: [raw/articles/ai-game-devtools/glm-4-5.md]
---

# GLM-4.5 / GLM-4.6 / GLM-4.7

## 概述

GLM-4.5 系列是智谱 AI（Zhipu AI）开发的面向智能体（Agent）场景的混合推理大语言模型家族，包含 GLM-4.5、GLM-4.6、GLM-4.7 三个迭代版本。全部开源（MIT 许可证），支持商业使用和二次开发。

- **GLM-4.7**（最新）：编码搭档，支持 Interleaved Thinking 和 Preserved Thinking（跨多轮对话保留思维链），SWE-bench 73.8%，Terminal Bench 2.0 41%
- **GLM-4.6**：上下文扩展至 200K，推理和 Agent 能力显著提升
- **GLM-4.5**：基座版本，355B 总参 / 32B 激活（MoE 架构），128K 上下文，MIT 开源

## 核心规格

| 模型 | 总参 | 激活参 | 精度 | 上下文 | 特点 |
|------|------|--------|------|--------|------|
| GLM-4.7 | 355B | A32B | BF16 | 128K+ | 旗舰编码/Agent |
| GLM-4.7-Flash | 30B | A3B | BF16 | 128K+ | 轻量级 |
| GLM-4.6 | 355B | A32B | BF16 | 200K | 超长上下文 |
| GLM-4.5 | 355B | A32B | BF16/FP8 | 128K | 基座 |
| GLM-4.5-Air | 106B | A12B | BF16/FP8 | 128K | 紧凑版 |

## 技术特点

### 混合推理架构
- **Thinking Mode**：复杂推理和工具调用时启用思维链
- **Non-thinking Mode**：简单请求快速响应
- **Preserved Thinking**：跨多轮 Agent 对话保留完整思维链，避免重复推导
- **Turn-level Thinking**：每轮独立控制开关，按需切换

### MoE 架构
- GLM-4.5/4.6/4.7 采用混合专家（Mixture of Experts）稀疏激活
- GLM-4.7-Flash 为更小的 30B-A3B 蒸馏版本，单卡 H100 即可运行

### 工具调用
- OpenAI 风格 tool description 格式
- 支持 `--tool-call-parser glm47` 和 `--enable-auto-tool-choice`
- 内置 `glm45` reasoning parser，解析思维链输出
- vLLM 和 SGLang 均支持

### 推理框架
支持 transformers、vLLM、SGLang、LMDeploy、TensorRT-LLM 等主流推理框架。

## 推理硬件需求

| 模型 | 精度 | 推荐 GPU | 全功能推理 |
|------|------|---------|-----------|
| GLM-4.5 | BF16 | H100 x 16 | 是 |
| GLM-4.5 | FP8 | H100 x 8 | 是 |
| GLM-4.5-Air | BF16 | H100 x 4 | 是 |
| GLM-4.5-Air | FP8 | H100 x 2 | 是 |
| GLM-4.7-Flash | BF16 | H100 x 1 | 是 |

## 微调

支持 LLaMA-Factory 和 ModelScope Swift，支持 LoRA / SFT / RL 三种策略：
- LoRA: GLM-4.5（16x H100），GLM-4.5-Air（4x H100）
- SFT/RL: 需要 H20 x 128 / 32

## 快速部署示例

### SGLang（推荐）
```bash
python3 -m sglang.launch_server \
  --model-path zai-org/GLM-4.7-FP8 \
  --tp-size 8 \
  --tool-call-parser glm47 \
  --reasoning-parser glm45 \
  --speculative-algorithm EAGLE \
  --speculative-num-steps 3
```

### vLLM
```bash
vllm serve zai-org/GLM-4.7-FP8 \
     --tensor-parallel-size 4 \
     --tool-call-parser glm47 \
     --enable-auto-tool-choice
```

### transformers 本地推理
```python
from transformers import AutoModelForCausalLM, AutoTokenizer
model = AutoModelForCausalLM.from_pretrained(
    "zai-org/GLM-4.7", torch_dtype=torch.bfloat16, device_map="auto"
)
```

## 与同类工具对比

GLM-4.5 系列定位为"面向 Agent 的推理模型"，与 [[deepseek-v3]]（671B MoE）、[[qwen2-5-coder]]（编程专用）、[[qwen1-5]]（通用）属于同类国产开源 LLM 家族。相比竞品，GLM-4.7 在SWE-bench 编码基准和 Terminal Bench 上有显著优势，且 Preserved Thinking 机制对多轮 Agent 场景有特殊优化。

## 相关链接

- GitHub: https://github.com/zai-ai/GLM-4.5
- HuggingFace: https://huggingface.co/zai-org/GLM-4.7
- ModelScope: https://modelscope.cn/models/ZhipuAI/GLM-4.7
- 技术报告: arXiv:2508.06471
- API 平台: https://docs.z.ai/guides/llm/glm-4.7
- Chat: https://chat.z.ai

## 相关模型

- [[deepseek-v3]] — DeepSeek 671B MoE 模型，MTP 推测解码架构
- [[qwen1-5]] — 通义千问开源 LLM 家族
- [[qwen2-5-coder]] — 通义千问编程专用模型
- [[text-generation-web-ui]] — 本地 LLM 推理 WebUI，支持 GLM 模型
