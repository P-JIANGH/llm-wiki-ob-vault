# Waver 1.0: Industry-Level Video Foundation Model

**Source:** https://github.com/FoundationVision/Waver
**Extracted:** 2026-04-20 (web extract; GitHub/gitcode/gitee clone all failed)
**Type:** Unified T2V, I2V & T2I Generation

---

## Overview
Waver 1.0 is a next-generation, universal foundation model family built on **rectified flow Transformers**, engineered for industry-grade video and image synthesis.

- **All-in-One Framework:** Simultaneously supports Text-to-Video (T2V), Image-to-Video (I2V), and Text-to-Image (T2I) in a single model.
- **High-Res & Flexible:** Generates up to **1080p** with flexible aspect ratios and video lengths (**2–10 seconds**).
- **SOTA Performance:** Ranked **Top 3** on Artificial Analysis T2V & I2V leaderboards (as of 2025-08-05), outperforming open-source models and matching/exceeding commercial solutions.
- **Superior Motion:** Excels at complex motion amplitude and temporal consistency.

## Architecture & Model Specifications
- **Latent Compression:** `Wan-VAE` for efficient video latent extraction.
- **Text Encoders:** `flan-t5-xxl` + `Qwen2.5-32B-Instruct`
- **Core Design:** DiT built on rectified flow Transformers with **Dual Stream + Single Stream** fusion (`M=16`, `N=40` blocks).
- **Unified Input Channels:** `16` (video tokens) + `16` (image/first frame tokens) + `4` (task mask). Joint T2V/I2V training achieved by modifying input channels; image latent incorporated at **20% probability**.

**12B Model Configuration:**
| Model | M | N | Input Dimension | Output Dimension | Num of Head | Head Dim |
|---|---|---|---|---|---|---|
| 12B | 16 | 40 | 36 | 16 | 24 | 128 |

## 1080p Cascade Refiner
- **Architecture:** DiT trained via flow matching. Upscales low-res (480p/720p) → 1080p, adds noise, then refines.
- **Optimization:** Uses window attention and **halves inference steps**.
- **Speed Gains:** 
  - `~40%` faster for 720p → 1080p
  - `~60%` faster for 480p → 1080p (vs. direct 1080p generation)

## Training Recipe
- **Progressive Resolution:** Trained sequentially on `192p → 480p → 720p` (critical for learning motion dynamics).
- **Sigma Shift (SD3 Flow Matching):** Gradually increased during training. For 720p: `3.0` (training) / `7.0` (inference).
- **Timestep Sampling Strategy:**
  - **T2I:** `lognorm(0.5, 1)` probability density function
  - **T2V/I2V:** `mode(1.29)` *(empirically yields greater motion amplitude)*

## Prompt Tagging & Engineering
- **Style/Quality Tags:** Style descriptors are **prepended**, quality descriptors are **appended** to training captions.
- **Negative Prompts:** Used during inference to suppress undesirable traits.
- **Prompt Rewriting:** Automatically applied for specific style requests (e.g., Ghibli, Disney, voxel, 2D cartoon).

## Inference Optimization
- **APG Extension:** Adapts APG to video by decomposing CFG updates into parallel/orthogonal components and down-weighting the parallel component to **prevent oversaturation**.
- **Latent Normalization:** Normalizing over `[C, H, W]` yields significantly fewer artifacts than `[C, T, H, W]`.
- **Optimal Hyperparameters:** Normalization threshold: `27`, Guidance scale: `8`.

## Benchmarks & Evaluation
- **Waver-Bench 1.0:** 304 samples spanning sports, daily activities, landscapes, animals, machinery, surreal scenes, and animations.
- **Hermes Motion Testset:** 96 prompts across 32 sports disciplines to stress-test large-amplitude motion.
- Manual evaluations confirm Waver 1.0 surpasses both open and closed-source models in **motion quality, visual fidelity, and prompt adherence**.

## Links & Citation
- **Technical Report:** [arXiv 2508.15761](https://arxiv.org/pdf/2508.15761)
- **Project Page:** [waver.video](http://www.waver.video/)
- **Community:** [Discord](http://opensource.bytedance.com/discord/invite)

```bibtex
@article{zhang2025Waver,
  title={Waver: Wave Your Way to Lifelike Video Generation},
  author={Zhang, Yifu and Yang, Hao and Zhang, Yuqi and Hu, Yifei and Zhu, Fengda and Lin, Chuang and Mei, Xiaofeng and Jiang, Yi and Yuan, Zehuan and Peng, Bingyue},
  journal={arXiv preprint arXiv:2508.15761},
  year={2025}
}
```
