# Voicebox - PyTorch (Raw Source)

> Source: https://github.com/SpeechifyInc/Meta-voicebox
> Captured: 2026-04-21
> License: MIT

## Project Overview

Community implementation of Meta's **Voicebox**: Text-Guided Multilingual Universal Speech Generation at Scale.

Voicebox is the first generative AI model for speech to generalize across tasks with state-of-the-art performance.

## Key Architecture

- **Non-autoregressive flow-matching model** trained to infill speech, given audio context and text
- Trained on **50K+ hours** of speech (neither filtered nor enhanced)
- Uses **in-context learning** (similar to GPT), but can also condition on future context
- Performs multiple tasks: zero-shot TTS, noise removal, content editing, style conversion, diverse sample generation

## Performance Highlights

| Metric | Voicebox | VALL-E (SOTA) |
|--------|----------|---------------|
| Word Error Rate | 5.9% | 1.9% |
| Audio Similarity | 0.580 | 0.681 |
| Speed | Up to 20x faster | Baseline |

## Supported Tasks (per README Todo list)

- [ ] Training script for Voicebox
- [ ] Cross-lingual style transfer
- [ ] Zero-shot text-to-speech synthesis
- [ ] Transient noise removal and content editing
- [ ] Diverse speech sampling and alignment-preserved style shuffling

## Project Structure

```
voicebox/
├── images/          # Architecture diagrams
│   ├── diagram.png
│   └── diagram2.png
├── voicebox/        # Main module (empty __init__.py - work in progress)
│   └── __init__.py
├── LICENSE          # MIT License
└── README.md        # Project description and citations
```

## Authors (Original Paper)

Matthew Le, Apoorv Vyas, Bowen Shi, Brian Karrer, Leda Sari, Rashel Moritz, Mary Williamson, Vimal Manohar, Yossi Adi, Jay Mahadeokar, Wei-Ning Hsu (Meta AI / FAIR)

## Citation

```bibtex
@misc{voicebox2023,
  title={Voicebox: Text-Guided Multilingual Universal Speech Generation at Scale},
  author={Matthew Le et al.},
  year={2023},
  link={https://research.facebook.com/file/2441102929387057/VoiceBox_arXiv_6_6.pdf}
}
```

## Key Facts

- **Type**: Speech generation / TTS
- **Approach**: Flow-matching, non-autoregressive
- **Organization**: Meta AI (original), Speechify (this implementation)
- **License**: MIT
- **Status**: Work in progress (todo items indicate incomplete features)
- **Framework**: PyTorch
