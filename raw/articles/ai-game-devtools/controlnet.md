# ControlNet — Source Analysis

**Source:** https://github.com/lllyasviel/ControlNet
**Paper:** https://arxiv.org/abs/2302.05543 — "Adding Conditional Control to Text-to-Image Diffusion Models" (ICCV 2023)
**Author:** Lvmin Zhang, Anyi Rao, Maneesh Agrawala
**Analysis Date:** 2026-04-17

## README Summary

Official implementation of ControlNet, a neural network structure to control diffusion models by adding extra conditions.

### Core Architecture

ControlNet copies the weights of neural network blocks into a "locked" copy and a "trainable" copy:
- **Locked copy**: preserves the original pre-trained diffusion model weights
- **Trainable copy**: learns the conditional control signal
- **Zero convolution**: 1×1 convolution with both weight and bias initialized as zeros
  - Before training, all zero convolutions output zeros → no distortion
  - No layer trained from scratch → safe fine-tuning
  - Enables training on small datasets or personal devices

### Integration with Stable Diffusion

- ControlNet connects to SD encoder 14 times (once per block level)
- Original SD encoder doesn't need to store gradients → memory efficient
- GPU memory not much larger than original SD despite many added layers
- SD encoder serves as a "deep, strong, robust, and powerful backbone" for learning diverse controls

### Pretrained Models (9 types)

1. **Canny Edge** — gradio_canny2image.py
2. **M-LSD Lines** — gradio_hough2image.py (straight line detection)
3. **HED Boundary** — gradio_hed2image.py (soft boundary, good for recoloring/stylizing)
4. **Scribbles** — gradio_scribble2image.py + interactive version
5. **Fake Scribbles** — gradio_fake_scribble2image.py (auto-synthesized scribbles)
6. **Human Pose** — gradio_pose2image.py (OpenPose detection)
7. **Semantic Segmentation** — gradio_seg2image.py (ADE20K protocol, Uniformer detector)
8. **Depth Map** — gradio_depth2image.py (full 512×512 depth, vs SD2's 64×64)
9. **Normal Map** — gradio_normal2image.py (computed from MiDaS depth)
10. **Anime Line Drawing** — trained but not released (safety evaluation pending)

### Guess Mode / Non-Prompt Mode

- ControlNet encoder tries to recognize content of input control map without prompts
- Can generate images from edge maps, depth maps, scribbles with zero prompts
- Recommended: 50 steps, guidance scale 3-5
- Works in WebUI plugin (sd-webui-controlnet by Mikubill)

### Multi-ControlNet Composition

- Multiple ControlNets can be composed for multi-condition control
- Experimental support in Mikubill's A1111 WebUI plugin

### Transfer to Community Models

- ControlNet can be transferred to any SD1.x community model
- Manual steps documented; WebUI plugin is plug-and-play alternative

### Key Files

- `cldm/cldm.py` — Core implementation (435 lines)
  - `ControlledUnetModel(UNetModel)` — modified UNet that accepts control signals
  - `ControlNet(nn.Module)` — the control network with zero convolutions
  - `ControlLDM(LatentDiffusion)` — latent diffusion model with control stage
- `models/cldm_v15.yaml`, `models/cldm_v21.yaml` — model configs
- `ldm/modules/midas/` — MiDaS depth estimation module
- `tutorial_train.py` — training tutorial
- `tool_add_control.py` — add ControlNet to existing SD model
- `tool_transfer_control.py` — transfer ControlNet to community models
- 10+ Gradio demo scripts for different control types

### Dependencies (from environment.yaml)

- PyTorch 1.12.1, CUDA 11.3, Python 3.8
- Gradio, OpenCV, albumentations, transformers
- PyTorch-Lightning, einops, omegaconf
- safetensors, basicsr

### Related Resources

- Mikubill/sd-webui-controlnet — A1111 WebUI plugin
- haofanwang/ControlNet-for-Diffusers — HuggingFace Diffusers implementation
- T2I-Adapter — smaller model alternative for SD control
- ControlLoRA — LORA-based ControlNet implementation
- Composer — larger control model
