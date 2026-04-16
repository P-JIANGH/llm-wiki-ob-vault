# BriVL — Source Extract

**URL:** https://github.com/BAAI-WuDao/BriVL
**Date:** 2026-04-17

## README Summary

BriVL (Bridging Vision and Language Model) is the first Chinese general-purpose large-scale vision-language pre-trained model. It maps images and text into the same feature space using contrastive learning, outperforming UNITER and CLIP on image-text retrieval tasks.

**Paper:** WenLan: Bridging Vision and Language by Large-Scale Multi-Modal Pre-Training (arXiv 2103.06561)

## Use Cases
- Image retrieval by text / text retrieval by image
- Image captioning
- Zero-shot image classification
- Input features for downstream multimodal tasks

## Technical Features
1. Contrastive learning maps image and text into the same feature space
2. Based on vision-language weak correlation hypothesis — captures abstract connections beyond descriptive text
3. Image and text encoders run independently — favorable for production deployment

## Model Specs
| Model | Language | Params | File |
|-------|----------|--------|------|
| BriVL-1.0 | Chinese | 1B (10亿) | BriVL-1.0-5500w.tar (wudaoai.cn) |

## Architecture (from source code)

### Image Encoder (`ImgLearnableEncoder`)
- **Backbone:** timm EfficientNet-B5 (`tf_efficientnet_b5_ns`), pretrained
- **ROI Grid Pooling:** affine_grid + grid_sample for bounding box feature extraction
- **Transformer:** 4-layer TransformerEncoder, 4 heads, 2048 dim
- **Post-processing:** AvgPool2d + FC layer
- **Partial freezing:** blocks 3-6 trainable, earlier layers frozen

### Text Encoder (`TextLearnableEncoder`)
- **Backbone:** BERT (`hfl/chinese-roberta-wwm-ext`), 768 dim
- **Transformer:** 4-layer TransformerEncoder, 4 heads
- **Partial freezing:** layers 8-11 trainable, earlier layers frozen

### VL Model (MoCo-style contrastive learning)
- **Dual encoder:** imgencoder + textencoder with momentum counterparts
- **Queue-based:** MoCo-style dequeue/enqueue with queue size 9600
- **Momentum coefficient:** 0.99
- **Temperature:** 0.07
- **Loss:** bidirectional image→text + text→image cross-entropy with multi-label masking
- **Distributed:** DDP batch shuffle for BatchNorm utilization

## Configuration (test_xyb.yml)
- Image: 380×380, EfficientNet-B5, 2048-dim features, 4×4 grid pooling
- Text: Chinese RoBERTa-wwm-ext, 768-dim, max length 80
- Contrastive: queue_size=9600, momentum=0.99, temperature=0.07

## Dependencies
torch 1.8.1, torchvision 0.9.1, transformers 4.5.1, timm 0.4.12, numpy 1.20.2, pandas 1.2.4, Pillow 8.3.1, PyYAML 5.4.1

## License
Not explicitly stated in README (wudaoai.cn platform license applies)
