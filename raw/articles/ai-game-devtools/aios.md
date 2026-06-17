# AIOS: AI Agent Operating System

## 项目信息

- **GitHub**: https://github.com/agiresearch/AIOS
- **论文**: [AIOS: LLM Agent Operating System (COLM 2025)](https://arxiv.org/abs/2403.16971)
- **文档**: https://docs.aios.foundation/
- **Discord**: https://discord.gg/B2HFxEgTJX

## 核心定位

AIOS = AI Agent Operating System，将大语言模型嵌入操作系统内核，为 LLM-based AI Agent 的开发和部署提供基础设施层面的支持。解决 agent 开发中的调度、上下文切换、内存管理、存储管理、工具管理、Agent SDK 管理等问题。

AIOS 由两个核心组件构成：
- **AIOS Kernel**（本仓库）：操作系统的抽象层，管理 LLM、Memory、Storage、Tool 等资源
- **AIOS SDK (Cerebrum)**：https://github.com/agiresearch/Cerebrum，面向 agent 用户和开发者的 SDK

## 架构

### 核心模块（aios/）

```
aios/
├── llm_core/       # LLM 适配层，支持 OpenAI/DeepSeek/Gemini/Groq/HuggingFace/Ollama/vLLM
│   ├── adapter.py  # LLM 统一适配器
│   ├── local.py    # 本地模型支持
│   └── routing.py  # 路由逻辑
├── memory/         # Agent 记忆管理
│   ├── manager.py  # 记忆管理器
│   ├── note.py     # 笔记式记忆
│   └── retrievers.py # 检索器
├── storage/        # 持久化存储
├── tool/           # 工具管理
│   ├── manager.py  # 工具管理器
│   ├── mcp_server.py # MCP 服务器集成
│   └── virtual_env/ # 虚拟环境支持
├── scheduler/      # 任务调度器（多线程）
│   ├── fifo_scheduler.py
│   └── rr_scheduler.py  # Round-Robin
├── context/        # 上下文管理
├── syscall/       # 系统调用抽象
├── hooks/         # 钩子类型定义
└── config/        # 配置管理
```

### 调度器设计

BaseScheduler 是抽象基类，子类需实现：
- `process_llm_requests()` — 处理 LLM 请求
- `process_memory_requests()` — 处理记忆请求
- `process_storage_requests()` — 处理存储请求
- `process_tool_requests()` — 处理工具请求

调度器使用多线程处理不同类型的请求队列。

### 部署模式

| 模式 | 说明 |
|------|------|
| Mode 1 (Local Kernel) | AIOS kernel 和 agents 运行在同一机器 |
| Mode 2 (Remote Kernel) | 远程使用 agent，支持资源受限设备（手机/边缘设备） |
| Mode 2.5 (Remote Kernel Dev) | 远程开发 agent，在机器 B 开发，在机器 A 运行测试 |
| Mode 3 (Personal Remote Kernel) | 每个用户有持久化的个人 AIOS，支持跨设备同步 |
| Mode 4 (Personal Remote Virtual Kernel) | 虚拟化，同一物理机运行多个用户 AIOS 实例 |

## 支持的 LLM Provider

| Provider | 支撑模型 | 开放 | Backend |
|----------|---------|------|---------|
| Anthropic | All | ❌ | anthropic |
| OpenAI | All | ✅ | openai |
| Deepseek | All | ✅ | deepseek |
| Google | All | ❌ | gemini |
| Groq | All | ✅ | groq |
| HuggingFace | All | ✅ | huggingface |
| Ollama | All | ✅ | ollama |
| vLLM | All | ✅ | vllm |
| Novita | All | ✅ | novita |

## 支持的 Agent 框架

- OpenAGI
- AutoGen
- Open-Interpreter
- MetaGPT

## 关键特性

- 支持 function calling（原生 HuggingFace、vLLM、Ollama）
- 支持扩散模型作为工具（HuggingFace）
- Terminal UI：基于 LLM 的语义文件系统
- Computer-use Agent：通过 MCP Server + VM Controller 在沙箱中安全操作计算机
- A-MEM：Agentic Memory 记忆模块
- 实验性 Rust 重写（aios-rs/）

## 依赖

- Python 3.10 - 3.11
- GPU: requirements-cuda.txt
- CPU: requirements.txt

## 安装

```bash
# 安装 AIOS Kernel
git clone https://github.com/agiresearch/AIOS.git
cd AIOS && pip install -r requirements-cuda.txt  # GPU
# 或 pip install -r requirements.txt  # CPU

# 安装 AIOS SDK (Cerebrum)
git clone https://github.com/agiresearch/Cerebrum.git
cd Cerebrum && pip install -e .

# 启动
bash runtime/launch_kernel.sh
# 或
python -m uvicorn runtime.launch:app --host 0.0.0.0 --port 8000
```

## 相关论文

```
@article{mei2025aios,
  title={AIOS: LLM Agent Operating System},
  journal={In Proceedings of COLM 2025},
  year={2025}
}
@article{mei2025litecua,
  title={LiteCUA: Computer as MCP Server for Computer-Use Agent on AIOS},
  journal={arXiv:2505.18829},
  year={2025}
}
@article{xu2025mem,
  title={A-MEM: Agentic Memory for LLM Agents},
  journal={arXiv:2502.12110},
  year={2025}
}
```

## 与同类工具的差异

AIOS 是**操作系统级别的 Agent 基础设施**，而非单纯的 Agent 框架。相比 LangChain/AutoGen 等应用层框架，AIOS 专注于：
1. 资源抽象（LLM/Memory/Storage/Tool 的统一管理）
2. 多 Agent 调度（多线程调度器）
3. 持久化与跨会话状态
4. Remote Kernel 模式（支持边缘设备）

## 许可证

开源（License 文件在仓库根目录）
