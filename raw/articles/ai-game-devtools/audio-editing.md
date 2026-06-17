# AudioEditing — Zero-Shot Unsupervised and Text-Based Audio Editing Using DDPM Inversion

**Source:** https://github.com/HilaManor/AudioEditingCode
**Paper:** ICML 2024 — "Zero-Shot Unsupervised and Text-Based Audio Editing Using DDPM Inversion"
**Authors:** Hila Manor, Tomer Michaeli
**Archived Date:** 2026-04-20

---

## README Content

### Project Description
Official code release for Zero-Shot Unsupervised and Text-Based Audio Editing Using DDPM Inversion (ICML 2024).

### Key Links
- [Project page](https://HilaManor.github.io/AudioEditing)
- [Arxiv](https://arxiv.org/abs/2402.10009)
- [Text-Based Space (HuggingFace)](https://huggingface.co/spaces/hilamanor/audioEditing)
- [PMLR Proceedings](https://proceedings.mlr.press/v235/manor24a.html)

### Supported Models
- **AudioLDM** (cvssp/audioldm-s-full-v2, cvssp/audioldm-l-full)
- **AudioLDM2** (cvssp/audioldm2, cvssp/audioldm2-large, cvssp/audioldm2-music)
- **TANGO** (declare-lab/tango-full-ft-audio-music-caps, declare-lab/tango-full-ft-audiocaps)
- **Stable Audio Open 1.0** (stabilityai/stable-audio-open-1.0) — added 2024-10-12
- **Stable Diffusion** (for unsupervised image editing)
- **CelebAHQ LDM** (for unsupervised face image editing)

### Three Editing Modes

#### 1. Text-Based Editing
Input audio + target text prompt → edited audio matching the prompt description.
Uses DDPM inversion: forward process encodes source audio, reverse process generates with target prompt.
Key parameters: `--cfg_src` (source CFG), `--cfg_tar` (target CFG), `--tstart` (edit strength, default 100).

#### 2. Unsupervised Editing
Two-phase process:
- **Phase 1 (PC Extract):** Extract Principal Components (PCs) from DDPM inversion trajectory at specified timesteps
- **Phase 2 (PC Apply):** Apply extracted PCs with configurable drift strength to generate edited output
No text prompt needed — edits are driven by the statistical structure of the diffusion trajectory.

#### 3. SDEdit
Standard SDEdit: add noise at tstart timestep, then denoise with target prompt.
Simpler baseline compared to the full DDPM inversion approach.

### Architecture

```
code/
├── main_run.py                    # Text-based editing entry point
├── main_run_sdedit.py             # SDEdit entry point
├── main_pc_extract_inv.py         # Unsupervised: PC extraction
├── main_pc_apply_drift.py         # Unsupervised: PC application
├── pc_drift.py                    # PC drift utilities
├── models.py                      # Pipeline wrapper classes (1374 lines)
│   ├── PipelineWrapper            # Base class for all model wrappers
│   ├── TangoWrapper               # TANGO model adapter
│   ├── AudioLDMWrapper            # AudioLDM model adapter
│   ├── AudioLDM2Wrapper           # AudioLDM2 model adapter
│   ├── StableAudioWrapper         # Stable Audio Open adapter
│   └── StableDiffusionWrapper     # Image model adapter
├── ddm_inversion/
│   ├── inversion_utils.py         # Forward/reverse inversion process
│   └── ddim_inversion.py          # DDIM inversion implementation
├── audioldm/                      # AudioLDM internals (VAE, LDM, CLAP)
├── utils.py                       # Audio loading, spectrogram utils
├── images_*.py                    # Image editing equivalents
└── evals/                         # Evaluation tools (LPAPS, CLAP, FAD)
```

### Core Technical Approach

**DDPM Inversion Pipeline:**
1. **Forward Process:** Encode source audio x₀ through diffusion trajectory, extracting noise residuals zₜ at each timestep
2. **Reverse Process:** From noisy state x_T, denoise using target prompt while reusing extracted zₜ for reconstruction fidelity
3. **tstart Control:** Controls how much of the original signal is preserved (higher = less editing, default 100/200)

**Classifier-Free Guidance:** Multi-prompt CFG allows spatially-segmented editing — different text prompts control different frequency bands of the audio via Gaussian-blurred cutoff points.

### MedleyMDPrompts Dataset
Manually labeled prompts for MusicDelta subset of MedleyDB (34 musical excerpts, 20s–5min):
- 107 source prompts + 696 target prompts
- 3-4 source prompts per signal, 3-12 editing targets per source
- `can_be_used_without_source` flag indicates standalone usability

### Dependencies
- PyTorch >= 2.2.0, torchaudio, diffusers >= 0.30 (for Stable Audio)
- transformers, librosa==0.9.2, soundfile, scipy
- torchsde (for SDE-based diffusion)

### Licensing
- **AudioLDM2 weights:** CC BY-SA 4.0
- **Stable Audio Open weights:** Stability AI Community License
- **Inversion/PC code:** MIT
- **MedleyMDPrompts dataset:** CC-BY-4.0

### Change Log
- **2024-10-12:** Added Stable Audio Open 1.0 support
- **2024-09-09:** Added CelebAHQ LDM wrapper, moved to PyTorch >= 2.2
