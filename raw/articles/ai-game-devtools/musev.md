# MuseV — Source Analysis

**Source:** https://github.com/TMElyralab/MuseV
**Clone:** gitcode.com mirror (GitHub timeout)
**Date:** 2026-04-19

## README Summary

MuseV: Infinite-length and High Fidelity Virtual Human Video Generation with Visual Conditioned Parallel Denoising

**Authors:** Zhiqiang Xia, Zhaokang Chen, Bin Wu, Chao Li, Kwok-Wai Hung, Chao Zhan, Yingjie He, Wenjiang Zhou
**Organization:** Lyra Lab, Tencent Music Entertainment (TME)

MuseV is a diffusion-based virtual human video generation framework that:
- Supports infinite-length video generation via Visual Conditioned Parallel Denoising scheme
- Has checkpoints trained on human datasets (~60K text-video pairs, 512×320 resolution)
- Supports Image2Video, Text2Image2Video, Video2Video
- Compatible with Stable Diffusion ecosystem (base_model, LoRA, ControlNet, etc.)
- Supports multi-reference image tech: IPAdapter, ReferenceOnly, ReferenceNet, IPAdapterFaceID

## Model Architecture

Three checkpoint variants:
1. **musev/unet:** Only UNet motion module trained, ~8GB VRAM (512×512, time_size=12)
2. **musev_referencenet:** UNet + ReferenceNet + IPAdapter trained, ~12GB VRAM
   - UNet with to_k/to_v in Attention layer (IPAdapter-style)
   - ReferenceNet similar to AnimateAnyone
   - ip_adapter_image_proj.bin for CLIP vision embedding projection
3. **musev_referencenet_pose:** Based on musev_referencenet, fixes ReferenceNet + ControlNet_Pose, trains UNet motion + IPAdapter, ~12GB VRAM

Base T2I models: majicmixRealv6Fp16, fantasticmix_v10 (SD 1.5-based, swappable)
IP-Adapter: h94/IP-Adapter checkpoints (ip-adapter_sd15.bin, ip-adapter-faceid_sd15.bin)

## Key Technical Features

- **Visual Conditioned Parallel Denoising:** Novel scheme enabling infinite-length generation without accumulated error
- Two generation modes: (1) set n_batch=1, time_size=all frames for parallel denoise; (2) traditional end-to-end with context_frames=12
- Video2Video supports RGB video or controlnet_middle_video as reference
- 20+ ControlNet conditions supported via MMCM: pose, dwpose, canny, depth, hed, normal_bae, lineart, zoe, sam, etc.
- Gradio demo included (scripts/gradio/app.py)
- ComfyUI integration available

## Directory Structure

```
musev/
├── configs/
│   ├── model/     # T2I_all_model.py, motion_model.py
│   └── tasks/     # example.yaml task definitions
├── musev/
│   ├── models/    # temporal_transformer.py, unet_loader.py, text_model.py, facein_loader.py
│   ├── pipelines/ # pipeline_controlnet.py, context.py
│   ├── auto_prompt/  # human.py, style.py, attributes templates
│   └── utils/     # register.py, model_util.py, tensor_util.py, vae_util.py
├── scripts/
│   └── inference/ # text2video.py, video2video.py
├── MMCM/          # multi-media cross-modal processing package (git submodule)
├── diffusers/     # modified diffusers (git submodule)
└── controlnet_aux/ # modified controlnet_aux (git submodule)
```

## Dependencies

- Docker image: anchorxia/musev:latest (recommended)
- Conda env from environment.yml or pip requirements.txt
- OpenMMLab: mmengine, mmcv>=2.0.1, mmdet>=3.1.0, mmpose>=1.1.0
- Custom packages: MMCM, modified diffusers, controlnet_aux
- Trained on ucf101 + webvid datasets (~60K video-text pairs)

## Limitations (self-reported)

- Generalization varies across visual conditions and T2I base models
- Limited video types and motion range due to training data size
- Watermarks may appear (webvid source)
- Parallel denoise suitable for relatively fixed camera scenes only
- Undertrained ReferenceNet and IP-Adapter
- Complex, unrefactored codebase

## License

- Code: MIT License (academic + commercial)
- Models: Non-commercial research only
- Third-party models: subject to their licenses (insightface, IP-Adapter, ft-mse-vae)

## Related Projects from Same Lab

- **MuseTalk:** Real-time lip sync model (30fps+), pairs with MuseV for complete virtual human generation
- **MusePose:** Pose-driven image-to-video framework for virtual humans
