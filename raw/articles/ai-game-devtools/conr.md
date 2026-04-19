# CoNR — Collaborative Neural Rendering using Anime Character Sheets

**Source:** https://github.com/megvii-research/CoNR
**Paper:** https://arxiv.org/abs/2207.05378
**Accepted:** IJCAI 2023 Special Track on AI, the Arts and Creativity
**Dataset:** https://github.com/P2Oileen/CoNR_Dataset

## Project Overview

CoNR (Collaborative Neural Rendering) is an official implementation of the paper "Collaborative Neural Rendering using Anime Character Sheets". It generates vivid dancing videos from hand-drawn anime character sheets (ACS). The system takes a static anime character sheet (multiple views of a character) and a target pose sequence, then renders the character in that pose as an animated video.

## Key Architecture

### Model Components (from conr.py)

The CoNR model consists of four main sub-networks:

1. **UDPParserNet (ResEncUnet)** — ResNet50 backbone with parametric upsampling, outputs 4-channel RGBA. Parses both character sheet images and pose images into Ultra-Dense Pose (UDP) representations.

2. **Target Pose Encoder (ResEncUnet)** — ResNet18 backbone, extracts features from target pose (UDP + alpha mask) for rendering.

3. **CINN Shader** — Conditional Invertible Neural Network for shader/texture transfer. Takes pose features, reference RGBA, and character features to produce rendered output.

4. **RGBADecoderNet** — Decodes RGBA output from the shader's feature representations.

### Pipeline

1. **Character Parser** — Parses input character sheet (PNG with transparency) into RGBA + feature maps
2. **Pose Parser** — Parses target pose images into UDP representation
3. **Shader Pose Encoder** — Encodes target pose features
4. **Shader Forward** — CINN performs texture transfer from character sheet to target pose
5. **RGBA Decoder** — Final RGBA output, combined with alpha mask for compositing

## Technical Details

- **Framework:** PyTorch with DistributedDataParallel for multi-GPU training
- **Backbones:** ResNet50 (character), ResNet18 (pose) — pretrained on Danbooru dataset
- **Loss:** Uses LPIPS for perceptual quality
- **Input:** Anime character sheets (PNG with transparent background), pose sequences (Ultra-Dense Pose)
- **Output:** Per-frame rendered images → compiled to video via FFmpeg (30fps)
- **Web UI:** Streamlit-based interface
- **Python:** 3.6+

## Dependencies

- PyTorch >= 1.3.0
- CUDA + cuDNN (NVIDIA GPU required)
- OpenCV, Pillow, scikit-image, torchvision
- LPIPS (perceptual loss)
- gdown (for weight downloads)
- Streamlit (web UI)

## Licensing

No explicit license file found in the repository.

## Related Links

- Demo: https://transpchan.github.io/live3d/
- Colab Notebook: https://colab.research.google.com/github/megvii-research/CoNR/blob/main/notebooks/conr.ipynb
- BiliBili Video: https://www.bilibili.com/video/BV19V4y1x7bJ/
- YouTube Video: https://youtu.be/Z4HXWBF7mLI
- Successor: https://github.com/transpchan/Live3D-v2
- Dataset: https://github.com/P2Oileen/CoNR_Dataset
- MMD2UDP tool: https://github.com/KurisuMakise004/MMD2UDP

## Game Dev Relevance

CoNR enables generating animated character videos from static character sheets — useful for:
- Anime-style game character animation
- VTuber / avatar motion generation
- Dance animation from 2D art assets
- Pose-driven character rendering without 3D modeling
