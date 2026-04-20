# StoryDiffusion - Raw Source

**Source:** https://github.com/HVision-NKU/StoryDiffusion
**Cloned:** 2026-04-20
**Paper:** arXiv 2405.01434, NeurIPS 2024

## README Summary

**Full Title:** StoryDiffusion: Consistent Self-Attention for Long-Range Image and Video Generation

**Authors:** Yupeng Zhou, Daquan Zhou, Ming-Ming Cheng, Jiashi Feng, Qibin Hou

**Key Features:**
1. **Consistent Self-Attention** — Character-consistent image generation over long-range sequences. Hot-pluggable, compatible with all SD1.5 and SDXL-based diffusion models. Requires ≥3 text prompts (recommended 5-6) for layout arrangement.
2. **Motion Predictor** — Long-range video generation by predicting motion between Condition Images in compressed semantic space, enabling larger motion prediction.

**Use Cases:**
- Comics generation from text prompts with character consistency
- Two-stage long video generation (consistent images → seamless transitions)
- Image-to-Video from sequence of condition images
- Short video generation

**Tech Stack:**
- PyTorch >= 2.0.0, Python >= 3.8
- diffusers==0.25.0, transformers==4.36.2
- Gradio 4.22.0 UI
- xformers for memory-efficient attention
- PEFT (LoRA adapters)

**Supported Base Models (config/models.yaml):**
- Juggernaut-XL-v9 (SDXL-based, single safetensors file)
- RealVisXL_V4.0 (SDXL-based)
- Stable Diffusion XL base 1.0
- sdxl-unstable-diffusers-y

**Demos:**
- HuggingFace Spaces Comic Generation Demo
- Google Colab Notebook (Comic_Generation.ipynb)
- Replicate deployment
- Local Gradio demo (low VRAM version tested on 24GB A10)

**Code Structure:**
- `storydiffusionpipeline.py` — Main StoryDiffusion pipeline
- `gradio_app_sdxl_specific_id_low_vram.py` — Low VRAM Gradio demo (1346 lines)
- `utils/pipeline.py` — PhotoMakerStableDiffusionXLPipeline (588 lines): extends SDXL pipeline with PhotoMaker ID encoder + LoRA adapter loading, trigger word token insertion, batch prompt encoding with consistent self-attention
- `utils/gradio_utils.py` — Attention processors (AttnProcessor2_0), SpatialAttnProcessor2_0 for consistent ID across panels, attention mask/index calculation
- `utils/style_template.py` — Comic style templates (e.g., "Japanese Anime" default)
- `utils/utils.py` — Comic layout utilities
- `utils/load_models_utils.py` — Model loading from YAML config
- `Comic_Generation.ipynb` — Jupyter notebook for comic generation
- `config/models.yaml` — Model registry (4 SDXL variants)

**Architecture Details:**
- Extends `StableDiffusionXLPipeline` from diffusers
- PhotoMaker integration: `load_photomaker_adapter()` loads ID encoder + LoRA weights from safetensors
- Trigger word mechanism: adds special token to tokenizer, locates class word position for identity injection
- `SpatialAttnProcessor2_0` — Custom attention processor for consistent character identity across multiple generated images
- Supports batch prompt processing (multiple story panels in single forward pass)
- Delayed conditioning: encodes prompts with and without trigger word, merges at `start_merge_step`

**TODO (from README):**
- [ ] Source code of Video Generation Model
- [ ] Pretrained weight of Video Generation Model

**License:** Not explicitly stated in README (no LICENSE file content checked)

## Key Source: utils/pipeline.py

`PhotoMakerStableDiffusionXLPipeline` extends `StableDiffusionXLPipeline`:
- `load_photomaker_adapter()` — Loads PhotoMaker ID encoder weights and LoRA adapter from HuggingFace Hub
- `encode_prompt_with_trigger_word()` — Finds trigger word token position, expands class token for N ID images, generates class_tokens_mask
- `__call__()` — Batch processes multiple prompts (story panels), encodes each with ID embedding, concatenates all embeddings, runs denoising loop with consistent self-attention

## Key Source: gradio_app_sdxl_specific_id_low_vram.py

- Gradio UI with character definition, prompt list input, style selection
- `SpatialAttnProcessor2_0` — Custom attention processor implementing consistent self-attention across panels
- Low VRAM optimization: processes panels sequentially with garbage collection
- Comic panel layout generation with configurable grid
