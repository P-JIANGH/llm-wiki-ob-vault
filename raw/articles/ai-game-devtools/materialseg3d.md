# Raw Source: MaterialSeg3D

**Source:** https://github.com/PROPHETE-pro/MaterialSeg3D (original), https://github.com/PROPHETE-pro/MaterialSeg3D (updated with MIO dataset)
**Date:** 2026-04-18
**Conference:** ACM Multimedia 2024 (Oral)
**ArXiv:** 2404.13923

## README

The official repo for MaterialSeg3D is updated with our MIO dataset.

## Project Summary (from GitHub)

MaterialSeg3D is a novel pipeline that generates dense surface **PBR (Physically Based Rendering) material information** for 3D assets by leveraging 2D prior knowledge.

- **Motivation:** Mimics expert 3D modelers who manually apply materials based on visual priors.
- **Approach:** Uses a 2D perception-based method trained on public 2D images/datasets to automatically predict and segment surface material properties onto 3D meshes.

## Datasets

| Dataset | Details |
|:---|:---|
| **MIO** (Materialized Individual Objects) | `MIO.pkl` contains `Roughness` & `Metalness` values per material class under `coordinates` key |
| **MIO++** | Extended dataset for broader material coverage |

## Installation & Dependencies

- Requires `control_sd15_depth.pth` from ControlNet
- Critical dependency fix: use conda for pytorch-lightning==1.9.1 + pytorch==1.12.1
- Downgrade huggingface_hub==0.22.2 after installing transformers
- Full environment specs in `MaterialSeg3d-envs.txt`

## Inference

```bash
python gradio_demo.py
```

### Pipeline Steps
| Step | Script |
|:---|:---|
| Render ShapeNet data | `./GET3D/render_shapenet_data/render_shapenet.py` |
| 2D to UV mapping | `./Text2Tex/scripts/view_2_UV.py` |
| Example input | `./example/car/car.obj` |
| Output directory | `/output` |

### Supported Categories
`car`, `furniture`, `building`, `instrument`, `plant`

## Repository Structure

```
MaterialSeg3D/
├── GET3D/                 # 3D generation & rendering module
├── Text2Tex/              # 2D-to-texture/material mapping
├── mmsegmentation/        # Semantic segmentation backbone
├── example/               # Sample OBJ files & assets
├── figure/                # Teaser & comparison images
├── MIO.pkl / MIO++.pkl    # Dataset files with material properties
├── gradio_demo.py         # Interactive inference UI
├── material_glb.py        # GLB material export utilities
├── trans_glb.py           # GLB transformation/conversion
└── MaterialSeg3d-envs.txt # Exact environment dependencies
```

## Outputs

- Generates segmented material maps compatible with Unreal Engine (`material_ue.png`)
- Produces detailed PBR material assignments on complex meshes
