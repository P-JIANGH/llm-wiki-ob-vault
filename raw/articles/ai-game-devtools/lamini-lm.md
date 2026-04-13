# LaMini-LM — Raw Source

## Basic Info
- **Project**: LaMini-LM: A Diverse Herd of Distilled Models from Large-Scale Instructions
- **URL**: https://github.com/mbzuai-nlp/LaMini-LM
- **Paper**: https://arxiv.org/abs/2304.14402
- **License**: Code — Apache 2.0 | Data — CC BY-NC 4.0
- **Authors**: Minghao Wu, Abdul Waheed, Chiyu Zhang, Muhammad Abdul-Mageed, Alham Fikri Aji
- **Affiliations**: MBZUAI (Mohamed bin Zayed University of Artificial Intelligence), UBC, Monash

## Overview
LaMini-LM is a collection of small-sized, efficient language models distilled from ChatGPT (gpt-3.5-turbo) and trained on a large-scale dataset of 2.58M instructions. It explores different model architectures, sizes, and checkpoints.

## Distillation Method
Sentence/offline distillation (Kim and Rush, 2016). Uses gpt-3.5-turbo to generate instruction-response pairs.

## Data Sources (2.58M pairs)
- self-instruct (Wang et al., 2022)
- P3 (Sanh et al., 2022)
- Flan (Longpre et al., 2023)
- Alpaca (Taori et al., 2023)

Data released at: https://huggingface.co/datasets/MBZUAI/LaMini-instruction

## Model Series

### T5-based
| Model | Size |
|-------|------|
| LaMini-T5-61M | 61M |
| LaMini-T5-223M | 223M |
| LaMini-T5-738M | 738M |

### Flan-T5-based (recommended models marked ✩)
| Model | Size |
|-------|------|
| LaMini-Flan-T5-77M ✩ | 77M |
| LaMini-Flan-T5-248M ✩ | 248M |
| LaMini-Flan-T5-783M ✩ | 783M |

### Cerebras-GPT-based
| Model | Size |
|-------|------|
| LaMini-Cerebras-111M | 111M |
| LaMini-Cerebras-256M | 256M |
| LaMini-Cerebras-590M | 590M |
| LaMini-Cerebras-1.3B | 1.3B |

### GPT-2-based (recommended models marked ✩)
| Model | Size |
|-------|------|
| LaMini-GPT-124M ✩ | 124M |
| LaMini-GPT-774M ✩ | 774M |
| LaMini-GPT-1.5B ✩ | 1.5B |

### GPT-Neo-based
| Model | Size |
|-------|------|
| LaMini-Neo-125M | 125M |
| LaMini-Neo-1.3B | 1.3B |

### Coming Soon
- GPT-J based
- LLaMA based

## Evaluation
- NLP benchmarks via lm-evaluation-harness (EleutherAI)
- 15 diverse NLP tasks: multiple-choice QA (OpenBookQA, SciQ, RACE, ARC-C, PIQA), extractive QA (ReCoRD), sentiment (SST), paraphrase (MRPC), NLI (RTE, MNLI), coreference (WSC, WinoGrande), WiC, HellaSwag
- Human evaluation on 114 user-oriented instructions
- Compared against Alpaca-7B and LLaMA-7B baselines

## Usage
Encoder-decoder models use `text2text-generation` pipeline.
Decoder-only models require an instruction wrapper prompt template:
```
Below is an instruction that describes a task. Write a response that appropriately completes the request.

### Instruction:
{instruction}

### Response:
```

## Models on HuggingFace
All models hosted at: https://huggingface.co/MBZUAI/
