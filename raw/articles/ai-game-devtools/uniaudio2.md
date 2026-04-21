# UniAudio 2.0

**Source:** https://github.com/yangdongchao/UniAudio2  
**License:** MIT  
**Authors:** Dongchao Yang, Yuanyuan Wang, Dading Chong, Songxiang Liu, Xixin Wu, Helen Meng  
**Paper:** arXiv:2602.04683 (2026)  
**Demo:** https://dongchaoyang.top/UniAudio2Demo/  
**Checkpoints:** https://huggingface.co/Dongchao/UniAudio2_ckpt

---

## Overview

UniAudio 2.0 is a unified audio foundation model for speech, sound, and music. It uses **ReasoningCodec** (discrete audio codec with reasoning tokens and reconstruction tokens) and a unified autoregressive architecture trained on **100B text tokens** and **60B audio tokens**.

## Key Features

- **ReasoningCodec**: discrete audio codec with reasoning tokens and reconstruction tokens
- Unified autoregressive model over text and audio
- Multi-stage training and multi-task data
- Strong in-domain and few-shot/zero-shot performance

## Architecture

- **Backbone:** LLaMA 3.2 (text tokenizer: llama3_2_tokenizer)
- **Audio Tokenizer:** ReasoningCodec with two versions:
  - Codebook size = 1024 (for reconstruction comparisons)
  - Codebook size = 8192 (reasoning branch = 4096) — recommended for LLM
- **Model type:** Causal multi-scale audio language model
- **Text/audio masking:** Uses mask tokens to handle mixed text-audio sequences; text positions set to 0 in audio sequences and vice versa

## Supported Tasks

### Speech
- TTS (English / Chinese / Cantonese)
- Audio-Instructed TTS
- InstructTTS
- ASR
- Dysarthric Speech Recognition
- Speech-to-Speech Q&A
- Speech-to-Text Q&A

### Sound
- Text-to-Sound
- Audio Caption
- Audio Question Answering

### Music
- Song Generation (English / Chinese)
- Song Recognition
- Text-to-Music Generation
- Music Question Answering

## Project Structure

```
UniAudio2/
├── multi_task_inference.py      # Main inference script for all tasks
├── llm_models/
│   ├── model_new.py             # Core model (LLaMA3_2 backbone + audio adapters)
│   ├── mllm_model.py            # Multimodal LLM wrapper
│   ├── lit_model.py             # Lit-GPT based implementation
│   ├── config.py                # Model configurations
│   └── semantic_decoder.py      # FiLM-based semantic decoder
├── llm_modules/
│   ├── transformer.py           # Transformer layers
│   ├── transformer_lora.py      # LoRA-adapted transformer
│   ├── seanet.py                # SEANet encoder/decoder
│   ├── conv.py                  # Convolution modules
│   ├── streaming.py             # Streaming inference support
│   └── rope.py                  # RoPE positional encoding
├── llm_utils/
│   ├── task_definition.py       # Task format definitions (25+ tasks)
│   ├── train_utils.py           # Training utilities
│   ├── arguments.py             # CLI argument parsing
│   └── sampling.py              # Sampling strategies
├── evaluation/                  # Task-specific evaluation scripts
├── metrics/                     # Evaluation metrics
├── tools/
│   ├── tokenizer/               # ReasoningCodec + text tokenizer
│   └── data_scripts/            # Data preprocessing
├── prompts/
│   └── audio_tasks_prompts.json # Prompt templates per task
├── readme.md
├── pyproject.toml
└── test.sh
```

## Dependencies

- Python >= 3.9 (recommended 3.10)
- PyTorch 2.4.1 + torchaudio + torchvision
- torchtune 0.4.0
- transformers 4.57.0
- vector-quantize-pytorch
- modelscope
- diffusers >= 0.25.0
- fairseq (install from source)
- Various audio/libs: soundfile, librosa, nnAudio, kaldiio

## Inference

All tasks run through `multi_task_inference.py`:

```bash
# ASR (audio -> text)
python multi_task_inference.py --task ASR --audio sample.wav --prompt_text "Transcribe..."

# TTS (text -> audio)
python multi_task_inference.py --task TTS --text "Hello world" --stage all --prompt_text "Convert..."

# Text-to-Music
python multi_task_inference.py --task TTM --text "A classical waltz..."
```

Stages:
- `--stage all`: LLM token generation + codec decode to wav
- `--stage 1`: Save reason/semantic tokens only
- `--stage 2`: Decode existing semantic tokens to wav

## Citation

```bibtex
@article{uniaudio2,
  title={UniAudio 2.0: A Unified Audio Language Model with Text-Aligned Factorized Audio Tokenization},
  author={Dongchao Yang, Yuanyuan Wang, Dading Chong, Songxiang Liu, Xixin Wu, Helen Meng},
  year={2026}
}
```

## Notes

- The model does NOT use text instruction data for training, so instruction understanding may be limited.
- For better song generation, refer to HeartMula (30s limitation in UniAudio 2.0).
- Supports pre-tokenized `.pt` files for faster repeated inference.
