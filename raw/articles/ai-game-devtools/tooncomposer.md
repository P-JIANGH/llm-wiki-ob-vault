# ToonComposer — Source Capture

**URL:** https://github.com/TencentARC/ToonComposer
**Captured:** 2026-04-19
**Method:** web_extract (GitHub clone/gitcode/gitee all failed)

---

## README Content

### ToonComposer: Streamlining Cartoon Production with Generative Post-Keyframing

**Conference:** ICLR 2026
**Organization:** TencentARC
**Authors:** Lingen Li, Guangzhi Wang, Zhaoyang Zhang, Yaowei Li, Xiaoyu Li, Qi Dou, Jinwei Gu, Tianfan Xue, Ying Shan

**Official Resources:**
- Project Page: https://lg-li.github.io/project/tooncomposer
- Hugging Face Model: https://huggingface.co/TencentARC/ToonComposer
- Hugging Face Space Demo: https://huggingface.co/spaces/TencentARC/ToonComposer
- ArXiv Paper: https://arxiv.org/abs/2508.10881

### Core Concept
Traditional cartoon/anime production is time-consuming, requiring skilled artists for keyframing, inbetweening, and colorization. ToonComposer streamlines this with generative AI, turning hours of manual work of inbetweening and colorization into a single, seamless process.

### Setup & Configuration
```bash
git clone https://github.com/TencentARC/ToonComposer.git
cd ToonComposer
conda create -n tooncomposer python=3.10 -y
conda activate tooncomposer
pip install -r requirements.txt
```
- `gradio==5.25.2` is strictly required
- Performance optimization (Linux): `pip install flash_attn`
- Launch: `python app.py` → `http://localhost:7860`

### Weights & Checkpoints
Two model sets required (auto-download if missing):
- `Wan-AI/Wan2.1-I2V-14B-480P`
- `TencentARC/ToonComposer`

Optional local directory via env vars:
- `WAN21_I2V_DIR="/path/to/wan21"`
- `TOONCOMPOSER_DIR="/path/to/tooncomposer"`

### Hardware Requirements
- 480p video with 61 frames requires ~57GB VRAM
- Low-VRAM alternative: Hugging Face Spaces demo

### Usage & Limitations
- Resolution: 480p or 608p
- Device: cuda:0 (default) or cpu
- Generative outputs may vary — try changing seed, steps, CFG scale, pos-aware residual scale, or sketch/mask inputs

### Release Timeline
- 2025-08-15: Model weights released on Hugging Face
- 2025-08-18: Online Gradio demo on Hugging Face Spaces

### Citation
```bibtex
@article{li2025tooncomposer,
  title={ToonComposer: Streamlining Cartoon Production with Generative Post-Keyframing},
  author={Li, Lingen and Wang, Guangzhi and Zhang, Zhaoyang and Li, Yaowei and Li, Xiaoyu and Dou, Qi and Gu, Jinwei and Xue, Tianfan and Shan, Ying},
  journal={arXiv preprint 2508.10881},
  year={2025}
}
```

### License
Refer to LICENSE file in repository root.
