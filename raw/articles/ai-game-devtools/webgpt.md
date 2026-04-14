# WebGPT — Source

> Extracted from: https://github.com/0hq/WebGPT
> Date: 2026-04-15

## Overview

WebGPT is a vanilla JS+HTML implementation of a GPT transformer model running entirely in the browser via WebGPU. Intended as a proof-of-concept and educational resource. Tested up to 775M parameters, 1.5B runs but is unstable.

## Performance (2020 M1 Mac, f32 precision)

| Parameters | ms/token |
|------------|----------|
| 5M         | 3        |
| 117M (GPT-2) | 30     |
| 377M (GPT-2 medium) | 70 |
| 775M (GPT-2 large) | 120 |
| 1.5B (GPT-2 XL) | ~1000 (unstable) |

## Architecture

- **Framework**: Pure WebGPU — no backend, no server
- **Files**: `index.html` (UI), `model.js` (GPT class, generation loop), `tokenizer.js` (BPE + char-level), `globals.js` (kernel op classes), `instructions.js` (WGSL shaders), `visuals.js` (attention viz)
- **Model support**: Shakespeare char-level model (toy), GPT-2 117M/377M/777M/1.5B
- **Tokenizer**: BPE (GPT-2) or character-level
- **GPU kernels**: Custom WGSL compute shaders — FastMatMul, Attention, Residual, LayerNorm, GeLU, Softmax
- **Optimizations done**: KV-caching, buffer reuse, kernel shared memory matmul, compute pass splitting
- **Roadmap**: GPU selection ops (topk/softmax), better attention kernel for large models

## Dependencies & Requirements

- Chrome Canary or Edge Canary (WebGPU support)
- Git LFS for model weight downloads
- No build step — pure HTML+JS, open directly in browser

## License

MIT

## Key Inspirations

- Andrej Karpathy's neural network / GPT-from-scratch YouTube series
- nanoGPT (Karpathy)
- LatitudeGames' GPT-3 tokenizer JS implementation
