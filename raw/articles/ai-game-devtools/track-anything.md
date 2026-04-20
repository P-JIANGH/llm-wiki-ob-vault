# Track-Anything — Raw Source

- URL: https://github.com/gaomingqi/Track-Anything
- ArXiv: https://arxiv.org/abs/2304.11968
- Cloned via: gitcode.com mirror (GitHub timed out)
- Date: 2026-04-20

## README Summary

Track-Anything is a flexible and interactive tool for video object tracking and segmentation. It is developed upon Segment Anything (SAM), can specify anything to track and segment via user clicks only. During tracking, users can flexibly change the objects they wanna track or correct the region of interest if there are any ambiguities.

**Use cases:**
- Video object tracking and segmentation with shot changes
- Visualized development and data annotation for video object tracking and segmentation
- Object-centric downstream video tasks, such as video inpainting and editing

**Key updates:**
- 2023/05/02: Tutorials in steps
- 2023/04/29: Improved inpainting by decoupling GPU memory usage and video length
- 2023/04/25: Related project Caption-Anything announced
- 2023/04/20: Hugging Face demo deployed
- 2023/04/14: Public release

**Dependencies (based on acknowledgements):**
- Segment Anything (SAM) — Facebook Research
- XMem — HK Cheng Rex (video object segmentation)
- E2FGVI — MCG-NKU (video inpainting)

**Citation:**
```
@misc{yang2023track,
  title={Track Anything: Segment Anything Meets Videos},
  author={Jinyu Yang and Mingqi Gao and Zhe Li and Shang Gao and Fangjing Wang and Feng Zheng},
  year={2023},
  eprint={2304.11968},
  archivePrefix={arXiv},
  primaryClass={cs.CV}
}
```

## Key Architecture (from source code)

### Core Module: `track_anything.py`
- `TrackingAnything` class integrates three models:
  - `SamControler` (SAM-based segmentation from `tools/interact_tools.py`)
  - `BaseTracker` (XMem-based tracking from `tracker/base_tracker.py`)
  - `BaseInpainter` (E2FGVI-based inpainting from `inpainter/base_inpainter.py`)
- CLI args: `--device`, `--sam_model_type` (vit_h/vit_l/vit_b), `--port`, `--debug`, `--mask_save`
- Main method: `generator(images, template_mask)` — propagates template mask through video frames via XMem

### Gradio Demo: `app.py`
- Full interactive web UI with Gradio
- Pipeline: Upload video → extract frames → SAM click segmentation → XMem tracking → E2FGVI inpainting
- Supports multi-mask tracking (multiple objects simultaneously)
- Memory monitoring (stops extraction if RAM > 90%)
- Auto-downloads checkpoints: SAM (vit_h/l/b), XMem-s012, E2FGVI-HQ
- Video output via torchvision.io.write_video (libx264)

### Key Submodules:
- `tracker/` — XMem wrapper: `base_tracker.py` + `config/`, `inference/`, `model/`, `util/`
- `inpainter/` — E2FGVI wrapper: `base_inpainter.py` + `config/`, `model/`, `util/`
- `tools/` — SAM utilities: `base_segmenter.py`, `interact_tools.py`, `mask_painter.py`, `painter.py`

### Dependencies (requirements.txt):
progressbar2, gdown, gitpython, py-thin-plate-spline, hickle, tensorboard, numpy, segment-anything (git), gradio, opencv-python, matplotlib, pyyaml, av, openmim, tqdm, psutil

## License
MIT License — Copyright (c) 2023 Mingqi Gao (SUSTech VIP Lab)
