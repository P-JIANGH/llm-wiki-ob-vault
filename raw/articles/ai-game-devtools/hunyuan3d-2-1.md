# Hunyuan3D-2.1 — Raw Source

**Source:** https://github.com/Tencent-Hunyuan/Hunyuan3D-2.1
**Extracted:** 2026-04-18
**Method:** web_extract (GitHub/gitcode/gitee clone all failed — network timeout)

---

## README Content

### Title
🚀 Hunyuan3D-2.1: High-Fidelity 3D Asset Generation — From Images to Production-Ready 3D Assets with PBR Materials

### Core Innovations & Architecture
- **Fully Open-Source:** First release of complete model weights + training code, enabling direct community fine-tuning and downstream extension.
- **PBR Texture Pipeline:** Replaces legacy RGB-based texturing with physics-grounded material simulation for photorealistic light interaction (metallic reflections, subsurface scattering).
- **Scalable Architecture:** Two-stage pipeline: `Image → 3D Shape` → `PBR Texture Synthesis`.

### Performance Benchmarks
Hunyuan3D-2.1 surpasses all open/closed-source baselines in textured 3D quality and condition-following ability.

#### Shape Generation (Higher is better)
| Model | ULIP-T | ULIP-I | Uni3D-T | Uni3D-I |
|---|---|---|---|---|
| Michelangelo | 0.0752 | 0.1152 | 0.2133 | 0.2611 |
| TripoSG | 0.0767 | 0.1225 | 0.2506 | 0.3129 |
| Trellis | 0.0769 | 0.1267 | 0.2496 | 0.3116 |
| **Hunyuan3D-Shape-2.1** | **0.0774** | **0.1395** | **0.2556** | **0.3213** |

#### Texture Generation (Lower is better for FiD/CMMD/LPIPS, Higher for CLIP-I)
| Model | CLIP-FiD ⬇ | CMMD ⬇ | CLIP-I ⬆ | LPIPS ⬇ |
|---|---|---|---|---|
| SyncMVD-IPA | 28.39 | 2.397 | 0.8823 | 0.1423 |
| Hunyuan3D-2.0 | 26.44 | 2.318 | 0.8893 | 0.1261 |
| **Hunyuan3D-Paint-2.1** | **24.78** | **2.191** | **0.9207** | **0.1211** |

### Model Zoo & Hardware Requirements
| Model | Task | Size | Release Date | HuggingFace |
|---|---|---|---|---|
| `Hunyuan3D-Shape-v2-1` | Image → Shape | 3.3B | 2025-06-14 | hunyuan3d-dit-v2-1 |
| `Hunyuan3D-Paint-v2-1` | Texture Generation | 2B | 2025-06-14 | hunyuan3d-paintpbr-v2-1 |

#### VRAM Requirements
- Shape Generation: 10 GB
- Texture Generation: 21 GB
- Combined Pipeline: 29 GB

### Installation & Usage
- OS Support: macOS, Windows, Linux
- Environment: Python 3.10 | PyTorch 2.5.1+cu124
- Interfaces:
  - Programmatic: Diffusers-style Python API (`demo.py`, `api_models.py`)
  - Web UI: Local Gradio App (`gradio_app.py`)
  - API Server: `api_server.py` + `model_worker.py` for deployment
- Quick Setup: `pip install -r requirements.txt`

### Repository Structure
| Directory/File | Purpose |
|---|---|
| `hy3dshape/` | Shape generation model code & configs |
| `hy3dpaint/` | PBR texture synthesis model code & configs |
| `docker/` | Containerization setup |
| `assets/` | Teaser images, pipeline diagrams, QR codes |
| `api_server.py` / `api_models.py` | REST API implementation |
| `gradio_app.py` / `demo.py` | Interactive UI & usage examples |
| `test_api.ipynb` | API testing notebook |
| `torchvision_fix.py` | Compatibility patch |

### Community & Resources
- Channels: Discord, WeChat, Xiaohongshu, X (Twitter)
- Community Contribution Leaderboard actively tracked
- Activity: 102 Commits | 16 Contributors
- Docs: `API_DOCUMENTATION.md`, `API_TESTING_SUMMARY.md`

### Acknowledgements
Built upon open research from: TripoSG, Trellis, DINOv2, Stable Diffusion, FLUX, diffusers, HuggingFace, CraftsMan3D, Michelangelo, Hunyuan-DiT, HunyuanVideo.
