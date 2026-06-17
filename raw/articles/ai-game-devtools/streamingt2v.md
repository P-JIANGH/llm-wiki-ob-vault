# StreamingT2V

Source: https://github.com/Picsart-AI-Research/StreamingT2V
Extracted: 2026-04-20 (web extract; GitHub/gitcode/gitee clone all failed)

## Project Overview

StreamingT2V is an advanced autoregressive framework for text-to-video (T2V) and image-to-video (I2V) generation. The flagship implementation, StreamingSVD, transforms Stability AI's SVD into a high-quality long-video generator by ensuring temporal consistency, rich motion dynamics, and high frame-level quality without stagnation.

> "The effectiveness of the underlying autoregressive approach is not limited to the specific base model used, indicating that improvements in base models can yield even higher-quality videos."

## Key Capabilities

- **Long Video Generation:** Default support for 200 frames (~8 seconds), easily extendable for longer durations.
- **Temporal Consistency:** Maintains coherent motion and visual alignment across frames.
- **Prompt/Image Fidelity:** Closely adheres to input text or image conditioning.
- **Base-Model Agnostic:** Architecture can be applied to other diffusion/video models to improve their long-video capabilities.

## System Requirements

- **VRAM (Default):** 60 GB (for 200 frames)
- **VRAM (Optimized):** 24 GB (~50% slower generation speed)
- **OS:** Linux
- **Python:** 3.9
- **CUDA:** >= 11.8
- Lower frame count or enable randomized blending to further reduce VRAM usage.

## Pipeline

The pipeline runs: **Image-to-Video → Video Enhancement (with optional randomized blending) → Frame Interpolation**.

### CLI Hyperparameters

| Flag | Default | Description |
|------|---------|-------------|
| `--num_frames` | 200 | Total frames to generate |
| `--use_randomized_blending` | False | Enables blending to reduce VRAM (slows generation) |
| `--chunk_size` | N/A | Recommended: 38 (when blending enabled) |
| `--overlap_size` | N/A | Recommended: 12 (when blending enabled) |
| `--out_fps` | 24 | Output video frame rate |
| `--use_memopt` | Off | Activates 24GB VRAM optimization |

## Related Models & Extensions

- **StreamingModelscope:** A branch applying the same autoregressive method to Modelscope. Capable of generating up to 2-minute videos with high motion and zero stagnation.
- **MAWE (Motion Aware Warp Error):** A novel evaluation metric proposed by the authors. Code and implementation details hosted in the StreamingModelscope branch.

## Licensing & Citation

- **Code/Model License:** MIT
- **Usage Restriction:** Due to dependencies on SVD, EMA-VFI, and I2VGen-XL, the project is restricted to non-commercial, research purposes only.

## Links

- Project Page: https://streamingt2v.github.io/
- Paper: https://arxiv.org/abs/2403.14773
- YouTube Demo: https://youtu.be/md4lp42vOGU
- Repository: https://github.com/Picsart-AI-Research/StreamingT2V
