# dots.vlm1

> dots model 家族第一个视觉-语言模型，来自 rednote-hilab (小红书)。

## 基本信息

- **GitHub:** https://github.com/rednote-hilab/dots.vlm1
- **HuggingFace:** https://huggingface.co/rednote-hilab/dots.vlm1.inst
- **Live Demo:** https://huggingface.co/spaces/rednote-hilab/dots-vlm1-demo
- **License:** (查看仓库 NOTICE 文件)

## 项目概述

dots.vlm1 是 dots 模型家族的第一个视觉-语言模型（VLM），基于 12 亿参数的视觉编码器（NaViT）和 DeepSeek V3 大语言模型（LLM）构建。

## 核心技术亮点

### NaViT 视觉编码器
- **从零训练**：并非对已有视觉 backbone 做微调，而是全新从头训练
- **原生动态分辨率支持**：NaViT 架构直接支持任意分辨率输入
- **纯视觉监督**：除了传统文本监督外，还引入了纯视觉监督信号，提升感知能力上限
- **结构化图像预训练数据**：在图像描述数据集之外，引入了大量结构化图像数据（表格、图表、文档、图形等），尤其提升了 OCR 任务能力

### 多模态训练数据策略
- **合成数据**：覆盖多种图像类型（表格、图表、文档、图形等）和多种描述类型（alt text、密集描述、定位标注等）
- **网页数据重写**：使用强大的多模态模型对图文交错的网页数据进行重写，显著提升训练语料质量

## 性能表现

在多项视觉感知与推理基准测试中达到接近 SOTA：

| 类别 | 基准 | Qwen2.5VL-72B | Gemini2.5 Pro | Seed-VL1.5 thinking | dots.vlm1 |
|------|------|---------------|---------------|---------------------|-----------|
| STEM/推理 | MMMU | 69.3 | **84.22** | 79.89 | **80.11** |
| STEM/推理 | MathVista | 74.6 | 83.5 | **86.1** | **85.0** |
| OCR/文档 | charxiv(dq) | 88.2 | 90.3 | 89.6 | **92.1** |
| OCR/文档 | DOCVQA | 96.23 | 95.42 | 93.65 | **96.52** |
| OCR/文档 | ChartQA | 86.1 | 86.16 | 86.88 | **87.68** |
| 通用视觉 | RealWorldQA | 75.9 | 78.43 | 78.69 | **79.08** |
| 通用视觉 | HallusionBench | 56.5 | 63.07 | 63.49 | **64.83** |
| 多图像 | mantis | 79.26 | 84.33 | 82.3 | **86.18** |

在纯文本任务上同样保持竞争力（LiveCodeBench 72.94，AIME 2025 85.83）。

## 部署方式

### 环境选项

**选项1：基础镜像 + 手动安装**
```bash
docker run -it --gpus all lmsysorg/sglang:v0.4.9.post1-cu126
git clone --branch dots.vlm1.v1 https://github.com/rednote-hilab/sglang sglang
pip install -e sglang/python
```

**选项2：预构建镜像（推荐）**
```bash
docker run -it --gpus all rednotehilab/dots.vlm1_sglang:v0.4.9.post1-cu126
```

### 单节点推理
```bash
python3 -m sglang.launch_server \
    --model-path rednote-hilab/dots.vlm1.inst \
    --tp 16 \
    --trust-remote-code \
    --host 0.0.0.0 \
    --port 15553 \
    --context-length 65536 \
    --chat-template dots-vlm \
    --quantization fp8
```

### 多节点部署
支持跨多台机器的分布式部署，通过 `--dist-init-addr`、`--nnodes`、`--node-rank` 等参数配置。

### API 调用
```bash
curl -X POST http://$MASTER_IP:$API_PORT/v1/chat/completions \
    -H "Content-Type: application/json" \
    -d '{
        "model": "model",
        "messages": [{"role": "user", "content": [
            {"type": "text", "text": "Please briefly describe this image"},
            {"type": "image_url", "image_url": {"url": "https://..."}}
        ]}],
        "temperature": 0.1,
        "max_tokens": 55000
    }'
```

## 技术栈

- **LLM 基座：** DeepSeek V3
- **视觉编码器：** NaViT（12 亿参数，从零训练）
- **推理后端：** SGLang（需使用 rednote-hilab 定制分支）
- **量化：** FP8
- **上下文长度：** 65536 tokens

## 应用场景

- 图像理解与描述
- 文档/表格/图表 OCR 与理解
- 多图像推理
- 视觉问答
- STEM 题目求解
- 游戏场景中的视觉资产理解

## 相关模型

- DeepSeek V3（LLM 基座）
- SGLang（推理框架）
- 视觉-语言模型系列：CogVLM2、Cambrian-1、MiniGPT-4 等

## 案例展示

详见 `assets/blog.md`，包含：
- 图表数据提取推理案例
- 中国景区门票计算案例
- 营养成分蛋白质对比案例
- 数学几何证明题案例
- 名画/地标识别案例
- Rebus 谜题/emoji 推理案例
