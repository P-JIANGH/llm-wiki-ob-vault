# SonicMaster: Controllable All-in-One Music Restoration & Mastering

**Source:** https://github.com/AMAAI-Lab/SonicMaster
**Captured:** 2026-04-21

## Project Overview

SonicMaster is the **first unified generative model** designed to simultaneously restore and master music recordings. It addresses common audio degradation issues found in non-professional recordings, eliminating the need for multiple specialized tools and manual adjustments.

> "Music recordings often suffer from audio quality issues such as excessive reverberation, distortion, clipping, tonal imbalances, and a narrowed stereo image... SonicMaster is conditioned on natural language instructions to apply targeted enhancements, or can operate in an automatic mode for general restoration."

**Developers:** AMAAI-Lab (Jan Melechovsky, Ambuj Mehrish, Dorien Herremans)
**Paper:** arXiv:2508.03448

## Key Capabilities & Architecture

- **Unified Pipeline:** Combines restoration (artifact removal) and mastering (tonal/spatial enhancement) in a single generative model.
- **Text-Based Control:** Accepts natural language prompts for targeted, user-directed audio enhancements.
- **Automatic Mode:** Runs hands-off for general quality improvement without manual prompting.
- **Architecture:** Built on the **SonicVerse architecture** for music captioning with integrated feature detection.

## Repository Structure & Key Scripts

| File/Directory | Purpose |
|---|---|
| `model.py` | Core SonicMaster architecture & model definition |
| `infer_single.py` | Inference for individual audio files |
| `inference_fullsong.py` | Full-track inference pipeline |
| `inference_ptload_batch.py` | Batch inference using pre-encoded .pt files |
| `train_ptload_inference.py` | Main training script with optional mid-training evaluation |
| `preencode_latents_acce2.py` | Audio-to-latent pre-encoding utility |
| `configs/` | Model & training configuration files |
| `dataset_scripts/` | Data preparation & dataset handling utilities |
| `evaluation/` | Metrics & evaluation pipelines |
| `samples/` | Audio examples & test cases |
| `requirements_sonic.txt` | Python dependencies |

## Training Workflow

Training is optimized for speed by using pre-encoded PyTorch tensors instead of raw audio files.

1. **Pre-encode Audio:** Convert raw audio to latent `.pt` tensor files using `preencode_latents_acce2.py`
2. **Prepare Metadata:** Organize `.pt` file paths in a JSONL metadata file
3. **Run Training:** Execute `train_ptload_inference.py`
   - Loads `.pt` tensors directly from the JSONL metadata
   - **Built-in Monitoring:** Supports periodic inference during training (after a configurable number of epochs) to track restoration quality in real-time

## Installation & Setup

- **Strict Python Requirement:** `python==3.13`
- **Setup Steps:**
  1. Clone the repository
  2. Install dependencies: `pip install -r requirements_sonic.txt`

## Official Resources & Links

- 📄 **Paper:** [arXiv:2508.03448](http://arxiv.org/abs/2508.03448)
- 🤗 **Model Weights:** [Hugging Face Model](https://huggingface.co/amaai-lab/SonicMaster/tree/main)
- 🎧 **Interactive Demo:** [Hugging Face Space](https://huggingface.co/spaces/amaai-lab/SonicMaster)
- 🌐 **Audio Samples:** [Project Samples Page](https://amaai-lab.github.io/SonicMaster/)
- 📊 **Training Dataset:** [SonicMasterDataset](https://huggingface.co/datasets/amaai-lab/SonicMasterDataset)

## Citation

> Jan Melechovsky, Ambuj Mehrish, Dorien Herremans. 2025. *SonicMaster: Towards Controllable All-in-One Music Restoration and Mastering*. ArXiv:2508.03448
