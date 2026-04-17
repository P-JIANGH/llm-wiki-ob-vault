# img2img-turbo — Source Analysis

**Source URL:** https://github.com/GaParmar/img2img-turbo
**Paper:** https://arxiv.org/abs/2403.12036
**Analysis Date:** 2026-04-17

## README Summary

img2img-turbo proposes a general method for adapting a single-step diffusion model (SD-Turbo) to new tasks/domains through adversarial learning. Enables efficient one-step inference: 512×512 images in 0.29s on A6000, 0.11s on A100.

Two one-step conditional models:
- **CycleGAN-Turbo**: unpaired image-to-image translation (day↔night, clear↔rainy)
- **pix2pix-turbo**: paired image-to-image translation (edge→image, sketch→image)

## Architecture

### Generator Design
- Based on Stability AI SD-Turbo (latent diffusion model)
- Integrates VAE encoder, UNet, VAE decoder into single end-to-end network
- LoRA adapters added to each module (UNet + VAE) with small trainable weights
- Skip connections (4 Conv2d layers: 512→512, 256→512, 128→512, 128→256) between VAE encoder down-blocks and decoder up-blocks
- Zero-Conv layers between input and output
- TwinConv module for sketch-to-image stochastic mode (blends pretrained + trainable conv_in)

### Key Components (src/)
- `model.py`: Core architecture — 1-step scheduler, custom VAE encoder/decoder forward passes, skip connection injection
- `pix2pix_turbo.py`: Pix2Pix_Turbo class — paired translation with edge_to_image and sketch_to_image_stochastic models
- `cyclegan_turbo.py`: CycleGAN_Turbo class — unpaired translation with day_to_night, night_to_day, clear_to_rainy, rainy_to_clear
- `train_pix2pix_turbo.py`: Training script for paired data
- `train_cyclegan_turbo.py`: Training script for unpaired data
- `image_prep.py`: Image preprocessing utilities
- `gradio_sketch2image.py`: Gradio demo for sketch-to-image
- `gradio_canny2image.py`: Gradio demo for canny edge-to-image

### Dependencies (environment.yaml)
- Python 3.10, PyTorch ≥2.0.1, diffusers==0.25.1
- PEFT (LoRA), transformers==4.35.2, xformers
- open-clip-torch, timm, opencv-python, gradio==3.43.1
- CLIP (OpenAI), lpips, clean-fid

## Training Approach
- Adversarial learning on top of frozen SD-Turbo base
- LoRA fine-tuning with rank=8 (UNet) and rank=4 (VAE)
- CycleGAN-style cycle consistency for unpaired tasks
- DINOv2-based perceptual loss (dino_struct.py)
- Training documentation: docs/training_pix2pix_turbo.md, docs/training_cyclegan_turbo.md

## Pretrained Models
- edge_to_image_lora.pkl: edge/canny to photorealistic image
- sketch_to_image_stochastic_lora.pkl: sketch to image with gamma-controlled stochasticity
- day2night.pkl, night2day.pkl, clear2rainy.pkl, rainy2clear.pkl: scene translation
- All hosted at cs.cmu.edu/~img2img-turbo/models/

## Game Dev Relevance
- Real-time sketch-to-image for concept art / level design prototyping
- Edge-to-image for wireframe/mockup to rendered scene conversion
- Day/night weather transitions for game environments
- One-step inference enables interactive/real-time applications
- Gradio demos can be embedded in game dev tooling pipelines
