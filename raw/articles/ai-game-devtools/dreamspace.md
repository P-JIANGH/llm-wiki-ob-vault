# DreamSpace: Text-Driven Panoramic Texture Propagation

## Source Metadata
- **GitHub**: https://github.com/ybbbbt/dreamspace
- **Project Page**: https://ybbbbt.com/publication/dreamspace/
- **Paper**: https://ybbbbt.com/publication/dreamspace/media/DreamSpace.pdf
- **Video**: https://www.youtube.com/watch?v=20rK1B9oi8U
- **Publication**: IEEE VR 2024
- **arXiv**: arXiv:2310.13119

## Key Information
- **Title**: DreamSpace: Dreaming Your Room Space with Text-Driven Panoramic Panoramic Texture Propagation
- **Authors**: Bangbang Yang, Wenqi Dong, Lin Ma, Wenbo Hu, Xiao Liu, Zhaopeng Cui, Yuewen Ma
- **Repo Status**: Project landing page only (1 commit, no source code released)

## Abstract Summary
DreamSpace is a novel indoor scene texturing framework that delivers text-driven texture generation with enchanting details and authentic spatial coherence for 3D spatial applications (XR/VR).

**Key Insight**: Generate and propagate textures in panoramic space.
1. Transfer scene reconstruction panoramas into high-resolution stylized images aligned to real-world geometry
2. Propagate stylized panorama into rest of scenes with inpainting and imitating techniques, handling occlusions in complex real-world geometries

## Technical Approach
- **Coarse-to-fine panoramic texture generation** with dual texture alignment (geometry + texture cues)
- **Separated strategy**: texture inpainting in confident regions + implicit imitating network for occluded/tiny structural areas
- Text prompts for style transfer (cyberpunk, anime landscape, nebula, Harry Potter, etc.)
- Immersive VR application on HMD devices

## Datasets
- **DreamSpot Dataset**: Custom captured indoor scenes (iPhone image capture → scene reconstruction)
- **Replica Dataset**: office0, room0, room1

## Application
- Personalize appearance of real-world scene reconstructions with text prompts
- Immersive VR experiences on HMD devices
- Style transfer for indoor scene meshes

## BibTeX
```bibtex
@article{yang2023dreamspace,
  title={DreamSpace: Dreaming Your Room Space with Text-Driven Panoramic Texture Propagation},
  author={Yang, Bangbang and Dong, Wenqi and Ma, Lin and Hu, Wenbo and Liu, Xiao and Cui, Zhaopeng and Ma, Yuewen},
  booktitle={arXiv preprint arXiv:2310.13119},
  year={2023}
}
```
