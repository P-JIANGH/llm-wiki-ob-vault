# PAniC-3D: Stylized Single-view 3D Reconstruction from Portraits of Anime Characters

Source: https://github.com/ShuhongChen/panic3d-anime-reconstruction
Extracted: 2026-04-22

## Overview

PAniC-3D is a system to reconstruct stylized 3D character heads directly from illustrated (p)ortraits of (ani)me (c)haracters. This is a CVPR 2023 paper by Shuhong Chen et al.

## Authors

Shuhong Chen, Kevin Zhang, Yichun Shi, Heng Wang, Yiheng Zhu, Guoxian Song, Sizhe An, Janus Kristjansson, Xiao Yang, Matthias Zwicker

## Paper

- arXiv: https://arxiv.org/abs/2303.14587
- Conference: CVPR 2023
- Poster: supplementary/cvpr2023_poster.pdf
- Video: https://www.youtube.com/watch?v=7NosmLieg6A

## Key Features

- Reconstructs stylized 3D character heads from single anime portrait illustrations
- Addresses unique challenges: complex hair/accessory geometry, non-photorealistic contour lines
- Uses line-filling model to cross illustration-to-3D domain gap
- Represents geometries with volumetric radiance field
- Supports talking head demo with expression changes

## Datasets

Two large new datasets created:
- 11.2k Vroid 3D models
- 1k Vtuber portrait illustrations

Plus AnimeRecon benchmark of illustration-to-3D pairs for evaluation.

## Architecture

The system crosses the illustration-to-3D domain gap with:
1. **Line-filling model** - bridges domain gap from illustration to 3D
2. **Volumetric radiance field** - represents sophisticated geometries

Related repos in ecosystem:
- A) panic3d-anime-reconstruction (this repo): reconstruction models
- B) vtubers-dataset: download 2D data
- C) vroid-dataset: download 3D data
- D) animerecon-benchmark: download 2D-3D paired evaluation dataset
- C+D) vroid_renderer: convert and render 3D models

## Talking Head Demo

Extends PAniC-3D to provide a 3D talking head from a single portrait illustration:
- Mesh extraction with normals through marching cubes
- Two bones with linear blend skinning (can be automated with RigNet)
- Position and normal rendering for radiance field queries
- Incorporates talking-head-anime-2 for expression changes

## Setup

Requires Docker with GPU support:

```bash
make/docker_pull
make/shell_docker
# OR
make/docker_build
make/shell_docker
```

Copy `./_env/machine_config.bashrc.template` to `./_env/machine_config.bashrc` and set `$PROJECT_DN` to the absolute path.

## Evaluation Results

```
# RTX 3080 Ti             GTX 1080 Ti
# ======================  ======================
# front  clip   94.667    front  clip   94.659
# front  lpips  19.373    front  lpips  19.367
# front  psnr   16.914    front  psnr   16.910
# back   clip   85.046    back   clip   85.117
# back   lpips  30.017    back   lpips  30.012
# back   psnr   15.508    back   psnr   15.509
# 360    clip   84.606    360    clip   84.629
# 360    lpips  25.252    360    lpips  25.250
# 360    psnr   15.977    360    psnr   15.976
# geom   cd      1.329    geom   cd      1.328
# geom   f1@5   37.725    geom   f1@5   38.051
# geom   f1@10  65.498    geom   f1@10  65.813
```

## Training

Training script at: `./_train/eg3dc/runs/ecrutileE_eclustrousC_n120/ecrutileE_eclustrousC_n120.sh`

## Citation

```bibtex
@inproceedings{chen2023panic3d,
    title={PAniC-3D: Stylized Single-view 3D Reconstruction from Portraits of Anime Characters},
    author={Chen, Shuhong and Zhang, Kevin and Shi, Yichun and Wang, Heng and Zhu, Yiheng and Song, Guoxian and An, Sizhe and Kristjansson, Janus and Yang, Xiao and Matthias Zwicker},
    booktitle={Proceedings of the IEEE/CVF Conference on Computer Vision and Pattern Recognition (CVPR)},
    year={2023}
}
```

## Based On

This repo is heavily based off the NVlabs/eg3d repo.

## License

Not explicitly stated in README.
