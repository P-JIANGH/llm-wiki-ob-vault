# Magenta — AI Art & Music Generation Research Project

**Source:** https://github.com/magenta/magenta
**Mirror:** gitcode.com/magenta/magenta (GitHub clone failed, used mirror)
**Date:** 2026-04-21

## Overview

Magenta is a research project by Google Brain exploring the role of machine learning in the process of creating art and music. It develops new deep learning and reinforcement learning algorithms for generating songs, images, drawings, and other materials. It also builds smart tools and interfaces that allow artists and musicians to extend (not replace!) their processes using these models.

The repository is currently **archived (read-only)** and serves as a supplement to papers. Active development has transitioned to individual repositories under the Magenta GitHub Organization.

## Key Facts

| Aspect | Detail |
|--------|--------|
| **Organization** | Google Brain Team |
| **License** | Apache License 2.0 |
| **Language** | Python (TensorFlow) |
| **Status** | Archived (read-only) |
| **Website** | https://magenta.tensorflow.org |
| **Installation** | `pip install magenta` |

## Architecture

The Magenta codebase is organized into several model families:

### Music Models
- **MelodyRNN** — LSTM-based melody generation (basic/mono/lookback/attention configs)
- **DrumsRNN** — RNN-based drum pattern generation
- **MusicVAE** — Hierarchical recurrent VAE for music sequences (melodies, drums, trios)
- **GrooVAE** — MusicVAE variant for expressive drum performances
- **NSynth** — WaveNet-based autoencoder for neural audio synthesis (16kHz)
- **GANSynth** — GAN-based audio generation
- **Piano Genie** — Intelligent 8-button piano controller
- **PolyphonyRNN** — Polyphonic music generation
- **PerformanceRNN** — Expressive piano performance with velocity/timing
- **PianoRoll RNN-NADE** — Polyphonic piano roll modeling
- **ImprovRNN** — Real-time improvisation accompaniment
- **RL Tuner** — Reinforcement learning for music composition

### Image/Art Models
- **Arbitrary Image Stylization** — Style transfer with MobileNet distillation
- **Sketch RNN** — Recurrent neural network for sketch generation
- **Score2Perf** — Piano performance from score (music visualization)
- **SVG VAE** — SVG vector graphics generation via VAE

### Video Models
- **Next Frame Prediction** — Pix2Pix-based video frame prediction

### Tools & Interfaces
- **MIDI Interface** — Real-time MIDI interaction with models (`magenta_midi`)
- **MIDI Clock** — Synchronization tool
- **Colab Notebooks** — Interactive notebooks for all models
- **Magenta.js** — Browser-based TensorFlow.js versions

## Dependencies (from setup.py)

- TensorFlow 2.9.1
- dm-sonnet 2.0.0
- pretty_midi 0.2.9
- librosa 0.7.2
- mido 1.2.6 (MIDI library)
- python-rtmidi 1.1.2 (real-time MIDI)
- note-seq 0.0.3 (NoteSequence protocol buffers)
- mir_eval 0.7 (music evaluation)
- scikit-image 0.19.3
- matplotlib 3.5.2

## Console Scripts (CLI Tools)

The package provides ~40 console scripts including:
- `melody_rnn_generate`, `melody_rnn_train`
- `music_vae_generate`, `music_vae_train`
- `nsynth_generate`, `nsynth_save_embeddings`
- `arbitrary_image_stylization_*`
- `sketch_rnn_train`
- `onsets_frames_transcription_*` (piano transcription)

## Relevance to Game Development

Magenta provides several capabilities useful for game development:
1. **Procedural Music Generation** — MelodyRNN/MusicVAE can generate adaptive background music
2. **Sound Effect Synthesis** — NSynth can create unique sound effects by interpolating between instrument embeddings
3. **Interactive Music** — MIDI interface allows real-time AI accompaniment in music games
4. **Art Asset Generation** — SketchRNN and Image Stylization for procedural art
5. **Piano Transcription** — Onsets & Frames model for converting real piano recordings to MIDI for game audio

## Key Links

- Website: https://magenta.tensorflow.org
- Blog: https://magenta.tensorflow.org/blog
- Colab Notebooks: https://magenta.tensorflow.org/demos/colab/
- Magenta.js (browser): https://github.com/tensorflow/magenta-js
- Magenta GitHub Org: https://github.com/magenta
- Discussion Group: https://groups.google.com/a/tensorflow.org/forum/#!forum/magenta-discuss
- PyPI: https://pypi.python.org/pypi/magenta

## Notes

- The main `magenta` repository is archived; new projects live in separate repos under the Magenta org
- Magenta.js provides browser-compatible models via TensorFlow.js
- Ableton Live plugins are available for musicians
- Colab notebooks provide the easiest entry point for experimenting with models
