---
title: WebGPT
created: 2026-04-15
updated: 2026-04-15
type: entity
tags: [ai, llm, tool, frontend, learning]
sources: [raw/articles/ai-game-devtools/webgpt.md]
---

# WebGPT

在浏览器中通过 WebGPU 运行 GPT 模型的开源实现，纯 HTML+JS，无需后端服务器。

## Overview

WebGPT 是 0hq 开发的一个纯前端 LLM 推理项目，目的是验证和演示 WebGPU 在浏览器端运行 transformer 的可行性。项目配套提供了 Shakespeare 字符级模型和 GPT-2 系列模型（117M~1.5B），通过 Git LFS 下载权重后可直接在 Chrome Canary 中打开 HTML 文件运行。

核心亮点：**零构建步骤**、**全浏览器端推理**、**自定义 WGSL 计算着色器**。

## Performance

2020 M1 Mac f32 精度测试结果：

| 参数规模 | 速度 |
|----------|------|
| 5M       | 3ms/token |
| 117M (GPT-2) | 30ms/token |
| 377M (GPT-2 medium) | 70ms/token |
| 775M (GPT-2 large) | 120ms/token |
| 1.5B (GPT-2 XL) | ~1000ms/token（不稳定） |

## Architecture

**核心模块：**

- `model.js` — GPT class，`generate()` 异步生成器，支持 KV-Cache、top-k 采样、temperature 调节
- `instructions.js` — WGSL 计算着色器代码（矩阵乘、Attention、LayerNorm、GeLU、Softmax 等算子）
- `globals.js` — 8 个算子类的注册与生命周期管理（FastMatMul / Attention / Residual / LayerNorm / GeLU / Softmax 等）
- `tokenizer.js` — BPE 分词器（GPT-2）和字符级分词器两种实现
- `index.html` — 单文件 UI，通过 `<script>` 标签直接加载各模块

**已完成的优化：**
- KV-Cache 加速自回归生成
- 缓冲区复用减少 GPU 内存分配开销
- 矩阵乘法使用 shared memory
- 大模型采用 compute pass splitting 规避 `maxStorageBufferBindingSize` 限制

**Roadmap：** GPU 端 top-k/softmax selection、针对大模型的 attention kernel 优化、workgroup size 调优、打包为 npm 包。

## 与同类工具的差异

| 维度 | WebGPT | [[nanoGPT]] | [[autoresearch]] |
|------|--------|------------|-----------------|
| 运行环境 | 浏览器 WebGPU | Python/CUDA | Python/CUDA |
| 部署难度 | 极低（直接开 HTML） | 需要 CUDA 环境 | 需要实验基础设施 |
| 目标用户 | 学习和演示 | 研究 / 训练 | 自动化研究 |
| 模型规模 | ≤1.5B（浏览器限制） | 任意规模 | 任意规模 |

WebGPT 侧重**前端教育**和**浏览器端推理**；nanoGPT 侧重**训练和实验**；autoresearch 则面向**自动化 LLM 研究流程**。

## 许可证

MIT

## 相关链接

- GitHub: https://github.com/0hq/WebGPT
- Demo: https://www.kmeans.org
