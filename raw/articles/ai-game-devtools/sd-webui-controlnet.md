# sd-webui-controlnet — ControlNet for Stable Diffusion WebUI

**Source:** https://github.com/Mikubill/sd-webui-controlnet
**Fetched:** 2026-04-17

## README Summary

The WebUI extension for ControlNet and other injection-based SD controls. This extension is for AUTOMATIC1111's [Stable Diffusion web UI](https://github.com/AUTOMATIC1111/stable-diffusion-webui), allows the Web UI to add [ControlNet](https://github.com/lllyasviel/ControlNet) to the original Stable Diffusion model to generate images. The addition is on-the-fly, the merging is not required.

## Key Features

### ControlNet 1.1 Feature Set
- **Perfect support for all ControlNet 1.0/1.1 and T2I-Adapter models** — including T2I style adapter and ControlNet 1.1 Shuffle
- **A1111 High-Res Fix support** — automatically outputs two control images (small + large) for basic and hi-res generation
- **Full Img2Img/Inpaint compatibility** — supports all mask types, resize modes, and padding settings
- **Pixel-Perfect mode** — automatically computes optimal annotator resolution so each pixel matches SD
- **Multi-ControlNet** — multiple ControlNet inputs for a single generation
- **Control Modes** — "Balanced", "My prompt is more important", "ControlNet is more important" (formerly Guess Mode)
- **Reference-Only Control** — no model required, uses attention layer linking for image reference guidance
- **Batch Mode** — batch directory support for all units
- **API and Script Access** — accepts txt2img/img2img via API or external extension call

### Control Modes
| Mode | Description |
|------|-------------|
| Balanced | ControlNet on both sides of CFG scale (same as v1.0 Guess Mode off) |
| My prompt is more important | Both sides with progressively reduced injections (layer_weight *= 0.825^I) |
| ControlNet is more important | Only on conditional side, X times stronger for cfg-scale=X |

### Preprocessors (Annotators)
Located in `annotator/` directory:
- `openpose` — human pose estimation
- `canny` — edge detection
- `hed` / `pidinet` — soft edge detection
- `midas` / `zoe` / `depth_anything` / `depth_anything_v2` — depth estimation
- `normalbae` / `normaldsine` — surface normal estimation
- `lineart` / `lineart_anime` — line art extraction
- `mlsd` — straight line detection
- `scribble` / `teed` — scribble processing
- `shuffle` — content shuffle
- `clipvision` — CLIP vision for IP-Adapter
- `densepose` — dense pose estimation
- `mediapipe_face` — facial landmark detection
- `oneformer` — semantic segmentation
- `uniformer` / `anime_face_segment` — specialized segmentation
- `manga_line` — manga line detection
- `keypose` — key pose detection
- `leres` — relative depth estimation
- `binary` — binary threshold
- `color` — color conditioning
- `lama` — inpainting mask

### Architecture
- `scripts/` — main extension scripts (API, batch, ControlNet core integration)
- `scripts/controlnet_ui/` — WebUI interface components
- `scripts/preprocessor/` — preprocessor pipeline
- `scripts/ipadapter/` — IP-Adapter integration
- `scripts/animate_diff/` — AnimateDiff integration
- `internal_controlnet/` — internal ControlNet implementation (cldm, lllite, lora variants)
- `annotator/` — condition image preprocessors (20+ types)
- `models/` — model storage directory
- `javascript/` — frontend JS enhancements

### Recent Updates (as of 2024-07)
- v1.1.454: ControlNet union model support
- v1.1.452: Depth Anything V2 — UDAV2 preprocessor
- v1.1.449: Anyline preprocessor & MistoLine SDXL model
- v1.1.447: PuLID support
- v1.1.446: Effective region mask for ControlNet/IPAdapter
- v1.1.445: IP-Adapter CLIP mask and ip-adapter-auto preprocessor
- ControlNet++ models released (v1.1.444+)

### Technical Details
- Python 3.10+ required (per pyproject.toml ruff config)
- GPL v3 license
- Uses Gradio for WebUI integration
- Supports API access via `--api` flag
- Custom CLI arguments: `--controlnet-dir`, `--controlnet-annotator-models-path`, `--no-half-controlnet`, `--controlnet-preprocessor-cache-size`
- Minimum: NVIDIA Ampere 4GB VRAM with `--xformers` + Low VRAM mode
- macOS support via PyTorch nightly (mps backend)

### Installation
Installed as an extension within AUTOMATIC1111's Stable Diffusion WebUI via the Extensions tab → Install from URL.
