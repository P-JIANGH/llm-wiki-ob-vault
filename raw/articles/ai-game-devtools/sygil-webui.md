# Sygil-Dev Stable Diffusion Web UI

**Source:** https://github.com/Sygil-Dev/sygil-webui
**Captured:** 2026-04-17

## Project Overview

Web-based UI for Stable Diffusion by [Sygil-Dev](https://github.com/sygil-dev). An early (2022) browser interface for Stable Diffusion that predates and runs parallel to AUTOMATIC1111's webui. Provides text-to-image, image-to-image, and text-to-video generation through the browser.

## Key Features

- **Dual UI Systems**: Streamlit (primary, active development) + Gradio (legacy, bug fixes only)
- **K-Diffusion Samplers**: k_euler, k_lms, k_euler_a, k_dpm_2, k_dpm_2_a, k_heun, PLMS, DDIM
- **Image Enhancers**: GFPGAN (face restoration), RealESRGAN (2x upscaling, regular + anime), LDSR, GoBig, GoLatent
- **Textual Inversion**: Train custom embeddings on photos and use them in prompts
- **CLIP Interrogator**: Image-to-text — analyze an image and generate a prompt for similar generation
- **Prompt Weighting**: `token:0.70` syntax for emphasis control
- **Negative Prompts**: `###` separator for excluding concepts
- **Word Seeds**: Use words instead of numbers for seeds
- **Loopback**: Auto-feed last generated sample back into img2img
- **Prompt Matrix**: `|` separator generates images for all combinations
- **Mask Painting**: Regenerate specific parts of an image (Gradio only)
- **VRAM Optimization**: 512x512 tested working on 4GB GPU (optimized mode)
- **Prompt Validation**: Warning when prompt exceeds token limits
- **Sequential Seeds**: Batch generation uses sequential seeds (1000, 1001, 1002...)
- **Stable Horde Integration**: Bridge to contribute to distributed generation network
- **Text-to-Video**: Generate video clips from text prompts (WIP)
- **Concepts Library**: Run custom embeddings via textual inversion

## Architecture

- **Language**: Python 3.8.5
- **ML Framework**: PyTorch 1.13.0 + torchvision 0.14.0 + CUDA 11.7
- **Core Dependencies**: diffusers, k-diffusion, taming-transformers, CLIP (openai)
- **UI Frameworks**: Streamlit 1.14.0 (primary) + Gradio 3.4.1 (legacy) + HydraLit dashboard
- **API**: FastAPI + Uvicorn
- **Config**: OmegaConf YAML configs
- **Docker**: Multiple Dockerfiles (base, main, runpod), docker-compose with GPU support
- **Frontend**: Custom Streamlit components (draggable_number_input), Flet UI (experimental)

## Key Source Files

| File | Lines | Purpose |
|------|-------|---------|
| `scripts/webui_streamlit.py` | 458 | Streamlit UI entry point, HydraLit dashboard |
| `scripts/webui.py` | 4096 | Gradio legacy UI entry |
| `scripts/stable_diffusion_pipeline.py` | 930 | Custom diffusion pipeline wrapping diffusers |
| `scripts/txt2vid.py` | 2498 | Text-to-video generation |
| `scripts/Settings.py` | 1699 | Settings UI (8 tabs) |
| `scripts/APIServer.py` | - | FastAPI REST API server |
| `scripts/clip_interrogator.py` | - | CLIP-based image analysis for reverse prompts |
| `scripts/textual_inversion.py` | - | Embedding training pipeline |
| `scripts/post_processing.py` | - | GFPGAN/RealESRGAN post-processing |
| `scripts/img2img.py` | - | Image-to-image generation |
| `scripts/ModelManager.py` | - | Model loading and management |
| `scripts/horde_bridge.sh` | 188 | Stable Horde integration bridge |

## Directory Structure

```
scripts/           # Core Python modules (24,543 lines total)
  webui_streamlit.py   # Streamlit entry
  webui.py             # Gradio entry
  stable_diffusion_pipeline.py  # Custom pipeline
  txt2vid.py           # Text-to-video
  Settings.py          # Settings UI
  APIServer.py         # REST API
  ...
configs/           # OmegaConf YAML configuration
  webui/           # UI-specific configs
frontend/          # Custom Streamlit/Flet components
docs/              # Docusaurus documentation
data/              # Static data (fonts, etc.)
images/            # UI screenshots
installer/         # Installation scripts
```

## Docker Deployment

- **Base Image**: `tukirito/sygil-webui:base`
- **Ports**: 7860 (Gradio), 8501 (Streamlit)
- **Volumes**: outputs, model_cache, conda_env
- **GPU**: Requires GPU reservation via docker-compose

## License

AGPL-3.0 (GNU Affero General Public License v3)

## Key People

- **ZeroCool940711** — Main developer
- **Kasiya13** — Main developer

## Links

- GitHub: https://github.com/Sygil-Dev/sygil-webui
- Docs: https://sygil-dev.github.io/sygil-webui/
- Discord: https://discord.gg/ttM8Tm6wge
