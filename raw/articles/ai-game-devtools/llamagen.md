# LlamaGen — Autoregressive Model Beats Diffusion

**Source:** https://github.com/FoundationVision/LlamaGen
**Captured:** 2026-04-17

## Overview
LlamaGen is a family of image generation models that apply the original "next-token prediction" paradigm of large language models to the visual generation domain. It demonstrates that vanilla autoregressive models (like Llama) without visual-specific inductive biases can achieve state-of-the-art image generation performance when scaled properly.

## Paper
- **Title:** Autoregressive Model Beats Diffusion: Llama for Scalable Image Generation
- **Authors:** Peize Sun, Yi Jiang, Shoufa Chen, Shilong Zhang, Bingyue Peng, Ping Luo, Zehuan Yuan
- **Affiliation:** HKU, ByteDance
- **arXiv:** 2406.06525
- **Project Page:** https://peizesun.github.io/llamagen/

## Key Architecture

### VQ-VAE Tokenizers
- **vq_ds16_c2i:** 72M params, 16x16 token grid, rFID 2.19 (256x256)
- **vq_ds8_c2i:** 70M params, 32x32 token grid, rFID 0.59 (256x256)
- Codebook size: 16384, embedding dim: 8

### Autoregressive Models (Class-conditional on ImageNet)
| Model | Params | Training | Tokens | FID (256x256) |
|-------|--------|----------|--------|---------------|
| LlamaGen-B | 111M | DDP | 16x16 | 5.46 |
| LlamaGen-L | 343M | DDP | 24x24 | 3.07 |
| LlamaGen-XL | 775M | DDP | 24x24 | 2.62 |
| LlamaGen-XXL | 1.4B | FSDP | 24x24 | 2.34 |
| LlamaGen-3B | 3.1B | FSDP | 24x24 | 2.18 |

### Text-conditional Models
- **LlamaGen-XL:** 775M params, trained on LAION COCO (50M) + internal data (10M)
- Two-stage training: 256px (stage 1) → 512px (stage 2)

## Key Findings
1. **Autoregressive beats diffusion** — vanilla next-token prediction outperforms diffusion models for image generation when properly scaled
2. **Scaling matters** — FID improves monotonically from 111M (5.46) to 3B (2.18) parameters
3. **Tokenizer quality matters** — VQ-VAE with ds8 (0.59 rFID) outperforms ds16 (2.19 rFID)
4. **vLLM support** — 300-400% speedup via vLLM serving framework

## Technical Stack
- **Framework:** PyTorch >= 2.1.0
- **Training:** DDP (small models) / FSDP (large models)
- **Serving:** vLLM for inference acceleration
- **UI:** Gradio for demos
- **License:** MIT

## Project Structure
- `autoregressive/` — AR model code (models, train, sample, serve)
- `tokenizer/` — VQ-VAE image tokenizer implementation
- `language/` — Language model integration for text-conditional generation
- `dataset/` — Dataset handling
- `evaluations/` — Evaluation scripts
- `scripts/` — Training/sampling shell scripts
- `tools/` — Utility tools (ImageNet class labels)
- `utils/` — Common utilities

## Demos
- HuggingFace Spaces: https://huggingface.co/spaces/FoundationVision/LlamaGen
- Gradio local: `python app.py`
- vLLM serving with 300-400% speedup
