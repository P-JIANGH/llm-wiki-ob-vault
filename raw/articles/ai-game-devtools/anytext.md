# AnyText — Multilingual Visual Text Generation And Editing

**Source:** https://github.com/tyxsspa/AnyText
**Paper:** https://arxiv.org/abs/2311.03054
**License:** Not explicitly stated in README (Alibaba, Inc.)
**Publication:** ICLR 2024 (Spotlight)

## Overview

AnyText is a diffusion-based model for multilingual visual text generation and editing. It generates or edits text that seamlessly blends into images, supporting both Chinese and English (and other languages via OCR).

## Core Architecture

### Pipeline Structure
- **Base:** Stable Diffusion 1.5 (SD1.5) backbone with ControlNet-style conditioning
- **ControlLDM:** The main model class (`cldm.cldm.ControlLDM`) extends ControlNet with text-aware modules
- **EmbeddingManager:** OCR-based text embedding manager (`cldm.embedding_manager.EmbeddingManager`)

### Two Specialized Modules
1. **Auxiliary Latent Module:** Processes text glyph, position, and masked image to generate latent features
   - Takes glyph (text shape) + position mask + masked image as input
   - Outputs latent conditioning for the diffusion process

2. **Text Embedding Module:** Uses an OCR model (PaddleOCR-style) to encode stroke data as embeddings
   - OCR encoder (`ocr_recog/RecModel.py`): SVTR-based recognizer with CTC head
   - Blends OCR embeddings with image caption embeddings from CLIP tokenizer
   - Placeholder string `*` marks text positions in the prompt

### Training Losses
- **Text-Control Diffusion Loss:** Standard diffusion loss conditioned on text layout
- **Text Perceptual Loss:** CTC-based loss using OCR features to enhance character accuracy
- Loss weights: `loss_alpha` (perceptual), `loss_beta` (CTC), `latin_weight` (Latin text gets smaller weight)

### Model Configuration (anytext_sd15.yaml)
- UNet: 320 model channels, 2 res blocks, [1,2,4,4] channel mult, 8 heads, transformer depth 1
- ControlNet: same architecture, receives glyph + position conditioning
- CLIP: FrozenCLIPEmbedderT3 (768-dim context)
- VAE: AutoencoderKL (4 channels, 0.18215 scale factor)
- Embedding: OCR mode with glyph_channels=1, position_channels=1

## Key Files

| File | Purpose |
|------|---------|
| `demo.py` | Gradio UI for inference (483 lines): text generation + editing modes, FP16 support, LoRA loading |
| `inference.py` | CLI inference script (37 lines): demonstrates both modes |
| `train.py` | Training pipeline |
| `tool_add_anytext.py` | Weight merging utility: adds AnyText modules to SD1.5 base |
| `t3_dataset.py` | Dataset loader for text-aware training |
| `cldm/` | Core model code (ControlLDM, ControlNet, EmbeddingManager) |
| `ldm/` | Stable Diffusion modules (diffusion, attention, encoders) |
| `ocr_recog/` | OCR recognition model (SVTR + CTC) |
| `ocr_weights/` | Pre-trained OCR weights (Chinese + English) |
| `eval/` | Benchmark evaluation scripts |

## Inference Usage

### Modes
- **Text Generation:** Provide prompt + text position mask → generate image with text
- **Text Editing:** Provide original image + new text + position → edit text in image

### Configuration
- Default: FP16 + Chinese-to-English translation model (~4GB VRAM overhead)
- Optimized: ~7.5GB VRAM for single 512x512 image (FP16, translator disabled)
- Supports LoRA integration: `/path/of/lora1.pth 0.3 /path/of/lora2.safetensors 0.6`
- Custom fonts, base model swapping, specified checkpoint loading

### Pipeline
```python
from modelscope.pipelines import pipeline
pipe = pipeline('my-anytext-task', model='damo/cv_anytext_text_generation_editing', model_revision='v1.1.3')
results, rtn_code, rtn_warning, debug_info = pipe(input_data, mode='text-generation', **params)
```

## Evaluation Metrics
- **Text Accuracy:** Sentence Accuracy (Sen. ACC), Normalized Edit Distance (NED)
- **Image Quality:** Fréchet Inception Distance (FID)
- Benchmark dataset: AnyText-benchmark (ModelScope / GoogleDrive)

## Training Pipeline
1. Setup environment from `environment.yaml`
2. Configure dataset path (`data_root`)
3. Initialize AnyText modules: `python tool_add_anytext.py`
4. Start training: `python train.py`

## Dataset
- **AnyWord-3M:** Released 2024.04.18, 3M+ images with text annotations
- Supports merging SD1.5 base/LoRA weights

## Key Milestones
| Date | Update |
|------|--------|
| 2025.03.03 | AnyText2 released: faster, higher quality, font & color control |
| 2024.04.18 | Training code + AnyWord-3M dataset released |
| 2024.02.21 | Evaluation code + AnyText-benchmark dataset released |
| 2024.01.04 | FP16 inference enabled (3x faster, runs on >8GB VRAM GPUs) |

## Live Demos
- ModelScope: https://modelscope.cn/studios/damo/studio_anytext
- HuggingFace: https://huggingface.co/spaces/modelscope/AnyText
- DashScope API: https://help.aliyun.com/zh/dashscope/developer-reference/tongyi-wanxiang-api-for-anytext

## Citation
```bibtex
@article{tuo2023anytext,
  title={AnyText: Multilingual Visual Text Generation And Editing},
  author={Yuxiang Tuo and Wangmeng Xiang and Jun-Yan He and Yifeng Geng and Xuansong Xie},
  year={2023},
  eprint={2311.03054},
  archivePrefix={arXiv},
  primaryClass={cs.CV}
}
```

## Differences from Similar Tools
- vs **ControlNet**: AnyText adds text-aware modules (OCR embedding + glyph conditioning) on top of ControlNet architecture
- vs **TextDiffuser**: AnyText uses OCR-based perceptual loss for better character accuracy
- vs **GlyphControl**: AnyText supports multilingual (Chinese + English) natively via PaddleOCR-based encoding
- AnyText2 (successor) adds font & color control, improved speed and quality
