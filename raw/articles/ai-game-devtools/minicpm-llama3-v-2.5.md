# MiniCPM-Llama3-V 2.5 — Raw Source

**Repository:** https://github.com/OpenBMB/MiniCPM-V
**Clone source:** gitcode.com/OpenBMB/MiniCPM-V (gitcode mirror)
**Date:** 2026-04-15

## README Summary

MiniCPM-Llama3-V 2.5 (released 2024.05.20) is an open-source multimodal LLM achieving GPT-4V-level performance. Built on SigLip-400M vision encoder + MiniCPM-2.4B LLM, connected by a perceiver resampler.

### Key Facts
- **Parameters:** ~3B total (2.4B LLM + 400M vision encoder)
- **Vision tokens:** 64 (vs typical 512+ in other LMMs) — via perceiver resampler
- **Languages:** English + Chinese bilingual
- **Benchmark results:**
  - MME: 1452
  - MMB-dev (en): 67.9
  - MMB-dev (zh): 65.3
  - MMMU-val: 37.2
  - CMMMU-val: 32.1
- Outperforms 9.6B Qwen-VL-Chat despite 3x smaller size

### Architecture
- Vision encoder: `vit_so400m_patch14_siglip_384.webli` (SigLip-400M via timm)
- LLM backbone: MiniCPM-2.4B causal LM
- Perceiver resampler: compresses image representations to 64 tokens
- Image size: 448×448
- Quantization: supports BF16, FP16; 4bit/8bit quantization available

### Key Modules
- `modeling_minicpmv.py`: MiniCPMV class — vision module init, resampler, transform
- `resampler.py`: Perceiver resampler (QueryFormer) — cross-attention based vision tokenizer
- `configuration_minicpm.py`: MiniCPMVConfig
- `modeling_minicpm.py`: MiniCPMForCausalLM (LLM backbone)

### Deployment
- GPU: Nvidia GPUs with BF16 (A100, H100, RTX3090) or FP16 (V100, T4, RTX2080)
- Mac: MPS (Apple silicon / AMD GPUs)
- Mobile: Android/Harmony via MLC (see mlc-MiniCPM project)
- Memory: significantly lower than comparable LMMs due to 64-token compression

### License
- Code: Apache-2.0
- Weights: MiniCPM Model License (free for academic research; commercial use requires questionnaire)
