# SoTaNa: An Open-Source Software Engineering Instruction-Tuned Model

Source: https://github.com/DeepSoftwareAnalytics/SoTaNa

## Overview

SoTaNa (Software Engineering Task-Tuned Assistant) is an open-source instruction-tuned LLM for software engineering tasks. It is built on top of LLaMA and fine-tuned using LoRA (Low-Rank Adaptation) on generated software engineering instruction data.

## Architecture

- **Base model**: LLaMA (7B / 13B / 30B)
- **Fine-tuning method**: LoRA (Parameter-Efficient Fine-Tuning)
- **Training**: PEFT library with LoRA on generated SE instruction data
- **Framework**: PyTorch + Transformers + PEFT

## Key Modules

### Data Generation (`data-generation/`)
- `generate_data.py` — generates software engineering instruction data
- `generation_data.sh` — batch generation script
- Output: `data_0.json` / `data_1.json` (merged via `merge_data.py`)
- Based on `se_seed_tasks.json` seed tasks

### Fine-Tuning (`fine-tuning/`)
- `fine-tuning.py` — LoRA fine-tuning pipeline
- Uses `LoraConfig` from PEFT
- Supports 7B / 13B / 30B LLaMA models
- Training params: lora_r=8, lora_alpha=16, lora_dropout=0.05, target_modules=[q_proj, v_proj]

### Inference (`inference/`)
Three inference pipelines:
1. **Stack Overflow Q&A** (`stackoverflow-question-answering/`) — answers Stack Overflow questions
2. **Code Generation** (`code-generation/`) — generates code from prompts (HumanEval dataset)
3. **Code Summarization** (`code-summarization/`) — summarizes code into natural language (TLCodeSum dataset)

### Metrics (`inference/metric/`)
- BLEU variants: nltk_bleu, google_bleu, rencos_bleu, codenn_bleu, codebert_bleu
- ROUGE, CIDER, METEOR

## Training Results

| Model | # LLaMA Param | # LoRA Param | Training Time |
|-------|---------------|--------------|---------------|
| SoTaNa-7B  | 7B    | 8.4M   | 25h35m |
| SoTaNa-13B | 13B   | 13.1M  | 39h10m |
| SoTaNa-30B | 30B   | 25.6M  | 48h02m |

## WebUI

- `webui/generate.py` — Gradio-based web interface
- `webui/templates/sotana.json` — prompt template
- `webui/utils/` — prompter, callbacks, utilities

## Environment Setup

```bash
conda create -n sotana python=3.9 -y
conda activate sotana
pip install datasets==2.11.0 loralib==0.1.1 sentencepiece==0.1.97
pip install bitsandbytes==0.37.2 torch==2.0.0 gradio==3.20.1 nltk==3.8.1
pip install prettytable==3.7.0 wandb==0.14.2 fire==0.5.0
pip install openai==0.27.9
pip install git+https://github.com/huggingface/peft.git@e536616888d51b453ed354a6f1e243fecb02ea08
pip install git+https://github.com/huggingface/transformers.git@fe1f5a639d93c9272856c670cff3b0e1a10d5b2b
```

## File Structure

```
sotana/
├── README.md
├── data-generation/
│   ├── generate_data.py
│   ├── generation_data.sh
│   ├── se_seed_tasks.json
│   └── output/100000/
├── fine-tuning/
│   ├── fine-tuning.py
│   └── fine-tuning.sh
├── inference/
│   ├── stackoverflow-question-answering/
│   ├── code-generation/
│   ├── code-summarization/
│   └── metric/ (bleu, rouge, cider, meteor)
└── webui/
    ├── generate.py
    └── templates/sotana.json
```

## Key Papers / References

- Appendix.pdf in repository
- HuggingFace checkpoints: Enoch/SoTana-7B-lora-100000, Enoch/SoTana-13B-lora-100000, Enoch/SoTana-30B-lora-100000
