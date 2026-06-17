# GPT4All

> Source: https://github.com/nomic-ai/gpt4all

## 基本信息

- **GitHub**: https://github.com/nomic-ai/gpt4all
- **维护方**: Nomic, Inc.
- **许可证**: MIT
- **官方文档**: https://docs.gpt4all.io
- **Discord**: https://discord.gg/mGZE39AS3e

## 项目概述

GPT4All 是一个让大型语言模型（LLM）在普通台式机和笔记本电脑上本地私密运行的平台。无需 API 调用或 GPU，用户下载应用后即可开始使用。

## 架构组成

### 子目录结构

```
gpt4all/
├── gpt4all-backend/     # C/C++ 模型推理后端（llama.cpp 封装）
├── gpt4all-bindings/     # Python / TypeScript 语言绑定
├── gpt4all-chat/         # Qt/QML 桌面聊天客户端
├── gpt4all-training/     # 模型训练相关
├── common/               # 共享代码
├── README.md
├── LICENSE.txt
├── roadmap.md
└── MAINTAINERS.md
```

### gpt4all-backend

C/C++ 推理后端，围绕 `llama.cpp` 实现构建，是 GPT4All 生态的通用模型推理库。原生 Chat 应用直接使用此库进行推理。

**支持的模型架构**（旧版，旧版文档）：
1. GPTJ — 基于 GPT-J 架构（如 EleutherAI/gpt-j-6b）
2. LLAMA — 基于 LLaMA 架构（非商用许可）
3. MPT — 基于 MosaicML MPT 架构（允许商用）

**推理方式**：通过 ggml/llama.cpp 库实现 CPU 推理，支持 NVIDIA GPU（Vulkan）和 AMD GPU 加速。

### gpt4all-bindings

**Python 绑定**：围绕 `llmodel` C-API 的 Python 封装，发布在 PyPI（`pip install gpt4all`）。

```python
from gpt4all import GPT4All
model = GPT4All("Meta-Llama-3-8B-Instruct.Q4_0.gguf")  # 下载/加载 4.66GB LLM
with model.chat_session():
    print(model.generate("How can I run LLMs efficiently on my laptop?", max_tokens=1024))
```

GPU 用法：`device='gpu'`（amd/intel/nvidia）

依赖 Vulkan SDK（AMD/Intel）和 CUDA Toolkit（NVIDIA）实现 GPU 推理。

**TypeScript 绑定**：`gpt4all-bindings/typescript/`

### gpt4all-chat

Qt/QML 桌面聊天客户端，支持 Windows/macOS/Linux。用户可通过图形界面本地运行 LLM 模型。

### 模型获取

模型通过 GPT4All 官方 `gpt4all.io` 网站下载，集成 HuggingFace 模型发现功能。

## 主要特性

- **本地私密运行**：无需云端 API，数据不离开本地设备
- **跨平台**：Windows/macOS/Ubuntu (Linux)，支持 Apple Silicon M 系列优化
- **GGUF 格式支持**：支持 Mistral 7b、Rift Coder 等多种量化模型
- **Vulkan GPU 加速**：支持 NVIDIA 和 AMD GPU 推理（Q4_0/Q4_1 量化）
- **本地文档问答（LocalDocs）**：基于 RAG 架构，私有化本地数据问答
- **OpenAI 兼容 API**：Docker 部署模式提供兼容 HTTP API 端点
- **多语言支持**：UI 已支持葡萄牙语本地化（中文/德语/法语进行中）

## 发布历史

- **2024-07-02 V3.0.0**：全新聊天 UI 设计，改进 LocalDocs 工作流，支持更多模型架构
- **2023-10-19**：GGUF 支持发布，Mistral 7b 模型，Nomic Vulkan GPU 加速
- **2023-09-18**：Nomic Vulkan 发布，支持本地 NVIDIA/AMD GPU 推理
- **2023-07**：LocalDocs 稳定版发布
- **2023-06-28**：Docker API 服务器发布，OpenAI 兼容 HTTP 端点

## 系统要求

- Windows：Intel Core i3 2nd Gen / AMD Bulldozer 或更好；ARM 版支持 Qualcomm Snapdragon / Microsoft SQ1/SQ2
- macOS：Monterey 12.6+，Apple Silicon M 系列效果最佳
- Linux：x86-64，Ubuntu

## 技术栈

- **推理引擎**：llama.cpp（ggml 库）
- **Python 绑定**：pybind11 / C-API
- **桌面客户端**：Qt / QML
- **GPU 加速**：Vulkan（跨平台）、CUDA（NVIDIA）
- **后端语言**：C/C++

## 与同类工具比较

GPT4All vs [[ai-game-devtools/llama-cpp]]：GPT4All 是完整应用平台（含 UI/API/模型管理），llama.cpp 仅是底层推理引擎。

GPT4All vs [[ai-game-devtools/ollama]]：两者都简化本地 LLM 运行，GPT4All 侧重桌面 GUI 和本地文档 RAG，Ollama 侧重 CLI 和 Docker 集成。

## 相关链接

- https://gpt4all.io/installers/ — 各平台安装包下载
- https://docs.gpt4all.io — 官方文档
- LangChain 集成：https://python.langchain.com/v0.2/docs/integrations/providers/gpt4all/
