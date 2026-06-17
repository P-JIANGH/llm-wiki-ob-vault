# DUSt3R: Geometric 3D Vision Made Easy

**Source:** https://github.com/naver/dust3r
**Paper:** arXiv:2312.14132 (CVPR 2024)
**Authors:** Shuzhe Wang, Vincent Leroy, Yohann Cabon, Boris Chidlovskii, Jerome Revaud (Naver Labs Europe)

## README Summary

DUSt3R is a simple and powerful foundation model for 3D vision. It takes 2+ images of a scene and directly outputs:
- 3D pointmaps (point clouds) for each image
- Camera poses (focal length + extrinsic poses)
- Confidence masks

The key innovation: DUSt3R treats 3D reconstruction as a regression problem rather than traditional multi-view geometry optimization. It uses an asymmetric CroCo (Cross-Contrastive) stereo architecture with ViT encoder-decoder.

## Architecture

- **Backbone:** AsymmetricCroCo3DStereo — two siamese ViT encoders + decoder blocks
- **Encoder:** ViT-Large (ViT-L)
- **Decoder:** ViT-Base (ViT-B)
- **Head Options:** Linear head or DPT (Dense Prediction Transformer) head
- **Positional Embeddings:** RoPE (Rotary Position Embedding) with optional CUDA kernels
- **Patch Embedding:** PatchEmbedDust3R or ManyAR_PatchEmbed

## Pre-trained Models

| Model | Resolution | Head | Encoder | Decoder |
|-------|-----------|------|---------|---------|
| DUSt3R_ViTLarge_BaseDecoder_224_linear | 224×224 | Linear | ViT-L | ViT-B |
| DUSt3R_ViTLarge_BaseDecoder_512_linear | 512×384, 512×336, etc | Linear | ViT-L | ViT-B |
| DUSt3R_ViTLarge_BaseDecoder_512_dpt | 512×384, 512×336, etc | DPT | ViT-L | ViT-B |

## Key Modules

- `dust3r/model.py` — AsymmetricCroCo3DStereo main model class, inherits from CroCoNet, supports HuggingFace hub integration
- `dust3r/heads/dpt_head.py` — DPT head for dense prediction
- `dust3r/heads/linear_head.py` — Simple linear projection head
- `dust3r/cloud_opt/` — Global alignment optimizers:
  - `PointCloudOptimizer` — Full bundle adjustment optimization
  - `ModularPointCloudOptimizer` — Modular variant
  - `PairViewer` — Simple pair conversion (no optimization needed for 2 images)
- `dust3r/inference.py` — Inference pipeline
- `dust3r/image_pairs.py` — Image pairing strategies (scene graph construction)
- `dust3r/training.py` — Training loop
- `dust3r/losses.py` — Loss functions
- `dust3r/datasets/` — Dataset loaders: CO3Dv2, ARKitScenes, ScanNet++, BlendedMVS, WayMo, Habitat, MegaDepth, StaticThings3D, WildRGB-D

## Pipeline

1. Load images → `load_images()`
2. Make image pairs → `make_pairs()` with scene graph strategy
3. Run inference → `inference()` produces raw 3D point predictions
4. Global alignment → `global_aligner()` with PointCloudOptimizer/PairViewer
5. Extract results: focals, poses, 3D points, confidence masks
6. Visualize → `scene.show()`

## Dependencies

torch, torchvision, roma, gradio, matplotlib, tqdm, opencv-python, scipy, einops, trimesh, tensorboard, pyglet<2, huggingface-hub[torch]>=0.22

## Training Datasets

CO3Dv2, ARKitScenes, ScanNet++, BlendedMVS, WayMo Open dataset, Habitat-Sim, MegaDepth, StaticThings3D, WildRGB-D

## License

CC BY-NC-SA 4.0 (non-commercial use only)

## Related Projects (from README)

- MASt3R — DUSt3R with local feature head, metric pointmaps, scalable global alignment
- Pow3R — DUSt3R with known depth/focal length/poses priors
- MUSt3R — Multi-view network for stereo 3D reconstruction (RGB SLAM/SfM without global alignment)
