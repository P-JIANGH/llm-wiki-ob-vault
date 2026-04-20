# Auffusion: Leveraging the Power of Diffusion and Large Language Models for Text-to-Audio Generation

**Source:** https://github.com/happylittlecat2333/Auffusion
**Paper:** https://arxiv.org/pdf/2401.01044
**Date captured:** 2026-04-20

## Description
Auffusion is a latent diffusion model (LDM) for text-to-audio (TTA) generation. It can generate realistic audios including human sounds, animal sounds, natural and artificial sounds and sound effects from textual prompts. The system adapts T2I (text-to-image) model frameworks to TTA tasks, leveraging their inherent generative strengths and precise cross-modal alignment.

## Key Architecture
- **Backbone:** Latent Diffusion Model adapted from Stable Diffusion (T2I→TTA)
- **Text Encoder:** CLIPTextModel (from transformers)
- **UNet:** UNet2DConditionModel from diffusers
- **VAE:** AutoencoderKL (VAE encoder/decoder for audio latent space)
- **Condition Adapter:** Linear projection from CLIP embedding dimension to UNet cross-attention dimension, with LayerNorm
- **Scheduler:** KarrasDiffusionSchedulers (PNDM default)
- **Vocoder:** HiFi-GAN style neural vocoder for waveform reconstruction from mel spectrograms (built-in ResBlock1/ResBlock2/Generator with weight normalization)
- **Memory optimization:** xformers attention support

## Model Variants
| Model | HuggingFace Path |
|-------|-----------------|
| Auffusion | huggingface.co/auffusion/auffusion |
| Auffusion-Full | huggingface.co/auffusion/auffusion-full |
| Auffusion-Full-no-adapter | huggingface.co/auffusion/auffusion-full-no-adapter |

## Audio Manipulation Capabilities
- Text-to-audio generation
- Text-guided style transfer (audio-to-audio / img2img)
- Audio inpainting
- Attention-based word swap control (prompt2prompt)
- Attention-based reweight control (prompt2prompt)

## Dependencies
- torch 2.0.1, diffusers 0.18.2, transformers, xformers 0.0.20
- librosa 0.9.2, soundfile 0.12.1 for audio I/O
- CLAP for evaluation (laion/clap-htsat-unfused)
- Evaluation via audioldm_eval

## Quickstart
```python
from auffusion_pipeline import AuffusionPipeline
pipeline = AuffusionPipeline.from_pretrained("auffusion/auffusion")
output = pipeline(prompt="Birds singing sweetly in a blooming garden")
audio = output.audios[0]
```

## Key Files
- `auffusion_pipeline.py` (1039 lines) — main pipeline: AuffusionPipeline class extending DiffusionPipeline, ConditionAdapter, HiFi-GAN vocoder
- `inference.py` — batch inference on AudioCaps test set
- `converter.py` — audio format conversion utilities
- `utils.py` — helper functions
- `prompt2prompt/` — attention-based prompt editing for audio manipulation
- `notebooks/` — Colab notebooks for text-to-audio, style transfer, inpainting, word swap, reweight
- `config/` — model configuration JSON files
- `data/` — test datasets (AudioCaps)

## License
Apache 2.0

## Authors
Jinlong Xue, Yayue Deng, Yingming Gao, Ya Li (BUPT)

## Notes
- Published December 2023 / January 2024
- Surpasses previous TTA approaches on limited data/compute
- Evaluation on AudioCaps (all instances available as of June 2023)
- Borrowed code from: diffusers, transformers, prompt-to-prompt, TANGO, riffusion, audioldm_eval
- TODO items (as of capture): audio super-resolution, Gradio web app, training code release
