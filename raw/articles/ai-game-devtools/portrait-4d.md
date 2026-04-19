# Portrait4D — Raw Source Analysis

**Source:** https://github.com/YuDeng/Portrait-4D
**Date:** 2026-04-19
**Papers:**
- Portrait4D (CVPR 2024): Learning One-Shot 4D Head Avatar Synthesis using Synthetic Data
- Portrait4D-v2 (ECCV 2024): Pseudo Multi-View Data Creates Better 4D Head Synthesizer

## README Summary

Portrait4D is a one-shot video-driven 4D head synthesizer by Yu Deng et al. from Xiaobing.AI.
The method learns 4D head synthesis from synthetic data, avoiding reliance on inaccurate 3DMM reconstruction.

### Architecture
- **GenHead**: Part-wise 4D generative model trained via adversarial learning on synthetic data
  - Conditions on FLAME parameters (shape/expression/motion)
  - StyleGAN3-based architecture with super-resolution
  - Trained on FFHQ at 512×512 resolution
- **Portrait4D (v1)**: Transformer-based animatable triplane reconstructor
  - Learns 4D head reconstruction from synthetic data
  - Novel strategy: disentangles 3D reconstruction and reenactment learning
  - Trained purely on synthetic data from GenHead (no real video needed)
- **Portrait4D-v2**: Uses pseudo multi-view videos instead of monocular
  - 3D head synthesizer converts monocular real videos → multi-view
  - Cross-view self-reenactment training
  - Simple ViT backbone with motion-aware cross-attentions
  - Trained on VFHQ dataset at 512×512

### Key Dependencies
- FLAME head model (for pose/shape/expression control)
- PD-FGC (for motion embedding extraction)
- PyTorch3D (for 3D operations)
- Deep3DFaceRecon (for 3D face reconstruction during preprocessing)
- RetinaFace, H3R, 3DFAN (for landmark detection)
- StyleGAN2/3 networks (inherited generator architecture)
- Mix Transformer (SegFormer) for segmentation

### Hardware Requirements
- Training: 8× Tesla A100 (80GB)
- Inference: V100 (32GB)

### Pipeline Components
```
data_preprocess/
├── RetinaFace → face detection
├── H3R → 2D landmark prediction
├── 3DFAN → 3D landmark prediction
├── Deep3DFaceRecon → 3D face reconstruction (BFM params)
├── BFM_to_FLAME → parameter space transformation
├── flame_optim → landmark-based FLAME refinement
├── extract_pdfgc → PD-FGC motion embedding extraction
└── Mask2Former → face segmentation

portrait4d/
├── GenHead (stylegan-based generator)
├── TriPlaneReconstructor (v1 reconstructor)
├── Portrait4D-v2 reconstructor (ViT + cross-attention)
├── Training scripts: train_genhead.py, train_recon_v1.py, train_recon_v2.py
├── Inference: gen_images_portrait4d.py
└── Metrics: FID, KID, PPL, equivariance
```

### BFM to FLAME Transformation
Two approaches:
1. **Simplified**: Light-weight MLP mapping BFM → FLAME (fast, for inference)
2. **Full**: Mesh-based optimization (BFM_to_FLAME) + landmark-based refinement (used in training)

### Training Data
- FFHQ (images): For GenHead training
- VFHQ (videos): For Portrait4D-v2 training
- LMDB format for efficient data loading
- Data preprocessing pipeline: landmarks, cropped images, FLAME params, segmentation, motion embeddings

### License
Not explicitly stated in README. Papers by Xiaobing.AI.

### Key Technical Innovations
1. Synthetic data-driven learning — avoids 3DMM dependency
2. Part-wise 4D generation (GenHead) → synthetic data → reconstructor training
3. Disentangled reconstruction vs. reenactment learning
4. Pseudo multi-view conversion (v2)
5. Motion-aware cross-attention mechanism (v2)
6. Marching cubes mesh extraction from SDF
