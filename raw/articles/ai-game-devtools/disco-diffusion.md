# Disco Diffusion — Raw Source

**Source:** https://github.com/alembics/disco-diffusion
**Fetched:** 2026-04-17
**License:** MIT (multi-party: Katherine Crowson, Intel ISL, Maxwell Ingham, Adam Letts, Alex Spirin)

## README Summary

"A frankensteinian amalgamation of notebooks, models and techniques for the generation of AI Art and Animations."

Originally a Google Colab notebook by Katherine Crowson (using OpenAI's 256x256 unconditional ImageNet or her fine-tuned 512x512 diffusion model, together with CLIP to connect text prompts with images).

Modified by Daniel Russell for quick generations in 15-100 timesteps rather than 1000.

## Changelog History

| Version | Date | Author | Key Feature |
|---------|------|--------|-------------|
| v1 | Oct 2021 | Somnai | QoL improvements, user-friendly UI, prompt saving |
| v1.1 | Nov 2021 | Somnai | Sizing options, intermediate saves, perlin inits |
| v2 | Nov 2021 | Somnai | Katherine Crowson's Secondary Model Method |
| v3 | Dec 2021 | Somnai | Dango's advanced cutout method, SLIP models, NaN fix |
| v4 | Jan 2022 | Somnai | Diffusion Zooming, Chigozie keyframing |
| v4.1 | Jan 2022 | Somnai | Video input mode, prompt keyframing, latent-diffusion SuperRes, resume run |
| v5 | Feb 2022 | gandamu/Adam Letts | 3D animation mode (AdaBins + MiDaS depth, pytorch3d) |
| v5.1 | Mar 2022 | zippy/Chris Allen | Turbo+Smooth features, resume turbo animations, cross-platform |
| v5.1 | Apr 2022 | MSFTserver | Removed pytorch3d compilation requirement |
| v5.2 | Apr 2022 | nin_artificial/Tom Mason | VR Mode |
| v5.3 | Jun 2022 | nshepperd/huemin/cut_pow | Horizontal/Vertical symmetry, ViT-L/14@336px model |
| v5.4 | Jun 2022 | devdef/Alex Spirin | Warp mode (optical flow + frame blending), custom models |
| v5.5 | Jul 2022 | Palmweaver/KaliYuga | OpenCLIP models, Pixel Art/Watercolor/Pulp SciFi Diffusion |
| v5.6 | Jul 2022 | Felipe3DArtist | portrait_generator_v001 (512x512 face model) |
| v5.7 | Dec 2022 | Steffen Moelter | MiDaS v3 pin fix for 3D mode |

## Key Files

### disco.py (3289 lines)
Main Colab notebook converted from Python. Uses colab-convert tool for bidirectional conversion between .py and .ipynb. Contains the full diffusion pipeline with UI parameters, animation modes, and rendering logic.

### disco_utils.py (24 lines)
Utility functions: module_exists(), gitclone(), pipi(), pipie(), wget() — subprocess wrappers for dependency management in Colab.

### disco_xform_utils.py (131 lines)
3D image transformation: transform_image_3d() combining AdaBins + MiDaS depth estimation with pytorch3d camera transforms. Key parameters: rot_mat, translate, near/far planes, fov_deg, midas_weight (0-1 blend between MiDaS and AdaBins depth), spherical projection.

### Disco_Diffusion.ipynb (179KB)
The primary user-facing Colab notebook with UI cells, parameter forms, and execution flow.

### docker/
Docker configuration for local deployment (cross-platform support beyond Colab).

## Architecture

### Pipeline
1. Text prompt → CLIP evaluation (multiple models simultaneously)
2. Diffusion process (guided-diffusion 512x512 model)
3. CLIP-guided optimization with cutout methods (DangoCutn)
4. Optional depth estimation (MiDaS + AdaBins weighted blend)
5. 3D transform (rotation, translation, zoom) for animation frames
6. Output rendering with intermediate saves

### Animation Modes
- **2D**: Zoom, pan, rotation with keyframed parameters
- **3D**: Depth-guided 3D transforms using MiDaS + AdaBins
- **Turbo**: Fast frame-to-frame animation with smoothing
- **Warp**: Optical flow-based smooth video input processing
- **VR**: Virtual reality mode
- **Video Input**: Use existing video as animation seed

### Model Support
- OpenAI guided-diffusion (256x256 ImageNet, 512x512 fine-tuned)
- OpenCLIP models
- Pixel Art Diffusion, Watercolor Diffusion, Pulp SciFi Diffusion (KaliYuga)
- portrait_generator_v001 (Felipe3DArtist)
- Custom user-provided models (v5.4+)
- latent-diffusion SuperRes (v4.1)

### Dependencies
- PyTorch, torchvision
- CLIP (openai/CLIP)
- guided-diffusion (openai/guided-diffusion)
- MiDaS v3 (depth estimation)
- AdaBins (depth estimation, optional)
- pytorch3d lite (3D transforms)
- OpenCLIP
- FlowNet2 (NVIDIA, optical flow for warp mode)
