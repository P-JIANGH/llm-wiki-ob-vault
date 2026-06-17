---
title: llama.cpp
created: 2026-04-27
updated: 2026-04-27
type: entity
tags: [ai, llm, inference, open-source]
sources: []
---

# llama.cpp

[[llm-inference]] | [[quantization]]

## Overview

 llama.cpp is a C/C++ implementation for running LLM inference with quantization support, originally focused on the LLaMA model. It enables running large models on CPU and Apple Silicon with optimized quantization (GGUF format).

## Key Features

- **Pure C/C++**: No Python dependencies for inference
- **GGUF quantization**: K-quants, Q4_0, Q5_K_S, Q8_0 and many more
- **Apple Silicon support**: ARM NEON and Metal GPU acceleration
- ** Vulkan / CUDA / OpenCL backends**: Cross-vendor GPU offload
- **prompt_lookup**: Fast prompt processing mode

## Relationship to Other Projects

- [[vLLM]] competes in the GPU-serving space; llama.cpp targets CPU/edge
- [[mlc-llm]] uses TVM-based compilation as an alternative approach
- [[llama-agentic-system]] builds on top of llama.cpp for agent workloads

## References

- GitHub: https://github.com/ggerganov/llama.cpp
