---
title: OpenGVLab
created: 2026-04-20
updated: 2026-04-20
type: entity
tags: [ai, vision, vlm, llm, multimodal, open-source]
sources: []
---

## Overview

**OpenGVLab** (OpenGV Lab) is a computer vision and graphics research laboratory under Shanghai AI Laboratory (上海人工智能实验室). The lab produces influential open-source models in vision-language, document understanding, and multimodal AI, including the Donut, OSPrey, and InternVL model families.

## Key Facts

| Attribute | Value |
|-----------|-------|
| Full Name | OpenGV Lab (Open Graphics and Vision Lab) |
| Organization | Shanghai AI Laboratory |
| Focus | Vision-language models, document understanding, multimodal AI |
| GitHub | https://github.com/OpenGVLab |
| License | Apache 2.0 (most projects) |

## Notable Model Families

### InternVL
- **InternVL** series: Large-scale vision-language foundation models
- Combines vision encoders with LLM backbones for unified understanding
- Strong performance on visual question answering, image captioning, document understanding
- InternVL2 / InternVL2.5 variants with improved capabilities
- Supports high-resolution image processing

### Donut (Document Understanding Transformer)
- OCR-free document understanding model
- Directly processes document images to extract structured information
- No separate OCR engine needed — end-to-end transformer architecture
- Excels at receipt parsing, form understanding, document VQA
- Foundation for downstream document AI applications

### OSPrey
- Visual instruction tuning framework
- Enables open-vocabulary object detection and segmentation through language instructions
- Connects vision encoders with language models for rich visual grounding
- Supports referring expression comprehension and generation

### Other Projects
- **ShareGPT4V**: High-quality vision-language instruction data
- **Monkey**: Instruction-tuned vision-language models
- **Vary**: Vision-language models with varying resolutions

## Research Contributions

- Pioneering work in OCR-free document understanding (Donut paradigm)
- Large-scale vision-language pre-training methodologies
- Open-source release of training data and model weights
- Active contributions to the multimodal AI community

## Game Development Applications

- **UI/Document Understanding**: Donut can parse game documentation, patch notes, and in-game text from screenshots
- **Asset Analysis**: InternVL can analyze game art assets, generate descriptions for cataloging
- **Mod Tooling**: Vision-language models for automated sprite/texture classification
- **Localization**: OCR-free text extraction from game screenshots for translation pipelines
- **NPC Vision**: Multimodal understanding for NPCs that can "see" and reason about game environments

## Relationship to Other Projects

- **Shanghai AI Lab** also produces [[internlm]] series LLMs
- InternVL competes with [[llava]] and [[cogvlm]] in the VLM space
- Donut's OCR-free approach differs from traditional [[easyphoto]]-style pipelines

## References

- GitHub: https://github.com/OpenGVLab
- InternVL: https://github.com/OpenGVLab/InternVL
- Donut: https://github.com/clovaai/donut (originally by Clova AI, adopted by OpenGVLab ecosystem)
- Paper: "InternVL: Scaling up Vision Foundation Models and Aligning for Generic Visual-Linguistic Tasks"
