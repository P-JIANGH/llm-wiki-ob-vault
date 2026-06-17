---
title: Apache TVM
created: 2026-04-27
updated: 2026-04-27
type: entity
tags: [ai, ml, compiler, inference, open-source]
sources: []
---

# Apache TVM

[[ml-inference-compilation]] | [[llm-inference]]

## Overview

Apache TVM is a compiler stack for machine learning that optimizes models for diverse hardware targets. It decouples model architecture from hardware-specific code generation.

## Key Features

- **Relay IR**: High-level intermediate representation for DNN models
- **Tensor operator inventory**: Pre-defined optimized kernels (TOPI)
- **AutoTVM / Ansor**: Cost model-based schedule search
- **MLC LLM integration**: TVM powers [[mlc-llm]] for on-device LLM deployment

## Relationship to Other Projects

- Foundation for [[mlc-llm]] which uses TVM's relaxation backend
- Competes with [[llama.cpp]] for on-device inference but takes a compilation approach

## References

- GitHub: https://github.com/apache/tvm
- Website: https://tvm.apache.org/
