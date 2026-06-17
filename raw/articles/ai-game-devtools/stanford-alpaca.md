# Stanford Alpaca — Source

**URL:** https://github.com/tatsu-lab/stanford_alpaca
**Cloned:** 2026-04-14
**Source:** GitHub (gitcode.com mirror)

## Overview

Stanford Alpaca is an instruction-following LLaMA model fine-tuned on 52K self-generated instruction-following data. The project aimed to build and share an open-source alternative to proprietary instruction-following models.

## Key Components

### Data Generation (`generate_instruction.py`)
- Builds on the Self-Instruct pipeline from [Yizhong Wang et al.]
- Uses `text-davinci-003` (not plain `davinci`) for generation
- Batch decoding: generates 20 instructions at once to reduce cost
- Uses `seed_tasks.jsonl` as seed instructions (~252 tasks)
- Filters for diversity: discards instructions with ROUGE-L similarity > 0.7 to existing ones
- Produced 52K examples at estimated cost < $500
- Output: `alpaca_data.json` — 52K entries with `instruction`, `input`, `output` fields

### Training (`train.py`)
- Standard Hugging Face training code
- Supervised fine-tuning (SFT) on `alpaca_data.json`
- Supports LLaMA-7B, LLaMA-13B, and OPT models
- Uses FSDP (Fully Sharded Data Parallel) for distributed training
- Max length: 512 tokens
- Hyperparameters:
  - LLaMA-7B: lr=2e-5, epochs=3, batch=128 (effective)
  - LLaMA-13B: lr=1e-5, epochs=5, batch=128 (effective)
- Memory optimization: DeepSpeed Stage 3, LoRA support
- Training data format: `### Instruction:\n{instruction}\n### Input:\n{input}\n### Response:\n{output}`

### Weight Recovery (`weight_diff.py`)
- Weight diff hosted at HuggingFace: `tatsu-lab/alpaca-7b-wdiff`
- Recovers full Alpaca-7B weights from LLaMA-7B + weight diff
- Run: `python weight_diff.py recover --path_raw <llama_hf_dir> --path_diff <diff_dir> --path_tuned <output_dir>`

## Data Format (alpaca_data.json)
```json
{"instruction": "...", "input": "...", "output": "..."}
```
- ~40% of examples have non-empty `input` field
- ~60% have empty `input` (just instruction)
- All 52K instructions are unique

## Key Files
| File | Purpose |
|------|---------|
| `train.py` | SFT training script (HF Trainer, FSDP) |
| `generate_instruction.py` | Self-Instruct data generation via OpenAI API |
| `alpaca_data.json` | 52K instruction-following dataset |
| `weight_diff.py` | Weight recovery script |
| `utils.py` | OpenAI API helpers, JSON utilities |
| `prompt.txt` | GPT prompt for instruction generation |
| `seed_tasks.jsonl` | 252 seed tasks for bootstrapping |
| `requirements.txt` | Dependencies |

## Architecture Notes
- Base model: LLaMA (7B or 13B) from Meta
- Fine-tuning method: Standard causal LM SFT (not RLHF, not DPO)
- Training framework: Hugging Face Transformers + PyTorch FSDP
- No quantization in training; bf16 mixed precision

## License
- Code: Apache 2.0
- Data: CC BY-NC 4.0 (non-commercial only)
- Weight Diff: CC BY-NC 4.0 (non-commercial only)
- **Research use only** — not for commercial deployment

## Relationship to LLaMA and Self-Instruct
- Uses LLaMA as the base model (from Meta's release)
- Uses Self-Instruct paper's data generation methodology with modifications
- Alpaca data was generated using `text-davinci-003` API calls
- Did NOT release full model weights initially due to LLaMA's terms

## Historical Significance
- Released March 2023 by Stanford CRFM
- One of the first open instruction-following models based on LLaMA
- Sparked the "Alpaca ecosystem" — many derivatives (Vicuna, Guanaco, etc.)
- Demonstrated that fine-tuning on synthetic instruction data could match proprietary models
- Live demo was suspended after safety concerns
