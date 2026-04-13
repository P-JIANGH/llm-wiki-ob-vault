# DeepSeek-R1

## 基本信息

- **GitHub**: https://github.com/deepseek-ai/DeepSeek-R1
- **许可证**: MIT
- **论文**: [DeepSeek_R1.pdf](https://github.com/deepseek-ai/DeepSeek-R1/blob/main/DeepSeek_R1.pdf) — arXiv:2501.12948
- **发布**: 2025年1月

## 模型系列

### MoE 大模型（671B 总参，37B 激活）

| 模型 | 总参数量 | 激活参数量 | Context Length | 下载 |
|------|---------|---------|--------------|------|
| DeepSeek-R1-Zero | 671B | 37B | 128K | HuggingFace |
| DeepSeek-R1 | 671B | 37B | 128K | HuggingFace |

基于 DeepSeek-V3-Base 训练。

### Distill 蒸馏模型

基于 DeepSeek-R1 生成的数据，对 Qwen/Llama 微调：

| 模型 | 基座 | AIME 2024 | MATH-500 | CodeForces |
|------|------|-----------|----------|------------|
| DeepSeek-R1-Distill-Qwen-1.5B | Qwen2.5-Math-1.5B | 28.9 | 83.9 | 954 |
| DeepSeek-R1-Distill-Qwen-7B | Qwen2.5-Math-7B | 55.5 | 92.8 | 1189 |
| DeepSeek-R1-Distill-Qwen-14B | Qwen2.5-14B | 69.7 | 93.9 | 1481 |
| DeepSeek-R1-Distill-Qwen-32B | Qwen2.5-32B | **72.6** | 94.3 | 1691 |
| DeepSeek-R1-Distill-Llama-8B | Llama-3.1-8B | 50.4 | 89.1 | 1205 |
| DeepSeek-R1-Distill-Llama-70B | Llama-3.3-70B-Instruct | 70.0 | **94.5** | 1633 |

**DeepSeek-R1-Distill-Qwen-32B 性能超越 OpenAI-o1-mini**（AIME 2024: 72.6 vs 63.6）。

## 核心技术：纯 RL 而非 SFT

### DeepSeek-R1-Zero

- **关键创新**: 直接在 Base Model 上应用大规模 RL，无需 SFT 作为前置步骤
- 能力：self-verification（自验证）、reflection（反思）、long CoT（长思维链）
- **里程碑**: 首次验证推理能力可以通过纯 RL 激励，无需 SFT
- 问题：endless repetition（无限重复）、poor readability（可读性差）、language mixing（语言混合）

### DeepSeek-R1

- 在 RL 之前引入冷启动数据（cold-start data）解决 R1-Zero 的问题
- Pipeline: 2 RL 阶段 + 2 SFT 阶段
  - RL 阶段：发现改进推理模式 + 对齐人类偏好
  - SFT 阶段：为模型的推理和非推理能力播种

## 基准评测（与 OpenAI o1 对比）

| Category | Benchmark | o1-mini | o1-1217 | DeepSeek R1 |
|----------|-----------|---------|---------|-------------|
| Math | AIME 2024 | 63.6 | 79.2 | **79.8** |
| Math | MATH-500 | 90.0 | 96.4 | **97.3** |
| Code | LiveCodeBench | 53.8 | 63.4 | **65.9** |
| Code | CodeForces Percentile | 93.4 | **96.6** | 96.3 |
| English | MMLU | 85.2 | **91.8** | 90.8 |
| English | ArenaHard | 92.0 | - | **92.3** |
| Chinese | C-Eval | 68.9 | - | **91.8** |

DeepSeek-R1 在数学、代码、中文理解上与 OpenAI o1-1217 持平或超越。

## 本地运行

### DeepSeek-R1（MoE）

需要通过 [DeepSeek-V3](https://github.com/deepseek-ai/DeepSeek-V3) 仓库运行。HuggingFace Transformers 尚未直接支持。

### DeepSeek-R1-Distill 模型

可用 vLLM 或 SGLang 部署，与 Qwen/Llama 使用方式相同：

```bash
# vLLM
vllm serve deepseek-ai/DeepSeek-R1-Distill-Qwen-32B --tensor-parallel-size 2 --max-model-len 32768 --enforce-eager

# SGLang
python3 -m sglang.launch_server --model deepseek-ai/DeepSeek-R1-Distill-Qwen-32B --trust-remote-code --tp 2
```

## 使用建议（重要）

1. Temperature 建议 0.5-0.7（推荐 0.6），防止无限重复
2. **避免添加 system prompt**，所有指令放在 user prompt 中
3. 数学问题建议加指令：`Please reason step by step, and put your final answer within \boxed{}`
4. 多次测试取平均
5. **建议强制模型以 `<think>\n` 开头**，防止跳过思维链

## API

- 官方网页: https://chat.deepseek.com（可开启 "DeepThink" 模式）
- API 平台: https://platform.deepseek.com/（OpenAI 兼容格式）
- API endpoint: `https://api.deepseek.com/v1/chat/completions`

## 许可证说明

- 代码和模型权重: MIT
- 支持商业使用，允许任何修改和衍生作品（包括蒸馏训练其他 LLM）
- Distill 模型继承各自基座的许可证（Qwen: Apache 2.0, Llama3.1/3.3: Llama License）
