# ViewCrafter: High-Fidelity Novel View Synthesis

**Source:** https://github.com/Drexubery/ViewCrafter
**Extracted:** 2026-04-20 (web_extract; GitHub/gitcode/gitee clone all failed)

## Publication Info
- **Paper:** TPAMI 2025
- **arXiv:** https://arxiv.org/abs/2409.02048
- **Project Page:** https://drexubery.github.io/ViewCrafter/
- **YouTube Demo:** https://www.youtube.com/watch?v=WGIEmu9eXmU
- **HuggingFace Space:** https://huggingface.co/spaces/Doubiiu/ViewCrafter

## Authors
Wangbo Yu*, Jinbo Xing*, Li Yuan†, Wenbo Hu†, Xiaoyu Li, Zhipeng Huang, Xiangjun Gao, Tien-Tsin Wong, Ying Shan, Yonghong Tian†

## Core Capabilities
- Generates **high-fidelity novel views** from a **single or sparse reference image**
- Supports **highly precise camera pose control**
- Zero-shot novel view synthesis (NVS) for both single-view and multi-view (e.g., two-view) inputs

## Available Models

| Model | Resolution | Frames | GPU Mem & Time | Checkpoint | Use Case |
|:---|:---|:---|:---|:---|:---|
| ViewCrafter_25 | 576×1024 | 25 | 23.5GB & 120s | HF Link | Single-view NVS |
| ViewCrafter_25_sparse | 576×1024 | 25 | 23.5GB & 120s | HF Link | Sparse-view NVS |
| ViewCrafter_16 | 576×1024 | 16 | 18.3GB & 75s | HF Link | Ablation |
| ViewCrafter_25_512 | 320×512 | 25 | 13.8GB & 50s | HF Link | Lower-res ablation |

## Setup & Usage
- Install dependencies via requirements.txt
- PyTorch 2.4 may cause CUDA OOM (see Issue #23)
- CLI: download checkpoint → run inference.py with config/render docs
- Gradio demo: gradio_app.py
- Docker: docker compose up

## Key Notes
- Research-grade tool (not commercial product)
- Video diffusion stochasticity → try different seeds if results fail
- bg_trd parameter controls point cloud cleanliness (higher = cleaner but possible holes)
