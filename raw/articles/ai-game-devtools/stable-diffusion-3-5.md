# Stable Diffusion 3.5 — GitHub README

> Source: https://github.com/Stability-AI/sd3.5
> Extracted: 2026-04-17 (web extract; GitHub/gitcode/gitee clone all failed)

## Overview
Inference-only tiny reference implementation of SD3.5 and SD3 — everything needed for simple inference using SD3.5/SD3, as well as the SD3.5 Large ControlNets, excluding the weights files.

**Recommendation:** For general/alternate inference workflows, use [ComfyUI](https://github.com/comfyanonymous/ComfyUI).

## Architecture
- **Text Encoders:** OpenAI CLIP-L/14, OpenCLIP bigG, Google T5-XXL (all publicly available)
- **VAE Decoder:** 16-channel architecture, explicitly **omits the `postquantconv` step**
- **Core MM-DiT:** Entirely new Multi-Modal Diffusion Transformer architecture

## Model Weights
Download from HuggingFace into local `models/` directory:
- `sd3.5_large.safetensors`
- `sd3.5_large_turbo.safetensors`
- `sd3.5_medium.safetensors`
- `sd3_medium.safetensors` (backward compatible)

**ControlNets:** [SD3.5 Large ControlNets](https://huggingface.co/stabilityai/stable-diffusion-3.5-controlnets)

## Key Files
| File | Purpose |
|---|---|
| `sd3_infer.py` | Main inference entry point |
| `sd3_impls.py` | Core SD3 implementation logic |
| `mmditx.py` | MM-DiT architecture code |
| `dit_embedder.py` | DiT embedding utilities |
| `other_impls.py` | Auxiliary implementations (contains third-party code from HuggingFace Transformers, Apache 2.0) |
| `models/` | Directory for `.safetensors` weights |

## CLI Usage
```bash
--postfix <my_postfix>              # Custom suffix for output directory
--width <WIDTH> --height <HEIGHT>   # Image resolution
```
Default output path: `outputs/<MODEL>/<PROMPT>_<DATETIME>_<POSTFIX>`

**Tip:** Use [Skip Layer Guidance](https://github.com/comfyanonymous/ComfyUI/pull/5404) for better structural and anatomical coherence when running SD3.5-Medium.

## License
Governed by `LICENSE-CODE` file. Third-party code in `other_impls.py` under Apache 2.0.

## Links
- [HuggingFace SD3.5 Models](https://huggingface.co/stabilityai/stable-diffusion-3.5)
- [SD3.5 ControlNets](https://huggingface.co/stabilityai/stable-diffusion-3.5-controlnets)
- [ComfyUI (Recommended)](https://github.com/comfyanonymous/ComfyUI)
