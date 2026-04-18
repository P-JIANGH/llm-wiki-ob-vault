# EchoMimic — Raw Source

**Source:** https://github.com/BadToBest/EchoMimic
**Extracted:** 2026-04-18 via web_extract (GitHub/gitcode/gitee clone all failed)

## Project Info
- **Full Name:** EchoMimic: Lifelike Audio-Driven Portrait Animations through Editable Landmark Conditioning
- **Conference:** AAAI 2025
- **Authors:** Zhiyuan Chen, Jiajiong Cao, Zhiquan Chen, Yuming Li, Chenguang Ma (Ant Group)
- **Paper:** arXiv 2407.08136
- **Organization:** Ant Group (蚂蚁集团)

## Core Function
Generates highly realistic talking-head/portrait animations driven by audio, with precise control via editable facial landmarks. Built on Stable Diffusion v1.5 (Latent Diffusion Model).

## Architecture
- **Denoising U-Net:** Core generator with 3 attention layers per Transformer block (Reference-Attention, Audio-Attention, Temporal-Attention)
- **Reference U-Net:** Parallel noise-free encoder for identity preservation
- **Audio Encoder:** Pre-trained Whisper-Tiny, adjacent frame concatenation for temporal context
- **Landmark Encoder:** Lightweight CNN, element-wise addition to preserve anatomical precision
- **Temporal Attention:** Self-attention along temporal axis for smooth frame transitions

## Training Strategy
- Two-Stage Training: Stage 1 (single-frame, temporal disabled) → Stage 2 (12-frame video, temporal fine-tune)
- Random Landmark Selection (RLS): Face partitioned into regions, randomly drops 1+ regions
- Audio Augmentation: Noise/perturbations for generalization
- Timestep-Aware Spatial Loss: Pixel-space supervision compensating for 64×64 latent resolution

## Driving Modes
1. Audio-only
2. Landmark-only
3. Audio + Selected Landmarks (hybrid)

## Performance (HDTF)
- Audio-only: FID 29.13, FVD 492.78, SSIM 0.81
- Landmark-only: FID 22.97, FVD 156.53, SSIM 0.88
- Audio+Landmark: FID 22.98, FVD 181.74, SSIM 0.88

Outperforms SadTalker, AniPortrait, V-Express, and Hallo.

## Repository Structure
- `src/` — Core model & processing code
- `configs/` — YAML configs for prompts & inference
- `infer_audio2vid.py` — Standard audio-driven inference
- `infer_audio2vid_acc.py` — Accelerated inference
- `infer_audio2vid_pose.py` — Audio + pose/landmark inference
- `demo_motion_sync.py` — Reference image + video alignment
- `webgui.py` — Gradio web interface
- `requirements.txt` — Python dependencies

## Limitations
- Not a native video architecture (SD image extension)
- No real-time capability
- Future: 3DVAE + DiT for video-native optimization

## Acknowledgements
Built on FollowYourEmoji, AnimateDiff, Moore-AnimateAnyone, MuseTalk, V-Express, hallo

## License
Academic research only (no explicit open-source license stated)
