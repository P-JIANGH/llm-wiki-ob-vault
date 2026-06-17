# Depth Anything V2 — Raw Source

**Source:** https://github.com/DepthAnything/Depth-Anything-V2
**Captured:** 2026-04-17
**Type:** GitHub Repository Clone

## README Summary

Depth Anything V2 is a monocular depth estimation model that significantly outperforms V1 in fine-grained details and robustness. Compared with SD-based models, it enjoys faster inference speed, fewer parameters, and higher depth accuracy.

### Authors
Lihe Yang (HKU), Bingyi Kang (TikTok, project lead), Zilong Huang (TikTok), Zhen Zhao, Xiaogang Xu, Jiashi Feng (TikTok), Hengshuang Zhao (HKU, corresponding author)

### Pre-trained Models (4 scales)
| Model | Params | License |
|-------|--------|---------|
| Depth-Anything-V2-Small | 24.8M | Apache-2.0 |
| Depth-Anything-V2-Base | 97.5M | CC-BY-NC-4.0 |
| Depth-Anything-V2-Large | 335.3M | CC-BY-NC-4.0 |
| Depth-Anything-V2-Giant | 1.3B | Coming soon (CC-BY-NC-4.0) |

### Architecture
- **Backbone:** DINOv2 ViT (Small/Base/Large/Giant2)
  - ViT-S: 384 embed, 12 depth, 6 heads
  - ViT-B: 768 embed, 12 depth, 12 heads
  - ViT-L: 1024 embed, 24 depth, 16 heads
  - ViT-G: 1536 embed, 40 depth, 24 heads (SwiGLU FFN)
- **Head:** DPT (Dense Prediction Transformer) with 4-stage feature fusion
  - Projects 4 intermediate ViT layers to unified channels
  - Resize layers (ConvTranspose2d/Identity/Conv2d) align scales
  - 4 refinement blocks (FeatureFusionBlock) with cross-scale skip connections
  - Output: single-channel depth map at 14x patch resolution
- **Key design:** Uses intermediate ViT features [2,5,8,11] for Small/Base, [4,11,17,23] for Large, [9,19,29,39] for Giant — not last 4 layers like V1

### Usage
- Single image inference: `model.infer_image(raw_img)` → H×W numpy depth map
- Default input size: 518px (maintains aspect ratio, divisible by 14)
- Batch video depth: `run_video.py` with temporal processing
- Gradio demo: `app.py` (local or HuggingFace hosted)
- Transformers integration: `pipeline(task="depth-estimation", model="depth-anything/Depth-Anything-V2-Small-hf")`

### Community Integrations
- Apple Core ML: https://huggingface.co/apple/coreml-depth-anything-v2-small
- HuggingFace Transformers (built-in)
- TensorRT (spacewalk01, zhujiajian98)
- ONNX (fabio-sim)
- ComfyUI (kijai/ComfyUI-DepthAnythingV2)
- Transformers.js (WebGPU real-time depth in browser)
- Android (shubham0204, FeiGeChuanShu/ncnn-android)

### Related Projects
- **Video Depth Anything** (2025-01): Consistent depth for super-long videos (5+ minutes)
- **Prompt Depth Anything** (2024-12): 4K resolution metric depth when LiDAR prompts DA models
- **DA-2K Benchmark**: Evaluation benchmark for depth estimation quality

### License
- V2-Small: Apache-2.0 (commercial use allowed)
- V2-Base/Large/Giant: CC-BY-NC-4.0 (non-commercial only)

### Dependencies
gradio, gradio_imageslider, matplotlib, opencv-python, torch, torchvision

### Key Files
- `depth_anything_v2/dpt.py` — DPTHead + DepthAnythingV2 main model (221 lines)
- `depth_anything_v2/dinov2.py` — DINOv2 ViT backbone (416 lines, Meta license)
- `depth_anything_v2/dinov2_layers/` — ViT building blocks (Attention, MLP, SwiGLU, Block, PatchEmbed)
- `depth_anything_v2/util/blocks.py` — FeatureFusionBlock, _make_scratch
- `depth_anything_v2/util/transform.py` — Resize, NormalizeImage, PrepareForNet
- `run.py` — Batch image inference CLI
- `run_video.py` — Video depth extraction CLI
- `app.py` — Gradio web demo
- `metric_depth/` — Fine-tuned metric depth estimation (with LiDAR prompting)
