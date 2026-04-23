# IndexTTS / IndexTTS2 — GitHub Repository Summary

**IndexTTS** is an industrial-level, controllable, and efficient zero-shot text-to-speech system. The repository currently focuses on **IndexTTS2**, featuring emotionally expressive, duration-controlled autoregressive TTS.

---

## ⚠️ Critical Notices

> **The repository history has been reset. Please delete your local copy and re-clone.**
> （仓库历史已重置。请删除本地副本并重新克隆。）

> **Caution:** The **only official channel** maintained by the core team is `https://github.com/index-tts/index-tts`. ***Any other websites or services are not official***, and their security, accuracy, or timeliness cannot be guaranteed.

---

## IndexTTS2 Overview

- **Paper:** [arXiv:2506.21619](https://arxiv.org/abs/2506.21619)
- **Audio Demo:** [index-tts.github.io/index-tts2.github.io](https://index-tts.github.io/index-tts2.github.io/)
- **Video Demo:** [Bilibili BV136a9zqEk5](https://www.bilibili.com/video/BV136a9zqEk5)
- **Commercial Contact:** [indexspeech@bilibili.com](mailto:indexspeech@bilibili.com)

### Key Contributions
- **Duration Control for AR Models:** Introduces a general, autoregressive-friendly method with two modes:
  1. **Explicit token specification** for precise speech duration (critical for video dubbing and audio-visual sync).
  2. **Free autoregressive generation** that faithfully reproduces the prosodic features of the input prompt.
- **Emotion–Timbre Disentanglement:** Independently control **timbre** (via timbre prompt) and **emotion** (via style prompt) in zero-shot settings.
- **Enhanced Emotional Clarity:** Incorporates **GPT latent representations** and a novel **three-stage training paradigm** to improve stability in highly emotional expressions.
- **Soft Instruction Mechanism:** Uses a fine-tuned **Qwen3** model to guide emotional generation via natural text descriptions, lowering the barrier for emotional control.
- **State-of-the-Art Results:** Outperforms existing zero-shot TTS models on word error rate (WER), speaker similarity, and emotional fidelity.

---

## Model Downloads

| Model | HuggingFace | ModelScope |
|-------|-------------|------------|
| **IndexTTS-2** | [IndexTeam/IndexTTS-2](https://huggingface.co/IndexTeam/IndexTTS-2) | [IndexTeam/IndexTTS-2](https://modelscope.cn/models/IndexTeam/IndexTTS-2) |
| IndexTTS-1.5 | [IndexTeam/IndexTTS-1.5](https://huggingface.co/IndexTeam/IndexTTS-1.5) | [IndexTeam/IndexTTS-1.5](https://modelscope.cn/models/IndexTeam/IndexTTS-1.5) |
| IndexTTS | [IndexTeam/Index-TTS](https://huggingface.co/IndexTeam/Index-TTS) | [IndexTeam/Index-TTS](https://modelscope.cn/models/IndexTeam/Index-TTS) |

---

## Installation & Environment

> **Warning:** We **only** support the **`uv`** installation method. Using `conda` or `pip` will cause *random bugs, error messages, **missing GPU acceleration**, and various other problems*. **Do not report issues** if you use non-standard installations.

- `uv` is [up to 115x faster](https://github.com/astral-sh/uv/blob/main/BENCHMARKS.md) than `pip` and automatically creates a `.venv` project directory.
- **Git-LFS** must be enabled on your account.

### Setup Commands
```bash
# Automatically installs correct Python + dependencies into .venv
uv sync --all-extras
```

### Optional Extra Flags
- `--all-extras` — Installs all features (including DeepSpeed and WebUI)
- `--extra webui` — Web UI only
- `--extra deepspeed` — DeepSpeed acceleration only

### Platform-Specific Requirements
- **Windows:** DeepSpeed may be difficult to install. Skip it by removing `--all-extras` and using specific feature flags instead.
- **Linux/Windows:** If you encounter CUDA errors during installation, ensure you have installed NVIDIA's [CUDA Toolkit](https://developer.nvidia.com/cuda-toolkit) version **12.8** (or newer).

### Downloading Checkpoints
```bash
# Via HuggingFace
huggingface-cli download IndexTeam/IndexTTS-2 --local-dir ./checkpoints

# Via ModelScope
modelscope download IndexTeam/IndexTTS-2 --local-dir ./checkpoints
```

> **Tip:** If HuggingFace access is slow, export a local mirror before running code:
> ```bash
> export HF_ENDPOINT=https://hf-mirror.com
> ```

### GPU Environment Check
If you need to diagnose GPU detection, use the included utility:
```bash
uv run check_pytorch_gpu.py  # (or the included utility script)
```

---

## Usage

### 🌐 Web Demo
```bash
uv run webui.py
```
Then open your browser to **`http://127.0.0.1:7860`**.

**Performance Tips:**
- **FP16** (half-precision) inference is strongly recommended: it is faster, uses less VRAM, and has very small quality loss.
- **DeepSpeed** *may* speed up inference, but it can also slow things down depending on your specific hardware, drivers, and OS. Test with and without it.
- All `uv` commands **automatically activate** the correct per-project virtual environment. **Do not** manually activate `.venv` before running `uv` commands.

### 📝 Python API

> **Important:** You *must* use `uv run <file.py>` to ensure code runs inside the correct virtual environment.

**Basic inference example:**
```python
import torch
from indextts.infer import IndexTTS

# Load model
tts = IndexTTS(model_path="checkpoints", device="cuda")

# Synthesize with reference audio
tts.infer(text="Hello, this is a test.", prompt="reference.wav", output="output.wav")
```

**Zero-shot voice cloning:**
```python
# Simply provide a reference audio file; no fine-tuning required
tts.infer(text="任意中文或英文文本", prompt="speaker_sample.wav", output="cloned.wav")
```

**Duration control (IndexTTS2 feature):**
```python
# Explicit duration mode for precise audio-visual sync
tts.infer(text="Text to synthesize", prompt="ref.wav", output="out.wav", duration=5.0)
```

**Emotion control via soft instruction:**
```python
# Use natural language to guide emotional expression
tts.infer(text="I'm so excited about this!", prompt="ref.wav", output="out.wav", emotion="excited and energetic")
```

---

## Architecture & Technical Details

### Autoregressive TTS with Duration Control
IndexTTS2 is built on an autoregressive (AR) language modeling approach for speech synthesis, analogous to how GPT models generate text token-by-token. The key innovation is adding **duration controllability** to AR models without sacrificing naturalness:

1. **Token-level Duration Specification:** Users can specify exact durations, and the model generates the appropriate number of acoustic tokens.
2. **Free AR Generation:** When no duration is specified, the model autoregressively generates tokens until a natural stopping point, preserving the reference speaker's prosodic style.

### Emotion–Timbre Disentanglement
- **Timbre Prompt:** A short audio clip defining the speaker's voice characteristics.
- **Style/Emotion Prompt:** A separate conditioning signal (either audio or text via Qwen3) controlling emotional expression.
- This disentanglement allows mixing voices and emotions independently (e.g., "speak like Person A but sound sad").

### Three-Stage Training
1. **Pre-training:** Large-scale multilingual speech data for general acoustic modeling.
2. **Emotion Enhancement:** Fine-tuning with emotional data, incorporating GPT-derived latent representations for richer emotional expressiveness.
3. **Instruction Tuning:** Fine-tuning Qwen3 as an emotion descriptor to translate natural language emotion descriptions into model-compatible conditioning vectors.

### Model Variants
| Version | Key Features | Status |
|---------|--------------|--------|
| IndexTTS | Base zero-shot TTS | Released |
| IndexTTS-1.5 | Improved stability, more languages | Released |
| **IndexTTS-2** | Duration control, emotion disentanglement, soft instructions | **Latest** |

---

## Evaluation & Benchmarks

IndexTTS2 claims state-of-the-art performance on:
- **Word Error Rate (WER):** Lower than competing zero-shot TTS systems.
- **Speaker Similarity:** High cosine similarity to reference speakers in embedding space.
- **Emotional Fidelity:** Human-evaluated emotional naturalness and intensity.

Specific benchmark numbers are detailed in the [arXiv paper](https://arxiv.org/abs/2506.21619).

---

## License & Commercial Use

- The code and model weights are released for **research and personal use**.
- **Commercial licensing** is available via contact: [indexspeech@bilibili.com](mailto:indexspeech@bilibili.com).
- The repository is maintained by the **Bilibili Index Speech Team**.

---

## Related Links

- **GitHub:** https://github.com/index-tts/index-tts
- **Paper:** https://arxiv.org/abs/2506.21619
- **HuggingFace:** https://huggingface.co/IndexTeam/IndexTTS-2
- **ModelScope:** https://modelscope.cn/models/IndexTeam/IndexTTS-2
- **Audio Demo:** https://index-tts.github.io/index-tts2.github.io/
- **Video Demo:** https://www.bilibili.com/video/BV136a9zqEk5

---

## Key Files (inferred from README)

| File | Purpose |
|------|---------|
| `webui.py` | Gradio-based web interface |
| `indextts/infer.py` | Core inference API (`IndexTTS` class) |
| `check_pytorch_gpu.py` | GPU environment diagnostic |
| `pyproject.toml` | `uv`-based dependency management |

---

*Source: GitHub README extracted via web_extract (GitHub/gitcode/gitee clone all failed)*
*Extracted: 2026-04-24*
