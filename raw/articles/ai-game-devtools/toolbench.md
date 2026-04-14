# ToolBench — AI游戏开发工具原始资料

> 来源: https://github.com/openbmb/toolbench
> 克隆时间: 2026-04-14
> 许可证: Apache License 2.0

## 项目概述

ToolBench (ToolLLM) 是一个开源、大规模、高质量的指令微调 SFT 数据集项目，旨在赋予开源 LLM 通用工具使用能力。通过收集高质量的指令微调数据集，让开源 LLM 掌握数千种多样的真实世界 API。

## 核心数据

| 指标 | 数值 |
|------|------|
| Tool 数量 | 3,451 |
| API 数量 | 16,464 |
| Instance 数量 | 126,486 |
| 真实 API 调用 | 469,585 |
| 平均推理轨迹 | 4.0 |

## 核心特性

1. **API Collection**: 从 RapidAPI 收集 16,464 个 REST APIs
2. **Instruction Generation**: 包含单工具和多工具场景的指令
3. **Answer Annotation**: 使用 DFSDT（深度优先搜索决策树）方法进行标注，比 CoT 或 ReAct 效率更高
4. **API Retriever**: 集成 API 检索，赋予 ToolLLaMA 开放域工具使用能力

## 模型

- **ToolLLaMA-2-7b-v2**: 基于最新数据训练，HuggingFace: ToolBench/ToolLLaMA-2-7b-v2
- **ToolLLaMA-7b-v1**: 基于 0801 版本数据训练
- **ToolLLaMA-7b-LoRA-v1**: LoRA 版本
- **Tool Retriever**: ToolBench_IR_bert_based_uncased

## 训练流程

### 环境依赖

```
python>=3.9
pip install -r requirements.txt
```

### 训练 Retriever

```bash
export PYTHONPATH=./
python preprocess/preprocess_retriever_data.py \
    --query_file data/instruction/G1_query.json \
    --index_file data/test_query_ids/G1_instruction_test_query_ids.json \
    --dataset_name G1 \
    --output_dir data/retrieval/G1
```

### 训练 ToolLLaMA (2x A100 80GB)

```bash
export PYTHONPATH=./
torchrun --nproc_per_node=2 toolbench/train/train_mem.py \
    --model_name_or_path huggyllama/llama-7b \
    --data_path data/toolllama_G123_dfs_train.json \
    --conv_template tool-llama-single-round \
    --bf16 True \
    --output_dir toolllama \
    --num_train_epochs 2 \
    --per_device_train_batch_size 2 \
    --gradient_accumulation_steps 8 \
    --learning_rate 5e-5 \
    --model_max_length 8192 \
    --gradient_checkpointing True
```

## 推理方式

### RapidAPI 后端服务

使用官方提供的 RapidAPI 后端服务，无需自己订阅 API。需要申请 ToolBench Key。

### 自定义 RapidAPI 账户

传入 rapidapi_key 参数使用自己的 RapidAPI 账户。

## 目录结构

```
toolbench/
├── toolbench/
│   ├── inference/        # 推理管道 (qa_pipeline.py, qa_pipeline_open_domain.py)
│   │   ├── LLM/         # LLM 模型接口 (chatgpt_function_model.py, llama_model.py, tool_llama_model.py)
│   │   ├── Algorithms/   # 搜索算法 (DFS.py, single_chain.py, base_search.py)
│   │   └── Tree/        # 决策树 (Tree.py)
│   ├── retrieval/       # 检索器训练和推理
│   ├── train/           # 训练代码 (train_mem.py, train_lora.py)
│   └── tooleval/        # 评估工具 (ToolEval)
├── preprocess/          # 数据预处理
├── data_example/        # 示例数据
└── README.md
```

## 关键技术细节

### DFSDT (Depth-First Search based Decision Tree)

这是一种新型的决策树方法，用于增强 LLM 的规划和推理能力。DFSDT 比 CoT 或 ReAct 标注效率更高，成功标注了那些复杂指令（CoT 或 ReAct 无法回答的）。

### API 自定义

用户可以添加自定义 API：
1. 准备 API 文档 JSON 文件（遵循指定格式）
2. 创建 API 实现代码（Python api.py）
3. 修改查询文件格式
4. 使用 --api_customization 参数推理

## 相关链接

- GitHub: https://github.com/openbmb/toolbench
- Paper: https://arxiv.org/pdf/2307.16789.pdf
- HuggingFace: https://huggingface.co/ToolBench
