# ComfyUI — Raw Source

**Source:** https://github.com/comfyanonymous/ComfyUI
**Captured:** 2026-04-17

## Overview

ComfyUI is the most powerful and modular visual AI engine and application. It lets you design and execute advanced stable diffusion pipelines using a graph/nodes/flowchart based interface. Available on Windows, Linux, and macOS.

## Key Features

- Nodes/graph/flowchart interface for complex Stable Diffusion workflows without coding
- Wide model support: SD1.x/2.x, SDXL, SDXL Turbo, Stable Cascade, SD3/SD3.5, Pixart, AuraFlow, HunyuanDiT, Flux, Lumina 2.0, HiDream, Qwen Image, Hunyuan Image 2.1, Flux 2, Z Image
- Image Editing: Omigen 2, Flux Kontext, HiDream E1.1, Qwen Image Edit
- Video Models: Stable Video Diffusion, Mochi, LTX-Video, Hunyuan Video, Wan 2.1/2.2, Hunyuan Video 1.5
- Audio Models: Stable Audio, ACE Step
- 3D Models: Hunyuan3D 2.0
- Asynchronous Queue system
- Smart memory management with automatic model offloading (works on as low as 1GB VRAM)
- CPU-only mode with --cpu flag
- Embeddings/Textual inversion, Loras (regular/locon/loha), Hypernetworks
- PNG/WebP/FLAC workflow embedding (loading full workflows with seeds)
- ControlNet and T2I-Adapter, GLIGEN, Model Merging, LCM
- Area Composition, Inpainting, Upscale Models (ESRGAN/SwinIR/Swin2SR)
- High-quality latent previews with TAESD
- Works fully offline — core never downloads anything unless explicitly requested
- Optional API nodes for paid external models via Comfy Cloud API
- ComfyUI-Manager for extension management

## Architecture

### Core Structure (578 Python files, ~187K LOC)

```
ComfyUI/
├── main.py              # Entry point: CLI args, device setup, server init
├── nodes.py             # Built-in nodes (2526 lines): CLIPTextEncode, KSampler, LoadCheckpoint, etc.
├── execution.py         # Graph execution engine (1329 lines): execution list, caching, async
├── comfy/               # Core ML modules
│   ├── samplers.py      # K-diffusion samplers (Euler, DDIM, DPM++, etc.)
│   ├── model_management.py  # GPU memory management, model loading/unloading
│   ├── sd.py            # Stable Diffusion model loading
│   ├── clip_model.py    # CLIP text encoder
│   ├── clip_vision.py   # CLIP vision encoder
│   ├── controlnet.py    # ControlNet integration
│   ├── lora.py          # LoRA loading and conversion
│   ├── gligen.py        # GLIGEN grounding
│   ├── k_diffusion/     # Katharopoulos diffusion samplers
│   ├── ldm/             # Latent Diffusion Model core
│   └── extra_samplers/  # Additional samplers (uni_pc, etc.)
├── comfy_api/           # API versioning system (latest, v0, internal)
├── comfy_api_nodes/     # API cloud node implementations
├── comfy_config/        # Configuration management
├── comfy_execution/     # Execution graph utilities, caching (HierarchicalCache, LRUCache, RAMPressureCache)
├── comfy_extras/        # Extra nodes (hypertile, model merging, etc.)
├── app/                 # Server application, database, middleware
├── api_server/          # REST API server
├── custom_nodes/        # User-installed extensions directory
├── folder_paths.py      # Model search path configuration
├── alembic_db/          # Database migrations
└── middleware/          # Request middleware
```

### Key Design Patterns

1. **Node-based Graph Execution**: Each node is a Python class implementing `ComfyNodeABC` with `INPUT_TYPES()` and `execute()` methods. The execution engine builds a dependency graph, computes execution order via topological sort, and only re-executes changed portions.

2. **Hierarchical Caching**: Multiple cache levels (BasicCache, HierarchicalCache, LRUCache, RAMPressureCache) with input signature-based cache keys. Only re-executes workflow parts that changed between runs.

3. **Smart VRAM Management**: Automatic model loading/unloading based on GPU memory availability. Dynamic VRAM mode (`comfy_aimdo`) for efficient memory usage.

4. **Plugin Architecture**: `custom_nodes/` directory for third-party extensions. ComfyUI-Manager provides install/update/manage UI.

5. **Multi-GPU Support**: NVIDIA CUDA, AMD ROCm, Intel XPU, Apple Metal (MPS), Ascend NPU (torch_npu), Cambricon MLU (torch_mlu), Iluvatar CoreX.

## Dependencies

- PyTorch (with CUDA/ROCm/XPU/NPU backend)
- torchvision, torchaudio
- transformers (>=4.50.3), tokenizers, sentencepiece
- safetensors, numpy, einops, scipy, Pillow, PyYAML
- aiohttp, yarl, torchsde, tqdm, psutil
- ComfyUI frontend package (Vue.js-based)
- Alembic for database migrations

## Version & Release

- Current version: 0.19.1
- Weekly release cycle (targeting Monday)
- Versioning: major for off-master releases, minor for master branch, patch for backports
- Three repos: ComfyUI Core, ComfyUI Desktop, ComfyUI Frontend
- Frontend hosted at github.com/Comfy-Org/ComfyUI_frontend

## CLI Options

- `--cpu`: CPU-only mode
- `--cuda-device N`: Select specific GPU
- `--preview-method auto|taesd`: Enable latent previews
- `--enable-manager`: Enable ComfyUI-Manager
- `--front-end-version`: Specify frontend version
- `--disable-api-nodes`: Disable cloud API nodes
- `--tls-keyfile/--tls-certfile`: Enable HTTPS
- `--enable-manager-legacy-ui`: Use legacy manager UI

## License

GPL v3

## Key Links

- Website: https://www.comfy.org/
- GitHub: https://github.com/comfyanonymous/ComfyUI
- Cloud: https://www.comfy.org/cloud
- Frontend: https://github.com/Comfy-Org/ComfyUI_frontend
- Manager: https://github.com/Comfy-Org/ComfyUI-Manager
- Docs: https://docs.comfy.org/
- Examples: https://comfyanonymous.github.io/ComfyUI_examples/
- Workflow templates: https://comfy.org/workflows
- Discord: https://comfy.org/discord
- Matrix: #comfyui_space:matrix.org
- Twitter/X: @ComfyUI
