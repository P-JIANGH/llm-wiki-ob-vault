# AnimateAnyone — Raw Source

**Source:** https://github.com/HumanAIGC/AnimateAnyone
**Project Page:** https://humanaigc.github.io/animate-anyone/
**Paper:** https://arxiv.org/pdf/2311.17117.pdf
**YouTube Demo:** https://www.youtube.com/watch?v=8PCn5hLKNu4
**Date:** 2026-04-19

## Repository
- GitHub: HumanAIGC/AnimateAnyone (minimal repo — project page only)
- Cloned from: gitcode.com/HumanAIGC/AnimateAnyone
- Contents: README.md + docs/video_t1.png
- No source code released in this repo

## Authors & Institution
- Li Hu, Xin Gao, Peng Zhang, Ke Sun, Bang Zhang, Liefeng Bo
- Institute for Intelligent Computing, Alibaba Group

## Core Architecture
A novel diffusion-based framework for image-to-video character animation.

| Component | Function |
|:---|:---|
| **ReferenceNet** | Extracts intricate appearance details from reference image, merges via spatial attention to preserve consistency across frames |
| **Pose Guider** | Efficient pose encoder directing character movement, ensuring precise controllability and continuity |
| **Temporal Modeling** | Guarantees smooth inter-frame transitions for fluid video output |
| **Denoising UNet** | Fuses encoded pose sequences with multi-frame noise; integrates reference features through Spatial-Attention (ReferenceNet), Cross-Attention (CLIP image encoder), Temporal-Attention (time dimension) |
| **VAE Decoder** | Final decoding step outputting generated video clip |

## Capabilities
- Universal character support: humans, anime/cartoon figures, humanoid models
- Single static image → animated video driven by pose sequences
- Fashion video synthesis (UBC fashion video dataset)
- Human dance generation (TikTok dataset)
- Expanded training data enables animation of arbitrary characters beyond training distribution

## Inference Acceleration (DeepGPU/AIACC)
Alibaba Cloud DeepGPU optimization:
- A10 GPU: 2.45s → 1.75s (~40% faster)
- RTX 6000: 2.80s → 2.25s (~25% faster)
- 32 frames @ 832×640 resolution, 1 step

## Integrations
- Virtual Try-On: combined with Outfit Anyone
- Talking-Head Generation: integrated with VividTalk lip-sync tech

## Paper Citation
```bibtex
@article{hu2023animateanyone,
  title={Animate Anyone: Consistent and Controllable Image-to-Video Synthesis for Character Animation},
  author={Li Hu and Xin Gao and Peng Zhang and Ke Sun and Bang Zhang and Liefeng Bo},
  journal={arXiv preprint arXiv:2311.17117},
  year={2023}
}
```
