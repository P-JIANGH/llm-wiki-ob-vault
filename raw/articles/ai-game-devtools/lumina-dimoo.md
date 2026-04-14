# Lumina-DiMOO — Raw Source

## Project Info
- **Name:** Lumina-DiMOO
- **GitHub:** https://github.com/Alpha-VLLM/Lumina-DiMOO
- **HuggingFace:** https://huggingface.co/Alpha-VLLM/Lumina-DiMOO
- **Technical Report:** http://arxiv.org/abs/2510.06308
- **Project Page (Demo & Benchmark):** https://synbol.github.io/Lumina-DiMOO/

## Key Capabilities
- **Unified Discrete Diffusion Architecture** — fully discrete diffusion modeling for both inputs and outputs across modalities
- **Text-to-Image Generation** — arbitrary and high-resolution
- **Image-to-Image Generation** — editing, subject-driven generation, inpainting
- **Image Understanding** — visual QA and multimodal understanding
- **Controllable Generation** — hed_control, depth_control, openpose_control, subject_driven
- **Image Inpainting & Extrapolation**
- **Dense Prediction** — canny edge, HED, depth, openpose prediction

## Architecture
- **Core model files:** `model/modeling_xllmx_dimoo.py`, `model/modeling_llada.py`
- **Generators:** `generators/image_generation_generator.py`, `generators/image_to_image_generator.py`, `generators/text_understanding_generator.py`
- **Inference:** `inference/inference_t2i.py`, `inference/inference_i2i.py`, `inference/inference_mmu.py`
- **Key innovation:** Discrete diffusion (not AR or continuous diffusion); uses VQ tokenizer to convert images to discrete codes
- **Speed optimization:** Max Logit-based Cache (ML-Cache) — 2x speedup for image generation

## Technical Stack
- PyTorch (torch==2.3.1, torchvision==0.18.1, torchaudio==2.3.1)
- Transformers==4.46.2, Diffusers==0.34.0
- Gradio==4.19.0 (for demo)
- Fairscale, accelerate, bitsandbytes, einops, h5py

## Performance
- Ranks 1st on UniGenBench leaderboard among open-source unified models (2025-09-20)
- GenEval, DPG, OneIG-EN, TIIF benchmarks
- Image generation: 58.2s latency / 38.9 GB GPU (A800); with ML-Cache: 32.2s / 45.9 GB

## Supported Benchmarks (via VLMEvalKit)
- POPE, MME, MMBench, SEEDBench, MMMU

## BibTeX
@article{xin2025lumina,
  title={Lumina-DiMOO: An Omni Diffusion Large Language Model for Multi-Modal Generation and Understanding},
  author={Xin, Yi and Qin, Qi and Luo, Siqi and others},
  journal={arXiv preprint arXiv:2510.06308},
  year={2025}
}

## License
- LICENSE file present (specific license TBD from repo)

## Related
- VLMEvalKit (OpenCompass) — evaluation framework
- Diffusers library support (third-party)
- ComfyUI support (third-party)
