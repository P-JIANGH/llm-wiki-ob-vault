# Make-An-Audio 3 — Raw Source

**Source**: https://github.com/Text-to-Audio/Make-An-Audio-3
**Ingested**: 2026-04-20

## README Summary

Make-An-Audio 3: Transforming Text into Audio via Flow-based Large Diffusion Transformers.

PyTorch implementation of Lumina-t2x (arXiv 2405.05945) and Lumina-Next.

### Links
- arXiv: https://arxiv.org/abs/2305.18474
- HuggingFace: https://huggingface.co/spaces/AIGC-Audio/Make-An-Audio-3
- GitHub Stars badge present

### News Timeline
- May 2025: FlashAudio accepted by ACL 2025 Main
- Oct 2024: FlashAudio released
- Sept 2024: Lumina-Next accepted by NeurIPS'24
- July 2024: AudioLCM accepted by ACM-MM'24
- June 2024: Make-An-Audio 3 (Lumina-Next) released on GitHub and HuggingFace
- May 2024: AudioLCM released

### Install Dependencies
- Python 3.11
- PyTorch 2.1.0, torchvision 0.16.0, torchaudio 2.1.0, CUDA 12.1
- flash-attn (no-build-isolation)
- Optional: NVIDIA apex

### Pretrained Models
| Model | Params | Config | Data | Status |
|-------|--------|--------|------|--------|
| M | 160M | txt2audio-cfm-cfg | AudioCaption | Available on HF |
| L | 520M | / | AudioCaption | TBD |
| XL | 750M | txt2audio-cfm-cfg-XL | AudioCaption | Available on HF |
| XXL | - | txt2audio-cfm-cfg-XXL | AudioCaption | Available on HF |
| M | 160M | txt2music-cfm-cfg | Music | Available on HF |
| L | 520M | / | Music | TBD |
| XL | 750M | / | Music | TBD |
| 3B | - | / | Music | TBD |
| M | 160M | video2audio-cfm-cfg-moe | VGGSound | Available on HF |

### Usage Scripts
- `scripts/txt2audio_for_2cap_flow.py` — text-to-audio generation
- `scripts/video2audio_flow.py` — video-to-audio generation
- `scripts/video2audio_flow_inpaint.py` — video-to-audio inpainting
- `main.py` — training entry point (PyTorch Lightning)

### Training
```
python main.py --base configs/txt2audio-cfm-cfg.yaml -t --gpus 0,1,2,3,4,5,6,7
```
After training VAE, replace `model.params.first_stage_config.params.ckpt_path` with trained VAE checkpoint path.

### Key Dependencies (requirements.txt)
- torch, torchaudio, torchvision
- pytorch-lightning 1.7.0
- transformers 4.18.0
- librosa 0.9.2
- omegaconf, einops
- taming-transformers (CompVis)

### Architecture
- Core model: CFM (Conditional Flow Matching) extending LatentDiffusion_audio
- Uses NeuralODE (torchdyn) for ODE-based sampling (Euler solver, adjoint sensitivity)
- Vocoder: BigVGAN with alias-free torch activations
- Training via PyTorch Lightning with DDP support
- Config files: txt2audio-cfm-cfg.yaml, txt2audio-cfm-cfg-XL.yaml, txt2audio-cfm-cfg-XXL.yaml, txt2music-cfm-cfg.yaml, video2audio-cfm-cfg-moe.yaml

### Evaluation
- wav_evaluation/ directory with CLAP-based scoring
- Models: CLAPWrapper, audio encoder, CLAP model

### Citations
- Lumina-Next (arXiv 2406.18583) — NeurIPS 2024
- Make-An-Audio (arXiv 2301.12661)
- Lumina-T2X (arXiv 2405.05945)

### Acknowledgements
Code incorporates parts from: Make-An-Audio, AudioLCM, CLAP (LAION-AI)
