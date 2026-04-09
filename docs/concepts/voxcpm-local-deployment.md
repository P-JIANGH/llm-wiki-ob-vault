---
title: VoxCPM 本地部署配置
created: 2026-04-08
updated: 2026-04-08
type: concept
tags: [ai, ml, tool, pitfall]
sources: [raw/articles/voxcpm-openbmb-2025.md]
---

# VoxCPM 本地部署配置

VoxCPM 2 本地部署完整指南，基于[官方文档](https://voxcpm.readthedocs.io/zh-cn/latest/)。

## 环境要求

| 项目 | 要求 |
|------|------|
| Python | 3.10–3.12（3.10–3.11 测试最充分） |
| PyTorch | ≥ 2.5.0 |
| CUDA | ≥ 12.0（GPU 加速，可选） |
| 磁盘空间 | 数 GB |
| **GPU 显存** | **约 8–16GB**（FP16 推理，2B 模型） |
| 系统内存 | ≥ 16GB |

> CPU 推理可用（Apple Silicon MPS 也支持），但速度慢约 1–2 字/秒。

## 安装步骤

### 1. 创建 Python 环境

```bash
conda create -n voxcpm python=3.10
conda activate voxcpm
```

### 2. 安装 PyTorch（CUDA 12.1）

```bash
pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu121
```

### 3. 安装 VoxCPM

```bash
pip install voxcpm
```

### 4. 验证安装

```bash
python -c "from voxcpm import VoxCPM; print('VoxCPM is ready')"
```

### 5. Hugging Face 镜像配置（国内访问）

```bash
export HF_ENDPOINT=https://hf-mirror.com
```

首次运行会自动从 Hugging Face 下载模型权重。

## 快速运行

### 纯文本转语音

```python
from voxcpm import VoxCPM

model = VoxCPM(device="cuda")  # device="cpu" 用于 CPU 推理

model.generate(
    text="你好，欢迎使用 VoxCPM 语音合成系统。",
    output_path="demo.wav"
)
```

### 音色设计（无需参考音频）

```python
model.generate(
    text="（音色：温柔的女性，语速较慢，带着轻微的笑意）今天天气真不错呀！",
    output_path="voice_design.wav"
)
```

### 声音克隆（少量秒参考音频）

```python
model.generate(
    text="这是要合成的文本内容。",
    prompt_audio="reference.wav",
    output_path="cloned.wav"
)
```

### 声音克隆 + 风格控制

```python
model.generate(
    text="（活泼开朗，语速稍快）项目进展顺利！",
    prompt_audio="reference.wav",
    output_path="styled_clone.wav"
)
```

## Web Demo（网页界面）

```bash
git clone https://github.com/OpenBMB/VoxCPM
cd VoxCPM
pip install -e .
python app.py
```

首次使用会额外下载 ASR 模型（SenseVoice-Small）。

## 显存估算

| 精度 | 2B 模型显存 |
|------|------------|
| FP32 | ~8 GB |
| FP16 | ~4 GB（仅模型权重） |
| 推理含缓存 | **建议 8–16GB** |

## 硬件配置参考

| 场景 | 推荐配置 |
|------|---------|
| 入门测试 | RTX 3060 12GB / RTX 4060 Ti 16GB |
| 流畅使用 | RTX 4090 24GB |
| 追求极速 | RTX A6000 48GB / A100 40GB |

## 官方资源

- 文档: https://voxcpm.readthedocs.io/zh-cn/latest/
- GitHub: https://github.com/OpenBMB/VoxCPM
- HuggingFace: https://huggingface.co/openbmb/VoxCPM2
- ModelScope: https://modelscope.cn/models/OpenBMB/VoxCPM2

## 关联

- [VoxCPM](#/entities/voxcpm) — 实体页（VoxCPM 项目详情）
- [openbmb](#/entities/openbmb) — 开发组织
- [llm-integration](#/concepts/llm-integration) — LLM 集成相关
