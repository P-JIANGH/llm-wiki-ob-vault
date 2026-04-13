# Hunyuan-MT — Tencent Translation Model

> Source: https://github.com/Tencent-Hunyuan/Hunyuan-MT
> Fetched: 2026-04-13
> Technical Report: https://www.arxiv.org/pdf/2509.05209

## Project Overview

**Hunyuan-MT** is Tencent's open-source machine translation model series, led by the Hunyuan team. It comprises:
- **Hunyuan-MT-7B**: 7B base translation model
- **Hunyuan-MT-Chimera-7B**: Ensemble model that integrates multiple translation outputs into higher quality

Supports **33 languages** including 5 Chinese ethnic minority languages (Tibetan, Uyghur, Mongolian, Cantonese, Kazakh).

## Key Files

- `inference/run_server.sh` — BF16 inference server launch
- `inference/run_server_int8.sh` — INT8 quantized inference
- `inference/run_server_fp8.sh` — FP8 quantized inference
- `inference/run_openapi.py` — OpenAI-compatible API server
- `finetune/finetune.py` — LoRA fine-tuning entry point
- `train/llama_factory_support/` — LLaMA-Factory integration configs
- `requirements.txt` — transformers==4.56.0, accelerate==0.33.0, flash_attn==2.0.2

## Architecture

- Base: Transformer decoder (Llama-style), 7B parameters
- Training pipeline: pretrain → CPT → SFT → translation RL → ensemble RL
- Ensemble: Hunyuan-MT-Chimera takes 6 translation variants and synthesizes a refined result
- Quantization: FP8 static, INT8, INT4 (via AngelSlim)
- Deployment: TensorRT-LLM, vLLM (≥v0.10.0), SGLang

## Performance

- **WMT25 competition**: 1st place in 30/31 language categories
- Industry-leading among 7B-scale translation models
- Inference params: `top_k=20, top_p=0.6, temperature=0.7, repetition_penalty=1.05`

## Supported Languages

Chinese (zh), English (en), French (fr), Portuguese (pt), Spanish (es), Japanese (ja), Turkish (tr), Russian (ru), Arabic (ar), Korean (ko), Thai (th), Italian (it), German (de), Vietnamese (vi), Malay (ms), Indonesian (id), Filipino (tl), Hindi (hi), Traditional Chinese (zh-Hant), Polish (pl), Czech (cs), Dutch (nl), Khmer (km), Burmese (my), Persian (fa), Gujarati (gu), Urdu (ur), Telugu (te), Marathi (mr), Hebrew (he), Bengali (bn), Tamil (ta), Ukrainian (uk), Tibetan (bo), Kazakh (kk), Mongolian (mn), Uyghur (ug), Cantonese (yue)

## License

License.txt (in repo — check for specific terms; HuggingFace model card for usage terms)
