# ShareGPT4V - Raw Source

## Source
- **URL**: https://github.com/ShareGPT4Omni/ShareGPT4V
- **Paper**: https://arxiv.org/pdf/2311.12793.pdf
- **HuggingFace Dataset**: https://huggingface.co/datasets/Lin-Chen/ShareGPT4V
- **Models**: [ShareGPT4V-7B](https://huggingface.co/Lin-Chen/ShareGPT4V-7B), [ShareCaptioner](https://huggingface.co/Lin-Chen/ShareCaptioner)
- **License**: Apache 2.0 (code), CC BY NC 4.0 (data)
- **Published**: ECCV 2024

## Key Facts
- Authors: Lin Chen, Jinsong Li, Xiaoyi Dong, Pan Zhang, Conghui He, Jiaqi Wang, Feng Zhao, Dahua Lin
- Institutes: USTC, Shanghai AI Laboratory
- 100K GPT4-Vision-generated captions + 1.2M high-quality captions via ShareCaptioner

## Architecture
- Base: LLaVA codebase
- LLM: Vicuna-7B / Vicuna-13B
- Vision Encoder: CLIP-L-336px (fine-tuned L12)
- Projector: MLP-2x
- Two-stage training: feature alignment (pretrain) → visual instruction tuning (finetune)

## Model Performance (Benchmark Results)

| Model | LLaVA-Bench-Wild | MME-perception | MMBench | MM-Vet | VQA-v2 |
|-------|-----------------|----------------|---------|--------|--------|
| ShareGPT4V-7B | 72.6 | 1567.4 | 68.8 | 37.6 | 80.6 |
| ShareGPT4V-13B | 79.9 | 1618.7 | 68.5 | 43.1 | 81.0 |

## Core Components
- `share4v/model/builder.py` - `load_pretrained_model()` for loading checkpoints
- `share4v/mm_utils.py` - multimodal utilities
- `share4v/eval/run_share4v.py` - `eval_model()` for inference
- `share4v/model/multimodal_encoder/` - CLIP vision encoder
- `share4v/model/multimodal_projector/` - MLP projector
- `share4v/model/language_model/` - Vicuna LLM
- `tools/share-cap_batch_infer.py` - batch caption generation with ShareCaptioner
- `tools/app.py` - local Gradio demo

## Training Details
- Pretraining: 1 epoch, global batch 256, lr 2e-5, max_len 2048, 16x A100-80G ~12h
- Finetuning: 1 epoch, global batch 128, lr 2e-5, max_len 2048, 16x A100-80G ~7h
- ShareGPT4V-PT dataset: 1.2M image-text pairs with ShareCaptioner-generated captions
- ShareGPT4V-SFT dataset: 665K + 23K captions for instruction tuning

## Related Works (from authors)
- MMStar: vision-indispensable multi-modal benchmark
- ShareGPT4Video: video caption dataset (40K GPT4V + 4.8M ShareCaptioner, 300h+3000h video)
- ShareGPT4Omni: multimodal foundation model series
