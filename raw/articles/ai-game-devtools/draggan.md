# DragGAN — Raw Source

**Source:** https://github.com/XingangPan/DragGAN
**Captured:** 2026-04-17
**Method:** git clone --depth 1

## README Summary

**Title:** Drag Your GAN: Interactive Point-based Manipulation on the Generative Image Manifold

**Authors:** Xingang Pan, Ayush Tewari, Thomas Leimkühler, Lingjie Liu, Abhimitra Meka, Christian Theobalt (MPI Informatik / Max Planck Institute)

**Publication:** SIGGRAPH 2023 Conference Proceedings

**Paper:** https://arxiv.org/abs/2305.10973
**Project Page:** https://vcai.mpi-inf.mpg.de/projects/DragGAN/
**Colab:** Available
**HuggingFace Demo:** Available

## Core Concept

DragGAN is an interactive point-based manipulation tool on the generative image manifold. Users can place handle points on a GAN-generated image and drag them to target positions, with the system performing real-time optimization to deform the image while maintaining realism and semantic consistency.

## Technical Architecture

### Directory Structure
```
draggan/
├── dnnlib/              # Core library (from StyleGAN3)
├── torch_utils/         # PyTorch utilities (from StyleGAN3)
├── training/            # Training code (from StyleGAN3)
├── gui_utils/           # GUI rendering utilities
├── gradio_utils/        # Gradio web demo utilities
├── viz/                 # Visualization modules
├── scripts/             # Shell/batch scripts for GUI launch
├── stylegan_human/      # StyleGAN-Human integration + PTI inversion
│   ├── pti/             # Pseudo-Tuned Inversion (PTI) for real image editing
│   ├── alignment.py     # Face alignment
│   └── utils/           # Model utilities, face alignment, dataset utils
├── visualizer_drag.py   # Main DragGAN GUI (ImGui + OpenGL)
├── visualizer_drag_gradio.py  # Gradio web demo
├── gen_images.py        # Image generation script
├── legacy.py            # Legacy weight conversion
├── environment.yml      # Conda environment
├── requirements.txt     # Python dependencies
└── Dockerfile           # Docker container (NGC PyTorch base)
```

### Dependencies
- PyTorch >= 2.0.0
- Gradio >= 3.35.2
- imageio-ffmpeg, imageio, pillow, torchvision
- PyOpenGL, imgui, glfw (for desktop GUI)
- huggingface_hub, hf_transfer

### Key Modules
1. **visualizer_drag.py** — Desktop GUI with ImGui + OpenGL rendering
2. **visualizer_drag_gradio.py** — Web-based Gradio interface
3. **dnnlib/** — StyleGAN3 core neural network library (GAN model loading/inference)
4. **stylegan_human/pti/** — Pseudo-Tuned Inversion for real image editing (based on PTI by Roi Roichman)
5. **training/** — StyleGAN3 training infrastructure

### Supported Models
- Pre-trained StyleGAN2/3 weights (auto-downloaded)
- StyleGAN-Human (human portraits)
- LHQ (Landscapes HQ)
- Custom StyleGAN checkpoints via PTI inversion

### Running Methods
1. **Desktop GUI:** `sh scripts/gui.sh` (Linux) or `scripts/gui.bat` (Windows)
2. **Gradio Web Demo:** `python visualizer_drag_gradio.py`
3. **Docker:** `docker run -p 7860:7860 -v "$PWD":/workspace/src -it draggan:latest`
4. **Colab:** Online notebook available

### Platform Support
- Linux (CUDA GPU)
- Windows (CUDA GPU)
- macOS Silicon (M1/M2, CPU/MPS)
- Docker (PyTorch NGC base, ~25GB image)

## License
- DragGAN algorithm code: CC-BY-NC 4.0 (non-commercial only)
- StyleGAN3 derived code: NVIDIA Source Code License (also non-commercial)
- Must preserve "AI Generated" watermark functionality

## Key Facts
- Built on NVIDIA StyleGAN3 architecture
- Point-based interaction: place handle → drag → optimize in latent space
- Real-time image deformation maintaining photorealism
- SIGGRAPH 2023 paper with arXiv preprint 2305.10973
- Supports GAN-generated image editing and real image editing (via PTI inversion)
