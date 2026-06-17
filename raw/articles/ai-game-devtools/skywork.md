# Skywork

> GitHub: https://github.com/SkyworkAI/Skywork
> HuggingFace: https://huggingface.co/Skywork
> ModelScope: https://modelscope.cn/organization/Skywork
> ArXiv: http://arxiv.org/abs/2310.19341

## Project Overview

Skywork is a series of large language models developed by the **Kunlun Group · Skywork team**. The open-sourced models include:

- **Skywork-13B-Base**: Base model trained on 3.2T tokens (52.2% English, 39.6% Chinese, 8% code)
- **Skywork-13B-Chat**: Conversational model with enhanced creative writing capabilities
- **Skywork-13B-Math**: Math-specialized model; #1 on GSM8K among 13B-scale models
- **Skywork-13B-MM**: Multimodal model supporting image Q&A and dialogue
- **Skywork/Skypile-150B**: 600GB Chinese web dataset (~150B tokens), one of the largest open Chinese datasets

## Model Architecture

Compared to Llama-2-13B, Skywork-13B uses a thinner and deeper network:

| Parameter | Llama-2-13B | Skywork-13B |
|---|---|---|
| Vocab Size | 32,000 | **65,536** |
| Hidden Dim | 5,120 | 4,608 |
| FFN Dim | 13,696 | 12,288 |
| Num Heads | 40 | 36 |
| Num Layers | 40 | **52** |
| Seq Length | 4,096 | 4,096 |
| Positional Emb | RoPE | RoPE |

Key architectural details:
- **Tokenizer**: BPE, 65,536 vocab (32K Latin subwords + 8K Chinese chars/Unicode + 25,519 Chinese words + 17 reserved)
- **Training**: Two-stage (general → STEM) totaling 3.2T tokens
- **Quantization**: 8-bit via BitsAndBytes (bf16: 25.91GB → 8bit: 13.57GB GPU memory)

## Benchmark Results

### Skywork-13B-Base
| Benchmark | Score |
|---|---|
| C-Eval | 60.6 |
| CMMLU | 61.8 |
| MMLU | 62.1 |
| GSM8K | 55.8 |

### Skywork-13B-Math
| Benchmark | Score |
|---|---|
| GSM8K | **72.33** (#1 among 13B) |
| MATH | 16.98 |
| CMATH | **77.27** |

## Training Infrastructure

- **Framework**: Transformers + PyTorch 2.1 + DeepSpeed ZeRO
- **Fine-tuning**: Full-parameter SFT and LoRA supported
- **Training scripts**: `bash_scripts/skywork_13b_pt.sh`, `skywork_13b_sft.sh`, `skywork_13b_sft_lora.sh`
- **Evaluation**: Domain perplexity on Tech/Movie/Game/Finance domains; benchmark scripts in `eval/`
- **Data**: Skypile-150B dataset on HuggingFace (~150B Chinese tokens)

## License

**Skywork Community License** — commercial use permitted, with restrictions against harmful activities and unapproved internet deployment.

## Dependencies

```
tokenizers==0.14.0
transformers==4.34.0
torch==2.1.0
peft==0.5.0
datasets==2.14.1
```

## Ecosystem

- **Huawei Ascend**: Integrated into MindSpore MindFormers suite
- **MindSpore Platform**: Available on xihe.mindspore.cn

## Published

October 2023 (arxiv:2310.19341)
