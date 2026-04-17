# LaVi-Bridge — ECCV 2024: Bridging Language & Vision Models for Text-to-Image Generation

**Source:** https://github.com/ShihaoZhaoZSH/LaVi-Bridge
**Paper:** https://arxiv.org/abs/2403.07860
**Project Page:** https://shihaozhaozsh.github.io/LaVi-Bridge/
**Pre-trained Weights:** https://huggingface.co/shihaozhao/LaVi-Bridge/tree/main

## Core Concept
- **Purpose:** A plug-and-play framework that bridges diverse pre-trained language models (LMs) and generative vision models for text-to-image diffusion.
- **Key Innovation:** Leverages **LoRA and adapters** to integrate models *without modifying their original weights*, enabling flexible, modular combinations.
- **Foundation:** Built upon the [cloneofsimo/lora](https://github.com/cloneofsimo/lora) repository.
- **Concurrent Work:** ELLA: Equip Diffusion Models with LLM for Enhanced Semantic Alignment (arxiv.org/abs/2403.05135)

## Supported Model Combinations
Pre-trained LoRA & adapter weights available on HuggingFace:
- `T5-Large + U-Net(SD)` — T5 encoder with Stable Diffusion U-Net
- `Llama-2 + U-Net(SD)` — Llama-2-7b LLM with Stable Diffusion U-Net
- `T5-Large + Transformer(PixArt)` — T5 encoder with PixArt Transformer backbone

## Setup & Installation
```bash
conda env create -f environment.yaml
conda activate lavi-bridge
```

## Inference
- Location: `./test/` directory
- Run: `cd test && bash run.sh`
- Config: Modify `.py` script, `--ckpt_dir` (LoRA/adapters path), `--output_dir`
- Llama-2 requirement: Download from llama.meta.com, uncomment `--llama2_dir` in run.sh

## Training
- Location: `./train/` directory
- Run: `cd train && bash run.sh`
- Key args: `--anno_path` (caption file), `--output_dir` (trained weights), `--llama2_dir` (for Llama-2 combos)
- Alternative encoders: CLIP, T5-Small, T5-Base, U-Net(LDM) via modifying `./train/t5_unet.py`

## Data Preparation
- Caption file format: Tab-separated lines of `image_path\tcaption`
- Recommended: COCO2017 & JourneyDB datasets (custom datasets supported)

## Repository Structure
- `figs/` — Figures and diagrams
- `modules/` — Core module implementations
- `test/` — Inference scripts
- `train/` — Training scripts
- `environment.yaml` — Conda environment spec
- `LICENSE` — License file

## Citation
Refer to the official ArXiv paper (arxiv.org/abs/2403.07860) for academic attribution.
