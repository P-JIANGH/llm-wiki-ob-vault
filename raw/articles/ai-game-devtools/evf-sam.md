# EVF-SAM — Source Dump

> Cloned from: https://github.com/hustvl/EVF-SAM (2026-04-14)

## Basic Info

- **Full name**: EVF-SAM (Early Vision-Language Fusion for Text-Prompted Segment Anything Model)
- **Authors**: Yuxuan Zhang, Tianheng Cheng, Lei Liu, Heng Liu, Longjin Ran, Xiaoxin Chen, Wenyu Liu, Xinggang Wang
- **Institutions**: Huazhong University of Science and Technology, vivo AI Lab
- **License**: Not explicitly stated in README
- **Paper**: arXiv:2406.20076
- **HuggingFace**: https://huggingface.co/YxZhang/

## Architecture

- Based on **SAM** (Segment Anything Model) / **SAM-2** for image segmentation
- Vision encoder: **BEIT-3-L** (for large model) or **BEIT-3-B** (for base model)
- Text encoder: BEIT-3's multimodal encoder
- Early fusion approach: vision features fused with language features before mask decoder
- Supports: referring expression segmentation, salient object segmentation, semantic-level segmentation, video text-prompted segmentation

## Model Variants & Weights

| Model | SAM Base | BEIT-3 | Params | Decoder | Score |
|-------|----------|--------|--------|---------|-------|
| EVF-SAM-multitask | SAM-H | BEIT-3-L | 1.32B | train | 84.2 |
| EVF-SAM2-multitask | SAM-2-L | BEIT-3-L | 898M | freeze | 83.2 |
| EVF-SAM | SAM-H | BEIT-3-L | 1.32B | train | 83.7 |
| EVF-SAM2 | SAM-2-L | BEIT-3-L | 898M | freeze | 83.6 |
| EVF-Effi-SAM-L | EfficientSAM-S | BEIT-3-L | 700M | train | 83.5 |
| EVF-Effi-SAM-B | EfficientSAM-T | BEIT-3-B | 232M | train | 80.0 |

## Key Features

- Text-prompted segmentation (referring expression segmentation)
- `[semantic]` prefix for semantic-level segmentation (hair, sky, ground, etc.)
- `[body-part]` prefix for body part segmentation
- Zero-shot video text-prompted capability (via SAM-2 based models)
- Multi-task: part segmentation, background object segmentation, semantic-level masks
- Fast inference on T4 GPU

## Inference

```python
python inference.py \
  --version YxZhang/evf-sam2 \
  --precision='fp16' \
  --vis_save_path "vis" \
  --model_type sam2 \
  --image_path "assets/zebra.jpg" \
  --prompt "zebra top left"
```

Video inference:
```python
python inference_video.py \
  --version YxZhang/evf-sam2 \
  --precision='fp16' \
  --vis_save_path "vis/" \
  --image_path <frame_dir> \
  --prompt <customized text prompt> \
  --model_type sam2
```

## Dependencies

- torch >= 2.0.0 (for SAM-2), torch >= 2.2 (for flash-attention)
- transformers, timm, einops, opencv-python, Pillow, pycocotools, accelerate, deepspeed, torchscale, hydra-core, etc.

## File Structure

```
EVF-SAM/
├── inference.py          # Image inference
├── inference_video.py    # Video inference
├── demo.py               # Image demo
├── demo_video.py         # Video demo
├── eval.py               # Evaluation script
├── frame2video.py        # Concatenate frames to video
├── model/
│   ├── evf_sam.py        # EVF-SAM (SAM-based)
│   ├── evf_sam2.py       # EVF-SAM (SAM-2-based)
│   ├── evf_effisam.py    # Efficient version
│   ├── evf_sam2_video.py # Video variant
│   ├── configuration_evf.py
│   ├── segment_anything/ # SAM v1
│   └── segment_anything_2/ # SAM-2
├── utils/
└── assets/
```

## Related Projects

- [SAM](https://github.com/facebookresearch/segment-anything) — Meta's Segment Anything Model
- [SAM-2](https://github.com/facebookresearch/segment-anything-2) — Meta's SAM-2
- [BEIT-3](https://github.com/microsoft/unilm) — Vision-language pretrained model
- [LISA](https://github.com/dvlab-research/LISA) — LLM-based segmentation (acknowledged in README)
- [EfficientSAM](https://github.com/yformer/EfficientSAM) — Efficient SAM variant
- [GroundingSuite/GSEval](https://github.com/hustvl/GroundingSuite) — Authors' evaluation benchmark
