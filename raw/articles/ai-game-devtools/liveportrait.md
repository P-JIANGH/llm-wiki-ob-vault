# LivePortrait: Efficient Portrait Animation

**Source:** https://github.com/KwaiVGI/LivePortrait
**Paper:** https://arxiv.org/pdf/2407.03168
**Homepage:** https://liveportrait.github.io/
**Developers:** Kuaishou Technology (快手), USTC, Fudan University
**License:** Open Source
**Extracted:** 2026-04-19 via web_extract (GitHub/gitcode/gitee clone all failed)

---

## Project Overview

LivePortrait is an official PyTorch implementation for **efficient portrait animation** using stitching and retargeting control. It animates static portraits (humans, cats, dogs) using driving videos or images, supporting both image-to-video and video-to-video workflows.

## Key Updates & Milestones

| Date | Update |
|------|--------|
| 2025/06/01 | Widely adopted by major platforms (Kuaishou, Douyin, Jianying, WeChat Channels) & creators |
| 2025/01/01 | Updated Animals model with expanded training data |
| 2024/10/18 | Security patches for transformers & gradio dependencies |
| 2024/08/29 | Windows one-click installer with auto-update support |
| 2024/08/19 | Added image-driven mode & regional control |
| 2024/08/06 | Precise portrait editing in Gradio (inspired by ComfyUI-AdvancedLivePortrait) |
| 2024/08/02 | Released Animals model (Linux/Windows NVIDIA only) |
| 2024/07/19 | Added portrait video editing (v2v) support |
| 2024/07/17 | macOS Apple Silicon support added |
| 2024/07/04 | Initial code/models released + arXiv paper published |

## Installation & Setup

### Prerequisites
- git, conda, FFmpeg installed
- Python 3.10

### Platform-Specific Dependencies
- **Linux/Windows (NVIDIA GPU):** CUDA 11.8 or 12.1, PyTorch 2.3.0
- **macOS (Apple Silicon):** MPS fallback mode (Animals mode not supported)

### Pretrained Weights
- HuggingFace: `KlingTeam/LivePortrait`
- Mirror available via hf-mirror.com
- Alternative: Google Drive / Baidu Yun

## Inference & Usage

### Humans Mode
```shell
python inference.py
python inference.py -s assets/examples/source/s9.jpg -d assets/examples/driving/d0.mp4
# macOS: PYTORCH_ENABLE_MPS_FALLBACK=1 python inference.py
```

### Animals Mode (Linux/Windows NVIDIA Only)
- Requires building MultiScaleDeformableAttention for X-Pose
```shell
python inference_animals.py -s assets/examples/source/s39.jpg -d assets/examples/driving/wink.pkl --driving_multiplier 1.75 --no_flag_stitching
```

### Driving Video Best Practices
- 1:1 aspect ratio (e.g., 512x512)
- Focus on head area; minimize shoulder movement
- First frame must be frontal face with neutral expression

### Motion Templates (.pkl)
- Pre-generated .pkl files for faster inference & privacy protection

## Gradio Interface
```shell
python app.py          # Humans mode
python app_animals.py  # Animals mode
python app.py --flag_do_torch_compile  # 20-30% speedup
```

## Community & Ecosystem
- **FasterLivePortrait**: TensorRT-optimized version
- **ComfyUI-AdvancedLivePortrait**: ComfyUI node integration
- **Windows one-click installer** with auto-update
- **Remotion wrapper**: LivePortrait in React/Next.js
- **LivePortrait-Mcp**: Model Context Protocol server
- **Mobile deployment**: MLC-LLM integration
- **Animals model**: Supports cat and dog portrait animation

## Technical Highlights
- **Stitching & Retargeting Control**: Core mechanism for efficient animation
- **Cross-platform**: Linux (NVIDIA), Windows (NVIDIA), macOS (Apple Silicon)
- **torch.compile acceleration**: 20-30% speedup after initial compile
- **Image-driven mode**: Use static images as driving input (not just video)
- **Regional control**: Fine-grained control over specific facial regions
- **Motion template system**: .pkl format for reusable, privacy-safe motion data
