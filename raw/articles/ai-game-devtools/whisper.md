# Whisper

[[Blog]](https://openai.com/blog/whisper)
[[Paper]](https://arxiv.org/abs/2212.04356)
[[Model card]](https://github.com/openai/whisper/blob/main/model-card.md)

Whisper is a general-purpose speech recognition model. It is trained on a large dataset of diverse audio and is also a multitasking model that can perform multilingual speech recognition, speech translation, and language identification.

## Approach

A Transformer sequence-to-sequence model is trained on various speech processing tasks, including multilingual speech recognition, speech translation, spoken language identification, and voice activity detection. These tasks are jointly represented as a sequence of tokens to be predicted by the decoder, allowing a single model to replace many stages of a traditional speech-processing pipeline. The multitask training format uses a set of special tokens that serve as task specifiers or classification targets.

## Setup

We used Python 3.9.9 and PyTorch 1.10.1 to train and test our models, but the codebase is expected to be compatible with Python 3.8-3.11 and recent PyTorch versions. The codebase also depends on a few Python packages, most notably OpenAI's tiktoken for their fast tokenizer implementation.

```bash
pip install -U openai-whisper
```

Requires ffmpeg to be installed on the system. Also may need rust installed in case tiktoken does not provide a pre-built wheel.

## Available models and languages

Six model sizes, four with English-only versions:

|  Size  | Parameters | English-only model | Multilingual model | Required VRAM | Relative speed |
|:------:|:----------:|:------------------:|:------------------:|:-------------:|:--------------:|
|  tiny  |    39 M    |     tiny.en        |       tiny         |     ~1 GB     |      ~10x      |
|  base  |    74 M    |     base.en        |       base         |     ~1 GB     |      ~7x       |
| small  |   244 M    |     small.en       |      small         |     ~2 GB     |      ~4x       |
| medium |   769 M    |    medium.en       |      medium        |     ~5 GB     |      ~2x       |
| large  |   1550 M   |        N/A         |      large         |    ~10 GB     |       1x       |
| turbo  |   809 M    |        N/A         |      turbo         |     ~6 GB     |      ~8x       |

The turbo model is an optimized version of large-v3 that offers faster transcription speed with minimal degradation in accuracy.

## Command-line usage

```bash
whisper audio.flac audio.mp3 audio.wav --model turbo
```

For translation:
```bash
whisper japanese.wav --model medium --language Japanese --task translate
```

## Python usage

```python
import whisper

model = whisper.load_model("turbo")
result = model.transcribe("audio.mp3")
print(result["text"])
```

Internally, the `transcribe()` method reads the entire file and processes the audio with a sliding 30-second window, performing autoregressive sequence-to-sequence predictions on each window.

## License

Whisper's code and model weights are released under the MIT License.

---

## Source code structure (key files)

- `whisper/__init__.py` — Model loading, `_MODELS` registry, auto-download with SHA256 verification
- `whisper/model.py` — `Whisper` class: Transformer encoder-decoder, `ModelDimensions`, `MultiHeadAttention`, `AudioEncoder`, `TextDecoder`
- `whisper/transcribe.py` — `transcribe()` high-level API: sliding 30s window, temperature fallback, word timestamps, hallucination suppression
- `whisper/decoding.py` — `decode()`, `detect_language()`, `DecodingOptions`, greedy/beam/search algorithms
- `whisper/audio.py` — `load_audio()`, `log_mel_spectrogram()`, `pad_or_trim()`: mel-filterbank frontend (80/128 mels)
- `whisper/tokenizer.py` — Multilingual tokenizer, 99 languages, special task tokens (`<|startoftranscript|>`, `<|translate|>`, `<|transcribe|>`)
- `whisper/timing.py` — Dynamic Time Warping (DTW) for word-level timestamp alignment
- `pyproject.toml` — Package `openai-whisper`, Python 3.8+, dependencies: torch, tiktoken, numpy, numba, tqdm, more-itertools, triton (Linux x86_64)

## Architecture details

- **Type:** Transformer sequence-to-sequence (encoder-decoder)
- **Encoder:** AudioEncoder — 2 Conv1d layers (strided) + n_layer Transformer blocks with multi-head self-attention
- **Decoder:** TextDecoder — causal masked self-attention + cross-attention to encoder output
- **Input:** Log-mel spectrogram (80 or 128 mels), 30-second windows, 16kHz sample rate
- **Output:** Token sequence (multilingual text tokens + special task tokens)
- **Attention:** Uses PyTorch `scaled_dot_product_attention` (SDPA) when available for efficiency
- **Positional encoding:** Sinusoidal for audio encoder, learned for text decoder
