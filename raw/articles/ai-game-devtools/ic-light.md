# IC-Light — Imposing Consistent Light

**Source:** https://github.com/lllyasviel/IC-Light
**Analyzed:** 2026-04-17

## Overview

IC-Light is a project to manipulate the illumination of images. The name stands for **"Imposing Consistent Light"**. Two model types are released:

1. **Text-conditioned relighting model** (`iclight_sd15_fc.safetensors`) — conditioned on text prompt and foreground image. Initial latent can influence relighting direction.
2. **Background-conditioned model** (`iclight_sd15_fbc.safetensors`) — conditioned on text, foreground, and background images. No careful prompting required.

Published at ICLR 2025: "Scaling In-the-Wild Training for Diffusion-based Illumination Harmonization and Editing by Imposing Consistent Light Transport" by Lvmin Zhang, Anyi Rao, Maneesh Agrawala.

## Core Architecture

- **Base model:** Stable Diffusion 1.5 (`stablediffusionapi/realistic-vision-v51`)
- **UNet modification:** `conv_in` expanded from 4-channel to 8-channel (text-conditioned) or 12-channel (background-conditioned)
  - New input channels are zero-initialized, original 4 channels copied
  - Hooked `unet.forward` concatenates condition latents to input during inference
- **Weight offset loading:** Models are distributed as safetensors weight offsets added to base UNet: `sd_merged = sd_origin + sd_offset`
- **Background removal:** BriaRMBG-1.4 for foreground extraction (non-commercial; BiRefNet recommended for commercial use)
- **Two-stage pipeline:** Low-res generation → High-res refinement via Img2Img pipeline

## Key Implementation Details

### Text-Conditioned Model (gradio_demo.py, 433 LoC)
- UNet conv_in expanded to 8 channels (4 original + 4 foreground latent)
- Uses `cross_attention_kwargs['concat_conds']` to pass foreground condition
- Lighting preference implemented as initial gradient latent (Left/Right/Top/Bottom)
- Two-stage: T2I pipe (low-res) → Img2Img pipe (high-res refinement with 1.5× scale)
- Multiple schedulers: DDIM, EulerAncestral, DPM++ 2M SDE Karras

### Background-Conditioned Model (gradio_demo_bg.py, 465 LoC)
- UNet conv_in expanded to 12 channels (4 original + 4 foreground + 4 background)
- Supports uploaded background image, flipped background, or gradient lighting
- **Normal estimation feature:** Relights from 4 directions → computes surface normals via safe division (not trained on normal map data)
- Background sources: Upload, Upload Flip, Left/Right/Top/Bottom gradient, Grey ambient

### Consistency Principle
In HDR space, light transport is linear and independent. Blending appearances from different light sources is equivalent to appearance with mixed light sources. IC-Light imposes this consistency using MLPs in latent space during training, enabling different relightings to merge as normal maps.

## Dependencies

```
diffusers==0.27.2
transformers==4.36.2
opencv-python
safetensors
pillow==10.2.0
einops
torch
peft
gradio==3.41.2
protobuf==3.20
```

## Files Structure
- `gradio_demo.py` — Text-conditioned relighting demo (433 LoC)
- `gradio_demo_bg.py` — Background-conditioned relighting demo (465 LoC)
- `briarmbg.py` — BRIA RMBG-1.4 background removal model
- `db_examples.py` — Example images database
- `models/` — Model weights (downloaded automatically from HuggingFace)

## Links
- GitHub: https://github.com/lllyasviel/IC-Light
- HuggingFace Space: https://huggingface.co/spaces/lllyasviel/IC-Light
- HuggingFace Models: https://huggingface.co/lllyasviel/ic-light
- ICLR 2025 Paper: https://openreview.net/forum?id=u1cQYxRI1H

## Related Work
- Total Relighting: Learning to Relight Portraits for Background Replacement
- Relightful Harmonization: Lighting-aware Portrait Background Replacement
- SwitchLight: Co-design of Physics-driven Architecture and Pre-training Framework
- GeoWizard (depth/normal estimation comparison)
