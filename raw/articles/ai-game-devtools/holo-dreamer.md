# HoloDreamer: Holistic 3D Panoramic World Generation from Text Descriptions

> Source: https://github.com/zhouhyOcean/HoloDreamer
> Paper: https://arxiv.org/abs/2407.15187
> Project Page: https://zhouhyocean.github.io/holodreamer/
> License: MIT
> Authors: Haiyang Zhou, Xinhua Cheng, Wangbo Yu, Yonghong Tian, Li Yuan
> Affiliations: Peking University, Peng Cheng Laboratory
> Subjects: cs.CV, cs.GR

## Core Concept

HoloDreamer generates complete 3D panoramic scenes from text descriptions. Unlike iterative outpainting approaches that cause global inconsistency and incomplete geometry, HoloDreamer first generates a high-definition equirectangular panorama as holistic initialization of the full 3D scene, then uses 3D Gaussian Splatting (3D-GS) to quickly reconstruct the 3D scene.

## Architecture

### Module 1: Stylized Equirectangular Panorama Generation
- Combines multiple diffusion models to synthesize high-quality, stylized panoramas from complex text prompts
- Applies circular blending technique to eliminate visible seams during 360° rotation
- Generates complete 360° equirectangular projection as initial scene representation

### Module 2: Enhanced Two-Stage Panorama Reconstruction
- Uses 3D Gaussian Splatting (3D-GS) for fast, high-fidelity 3D scene reconstruction
- Two-stage optimization pipeline for inpainting missing regions and maximizing geometric integrity

### Processing Pipeline
1. **Depth & Projection:** Monocular depth estimation → RGBD projection → initial 3D point cloud
2. **Camera Configuration:** Dual-camera system (Base cameras + Supplementary cameras) for varied viewing scenarios
3. **Supervision Setup:** Three distinct image sets to supervise different phases of 3D-GS training
4. **Optimization Pipeline:**
   - Pre-Optimization: Initial 3D-GS training & rendering
   - Inpainting: Renders processed to fill missing/occluded regions
   - Transfer Optimization: Inpainted data guides final optimization

## Performance

Outperforms prior methods in:
- Visual consistency
- Scene harmony
- Reconstruction quality
- Rendering robustness

## Example Generation Prompts

- Lego city with lego shops, roads, street lamps, cars, trees, park
- Mountain town in anime style with cherry blossoms
- Dense tropical rainforest with towering trees and waterfalls
- Floating community city with islands and orbs
- Venezia in oil painting style
- Classical library with ancient books and scrolls
- High-tech sci-fi laboratory

## Technical Stack

- 3D Gaussian Splatting (3D-GS) for scene reconstruction
- Diffusion models for panorama generation
- Monocular depth estimation
- Circular blending for seam elimination

## Citation

```
@misc{zhou2024holodreamerholistic3dpanoramic,
  title={HoloDreamer: Holistic 3D Panoramic World Generation from Text Descriptions},
  author={Haiyang Zhou and Xinhua Cheng and Wangbo Yu and Yonghong Tian and Li Yuan},
  year={2024},
  eprint={2407.15187},
  archivePrefix={arXiv},
  primaryClass={cs.CV},
  url={https://arxiv.org/abs/2407.15187},
}
```
