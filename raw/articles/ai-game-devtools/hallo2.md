# Hallo2 — Raw Source

**Source:** https://github.com/fudan-generative-vision/hallo2
**Captured:** 2026-04-19
**License:** Not explicitly stated in README (code uses various sub-components with different licenses)

## Project Overview

Hallo2: Long-Duration and High-Resolution Audio-driven Portrait Image Animation

- **Authors:** Jiahao Cui, Hui Li, Yao Yao, Hao Zhu, Hanlin Shang, Kaihui Cheng, Hang Zhou, Siyu Zhu (Fudan University), Jingdong Wang (Baidu Inc)
- **Affiliation:** Fudan University (Generative Vision Lab), Baidu Inc, Nanjing University
- **Publication:** ICLR 2025 (accepted 2025/01/23)
- **Paper:** arXiv:2410.07718

## Key Features

1. **Long-Duration Animation:** Can generate portrait animations lasting up to 1 hour (e.g., Taylor Swift speech at NYU — 23 minutes at 4K, Stanford LLM course up to 1 hour)
2. **High-Resolution Output:** Supports 4K resolution output
3. **Audio-Driven:** Takes a single portrait image + driving audio (WAV format, English only) → generates talking-face video
4. **Two-Stage Pipeline:**
   - Stage 1: Long-duration animation generation via diffusion model
   - Stage 2: Video super-resolution (SR) for high-res output (based on CodeFormer)

## Architecture / Technical Details

### Framework Components

- **Denoising UNet + Face Locator + Image & Audio Proj** (hallo2 checkpoint)
- **Audio Processing:** Wav2Vec (facebook/wav2vec2-base-960h) for audio embeddings
- **Face Processing:** InsightFace (2D/3D face analysis) + MediaPipe Face Landmarker
- **Motion Module:** AnimateDiff v2 (mm_sd_v15_v2.ckpt)
- **Base Model:** Stable Diffusion V1.5 + sd-vae-ft-mse
- **Audio Separation:** Kim_Vocal_2 MDX-Net (audio_separator) for vocal removal from background music
- **Video SR:** CodeFormer-based super-resolution + RealESRGAN background upsample

### Key Scripts

- `scripts/inference_long.py` — Main inference pipeline for long-duration animation
  - Steps: config init → prepare source image + face mask + face embeddings → process audio embeddings → build model/scheduler → run inference → save video
  - CLI args: source_image, driving_audio, pose_weight, face_weight, lip_weight, face_expand_ratio
- `scripts/video_sr.py` — Video super-resolution for high-res output
  - CLI args: input_path, output_path, fidelity_weight, upscale, bg_upsampler (realesrgan), face_upsample
- `scripts/data_preprocess.py` — Training data preprocessing (2 steps)
- `scripts/train_stage1.py` / `scripts/train_stage2_long.py` — Training scripts using HuggingFace Accelerate

### Training Pipeline

- **Stage 1:** Basic animation training
- **Stage 2 (long):** Long-duration animation training
- Uses `accelerate launch` for distributed training (multi-GPU, multi-node)
- Data requirements: square cropped, face-focused (50-70%), front-facing (<30° rotation)
- Training data: talking-face videos

### Dependencies (requirements.txt)

- PyTorch 2.2.2 + CUDA 11.8
- diffusers 0.32.2
- transformers 4.39.2
- accelerate 0.28.0
- insightface 0.7.3
- mediapipe[vision] 0.10.14
- audio-separator 0.17.2
- opencv (multiple variants)
- librosa, moviepy, ffmpeg-python
- gradio 4.36.1 (web UI)
- xformers 0.0.25.post1

### System Requirements

- Ubuntu 20.04/22.04, CUDA 11.8
- Tested on A100 GPU

## Showcase Examples

- Taylor Swift Speech @ NYU (4K, 23 minutes)
- Johan Rockstrom Speech @ TED (4K, 18 minutes)
- Churchill's Iron Curtain Speech (4K, 4 minutes)
- Stanford LLM Course (4K, up to 1 hour)

## Related Projects (Acknowledged)

- magic-animate
- AnimateDiff
- AniPortrait (also on our checklist)
- Moore-AnimateAnyone
- CodeFormer (video SR base)
- RealESRGAN

## License Notes

- Main code: license not explicitly stated in README
- Video SR component (CodeFormer-based): S-Lab License 1.0
- Various pretrained models have their own licenses

## Links

- GitHub: https://github.com/fudan-generative-vision/hallo2
- Project Page: https://fudan-generative-vision.github.io/hallo2/
- Paper: https://arxiv.org/abs/2410.07718
- HuggingFace: https://huggingface.co/fudan-generative-ai/hallo2
- Demo: OpenBayes (贝式计算)
