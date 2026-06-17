# Kolors: Effective Training of Diffusion Model for Photorealistic Text-to-Image Synthesis

## Source
- GitHub: https://github.com/Kwai-Kolors/Kolors
- HuggingFace: https://huggingface.co/Kwai-Kolors/Kolors
- Tech Report: https://github.com/Kwai-Kolors/Kolors/blob/master/imgs/Kolors_paper.pdf
- Official Website: https://kolors.kuaishou.com/
- Date: 2026-04-17

## Overview
Kolors is a large-scale text-to-image generation model based on latent diffusion, developed by the Kuaishou Kolors team. Trained on billions of text-image pairs, it supports bilingual Chinese and English inputs with a context length of 256 tokens.

## Key Features
- **Bilingual Support**: Native Chinese and English text understanding and generation
- **High-Quality Portrait**: Photorealistic portrait generation with fine details
- **Chinese Element Generation**: Excellent at generating Chinese cultural elements
- **Complex Semantic Understanding**: Handles multi-concept compositions
- **Text Rendering**: Accurate rendering of Chinese characters in generated images

## Architecture
- **Base Model**: Latent Diffusion Model (UNet-based)
- **Text Encoder**: ChatGLM3 (Chinese LLM for text encoding)
- **Scheduler**: EulerDiscreteScheduler (recommended: guidance_scale=5.0, num_inference_steps=50) or EDMDPMSolverMultistepScheduler (guidance_scale=5.0, num_inference_steps=25)

## Available Components
- **Text-to-Image**: Core model for text-to-image synthesis
- **IP-Adapter-Plus**: Image prompt adapter for reference-guided generation
- **IP-Adapter-FaceID-Plus**: Face identity preservation for portrait generation
- **ControlNet (Canny)**: Edge-guided image generation
- **ControlNet (Depth)**: Depth map-guided image generation
- **ControlNet (Pose)**: Pose-guided image generation
- **Inpainting**: Image editing with mask-guided inpainting
- **Dreambooth-LoRA**: Subject-driven fine-tuning with LoRA

## Integrations
- **ComfyUI**: Native support via community wrapper
- **Diffusers**: Official HuggingFace Diffusers integration (0.30.0.dev0+)
- **Gradio**: Built-in Web UI for interactive demos
- **ModelScope**: Available on ModelScope platform

## Dependencies
- Python 3.8+, PyTorch 1.13.1+, Transformers 4.26.1+
- Core: fire, triton, accelerate, deepspeed, diffusers 0.28.2
- Image processing: imageio, numpy, Pillow, opencv-python, timm
- Training: omegaconf, safetensors, sentencepiece
- UI: gradio 4.37.2

## Performance
- **FlagEval Multimodal T2I Leaderboard**: 2nd place overall, 1st in Chinese/English quality assessment (2024.07)
- **Human Evaluation**: Highest Overall Satisfaction (3.59) and Visual Appeal (3.99) vs DALL-E 3, Midjourney v6, SD3
- **Machine Assessment (MPS Score)**: 10.3 (highest), surpassing Midjourney v6 (10.2)

## License
- Code: Apache-2.0
- Model Weights: Academic research free; commercial use requires registration with Kuaishou (monthly active users ≤ 300M) or explicit license (>300M MAU)

## Key Differences
- Uses ChatGLM3 as text encoder (Chinese-first) vs CLIP/T5 in Western models
- Bilingual capability with native Chinese text rendering
- Strong Chinese cultural element generation
- Competes with closed-source models (Midjourney v6, DALL-E 3) in quality benchmarks
