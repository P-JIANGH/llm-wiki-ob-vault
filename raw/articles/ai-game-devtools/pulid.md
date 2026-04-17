# PuLID — Source Analysis

**Source:** https://github.com/ToTheBeginning/PuLID
**Date:** 2026-04-17

## Overview

**PuLID: Pure and Lightning ID Customization via Contrastive Alignment** (NeurIPS 2024) by ByteDance Inc. A zero-shot identity-preserving image generation method that generates high-fidelity ID-customized images from a single reference photo, without any fine-tuning.

## Key Facts

- **Authors:** Zinan Guo*, Yanze Wu*✝, Zhuowei Chen, Lang Chen, Peng Zhang, Qian He (ByteDance)
- **Conference:** NeurIPS 2024
- **arXiv:** 2404.16022
- **License:** Not explicitly stated in README

## Technical Architecture

### Core Components

| Module | Function |
|--------|----------|
| IDEncoder | MLP-based identity encoder, takes concatenated face embeddings and outputs ID tokens |
| IDAttnProcessor | Custom attention processor that injects ID embeddings into UNet cross-attention |
| EVA-CLIP-ViT | EVA02-CLIP-L-14-336 vision backbone for facial feature extraction |
| InsightFace (AntelopeV2) | Face detection and identity embedding extraction |
| FaceRestoreHelper (facexlib) | Face alignment, detection, parsing (BiSeNet) |

### Pipeline Flow

1. **Input:** Single RGB reference image
2. **Face Detection:** InsightFace (antelopev2 model) detects largest face
3. **Face Alignment:** facexlib aligns and warps face to 512x512
4. **Face Parsing:** BiSeNet segments face regions, creates gray+white feature image
5. **Feature Extraction:** EVA-CLIP extracts visual features; InsightFace extracts ID embedding
6. **Concatenation:** ID embedding + CLIP features concatenated
7. **ID Encoding:** IDEncoder (MLP) transforms into ID tokens
8. **Attention Injection:** IDAttnProcessor injects tokens into SDXL/FLUX UNet/DiT cross-attention layers
9. **Generation:** Modified diffusion pipeline generates ID-preserved images

### Model Versions

| Version | Base Model | Description |
|---------|-----------|-------------|
| PuLID-v1 | SDXL | Original paper model |
| PuLID-v1.1 | SDXL | Better compatibility, editability, facial naturalness, similarity |
| PuLID-FLUX-v0.9.0 | FLUX | First FLUX version, better prompt-following |
| PuLID-FLUX-v0.9.1 | FLUX | Improved ID fidelity (+5pp similarity) |

### Key Files

- `pulid/pipeline.py` — SDXL pipeline (PuLID-v1)
- `pulid/pipeline_v1_1.py` — SDXL pipeline (PuLID-v1.1)
- `pulid/pipeline_flux.py` — FLUX pipeline with IDFormer + PerceiverCrossAttention
- `pulid/encoders.py` — IDEncoder (MLP architecture)
- `pulid/encoders_transformer.py` — IDFormer + PerceiverAttentionCA for FLUX
- `pulid/attention_processor.py` — IDAttnProcessor (cross-attention injection)
- `pulid/eva_clip/` — EVA-CLIP vision encoder implementation

### Requirements

- Python >= 3.9, PyTorch >= 2.0 (>= 2.4.1 for flux-fp8)
- SDXL-Lightning 4-step UNet for fast inference
- FLUX can run on 16GB GPU (optimized), 12GB supported in later versions

## Notable Design Choices

- Uses **SDXL-Lightning** (4-step) as base for lightning-fast generation
- **Contrastive alignment** principle: trains with both conditional and unconditional ID embeddings
- **Gray-scale + white background** preprocessing: removes non-face features (hair, accessories) while preserving facial structure
- **Dual embedding**: combines InsightFace identity embedding (glintr100) with EVA-CLIP visual features

## Relationship to Other Tools

- Similar to [[instantid]]: both are zero-shot, single-image ID preservation
- PuLID uses contrastive alignment + CLIP features; InstantID uses IdentityNet (ControlNet) + IP-Adapter
- PuLID supports both SDXL and FLUX; InstantID is SDXL-only
- Both use InsightFace for face analysis
