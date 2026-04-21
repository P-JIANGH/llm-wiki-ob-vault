# VoxCPM - Source Analysis

**Source:** https://github.com/OpenBMB/VoxCPM
**Date:** 2026-04-21
**Clone:** gitcode mirror (GitHub timed out)

## README Summary

VoxCPM is a tokenizer-free Text-to-Speech (TTS) system that models speech in continuous space, overcoming discrete tokenization limitations. Built on MiniCPM-4 backbone with end-to-end diffusion autoregressive architecture.

### Key Features
- **Context-Aware Speech Generation** - infers prosody from text, trained on 1.8M hours bilingual corpus
- **Zero-shot Voice Cloning** - short reference audio captures timbre, accent, emotion, rhythm
- **High-Efficiency Synthesis** - RTF ~0.15 on RTX 4090, streaming support

### Model Versions
- **VoxCPM1.5** (Latest): 800M params, 44100Hz AudioVAE, 6.25Hz token rate, RTF ~0.15
- **VoxCPM-0.5B** (Original): 640M params, 16000Hz AudioVAE, 12.5Hz token rate, RTF 0.17

### Architecture Components
- **MiniCPM-4** backbone (from OpenBMB) for language modeling
- **LocDiT** (Local Diffusion Transformer) with Flow Matching (inspired by CosyVoice)
- **AudioVAE** (based on DAC - Descript Audio Codec)
- **Scalar Quantization Layer** for FSQ constraints
- **LoRA** support for fine-tuning
- **ZipEnhancer** for speech prompt enhancement
- **SenseVoice-Small** for speech prompt ASR

### Key Files
- `src/voxcpm/cli.py` - CLI entry point (`voxcpm` command)
- `src/voxcpm/modules/minicpm4/` - MiniCPM-4 LM backbone (cache, config, model)
- `src/voxcpm/modules/locdit/` - Local DiT module (unified CFM, local_dit)
- `src/voxcpm/modules/audiovae/` - Audio VAE module
- `src/voxcpm/modules/locenc/` - Local encoder module
- `src/voxcpm/modules/layers/` - Scalar quantization, LoRA layers
- `src/voxcpm/zipenhancer.py` - ZipEnhancer integration
- `app.py` - Gradio web demo
- `lora_ft_webui.py` - LoRA fine-tuning web UI
- `conf/voxcpm_v1.5/voxcpm_finetune_all.yaml` - Full fine-tuning config
- `conf/voxcpm_v1.5/voxcpm_finetune_lora.yaml` - LoRA fine-tuning config

### Dependencies
- torch>=2.5.0, torchaudio>=2.5.0, transformers>=4.36.2
- gradio<6, modelscope>=1.22.0, funasr
- librosa, soundfile, einops

### License
Apache-2.0

### Install
```bash
pip install voxcpm
```

### Community Projects
- ComfyUI-VoxCPM, ComfyUI-VoxCPMTTS, WebUI-VoxCPM
- VoxCPM-NanoVLLM (GPU inference acceleration)
- VoxCPM-ONNX (CPU inference)
- VoxCPMANE (Apple Neural Engine backend)
- voxcpm_rs (Rust re-implementation)

### Acknowledgments
- DiTAR for diffusion autoregressive backbone
- MiniCPM-4 for language model foundation
- CosyVoice for Flow Matching-based LocDiT implementation
- DAC for Audio VAE backbone
