# 3D-LLM: Injecting the 3D World into Large Language Models

**Source:** https://github.com/UMass-Foundation-Model/3D-LLM
**Extracted:** 2026-04-18
**Venue:** NeurIPS 2023 Spotlight
**Authors:** Yining Hong, Haoyu Zhen, Peihao Chen, Shuhong Zheng, Yilun Du, Zhenfang Chen, Chuang Gan

## Core Contribution
- First LLM capable of natively processing 3D representations as input.
- Supports both object-level (Objaverse) and scene-level (ScanNet, HM3D) 3D data.
- Architecture built on top of salesforce-lavis (BLIP2-based) with Open-Flamingo support planned.

## Installation & Dependencies
- Core dependency: salesforce-lavis (BLIP2-based framework)
- HuggingFace auto-load checkpoint support marked as TODO.

## Checkpoints
- Pretraining: Use v2 for best performance (Google Drive)
- Finetuning: Released for ScanQA, SQA3D, 3DMV_VQA. Outperforms preprint results.

## Quick Start: Inference
- Prerequisites: Download Objaverse subset features & pretrained checkpoints.
- Python inference for objects and scenes (room mode).

## Finetuning & Evaluation
- Config location: 3DLLM_BLIP2-base/lavis/projects/blip2/train/
- Distributed training via torch.distributed.run
- Score calculation scripts provided.

## Datasets & Data Availability
- All data released on Google Drive & HuggingFace (Drive updated first).
- Pretraining Data:
  - Objects: Language annotations released. Objaverse models from official site.
  - Scenes: Language data released. 3D features & point clouds (~250GB) released. Use v2.
  - Dataset counts: chat: 73,103 | task: 84,531
  - Grounding & navigation data still being cleaned.
- Finetuning Data:
  - ScanNet: Features/point clouds for ScanQA & SQA3D released.
  - 3DMV-VQA: Features released.
  - All QA pairs available via Google Drive.

## 3D Feature Extraction & Data Generation Pipelines
### ChatCaptioner-Based (Objaverse)
1. Render views (3DLanguage_data/ChatCaptioner_based/objaverse_render/README.md)
2. Generate captions using ChatCaptioner on rendered images.
3. Construct 3D features (3DLanguage_data/ChatCaptioner_based/gen_features/README.md)

### Three-Step 3D Feature Extraction (Scenes)
1. **Mask Extraction:** Extract instance masks from multi-view images using Mask2Former or SAM.
2. **2D Feature Extraction:** Extract vision-language features using CLIP (Open-Flamingo) or BLIP (LAVIS/BLIP2).
3. **3D Reconstruction:** Fuse 2D features into 3D space.
   - Direct: Requires Habitat. Outputs pcd_pos.pt (N×3) & pcd_feat.pt (N×n_dim).
   - GradSLAM: Refer to Concept Fusion.
   - Neural Field: Refer to 3D-CLR.
   - Specs: N = 300,000 (default sampled points) | n_dim = 1024 (CLIP) or 1408 (BLIP)

## Citation
@article{3dllm, author = {Hong, Yining and Zhen, Haoyu and Chen, Peihao and Zheng, Shuhong and Du, Yilun and Chen, Zhenfang and Gan, Chuang}, title = {3D-LLM: Injecting the 3D World into Large Language Models}, journal = {NeurIPS 2023 Spotlight} }

## Project Page
https://vis-www.cs.umass.edu/3dllm/

## arXiv
https://arxiv.org/abs/2307.12981
