# PAniC-3D: Stylized Single-view 3D Reconstruction from Anime Portraits

**Source:** https://github.com/shuhongchen/panic3d-anime-reconstruction
**Conference:** CVPR 2023
**Base Architecture:** [NVlabs/eg3d](https://github.com/NVlabs/eg3d)

## Project Overview
PAniC-3D reconstructs stylized 3D character heads directly from single illustrated anime portraits. The system bridges the illustration-to-3D domain gap and establishes a new benchmark for stylized single-view reconstruction.

> "We propose PAniC-3D, a system to reconstruct stylized 3D character heads directly from illustrated (p)ortraits of (ani)me (c)haracters... crosses the illustration-to-3D domain gap with a line-filling model, and represents sophisticated geometries with a volumetric radiance field."

## Core Innovation & Challenges

| Challenge | Solution |
|-----------|----------|
| Complex/diverse hair & accessory geometry | Represented via **volumetric radiance field** |
| Non-photorealistic contour lines | Crossed using a **line-filling model** |
| Lack of paired 3D/illustration training data | Created two large-scale datasets & **AnimeRecon** benchmark |

## Datasets & Benchmark
- **Training Data:** 11.2k VRoid 3D models + 1k VTuber portrait illustrations
- **Evaluation:** Novel **AnimeRecon** benchmark (illustration-to-3D pairs)
- **Performance:** Significantly outperforms baseline methods across all metrics

## Talking Head Demo Extension
Extends PAniC-3D to generate animated 3D talking heads from a single portrait:
1. **Mesh Extraction:** Marching cubes using surface normals
2. **Rigging:** Manual bone placement with Linear Blend Skinning (automation possible via [RigNet](https://zhan-xu.github.io/rig-net/))
3. **Rendering:** Intersection positions & normals are rendered as rays to query the radiance field (bypasses traditional texture maps)
4. **Expressions:** Driven by [talking-head-anime-2](https://github.com/pkhungurn/talking-head-anime-2-demo)

## Setup & Installation

### 1. Data Preparation
- Download `panic_data_models_merged.zip` from the [project Drive folder](https://drive.google.com/drive/folders/1Zpt9x_OlGALi-o-TdvBPzUPcvTc7zpuV?usp=share_link) and merge with the repo.
- **Symlink Recommendation:** All related repos share `./_data/lustrous`. Create a central folder on a large drive and symlink it as `./_data/lustrous` in each repository.

### 2. Environment Configuration
```bash
cp ./_env/machine_config.bashrc.template ./_env/machine_config.bashrc
# Edit file and set $PROJECT_DN to the absolute path of this repository
```

### 3. Docker Setup (GPU Required)
*Note: These are bash scripts inside `./make`, not standard `make` commands.*
```bash
# Option A: Pull pre-built image
make/docker_pull
make/shell_docker

# Option B: Build manually
make/docker_build
make/shell_docker
```

## Evaluation & Training
### Reproduce Paper Metrics
```bash
python3 -m _scripts.eval.generate && python3 -m _scripts.eval.measure
```
**Reported Results** (RTX 3080 Ti / GTX 1080 Ti):

| View | CLIP ↑ | LPIPS ↓ | PSNR ↑ |
|------|--------|---------|--------|
| Front | 94.66 / 94.66 | 19.37 / 19.37 | 16.91 / 16.91 |
| Back  | 85.05 / 85.12 | 30.02 / 30.01 | 15.51 / 15.51 |
| 360°  | 84.61 / 84.63 | 25.25 / 25.25 | 15.98 / 15.98 |

| Geometry Metric | Value |
|-----------------|-------|
| Chamfer Distance (CD) ↓ | 1.329 / 1.328 |
| F1@5 ↑ | 37.73 / 38.05 |
| F1@10 ↑ | 65.50 / 65.81 |

### Training
Best model configuration & hyperparameters:
`./_train/eg3dc/runs/ecrutileE_eclustrousC_n120/ecrutileE_eclustrousC_n120.sh`

## Citation
```bibtex
@inproject{chen2023panic3d,
  title={PAniC-3D: Stylized Single-view 3D Reconstruction from Portraits of Anime Characters},
  author={Chen, Shuhong and Zhang, Kevin and Shi, Yichun and Wang, Heng and Zhu, Yiheng and Song, Guoxian and An, Sizhe and Kristjansson, Janus and Yang, Xiao and Matthias Zwicker},
  booktitle={Proceedings of the IEEE/CVF Conference on Computer Vision and Pattern Recognition (CVPR)},
  year={2023}
}
```

*Heavily based on [NVlabs/eg3d](https://github.com/NVlabs/eg3d).*

## Key Resources
- [arXiv Paper](https://arxiv.org/abs/2303.14587) | [Demo Video](https://www.youtube.com/watch?v=7NosmLieg6A) | [CVPR Poster](/ShuhongChen/panic3d-anime-reconstruction/blob/master/supplementary/cvpr2023_poster.pdf)
- [Data & Demo Drive Folder](https://drive.google.com/drive/folders/1Zpt9x_OlGALi-o-TdvBPzUPcvTc7zpuV?usp=share_link)
