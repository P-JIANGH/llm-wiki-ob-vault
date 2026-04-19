# SadTalker — Audio-Driven Talking Face Animation

**Source:** https://github.com/Winfredy/SadTalker
**Captured:** 2026-04-19

## Overview

SadTalker is a CVPR 2023 audio-driven single image talking face animation system by Xi'an Jiaotong University, Tencent AI Lab, and Ant Group. TL;DR: single portrait image + audio = talking head video.

## Architecture

The pipeline consists of four main stages:

1. **CropAndExtract (Preprocessing):** Face detection, cropping, and 3DMM (3D Morphable Model) coefficient extraction from the source image
2. **Audio2Coeff (Audio-to-Coefficient):** Converts audio features into 3DMM expression/pose coefficients using:
   - `audio2exp_models`: Expression prediction network
   - `audio2pose_models`: Pose VAE (Variational Autoencoder)
3. **AnimateFromCoeff (Rendering):** Face rendering using face-vid2vid model (neural talking head synthesis)
4. **Face Enhancement:** Optional GFPGAN/Real-ESRGAN face enhancement for higher quality output

## Key Technical Details

- **3DMM based:** Uses 3D Morphable Model coefficients for facial expression and pose control
- **Reference-driven:** Supports reference videos for eye blinking and pose control
- **Still mode:** `--still` flag for natural full-body/portrait animation
- **Preprocessing modes:** crop, resize, full (for full-body images)
- **Enhancers:** GFPGAN or RestoreFormer for face quality improvement

## Source Structure

```
src/
├── audio2exp_models/    # Expression prediction from audio
├── audio2pose_models/   # Pose VAE model
├── config/              # BFM 3DMM config, model paths
├── face3d/              # 3D face reconstruction
├── facerender/          # Face rendering pipeline
├── utils/               # Preprocessing, path init
├── test_audio2coeff.py  # Audio-to-coefficient module
├── generate_batch.py    # Batch data generation
└── generate_facerender_batch.py  # Face render batch data
```

## Dependencies

- Python 3.8+, PyTorch 1.12+ CUDA
- FFmpeg (video processing)
- Key libraries: numpy, face_alignment, librosa, scipy, kornia, yacs, scikit-image, basicsr, facexlib, gradio, gfpgan, safetensors
- Optional: Coqui TTS for Gradio demo text-to-speech

## Deployment Options

- **Gradio WebUI:** Local Gradio demo (`app_sadtalker.py`), `webui.sh`/`webui.bat`
- **Replicate:** Cloud inference via replicate.com
- **Hugging Face Spaces:** Online demo
- **Stable Diffusion WebUI extension:** A1111 plugin integration
- **Colab:** Quick demo notebooks available
- **Discord bot:** Free usage via Discord server

## CLI Usage

```bash
python inference.py --driven_audio <audio.wav> \
                    --source_image <video.mp4 or picture.png> \
                    --enhancer gfpgan

# Full body mode
python inference.py --driven_audio <audio.wav> \
                    --source_image <picture.png> \
                    --still --preprocess full --enhancer gfpgan
```

## Model Files

- `mapping_00229-model.pth.tar` — Pre-trained MappingNet (256 face render)
- `mapping_00109-model.pth.tar` — Pre-trained MappingNet (512 face render)
- `SadTalker_V0.0.2_256.safetensors` — 256px face checkpoints
- `SadTalker_V0.0.2_512.safetensors` — 512px face checkpoints
- GFPGAN weights — Face detection and enhancement

## License

Apache 2.0 (previously had non-commercial restriction, later removed)

## Related Projects Mentioned

- Wav2Lip (lip-sync model used internally)
- Deep3DFaceReconstruction (3DMM extractor)
- face-vid2vid (neural talking head synthesis base)
- GFPGAN (face enhancement)
- Real-ESRGAN (image/video enhancement)
- facexlib (face utilities)
