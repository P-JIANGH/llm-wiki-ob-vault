# UltraEdit — Instruction-based Fine-Grained Image Editing at Scale

> Source: https://github.com/HaozheZhao/UltraEdit
> ArXiv: https://arxiv.org/abs/2407.05282
> Captured: 2026-04-18

## Project Overview

**UltraEdit** is a large-scale (~4M editing samples), automatically generated dataset for instruction-based image editing. It addresses drawbacks in existing image editing datasets like InstructPix2Pix and MagicBrush.

### Key Advantages
1. **Broader editing instructions**: Leverages LLM creativity + in-context editing examples from human raters
2. **Real image anchors**: Based on photographs and artworks — greater diversity and reduced bias vs. datasets solely from text-to-image models
3. **Region-based editing support**: High-quality, automatically produced region annotations

### Dataset Statistics
- **4M+ free-form** instruction-based image editing samples
- **100K+ region-based** image editing samples
- Data sources: real images (photographs, artworks) — not AI-generated

## Authors & Institutions

Haozhe Zhao*, Xiaojian Ma*, Liang Chen, Shuzheng Si, Rujie Wu, Kaikai An, Peiyu Yu, Minjia Zhang, Qing Li, Baobao Chang

Institutions: Peking University, BIGAI, UCLA, UIUC

## Architecture

### Two-Stage Training Pipeline
1. **Stage 1: Free-form image editing** — Fine-tune base model on 4M free-form samples
2. **Stage 2: Mix training** — Continue training with mixed free-form + region-based samples (mask channel added)

### Supported Base Models
- **Stable Diffusion 3** (SD3-Medium): Primary model, best performance
- **Stable Diffusion XL** (SDXL): Alternative training path
- **Stable Diffusion 1.5** (SD1.5): Lightweight option

### Key Modules

| Module | File | Description |
|--------|------|-------------|
| Gradio Demo | app.py | Web UI with mask drawing, free-form + region-based editing |
| Training (SD3) | training/train_sd3_pix2pix.py | ~73K LoC SD3 pix2pix training with mask support |
| Training (SDXL) | training/train_sdxl_pix2pix.py | ~62K LoC SDXL pix2pix training |
| Data Generation | data_generation/data_generation.py | ~51K LoC automated data generation pipeline |
| SDXL Pipeline | data_generation/sdxl_p2p_pipeline.py | ~89K LoC SDXL prompt-to-prompt pipeline |
| Processors | data_generation/processors.py | Image processing utilities |
| P2P Pipeline | data_generation/prompt_to_prompt_pipeline.py | Prompt-to-prompt editing pipeline |

### Data Generation Pipeline
- Uses **Grounded-Segment-Anything** for automatic region annotation
- LLM-generated editing instructions
- In-context examples from human raters
- Quality filtering and deduplication

### Inference Usage

```python
from diffusers import StableDiffusion3InstructPix2PixPipeline
from diffusers.utils import load_image

pipe = StableDiffusion3InstructPix2PixPipeline.from_pretrained(
    "BleachNick/SD3_UltraEdit_w_mask", torch_dtype=torch.float16
)
pipe = pipe.to("cuda")

# Region-based editing
image = pipe(
    "What if the horse wears a hat?",
    image=img,
    mask_img=mask_img,
    num_inference_steps=50,
    image_guidance_scale=1.5,
    guidance_scale=7.5,
).images[0]

# Free-form: use blank mask
# mask_img = PIL.Image.new("RGB", img.size, (255, 255, 255))
```

### Training Configuration

**SD3 Stage 1** (free-form):
- Batch size: 8, gradient accumulation: 4 (effective 32)
- Epochs: 5, LR: 5e-5, cosine scheduler
- Resolution: 512, mixed precision: fp16
- 8× GPU training

**SD3 Stage 2** (mixed with mask):
- Continues from Stage 1 checkpoint
- Epochs: 2, LR: 1e-5
- Mixes region-based and free-form data
- `--do_mask` flag enables mask channel

### Dependencies
- PyTorch 2.3.0+cu118, xformers
- Transformers 4.41.2, Diffusers (custom fork in repo)
- OpenAI CLIP, SentencePiece, OmegaConf
- Accelerate 0.31.0, Datasets 2.20.0

## Links
- GitHub: https://github.com/HaozheZhao/UltraEdit
- ArXiv: https://arxiv.org/abs/2407.05282
- HuggingFace Model: https://huggingface.co/BleachNick/SD3_UltraEdit_w_mask
- HuggingFace Dataset: https://huggingface.co/datasets/BleachNick/UltraEdit
- HuggingFace Dataset (500k): https://huggingface.co/datasets/BleachNick/UltraEdit_500k
- HuggingFace Demo: https://huggingface.co/spaces/jeasinema/UltraEdit-SD3
- Project Page: https://ultra-editing.github.io/

## License
No explicit LICENSE file found in repository. License commented out in README (MIT was considered but not finalized).

## Limitations (from authors)
- No NSFW checks conducted
- Weak on high-frequency details (facial expressions, text in images)
- Generation results sensitive to guidance scale
  - Free-form: lower guidance (~7.5) works better
  - Region-based: higher guidance works better
