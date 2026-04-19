# MuseTalk — Real-Time High-Fidelity Video Dubbing via Spatio-Temporal Sampling

**Source:** https://github.com/TMElyralab/MuseTalk  
**Authors:** Yue Zhang*, Zhizhou Zhong*, Minhao Liu*, Zhaokang Chen, Bin Wu†, Yubin Zeng, Chao Zhan, Junxin Huang, Yingjie He, Wenjiang Zhou  
**Organization:** Lyra Lab, Tencent Music Entertainment (TME)  
**Paper:** https://arxiv.org/abs/2410.10122  
**License:** MIT (code) / Any purpose (model weights)  

## Overview

MuseTalk is a real-time high-fidelity audio-driven lip-syncing model capable of 30fps+ on NVIDIA Tesla V100. It modifies unseen faces according to input audio with a 256x256 face region, supports multiple languages (Chinese, English, Japanese), and allows face region center point adjustment via `bbox_shift` parameter.

## Architecture

- **VAE Encoder:** Uses frozen `ft-mse-vae` to encode images into latent space
- **Audio Encoder:** Uses frozen `whisper-tiny` to encode audio features
- **Generation Network:** UNet architecture borrowed from Stable Diffusion v1.4, audio embeddings fused via cross-attention
- **Key distinction:** MuseTalk is NOT a diffusion model — it operates by inpainting in latent space with a single step
- **Mask-based blending:** Uses face parsing (BiSeNet) to blend generated face region back to original frame

## Key Features

1. Real-time inference at 30fps+ on V100
2. Multi-language support (Chinese, English, Japanese)
3. Adjustable lip-sync via `bbox_shift` parameter (controls mouth openness)
4. Two model versions: 1.0 (L1 loss) and 1.5 (GAN + perceptual + sync loss)
5. Gradio web UI demo available on HuggingFace Spaces

## MuseTalk 1.5 Improvements

- Training with perceptual loss, GAN loss, and sync loss
- Two-stage training strategy for balance between visual quality and lip-sync accuracy
- Spatio-temporal data sampling approach
- Enhanced clarity, identity consistency, and precise lip-speech synchronization

## Model Components (Required Weights)

| Component | Source | Purpose |
|-----------|--------|---------|
| sd-vae-ft-mse | StabilityAI | Image encoding/decoding |
| whisper-tiny | OpenAI | Audio feature extraction |
| dwpose | IDEA Research | Pose estimation |
| syncnet | ByteDance/LatentSync | Lip-sync evaluation |
| face-parse-bisent | Custom | Face segmentation |
| musetalk/musetalkV15 | TMElyralab | UNet generation model |

## Training Pipeline

- **Stage 1:** Perceptual loss + GAN loss training (batch size 32, ~74GB GPU)
- **Stage 2:** Sync loss fine-tuning with temporal consistency (batch size 2, n_sample_frames=16, ~85GB GPU)
- Dataset: HDTF + private dataset
- GPU: Tested on 8x NVIDIA H20

## Dependencies

Python 3.10, CUDA 11.7, PyTorch 2.0.1, diffusers 0.30.2, OpenCV, librosa, gradio 5.24.0, mmcv 2.0.1, mmdet 3.1.0, mmpose 1.1.0

## Integration

- Compatible with [[ai-game-devtools/musev]] for complete virtual human pipeline (text/image-to-video + lip-sync)
- ComfyUI integration available (third-party: ComfyUI-MuseTalk)
- Can be combined with super-resolution models (e.g., GFPGAN) for higher resolution output

## Limitations

- Resolution limited by 256x256 face region input
- Some identity details not well preserved (mustache, lip shape/color)
- Single-frame generation causes some temporal jitter
- Requires FFmpeg for video processing
