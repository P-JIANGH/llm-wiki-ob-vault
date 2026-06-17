# LLaVA++ Source Material

> Cloned from: https://github.com/mbzuai-oryx/LLaVA-pp
> Date: 2026-04-15
> License: Apache 2.0

## README Summary

LLaVA++ extends LLaVA 1.5 with two new LLMs: **Phi-3 Mini Instruct 3.8B** and **LLaMA-3 Instruct 8B**, creating Phi-3-V and LLaMA-3-V multimodal models.

**Authors:** Hanoona Rasheed, Muhammad Maaz, Salman Khan, Fahad Khan — MBZUAI

### Key Models (Hugging Face)
| Model | Link | Description |
|-------|------|-------------|
| LLaVA-Phi-3-mini-4k-instruct-pretrain | MBZUAI/LLaVA-Phi-3-mini-4k-instruct-pretrain | Pretrained on LCS-558K |
| LLaVA-Phi-3-mini-4k-instruct-lora | MBZUAI/LLaVA-Phi-3-mini-4k-instruct-lora | LoRA fine-tuned |
| LLaVA-Phi-3-mini-4k-instruct-FT | MBZUAI/LLaVA-Phi-3-mini-4k-instruct-FT | Fully fine-tuned |
| LLaVA-Meta-Llama-3-8B-Instruct-pretrain | MBZUAI/LLaVA-Meta-Llama-3-8B-Instruct-pretrain | Pretrained |
| LLaVA-Meta-Llama-3-8B-Instruct-lora | MBZUAI/LLaVA-Meta-Llama-3-8B-Instruct-lora | LoRA fine-tuned |
| LLaVA-Meta-Llama-3-8B-Instruct-FT | MBZUAI/LLaVA-Meta-Llama-3-8B-Instruct-FT | Fully fine-tuned |
| LLaVA-Meta-Llama-3-8B-Instruct-FT-S2 | MBZUAI/LLaVA-Meta-Llama-3-8B-Instruct-FT-S2 | S² fine-tuned |

### Architecture
- **Base LLMs:** Phi-3-mini-4k-instruct (3.8B), LLaMA-3 Instruct 8B
- **Vision Encoder:** openai/clip-vit-large-patch14-336
- **MM Projector:** mlp2x_gelu
- **Training:** DeepSpeed ZeRO-2/3, LoRA (r=128, alpha=256), full fine-tuning
- **Pretrain data:** LCS-558K (558K image-text pairs)
- **Finetune data:** LLaVA-Instruct-665K

### Key Files
- `Phi-3-V/llava_phi3.py` — LlavaPhiForCausalLM class extending Phi3ForCausalLM with multimodal input support
- `LLaMA-3-V/llava_llama.py` — LlavaLlamaForCausalLM class extending LlamaForCausalLM with multimodal input support
- Both register custom model types (`llava_phi`, `llava_llama`) via `AutoConfig.register` / `AutoModelForCausalLM.register`
- `Phi-3-V/conversation.py` — Phi-3 chat template
- Training scripts use DeepSpeed with `train_mem.py` (memory-optimized)

### Citation
```bibtex
@misc{hanoona2024LLaVA++,
  title={LLaVA++: Extending Visual Capabilities with LLaMA-3 and Phi-3},
  author={Rasheed, Hanoona and Maaz, Muhammad and Khan, Salman and Khan, Fahad S.},
  url={https://github.com/mbzuai-oryx/LLaVA-pp},
  year={2024}
}
```
