# InfiniteTalk — Raw Source

**Source:** https://github.com/MeiGen-AI/InfiniteTalk
**Extracted:** 2026-04-20
**Method:** web_extract (GitHub/gitcode/gitee clone all failed)

## README Content

### Overview
InfiniteTalk: Audio-driven Video Generation for Sparse-Frame Video Dubbing

**TL;DR:** Unlimited-length talking video generation model supporting both audio-driven video-to-video and image-to-video generation.

### Key Features
- **Sparse-Frame Video Dubbing:** Synthesizes videos with accurate lip synchronization while simultaneously aligning head movements, body posture, and facial expressions with the audio.
- **Infinite-Length Generation:** Overcomes traditional length limits while preserving consistent identity.
- **Dual Input Modes:** Works as both `video+audio → video` and `image+audio → video`.
- Project Page: https://meigen-ai.github.io/InfiniteTalk/
- Tech Report: arXiv 2508.14033
- Hugging Face: https://huggingface.co/MeiGen-AI/InfiniteTalk

### Authors
Shaoshu Yang*, Zhe Kong*, Feng Gao*, Meng Cheng*, Xiangyu Liu*, Yong Zhang✉, Zhuoliang Kang, Wenhan Luo, Xunliang Cai, Ran He, Xiaoming Wei. (* Equal Contribution, ✉ Corresponding)

### Installation
- Python 3.10, PyTorch 2.4.1 + CUDA 12.1
- xformers 0.0.28, flash_attn 2.7.4.post1
- Dependencies: librosa, ffmpeg, misaki[en], ninja, psutil, packaging, wheel

### Model Dependencies
- Wan2.1-I2V-14B-480P (base video generation model)
- chinese-wav2vec2-base (audio encoder)
- MeiGen-InfiniteTalk (audio condition weights)

### Inference Modes
- **streaming mode:** long video generation (default max_frame_num=1000 ≈ 40s)
- **clip mode:** short chunk generation
- **480P / 720P** resolution options
- **Low VRAM:** --num_persistent_param_in_dit 0
- **Multi-GPU:** FSDP + Ulysses parallel (8 GPU)
- **LoRA acceleration:** 4-8 step generation with LoRA fine-tuning
- **FP8 quantization:** single GPU only
- **Gradio UI:** app.py

### License
Apache 2.0 — Models free to use, no rights claimed over generated content.

### Citation
```
@misc{yang2025infinitetalkaudiodrivenvideogeneration,
  title={InfiniteTalk: Audio-driven Video Generation for Sparse-Frame Video Dubbing},
  author={Shaoshu Yang and Zhe Kong and Feng Gao and Meng Cheng and Xiangyu Liu and Yong Zhang and Zhuoliang Kang and Wenhan Luo and Xunliang Cai and Ran He and Xiaoming Wei},
  year={2025},
  eprint={2508.14033},
  archivePrefix={arXiv},
  primaryClass={cs.CV},
}
```
