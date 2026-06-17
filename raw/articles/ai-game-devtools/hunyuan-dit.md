# Hunyuan-DiT: A Powerful Multi-Resolution Diffusion Transformer with Fine-Grained Chinese Understanding

Source: https://github.com/Tencent/HunyuanDiT
Date: 2026-04-17

## Abstract
Hunyuan-DiT is a text-to-image diffusion transformer with fine-grained understanding of both English and Chinese. The team designed the transformer structure, text encoder, and positional encoding. They built from scratch a whole data pipeline to update and evaluate data for iterative model optimization. For fine-grained language understanding, they train a Multimodal Large Language Model (DialogGen) to refine image captions. The model can perform multi-round multi-modal dialogue with users, generating and refining images according to the context.

## Architecture
- **Type**: Latent Diffusion Model + DiT (Diffusion Transformer)
- **VAE**: Pre-trained SDXL VAE (sdxl-vae-fp16-fix, 83M params) to compress images into latent space
- **Text Encoder**: Dual-encoder — bilingual CLIP (350M params, Chinese+English) + multilingual T5 encoder (mT5, 1.6B params)
- **Backbone**: Transformer-based diffusion model, 1.5B parameters (v1.0/v1.1/v1.2)
- **Prompt Enhancement**: DialogGen (7B MLLM) for multi-turn dialogue and prompt refinement
- **Positional Encoding**: Custom design for multi-resolution support

## Key Features
1. **Chinese-English Bilingual**: Uses CLIP (bilingual) + mT5 (multilingual) for fine-grained understanding of both languages
2. **Multi-turn Text2Image**: MLLM (DialogGen) understands multi-round user dialogue and outputs new text prompts for image generation
3. **Multi-Resolution**: Supports various image sizes, not fixed resolution
4. **Distillation**: 50% acceleration on NVIDIA GPUs via distilled model
5. **TensorRT**: 47% acceleration via TensorRT optimization
6. **6GB VRAM Inference**: Lite version using bitsandbytes + diffusers

## Model Versions
- v1.0: Initial release (1.5B params)
- v1.1: Mitigated oversaturation and watermark issues
- v1.2: Latest version with improved quality

## Performance (vs competitors, holistic human evaluation 50+ evaluators)
| Model | Open Source | Text-Image Consistency | Excluding AI Artifacts | Subject Clarity | Aesthetics | Overall |
|-------|:-----------:|:---------------------:|:----------------------:|:---------------:|:----------:|:-------:|
| SDXL | ✔ | 64.3% | 60.6% | 91.1% | 76.3% | 42.7% |
| PixArt-α | ✔ | 68.3% | 60.9% | 93.2% | 77.5% | 45.5% |
| Playground 2.5 | ✔ | 71.9% | 70.8% | 94.9% | 83.3% | 54.3% |
| SD 3 | ✘ | 77.1% | 69.3% | 94.6% | 82.5% | 56.7% |
| MidJourney v6 | ✘ | 73.5% | 80.2% | 93.5% | 87.2% | 63.3% |
| DALL-E 3 | ✘ | 83.9% | 80.3% | 96.5% | 89.4% | 71.0% |
| **Hunyuan-DiT** | ✔ | 74.2% | 74.3% | 95.4% | 86.6% | 59.0% |

## Module Structure
```
hydit/
├── diffusion/          # Gaussian diffusion, pipeline, respace
│   ├── gaussian_diffusion.py
│   ├── pipeline.py
│   ├── pipeline_controlnet.py
│   └── pipeline_ipadapter.py
├── modules/            # Core model components
│   ├── models.py       # Main DiT model
│   ├── attn_layers.py  # Attention layers (Flash Attention support)
│   ├── text_encoder.py # CLIP + T5 text encoding
│   ├── embedders.py    # Positional embeddings
│   ├── controlnet.py   # ControlNet module
│   ├── ema.py          # Exponential Moving Average
│   ├── fp16_layers.py  # FP16 support
│   └── trt/            # TensorRT integration
├── data_loader/        # Arrow-based data loading
├── config.py           # Configuration
├── inference.py        # End-to-end inference
└── train_deepspeed.py  # DeepSpeed distributed training

IndexKits/              # Data management framework (Arrow-based)
lora/                   # LoRA training scripts
controlnet/             # ControlNet training (canny, depth, pose)
ipadapter/              # IP-Adapter training
diffusers/              # Diffusers integration
comfyui/                # ComfyUI workflows
kohya_ss-hydit/         # Kohya GUI integration
mllm/                   # Hunyuan-Captioner (LLaVA-based)
app/                    # Gradio applications
lite/                   # 6GB VRAM inference
```

## Dependencies
- PyTorch >= 2.7.1, torchvision >= 0.21.0
- diffusers == 0.21.2 (native), 0.28.1+ (diffusers pipeline)
- transformers == 4.39.1
- DeepSpeed == 0.6.3 (distributed training)
- PEFT == 0.10.0 (LoRA)
- Flash Attention v2.1.2 (acceleration)
- Gradio == 3.50.2
- timm, einops, accelerate, loguru, pandas

## Training
- **Full-parameter**: DeepSpeed distributed training, min 20GB GPU memory
- **LoRA**: Rank-64, ~16GB GPU with Kohya
- **ControlNet**: Canny/Depth/Pose, trained on distill weights
- **Data Pipeline**: Arrow format + YAML configuration + IndexKits for large-scale management

## License
Notice file present (Tencent proprietary terms)

## Links
- GitHub: https://github.com/Tencent/HunyuanDiT
- HuggingFace: https://huggingface.co/Tencent-Hunyuan/HunyuanDiT
- Paper: arXiv:2405.08748 (Hunyuan-DiT), arXiv:2403.08857 (DialogGen)
- Project Page: https://dit.hunyuan.tencent.com
