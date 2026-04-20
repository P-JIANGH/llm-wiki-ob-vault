---
title: CodeGeeX2
created: 2026-04-16
updated: 2026-04-16
type: entity
tags: [llm, code, tool, python, ai]
sources: [raw/articles/ai-game-devtools/codegeex2.md]
---

# CodeGeeX2

**CodeGeeX2** 是 THUDM（清华大学 KEG）多语言代码生成模型 [[ai-game-devtools/codegeex]] 的第二代。基于 `ai-game-devtools/chatglm2` 架构，以 60 亿参数 + 600B 代码 token 预训练，多项基准超越 150 亿参数的 StarCoder-15B。最新一代为 [[ai-game-devtools/codegeex4]]。

## 核心数据

| 指标 | 值 |
|------|----|
| 参数量 | 6B（vs 上一代 13B） |
| 序列长度 | 8192 tokens |
| HumanEval Pass@1 | **35.9%**（超越 StarCoder-15B 的 33.2%） |
| HumanEval-X 综合 | 28.1%（6 语言平均） |
| DS1000 Pass@1 | 23.1% |
| INT4 显存需求 | 5.5 GB |
| 推理速度 | 94 tokens/sec（上一代 32） |
| 许可证 | 代码 Apache-2.0 / 模型学术研究免费 |

## 技术特点

### 架构
- **基座**: ChatGLM2-6B + 代码数据继续预训练
- **Multi-Query Attention**: 减少 KV cache 大小
- **Flash Attention**: `scaled_dot_product_attention` 高效计算
- **语言标签控制**: 输入需加 `# language: Python` 等标签

### 性能提升（vs CodeGeeX-13B）
- Python +57%，C++ +71%，Java +54%，JavaScript +83%，Go +56%，Rust +321%
- 参数量减半（13B→6B），性能全面提升（+107%）
- 推理速度 3 倍提升（32→94 tokens/sec）
- INT4 量化显存需求降低 80%（26.9GB→5.5GB）

### 生态
- **IDE 插件**: VS Code + JetBrains（代码补全、跨文件补全、代码翻译、Ask CodeGeeX 对话）
- **100+ 编程语言**支持
- **中英双语**: 更好的中英文 prompt 理解

## 快速使用

```python
from transformers import AutoTokenizer, AutoModel
tokenizer = AutoTokenizer.from_pretrained("THUDM/codegeex2-6b", trust_remote_code=True)
model = AutoModel.from_pretrained("THUDM/codegeex2-6b", trust_remote_code=True, device='cuda')
model = model.eval()

prompt = "# language: Python\n# write a bubble sort function\n"
inputs = tokenizer.encode(prompt, return_tensors="pt").to(model.device)
outputs = model.generate(inputs, max_length=256, top_k=1)
print(tokenizer.decode(outputs[0]))
```

## 依赖

`transformers>=4.30.2`, `torch>=2.0`, `accelerate`, `gradio`, `cpm_kernels`, `protobuf`, `sentencepiece`

## Demo

- **Gradio**: `python demo/run_demo.py`（支持 ChatGLM.cpp 量化加速）
- **FastAPI**: `python demo/fastapicpu.py`（CPU/half/量化选项）

## 许可证

代码 Apache-2.0 开源；模型权重学术研究完全开放，商业使用需填写登记表（open.bigmodel.cn）。

## 相关链接

- **GitHub**: https://github.com/THUDM/CodeGeeX2
- **HuggingFace**: https://huggingface.co/THUDM/codegeex2-6b
- **主页**: https://codegeex.cn
- **论文**: https://arxiv.org/abs/2303.17568 (KDD 2023)

## 相关页面

- [[ai-game-devtools/codegeex]] — 第一代 CodeGeeX（13B，KDD'23）
- [[ai-game-devtools/codegeex4]] — 最新一代 CodeGeeX
- [[ai-game-devtools/aixcoder-7b]] — 另一个代码大模型（aiXcoder 7B）
- [[ai-game-devtools/text-generation-webui]] — LLM WebUI 工具
