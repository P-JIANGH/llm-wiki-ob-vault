# LivePortrait — Efficient Portrait Animation with Stitching and Retargeting Control

> Source: https://github.com/KwaiVGI/LivePortrait
> Analyzed: 2026-04-19
> Authors: Jianzhu Guo, Dingyun Zhang, Xiaoqiang Liu, Zhizhou Zhong, Yuan Zhang, Pengfei Wan, Di Zhang (Kuaishou Technology)

## Overview
LivePortrait is an open-source portrait animation framework by Kuaishou (快手) that efficiently animates portrait images and videos using a single driving video or image. It uses stitching and retargeting control to produce high-quality, natural-looking animations.

## Key Features
- **Image/Video Source**: Accepts both static images and videos as source input
- **Driving Video/Image**: Uses a single reference video or image to drive facial expressions
- **Stitching Control**: Seamlessly blends animated face with original image
- **Retargeting Control**: Precise editing of pose and expression parameters
- **Multi-Subject Support**: Humans, cats, and dogs (Animals mode via X-Pose)
- **Motion Template**: Privacy-preserving `.pkl` template format for driving motions
- **Auto-Crop Driving Video**: `--flag_crop_driving_video` for automatic 1:1 cropping
- **torch.compile Acceleration**: `--flag_do_torch_compile` for 20-30% speedup after first run
- **Cross-Platform**: Linux, Windows, macOS (Apple Silicon via MPS)

## Architecture
### Main Pipeline (`src/live_portrait_pipeline.py`)
1. **Face Detection & Landmark**: InsightFace (RetinaFace) for human face detection and 106-point landmark extraction
2. **Appearance Feature Extraction**: Extract appearance features from source image
3. **Motion Extraction**: Extract 3DMM-based motion parameters from driving video
4. **Stitching Module**: Blend animated portrait with source background
5. **Retargeting Module**: Control expression/pose intensity via parameter scaling
6. **Rendering**: Generate final animated frames → FFmpeg video output

### Animals Mode (`src/live_portrait_pipeline_animal.py`)
- Uses **X-Pose** (IDEA-Research) for animal keypoint detection
- Requires custom CUDA OP `MultiScaleDeformableAttention`
- `--driving_multiplier` controls animation intensity

### Key Dependencies
- **InsightFace**: Face detection + landmark (bundled as dependency)
- **X-Pose**: Animal keypoint detection (for Animals mode)
- **ONNX Runtime GPU**: Accelerated inference
- **Transformers 4.38.0**: Model support
- **Gradio**: Web UI interface
- **FFmpeg**: Video processing
- **PyTorch**: Deep learning framework (with MPS support for macOS)

## Technical Stack
- Python 3.10, PyTorch
- ONNX Runtime (GPU acceleration)
- Gradio Web UI
- FFmpeg for video processing
- InsightFace (bundled) + X-Pose (optional)

## License
Apache 2.0

## Key Files
| File | Purpose |
|------|---------|
| `inference.py` | Main inference script (humans mode) |
| `inference_animals.py` | Animals mode inference |
| `app.py` | Gradio Web UI (humans) |
| `app_animals.py` | Gradio Web UI (animals) |
| `src/live_portrait_pipeline.py` | Core processing pipeline |
| `src/gradio_pipeline.py` | Gradio integration |
| `src/utils/retargeting_utils.py` | Expression/pose retargeting |
| `speed.py` | Inference speed benchmark |

## Community Ecosystem
- **FasterLivePortrait**: TensorRT accelerated version
- **ComfyUI-AdvancedLivePortrait**: Real-time preview ComfyUI node
- **FacePoke**: Real-time mouse-controlled head transformation
- **FaceFusion 3.0**: Integrates as expression_restorer/face_editor
- **sd-webui-live-portrait**: Stable Diffusion WebUI extension
- Multiple HuggingFace Spaces and Replicate demos

## Links
- GitHub: https://github.com/KwaiVGI/LivePortrait
- arXiv: https://arxiv.org/pdf/2407.03168
- Homepage: https://liveportrait.github.io
- HuggingFace: https://huggingface.co/spaces/KlingTeam/LivePortrait
- Windows Installer: https://huggingface.co/cleardusk/LivePortrait-Windows

## Changelog Highlights
- 2025/06/01: Adopted by major platforms (Kuaishou, Douyin, Jianying, WeChat Channels)
- 2025/01/01: Animals model updated with more data
- 2024/08/19: Image driven mode + regional control
- 2024/08/06: Precise portrait editing in Gradio
- 2024/08/02: Animals model released
- 2024/07/25: Portrait video editing (v2v) support
- 2024/07/17: macOS Apple Silicon support
