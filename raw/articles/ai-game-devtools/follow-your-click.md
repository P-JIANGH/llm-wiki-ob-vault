# Follow-Your-Click — Raw Source

**Source:** https://github.com/mayuelala/FollowYourClick
**Captured:** 2026-04-17
**Method:** web_extract (GitHub/gitcode/gitee clone all failed)

---

## Basic Info
- **Paper:** "Follow-Your-Click: Open-domain Regional Image Animation via Short Prompts"
- **Conference:** AAAI 2025
- **ArXiv:** 2403.08268
- **Authors:** Yue Ma*, Yingqing He*, Hongfa Wang*, Andong Wang, Chenyang Qi, Chengfei Cai, Xiu Li, Zhifeng Li, Heung-Yeung Shum, Wei Liu, Qifeng Chen
- **License:** Not specified in README

## Core Functionality
Open-domain regional image animation. Enables precise, localized motion control in static images using only short, intuitive text prompts — no complex instructions or dense motion masks needed.

### Demonstrated Prompts
"Tune the head", "Flap the wings", "Storm", "Smile", "Sad", "Launch", "Drift", "Dancing", "Drive back and forward"

## Repository Architecture
- `animatediff/` & `diffusers/` — Core diffusion pipelines & temporal animation modules
- `ip_adapter/` — Image-Prompt Adapter for visual conditioning & feature alignment
- `mmflow/` — Multi-modal optical flow estimation for motion tracking
- `Inpaint-Anything/` — Region-aware inpainting & background preservation utilities
- `brush_utils/` — Interactive masking/brush tools for precise regional selection
- `configs/`, `scripts/`, `download_bashscripts/` — Hyperparameter configurations, execution scripts, & automated asset downloads

## Related Research
Part of the "Follow" research family:
- Follow-Your-Pose (https://github.com/mayuelala/FollowYourPose) — Pose-Guided text-to-Video Generation

## Links
- Paper: https://arxiv.org/abs/2403.08268
- Project Page: https://follow-your-click.github.io/
- GitHub: https://github.com/mayuelala/FollowYourClick
