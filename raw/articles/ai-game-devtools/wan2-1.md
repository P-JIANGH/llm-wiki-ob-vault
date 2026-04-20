# Wan2.1 - Raw Source Extract

**Source:** https://github.com/Wan-Video/Wan2.1
**Extracted:** 2026-04-20
**Method:** web_extract (GitHub/gitcode/gitee clone all failed)

## README Content

### Overview
Wan: Open and Advanced Large-Scale Video Generative Models. A comprehensive, open suite of video foundation models built on the Diffusion Transformer (DiT) paradigm. Delivers state-of-the-art performance in text-to-video, image-to-video, frame-interpolation, and video editing tasks.

### Available Models
| Model | Task | Resolution |
|---|---|---|
| T2V-14B | Text-to-Video | 480P & 720P |
| T2V-1.3B | Text-to-Video | 480P |
| I2V-14B-720P | Image-to-Video | 720P |
| I2V-14B-480P | Image-to-Video | 480P |
| FLF2V-14B | First/Last Frame-to-Video | 720P |
| VACE-14B | Video/Condition Editing | 480P & 720P |
| VACE-1.3B | Video/Condition Editing | 480P |

### Architecture
1. **Wan-VAE (3D Causal Variational Autoencoder):** Novel architecture for spatio-temporal compression & temporal causality. Encodes/decodes unlimited-length 1080P videos without losing historical temporal info.
2. **Video Diffusion DiT (Flow Matching):**
   - Text Encoding: T5 Encoder with cross-attention in every transformer block
   - Time Embeddings: Shared MLP (Linear + SiLU) predicts 6 modulation parameters per block
   - 1.3B Model: dim=1536, 12 heads, 30 layers
   - 14B Model: dim=5120, 40 heads, 40 layers
3. **Data Pipeline:** 4-step cleaning process focusing on fundamental dimensions, visual quality, and motion quality.

### Key Features
- Prompt Extension (remote via DashScope API or local Qwen models)
- Multi-GPU acceleration (FSDP + xDiT USP): Ulysses/Ring strategies
- Low VRAM support: --offload_model True --t5_cpu
- Gradio UI for all tasks
- Diffusers integration (T2V basic)

### Links
- GitHub: https://github.com/Wan-Video/Wan2.1
- Hugging Face: https://huggingface.co/Wan-AI/
- ModelScope: https://modelscope.cn/organization/Wan-AI
- Technical Report: https://arxiv.org/abs/2503.20314
- Blog: https://wan.video
- Discord: https://discord.gg/AKNgpMK4Yj

### Performance
- Evaluated on 1,035 internal prompts across 14 major dimensions & 26 sub-dimensions
- Weighted scoring shows Wan2.1 outperforms competitors across multiple benchmarks

### Related Projects (same ecosystem)
- Wan2.2 (successor): https://github.com/Wan-Video/Wan2.2
