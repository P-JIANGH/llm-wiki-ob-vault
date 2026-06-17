# Animate-A-Story: Storytelling with Retrieval-Augmented Video Generation

> **Source:** GitHub (VideoCrafter/Animate-A-Story) — web extract; GitHub/gitee clone all failed
> **URL:** https://github.com/VideoCrafter/Animate-A-Story
> **Actual org:** AILab-CVC
> **Project page:** https://AILab-CVC.github.io/Animate-A-Story
> **Paper:** arXiv:2307.06940
> **Date extracted:** 2026-04-20

## Authors

Yingqing He*, Menghan Xia*, Haoxin Chen*, Xiaodong Cun, Yuan Gong, Jinbo Xing, Yong Zhang, Xintao Wang, Chao Weng, Ying Shan, Qifeng Chen
(* equal contribution, # corresponding author)

## Abstract (from paper)

**Animate-A-Story** is a video storytelling approach which can synthesize high-quality, structure-controlled, and character-controlled videos.

Generating videos for visual storytelling can be a tedious and complex process that typically requires either live-action filming or graphics animation rendering.
To bypass these challenges, our key idea is to utilize the abundance of existing video clips and synthesize a coherent storytelling video by customizing their appearances.

## Framework (Two Functional Modules)

### 1. Motion Structure Retrieval
- Provides video candidates with desired scene or motion context described by query texts
- Leverages an off-the-shelf video retrieval system
- Extracts video depths as motion structure

### 2. Structure-Guided Text-to-Video Synthesis
- Generates plot-aligned videos under the guidance of motion structure and text prompts
- Controllable video generation model offering flexible controls over structure and characters
- Videos synthesized by following structural guidance and appearance instruction

### 3. Concept Personalization (for character consistency)
- Effective concept personalization approach for visual consistency across clips
- Allows specification of desired character identities through text prompts

## Demo Videos

- Yann Lecun's Journey in China
- A Day of a Teddy Bear
- Duck Kingdom
- The Boy's Quest for Treasure

All demos available at: https://AILab-CVC.github.io/Animate-A-Story/

## BibTeX

```bib
@article{he2023animate,
title={Animate-a-story: Storytelling with retrieval-augmented video generation},
author={He, Yingqing and Xia, Menghan and Chen, Haoxin and Cun, Xiaodong and Gong, Yuan and Xing, Jinbo and Zhang, Yong and Wang, Xintao and Weng, Chao and Shan, Ying and others},
journal={arXiv preprint arXiv:2307.06940},
year={2023}
}
```

## Contact

- Yingqing He: yhebm@connect.ust.hk
- Menghan Xia: menghanxyz@gmail.com
- Haoxin Chen: jszxchx@126.com
