# StyleAvatar3D — Raw Source

**Source:** https://github.com/icoz69/StyleAvatar3D
**Paper:** https://arxiv.org/abs/2305.19012
**Date captured:** 2026-04-19

## README Summary

**Title:** StyleAvatar3D: Leveraging Image-Text Diffusion Models for High-Fidelity 3D Avatar Generation

**Authors:** Chi Zhang, Yiwen Chen, Yijun Fu, Zhenglin Zhou, Gang YU, Billzb Wang, BIN FU, Tao Chen, Guosheng Lin, Chunhua Shen

**Abstract:** The recent advancements in image-text diffusion models have stimulated research interest in large-scale 3D generative models. Nevertheless, the limited availability of diverse 3D resources presents significant challenges to learning. In this paper, we present a novel method for generating high-quality, stylized 3D avatars that utilizes pre-trained image-text diffusion models for data generation and a Generative Adversarial Network (GAN)-based 3D generation network for training.

### Key Method Details
- Uses pre-trained image-text diffusion models to generate multi-view avatar images in various styles
- Employs poses extracted from existing 3D models to guide multi-view image generation
- Investigates view-specific prompts to address misalignment between poses and images
- Develops a coarse-to-fine discriminator for GAN training
- Explores attribute-related prompts to increase avatar diversity
- Develops a latent diffusion model within the style space of StyleGAN for image-based avatar generation
- Demonstrates superior performance over SOTA methods in visual quality and diversity

### Demos
- Avatars of different styles (video demo)
- Latent space walk (video demo)
- Cartoon character reconstruction (image + video demo)

### Code Status
Code NOT released — "Due to company policy, we are not able to open-source codes recently."

### Citation
```
@misc{zhang2023styleavatar3d,
  title={StyleAvatar3D: Leveraging Image-Text Diffusion Models for High-Fidelity 3D Avatar Generation},
  author={Chi Zhang and Yiwen Chen and Yijun Fu and Zhenglin Zhou and Gang YU and Billzb Wang and Bin Fu and Tao Chen and Guosheng Lin and Chunhua Shen},
  year={2023},
  eprint={2305.19012},
  archivePrefix={arXiv},
  primaryClass={cs.CV}
}
```

### License
MIT License (Copyright 2023 icoz69)

### Repository Contents
- README.md (58 lines)
- teaser.png (teaser image showing avatar styles)
- lora.png (cartoon character reconstruction demo)
- LICENSE (MIT)
- No code, no requirements, no config files
