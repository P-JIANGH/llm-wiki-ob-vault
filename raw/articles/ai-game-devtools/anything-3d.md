# Anything-3D — Raw Source

**URL:** https://github.com/Anything-of-anything/Anything-3D
**Mirror:** gitcode.com (GitHub timed out)
**Date:** 2026-04-18
**Technical Report:** https://arxiv.org/abs/2304.10261

## README Summary

Anything-3D combines [Segment Anything](https://github.com/facebookresearch/segment-anything) with a series of 3D models to create interactive demos for single-view 3D reconstruction in the wild.

### Core Demos

1. **Anything-3D-Objects**: Combines SAM with 3DFuse to segment and reconstruct 3D objects from in-the-wild images. Pipeline: SAM segmentation → 3DFuse text-to-3D generation.

2. **Anything-3DNovel-View**: Combines SAM with Zero-1-to-3 to generate novel views of 3D objects from a single image.

3. **Anything-NeRF**: Combines SAM with NeRF to generate new perspectives. By eliminating complex backgrounds via SAM segmentation, NeRF reconstruction accuracy improves significantly for objects in cluttered scenes.

4. **Any-3DFace**: Combines SAM with HRN (Hierarchical Representation Network) for accurate face reconstruction from in-the-wild images.

### Key Dependencies

- Segment Anything (SAM) — interactive image segmentation
- 3DFuse — text-to-3D generation via diffusion models + NeRF
- Zero-1-to-3 — zero-shot single image to 3D object
- NeRF (nerf_pl) — neural radiance fields for view synthesis
- HRN — hierarchical face representation network
- BLIP — image captioning for text prompt generation
- Point-E — 3D point cloud generation

### Architecture

Main pipeline (`AnyObject3D/src/main.py`):
1. Load SAM (ViT-H model) for segmentation from user point prompt
2. Extract masked object region with affine transform to 512x512
3. Use BLIP (large_coco) to auto-generate text captions for the masked object
4. Pass masked image + text prompt to 3DFuse pipeline for 3D reconstruction
5. 3DFuse internally uses VoxNeRF + diffusion-based image sampling + point cloud projection

### Technology Stack

- Python, PyTorch 1.11 (CUDA 11.3)
- Diffusers 0.15.0, PyTorch3D 0.7.2
- Open3D, OpenCV, Gradio
- SalesForce LAVIS (BLIP models)
- CLIP, xformers,timm

### License

Not explicitly specified in README.

### Citation

```bibtex
@misc{shen2023anything3d,
    title={Anything-3D: Towards Single-view Anything Reconstruction in the Wild},
    author={Qiuhong Shen and Xingyi Yang and Xinchao Wang},
    year={2023},
    eprint={2304.10261},
    archivePrefix={arXiv},
    primaryClass={cs.CV}
}
```
