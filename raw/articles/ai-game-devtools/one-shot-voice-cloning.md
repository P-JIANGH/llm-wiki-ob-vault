# Unet-TTS: Improving Unseen Speaker and Style Transfer in One-shot Voice Cloning

**Source:** https://github.com/CMsmartvoice/One-Shot-Voice-Cloning
**Paper:** https://arxiv.org/abs/2109.11115
**Demo:** https://cmsmartvoice.github.io/Unet-TTS/
**Colab:** https://colab.research.google.com/drive/1sEDvKTJCY7uosb7TvTqwyUdwNPiv3pBW
**Cloned:** 2026-04-21 to ~/tmp/ai-game-devtools/one-shot-voice-cloning/

## Project Overview
Unet-TTS is a one-shot voice cloning system that uses a U-Net network architecture with AdaIN (Adaptive Instance Normalization) layers to achieve powerful speaker and style transfer capabilities. The model can clone any speaker's voice from a single reference audio sample without requiring manual duration statistics input.

## Key Features
- **One-shot voice cloning**: Only needs one reference speech sample to clone a voice
- **Automatic duration estimation**: Style Encoder automatically estimates phoneme duration statistics from reference audio, no manual input needed
- **Style transfer**: Powerful speaker and style transfer via U-Net + AdaIN architecture
- **Chinese-focused**: Designed for Mandarin Chinese phoneme-level synthesis
- **Neutral emotion training**: Model trained only on neutral emotion corpus, making emotional style transfer an out-of-domain challenge

## Architecture

### Three-Model Pipeline

1. **Duration Predictor** (TFUNETTSDuration)
   - FastSpeech-style encoder + duration predictor
   - Input: character IDs + 4-dim duration statistics (initial_mean, initial_std, vowel_mean, vowel_std)
   - Output: per-phoneme duration predictions scaled by reference speech statistics
   - Uses Dense layer with NonNeg constraint to compute duration stats

2. **Acoustic Model** (Unet-TTS)
   - Core innovation: AdaIN Encoder + AdaIN Decoder with U-Net skip connections
   - Style Encoder extracts speaker/style embedding from reference mel spectrogram
   - AdaIN (Adaptive Instance Normalization) transfers speaker characteristics
   - Conditional decoder with cross-attention to reference mel features
   - FastSpeech-style length regulator + postnet

3. **Vocoder** (MultiBand-MelGAN)
   - Mel spectrogram → waveform conversion
   - TensorFlowTTS Mb_MelGAN implementation
   - 16kHz output, PCM_16 format

### AdaIN Architecture Details
- **AadINEncoder**: ConvModul blocks (Conv1D → BatchNorm → ReLU → Conv1D) with residual connections
- **AdaINDecoder**: Dual-path conv blocks (dec_conv + gen_conv) with residual connections
- **MaskInstanceNormalization**: Conditional instance normalization for style transfer

## Tech Stack
- **Framework**: TensorFlow 2.6 + tensorflow-addons 0.14.0
- **Language**: Python
- **OS**: Linux only
- **Based on**: TensorFlowTTS (TensorSpeech/TensorFlowTTS fork)
- **Pre-trained models**: duration4k.h5, acous12k.h5, vocoder800k.h5

## Project Structure
```
One-Shot-Voice-Cloning/
├── UnetTTS_syn.py           # Main inference class + CLI
├── TensorFlowTTS/            # Forked TensorFlowTTS library with Unet-TTS modules
│   └── tensorflow_tts/
│       ├── models/
│       │   ├── unetts.py     # Unet-TTS model definition
│       │   └── moduls/
│       │       ├── adain_en_de_code.py  # AdaIN encoder/decoder
│       │       └── core.py/core2.py     # FastSpeech base components
│       ├── configs/unetts.py # Model configuration
│       └── processor/multispk_voiceclone.py  # Chinese phoneme processor
├── train/
│   ├── configs/              # YAML configs (duration, acoustic, vocoder, preprocess)
│   └── train_*.py            # Training scripts
├── models/                   # Pre-trained model weights
└── test_wavs/                # Reference audio samples (neutral/happy/surprise/angry/sad)
```

## Usage
```python
from UnetTTS_syn import UnetTTS
from tensorflow_tts.audio_process import preprocess_wav

models_and_params = {
    "duration_param": "train/configs/unetts_duration.yaml",
    "duration_model": "models/duration4k.h5",
    "acous_param": "train/configs/unetts_acous.yaml",
    "acous_model": "models/acous12k.h5",
    "vocoder_param": "train/configs/multiband_melgan.yaml",
    "vocoder_model": "models/vocoder800k.h5"
}

Tts_handel = UnetTTS(models_and_params, "models/unetts_mapper.json", "train/configs/unetts_preprocess.yaml")
ref_audio = preprocess_wav("reference.wav", source_sr=16000, normalize=True, trim_silence=True)
syn_audio, mel_pred, mel_src = Tts_handel.one_shot_TTS("一句话#3风格迁移#3语音合成系统", ref_audio)
```

## License
MIT License

## Notes
- Training corpus uses only neutral emotion speech; emotional style transfer is challenging
- Out-of-domain style transfer (to unseen speaking styles) remains difficult
- Duration statistics: [initial_mean, initial_std, vowel_mean, vowel_std] represent Chinese Pinyin phoneme timing
- Frame shift is 200 samples for duration prediction
- Text preprocessing: punctuation must be removed, #3 marks used as pause indicators
