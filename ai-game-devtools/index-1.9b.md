---
title: Index-1.9B
created: 2026-04-23
updated: 2026-04-23
type: entity
tags: [llm, chinese-llm, open-source, tool, ai, on-device]
sources: [raw/articles/ai-game-devtools/index-1.9b.md]
---

# Index-1.9B

Bilibili (哔哩哔哩) 开源的轻量级大语言模型系列，1.9B 非嵌入参数，基于 2.8T 中英文语料预训练，在同级别模型中多项评测领先。

## 模型变体

| 变体 | 特点 |
|-------|------|
| **Index-1.9B base** | 基座预训练模型 |
| **Index-1.9B pure** | 控制组，过滤掉所有指令相关数据 |
| **Index-1.9B chat** | SFT + DPO 对齐的对话模型 |
| **Index-1.9B character** | 基于 RAG 的少样本角色扮演定制 |
| **Index-1.9B-32K** | 支持 32K 上下文长度的长文本模型 |

## 核心特点

- **轻量高效**: 仅 1.9B 参数，但综合得分 64.92，接近 Qwen2-1.5B (65.17)
- **多语言能力**: 强多语言翻译能力，尤其东亚语种
- **角色扮演**: 内置 RAG 检索框架，支持少样本角色定制（CSV 语料 + 描述）
- **长上下文**: 32K 变体可一次性处理 35,000+ 字文档
- **量化支持**: INT4 量化，降低显存占用
- **微调支持**: LoRA 微调管线
- **社区生态**: 已适配 llama.cpp、Ollama 等推理框架

## 评测对比

| 模型 | 均分 | MMLU | CEVAL | CMMLU | HellaSwag |
|-------|------|------|-------|-------|-----------|
| **Index-1.9B** | **64.92** | 52.53 | 57.01 | 52.79 | 80.69 |
| Qwen2-1.5B | 65.17 | 56.5 | 70.6 | 70.3 | 66.6 |
| MiniCPM-2.4B-SFT | 62.53 | 53.8 | 49.19 | 50.97 | 67.29 |
| Llama2-7B | 50.79 | 44.32 | 32.42 | 31.11 | 76 |

## 使用方式

**Transformers 加载:**
```python
from transformers import AutoTokenizer, pipeline
tokenizer = AutoTokenizer.from_pretrained(model_path, trust_remote_code=True)
generator = pipeline("text-generation", model=model_path, tokenizer=tokenizer, 
                    trust_remote_code=True, device=device)
```

**Web Demo (Gradio):**
```shell
python demo/web_demo.py --port='port' --model_path='/path/to/model/'
```

**OpenAI API 兼容服务 (Flask):**
```shell
python demo/openai_demo.py --model_path='/path/to/model/'
```

**角色扮演:**
内置角色 "三三"，支持通过 CSV 对话语料和角色描述创建自定义角色。RAG 检索基于 BGE 向量库 + FAISS，实现少样本情景下的上下文学习。

## 技术架构

- **预训练**: 2.8T 中英文语料
- **对齐**: SFT + DPO
- **长上下文**: Continue Pre-Training + SFT 专门针对 >32K token 文本
- **量化**: BitsAndBytes INT4
- **微调**: LoRA (PEFT)

## 相关链接

- GitHub: https://github.com/bilibili/Index-1.9B
- HuggingFace: https://huggingface.co/IndexTeam
- ModelScope: https://modelscope.cn/models/IndexTeam
- 在线体验: [Chat](https://huggingface.co/spaces/IndexTeam/Index-1.9B) / [Role-playing](https://huggingface.co/spaces/IndexTeam/Index-1.9B-Character)

## 许可证

- 代码: Apache-2.0
- 模型权重: INDEX_MODEL_LICENSE（学术研究完全开放，支持免费商用）

## 相关页面

- [[minicpm]] — 面壁智能轻量级小语言模型系列，同样专注端侧部署的高性能小模型
- [[qwen2]] — 阿里巴巴通义千问开源 LLM 系列，中文领域的重要开源模型
- [[llama]] — Meta 基础 LLM 系列，开源 LLM 基石
- [[llama-cpp]] — 纯 C/C++ LLM 推理引擎，Index-1.9B 已适配
