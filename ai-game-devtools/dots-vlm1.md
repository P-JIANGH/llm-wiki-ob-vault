---
title: dots.vlm1
created: 2026-04-14
updated: 2026-04-14
type: entity
tags: [ai, llm, vlm, multimodal, open-source]
sources: [raw/articles/ai-game-devtools/dots-vlm1.md]
---

# dots.vlm1

**dots.vlm1** 是小红书（rednote-hilab）发布的首个视觉-语言模型，属于 dots 模型家族。基于 12 亿参数的 NaViT 视觉编码器和 DeepSeek V3 LLM 构建，在 OCR/文档理解、STEM 推理、多图像理解等多个基准上达到接近 SOTA水平。

## 核心架构

### NaViT 视觉编码器（从零训练）

dots.vlm1 的视觉编码器是最大亮点之一——并非对已有 ViT 做微调，而是**从零训练**了一个原生 NaViT（Native Vision Transformer）：

- **原生动态分辨率**：直接支持任意分辨率输入，不依赖切片或下采样
- **双重监督信号**：除传统文本监督外，还引入了**纯视觉监督**（visual-only supervision），扩展了感知能力上限
- **结构化图像预训练**：在标准图像描述数据之外，引入大量结构化图像数据（表格、图表、文档、图形），显著提升 OCR 能力

### 多模态训练数据

- **合成数据策略**：覆盖多种图像类型和描述类型（alt text、密集描述、定位标注等）
- **网页数据重写**：使用强大的多模态模型对图文交错网页进行重写，提升训练语料质量

## 性能亮点

| 基准 | 分数 | 说明 |
|------|------|------|
| MMMU | 80.11 | STEM 多学科推理，接近 Gemini2.5 Pro |
| MathVista | 85.0 | 数学视觉推理 |
| charxiv (dq) | 92.1 | 文档理解，**超越所有对比模型** |
| DOCVQA | 96.52 | 文档问答，**所有对比模型中最高** |
| ChartQA | 87.68 | 图表理解，**所有对比模型中最高** |
| RealWorldQA | 79.08 | 真实世界视觉问答，**所有对比模型中最高** |
| HallusionBench | 64.83 | 视觉幻觉推理，**所有对比模型中最高** |
| mantis | 86.18 | 多图像理解，**所有对比模型中最高** |

在纯文本任务上同样保持竞争力（LiveCodeBench 72.94，AIME 2025 85.83），说明模型在引入强大视觉能力的同时没有牺牲语言能力。

## 部署与推理

### 推理后端

使用 **SGLang** 作为推理框架（需使用 rednote-hilab 定制的 `dots.vlm1.v1` 分支，已提交 PR 到主仓库）。提供预构建 Docker 镜像。

### 关键配置参数

- **Tensor Parallelism (TP)**：`--tp 16`（16 路张量并行）
- **Context Length**：65536 tokens
- **量化**：FP8
- **多节点支持**：通过 `--dist-init-addr`、`--nnodes`、`--node-rank` 支持分布式部署
- **Chat Template**：自定义 `dots-vlm` 模板

### API 格式

提供 OpenAI 兼容 API，支持多模态输入（text + image_url）。

## 游戏开发中的潜在应用

- **游戏场景视觉理解**：NPC 行为分析、UI 截图解读、截图生成代码
- **游戏文档 OCR**：游戏内文本提取、日志分析、配置表读取
- **多图资产审核**：批量游戏资产质量检查
- **游戏内数学/逻辑推理**：强化学习环境状态评估

## 许可证

查看仓库 NOTICE 文件获取完整许可证信息。

## 相关链接

- [GitHub](https://github.com/rednote-hilab/dots.vlm1)
- [HuggingFace Model](https://huggingface.co/rednote-hilab/dots.vlm1.inst)
- [Live Demo](https://huggingface.co/spaces/rednote-hilab/dots-vlm1-demo)

## 相关模型

- [[cogvlm2]] — THUDM/ZhipuAI 第二代 VLM，TextVQA/DocVQA SOTA
- [[cambrian-1]] — NYU/Yann LeCun 开源 VLM，SVA 多 encoder 视觉聚合器
- [[minigpt-4]] — Vision-CAIR VLM，冻结 ViT + Q-Former + 轻量对齐训练
- [[internlm-xcomposer]] — 上海 AI Lab 多模态 LVLM 系列，达 GPT-4V 水平
