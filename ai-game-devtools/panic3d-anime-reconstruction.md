---
title: PAniC-3D
created: 2026-04-22
updated: 2026-04-22
type: entity
tags: [3d, avatar, tool, open-source, computer-vision]
sources: [raw/articles/ai-game-devtools/panic3d-anime-reconstruction.md]
---

# PAniC-3D

## Overview

**PAniC-3D** (Portraits of Anime Characters - 3D) is a stylized single-view 3D reconstruction system that generates 3D character heads directly from anime portrait illustrations. Published at CVPR 2023 by Shuhong Chen et al.

Unlike natural human head reconstruction, anime portraits present unique challenges: complex/diverse hair and accessory geometry, non-photorealistic contour lines, and lack of paired 3D-illustration training data.

## Key Facts

| Attribute | Detail |
|-----------|--------|
| **Authors** | Shuhong Chen, Kevin Zhang, Yichun Shi, Heng Wang, Yiheng Zhu, Guoxian Song, Sizhe An, Janus Kristjansson, Xiao Yang, Matthias Zwicker |
| **Conference** | CVPR 2023 |
| **arXiv** | [2303.14587](https://arxiv.org/abs/2303.14587) |
| **Code** | https://github.com/ShuhongChen/panic3d-anime-reconstruction |
| **Base Architecture** | [EG3D](https://github.com/NVlabs/eg3d) (NVlabs) |
| **Datasets** | 11.2k Vroid 3D models + 1k Vtuber portraits + AnimeRecon benchmark |

## Architecture

Two core components bridge the illustration-to-3D domain gap:

1. **Line-filling model** — handles non-photorealistic contour lines and stylized shading in anime illustrations
2. **Volumetric radiance field** — represents sophisticated geometries (complex hair, accessories) beyond standard mesh reconstruction

## Capabilities

### Single-View Reconstruction
- Input: single anime character portrait illustration
- Output: stylized 3D head with complex hair/accessory geometry

### Talking Head Extension
- Mesh extraction via marching cubes with normals
- Linear blend skinning (2 bones, automatable via RigNet)
- Expression changes via [talking-head-anime-2](https://github.com/pkhungurn/talking-head-anime-2-demo)
- Position/normal rendering → radiance field queries (no explicit texture maps)

## Ecosystem Repositories

| Repo | Purpose |
|------|---------|
| panic3d-anime-reconstruction | Reconstruction models (this repo) |
| vtubers-dataset | 2D portrait data |
| vroid-dataset | 3D model data |
| animerecon-benchmark | 2D-3D paired evaluation |
| vroid_renderer | 3D model conversion/rendering |

## Evaluation Metrics (Best Model)

| View | CLIP↑ | LPIPS↓ | PSNR↑ |
|------|--------|---------|--------|
| Front | 94.67 | 19.37 | 16.91 |
| Back | 85.05 | 30.02 | 15.51 |
| 360° | 84.61 | 25.25 | 15.98 |
| Geometry | CD↓ 1.33 | F1@5 37.73 | F1@10 65.50 |

## Comparison with Similar Tools

| Feature | [[panic3d-anime-reconstruction]] | [[sf3d]] | [[unique3d]] |
|---------|----------------------------------|----------|--------------|
| Target Domain | Anime/stylized characters | General objects | General objects |
| Input | Illustration (non-photoreal) | Photo | Photo |
| Output | Radiance field + mesh | Textured mesh | Mesh |
| Hair/Accessories | Optimized for complex stylized geometry | Standard | Standard |

## Related Links

- GitHub: https://github.com/ShuhongChen/panic3d-anime-reconstruction
- arXiv: https://arxiv.org/abs/2303.14587
- Video demo: https://www.youtube.com/watch?v=7NosmLieg6A
- Data drive: [Google Drive](https://drive.google.com/drive/folders/1Zpt9x_OlGALi-o-TdvBPzUPcvTc7zpuV?usp=share_link)
- [[sf3d]] — Stability AI single-image-to-3D (general domain)
- [[unique3d]] — Single-image-to-3D reconstruction
- [[hunyuan3d-2]] — Tencent Hunyuan 3D asset generation
