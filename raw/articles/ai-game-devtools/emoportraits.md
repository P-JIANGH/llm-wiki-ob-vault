# EMOPortraits — Raw Source

**URL**: https://github.com/neeek2303/EMOPortraits
**Captured**: 2026-04-18

## README Summary

Official implementation of **EMOPortraits: Emotion-enhanced Multimodal One-shot Head Avatars**.

Generates realistic and expressive one-shot head avatars driven by multimodal inputs, including extreme and asymmetric emotions.

### Key Links
- Project Page: https://neeek2303.github.io/EMOPortraits/
- Paper: https://arxiv.org/abs/2404.19110
- FEED Dataset: https://github.com/neeek2303/FEED
- Author: https://neeek2303.github.io

### Architecture
- **Two-stage pipeline**: stage_1 (basic volumetric avatar) → stage_2 (emotion enhancement)
- **Models**: volumetric_avatar (VA) for basic 3D avatar representation
- **Networks**: basic_avatar + volumetric_avatar + head_pose_regressor
- **Framework**: PyTorch with DDP (DistributedDataParallel) or Apex parallel training
- **Loss functions**: L1 (eyes/mouth/ears), VGG19 face perceptual, ResNet18 face verification, pull/push expression losses, volumes L1 loss, gaze model loss
- **Datasets**: VoxCeleb2 HQ (main training), FEED (emotion incorporation), MEAD (secondary dataset)

### Project Structure
```
models/
├── stage_1/    # Basic volumetric avatar model
└── stage_2/    # Emotion enhancement stage
networks/
├── basic_avatar/
├── volumetric_avatar/
└── head_pose_regressor.py
losses/         # Custom loss implementations + gaze models
datasets/       # Data loading modules (voxceleb2hq, extrime_faces, mead_faces)
```

### Usage
Video-driven pipeline:
```bash
python run_video_driven_pipeline.py \
  --source_image_path data/person1.jpg \
  --driven_video_path data/driver.mp4 \
  --saved_to_path output/animated_result.mp4 \
  --fps 30 \
  --max_len 150
```

### Training
- Uses Weights & Biases (wandb) for experiment logging
- Supports DDP (up to 8 GPUs) and Apex parallel training
- Custom trainer with multi-optimizer setup
- Secondary dataset mixing (FEED for emotions, MEAD for additional faces)

### Notes from README
- Repository for demonstration purposes; author no longer in academia
- Original model trained on HQ VoxCeleb2 (no longer publicly available)
- FEED dataset used for extreme/asymmetric emotion latent space
- Pre-trained weights provided (logs.zip, logs_s2.zip, repos.zip)

### Dependencies
- face_detection (hhj1897)
- roi_tanh_warping (ibug-group)
- face_parsing (hhj1897)
- Apex (for AMP, optional)
- wandb (logging)
