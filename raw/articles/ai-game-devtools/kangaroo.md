# Kangaroo: A Powerful Video-Language Model Supporting Long-context Video Input

## Source
- GitHub: https://github.com/KangarooGroup/Kangaroo
- HuggingFace: https://huggingface.co/KangarooGroup/kangaroo
- Paper: https://arxiv.org/pdf/2408.15542
- Blog: https://kangaroogroup.github.io/Kangaroo.github.io/

## Overview
Kangaroo is an 8B parameter Video-Language Model (Video LMM) capable of processing long videos up to 160 frames (22k tokens). It achieves SOTA performance among open-source models on video understanding benchmarks including Video-MME, VideoVista, LongVideoBench, and SeedBench-Video. Supports bilingual Chinese/English conversation and multi-round dialogue.

## Architecture
- Backbone: LLM-based vision-language model with gradual curriculum training
- Training: Data curation pipeline for high-quality video captions; curriculum training with gradually increasing resolution and frame count
- Max frames: 160 frames per video input
- Max sequence length: ~22k tokens

## Key Files
- `streamlit_app.py`: Web UI demo using Streamlit for video question-answering
- `chat.ipynb`: Jupyter notebook for multi-round chat with 🤗 Transformers
- `requirements.txt`: Dependencies (torch 2.1.1, transformers 4.41.0, decord, timm, xformers, streamlit 1.36.0)

## Tech Stack
- PyTorch 2.1.1 / torchvision 0.16.1
- Transformers 4.41.0
- Decord (video loading)
- timm (vision backbones)
- xformers
- Streamlit 1.36.0 (web UI)
- flash-attn

## Benchmarks
- Video-MME: SOTA among 7B/8B models, outperforms most 10B+ models
- VideoVista: SOTA among open-source models
- LongVideoBench: Better than existing open-source methods
- SeedBench-Video: Competitive results

## Evaluation Results (2024)
- 2024/08/29: Paper submitted to Arxiv
- 2024/08/05: LongVideoBench results submitted
- 2024/07/24: VideoVista leaderboard results
- 2024/07/23: Video-MME benchmark results
- 2024/07/17: Model and blog released

## Authors
Liu Jiajun, Wang Yibing, Ma Hanghang, Wu Xiaoping, Ma Xiaoqi, Wei Xiaoming, Jiao Jianbin, Wu Enhua, Hu Jie
