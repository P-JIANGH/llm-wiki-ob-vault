# AnimationGPT — Raw Source

**Source:** https://github.com/fyyakaxyy/AnimationGPT
**Date:** 2026-04-19
**License:** MIT

## Project Overview

AnimationGPT is a project focused on generating combat-style character animations based on text prompts. It is built on top of [MotionGPT](https://github.com/OpenMotionLab/MotionGPT) and has produced the first character animation dataset dedicated to combat styles, named **CombatMotion**, which comes with textual descriptions.

## Combat Motion Dataset

Two variants:

### CombatMotionProcessed (CMP)
- 8,700 high-quality combat-style animations
- 3 text annotations per animation: concise description, concise + sensory description, detailed description
- Derived from game assets (FBX format → SMPL retargeting → joint coordinates)
- Text annotations created via 7-category manual tagging (action type, weapon type, attack type, locative words, power, speed, fuzzy descriptors) + GPT-4 sentence generation
- Format: HumanML3D compatible

### CombatMotionRaw (CMR)
- 14,883 animations (CMP is a subset)
- Only 1 text annotation per animation (simple keyword concatenation)
- Models trained on this format performed poorly
- Richer animation data but annotations not detailed enough

## Annotation Categories

| Category | Examples |
|----------|----------|
| Action type | Idle, Get Hit, Death, ... |
| Weapon type | Bare Hand, Sacred Seal, Fist, Katana, ... |
| Attack type | Left-Handed, Right-Handed, One-Handed, Charged Heavy Attack, ... |
| Locative words | In-Place, Towards Left, Towards Right, Forward, ... |
| Power | Light-Weighted, Steady, Heavy-Weighted, Powerful, ... |
| Speed | Swift, Relative Fast, Uniform Speed, First slow then fast, ... |
| Fuzzy | Piercing, Slash, Blunt, Charged, Wide Open, ... |

## Model & Evaluation

Models trained on CMP dataset (various algorithms):
- MotionGPT Model — available on Google Drive
- MLD Model — available on Google Drive
- MDM Model — available on Google Drive

Evaluation metrics on CMP (key results):
| Method | R-Precision (top 3) | FID ↓ | MultiModality ↑ |
|--------|---------------------|-------|-----------------|
| Ground Truth | 0.628 | 0.006 | / |
| T2M-GPT | 0.663 | 0.177 | 1.798 |
| MMM | 0.667 | 0.151 | 0.757 |
| MotionGPT | 0.605 | 0.267 | 2.210 |
| MLD | 0.568 | 0.628 | 3.035 |
| MDM | 0.148 | 9.467 | 5.682 |

## Technical Architecture

- **Base:** MotionGPT (mGPT) — treats human motion as a foreign language
- **Training config:** AdamW optimizer, lr=1e-4, batch=16, 50 epochs
- **Model target:** mGPT.models.mgpt.MotionGPT
- **Condition:** text → motion (t2m task)
- **Motion VAE:** VQ-VAE (vector quantization)
- **LM:** Default language model from mGPT
- **Dataset:** HumanML3D format (custom CMP data)
- **Logging:** TensorBoard + Weights & Biases

## Key Tools

### tools/animation.py
- Converts generated .npy files to .mp4 video files
- Uses matplotlib 3D plotting for skeletal visualization
- Requires ffmpeg on Windows

### tools/npy2bvh/
- Converts .npy files to .bvh (Biovision Hierarchy) animation files
- Includes: BVH.py, Animation.py, Quaternions.py, InverseKinematics.py
- Uses SMPL skeleton template for joint mapping
- Based on Momask visualization code

### tools/vid2gif.py
- Converts video files to GIF format

### tools/datasetProcess/
- POStagging.py — part-of-speech tagging for text annotations
- checkNaN.py — data quality validation

## Usage Flow

1. Clone MotionGPT, set up environment (Python 3.10, CUDA 11.8)
2. Download CMP dataset → extract to datasets/humanml3d/
3. Copy AnimationGPT tools/ and config_AGPT.yaml into MotionGPT/
4. Download trained AGPT model weights
5. Run: `python demo.py --cfg ./config_AGPT.yaml --example ./input.txt`
6. Convert output .npy → .mp4 or .bvh

## Pipeline for Dataset Creation

1. FBX game assets → SMPL retargeting (Fbx2SMPL) → read joint coordinates
2. Manual 7-category annotation → GPT-4 sentence generation → text descriptions
3. Process to HumanML3D format

## Suggestions from Authors

- Textual annotations should not contain Chinese characters/punctuation, POS-untaggable words, or mathematical symbols (e.g., °)
- Adding root motion direction descriptions helps the model learn directional words
- Adding frame number info does NOT enable the model to learn duration control
- More detailed annotations + more annotations per animation = better model performance
- Mixed training (HumanML3D + KIT-ML + CMP) improves metrics but visual quality may degrade due to dataset distribution differences
- Motion-X can be converted to HumanML3D format for pre-training, then fine-tune on CMP

## Authors

Yihao Liao, Yiyu Fu, Ziming Cheng, Jiangfeiyang Wang

## Citation

@misc{CombatMotion,
  title={AnimationGPT:An AIGC tool for generating game combat motion assets},
  author={Yihao Liao, Yiyu Fu, Ziming Cheng, Jiangfeiyang Wang},
  year={2024},
  howpublished={\url{https://github.com/fyyakaxyy/AnimationGPT}}
}
