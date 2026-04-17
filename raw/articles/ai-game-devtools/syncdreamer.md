# SyncDreamer: Generating Multiview-consistent Images from a Single-view Image

Source: https://github.com/liuyuan-pal/SyncDreamer
Paper: https://arxiv.org/abs/2309.03453
Project page: https://liuyuan-pal.github.io/SyncDreamer/
Live Demo: https://huggingface.co/spaces/liuyuan-pal/SyncDreamer

## Overview

SyncDreamer is a multiview diffusion model that generates consistent images across 16 predefined viewpoints from a single input image. The generated multiview images can be used for 3D reconstruction (NeuS/NeRF), enabling single-image-to-3D pipelines.

## Key Features

- **Multiview-consistent generation**: Produces 16 images of predefined viewpoints simultaneously via volume-aware depth-wise attention
- **Single-image input**: Only requires one RGBA image (with foreground mask) and a rough elevation angle
- **3D reconstruction pipeline**: Built-in support for NeuS and NeRF training from generated views
- **Full training + inference code**: Training data (~1.6T) also released

## Architecture

- Built on Latent Diffusion Model (LDM) framework (borrows from Stable Diffusion)
- Uses CLIP ViT-L-14 for image encoding
- Core innovation: DepthWiseAttention mechanism for cross-view consistency
- Finetuned from zero123-xl model
- 16 synchronized views generated in a single forward pass

## Technical Details

- Input: Single RGBA image (256×256), object region resized via `crop_size` parameter
- Output: 16 multiview images per sample (saved as single PNG), configurable sample count
- GPU: Tested on 40G A100, can run on ≥10G with `--sample_num 1 --batch_view_num 4`
- CFG scale: 2.0 (recommended), elevation angle: [-10, 40] degrees
- Training: 8-GPU setup, finetuned from zero123-xl checkpoint

## Key Modules

- `generate.py` — Inference script (generates multiview images)
- `train_syncdreamer.py` — Training script (finetuning from zero123)
- `train_renderer.py` — NeuS/NeRF 3D reconstruction training
- `foreground_segment.py` — Foreground mask prediction using carvekit
- `eval_colmap.py` / `eval_nvs.py` / `eval_mesh.py` — Evaluation scripts
- `blender_script.py` — Blender rendering for training data generation
- `ldm.models.diffusion.sync_dreamer` — Core multiview diffusion model
- `ldm.models.diffusion.sync_dreamer_attention` — DepthWiseAttention module
- `ldm.data.sync_dreamer` — Dataset handling
- `raymarching/` — Custom CUDA raymarching operations

## Dependencies

- PyTorch Lightning 1.9.0, PyTorch 1.10.2 + CUDA 11.1
- OpenCV, Transformers, Taming Transformers, Kornia
- Open3D, Trimesh, NeRFacc, tiny-cuda-nn
- CLIP (OpenAI), carvekit-colab (foreground segmentation)
- Docker image available: liuyuanpal/syncdreamer-env

## License

MIT License (Copyright 2023 Yuan Liu)

## Usage

```bash
# Inference
python generate.py --ckpt ckpt/syncdreamer-pretrain.ckpt \
    --input testset/aircraft.png \
    --output output/aircraft \
    --sample_num 4 --cfg_scale 2.0 --elevation 30 --crop_size 200

# 3D Reconstruction (NeuS)
python train_renderer.py -i output/aircraft/0.png -n aircraft-neus \
    -b configs/neus.yaml -l output/renderer

# Training (from zero123-xl)
python train_syncdreamer.py -b configs/syncdreamer-train.yaml \
    --finetune_from <zero123-xl.ckpt> -l <log_dir> -c <ckpt_dir> --gpus 0,1,2,3,4,5,6,7
```

## Evaluation

- COLMAP reconstruction evaluation
- Novel view synthesis (LPIPS metrics)
- Mesh quality evaluation (mesh2sdf + nvdiffrast)
- GSO dataset GT meshes and renderings provided
