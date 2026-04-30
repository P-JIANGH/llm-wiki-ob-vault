---
title: BLIP-2
created: 2026-04-27
updated: 2026-04-27
type: entity
tags: [ai, multimodal, vision, vlm, open-source]
sources: []
---

# BLIP-2

[[vision-language-models]] | [[multimodal-models]]

## Overview

BLIP-2 (Bootstrapped Language-Image Pre-training 2) is a multimodal vision-language model from Salesforce Research. It uses a lightweight Q-Former to bridge a frozen vision encoder with a frozen LLM, dramatically reducing training compute.

## Key Innovations

- **Q-Former**: Learned transformer that extracts visual features relevant to text
- **Frozen modality alignment**: Vision encoder and LLM stay frozen during training
- **Strong zero-shot**: Competitive zero-shot performance on VQAv2, OK-VQA

## Relationship to Other Projects

- Preceded [[InstructBLIP]] and inspired [[MiniGPT-4]]
- Related to [[LLaVA]] and [[CogVLM]] in the efficient VLM space

## References

- Paper: https://arxiv.org/abs/2301.12597
- GitHub: https://github.com/salesforce/BLIP
