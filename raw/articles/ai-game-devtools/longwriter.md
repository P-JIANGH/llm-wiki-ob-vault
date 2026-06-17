# LongWriter - AI Game DevTools Source

## Project Info
- **Name:** LongWriter
- **URL:** https://github.com/THUDM/LongWriter
- **Category:** LLM (LLM & Tool)
- **Date captured:** 2026-04-14

## Overview
LongWriter is an open-source project that enables 10,000+ word generation from long context LLMs. It provides both a deployable model (LongWriter-glm4-9b, LongWriter-llama3.1-8b) and an automated ultra-long output data construction pipeline called AgentWrite.

## Key Components

### 1. Models
- **LongWriter-glm4-9b**: Based on GLM-4-9B, pointing to "LongWriter-9B-DPO" in paper
- **LongWriter-llama3.1-8b**: Based on Meta-Llama-3.1-8B, pointing to "LongWriter-8B" in paper
- **LongWriter-Zero-32B**: Trained with pure RL, no synthetic data needed, beats DeepSeek-R1/Qwen3 on long-form writing

### 2. AgentWrite Pipeline (`agentwrite/`)
Automated ultra-long output data construction pipeline:
- `plan.py`: Generates writing plan
- `write.py`: Executes the final long-form writing
- Configure API key in files to run

### 3. Training (`train/`)
- Uses **LongWriter-6k** dataset (HuggingFace: THUDM/LongWriter-6k)
- Code based on [LongAlign](https://github.com/THUDM/LongAlign)
- Requires FlashAttention 2
- `transformers==4.43.0` for Llama-3.1 training

### 4. Evaluation (`evaluation/`)
Two benchmarks:
- **LongBench-Write**: Measures long output quality and length
- **LongWrite-Ruler**: Lightweight stress test for maximum output length
- `pred.py`: Generate model responses
- `eval_quality.py`: Evaluate quality score (S_q) using GPT-4o
- `eval_length.py`: Evaluate length score (S_l)

### 5. Inference
- `trans_web_demo.py`: Web chatbot deployment
- `vllm_inference.py`: vLLM deployment for fast generation (10,000+ words/minute)

## File Structure
```
longwriter/
├── agentwrite/        # AgentWrite pipeline (plan.py, write.py, dataset.py)
├── train/            # Training code (main.py, trainer.py, patch/)
├── evaluation/       # Benchmarks (pred.py, eval_quality.py, eval_length.py)
├── trans_web_demo.py # Web demo
├── vllm_inference.py # vLLM inference
├── requirements.txt
└── README.md
```

## Tech Stack
- Framework: Transformers (>=4.43.0), PyTorch
- Acceleration: FlashAttention 2, vLLM
- Training: DeepSpeed / standard HuggingFace Trainer
- Data: LongWriter-6k dataset on HuggingFace

## Use Cases (for AI Game DevTools)
- Generate long-form game narratives, quest descriptions, dialogue trees
- Create extensive quest logs, lore documents, in-game encyclopedia content
- Produce detailed game design documents
- Write character backstories and dialogue for RPGs
