# ID-Animator — Zero-Shot ID-Preserving Human Video Generation

Source: https://github.com/ID-Animator/ID-Animator
Paper: https://arxiv.org/abs/2404.15275
Project Page: https://id-animator.github.io/
HuggingFace: https://huggingface.co/ID-Animator/ID-Animator
Online Demo: https://huggingface.co/spaces/ID-Animator/ID-Animator

## Authors
Xuanhua He, Quande Liu*, Shengju Qian, Xin Wang, Tao Hu, Ke Cao, Keyu Yan, Jie Zhang* (*Corresponding)

## Abstract
Generating high fidelity human video with specified identities has attracted significant attention in the content generation community. However, existing techniques struggle to strike a balance between training efficiency and identity preservation, either requiring tedious case-by-case finetuning or usually missing the identity details in video generation process.

ID-Animator is a zero-shot human-video generation approach that can perform personalized video generation given single reference facial image without further training. It inherits existing diffusion-based video generation backbones with a face adapter to encode ID-relevant embeddings from learnable facial latent queries.

An ID-oriented dataset construction pipeline incorporates decoupled human attribute and action captioning technique from a constructed facial image pool. A random face reference training method is devised to precisely capture ID-relevant embeddings from reference images.

## Key Features
- **Zero-shot ID preservation**: Single reference face image → personalized video, no finetuning needed
- **Face Adapter**: Encodes identity-relevant embeddings via learnable facial latent queries
- **Identity Mixing**: Blend two reference faces to create mixed identity videos
- **ControlNet Compatible**: Works with sketch-based control for pose/structure guidance
- **Community Model Compatible**: Works with AnimateDiff, RealisticVision, and other SD-based models

## Architecture
- **Backbone**: AnimateDiff UNet3DConditionModel + SD 1.5 (realisticVisionV60B1)
- **Face Adapter**: CLIP Vision (CLIPVisionModelWithProjection) → Resampler (4 layers, 12 heads, dim=1024, 16 tokens)
- **Attention**: LoRAFaceAttnProcessor with rank=128, injected into cross-attention layers
- **Face Detection**: insightface (buffalo_l model) for face detection and alignment
- **Scheduler**: DDIM (30 steps, guidance_scale=8)
- **Output**: 512x512, 16 frames

## Key Modules
- `FaceAdapterPlusForVideoLora`: Main adapter class, extends FaceAdapterLora with Resampler-based projection
- `FaceAdapterLora`: Base adapter with ImageProjModel projection
- `LoRAFaceAttnProcessor`: Custom attention processor with face ID injection
- `Resampler`: 4-layer transformer resampler (dim_head=64, heads=12, ff_mult=4)

## Dependencies
- torch 2.2.0, torchvision 0.17.0, xformers 0.0.24
- diffusers, transformers 4.31.0
- insightface 0.7.3 (face detection/alignment)
- accelerate 0.27.2, omegaconf 2.3.0
- gradio 4.27.0 (UI), wandb 0.15.12

## License
Not specified in README (likely academic/research use)

## Roadmap (from README)
- [x] Release ID-Animator checkpoints and inference scripts
- [ ] Release ID-Animator dataset and training scripts
- [ ] Release ID-Animator SDXL version

## Comparison Notes
- Unlike IP-Adapter/InstantID which focus on image generation, ID-Animator targets video generation
- Compatible with AnimateDiff motion modules for temporal consistency
- Supports identity mixing (multiple reference faces averaged in embedding space)
- Can combine with ControlNet for sketch-guided generation
