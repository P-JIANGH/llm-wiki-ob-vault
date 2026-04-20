# Bert-VITS2 — Source Capture

**Captured:** 2026-04-21
**Source:** https://github.com/fishaudio/Bert-VITS2 (web extract; GitHub/gitcode/gitee clone all failed)

## Project Overview
- **Repository:** fishaudio/Bert-VITS2
- **Core Architecture:** VITS2 backbone enhanced with multilingual BERT for high-quality text-to-speech (TTS) synthesis
- **Primary Language:** Python
- **Commits:** 683
- **Releases:** 12

## Maintenance Status
⚠️ **Short-term maintenance paused.** Developers recommend migrating to successor:
> FishAudio下的全新自回归TTS [Fish-Speech](https://github.com/fishaudio/fish-speech)现已可用，效果为目前开源SOTA水准，且在持续维护，推荐使用该项目作为BV2/GSV的替代。本项目短期内不再进行维护。

## Key Entry Points
- `webui.py` → Web-based interface
- `train_ms.py` → Multi-speaker training script
- `infer.py` → Standard inference
- `onnx_infer.py` / `export_onnx.py` → ONNX model export & deployment

## Core Architecture & File Structure

### Model & Training
- `models.py` — Core VITS2 model architecture
- `modules.py` — Neural network modules
- `train_ms.py` — Multi-speaker training pipeline
- `losses.py` — Loss functions (VITS loss components)

### Text & BERT
- `bert/` — Multilingual BERT models
- `text/` — Text normalization and preprocessing
- `bert_gen.py` — BERT feature generation
- `preprocess_text.py` — Text preprocessing pipeline

### Audio Processing
- `mel_processing.py` — Mel-spectrogram generation
- `spec_gen.py` — Spectrogram utilities
- `resample.py` — Audio resampling
- `slm/wavlm-base-plus/` — WavLM integration (speech language model)

### Inference & Deployment
- `infer.py` — Standard inference
- `onnx_infer.py` — ONNX inference
- `export_onnx.py` — ONNX model export
- `onnx_modules/` — ONNX model modules
- `compress_model.py` — Model compression

### UI & Tools
- `webui.py` — Web-based UI (Gradio)
- `webui_preprocess.py` — Preprocessing UI with step-by-step guidance
- `tools/` — Utility tools
- `hiyoriUI.py` — Hiyori-style UI

### Config & Data
- `configs/` — Hyperparameter configurations
- `default_config.yml` — Default configuration
- `filelists/` — Dataset file lists
- `data_utils.py` — Data loading utilities

## Inspiration
- Core inspiration: [anyvoiceai/MassTTS](https://github.com/anyvoiceai/MassTTS)

## Legal Restrictions
- 严禁将此项目用于一切违反《中华人民共和国宪法》，《中华人民共和国刑法》，《中华人民共和国治安管理处罚法》和《中华人民共和国民法典》之用途。
- 严禁用于任何政治相关用途。
