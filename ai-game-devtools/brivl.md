---
title: BriVL
created: 2026-04-17
updated: 2026-04-17
type: entity
tags: [ai-model, multimodal, vision-language, chinese-llm, open-source, tool]
sources: [raw/articles/ai-game-devtools/brivl.md]
---

# BriVL

**Bri**dging **V**ision and **L**anguage Model — 首个中文通用图文多模态大规模预训练模型。

由北京智源人工智能研究院（BAAI）WuDao 团队开发，基于 WenLan 项目。

## 概述

BriVL 是 10 亿（1B）参数的中文视觉-语言对比学习模型，将图像和文本映射到同一特征空间。在图文检索任务上超越了同期的 UNITER、CLIP 等多模态预训练模型。

## 技术架构

### 双编码器设计

| 组件 | 配置 |
|------|------|
| 图像编码器 | EfficientNet-B5 (timm)，2048-dim 特征，4 层 Transformer |
| 文本编码器 | Chinese RoBERTa-wwm-ext (HFL)，768-dim，4 层 Transformer |
| 图像分辨率 | 380×380 |
| ROI 池化 | Affine grid + grid_sample，4×4 网格 |

### MoCo 对比学习

- 采用动量对比（MoCo）架构，维护 9600 大小的图文队列
- 双向交叉熵损失（image→text + text→image）
- 多标签掩码机制（top-K 相似度样本作为正样本）
- DDP 分布式训练支持 BatchShuffle

### 独立部署优势

图像编码器和文本编码器可**分别独立运行**，无需同时加载两个模态，适合生产环境的图文检索场景。

## 应用场景

- **图文检索**：以文搜图 / 以图搜文
- **图像标注**：自动生成中文图像描述
- **零样本分类**：无需微调即可进行图像分类
- **下游任务特征**：作为多模态任务的输入特征

## 论文

[WenLan: Bridging Vision and Language by Large-Scale Multi-Modal Pre-Training](https://arxiv.org/abs/2103.06561) — arXiv 2103.06561, 2021

## 与同类工具对比

- 相比 [[ai-game-devtools/imagebind]]：BriVL 专注中文图文检索（双模态），ImageBind 覆盖 6 种模态但非中文优化
- 相比 [[ai-game-devtools/qwen-vl]]：BriVL 为纯对比学习检索模型，Qwen-VL 为端到端生成式 VLM
- 相比 [[ai-game-devtools/minigpt-4]]：BriVL 为检索/特征提取专用，MiniGPT-4 为视觉问答+生成
- 相比 [[ai-game-devtools/sharegpt4v]]：BriVL 面向中文场景，ShareGPT4V 面向英文通用场景

## 相关链接

- GitHub: https://github.com/BAAI-WuDao/BriVL
- 模型下载: https://wudaoai.cn/model/detail/BriVL
- 论文: https://arxiv.org/abs/2103.06561
- BBox 提取工具: https://github.com/chuhaojin/BriVL-BUA-applications

## 许可证

未在 README 中明确声明（遵循 wudaoai.cn 平台许可协议）
