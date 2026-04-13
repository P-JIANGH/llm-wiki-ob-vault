# ChatRWKV — AI Game DevTools Source

## 项目信息
- **名称**: ChatRWKV
- **GitHub**: https://github.com/BlinkDL/ChatRWKV
- **类型**: LLM 推理框架 / Chat UI
- **分支**: main (RWKV-LM 主仓库: https://github.com/BlinkDL/RWKV-LM)

## 概述

ChatRWKV 是 RWKV 语言模型的 ChatGPT 风格对话界面。RWKV 是目前**唯一**能在质量和扩展性上匹配 Transformer、同时拥有更高速度和更少显存占用的 100% RNN 架构。

最新版本：**RWKV-7**（2025 年论文 arxiv:2503.14456）。

## 核心架构

### RWKV 模型架构（100% RNN）
RWKV = **R**ecurrent **W**eighted **K**ey **V**alue

关键创新：
- **Time Mixing**: 使用 `time_first + k` 和 `time_decay` 实现类似 attention 的效果，但以 RNN 方式计算
- **Channel Mixing**: square ReLU activation（来自 Primer 论文）
- **Stateful Inference**: RNN 保持 state，支持无限上下文长度推理
- 支持 BF16/FP16/FP32 精度

### 核心文件
- `RWKV_in_150_lines.py` — RWKV 模型、推理、文本生成的最小实现（150 行）
- `src/model_run.py` — 生产级推理引擎，支持 JIT compilation 和 CUDA kernel
- `v2/` — v2 版本，支持 "stream" 和 "split" strategies，INT8，3GB VRAM 即可运行 14B 模型
- `RWKV_v5_demo.py` — v5 版本 250 行完整 demo（含 tokenizer）
- `rwkv_pip_package/` — PyPI 发布包（pip install rwkv）

## 推理策略

| Strategy | 描述 | VRAM |
|---|---|---|
| `cuda fp16` | CUDA BF16，GPU 加速 | ~14B 需要 12GB |
| `cpu fp32` | 纯 CPU | 需要大量 RAM |
| `cuda:0 fp16 -> cpu fp32` | GPU + RAM 混合 | 节省 VRAM |
| INT8 | INT8 量化 | 14B 仅需 ~7GB |
| stream + split | v2 分片策略 | 3GB VRAM 跑 14B |

## 社区推理实现

- **rwkv.cpp** (saharNooby) — int4/int8/fp16/fp32 CPU/cuBLAS/CLBlast 推理
- **ai00_rwkv_server** — Vulkan 推理 API（支持 NVIDIA/AMD/Intel）
- **RWKV-PEFT** — LoRA/Pissa/QLora/Qpissa/State Tuning
- **RWKV-infctx-trainer** — 无限上下文训练器

## 许可证
项目本身未明确声明许可证（需进一步确认）

## 相关链接
- Homepage: https://www.rwkv.com
- Discord: https://discord.gg/bDSBUMeFpc (7k+ 成员)
- HuggingFace: https://huggingface.co/BlinkDL (cutting-edge weights)
- RWKV APP: https://github.com/RWKV-APP/RWKV_APP (Android/iOS 本地推理)
- Gradio Demo: https://huggingface.co/spaces/BlinkDL/RWKV-Gradio-1

## 用于游戏开发
RWKV 的 RNN 特性（状态持久化、高效显存）适合游戏 NPC AI 对话场景，支持：
- 本地部署，无 API 依赖
- 长上下文记忆
- 多模态扩展（World 模型支持游戏世界观）
