# Paints-Undo - Source Analysis

## GitHub
https://github.com/lllyasviel/Paints-UNDO

## Project Overview
PaintsUndo: A Base Model of Drawing Behaviors in Digital Paintings. Takes a finished image as input and outputs the drawing sequence of that image — simulating pressing Ctrl+Z backwards through the creation process.

## Key Facts
- **Author**: lllyasviel (ControlNet creator)
- **License**: Apache 2.0
- **Tested VRAM**: 24GB (RTX 4090/3090TI), theoretical minimum 10-12.5GB with extreme optimization
- **Output**: ~25 second video at FPS 4, resolution 320x512 or variants
- **Processing time**: 5-10 minutes per image

## Model Architecture

### Single-Frame Model (paints_undo_single_frame)
- Modified SD1.5 architecture
- Custom betas scheduler: `betas = torch.linspace(0.00085, 0.020, 1000)` (different from original SD1.5)
- CLIP Skip = 2 (last layer of CLIP ViT-L/14 permanently removed)
- `operation step` condition added to layer embeddings (similar to SDXL's extra embeddings)
- Input: one image + operation step (0-999, where 0=finished, 999=first stroke on white canvas)
- Output: single image at that undo step
- Must use WD14 tagger for prompts; human-written prompts not tested

### Multi-Frame Model (paints_undo_multi_frame)
- Resumed from VideoCrafter family, but completely rewritten from scratch
- 5 components: 3D-UNet, VAE (from ToonCrafter), CLIP (SD2.1), CLIP-Vision (ViT/H), Image Projection
- Input: two images → outputs 16 intermediate frames
- Supports temporal windows in Spatial Self-Attention (prv/first/roll modes)
- Custom CLIP-Vision supports arbitrary aspect ratios via nearest-neighbor interpolation

## Inference Pipeline
1. Single-frame model generates 5-7 "keyframes" at different undo steps
2. Multi-frame model interpolates between consecutive keyframes
3. Final video: 100-500 frames total

## Dependencies
- diffusers==0.28.0, transformers==4.41.1, gradio==4.31.5
- bitsandbytes==0.43.1, accelerate==0.30.1, xformers
- peft, safetensors, einops, opencv-python, onnxruntime, av

## Key Modules
- `gradio_app.py` (324 lines): Main Gradio UI with 3-step workflow (prompt generation → keyframe generation → video generation)
- `memory_management.py`: GPU memory management with load/unload models
- `wd14tagger.py`: WD14 tagger integration for automatic prompt generation
- `diffusers_helper/`: Custom UNet modifications (concat conditions, coded conditions, k-diffusion sampler)
- `diffusers_vdm/`: Latent video diffusion pipeline (VDM = Video Diffusion Model)

## Related Work
- PaintsAlter (2025 Aug): Extension that can undo AND redo to explore drawing processes (SIGGRAPH 2025)
- Stylized Neural Painting, PaintTransformer, ProcessPainter, TimeMap

## Use Cases
1. AI behavior analysis base model for artist-aligned tools
2. Combine with sketch-guided generators for "PaintsRedo" (forward/backward in artworks)
3. View different possible procedures of own artworks
4. Video/movie after effects
