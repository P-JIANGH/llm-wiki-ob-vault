# LTX-Video — Raw Source

**Source:** https://github.com/Lightricks/LTX-Video
**Captured:** 2026-04-20
**Method:** web_extract (GitHub/gitcode/gitee clone all failed)

## Overview

LTX-Video is the first DiT-based video generation model integrating all modern video generation capabilities into a single architecture. Developed by Lightricks.

- **Performance:** Up to 50 FPS at native 4K resolution in a single pass
- **Core Features:** Text-to-video, image-to-video, multi-keyframe conditioning, keyframe animation, forward/backward video extension, video-to-video, and hybrid combinations
- **Training Data:** Large-scale diverse video dataset enabling realistic, high-resolution generation

## LTX-2 (Next Generation)

Development has shifted to LTX-2, featuring:
- Synchronized Audio+Video Generation
- 4K Fidelity & 50 FPS with sharp textures and clean motion
- Longer Clips: Up to 10 seconds with synced audio
- 50% Lower Compute Cost via multi-GPU inference stack
- Advanced Control: Multi-keyframe conditioning, 3D camera logic, IC-LoRA & standard LoRA support, latent upsampler
- Built-in Training Tools & full ComfyUI core integration
- Docs: https://docs.ltx.video

## Model Variants (v0.9.8)

| Model | Use Case | Notes |
|---|---|---|
| ltxv-13b-0.9.8-dev | Highest quality | Requires more VRAM |
| ltxv-13b-0.9.8-mix | Balanced speed/quality | Multi-scale workflow |
| ltxv-13b-0.9.8-distilled | Fast iteration | Lower VRAM, slight quality trade-off |
| ltxv-2b-0.9.8-distilled | Lightweight | Ideal for low VRAM/fast generation |
| *-fp8 variants | Quantized | Reduced VRAM, faster inference |
| ltxv-2b-0.9.6-distilled | Real-time capable | 15× faster, no STG/CFG needed |

## Quick Start

- **Online Demos:** LTX-Studio, Fal.ai, Replicate
- **Local Requirements:** Python 3.10.5, CUDA 12.2, PyTorch ≥2.1.2
- **Optional:** FP8 Kernels for Ada architecture GPUs

### Key Inference Modes
- Text-to-Video: prompt only
- Image-to-Video: image + prompt
- Video Extension: input video (multiple of 8 frames + 1)
- Multi-Condition: images/video segments + target frames + strength

## Prompt Engineering

- **Format:** Single flowing paragraph, chronological, <200 words
- **Structure:** Main action → movements/gestures → object appearances → environment → camera angles → lighting/colors → sudden events
- **Auto-Enhance:** Enable via enhance_prompt=True

## Parameter Recommendations

| Parameter | Recommendation |
|---|---|
| Resolution | Divisible by 32. Best <720×1280 |
| Frames | Divisible by 8+1 (e.g., 257). Best <257 |
| Guidance Scale | 3.0–3.5 |
| Inference Steps | 40+ (quality) / 20–30 (speed) |

## Integrations

- **ComfyUI:** Official integration at ComfyUI-LTXVideo
- **Diffusers:** Official pipeline support + 8-bit version
- **ComfyUI-LTXTricks:** Advanced nodes for RF-Inversion, RF-Edit, FlowEdit, I+V2V, STGuidance
- **LTX-VideoQ8:** 8-bit optimized fork, 3× speedup on NVIDIA ADA GPUs, generates 720×480×121 in <1 min on RTX 4060 (8GB VRAM)
- **TeaCache:** Training-free caching, up to 2× speedup

## Training

- **LTX-Video-Trainer:** Supports 2B & 13B variants for full fine-tuning & LoRA
- **IC-LoRA Control Models:** Depth, Pose, and Canny conditioning
- **Upscalers:** Temporal & spatial upscalers for multi-scale rendering

## License & Citation

- **License:** Apache-2.0 (v0.9.5+)
- **Paper:** Available on the project page
