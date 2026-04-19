# Follow-Your-Canvas: Higher-Resolution Video Outpainting with Extensive Content Generation

**Source:** https://github.com/mayuelala/FollowYourCanvas
**Conference:** AAAI 2025
**ArXiv:** 2409.01055
**Authors:** Qihua Chen*, Yue Ma*, Hongfa Wang*, Junkun Yuan*✉️, Wenzhe Zhao, Qi Tian, Hongmei Wang, Shaobo Min, Qifeng Chen, Wei Liu✉️

## Core Capabilities
- **High-Resolution Video Outpainting:** Generates extensive, rich content beyond original video boundaries
- **Memory Optimization:** Overcomes standard GPU memory constraints while preserving spatial-temporal consistency
- Training/inference code, configuration files, and model checkpoints publicly released

## Environment & Hardware
- **GPU Memory:** Minimum 60GB VRAM for training and inference (outpainting window processes 512×512×64 frames per pass)
- **Installation:** Docker compose (Dockerfile + compose.yaml) or manual via requirements.txt

## Required Models
- `sam_vit_b_01ec64.pth` — Segment Anything Model
- `checkpoint-40000.ckpt` — Official Follow-Your-Canvas weights (Google Drive)
- `stable-diffusion-2-1` — Base diffusion model
- `Qwen-VL-Chat` — Vision-language model for prompt generation

## Training
- Hardware: 8× NVIDIA A800 GPUs
- Duration: 50,000 steps
- Dataset: Panda-70M
- Data format: CSV mapping video filenames to text prompts

## Inference
- **Modes:** Outpainting with or without text prompts
- **Auto-Prompting:** Qwen-VL-Chat auto-generates prompt if none provided
- **Scripts:** `inference_outpainting-dir.py` (no prompt), `inference_outpainting-dir-with-prompt.py` (with prompt)
- Output saved to `/infer` directory

## Evaluation
- **Benchmark:** DAVIS 2017 dataset
- **Metrics:** PSNR, SSIM, LPIPS, FVD, AQ (Aesthetic Quality), IQ (Imaging Quality via V-Bench)
- Input videos, ground truth, and results available on Google Drive

## Related Projects (Follow Family)
- Follow-Your-Pose: Pose-Guided Text-to-Video Generation
- Follow-Your-Click: Open-Domain Regional Image Animation via Short Prompts
- Follow-Your-Handle: Controllable Video Editing via Control Handle Transformations
- Follow-Your-Emoji: Fine-Controllable Portrait Animation

## Acknowledgements
Built upon AnimateDiff and VBench open-source foundations
