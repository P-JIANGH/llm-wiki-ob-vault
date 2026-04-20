# FoleyCrafter — Source Analysis

**GitHub:** https://github.com/open-mmlab/FoleyCrafter
**arXiv:** 2407.01494 (cs.CV)
**Project Page:** https://foleycrafter.github.io
**HuggingFace:** https://huggingface.co/spaces/ymzhang319/FoleyCrafter

## Overview

FoleyCrafter is a video-to-audio generation framework that produces realistic sound effects semantically relevant and synchronized with videos. Named after "Foley" — the art of creating sound effects for film/video production.

## Architecture

### Core Pipeline (3 Modules)

1. **Temporal Adapter (时间对齐模块):**
   - ControlNet-style temporal adapter injected into Auffusion base model
   - Detects visual onset/timestamp events in video frames
   - Uses `VideoOnsetNet` (resnet-based) to detect when sounds should occur
   - `--temporal_align` flag enables, `--temporal_scale` controls strength (default 0.2)
   - Converts video frame predictions to 1024-length spectrogram time conditions

2. **Semantic Adapter (语义对齐模块):**
   - IP-Adapter (Image Prompt Adapter) for visual content understanding
   - CLIP Vision encoder extracts frame embeddings → averaged across frames
   - Injects semantic visual features into the audio diffusion process
   - `--semantic_scale` controls visual content weight (default 1.0)

3. **Base Audio Generator:**
   - Built on Auffusion (text-to-audio diffusion model)
   - UNet2DCondition diffusion on spectrogram (256×1024)
   - Vocoder: HiFi-GAN for spectrogram→waveform conversion (16kHz)

### Inference Flow

```
Input Video → Frame Extraction (moviepy, max 150 frames)
           → Temporal Onset Detection (VideoOnsetNet + sigmoid)
           → Time Condition → Spectrogram mask (1024 length, -1/+1)
           → CLIP Image Encoder → Frame embeddings (averaged)
           → Diffusion Pipeline (Auffusion + ControlNet + IP-Adapter)
           → Spectrogram Output → HiFi-GAN Vocoder → WAV (16kHz)
           → Merge with original video (moviepy)
```

### Key Models/Components

| Component | Source | Purpose |
|-----------|--------|---------|
| Auffusion | auffusion/auffusion-full-no-adapter (HF) | Base T2A diffusion model |
| Temporal Adapter | ymzhang319/FoleyCrafter (HF) | temporal_adapter.ckpt (ControlNet) |
| Semantic Adapter | ymzhang319/FoleyCrafter (HF) | semantic_adapter.bin (IP-Adapter) |
| Vocoder | ymzhang319/FoleyCrafter (HF) | vocoder.pt (HiFi-GAN) |
| Timestamp Detector | ymzhang319/FoleyCrafter (HF) | timestamp_detector.pth.tar |
| CLIP Encoder | h94/IP-Adapter (HF) | image_encoder for IP-Adapter |

### Code Structure

```
foleycrafter/
├── models/
│   ├── adapters/          # IP-Adapter implementation
│   │   ├── ip_adapter.py
│   │   ├── transformer.py
│   │   ├── resampler.py
│   │   └── attention_processor.py
│   ├── auffusion/         # Auffusion model modifications
│   │   ├── unet_2d_blocks.py
│   │   ├── transformer_2d.py
│   │   ├── attention.py
│   │   └── loaders/ip_adapter.py
│   ├── onset/             # Timestamp detection
│   │   └── torch_utils.py
│   └── time_detector/     # Video onset detection
│       ├── model.py       # VideoOnsetNet
│       └── resnet.py
├── pipelines/
│   ├── auffusion_pipeline.py   # Main diffusion pipeline
│   └── pipeline_controlnet.py  # ControlNet pipeline
└── utils/
    ├── util.py             # build_foleycrafter, video reading
    ├── converter.py        # Model conversion utilities
    └── spec_to_mel.py      # Spectrogram processing
```

### Features

- **Video-to-Audio:** Silent video → synchronized sound effects
- **Temporal Alignment:** Sound events aligned with visual cues (footsteps, impacts, etc.)
- **Text Prompt Control:** Add/suppress sounds via positive/negative prompts
  - `--prompt "noisy, people talking"` — add specific sounds
  - `--nprompt "river flows"` — suppress specific sounds
- **Gradio Demo:** Web UI with `python app.py --share`
- **CLI Inference:** Batch processing with `python inference.py`

### Dependencies

- Python 3.10, PyTorch 2.2.0, CUDA 11.8
- diffusers 0.25.1, transformers 4.30.2
- CLIP (for visual encoding), HiFi-GAN (vocoder)
- moviepy (video I/O), soundfile (audio I/O)
- Gradio (web demo)

### License

Partial license — check Auffusion license for commercial use (the base T2A model).

### Authors

Yiming Zhang (pjlab), Yicheng Gu (CUHK), Yanhong Zeng (pjlab, corresponding),
Zhening Xing, Yuancheng Wang, Zhizheng Wu, Kai Chen (pjlab, corresponding)

### Acknowledgements

Built upon Auffusion, CondFoleyGen, SpecVQGAN.
Recommends Amphion toolkit for audio/music/speech generation.
