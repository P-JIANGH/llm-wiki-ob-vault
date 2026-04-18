# Zero-1-to-3: Zero-shot One Image to 3D Object

Source: https://github.com/cvlab-columbia/zero123
Mirror: gitcode.com/cvlab-columbia/zero123
Date: 2026-04-18
License: MIT

## Project Overview
ICCV 2023 paper from Columbia University Computer Vision Lab. Zero-1-to-3 enables zero-shot novel view synthesis and 3D reconstruction from a single input image.

## Key Features
- **Novel View Synthesis**: Given one image + camera pose (elevation + azimuth + distance), generate new viewpoints
- **3D Reconstruction**: Combine with SDS (Score Distillation Sampling) or SJC (Score Jacobian Chaining) to produce 3D meshes
- **Zero123-XL**: Extended variant trained on Objaverse-XL dataset
- **Camera-Conditioned**: Explicit camera pose modeling (not text-based), fundamentally alleviates the Janus problem
- **Based on Stable Diffusion**: Fine-tuned SD image-conditioned model on Objaverse renderings

## Architecture
- **Base Model**: LatentDiffusion (SD-based) with hybrid conditioning (concat + cross-attention)
- **UNet**: in_channels=8 (image concat), out_channels=4, 320 model channels, spatial transformer (context_dim=768)
- **First Stage**: AutoencoderKL (SD VAE, 4-channel latent)
- **Conditioning**: FrozenCLIPImageEmbedder (image-conditioned, not text)
- **Training Data**: Objaverse renderings (multi-view, ~6000 A100 hours for 300000.ckpt)
- **Resolution**: 256×256 input/output

## Project Structure
- `zero123/` — Main module: LDM training (main.py), Gradio demos (gradio_new.py), configs
- `zero123/ldm/` — Latent Diffusion Model core: DDPM, UNet, Autoencoder, CLIP encoder
- `3drec/` — 3D reconstruction pipeline: Voxel NeRF, SDS/SJC optimization, config management
- `3drec/voxnerf/` — Voxel-based NeRF implementation: rendering, pipelines, marching cubes export
- `objaverse-rendering/` — Dataset download scripts

## Usage
- **Gradio Demo**: `python gradio_new.py` (~22GB VRAM, RTX 3090/4090)
- **Training**: 8×80GB A100 recommended, finetune from sd-image-conditioned-v2.ckpt
- **3D Reconstruction**: `cd 3drec && python run_zero123.py` with Voxel NeRF + SDS/SJC
- **Released Checkpoints**: 105k/165k/230k/300k iterations (300k ≈ 6000 A100 hours)

## Key Technical Details
- Conditioning key: "hybrid" (concatenation + cross-attention)
- Uses CLIP image embeddings for conditioning (not text prompts)
- Camera pose encoded as 4D vector (elevation, azimuth, distance, focal length)
- Objaverse-XL dataset: large-scale synthetic 3D object renderings
- Zero123-XL variant: larger model trained on more data
- Integrated into Threestudio (Stability AI) and Stable-Dreamfusion for 3D reconstruction

## License
MIT License — Columbia University Computer Vision Lab

## Links
- Project Page: https://zero123.cs.columbia.edu/
- Paper: https://arxiv.org/abs/2303.11328
- Weights: https://huggingface.co/cvlab/zero123-weights
- Live Demo: https://huggingface.co/spaces/cvlab/zero123-live
- Objaverse-XL: https://github.com/allenai/objaverse-xl
