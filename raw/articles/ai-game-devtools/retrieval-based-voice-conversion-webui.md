# RVC (Retrieval-based Voice Conversion WebUI) — Source Analysis

**Source:** https://github.com/RVC-Project/Retrieval-based-Voice-Conversion-WebUI
**Analyzed:** 2026-04-21
**License:** MIT
**Authors:** lj1995, 源文雨, Ftps

## README Summary

RVC is a simple and easy-to-use voice conversion framework based on VITS (Variational Inference for Text-to-Speech). The project's core innovation is using top-1 retrieval to replace input source features with training set features, effectively preventing voice timbre leakage.

Key features from README:
- **Top-1 retrieval-based feature replacement** — eliminates voice timbre leakage by substituting source features with training set features
- **Fast training on modest GPUs** — works well even on lower-end graphics cards
- **Small data requirement** — good results with only ~10 minutes of low-noise voice data
- **Model fusion** — can blend timbres via ckpt-merge in the ckpt processing tab
- **Simple Gradio WebUI** — one-click start with go-web.bat / go-web-dml.bat
- **UVR5 integration** — built-in vocal/accompaniment separation using Ultimate Vocal Remover models
- **RMVPE pitch extraction** — uses InterSpeech2023 RMVPE algorithm (state-of-the-art for pitch extraction, faster than crepe_full with lower resource usage)
- **AMD/Intel GPU support** — DML (DirectML) for AMD/Intel GPUs on Windows, ROCm for AMD on Linux, IPEX for Intel on Linux
- **Real-time voice conversion** — end-to-end 170ms latency (90ms with ASIO devices)

## Architecture

### Directory Structure
```
├── infer/                    # Core inference and training modules
│   ├── lib/                  # Shared libraries
│   │   ├── audio.py          # Audio processing utilities
│   │   ├── infer_pack/       # Neural network layer implementations
│   │   ├── jit/              # JIT compilation support
│   │   ├── rmvpe.py          # RMVPE pitch extraction wrapper
│   │   ├── rtrvc.py          # Real-time RVC pipeline
│   │   ├── slicer2.py        # Audio slicer
│   │   ├── train/            # Training utilities
│   │   └── uvr5_pack/        # UVR5 vocal separation utilities
│   └── modules/              # WebUI modules
│       ├── ipex/             # Intel IPEX support
│       ├── onnx/             # ONNX runtime support
│       ├── train/            # Training module (1619 lines in infer-web.py)
│       ├── uvr5/             # Vocal separation module
│       └── vc/               # Voice conversion module
├── configs/                  # Model configurations
│   ├── config.py             # Config singleton (device auto-detection)
│   ├── v1/                   # V1 model configs (32k/40k/48k)
│   └── v2/                   # V2 model configs (32k/48k)
├── i18n/                     # Internationalization (multi-language UI)
├── infer-web.py              # Main entry point (Gradio WebUI, ~1619 lines)
├── go-realtime-gui.bat       # Real-time voice conversion launcher
├── go-web.bat                # WebUI launcher
├── api_231006.py             # REST API (v1)
└── api_240604.py             # REST API (v2)
```

### Core Pipeline
1. **Audio Preprocessing** — slice long audio into manageable segments
2. **Feature Extraction** — ContentVec/fairseq HuBERT extracts content features
3. **Pitch Extraction** — RMVPE (or alternatives: crepe, pm, harvest, dio) extracts F0 pitch
4. **Index Retrieval** — FAISS index retrieves closest training set features (top-1)
5. **Voice Conversion** — VITS generator converts features to target voice
6. **Vocal Remover (optional)** — UVR5 model separates vocals from background music

### Key Dependencies
- **VITS** — base architecture (Variational Inference for TTS)
- **ContentVec** — content feature extraction
- **HIFIGAN** — vocoder
- **fairseq** — HuBERT model loading
- **faiss-cpu** — vector similarity search (index retrieval)
- **RMVPE** — pitch extraction (InterSpeech 2023)
- **Gradio 3.34.0** — Web UI
- **torch 2.4.0** — deep learning framework
- **pyworld** — traditional pitch extraction fallback
- **scikit-learn (MiniBatchKMeans)** — feature clustering for index building

### Model Versions
- **V1** — original architecture, supports 32k/40k/48k sampling rates
- **V2** — improved architecture, supports 32k/48k sampling rates
- **Base model** — trained on ~50 hours of VCTK dataset (open-source, no copyright concerns)

### GPU Support Matrix
| GPU | Backend | Requirements |
|-----|---------|-------------|
| NVIDIA | CUDA (native) | PyTorch CUDA |
| AMD (Windows) | DirectML | torch-directml, FP32 only |
| AMD (Linux) | ROCm | rocm-hip-sdk, rocm-opencl-sdk |
| Intel (Windows) | DirectML | torch-directml, FP32 only |
| Intel (Linux) | IPEX | intel_extension_for_pytorch |
| Apple Silicon | MPS | PyTorch MPS backend |
| CPU | CPU | FP32 only, slow |

### REST API
Two API versions available:
- `api_231006.py` — older API (Oct 2023)
- `api_240604.py` — newer API (Jun 2024), uses FastAPI

### Training Parameters
- Sample rates: 32kHz, 40kHz (v1 only), 48kHz
- Epochs configurable via WebUI
- Batch size auto-adjusted based on GPU memory
- FP16/FP32 auto-detection based on GPU capability
- Multi-GPU support (can be disabled with --noparallel)
