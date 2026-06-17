# DiffSinger: Singing Voice Synthesis via Shallow Diffusion Mechanism

**Source:** https://github.com/MoonInTheRiver/DiffSinger
**Paper:** https://arxiv.org/abs/2105.02446 (AAAI-2022)
**Analyzed:** 2026-04-21

## Overview

DiffSinger is the official PyTorch implementation of the AAAI-2022 paper proposing DiffSinger for Singing Voice Synthesis (SVS) and DiffSpeech for Text-to-Speech (TTS). The core innovation is the **shallow diffusion mechanism**, which accelerates diffusion-based synthesis while maintaining high quality.

## Key Features

- **Shallow Diffusion Mechanism**: Uses fewer denoising steps than full diffusion, significantly speeding up inference
- **Dual Purpose**: Supports both SVS (Singing Voice Synthesis) and TTS (Text-to-Speech)
- **MIDI Integration**: Accepts MIDI pitch input for controllable singing voice generation
- **PNDM Plugin**: Supports PNDM (Pseudo Numerical methods for Diffusion Models) acceleration from ICLR 2022
- **Interactive Demo**: Available on HuggingFace for both SVS and TTS

## Architecture

### Pipeline Variants

| Pipeline | Dataset | Pitch Input | F0 Prediction | Acceleration | Vocoder |
|----------|---------|-------------|---------------|--------------|---------|
| DiffSpeech (TTS) | Ljspeech | None | Explicit | Shallow Diffusion | HiFiGAN |
| DiffSinger (PopCS) | PopCS | Ground-Truth F0 | None | Shallow Diffusion | NSF-HiFiGAN |
| DiffSinger (OpenCpop Cascade) | OpenCpop | MIDI | Explicit | Shallow Diffusion | NSF-HiFiGAN |
| FFT-Singer | OpenCpop | MIDI | Explicit | None | NSF-HiFiGAN |
| DiffSinger E2E | OpenCpop | MIDI | Implicit | None | Pitch-Extractor + NSF-HiFiGAN |
| DiffSinger+PNDM | OpenCpop | MIDI | Implicit | PLMS | Pitch-Extractor + NSF-HiFiGAN |

### Key Modules

- **modules/fastspeech/**: FastSpeech2-based encoder/decoder backbone
  - `fs2.py`: FastSpeech2 model implementation
  - `tts_modules.py`: TTS-specific modules (DurationPredictor, PitchPredictor, EnergyPredictor)
  - `pe.py`: PitchExtractor module
- **modules/diffsinger_midi/**: MIDI-integrated variant
  - `fs2.py`: FastSpeech2MIDI with FastspeechMIDIEncoder (adds MIDI pitch, duration, slur embeddings)
- **modules/hifigan/**: HiFiGAN vocoder implementation
- **modules/parallel_wavegan/**: ParallelWaveGAN layers (residual blocks, upsampling, PQMF)
- **usr/diff/shallow_diffusion_tts.py**: Core GaussianDiffusion implementation (the shallow diffusion mechanism)
- **tasks/tts/**: Training tasks (TTS pipeline, FastSpeech2 task, Pitch Extraction task)

### Inference Pipeline

- **inference/svs/ds_e2e.py**: End-to-end SVS inference (Lyric+MIDI→Mel→Wav)
- **inference/svs/ds_cascade.py**: Cascade SVS inference (Lyric+MIDI→F0, Lyric+F0→Mel, Mel→Wav)
- **inference/svs/base_svs_infer.py**: Base SVS inference class
- **inference/svs/gradio/infer.py**: Gradio-based interactive inference

### Data Pipeline

- **data_gen/**: Data generation scripts for preprocessing
- **datasets/**: Dataset loaders for PopCS and OpenCpop datasets

## Technical Details

- **Framework**: PyTorch + PyTorch Lightning
- **Key Dependencies**: librosa, tensorboard, praat-parselmouth, pretty-midi, einops, g2pM (Chinese g2p)
- **GPU Support**: Separate requirements for RTX 2080Ti (CUDA 10.2) and RTX 3090 (CUDA 11.4)
- **Languages**: Chinese (primary, with g2pM pinyin support), English (via g2p_en)

## Datasets

- **PopCS**: Custom pop song dataset released with this project
- **OpenCpop**: Open-source Chinese pop singing dataset (wenet.org.cn/opencpop/)
- **LJSpeech**: Standard English TTS dataset (for DiffSpeech variant)

## License

Not explicitly stated in README. Standard academic/research use.

## Related Projects

- **NeuralSVB** (https://github.com/MoonInTheRiver/NeuralSVB): Singing voice beautifying, ACL-2022
- **NATSpeech** (https://github.com/NATSpeech/NATSpeech): Improved code framework containing DiffSpeech and PortaSpeech (NeurIPS-2021)
- **DiffSinger (OpenVPI)** (https://github.com/openvpi/DiffSinger): Community-maintained fork by Team OpenVPI

## Citation

```
@article{liu2021diffsinger,
  title={Diffsinger: Singing voice synthesis via shallow diffusion mechanism},
  author={Liu, Jinglin and Li, Chengxi and Ren, Yi and Chen, Feiyang and Liu, Peng and Zhao, Zhou},
  journal={arXiv preprint arXiv:2105.02446},
  year={2021}
}
```
