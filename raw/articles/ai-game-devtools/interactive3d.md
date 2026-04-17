# Interactive3D — Raw Source

> CVPR 2024 | https://github.com/interactive-3d/interactive3d
> Extracted: 2026-04-18 via web_extract (GitHub clone timed out; gitcode 403; gitee unavailable)

## Project Overview

**Interactive3D: Create What You Want by Interactive 3D Generation**

An interactive framework enabling users to iteratively generate, edit, and refine 3D assets through direct user input. Published at CVPR 2024.

## Authors

Shaocong Dong\*, Lihe Ding\*, Zhanpeng Huang, Zibin Wang, Tianfan Xue, Dan Xu
(\* denotes equal contribution)

## Key Resources

- **Paper:** https://arxiv.org/abs/2404.16510
- **Project Page:** https://interactive-3d.github.io/
- **Demo Video:** https://youtu.be/ZYSOonigv3s

## Repository Architecture

| Path / File | Purpose |
|:---|:---|
| `gsgen/` | Core 3D generation module |
| `threestudio/` | Integrated 3D generation framework (submodule/dependency) |
| `gradio_app.py` | Web-based interactive UI |
| `launch.py` | Main execution entry point |
| `keyboard.py` | Input handling for interactive controls |
| `configs/` | Model & pipeline configuration files |
| `docker/` | Containerization & environment setup |
| `requirements.txt` / `requirements-dev.txt` | Python dependencies |
| `DOCUMENTATION.md` | Extended usage & technical guides |

## Setup Notes

- Installation troubleshooting: refer to threestudio for some installation issues
- tmux users should export TERMINFO path: `export TERMINFO=/usr/share/terminfo`

## Key Characteristics

- **Interactive paradigm:** Unlike one-shot 3D generation, Interactive3D supports iterative refinement through user feedback
- **Built on threestudio:** Leverages the threestudio 3D generation framework as its backbone
- **Gradio UI:** Provides a web-based interface for interactive control via `gradio_app.py`
- **Keyboard input:** Custom keyboard handling for real-time interactive controls

## Citation

```bibtex
@article{dong2024interactive3d,
  title={Interactive3D: Create What You Want by Interactive 3D Generation},
  author={Dong, Shaocong and Ding, Lihe and Huang, Zhanpeng and Wang, Zibin and Xue, Tianfan and Xu, Dan},
  journal={arXiv preprint arXiv:2404.16510},
  year={2024}
}
```
