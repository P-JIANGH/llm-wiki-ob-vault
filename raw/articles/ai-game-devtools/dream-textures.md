# Dream Textures — Raw Source

**URL:** https://github.com/carson-katri/dream-textures
**Captured:** 2026-04-18
**Source:** GitHub (via gitcode.com mirror)

## README Summary

Dream Textures is a Blender add-on that integrates Stable Diffusion directly into Blender for texture generation.

**Key Features:**
- Create textures, concept art, background assets with text prompts
- Seamless texture mode (tiles perfectly with no visible seams)
- Texture entire scenes with 'Project Dream Texture' using depth-to-image
- Re-style animations with Cycles render pass
- Run models locally for fast iteration (no cloud service needed)
- Cloud processing via DreamStudio for unsupported hardware

**Main Capabilities:**
1. **Image Generation** — Text-to-image texture creation inside Blender
2. **Texture Projection** — Depth-to-image for texturing entire models/scenes
3. **Inpaint/Outpaint** — Fix up images, convert textures to seamless, extend images
4. **Render Engine** — Node system for complex AI-driven rendering effects
5. **AI Upscaling** — 4x upscale of low-resolution generations
6. **History** — Recall, export, and import generation history

**Compatibility:** CUDA, Apple Silicon GPUs, 4GB+ VRAM recommended

**License:** GPL-3.0

## Key Source Files

### `__init__.py` (Plugin Entry Point)
- Blender add-on info: version 0.4.0, requires Blender 3.1+
- Category: Paint
- Location: Image Editor → Sidebar → Dream
- Registers: DreamPrompt property groups, SeamlessResult, DreamTexture operator, render pass, engine
- Supports multiple platforms: Linux/Windows CUDA, Apple Silicon (MPS), Linux AMD (ROCm), Windows DirectML
- Cloud processing via DreamStudio
- Registers `DiffusersBackend` as default backend

### `diffusers_backend.py` (HuggingFace Diffusers Backend)
- Primary backend for local image generation
- Implements `Backend` API from `.api`
- Supports model types: Prompt-to-Image, Image-to-Image, Inpaint, Depth-to-Image, Outpaint, Upscale
- Performance options: attention slicing, SDP attention, CPU offload, half precision, VAE slicing/tiling
- SDXL refiner support
- Batch size control for iterations/upscaling

### Architecture Modules:
- `api/` — Backend abstraction layer, models (Model, GenerationArguments, GenerationResult)
- `engine/` — Render engine integration with Blender
- `generator_process/` — Subprocess-based generation with Future/promise pattern
- `operators/` — Blender operators (DreamTexture, project, open_latest_version, etc.)
- `property_groups/` — DreamPrompt, SeamlessResult data classes
- `ui/` — UI panels and presets
- `community_backends/` — Community-contributed backend implementations
- `sd_configs/` — Stable Diffusion configuration files
- `builtin_presets/` — Built-in generation presets

### `preferences.py`
- Model management (install, download, checkpoint lookup)
- Platform-specific requirements installation
- Model download progress display

### `render_pass.py`
- Cycles render pass integration
- Allows AI-driven restyling of rendered frames

### `image_utils.py` (33KB)
- Large image processing utility module
- Likely handles texture manipulation, seamless tiling, projection logic

### `realtime_viewport.py`
- Real-time viewport generation preview

## Notable Technical Details
- Uses HuggingFace `diffusers` library as core generation engine
- Blender Python API (bpy) for all UI and property integration
- Subprocess-based generator for isolation from Blender's Python environment
- Supports ControlNet for depth-guided projection
- VAE tiling for memory-efficient large image generation
- GPL-3.0 licensed (copyleft)
