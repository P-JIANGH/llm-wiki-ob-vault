# SEE-2-SOUND: Zero-Shot Spatial Environment-to-Spatial Sound

**Source**: https://github.com/see2sound/see2sound
**Analyzed**: 2026-04-20

## Overview

SEE-2-SOUND is a method to generate spatial audio from images, animated images, and videos to accompany the visual content. It converts visual environments into spatial sound, creating immersive 5.1 surround sound audio that matches the visual scene.

## Authors & Institution

- Rishit Dagli (University of Toronto)
- Shivesh Prakash (University of Toronto)
- Rupert Wu (University of Toronto)
- Houman Khosravani (University of Toronto / Temerty Centre / Sunnybrook Research Institute)

## Paper

- arXiv: 2406.06612
- Project Page: https://see2sound.github.io
- HuggingFace Demo: https://huggingface.co/spaces/rishitdagli/see-2-sound

## Three-Stage Pipeline

### 1. Source Estimation
- Uses **Segment Anything (SAM ViT-H)** to identify regions of interest in input media
- Estimates 3D positions of each region on a viewing sphere
- Uses **Depth Anything (ViT-L)** to estimate monocular depth map of input image

### 2. Audio Generation
- Uses pre-trained **CoDi (Conditional Diffusion)** model to generate mono audio clips for each identified region
- CoDi has 4 components: encoder, text diffuser, audio diffuser, video diffuser
- Each region gets its own audio clip with spatial information
- Clips are combined into a 4D representation per region

### 3. Surround Sound Spatial Audio Generation
- Generates **5.1 surround sound** spatial audio
- Places sound sources in a virtual room
- Computes **Room Impulse Responses (RIRs)** for each source-microphone pair using pyroomacoustics
- Microphones positioned according to 5.1 channel configuration:
  - Front Left, Front Right, Front Center
  - LFE (Low-Frequency Effects)
  - Back Left, Back Right

## Key Code Components

| File | Purpose |
|------|---------|
| `see2sound/__init__.py` | Package entry, exports See2Sound class |
| `see2sound/inference.py` | Main See2Sound class: setup, run inference, spatial audio generation |
| `see2sound/evaluation.py` | Evaluation class: generate_audio, run_avitar, compute_acoustic_similarity |
| `see2sound/audio_similarity.py` | Audio similarity computation for evaluation |
| `app.py` | Gradio web UI |
| `default_config.yaml` | Default configuration (model paths, GPU settings, etc.) |
| `setup.py` | Python package setup |

## API Usage

```python
import see2sound

model = see2sound.See2Sound(config_path="default_config.yaml")
model.setup()
model.run(path="test.png", output_path="test.wav")
```

## Dependencies

- CoDi (Microsoft i-Code V3)
- Segment Anything (Facebook/Meta)
- Depth Anything
- pyroomacoustics (for RIR computation)
- AViTAR fork (for evaluation only)

## Compute Requirements

- Optimized for: A100 80GB GPU
- Tested on: A100 40GB, H100 80GB, V100 32GB (low memory mode)
- Recommended: 40GB+ vRAM, 32GB CPU RAM
- Low memory mode available for 24GB+ vRAM GPUs

## Configuration Options

| Parameter | Default | Description |
|-----------|---------|-------------|
| sam_size | H | SAM model variant (H/L/B) |
| depth_size | L | Depth Anything variant (L/B/S) |
| num_audios | 3 | Number of audio regions to generate |
| steps | 500 | Diffusion steps |
| fp16 | False | Half-precision mode |
| low_mem | False | Low memory sequential loading |
| gpu | True | GPU usage |

## Evaluation

- Proposed novel quantitative evaluation technique
- Uses AViTAR (Visual Acoustic Matching) to edit audio to match visual content
- Computes similarity scores between baseline (CoDi image-to-audio) and SEE-2-SOUND outputs
- Also conducted user study

## License

Not explicitly stated in README (check LICENSE file in repo)

## Docker

- 41GB compressed container image available
- Pre-built models and environment included
