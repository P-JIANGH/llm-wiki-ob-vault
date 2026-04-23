# DrawingSpinUp: 3D Animation from Single Character Drawings

**Source:** https://github.com/LordLiang/DrawingSpinUp  
**Paper:** SIGGRAPH Asia 2024, arXiv:2409.08615  
**Authors:** Jie Zhou, Chufeng Xiao, Miu-Ling Lam, Hongbo Fu (City University of Hong Kong)  
**Date ingested:** 2026-04-23

---

## README Summary

DrawingSpinUp generates stylized 3D animations from a single 2D character drawing. It addresses the limitation of existing methods that only produce flat 2D motions by reconstructing a 3D textured character and rendering it with preserved artistic style.

### Hardware Requirements
- Single RTX 4090 GPU (RTX 2080 Ti also works)

### Environment
- Python 3.8.20
- PyTorch 2.0.0
- CUDA Toolkit 11.8
- Ubuntu 22.04

### Three-Stage Pipeline

**Stage 1: Contour Removal (`1_lama_contour_remover/`)**
- Uses FFC-ResNet (LaMa backbone) to predict and remove contour regions from character drawings
- Renders training images with bicar_render_codes borrowed from Wonder3D
- Inference: `python predict.py`
- Output: `ffc_resnet_inpainted.png` (contour-free texture)

**Stage 2: Textured Character Generation (`2_charactor_reconstructor/`)**
- Multi-view image generation via `mv.py` using diffusers
- Textured 3D character reconstruction via `recon.py`
- Uses ISNet for background removal of generated multi-view images
- Outputs textured mesh `.obj` file
- Based on instant-nsr for neural surface reconstruction

**Stage 3: Stylized Contour Restoration (`3_style_translator/`)**
- Two-stage training (train_stage1.py + train_stage2.py) using Few-Shot Patch-Based Training approach
- Blender rendering for keyframe pairs (run_render.py)
- Inference restores stylized contours on animated frames while maintaining 3D effects
- Generates GIF animation via gif_writer.py
- Requires Mixamo for rigging and animation retargeting

### Key Dependencies
- diffusers[torch]==0.19.3
- transformers==4.25.1
- xformers==0.0.17
- nerfacc==0.3.3
- open3d==0.18.0
- trimesh==3.9.8
- tiny-cuda-nn
- pytorch_lightning==1.9.5
- onnxruntime==1.19.2
- scikit-image==0.21.0

### Dataset
- 120 preprocessed character drawings from Amateur Drawings Dataset (Facebook Research)
- Input format: 512x512 `texture.png` + foreground `mask.png`
- Uses Blender 3.6.14 for frame rendering

### Acknowledgements
- LaMa (advimman/lama) — contour removal backbone
- Wonder3D (xxlong0/Wonder3D) — rendering codes and multi-view generation
- Few-Shot-Patch-Based-Training (OndrejTexler) — style transfer approach

### License
Not explicitly stated in repository.
