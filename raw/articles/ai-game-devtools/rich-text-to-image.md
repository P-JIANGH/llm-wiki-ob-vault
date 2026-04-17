# Rich-Text-to-Image — Source Analysis

**Source:** https://github.com/SongweiGe/rich-text-to-image
**Paper:** https://arxiv.org/abs/2304.06720 (ICCV 2023)
**Analyzed:** 2026-04-17

## README Summary

**Expressive Text-to-Image Generation with Rich Text**
Authors: Songwei Ge (UMD), Taesung Park (Adobe), Jun-Yan Zhu (CMU), Jia-Bin Huang (UMD)

Uses rich text formatting information (font size, color, style, footnote) to increase control of text-to-image generation. Enables:
- Explicit token reweighting (font size → token weight in cross-attention)
- Precise color rendering (font color → object color control via gradient guidance)
- Local style control (font style → artistic style per region)
- Detailed region synthesis (footnote → supplementary descriptions per token)

### Key Features
- Two-stage pipeline: (1) plain text → cross-attention token maps, (2) region-based diffusion with rich-text attributes
- Supports SD 1.5, SDXL, Animagine-XL
- Gradio local demo + HuggingFace Space demo
- A1111 WebUI extension available
- LoRA checkpoint support (lora branch)
- Quill-based rich-text editor → JSON format

### Architecture
- `RegionDiffusion` (SD 1.5) / `RegionDiffusionXL` (SDXL/Animagine-XL): Core model classes
- Cross-attention hook registration for token map extraction
- Self-attention injection for detail preservation from plain-text generation
- Gradient guidance for precise color control (MSE loss on region RGB)
- Mask-based region diffusion: each region gets separate text embedding + attention mask

### Key Files
- `models/region_diffusion.py` — Core SD 1.5 region diffusion with hooks (493 lines)
- `models/region_diffusion_sdxl.py` — SDXL variant
- `utils/richtext_utils.py` — JSON parsing, color/size/style conversion (234 lines)
- `utils/attention_utils.py` — Token map extraction via cross/self-attention
- `sample.py` — CLI sampling script
- `gradio_app.py` — Gradio web UI with rich-text editor iframe
- `evaluation/` — Style & color benchmark scripts

### Dependencies
- Python 3.8, PyTorch 1.13.1, CUDA 11.7
- diffusers 0.18.2, transformers 4.27.0, gradio 3.24.1
- openai/CLIP, einops, imageio, scikit-image

### License
MIT

### Links
- Project Page: https://rich-text-to-image.github.io/
- Paper: https://arxiv.org/abs/2304.06720
- HuggingFace Demo: https://huggingface.co/spaces/songweig/rich-text-to-image
- A1111 Extension: https://github.com/songweige/sd-webui-rich-text
