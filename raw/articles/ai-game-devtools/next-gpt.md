# NExT-GPT — Raw Source

> Source: https://github.com/NExT-GPT/NExT-GPT
> Cloned: ~/tmp/ai-game-devtools/next-gpt
> Date: 2026-04-14

## README Summary

**NExT-GPT: Any-to-Any Multimodal LLM**

- Authors: Shengqiong Wu, Hao Fei*, Leigang Qu, Wei Ji, Tat-Seng Chua — NExT++ Research Center, National University of Singapore
- Published: ICML 2024, Oral Paper
- License: BSD 3-Clause
- GitHub: https://github.com/NExT-GPT/NExT-GPT
- Paper: https://arxiv.org/pdf/2309.05519
- Project page: https://next-gpt.github.io/

**Description:**
The first end-to-end MM-LLM that perceives input and generates output in arbitrary combinations (any-to-any) of text, image, video, and audio and beyond. Built on top of existing pretrained LLM + multimodal encoder + SoTA diffusion models, with end-to-end instruction tuning.

## Architecture (3 Stages)

1. **Multimodal Encoding Stage**: Uses ImageBind (unified image/video/audio encoder) to encode inputs in various modalities. Representations projected into language-like representations via a projection layer.

2. **LLM Understanding & Reasoning Stage**: Uses Vicuna-7B as the core LLM for semantic understanding and reasoning. LLM produces text tokens AND unique "modality signal" tokens that instruct decoding layers what modal content to output.

3. **Multimodal Generation Stage**: Transformer-based output projection layers map signal token representations to modality-specific decoders:
   - Image: Stable Diffusion v2
   - Audio: AudioLDM (l-full)
   - Video: ZeroScope v2_576w

## Training Pipeline (3 Steps)

- **Step-1**: Encoding-side LLM-centric Multimodal Alignment — trains input projection layer, freezes ImageBind + LLM + output projectors
- **Step-2**: Decoding-side Instruction-following Alignment — trains output projection layers, freezes rest
- **Step-3**: Instruction Tuning — LoRA fine-tunes LLM + input/output projection layers on instruction dataset

## Code Structure

- `nextgpt/` — main package
  - `model/language_model/` — LLM backbone
  - `model/multimodal_encoder/` — ImageBind encoder
  - `model/multimodal_decoder/` — diffusion model decoders
  - `model/multimodal_projector/` — input/output projectors
  - `dataset/` — dataset handling, samplers, catalog
- `train.py`, `train_mem.py` — training scripts
- `predict.py` — inference script
- `scripts/` — shell scripts (pretrain_enc.sh, pretrain_dec.sh, finetune.sh) + DeepSpeed ZeRO configs

## Datasets Used

- T-X pairs: CC3M (text-image), WebVid (text-video), AudioCap (text-audio)
- Instruction data: LLaVA (visual), Alpaca (textual), VideoChat (video)
- T2M (T-T+X): proprietary T2M instruction dataset
- MosIT: multimodal instruction-following dataset

## Key Dependencies

- Python 3.8, PyTorch 2.1.2
- ImageBind (facebook/ImageBind)
- Vicuna-7B-v1.5
- Stable Diffusion 2, AudioLDM, ZeroScope
- DeepSpeed ZeRO (2/3/3+offload)
- LoRA (PEFT)

## Key Files

- `nextgpt/model/nextgpt_arch.py` — core model architecture
- `training_utils.py` — base training configuration
- `nextgpt/dataset/catalog.py` — dataset catalog
- `merge_lora_weights.py` — post-training LoRA merge
