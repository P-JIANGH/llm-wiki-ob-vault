# StableAvatar — Raw Source

**Source:** https://github.com/Francis-Rings/StableAvatar
**Captured:** 2026-04-19
**Paper:** arXiv 2508.08248
**Project Page:** https://francis-rings.github.io/StableAvatar
**HuggingFace Model:** https://huggingface.co/FrancisRing/StableAvatar
**HuggingFace Demo:** https://huggingface.co/spaces/YinmingHuang/StableAvatar

## Overview

StableAvatar: Infinite-Length Audio-Driven Avatar Video Generation

Authors: Shuyuan Tu (Fudan), Yueming Pan (Xi'an Jiaotong), Yinming Huang (Fudan), Xintong Han (Tencent), Zhen Xing (Fudan), Qi Dai (MSRA), Chong Luo (MSRA), Zuxuan Wu (Fudan), Yu-Gang Jiang (Fudan)

Current diffusion models for audio-driven avatar video generation struggle to synthesize long videos with natural audio synchronization and identity consistency. StableAvatar is the first end-to-end video diffusion transformer that synthesizes infinite-length high-quality videos without post-processing.

## Key Innovations

1. **Time-step-aware Audio Adapter**: Prevents error accumulation via time-step-aware modulation (existing models inject audio embeddings directly via cross-attention, causing latent distribution drift across clips)
2. **Audio Native Guidance Mechanism**: Uses diffusion's own evolving joint audio-latent prediction as dynamic guidance signal during inference
3. **Dynamic Weighted Sliding-window Strategy**: Fuses latent over time for smooth infinite-length video generation

## Architecture

- **Backbone**: Wan2.1-1.3B-based Video Diffusion Transformer (DiT)
- **Audio Encoder**: Wav2Vec2.0 (wav2vec2-base-960h)
- **Reference Image Conditioning**: Wan2.1-Fun-V1.1-1.3B-InP for inpainting
- **Training Data**: Mixed-resolution talking face videos (512x512, 480x832, 832x480) covering speech, singing, and dancing
- **No post-processing needed**: Direct synthesis without face-swapping (FaceFusion) or face restoration (GFP-GAN, CodeFormer)

## Technical Details

- **Resolutions supported**: 512x512, 480x832, 832x480
- **Two weight versions**: `transformer3d-square.pt` (512x512 dataset) and `transformer3d-rec-vec.pt` (mixed 480x832+832x480)
- **GPU memory modes**: model_full_load (~18GB for 5s video @480x832), sequential_cpu_offload (~3GB, slower), model_cpu_offload_and_qfloat8, model_cpu_offload
- **Multi-GPU support**: Ulysses + Ring parallel attention + FSDP for DiT
- **Inference speed**: ~3 minutes for 5s video (480x832, fps=25) on RTX 4090
- **Sliding window**: overlap_window_length [5-15], clip_sample_n_frames configurable
- **CFG scales**: text prompt [3-6], audio [3-6]

## Training Pipeline

- **Single machine**: 4x A100 80G
- **Multi-machine**: 8 nodes x 8 A100 80G (64 GPUs)
- **VRAM requirement**: ~50GB for mixed-resolution training, ~40GB for 512x512 only
- **Deepspeed Stage-2** for 14B variant training
- **LoRA training/finetuning** supported with configurable rank and network_alpha
- **Dataset structure**: Three resolution folders (square/rec/vec), each with speech/singing/dancing subfolders, containing frames, face masks, lip masks, video clips, and audio

## 14B Variant

- Based on Wan2.1-I2V-14B-480P/720P backbone
- Authors note: "significantly increase inference latency and GPU memory consumption during training, limited efficiency in terms of performance-to-resource ratio"
- 1.3B version already capable of infinite-length high-quality synthesis

## Dependencies

PyTorch 2.6.0/2.7.0 (cu124/cu128), diffusers 0.30.1, transformers 4.51.3, accelerate, gradio, decord, omegaconf, librosa, moviepy, mediapipe (for lip masks), audio-separator (for vocal separation)

## File Structure

```
StableAvatar/
├── wan/                         # Wan2.1 model modules
├── checkpoints/                 # Model weights
│   ├── Kim_Vocal_2.onnx
│   ├── wav2vec2-base-960h
│   ├── Wan2.1-Fun-V1.1-1.3B-InP
│   └── StableAvatar-1.3B
├── inference.py                 # Single GPU inference
├── inference.sh                 # Inference config
├── multiple_gpu_inference.sh    # Multi-GPU inference
├── app.py                       # Gradio interface
├── train_1B_square.py/.sh       # Training (512x512)
├── train_1B_rec_vec.py/.sh      # Training (mixed 480x832+832x480)
├── train_1B_rec_vec_lora.py/.sh # LoRA training
├── train_14B.py/.sh             # 14B training
├── train_14B_lora.py/.sh        # 14B LoRA training
├── audio_extractor.py           # Video→Audio extraction
├── vocal_seperator.py           # Vocal separation
├── lip_mask_extractor.py        # Lip mask extraction
├── accelerate_config/           # Accelerate configs
├── deepspeed_config/            # Deepspeed configs
└── examples/                    # 6 test cases
```

## Community Integrations

- ComfyUI node: https://github.com/smthemex/ComfyUI_StableAvatar (10 steps, 3x faster)
- Gradio interface contributed by community
- HuggingFace Spaces demo (Pro users only due to long generation time)

## Key Differentiators vs Peers

- **Infinite-length capability**: Sliding window with dynamic weighted fusion vs fixed-length clip generation
- **No post-processing**: Direct synthesis vs requiring FaceFusion/GFP-GAN/CodeFormer
- **Time-step-aware modulation**: Addresses latent distribution drift that plagues existing models
- **Audio Native Guidance**: Novel use of diffusion's own prediction as guidance signal
- **Low VRAM mode**: ~3GB via sequential CPU offload
