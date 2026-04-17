# SDXS — Raw Source

**Source:** https://github.com/IDKiro/sdxs
**Date captured:** 2026-04-17

## README Summary

**Title:** SDXS: Real-Time One-Step Latent Diffusion Models with Image Conditions

**Authors:** Yuda Song, Zehao Sun, Xuanwu Yin

**Paper:** https://arxiv.org/abs/2403.16627

**Key Claims:**
- SDXS-512: ~100 FPS (30x faster than SD v1.5) on single GPU
- SDXS-1024: ~30 FPS (60x faster than SDXL) on single GPU
- 30x speedup over base models while maintaining quality

**Released Models (Hugging Face):**
- sdxs-512-0.9 (March 25, 2024) — old version
- sdxs-512-dreamshaper (April 10, 2024)
- sdxs-512-dreamshaper-anime (April 11, 2024)
- sdxs-512-dreamshaper-sketch (April 10, 2024)

**Demos on HF Spaces:**
- Text2Image, Text2Image-Anime, Sketch2Image

## Method

### Model Acceleration
- Train extremely lightweight image decoder to mimic original VAE decoder output
- Uses output distillation loss + GAN loss combination
- Block removal distillation strategy to transfer knowledge from original U-Net to compact version

### Text-to-Image
- Straighten sampling trajectory
- Quickly finetune multi-step model into one-step model
- Replace distillation loss with feature matching loss
- Extend Diff-Instruct training strategy, using gradient of feature matching loss instead of score distillation

### Image-to-Image (ControlNet)
- Extend training strategy to ControlNet training
- Add pretrained ControlNet to score function
- Demonstrated for canny edges and depth map transformations

## Project Structure
- demo.py — text-to-image demo
- demo_anime.py — anime-style text-to-image (LoRA) demo
- demo_sketch.py — sketch-to-image (ControlNet) demo
- requirements.txt — dependencies: diffusers==0.25.1, gradio==3.43.1, transformers, accelerate, peft, timm, einops, opencv-python, pillow, scipy
- style.css — demo styling

## Notes
- Training code not open-sourced (based on DMD2 training scheme)
- Demo code based on img2img-turbo (https://github.com/GaParmar/img2img-turbo)
- Demo code uses Gradio for UI

## License
MIT License (checked from LICENSE file)
