---
title: UltraEdit
created: 2026-04-18
updated: 2026-04-18
type: entity
tags: [image-generation, diffusion, open-source, tool]
sources: [raw/articles/ai-game-devtools/ultraedit.md]
---

# UltraEdit

**UltraEdit** is a large-scale (~4M editing samples) instruction-based image editing dataset and training framework from Peking University, BIGAI, UCLA, and UIUC. It provides systematically generated high-quality image editing samples using real images (photographs, artworks) as anchors, addressing limitations in existing datasets like InstructPix2Pix and MagicBrush.

## Key Facts

| Attribute | Value |
|-----------|-------|
| Dataset Size | 4M+ free-form + 100K+ region-based samples |
| Paper | arXiv 2407.05282 (2024) |
| Base Models | [[stable-diffusion-3-5]] (SD3), [[stable-diffusion]] (SDXL, SD1.5) |
| Training | Two-stage: free-form → mixed (mask+free-form) |
| Framework | Diffusers (custom fork), PyTorch 2.3 |
| Inference | HuggingFace pipeline (StableDiffusion3InstructPix2PixPipeline) |
| Demo | Gradio Web UI on HuggingFace Spaces |
| Institutions | Peking University, BIGAI, UCLA, UIUC |

## Architecture

Two-stage training pipeline:

1. **Stage 1 — Free-form editing**: Fine-tune SD3/SDXL/SD1.5 on 4M instruction-based samples (5 epochs, LR 5e-5)
2. **Stage 2 — Mixed training**: Continue with combined free-form + region-based samples using mask channel (2 epochs, LR 1e-5)

Supports both free-form (no mask → whole image editing) and region-based (mask-guided localized editing) modes through a unified mask channel approach.

## Data Generation

Automated pipeline using [[grounded-segment-anything]] for region annotation, LLM-generated editing instructions, and human in-context examples. Real image anchors (photographs/artworks) provide greater diversity and reduced bias compared to AI-generated-only datasets.

## Usage

```python
from diffusers import StableDiffusion3InstructPix2PixPipeline
pipe = StableDiffusion3InstructPix2PixPipeline.from_pretrained(
    "BleachNick/SD3_UltraEdit_w_mask", torch_dtype=torch.float16
)
# Region-based: pipe(prompt, image=img, mask_img=mask_img)
# Free-form: pipe(prompt, image=img, mask_img=blank_white_mask)
```

## Differences from Similar Tools

- vs [[mimicbrush]]: UltraEdit is a training dataset + fine-tuned model; MimicBrush is a reference-based editing method using one reference image
- vs [[easyphoto]]: EasyPhoto focuses on digital avatar/facial identity preservation; UltraEdit handles general-purpose fine-grained editing
- vs [[paints-undo]]: Paints-Undo simulates painting process (temporal); UltraEdit does instruction-based static editing
- vs [[sd-webui-controlnet]]: ControlNet provides structural conditioning (pose/depth/edge); UltraEdit provides natural language instruction-based editing

## Links
- [GitHub](https://github.com/HaozheZhao/UltraEdit)
- [ArXiv 2407.05282](https://arxiv.org/abs/2407.05282)
- [HuggingFace Model](https://huggingface.co/BleachNick/SD3_UltraEdit_w_mask)
- [HuggingFace Dataset](https://huggingface.co/datasets/BleachNick/UltraEdit)
- [Project Page](https://ultra-editing.github.io/)
