# NVIDIA Cosmos — Raw Source

- **Source**: https://github.com/NVIDIA/Cosmos (deprecated, redirects to https://github.com/nvidia-cosmos)
- **Fetched**: 2026-04-13
- **Type**: World Foundation Model Platform

---

## README (Original Repo)

This repository has been deprecated and is no longer maintained. The new GitHub organization is https://github.com/nvidia-cosmos.

---

## NVIDIA Cosmos Platform (from https://github.com/nvidia-cosmos)

NVIDIA Cosmos™ is a platform purpose-built for physical AI, featuring state-of-the-art generative World Foundation Models (WFMs), robust guardrails, and an accelerated data processing and curation pipeline. Designed specifically for real-world systems, Cosmos enables developers to rapidly advance physical AI applications.

### Three Model Types

| Model | Type | Function | Use Cases | Inputs | Outputs |
|-------|------|----------|-----------|--------|---------|
| **Cosmos-Predict** | World Generation | Predict novel future frames given initial frames | Data Generation, Policy Evaluation | Text, Image, Video | Video |
| **Cosmos-Transfer** | Multi-Controlnet | Transfer existing control frames into photoreal frames | Data Augmentation | RGB, Depth, Segmentation, more | Video |
| **Cosmos-Reason** | Reasoning VLM | Reason against frames within video clip | Data Curation, Robot Planning, Vision AI Agents | Video, Image & Text | Text |

All three model types can be customized in post-training.

### Key Repositories

- **Cosmos-Predict2.5** — Latest WFM family, simulates and predicts future world states as video (1.1k stars)
- **Cosmos-Transfer2.5** — Produces high-quality world simulations from spatial control inputs (595 stars)
- **Cosmos-Reason2** — Understands physical common sense, generates embodied decisions via chain-of-thought reasoning (338 stars)
- **Cosmos-Cookbook** — Post-training scripts and samples for building/customizing/deploying Cosmos models (357 stars)
- **Cosmos-RL** — Flexible, scalable Reinforcement Learning framework for Physical AI applications
- **Cosmos-Curate** — Video curation system using advanced AI models and distributed computing

### Cosmos-Predict2.5 Details

- **Architecture**: Flow-based model unifying Text2World, Image2World, Video2World
- **Text Encoder**: Uses Cosmos-Reason1 (Physical AI reasoning VLM)
- **Model Sizes**: 2B and 14B parameters
- **Variants**: pre-trained, post-trained, distilled
- **Domain Specialization**: Autonomous vehicles (AV, 7-camera multiview), robotics (action-conditioned)
- **Paper**: https://arxiv.org/abs/2511.00062

### Primary Applications

- Autonomous Vehicles (AVs)
- Robotics
- Video Analytics AI Agents

### License

- Source Code: Apache 2.0
- Models: NVIDIA Open Model License

### Links

- Website: https://www.nvidia.com/en-us/ai/cosmos/
- HuggingFace: https://huggingface.co/collections/nvidia/cosmos-predict25-68bb63255f2fc206c5e5b346
- Cookbook: https://github.com/nvidia-cosmos/cosmos-cookbook
