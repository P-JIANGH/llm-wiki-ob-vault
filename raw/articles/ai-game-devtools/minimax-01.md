# MiniMax-01 Source Material

Repository: https://github.com/MiniMax-AI/MiniMax-01
Cloned from: gitcode.com (GitHub direct clone failed)

## Overview

MiniMax-01 is a family of two models from MiniMax:
- **MiniMax-Text-01**: 456B total params, 45.9B activated per token, hybrid Lightning+Softmax Attention + MoE
- **MiniMax-VL-01**: Vision-language model built on MiniMax-Text-01 with ViT-MLP-LLM framework

## Key Architecture Details

### MiniMax-Text-01
- Total Parameters: 456B
- Activated Parameters per Token: 45.9B
- Layers: 80
- Hidden Size: 6144
- Vocab Size: 200,064
- Hybrid Attention: Lightning Attention (every 7 blocks) + Softmax Attention
- MoE: 32 experts, Top-2 routing, Expert hidden dim 9216
- RoPE: half head dim, base frequency 10,000,000
- Training context: 1M tokens; Inference context: up to 4M tokens
- Parallel strategies: LASP+, varlen ring attention, Expert Tensor Parallel (ETP)

### MiniMax-VL-01
- ViT: 303M params, 24 layers, patch size 14, hidden 1024, 16 heads
- MLP projector: 2-layer randomly initialized
- Dynamic resolution: 336×336 to 2016×2016, 336×336 thumbnail
- Training: 694M image-caption pairs, 512B tokens total

## Benchmark Highlights

### Text (vs GPT-4o, Claude-3.5, Gemini-1.5-Pro):
- MMLU: 88.5 (tied with DeepSeek-V3, vs GPT-4o 85.7)
- C-SimpleQA: **67.4** (best across all models)
- Arena-Hard: 89.1 (vs GPT-4o 92.4)
- Long context RULER 1M: **0.910** (best, vs Gemini 0.850)
- LongBench v2 w/ CoT: **56.5** overall (vs GPT-4o 51.4)

### Vision (vs GPT-4o, Claude-3.5, Gemini-2.0-Flash):
- ChartQA: **91.7** (best)
- DocVQA: 96.4 (vs GPT-4o 91.1)
- OCRBench: **865** (best)
- MMMU: 68.5 (vs Claude-3.5 72.0)

## Deployment
- Recommended: vLLM for serving
- Alternative: Hugging Face Transformers with int8 quantization
- Model ID: MiniMaxAI/MiniMax-Text-01, MiniMaxAI/MiniMax-VL-01

## License
- Code: MIT
- Model: Custom MiniMax Model Agreement

## Contact
model@minimax.io

## Related Links
- Chatbot: https://chat.minimax.io/
- API: https://www.minimax.io/platform
- MCP Server: https://github.com/MiniMax-AI/MiniMax-MCP
- HuggingFace: https://huggingface.co/MiniMaxAI
- ArXiv: 2501.08313
