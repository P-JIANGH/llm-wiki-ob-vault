# GeneAvatar — Raw Source

**Source:** https://github.com/zju3dv/GeneAvatar  
**Project Page:** https://zju3dv.github.io/geneavatar/  
**Paper:** https://drive.google.com/file/d/101Djfy5r66D6EeXBeafwTMKjRtInGG2k/view?usp=sharing  
**Video:** https://www.youtube.com/watch?v=4zfbfPivtVU  
**Conference:** CVPR 2024

## Authors
Chong Bao, Yinda Zhang (Co-Authors), Yuan Li (Co-Authors), Xiyu Zhang, Bangbang Yang, Hujun Bao, Marc Pollefeys, Guofeng Zhang, Zhaopeng Cui (‡)

**Institution:** Zhejiang University (ZJU3DV), ETH Zurich

## README Content

GeneAvatar: Generic Expression-Aware Volumetric Head Avatar Editing from a Single Image

### To-do (as of crawl date)
- [ ] Release evaluation code, pre-trained models and editing cases.
- [ ] Release training code.

**Note:** Code is not yet fully released. README is minimal.

## Project Page Summary

### Core Concept
GeneAvatar is a **generic, expression-aware framework** that lifts 2D edits (from a single rendered image) to full 3D volumetric head avatars. It guarantees **multi-view consistency** and **expression-aware fidelity** across different camera viewpoints and facial expressions.

### Architecture & Key Techniques
The system uses an **expression-aware generative model** that accepts a modification latent code z_{g/t} and 3DMM coefficients to output a **tri-plane modification field**. This field alters the template avatar by:
- **Geometry:** Deforming volume rendering sample points x
- **Texture:** Blending original color c_o with modification color c_Δ

**2D-to-3D Lifting:** Achieved via **auto-decoding optimization** on a single edited image to synthesize novel views across varying expressions.

**Stabilization & Supervision Mechanisms:**
- Cyclic constraints with a proxy mesh: Facilitates geometric supervision
- Color compositing mechanism: Stabilizes semantic-driven texture editing
- Feature-cluster-based regularization: Preserves irrelevant/unedited content unchanged

### Usage Pipeline
1. **Capture:** Record a selfie video.
2. **Build:** Generate a personalized volumetric avatar using a 3DMM-based method.
3. **Edit 2D:** Modify a single rendered frame using standard 2D tools (drag-style GAN, text-driven prompts, Photoshop, or pattern painting).
4. **Lift to 3D:** Apply GeneAvatar to propagate the 2D edit across the entire 3D avatar.

### Integration
Integrating GeneAvatar into a custom volumetric avatar representation requires:
1. **Initialization:** `geneavatar = GeneAvatar(model_path)`
2. **Volume Rendering Pipeline Modifications:**
   - Deform sample points: `sample_points = sample_points + genavatar.forward_geo(vertices_3DMM, sample_points)`
   - Color blending: `color = genavatar.forward_color(vertices_3DMM, sample_points, template_color)`
3. **Auto-Decoding Optimization:** Perform optimization on a single-edited image to lift 2D editing effect to 3D avatar.

### Supported Representations & Editing Types
| Category | Supported Representations | Editing Types |
|:---|:---|:---|
| Geometry | INSTA, NeRFBlendShape, Next3D | Jaw/face/forehead scaling, structural reshaping |
| Texture | INSTA, NeRFBlendShape, Next3D | Text-driven, pattern painting, makeup |
| Hybrid | All | Simultaneous geometry + texture modification |
| Animation | All | Face reenactment with expression-consistent rendering |

### Citation
```bibtex
@inproceedings{bao2024geneavatar,
    title={GeneAvatar: Generic Expression-Aware Volumetric Head Avatar Editing from a Single Image},
    author={Bao, Chong and Zhang, Yinda and Li, Yuan and Zhang, Xiyu and Yang, Bangbang and Bao, Hujun and Pollefeys, Marc and Zhang, Guofeng and Cui, Zhaopeng},
    booktitle={The IEEE/CVF Computer Vision and Pattern Recognition Conference (CVPR)},
    year={2024}
}
```
