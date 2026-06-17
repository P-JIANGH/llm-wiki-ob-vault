# MiniGPT-4 / MiniGPT-v2 — Source Summary

## Project Overview
- **Name**: MiniGPT-4 / MiniGPT-v2 (unified repo)
- **Org**: Vision-CAIR, King Abdullah University of Science and Technology (KAUST)
- **URL**: https://github.com/Vision-CAIR/MiniGPT-4
- **License**: BSD 3-Clause License

## Two Models in One Repo

### MiniGPT-4 (2023)
- Vision-language model connecting a frozen ViT encoder + Q-Former to a frozen LLM (Vicuna or LLaMA-2)
- Two-stage training: (1) pretraining on Laion/CC image-text pairs, (2) finetuning on curated high-quality dataset
- After stage 2, generates coherent conversational descriptions of images
- Can solve problems, write stories, poems, ads from images

### MiniGPT-v2 (2023, Oct)
- Major update — unified interface for multi-task vision-language learning
- Based on Llama2 Chat 7B
- Better multi-task performance than v1

## Architecture
- **ViT encoder**: frozen, paired with Q-Former (BLIP-2 style)
- **LLM**: Vicuna v0 (7B/13B) or Llama-2 Chat 7B
- **Q-Former**: 32 query tokens
- **Projection**: single linear layer maps Q-Former output → LLM embedding space
- **Image size**: 224×224

## Training
- **Stage 1**: 4×A100, image-text pairs from Laion + CC datasets
- **Stage 2**: 1×A100, curated conversational pairs for alignment
- Finetuning code also available separately

## Key Dependencies
- BLIP-2 architecture (from Salesforce Lavis)
- Vicuna (from FastChat/LM-SYS)
- LLaMA 2 (Meta)
- Conda environment: `minigptv` (environment.yml)

## Files
- `demo.py` / `demo_v2.py`: local demo scripts
- `train.py`: training entry point
- `minigpt4/models/`: model architecture (minigpt4.py, QFormer, ViT wrapper)
- `minigpt4/configs/`: model and data configs
- `minigpt4/datasets/`: dataset loaders
- `eval_configs/`: evaluation configs
- `train_configs/`: training configs (stage1_pretrain, stage2_finetune)

## Community Projects Built on MiniGPT-4
- InstructionGPT-4: fine-tuning with 200 instructions
- SkinGPT-4: dermatology diagnostics
- ArtGPT-4: artistic vision-language understanding
- PatFig: patent figure captioning
