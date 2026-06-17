# Ovi: Twin Backbone Cross-Modal Fusion for Audio-Video Generation

Source: https://github.com/character-ai/Ovi
arXiv: https://arxiv.org/abs/2510.01284
Project Page: https://aaxwaz.github.io/Ovi/
Hugging Face: https://huggingface.co/chetwinlow1/Ovi

Authors: Chetwin Low*, Weimin Wang*†, Calder Katyal (Character AI + Yale University)
* Equal contribution, † Project Lead

## Overview

Ovi is a Veo-3-like video+audio generation model that simultaneously generates both video and audio content from text or text+image inputs. It features a twin backbone architecture with separate video and audio branches fused through a unified diffusion framework.

## Key Features

- **Simultaneous Video+Audio Generation**: Generates synchronized video and audio from text or text+image conditioning
- **5B Audio Branch**: Custom pretrained audio branch using in-house high-quality audio datasets
- **10-second Video Generation** (Ovi 1.1, Nov 2025): 960×960 resolution at 24 FPS, multiple aspect ratios (9:16, 16:9, 1:1)
- **5-second Video Generation**: Original model version
- **Three Model Variants**: 720×720_5s, 960×960_5s, 960×960_10s
- **ComfyUI Integration**: Available via ComfyUI-WanVideoWrapper
- **FP8/qint8 Quantization**: 24GB VRAM support with CPU offload

## Architecture

### Twin Backbone Design
- **Video Branch**: Initialized from Wan2.2 repository, uses Wan VAE 2.2 for video encoding/decoding
- **Audio Branch**: Custom 5B model using MMAudio's audio VAE
- **Fusion Engine**: OviFusionEngine performs joint denoising of video and audio latents simultaneously

### Inference Pipeline
1. **Text Encoding**: T5 text encoder for both video and audio conditioning
2. **First Frame (I2V)**: Image preprocessing or FLUX.1-Krea-dev for T2I2V mode
3. **Joint Diffusion**: Simultaneous video+audio denoising with separate guidance scales
4. **Decoding**: Wan VAE for video, MMAudio VAE for audio

### Model Specifications
| Model | Video Latent | Audio Latent | Resolution |
|-------|-------------|-------------|------------|
| 720×720_5s | 31 frames | 157 tokens | 720×720 |
| 960×960_5s | 31 frames | 157 tokens | 960×960 |
| 960×960_10s | 61 frames | 314 tokens | 960×960 |

### Prompt Format
- **Speech**: `<S>Your speech content here<E>` - Text converted to speech
- **Audio Description**: `Audio: YOUR AUDIO DESCRIPTION` - Describes audio/sound effects (at end of prompt)

## Technical Details

### Dependencies
- PyTorch 2.6.0, diffusers 0.31+, transformers 4.49-4.51.3
- Flash Attention (FA2 or FA3)
- optimum-quanto (for qint8 quantization)
- gradio, omegaconf, moviepy, librosa

### Key Source Files
- `inference.py`: Main inference entry point with multi-GPU support
- `ovi/ovi_fusion_engine.py`: Core OviFusionEngine class (~400 lines)
  - `generate()`: Joint video+audio denoising loop with separate schedulers
  - Classifier-free guidance with independent video/audio guidance scales
  - CPU offload support for VRAM optimization
- `ovi/modules/`: Attention, tokenizers, CLIP, XLM-Roberta, MMAudio integration
- `ovi/distributed_comms/`: Sequence parallelism for multi-GPU inference

### GPU Memory Requirements
| Config | Peak VRAM | E2E Time (121 frames, 720×720, 50 steps) |
|--------|-----------|------------------------------------------|
| SP=1, FA3, No offload | ~80 GB | ~83s |
| SP=1, No FA, CPU offload | ~32 GB | ~118s |
| SP=1, FA3, CPU offload + image gen | ~32 GB | ~140s |
| SP=4, FA3 | ~80 GB | ~55s |
| SP=8, FA3 | ~80 GB | ~40s |
| **Minimum (qint8 + CPU offload)** | **24 GB** | Slower |

### Sampling Options
- Solvers: UniPC (default), DPM++, Euler
- Guidance: video_guidance_scale=4.0, audio_guidance_scale=3.0
- SLG (Skip Layer Guidance): Configurable layer index (default 11)
- Negative prompts for both video and audio

## Modes
- **t2v**: Text-to-Audio-Video (requires video_frame_height_width)
- **i2v**: Image-to-Audio-Video (requires input image)
- **t2i2v**: Text→Image (FLUX Krea) → Audio-Video (auto-generates first frame)

## License

Not explicitly stated in repository. Research use.

## Links
- GitHub: https://github.com/character-ai/Ovi
- arXiv: https://arxiv.org/abs/2510.01284
- Project Page: https://aaxwaz.github.io/Ovi/
- HuggingFace Model: https://huggingface.co/chetwinlow1/Ovi
- HuggingFace Demo: https://huggingface.co/spaces/akhaliq/Ovi
- WaveSpeed: https://wavespeed.ai/models/character-ai/ovi/image-to-video
- ComfyUI: https://github.com/kijai/ComfyUI-WanVideoWrapper

## Todo (from README)
- [ ] Improve efficiency of Sequence Parallel implementation
- [ ] Implement Sharded inference with FSDP
- [ ] Reference voice conditioning
- [ ] Distilled model for faster inference
- [ ] Training scripts

## Acknowledgements
- **Wan2.2**: Video branch initialized from Wan2.2
- **MMAudio**: Audio VAE reused
