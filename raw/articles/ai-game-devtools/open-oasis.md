# Open-Oasis: Inference Script for Oasis 500M

**Source URL:** https://github.com/etched-ai/open-oasis
**Extracted:** 2026-04-16
**Source Method:** web_extract (GitHub/gitcode/gitee clone all failed)

---

## Key Facts & Architecture

- **Developers:** Joint project by [Decart](https://www.decart.ai/) and [Etched](https://www.etched.com/)
- **Core Architecture:** Diffusion Transformer (DiT)
- **Functionality:** Interactive world model that takes keyboard input and generates gameplay frames autoregressively
- **Release Scope:** Inference code + weights for Oasis 500M (a downscaled variant)
- **Output Format:** Action-conditional video generation (`video.mp4`)

🔗 **Official Resources:** [Joint Blog Post](https://oasis-model.github.io/) | [Live Demo](https://oasis.us.decart.ai/)

---

## Installation & Setup

```bash
git clone https://github.com/etched-ai/open-oasis.git
cd open-oasis

# Install PyTorch (CUDA 12.1)
pip install torch torchvision --index-url https://download.pytorch.org/whl/cu121

# Install additional dependencies
pip install einops diffusers timm av
```

## Model Weights Download

```bash
huggingface-cli login
huggingface-cli download Etched/oasis-500m oasis500m.safetensors  # DiT checkpoint
huggingface-cli download Etched/oasis-500m vit-l-20.safetensors   # ViT VAE checkpoint
```

## Inference & Usage

The `generate.py` script loads a prompt frame and generates subsequent frames conditioned on user actions.

```bash
python generate.py
python generate.py --oasis-ckpt <path to oasis500m.safetensors> --vae-ckpt <path to vit-l-20.safetensors>
python generate.py --prompt-path <path to .png, .jpg, or .jpeg>
```

Resulting video is automatically saved to `video.mp4`.

---

## Repository Structure

| File / Directory | Purpose |
|---|---|
| `generate.py` | Main inference script for action-conditional frame generation |
| `dit.py` | Diffusion Transformer model implementation |
| `vae.py` | Vision Transformer (ViT) VAE implementation |
| `attention.py` | Custom attention mechanism logic |
| `rotary_embedding_torch.py` | Rotary positional embeddings |
| `utils.py` | Helper functions & utilities |
| `media/` | Architecture diagrams & sample generation GIFs |
| `sample_data/` | Example input data for testing |

## Technical Notes

- **Framework Stack:** PyTorch, `diffusers`, `einops`, `timm`, `av`
- **Input Modalities:** Image prompts (.png/.jpg/.jpeg) + discrete keyboard actions
- **Generation Style:** Autoregressive, action-conditional video synthesis
- **Version Control:** 49 commits tracked in repository history
