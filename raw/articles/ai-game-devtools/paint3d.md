# Paint3D: Paint Anything 3D with Lighting-Less Texture Diffusion Models

Source: https://github.com/OpenTexture/Paint3D
Paper: https://arxiv.org/abs/2312.13913
Project Page: https://paint3d.github.io/

## README Summary

Paint3D is a novel coarse-to-fine generative framework capable of producing high-resolution, lighting-less, and diverse 2K UV texture maps for untextured 3D meshes conditioned on text or image inputs.

### Technical Architecture

**Coarse-to-Fine Two-Stage Pipeline:**

**Stage 1 — Depth-based Texturing (pipeline_paint3d_stage1.py):**
1. Init View Generation: Renders depth maps from mesh, uses ControlNet (txt2img) with depth condition to generate multi-view images
2. Forward Texturing: Back-projects generated views onto mesh UV space using differentiable rendering
3. View Inpainting: For incomplete areas, uses depth-aware inpainting ControlNet to fill missing regions
4. Iterative refinement across multiple view groups

**Stage 2 — UV-based Refinement (pipeline_paint3d_stage2.py):**
1. UV Inpainting: Uses custom UV Position ControlNet + inpainting to fix incomplete areas and remove lighting artifacts
2. UV Tile: Uses img2img ControlNet with dual conditions (UV position + albedo) to upscale to 2K resolution

### Key Modules

- `paint3d/models/textured_mesh.py`: TexturedMeshModel — differentiable mesh rendering, UV position map rendering, texture refresh
- `paint3d/trainer.py`: forward_texturing() (back-projection from views to UV), dr_eval() (differential rendering evaluation)
- `paint3d/dataset.py`: Multi-view camera parameter dataloader (theta/phi/radius)
- `controlnet/diffusers_cnet_*.py`: Three ControlNet wrappers (txt2img, inpaint, img2img)
- `paint3d/utils.py`: Image utilities, depth dilation, mask extraction, grid splitting
- `paint3d/post_process.py`: Post-processing utilities

### Key Technical Features

- **Lighting-less textures**: Generates albedo maps without embedded illumination, enabling re-lighting in graphics pipelines
- **UV Position ControlNet**: Custom ControlNet using UV coordinate position maps as conditioning (weights on HuggingFace: GeorgeQi/Paint3d_UVPos_Control)
- **Differentiable Rendering**: Uses kaolin for mesh rendering and texture back-projection
- **Multi-condition support**: Text prompts + IP-Adapter image conditioning
- **Model conversion**: Supports converting Civitai .safetensors checkpoints to diffusers format

### Dependencies

- PyTorch 1.12.1 + CUDA 11.6
- kaolin 0.13.0 (NVIDIA)
- Diffusers + ControlNet
- PyTorch3D, PyTorch Lightning

### License
Apache 2.0

### News
- 2024/11/05: Released MVPaint (successor with multi-view consistent texturing)
- 2024/09/26: MeshXL (NeurIPS 2024) uses Paint3D for mesh texturing
- 2024/04/26: Code released
- ComfyUI integration: ComfyUI-Paint3D-Nodes by N3rd00d

### Citation
Zeng et al., "Paint3d: Paint anything 3d with lighting-less texture diffusion models", CVPR 2024, pp. 4252-4262.
