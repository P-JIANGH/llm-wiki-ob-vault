# YourTTS: Towards Zero-Shot Multi-Speaker TTS and Zero-Shot Voice Conversion for everyone

**Source:** https://github.com/Edresson/YourTTS  
**License:** CC BY-NC-ND 4.0 (checkpoints), Coqui TTS integration under MPL 2.0  
**Paper:** arXiv:2112.02418, ICML 2022  
**Authors:** Edresson Casanova, Julian Weber, Christopher Shulby, Arnaldo Candido Junior, Eren Gölge, Moacir Antonelli Ponti

## Overview

YourTTS is a multilingual zero-shot multi-speaker text-to-speech (TTS) and zero-shot voice conversion (VC) model. It builds upon the VITS architecture with novel modifications for zero-shot multi-speaker and multilingual training.

## Key Achievements

- State-of-the-art results in zero-shot multi-speaker TTS on VCTK dataset
- Comparable to SOTA in zero-shot voice conversion on VCTK
- Promising results in target languages with single-speaker datasets (low-resource language support)
- Fine-tuning possible with less than 1 minute of speech for state-of-the-art voice similarity

## Architecture

Based on **VITS** (Variational Inference with adversarial learning for end-to-end Text-to-Speech) with additions:
- Speaker encoder for zero-shot speaker adaptation
- Multilingual training approach
- Speaker Consistency Loss (SCL) — *note: implementation bug discovered in original paper, fixed in Coqui TTS v0.12.0+

## Implementation

All experiments implemented on the [Coqui TTS](https://github.com/coqui-ai/tts) repository. YourTTS is available as a pre-trained model in Coqui TTS:

```bash
tts --text "This is an example!" --model_name tts_models/multilingual/multi-dataset/your_tts --speaker_wav target_speaker_wav.wav --language_idx "en"
```

### Voice Conversion
```bash
tts --model_name tts_models/multilingual/multi-dataset/your_tts --speaker_wav target_speaker_wav.wav --reference_wav target_content_wav.wav --language_idx "en"
```

## Checkpoints

| Model | URL |
|-------|-----|
| Speaker Encoder | [Google Drive](https://drive.google.com/drive/folders/1WKK70aBnA-ZI2Z1Ka_zWgBK7O0Y3TLey?usp=sharing) |
| Exp 1. YourTTS-EN(VCTK) + SCL | [HuggingFace](https://huggingface.co/cshulby/YourTTS/blob/main/best_model_YourTTS_VCTK.pth) |

## Datasets Used

- VCTK (English multi-speaker)
- LibriTTS (English multi-speaker)
- MLS Portuguese (Portuguese single-speaker)

## Test Speakers

- LibriTTS (test clean): 1188, 1995, 260, 1284, 2300, 237, 908, 1580, 121, 1089
- VCTK: p261, p225, p294, p347, p238, p234, p248, p335, p245, p326, p302
- MLS Portuguese: 12710, 5677, 12249, 12287, 9351, 11995, 7925, 3050, 4367, 1306

## Erratum

Speaker Consistency Loss (SCL) gradient was not propagated during training in original experiments due to implementation mistake. Discovered by Tomáš Nekvinda and fixed in Coqui TTS PR #2364 (v0.12.0+).

## Citation

```bibtex
@inproceedings{casanova2022yourtts,
  title={Yourtts: Towards zero-shot multi-speaker tts and zero-shot voice conversion for everyone},
  author={Casanova, Edresson and Weber, Julian and Shulby, Christopher D and Junior, Arnaldo Candido and G{\"o}lge, Eren and Ponti, Moacir A},
  booktitle={International Conference on Machine Learning},
  pages={2709--2720},
  year={2022},
  organization={PMLR}
}
```

## Project Structure

```
YourTTS/
├── LICENSE              # CC BY-NC-ND 4.0
├── README.md            # Project documentation
├── metrics/
│   ├── MOS/             # Mean Opinion Score results
│   └── SECS/            # Speaker Encoder Cosine Similarity
```

## Colab Demos

- Zero-Shot TTS: [link](https://colab.research.google.com/drive/1WArisOG8vLGvrnoaLyEBOlJ0jG3LDtc2?usp=sharing)
- Zero-Shot VC: [link](https://colab.research.google.com/drive/1gjdwOKCZuavPn_5oy8QA01sKmXpEq5AZ?usp=sharing)
- Zero-Shot VC (VCTK only): [link](https://colab.research.google.com/drive/1r0NDBxxW5RZjQ1Jy99XohnY6thYWNBCd?usp=sharing)
