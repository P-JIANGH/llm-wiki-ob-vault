# MotionLLM: Understanding Human Behaviors from Human Motions and Videos

> Source: https://github.com/IDEA-Research/MotionLLM
> Cloned: 2026-04-15
> License: IDEA License

## Metadata

| Field | Value |
|-------|-------|
| **Project** | MotionLLM |
| **Authors** | Ling-Hao Chen, Shunlin Lu, Ailing Zeng, Hao Zhang, Benyou Wang, Ruimao Zhang, Lei Zhang |
| **Affiliations** | Tsinghua University, CUHK-Shenzhen, IDEA (International Digital Economy Academy), HKUST |
| **Paper** | arXiv:2405.20340 |
| **Project Page** | https://lhchen.top/MotionLLM |
| **Demo** | https://demo.humotionx.com/ |
| **HuggingFace Demo** | https://huggingface.co/spaces/EvanTHU/MotionLLM |
| **License** | IDEA License |

## Abstract

MotionLLM is a multi-modal LLM framework for understanding human behaviors from both video and motion modalities. Unlike existing LLMs designed for video-only or motion-only understanding, MotionLLM jointly models videos and motion sequences (e.g., SMPL sequences) to capture nuanced body part dynamics and semantics.

Key innovation: unified video-motion training strategy that leverages complementary advantages of coarse video-text data and fine-grained motion-text data.

## Architecture

Based on [Video-LLaVA](https://github.com/PKU-YuanGroup/Video-LLaVA), [MotionGPT](https://github.com/qiqiApink/MotionGPT), [lit-gpt](https://github.com/Lightning-AI/litgpt), and [HumanML3D](https://github.com/EricGuo5513/HumanML3D).

- **Base LLM**: Vicuna 1.5-7B (via Lit-GPT)
- **Training**: Unified video-motion training strategy
- **LoRA**: Low-rank adaptation for efficient fine-tuning
- **Projection**: Linear projection layer (LINEAR_V) for motion features

## Key Components

| File | Purpose |
|------|---------|
| `app.py` | Gradio web demo |
| `CLI.py` | Command-line interface |
| `generate.py` | Text generation (modified from Karpathy's nanoGPT) |
| `lit_llama/` | Lit-GPT LLM infrastructure |
| `lit_gpt/` | Lit-GPT utilities |
| `models/` | Model architecture modules |
| `options/` | Configuration options |
| `scripts/` | Training/inference scripts |

## Dependencies

Key packages: lightning, torch, transformers, peft, decord, pytorchvideo, smplx, opencv-python, imageio, sentence_transformers, einops, gradio, deepspeed, bitsandbytes.

## Dataset: MoVid

Collected by the authors: diverse videos, motions, captions, and instructions. Video data available on [HuggingFace](https://huggingface.co/datasets/EvanTHU/MoVid).

### MoVid-Bench

Evaluation benchmark with manual annotations for human behavior understanding on video and motion.

## Applications

- Human motion captioning
- Spatial-temporal comprehension
- Reasoning about human behavior from video
- Motion understanding and description

## To-Do (from README)

- [x] CLI demo
- [x] Video demo
- [ ] Motion demo
- [ ] MoVid dataset and MoVid-Bench release
- [ ] Tuning instruction release

## Citation

```bash
@article{chen2024motionllm,
  title={MotionLLM: Understanding Human Behaviors from Human Motions and Videos},
  author={Chen, Ling-Hao and Lu, Shunlin and Zeng, Ailing and Zhang, Hao and Wang, Benyou and Zhang, Ruimao and Zhang, Lei},
  journal={arXiv preprint arXiv:2405.20340},
  year={2024}
}
```

## Related Projects in Same Ecosystem

- [Video-LLaVA](https://github.com/PKU-YuanGroup/Video-LLaVA) — base architecture
- [MotionGPT](https://github.com/qiqiApink/MotionGPT) — motion language modeling
- [HumanTOMATO](https://lhchen.top/HumanTOMATO/) — related human motion work
