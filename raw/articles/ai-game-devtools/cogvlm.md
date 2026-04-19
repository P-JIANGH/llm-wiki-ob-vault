# CogVLM & CogAgent — Raw Source

**Source:** https://github.com/THUDM/CogVLM
**Date:** 2026-04-20
**Status:** Superseded by CogVLM2 (https://github.com/THUDM/CogVLM2)

## Overview

CogVLM is a powerful open-source visual language model (VLM) developed by THUDM (Tsinghua University + ZhipuAI). CogVLM-17B has 10 billion vision parameters and 7 billion language parameters, supporting image understanding and multi-turn dialogue at 490×490 resolution.

CogAgent-18B is an improved version based on CogVLM, with 11 billion visual parameters and 7 billion language parameters, supporting ultra-high-resolution image input at 1120×1120. It adds GUI Agent capabilities on top of CogVLM's features.

## Key Achievements

- CogVLM-17B achieves SOTA on 10 classic cross-modal benchmarks: NoCaps, Flicker30k captioning, RefCOCO, RefCOCO+, RefCOCOg, Visual7W, GQA, ScienceQA, VizWiz VQA, TDIUC
- CogVLM ranked 2nd on VQAv2, OK-VQA, TextVQA, COCO captioning, surpassing or matching PaLI-X 55B
- CogAgent-18B achieves SOTA on 9 benchmarks: VQAv2, OK-VQ, TextVQA, ST-VQA, ChartQA, infoVQA, DocVQA, MM-Vet, POPE
- CogAgent significantly surpasses existing models on GUI operation datasets (AITW, Mind2Web)
- CogAgent paper was selected as CVPR 2024 Highlights

## Architecture & Tech Stack

- **Framework:** SwissArmyTransformer (SAT) + HuggingFace Transformers
- **Dependencies:** PyTorch ≥2.1.0, torchvision ≥0.16.2, xformers ≥0.0.22, deepspeed ≥0.13.1
- **Web UI:** Streamlit + Gradio
- **API:** OpenAI Vision-compatible API (FastAPI + uvicorn + sse-starlette)
- **Training:** LoRA fine-tuning support via DeepSpeed
- **Quantization:** 4-bit and 8-bit quantization (11GB GPU for INT4)

## Model Variants

### CogVLM
| Model | Resolution | Description |
|-------|-----------|-------------|
| cogvlm-chat-v1.1 | 490 | Multi-round chat + VQA, unified version |
| cogvlm-base-224 | 224 | Original pretraining checkpoint |
| cogvlm-base-490 | 490 | Resolution upscaled via position encoding interpolation |
| cogvlm-grounding-generalist | 490 | Visual grounding tasks (REC, Grounding Captioning) |

### CogAgent
| Model | Resolution | Description |
|-------|-----------|-------------|
| cogagent-chat | 1120 | GUI Agent, multi-round chat, visual grounding |
| cogagent-vqa | 1120 | Single-turn VQA, enhanced for VQA benchmarks |

## Hardware Requirements

- INT4 quantization: 1× RTX 3090 (24GB) — CogAgent ~12.6GB, CogVLM ~11GB
- FP16: 1× A100 (80GB) or 2× RTX 3090 (24GB)
- Fine-tuning FP16: 4× A100 (80GB) recommended, or 8× RTX 3090 (24GB)

## Key Features

1. **Multi-round visual dialogue:** Support for conversational image understanding
2. **Visual grounding:** Return bounding box coordinates [[x1,y1,x2,y2]] for mentioned objects
3. **GUI Agent (CogAgent):** Plan inference, next action prediction, coordinate-based operations on any GUI screenshot
4. **4-bit quantization:** Inference with just 11GB GPU memory
5. **OpenAI Vision API compatibility:** Same API format as GPT-4V
6. **Ultra-high resolution:** CogAgent supports 1120×1120 image input

## License

- Code: Apache-2.0
- Model weights: Separate model license (MODEL_LICENSE)

## Papers

- CogVLM: "CogVLM: Visual Expert for Pretrained Language Models" (arXiv:2311.03079)
- CogAgent: "CogAgent: A Visual Language Model for GUI Agents" (arXiv:2312.08914, CVPR 2024 Highlights)

## Benchmarks Comparison (CogVLM vs competitors)

| Method | LLM | MM-VET | POPE(adversarial) | TouchStone |
|--------|-----|--------|-------------------|------------|
| BLIP-2 | Vicuna-13B | 22.4 | - | - |
| MiniGPT4 | Vicuna-13B | 24.4 | 70.4 | 531.7 |
| InstructBLIP | Vicuna-13B | 25.6 | 77.3 | 552.4 |
| LLaVA-1.5 | Vicuna-13B | 36.3 | 84.5 | - |
| Qwen-VL-Chat | - | - | - | 645.2 |
| **CogVLM** | **Vicuna-7B** | **52.8** | **87.6** | **742.0** |

## Related Projects

- CogVLM2: Next generation model based on Llama3-8B, comparable to GPT-4V
- CogVLM-SFT-311K: Training dataset with 150K+ data points
