# AI-Writer (原始源)

> 来源：https://github.com/BlinkDL/AI-Writer
> 克隆时间：2026-04-15
> 状态：**过时** — 作者推荐使用 RWKV-Runner

## 基本信息

- **作者**：BlinkDL
- **许可证**：Apache 2.0
- **GitHub**：https://github.com/BlinkDL/AI-Writer
- **最新替代项目**：RWKV-Runner (https://github.com/josStorer/RWKV-Runner)
- **在线体验**：https://modelscope.cn/studios/BlinkDL/RWKV-CHN/summary

## 功能描述

AI写小说工具，基于 RWKV 模型进行文字续写。训练数据全部来自中文网文。提供 CLI 交互模式 (`run.py`) 和 Web 服务模式 (`server.py` + `web-client/index.html`)。

**注意：README 明确标注所有模型均为过时信息，最新模型见 RWKV-Runner。**

## 架构与模块

### 核心模型配置
```
ctx_len = 512    # 上下文窗口长度
n_layer = 12      # Transformer 层数
n_head = 12       # 注意力头数
n_embd = 768      # 嵌入维度 (= n_head * 64)
n_attn = 768      # 注意力维度
n_ffn = 768       # 前馈网络维度
```

### 核心文件
- `src/model.py` — GPT/RWKV 模型定义，包含 `RWKV_TimeMix` 自定义注意力层
- `src/utils.py` — 工具函数（采样策略等）
- `run.py` — CLI 交互界面，逐字续写输出
- `server.py` — WebSocket 服务器，支持多用户并发

### RWKV_TimeMix 注意力机制
`src/model.py` 实现了自定义的 `RWKV_TimeMix` 层：
- 使用 `time_w/time_alpha/time_beta` 时间衰减参数
- 预计算 `time_ww` 缓存矩阵以提升推理速度
- 对 key 值进行 clamp 和 exp 操作：`k = torch.clamp(k, max=30, min=-60); k = torch.exp(k)`
- 使用 cumsum 实现高效的 KV 缓存

### 推理采样策略
- `top_p = 0.75`（普通文本）
- `top_p_newline = 0.9`（换行后，更多变化）
- 通过 `src.utils.sample_logits` 实现 nucleus sampling

### 词表
- 使用 JSON 词表（`model/wangwen-2022-02-15.json`，UTF-16 编码）
- vocab_size ≈ 8849（覆盖网文中各类字符）

## 运行模式

| 模式 | 硬件 | 需求 |
|------|------|------|
| `gpu` | NVIDIA GPU + CUDA + cuDNN | PyTorch CUDA 版本，显存 ≥ 2GB（当时） |
| `dml` | AMD/Intel/NVIDIA GPU | onnxruntime-directml，专用 ONNX 模型 |
| `cpu` | CPU only | PyTorch CPU 版本，速度最慢 |

## 依赖

```
torch >= 1.9
numpy
websockets (server.py)
onnxruntime-directml (dml 模式)
```

## 与同类工具的差异

1. **RWKV 架构**：不同于标准 GPT，使用 RWKV（Receptance Weighted Key Value）时间混合注意力，推理更高效
2. **网文专精**：训练数据为中文网文（玄幻、言情），非通用语料
3. **轻量化**：原始模型仅 12 层 768 维，适合消费级 GPU

## 相关链接

- RWKV-LM 训练代码：https://github.com/BlinkDL/RWKV-LM
- RWKV-Runner（最新替代）：https://github.com/josStorer/RWKV-Runner
- PaddlePaddle 移植版：https://github.com/JunnYu/Paddle-AI-Writer
