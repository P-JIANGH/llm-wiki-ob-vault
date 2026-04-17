---
title: MakeAnything
created: 2026-04-17
updated: 2026-04-17
type: entity
tags: [ai, tool, image-generation, diffusion, open-source, python]
sources: [raw/articles/ai-game-devtools/makeanything.md]
---

# MakeAnything

**MakeAnything** is a research project from **Show Lab, National University of Singapore** that harnesses the **FLUX.1 Diffusion Transformer** to generate multi-domain procedural sequences — step-by-step image series showing how things are created (LEGO builds, paintings, sculptures, etc.).

- **Paper**: [arXiv 2502.01572](https://arxiv.org/abs/2502.01572)
- **GitHub**: [showlab/MakeAnything](https://github.com/showlab/MakeAnything)
- **HuggingFace**: [Model](https://huggingface.co/showlab/makeanything) | [Dataset](https://huggingface.co/datasets/showlab/makeanything/) | [Space](https://huggingface.co/spaces/yiren98/MakeAnything)

## Core Capabilities

### Text-to-Sequence Generation
Generate multi-frame procedural sequences from text prompts using two approaches:

1. **Asymmetric LoRA** — A multi-domain LoRA with multiple B matrices, each indexed to a specific creative domain. Select a domain via `--lora_up <index>` during training or inference. Supports 21 domains with a single model checkpoint.

2. **Recraft Model** — Image-to-sequence generation. Given a conditional image and text prompt, produces step-by-step continuation sequences. Trained by first merging standard LoRA into FLUX.1, then performing specialized Recraft training.

### 21 Creative Domains

| 4-frame (1024²) | 9-frame (1056²) |
|---|---|
| Clay toys, Clay sculpture, ZBrush Modeling, Wood sculpture, Ink painting, Pencil sketch, Fabric toys, Oil painting, Jade Carving, Line draw, Emoji | LEGO, Cook, Painting, Icon, Landscape illustration, Portrait, Transformer, Sand art, Illustration, Sketch |

- 4-frame sequences use ɔ-shape arrangement; 9-frame sequences use S-shape arrangement
- 50 training sequences per domain, plus extended SVG and Sketch datasets

## Technical Architecture

| Component | Details |
|---|---|
| **Base Model** | FLUX.1 Diffusion Transformer |
| **Text Encoders** | CLIP-L + T5-XXL |
| **VAE** | FLUX.1 Autoencoder |
| **LoRA Framework** | Based on kohya_ss/sd-scripts |
| **Optimizers** | Lion, CAME, ScheduleFree |
| **Framework** | PyTorch 2.5.1, Accelerate, Diffusers |
| **UI** | Gradio web app |

### Training Pipeline
1. **Asymmetric LoRA**: Dataset with `.caption` + `.png` pairs → TOML config → `scripts/asylora_train.sh`
2. **Recraft**: Decompose Asymmetric LoRA → merge to FLUX.1 → `scripts/recraft_train.sh`
3. Captions must include `--lora_up <index>` for domain selection

### Inference
- CLI scripts: `flux_minimal_inference.py`, `flux_minimal_inference_asylora.py`, `gradio_app.py`
- Gradio app supports model selection (LEGO, Portrait, Sketch, Wood Sculpture), prompt input, conditional image upload, seed control

## Use Cases in Game Development
- Procedural content generation tutorials and guides
- Step-by-step art creation sequences for asset pipelines
- NPC crafting/creation animations
- Educational content for game development

## License
Not explicitly stated in README; check LICENSE file for details.

## Related
- [[flux]] — Base model (FLUX.1 Diffusion Transformer)
- [[comfyui]] — Alternative node-based UI for diffusion models
- [[disco-diffusion]] — Earlier text-to-image diffusion approach
