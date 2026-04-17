# HunyuanImage-3.0

**Source:** https://github.com/Tencent-Hunyuan/HunyuanImage-3.0
**Extracted:** 2026-04-17

## Overview
HunyuanImage-3.0 is a native multimodal model by Tencent that unifies multimodal understanding and generation within a single autoregressive framework. Moving beyond prevalent DiT-based architectures, it directly models text and image modalities together, enabling richer contextual generation.

## Key Facts
- **Organization:** Tencent Hunyuan (腾讯混元)
- **Architecture:** Unified autoregressive MoE (Mixture of Experts)
- **Parameters:** 80B total, 13B activated per token, 64 experts
- **Largest open-source MoE image model** at time of release

## Model Variants

| Model | Parameters | VRAM Required | Capabilities |
|:---|:---|:---|:---|
| HunyuanImage-3.0 | 80B (13B active) | ≥ 3×80 GB | Text-to-Image |
| HunyuanImage-3.0-Instruct | 80B (13B active) | ≥ 8×80 GB | T2I, TI2I, Prompt Self-Rewrite, CoT Think |
| HunyuanImage-3.0-Instruct-Distil | 80B (13B active) | ≥ 8×80 GB | All Instruct + 8-step sampling |

## Core Capabilities
1. **Prompt Self-Rewrite** — transforms vague inputs into professional, detail-rich descriptions
2. **Text-to-Image (T2I)** — high-fidelity generation with strict prompt adherence
3. **Text+Image-to-Image (TI2I)** — editing, object addition/removal, style transfer, background replacement
4. **Multi-Image Fusion** — blends up to 3 reference images into a single composition
5. **Chain-of-Thought (CoT) Reasoning** — breaks complex prompts into structured visual components (subject, composition, lighting, palette, style) before generation

## Technical Details
- **Optimization:** FlashInfer + FlashAttention for up to 3× faster inference
- **Compatibility:** PyTorch CUDA version must match system CUDA, GCC ≥ 9 required
- **First-run:** ~10 minutes kernel compilation, subsequent runs much faster
- **Deployment:** Gradio demo included (`app/app.py`)
- **Evaluation:** GSB human preference, 1000 prompts, 100+ professional raters, zero cherry-picking
- **Results:** Matches or outperforms top closed-source competitors in prompt adherence, aesthetic quality, and structural accuracy

## Resources
- HuggingFace: Base, Instruct, Instruct-Distil (tencent/HunyuanImage-3.0 series)
- Official demo: https://hunyuan.tencent.com
- Community: WeChat, Discord

## License
Not specified in README (check repository LICENSE file)
