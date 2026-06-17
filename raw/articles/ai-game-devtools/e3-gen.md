# E3Gen: Efficient, Expressive and Editable Avatars Generation

> Source: https://github.com/olivia23333/E3Gen
> Extracted: 2026-04-18 (GitHub README via web_extract; all git clone sources failed)

## Project Overview
Official PyTorch implementation for generating **efficient, expressive, and editable 3D human avatars**.
Published at **ACM MM '24** (Proceedings of the 32nd ACM International Conference on Multimedia).

## Key Resources
- **Paper:** [ACM MM '24](https://dl.acm.org/doi/10.1145/3664647.3681409) | [Arxiv](http://arxiv.org/abs/2405.19203)
- **Project Page:** [olivia23333.github.io/E3Gen](https://olivia23333.github.io/E3Gen/)
- **Related Work:** [Disentangled Clothed Avatar Generation with Layered Representation](https://olivia23333.github.io/LayerAvatar/) (Arxiv, code pending)

## Repository Structure
| Path | Purpose |
|---|---|
| `lib/` | Core models, deformers, SMPL-X/FLAME integrations |
| `configs/` | Configuration files |
| `scripts/`, `tools/` | Data processing & utility scripts |
| `train.py`, `test.py` | Main training & evaluation entry points |
| `setup.py`, `requirements.txt` | Environment & dependency setup |

## Technical Architecture
- **Core Models:** SMPL-X v1.1 and FLAME body model integration
- **Deformers:** Custom deformation modules in `lib/models/deformers/`
- **UV Feature Planes:** Cached to `./cache` during training
- **Dataset:** THUman2.0 human scan dataset with SMPL-X fitting parameters
- **Rendering:** Modified ICON version for RGB image rendering from 3D scans

## Installation Prerequisites
1. Register & download SMPL-X and FLAME model files
2. Place models at `lib/models/deformers/smplx/SMPLX/`
3. Download `vgg16.pt` → `work_dirs/cache/`
4. Download THUman2.0 dataset + SMPL-X fitting params → `./data/THuman`
5. Render RGB images using modified ICON (known issue: `mesh.ray.intersects_any` hang)

## Training
- **Hardware:** 2x RTX 3090 (24GB) GPUs
- Checkpoints output to `./work_dirs`
- UV feature planes cached to `./cache`

## Inference
- Pre-trained model available on Google Drive
- Example `.pth` files for `transfer` and `edit` modes available
- **Status:** Editing and novel pose animation codes pending release

## Dataset Pipeline
1. THUman2.0 scans + SMPL-X parameters → `./data/THuman`
2. ICON rendering → RGB images per scan
3. Organized as `data/humanscan_wbg/{train|test}/{id}/{pose,rgb,smplx}/`
4. Cache file: `human_train_cache.pkl`

## Citation
```bibtex
@inproceedings{zhang2024e3gen,
  author = {Zhang, Weitian and Yan, Yichao and Liu, Yunhui and Sheng, Xingdong and Yang, Xiaokang},
  title = {E3Gen: Efficient, Expressive and Editable Avatars Generation},
  booktitle = {ACM MM '24},
  year = {2024},
  pages = {6860--6869}
}
```

## Key Notes
- Active development: editing & pose animation modules not yet released
- Known rendering hang issue with `scripts/render_thuman.sh` (ICON Issue #62)
- Primary maintainer: @olivia23333
