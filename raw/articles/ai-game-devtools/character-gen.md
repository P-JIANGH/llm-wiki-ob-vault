# CharacterGen — Raw Source

**Source:** https://github.com/zjp-shadow/CharacterGen
**Extracted:** 2026-04-18
**Method:** web_extract (GitHub/gitcode/gitee clone all failed — network timeout)

---

# 📦 CharacterGen: Efficient 3D Character Generation
**SIGGRAPH'24 (TOG)** | [Project Page](https://charactergen.github.io/) | [Gradio Demo](https://huggingface.co/spaces/VAST-AI/CharacterGen)

> *"Efficient 3D Character Generation from Single Images with Multi-View Pose Canonicalization"*

## Repository Structure
| Directory/File | Purpose |
|---|---|
| `2D_Stage/` | Multi-view image generation pipeline |
| `3D_Stage/` | 3D mesh/character reconstruction |
| `render_script/` | Blender & three-vrm rendering utilities |
| `materials/` | Teaser images, input/output examples, GIFs |
| `webui.py` | Gradio web interface |
| `requirements.txt` | Python dependencies |
| `remap_mixamo.bmap` | Mixamo rig mapping configuration |

## Quick Start & Installation
**Environment Setup:**
```bash
python3.9
pip install -r requirements.txt
```

**Model Weights:**
- Automatically downloaded when running the pipeline script.
- Manual alternative: Use `huggingface-cli` to fetch weights.
- *Fallback:* If downloads fail, clone the full repository and move weights to the correct directories manually.

## Pipeline Execution
The codebase supports modular execution:
- **Full Pipeline:** Runs end-to-end (2D → 3D generation)
- **2D Stage Only:** Generates canonical multi-view images from a single input
- **3D Stage Only:** Reconstructs 3D character from pre-generated multi-view inputs

## Anime3D Dataset & Rendering Scripts
⚠️ **Policy Note:** Raw VRM-format 3D character data cannot be redistributed. Download the dataset following [PAniC-3D](https://github.com/ShuhongChen/panic3d-anime-reconstruction) instructions, then use the provided rendering scripts.

### Blender Method
1. Install Blender + VRM Addon
2. Render VRM files and export as OBJ under FBX animations
3. **A-Pose Toggle:** The last input argument controls output:
   - `True` → Outputs standardized A-pose
   - `False` → Outputs the specific frame/action from the FBX

### three-vrm Method (Recommended)
> *"Much quicker than blender VRM add-on."*
1. Install Node.js for npm environment
2. Replace default `three-vrm` with the author's custom version for depth-map rendering
3. **Backend:** Start server (default port `17070`), update folder paths as needed
4. **Frontend:** Open `http://localhost:5173/`
   - Uses 2 rendering threads
   - Estimated render time: ~1 day

## Results & Architecture
**Pipeline Flow:** `Single Input Image` → `2D Multi-View Images` → `3D Character`
- Demonstrated with high-fidelity anime-style character generation
- Outputs include textured 3D meshes viewable via `threestudio`

## Acknowledgements & Dependencies
**Core Foundations:**
- Built upon **[Tune-A-Video](https://github.com/showlab/Tune-A-Video)** and **[TripoSR](https://github.com/VAST-AI-Research/TripoSR)**
- Rendering scripts adapted from **[three-vrm](https://github.com/pixiv/three-vrm)** & **[VRM-Addon-for-Blender](https://github.com/saturday06/VRM-Addon-for-Blender)**

**Related Release:**
- Authors also open-sourced **[UniRig](https://github.com/VAST-AI-Research/UniRig)** for automated character rigging.

## Citation
SIGGRAPH'24 (TOG) publication.
