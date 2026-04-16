# OmAgent — 多模态语言智能体框架

> Source: https://github.com/om-ai-lab/OmAgent
> Cloned: 2026-04-16
> Tag: v0.2.4

## 基本信息

- **名称:** OmAgent
- **组织:** OmAI Lab (om-ai-lab)
- **GitHub:** https://github.com/om-ai-lab/OmAgent
- **许可证:** 未明确声明 (仓库中有 LICENSE 文件)
- **最新版本:** v0.2.4
- **Python 要求:** >= 3.10

## 项目简介

OmAgent 是一个用于构建多模态语言智能体的 Python 库。设计理念是保持简洁，避免过度工程化，同时提供强大的多模态推理能力。

### 核心特性

- 灵活的智能体架构：基于图的工作流编排引擎 + 多种记忆类型支持上下文推理
- 原生多模态交互：VLM 模型、实时 API、计算机视觉模型、移动设备连接
- 多种 SOTA 单模态/多模态智能体算法：ReAct、CoT、SC-CoT 等
- 支持本地模型部署（Ollama / LocalAI）
- 完全分布式架构，支持自定义扩展；同时提供 Lite 模式，无需中间件部署

## 技术架构

### 核心模块 (omagent-core)

```
omagent-core/src/omagent_core/
├── base.py              # BotBase 抽象基类 (Pydantic + ABC)
├── utils/
│   ├── registry.py      # Registry 注册中心 (prompt/llm/node/worker/tool/encoder/connector/component)
│   ├── container.py     # Container 单例 (连接器 + 组件管理)
│   ├── build.py         # YAML/JSON 配置构建器
│   ├── env.py           # 环境变量工具
│   └── logger.py        # 日志工具
├── engine/              # Conductor 工作流引擎集成
│   ├── http/            # HTTP API 客户端
│   ├── workflow/        # 工作流定义与执行器
│   ├── worker/          # Worker 基类
│   └── task_client.py   # 任务客户端
├── models/
│   ├── llms/            # LLM 后端 (OpenAI GPT、Azure GPT、Qwen2、Qwen2-VL)
│   ├── encoders/        # 编码器 (OpenAI Encoder)
│   ├── asr/             # 语音识别 (STT)
│   └── od/              # 目标检测 schemas
├── memories/
│   ├── stms/            # 短期记忆 (Redis STM、SharedMem STM)
│   └── ltms/            # 长期记忆 (Milvus LTM)
├── tool_system/         # 工具系统
│   ├── tools/           # 计算器、代码解释器、文件读写、Web 搜索、OVD 工具等
│   └── manager.py       # 工具管理器
├── services/            # 服务连接器 (Conductor、Milvus、Redis)
├── clients/             # 客户端设备 (App、CLI、Webpage、Programmatic、Aaas)
└── workflows/           # 工作流定义
```

### 关键设计模式

1. **Registry 注册中心**: 统一的组件注册/查找机制，支持 8 种组件类别 (prompt/llm/node/worker/tool/encoder/connector/component)
2. **Container 单例**: 管理所有连接器和服务组件的实例生命周期
3. **BotBase 基类**: 所有组件继承自 Pydantic BaseSettings + ABC，支持 YAML 配置驱动实例化
4. **Worker 模型**: Worker 是计算基本单元，通过 @registry.register_worker() 装饰器注册，支持同步/异步执行
5. **Workflow 编排**: 基于 Conductor 工作流引擎，支持链式 (>>)、fork-join、switch 等模式
6. **配置系统**: container.yaml + workers/*.yml 驱动，支持 ${sub|module} 子模块引用和 ${env|VAR} 环境变量注入

### 示例项目

| 示例 | 描述 |
|------|------|
| step1_simpleVQA | 简单视频问答 Agent |
| step2_outfit_with_switch | 带天气判断的穿搭推荐 |
| step3_outfit_with_loop | 带循环的穿搭推荐 |
| react | ReAct 推理模式 |
| react_pro | ReAct Pro 增强版 |
| cot | Chain-of-Thought 推理 |
| sc_cot | Self-Consistency CoT |
| reflexion | Reflexion 反思模式 |
| general_dnc | Divide-and-Conquer 通用模式 |
| general_got | Graph-of-Thought |
| PoT | Program-of-Thought |
| rap | RAP (Reasoning via Planning) |
| video_understanding | 视频理解 Agent |
| image_chat | 图像对话 |

### 智能体算子 (Agent Operators) 性能对比

| 算法 | LLM | 平均分 | gsm8k-score | gsm8k-cost($) | AQuA-score | AQuA-cost($) |
|------|-----|--------|-------------|---------------|------------|--------------|
| SC-CoT | gpt-3.5-turbo | 73.69 | 80.06 | 5.02 | 67.32 | 0.65 |
| CoT | gpt-3.5-turbo | 69.86 | 78.70 | 0.68 | 61.02 | 0.10 |
| ReAct-Pro | gpt-3.5-turbo | 69.74 | 74.91 | 3.46 | 64.57 | 0.49 |
| PoT | gpt-3.5-turbo | 64.42 | 76.88 | 0.69 | 51.97 | 0.16 |
| IO (基线) | gpt-3.5-turbo | 38.40 | 37.83 | 0.33 | 38.98 | 0.04 |

## 相关论文

- OmAgent: A Multi-modal Agent Framework for Complex Video Understanding with Task Divide-and-Conquer (arXiv:2406.16620, 2024)

## 相关项目

- [open-agent-leaderboard](https://github.com/om-ai-lab/open-agent-leaderboard) — 开放智能体排行榜
- [Hugging Face Space](https://huggingface.co/spaces/omlab/open-agent-leaderboard)
- [OVDEval](https://github.com/om-ai-lab/OVDEval/tree/main) — 开放词汇检测评估
- [OmDet](https://github.com/om-ai-lab/OmDet) — 大规模视觉语言多数据集预训练

## 安装

```bash
pip install omagent-core
# 或从源码安装
pip install -e omagent-core
```
