# ChatYuan — AI Game DevTools Source

> Source from: https://github.com/clue-ai/ChatYuan
> Cloned via: gitcode.com mirror (2026-04-13)
> Raw capture date: 2026-04-13

## 项目概述

ChatYuan-large-v2 是由 **ClueAI（元语智能）** 开发的开源中英双语对话大语言模型。发布于 2023 年 3 月 23 日。是 ChatGPT 风格的功能型对话模型，支持中文和英文。

## 核心特性

- **中英双语对话**：同时支持中文和英文
- **拒答能力**：对危险/有害问题学会拒答
- **代码生成**：基础代码生成能力
- **表格生成**：生成格式规范的表格
- **最大长度扩展**：从 1024 token 扩展到 4096
- **轻量化推理**：INT4 最低只需 400M 显存，可在消费级显卡、PC、甚至手机上运行

## 模型架构

- 基于 **T5** (Text-to-Text Transfer Transformer) 架构
- 使用 Hugging Face `transformers` 库加载
- `T5Tokenizer` + `T5ForConditionalGeneration`
- 预训练：PromptCLUE-large 在 1000 亿 token 中文语料上预训练，累计学习 1.5 万亿中文 token
- 在数百种任务上进行 Prompt 任务式训练

## 分布式训练

目录：`distributed-training/`
- `train.py` — T5 微调训练脚本，使用 **Horovod** 进行分布式训练
- `data.py` — 数据准备
- `dialogdataset.py` — 对话数据集类
- `requirements.txt` — 依赖配置

训练配置：
- 模型：ChatYuan-large-v1
- 训练 batch size: 2
- 学习率: 3e-4
- 最大 source 长度: 512
- 最大 target 长度: 512
- 梯度累积步数: 32
- 使用 Adafactor 优化器（见 T5 论文建议）

## 使用方式

### Gradio 网页交互
```python
# 依赖：clueai==0.0.2.2.4, gradio==3.20.1, transformers==4.26.1
python app_gradio.py
```

### 本地对话
```python
from transformers import AutoTokenizer, AutoModel
tokenizer = AutoTokenizer.from_pretrained("ClueAI/ChatYuan-large-v2")
model = AutoModel.from_pretrained("ClueAI/ChatYuan-large-v2", trust_remote_code=True)
response, history = model.chat(tokenizer, query, history=history)
```

## 在线 Demo

- HuggingFace Space: https://huggingface.co/spaces/ClueAI/ChatYuan-large-v2
- ModelScope: https://modelscope.cn/studios/ClueAI/ChatYuan-large-v2
- Colab: https://colab.research.google.com/drive/1ZcLIJuemiojigrfjbsDMBWrX7JqXZX6I

## 模型下载

- HuggingFace: https://huggingface.co/ClueAI/ChatYuan-large-v2/

## 许可证

自定义许可证（非商业研究用途），关键限制：
- 仅供非商业研究目的
- 禁止用于商业、军事或非法目的
- 禁止损害中国国家安全和社会公共利益
- 免责声明按"原样"提供
- 适用中华人民共和国法律，纠纷提交杭州市人民法院

## 与同类工具的关系

- 属于 LLM 对话模型类别
- 基于 Google T5 架构
- 功能类似于 ChatGPT 类对话系统，但轻量且支持中文
