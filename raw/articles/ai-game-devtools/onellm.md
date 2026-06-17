# OneLLM

> Source: https://github.com/csuhan/OneLLM
> Cloned: ~/tmp/ai-game-devtools/onellm/ (gitcode mirror)
> Date: 2026-04-14

## Overview

**OneLLM** (One Framework to Align All Modalities with Language) is a CVPR 2024 paper by Han et al. It proposes a unified framework that aligns 8 modalities (image, video, audio, point cloud, depth, normal map, IMU, fMRI) with language using a single LLM backbone (LLaMA-2 7B).

## Key Facts

- **Published**: CVPR 2024
- **Authors**: Han, Gong, Zhang, Wang, Zhang, Lin, Qiao, Gao, Yue
- **Model**: OneLLM-7B (LLaMA-2 7B backbone)
- **Modalities**: 8 — image, video, audio, point cloud, depth, normal, IMU, fMRI
- **License**: LLaMA 2 Community License

## Architecture

- **Unified Encoder**: Uses modality-specific encoders (ImageBind for 6 modalities, plus dedicated encoders for IMU and fMRI) that project into the LLM's embedding space
- **Modality-Aware Instruction Tuning**: Three-stage pretraining (image-text → multimodal-text → depth-normal-imu-fmri-text) + instruction tuning
- **Training**: Multi-node DDP with torchrun, SLURM support

## Modality Support

| Modality | Pretraining Data | Finetuning Data |
|---|---|---|
| Image | LAION-400M, LAION-COCO | LLaVA-mix665K, COCO Caption |
| Video | WebVid-2.5M | MSRVTT, Video Conversation |
| Audio | WavCaps | AudioCaps, Audio Conversation |
| Point | Cap3D | Point Conversation |
| Depth | CC3M | LLaVA-150K |
| Normal | CC3M | LLaVA-150K |
| IMU | Ego4D | Ego4D |
| fMRI | NSD | NSD |

## Demo & Deployment

- HuggingFace demo: csuhan/OneLLM
- Model: csuhan/OneLLM-7B on HuggingFace
- CLI demo: `demos/cli.py`
- Gradio demo: `demos/multi_turn_mm.py`

## Repository Structure
```
model/           # Model components (LLM, encoders, tokenizer)
data/            # Data loading (pretrain + finetune datasets)
demos/           # CLI and Gradio demos
exps/            # Training scripts (single/multi-node DDP, SLURM)
config/          # LLaMA2 config
docs/            # Data and evaluation docs
```
