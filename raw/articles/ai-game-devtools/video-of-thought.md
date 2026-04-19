# Video-of-Thought (VoT) — ICML 2024 Oral

**Source:** https://github.com/scofield7419/Video-of-Thought
**Paper:** https://arxiv.org/abs/2501.03230
**Conference:** ICML (Oral) 2024
**License:** BSD (Apache 2.0 for Noncommercial use)

## Abstract

Video-of-Thought (VoT) is the first video Chain-of-Thought reasoning framework that decomposes complex video QA problems into a chain of sub-problems, reasoning step-by-step from low-level pixel perception to high-level cognitive understanding.

## Key Components

### MotionEpic — Video MLLM
- **Backbone:** Vicuna-7B (v1.5) LLM
- **Visual Encoder:** ViT-L/14 (CLIP)
- **Projector:** Q-Former
- **Novel Feature:** Supports Spatial-Temporal Scene Graph (STSG) encoding via retrofitted Graph Transformer with recurrent propagation
- **Capabilities:** Video input + STSG encoding, understanding, and generation
- **Training:** Two-stage — pretrain (alignment) + finetune

### Video-of-Thought Reasoning Framework (5 Steps)
1. **Task Definition & Target Identification** — Identify what the question is asking and what targets/objects are involved
2. **Object Tracking** — Generate partial STSG expressions to track involved objects across frames
3. **Action Analyzing** — Analyze motion behavior using STSG + commonsense reasoning
4. **Question Answering via Ranking** — Generate candidate answers with rationality scores (1-10), rank them
5. **Answer Verification** — Verify answer against (a) pixel grounding facts and (b) cognitive consistency with inferred actions

## Architecture
- `motionepic/` — Core model package
  - `model/motionepic_arch.py` — Main architecture: MotionEpicMetaModel + MotionEpicMetaForCausalLM
  - `model/multimodal_encoder/` — CLIP encoder + STSG encoder
  - `model/multimodal_projector/` — Linear/Q-Former projectors
  - `model/language_model/motionepic_llama.py` — LLaMA-based language model
  - `dataset/` — Dataset loaders (base, concat, sampler, catalog)
  - `conversation.py` — Vicuna-style conversation templates
  - `mm_utils.py` — Multimodal tokenization utilities
- `predict.py` — Cog Predictor interface with 5-step VoT reasoning pipeline
- `train.py` / `train_mem.py` — Training scripts
- `motionepic_trainer.py` — Custom trainer with DeepSpeed integration

## Training Pipeline
- **Datasets:** Action Genome, WebVid, MSR-VTT, ActivityNet, NExT-QA
- **Pretrain:** `bash pretrain.sh` — alignment learning
- **Finetune:** `bash finetune.sh` — task-specific fine-tuning
- **DeepSpeed:** Supports ZeRO-2/ZeRO-3/ZeRO-3 Offload configs

## Inference
- Cog-based Predictor with `cot_reasoning()` method chaining all 5 steps
- Video reading: CV2-based frame sampling (configurable FPS, max 8 frames, 320×576)
- Generation: top-p=1.0, temperature=0.2, max_new_tokens=512

## Tech Stack
- Python 3.8, PyTorch 2.1.2, CUDA 11.6/12.1
- Transformers 4.42.0, PEFT 0.12.0, DeepSpeed 0.13.1
- Diffusers 0.30.0, DGL (Graph Neural Networks)
- Gradio 3.44.0 for demos

## Dependencies
Based on: NExT-GPT architecture + graphtransformer

## Relevance to AI Game Dev
Video reasoning with step-by-step chain-of-thought can be applied to:
- Game cutscene understanding and QA
- NPC behavioral analysis from gameplay footage
- Automated game testing via video observation
- Sports/esports video analysis
