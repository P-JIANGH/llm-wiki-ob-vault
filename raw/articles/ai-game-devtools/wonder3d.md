# Wonder3D — Raw Source

**Source:** https://github.com/xxlong0/Wonder3D
**Paper:** https://arxiv.org/abs/2310.15008 (CVPR 2024 Highlight)
**Ingested:** 2026-04-18

---

## README Summary

Wonder3D: Single Image to 3D using Cross-Domain Diffusion

Wonder3D reconstructs highly-detailed textured meshes from a single-view image in only 2~3 minutes. Wonder3D first generates consistent multi-view normal maps with corresponding color images via a cross-domain diffusion model, and then leverages a novel normal fusion method to achieve fast and high-quality reconstruction.

## Key Links
- Paper: https://arxiv.org/abs/2310.15008
- Project page: https://www.xxlong.site/Wonder3D/
- Hugging Face Demo: https://huggingface.co/spaces/flamehaze1115/Wonder3D-demo
- Colab: https://github.com/camenduru/Wonder3D-colab
- Wonder3D++ (advanced version): https://github.com/xxlong0/Wonder3D/tree/Wonder3D_Plus

## Architecture / Pipeline

1. **Cross-domain diffusion model**: Generates consistent multi-view normal maps + corresponding color images from a single input image
2. **Normal fusion method**: Fast and high-quality 3D reconstruction from the generated normal maps

### Camera System
- Uses input view-related coordinate system (not canonical like MVDream/SyncDreamer)
- Z_v and X_v aligned with UV dimensions of 2D input image
- Y_v vertical to 2D image plane, passes through ROI center
- 6 views at 0 elevation degree: azimuth angles 0, 45, 90, 180, -90, -45
- Orthographic camera assumption (no focal length estimation needed)

### Training (2 stages)
1. Stage 1: `train_mvdiffusion_image.py` — train multi-view attentions (normal or color flag randomly)
2. Stage 2: `train_mvdiffusion_joint.py` — add cross-domain attention modules into SD model, optimize only new parameters

### Inference
- Uses diffusers pipeline: `flamehaze1115/wonder3d-pipeline`
- Requires diffusers[torch]==0.19.3 (version sensitive)
- SAM (Segment Anything) for foreground mask
- `rembg` for background removal (or Clipdrop for better quality)

### Mesh Extraction
- **Instant-NSR** (faster, sharper textures): `instant-nsr-pl/configs/neuralangelo-ortho-wmask.yaml`
- **NeuS** (smoother, more robust, slower): `NeuS/run.sh`

## Project Structure
```
mvdiffusion/          # Core diffusion pipeline
configs/              # Training & inference configs
instant-nsr-pl/       # Instant-NSR mesh extraction
NeuS/                 # NeuS-based mesh extraction
render_codes/         # Training data preparation
gradio_app_mv.py      # Gradio demo: generate multi-view normals/colors
gradio_app_recon.py   # Gradio demo: generate + reconstruct
train_mvdiffusion_image.py   # Stage 1 training
train_mvdiffusion_joint.py   # Stage 2 training
test_mvdiffusion_seq.py      # Inference script
```

## Technical Specs
- Input: Single image (resized to 256×256)
- Output: 6 multi-view normal maps + color images → textured mesh
- Time: 2-3 minutes
- Framework: PyTorch + diffusers + Accelerate
- License: MIT

## News
- 2024.12.22: Extended to Wonder3D++ (advanced version)
- 2024.08.29: Fixed cross-domain attention bug in CFG inference (RGB/normal misalignment)
- 2024.05.29: Related work Era3D released (512×512, auto focal length/elevation)
- 2024.05.24: Related work CraftsMan3D released (3D native diffusion)
- 2024.03.19: Related work GeoWizard released (depth + normal from single image)
- 2024.02: Training code released
- 2023.10: Inference model and code released

## Acknowledgements
Borrowed code from: stable-diffusion, zero123, NeuS, SyncDreamer, instant-nsr-pl

## Related Works Mentioned
- GeoWizard (depth + normal)
- CraftsMan3D (3D native diffusion)
- Era3D (MV cross-domain diffusion, 512×512)
