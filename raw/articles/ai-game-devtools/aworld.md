# AWorld — AI游戏开发工具原始源

> 来源：https://github.com/inclusionAI/AWorld
> 克隆时间：2026-04-15
> LICENSE: MIT

## 项目概述

**AWorld** 是一个多智能体框架（Multi-Agent Framework）和 Agent Harness（驾驭层），用于编排 AI Agent、工具、记忆、上下文和执行。其核心定位是"Agent Harness"层——与 LangChain/LangGraph（框架层）不同，Harness 层预配置了 Agent 编排、工具集成、记忆/上下文、执行控制和 Skills 系统，用户只需配置 API Key 和工具即可运行。

**AWorld 论文引用：**
```bibtex
@misc{yu2025aworldorchestratingtrainingrecipe,
  title={AWorld: Orchestrating the Training Recipe for Agentic AI},
  author={Chengyue Yu, Siyuan Lu, Chenyi Zhuang, Dong Wang, Qintong Wu, ...},
  year={2025}, eprint={2508.20404}, archivePrefix={arXiv}, primaryClass={cs.AI}
}
```

## 核心架构

### Agent Harness 分层定位
```
Raw Code → Agent Frameworks → Agent Harness ← AWorld 所在层
(基础库)    (运行时/框架层)     (驾驭层)
```

- **Agent Framework**（LangChain/LangGraph）：需要用户自己选择记忆系统、工具、编排逻辑
- **Agent Harness**（AWorld/DeepAgent）：开箱即用，预配置一切

### Swarm 拓扑结构
- **Workflow**：确定性顺序/并行执行
- **Handoff**：AI 驱动的动态 Agent 委派
- **Team**：Leader-Follower 模式（根节点协调执行器）
- **Hybrid**：嵌套拓扑

### 内置子 Agent（TeamSwarm 架构）
| Agent | 角色 | 核心功能 |
|-------|------|---------|
| 👑 AWorld Agent | 编排器 | 解析用户目标、创建计划、委派任务 |
| 🧑‍💻 Developer | 开发者 | 编写、调试、重构代码（CAST 工具） |
| 🧐 Evaluator | 评估器 | 质量评估、改进建议（Skill 驱动） |
| 🎬 Video Diffusion | 视频生成 | 扩散模型生成视频 |
| 🎤 Audio Generator | 语音生成 | TTS 模型文字转语音 |
| 🖼️ Image Generator | 图像生成 | 文生图/图生图 |

## 核心创新

### CAST（Code Abstract Syntax Tree）
解决 Agent 代码复杂度问题：
- **Hierarchical Navigation**：理解代码结构和目的
- **Nearly Infinite Context**：智能压缩，只给 Agent 相关信息
- **Surgical Code Modification**：精确修改，完整依赖感知

### Benchmark-Driven Development (BDD)
每个架构改进必须通过真实 Benchmark 验证：
- **GAIA**：`Pass@1: 67.89%`, `Pass@3: 83.49%`（109 tasks）
- **XBench**：`Pass@1: 51%`, `Pass@3: 61%`
- **SWE-bench**：软件工程任务（开发中）

### Self-Evolution Loop
```
Build (Developer) → Evaluate (Evaluator) → Evolve (refine) → ...
```
目标：UI 质量分数 > 0.9 时停止循环。

## Benchmark 成绩

| 类别 | 成绩 | 性能 | 日期 |
|------|------|------|------|
| 🤖 GAIA Benchmark | Leaderboard | Pass@1: 67.89%, Pass@3: 83.49% | 2025/08/06 |
| 🧠 IMO 2025 | 5/6 problems solved | 6小时内 | 2025/07/25 |
| 🖼️ OSWorld | Rank 1st | 58.0% Success Rate | 2025/09/18 |
| 🖼️ VisualWebArena | September Rank 1st | 36.5% Success Rate | 2025/09/25 |
| 🔍 Xbench | Excellence | Pass@1: 51% | 2025/10/23 |

## 目录结构

```
aworld/                    # 框架 + 运行时
├── core/                  # Agent, tool, context, memory 抽象层
│   ├── agent/            # 基础 Agent，多智能体编排（MAS 核心）
│   ├── tool/             # 工具抽象和工厂
│   ├── context/          # 上下文管理
│   └── memory.py         # 记忆系统
├── agents/               # 预构建 Agent
├── tools/                # 内置工具
├── sandbox/              # 工具执行抽象层
├── checkpoint/           # 状态快照管理（实验性）
└── evaluations/reflect/ # 反思系统（实验性）

aworld-cli/               # CLI 执行层
├── src/aworld_cli/
│   ├── main.py          # 入口
│   ├── console.py       # 交互终端
│   ├── core/            # 命令系统、Agent 注册表
│   └── commands/        # 内置斜杠命令
└── inner_plugins/smllc/ # 内置 AWorld Agent

aworld-skills/            # Skills Hub（动态加载）
examples/                 # GAIA, XBench, 快速入门
```

## 安装

```bash
git clone https://github.com/inclusionAI/AWorld && cd AWorld
conda create -n aworld_env python=3.11 -y && conda activate aworld_env
pip install -e . && cd aworld-cli && pip install -e .
aworld-cli --config
```

## 环境配置

```bash
LLM_MODEL_NAME="claude-sonnet-4"   # 推荐 Claude-Sonnet-4 或更高
LLM_PROVIDER="openai"             # 或 "anthropic"
LLM_API_KEY="your_api_key"
LLM_BASE_URL="your_base_url"
```

## 发布论文

1. **AWorld: Orchestrating the Training Recipe for Agentic AI** — arXiv 2025, [code](https://github.com/inclusionAI/AWorld/tree/main/train), [model](https://huggingface.co/inclusionAI/Qwen3-32B-AWorld)
2. **FunReason: Enhancing LLMs' Function Calling via Self-Refinement** — arXiv 2025
3. **Exploring Superior Function Calls via Reinforcement Learning** — arXiv 2025
4. **Profile-Aware Maneuvering for GAIA** — arXiv 2025
5. **Recon-Act: Multi-Agent Browser-Use System** — arXiv 2025
6. **From Failure to Mastery: Generating Hard Samples for Tool-use Agents** — arXiv 2026
