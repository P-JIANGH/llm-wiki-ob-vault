# aiXcoder-7B — AI Game DevTools Source

> Source: https://github.com/aixcoder-plugin/aiXcoder-7B

## 基本信息

- **项目名称**: aiXcoder-7B (Code Large Language Model)
- **GitHub**: https://github.com/aixcoder-plugin/aiXcoder-7B
- **HuggingFace**: https://huggingface.co/aiXcoder/aixcoder-7b-base
- **论文**: https://arxiv.org/pdf/2410.13187
- **许可证**: Apache-2.0 (代码), Model License (权重, 学术研究免费, 商用需申请)
- **组织**: aiXcoder

## 核心能力

- 多编程语言代码补全、代码生成、代码理解
- 支持约100种主流编程语言（C++/Python/Java/JavaScript等）
- 结构化FIM（Fill-In-the-Middle）训练，基于AST节点构建训练任务
- 跨文件代码上下文理解
- 支持int8/int4量化推理（bitsandbytes）
- 支持LoRA微调（Huggingface PEFT）

## 技术架构

### 模型配置
- **参数量**: 7B
- **词汇表**: 49,152 (BPE, 基于字节)
- **位置编码**: RoPE (Rotary Positional Embedding)
- **激活函数**: SwiGLU
- **注意力**: Grouped Query Attention
- **训练序列长度**: 32,768

### 训练数据
- **规模**: 1.2T Unique Tokens
- **核心数据集**: 约100种主流编程语言 + StackOverflow/技术博客/代码文档/C论文
- **扩展数据集**: 过滤后的开源代码 + 高质量英/中文自然语言
- **数据清洗**: MinHash去重、敏感信息去除、语法解析过滤、静态分析检测163类bug和197类漏洞

### 训练策略
- **预训练任务**: 结构化FIM（70%）+ 自回归（30%）
- **FIM模式**: SPM (Suffix-Prefix-Middle) 和 PSM (Prefix-Suffix-Middle)
- **文件批次处理**: Calling Graph + K-Means聚类 + TF-IDF距离 + Transformer-XL式序列扩展

## 关键文件

- `sess_megatron.py` — Megatron推理入口
- `sess_huggingface.py` — Huggingface Transformers推理入口
- `hf_mini/utils.py` — FIM输入包装器，支持多语言前缀标记
- `finetune.py` — PEFT LoRA微调脚本
- `megatron_mini/` — Megatron-LM最小化适配层

## 性能表现

- nl2code benchmark: 超越codellama 34B和StarCoder2 15B
- 代码补全（FIM）: 主流编程语言平均最优
- 跨文件代码理解: CrossCodeEval上各语言均表现优异

## IDE插件

- VS Code: https://marketplace.visualstudio.com/items?itemName=aixcoder-plugin.aixcoder
- JetBrains: https://plugins.jetbrains.com/plugin/13574-aixcoder-code-completer

## 与同类工具差异

- 专注代码补全场景，同参数规模下效果最佳
- 结构化FIM基于AST，而非随机字符级别FIM
- 严格的代码质量过滤（bug检测、漏洞检测）
- 提供VS Code和JetBrains商业级插件
