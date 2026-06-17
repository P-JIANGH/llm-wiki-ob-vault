# Index-1.9B

> Source: https://github.com/bilibili/Index-1.9B
> Date: 2026-04-23
> Type: AI Game DevTool - LLM

## Overview

Index-1.9B is a lightweight large language model series developed by Bilibili (哔哩哔哩), featuring 1.9 billion non-embedding parameters. The series includes multiple variants for different use cases, from base pre-training to chat, role-playing, and long-context processing.

## Model Variants

- **Index-1.9B base**: Base model with 1.9B non-embedding parameters, pre-trained on 2.8T mainly Chinese and English corpus
- **Index-1.9B pure**: Control version with same parameters but strictly filtered out all instruction-related data to verify impact of instructions on benchmarks
- **Index-1.9B chat**: Dialogue model aligned with SFT and DPO based on base model
- **Index-1.9B character**: Few-shots role-playing customization with RAG on top of SFT and DPO
- **Index-1.9B-32K**: Long-context model supporting 32K context length (can read documents over 35,000 words)

## Evaluation Results

| Model | Average score | MMLU | CEVAL | CMMLU | HellaSwag |
|-------|--------------|------|-------|-------|-----------|
| Index-1.9B | 64.92 | 52.53 | 57.01 | 52.79 | 80.69 |
| Qwen2-1.5B | 65.17 | 56.5 | 70.6 | 70.3 | 66.6 |
| MiniCPM-2.4B-SFT | 62.53 | 53.8 | 49.19 | 50.97 | 67.29 |
| Llama2-7B | 50.79 | 44.32 | 32.42 | 31.11 | 76 |

## Architecture & Training

- Pre-trained on 2.8T mainly Chinese and English corpus
- SFT + DPO alignment for chat models
- Continue Pre-Training + SFT for 32K long-context model
- Supports INT4 quantization via BitsAndBytes
- LoRA fine-tuning supported

## Key Features

1. **Lightweight**: Only 1.9B parameters but competitive with larger models
2. **Multilingual**: Strong multilingual capabilities, especially East Asian languages
3. **Role Playing**: Built-in RAG-based few-shots role-playing framework with character customization
4. **Long Context**: 32K context length variant for long document processing
5. **Quantization**: INT4 quantization support for reduced VRAM usage
6. **Community Ecosystem**: Adapted to llama.cpp, Ollama, and other inference frameworks

## Usage

### Transformers
```python
from transformers import AutoTokenizer, pipeline

tokenizer = AutoTokenizer.from_pretrained(model_path, trust_remote_code=True)
generator = pipeline("text-generation", model=model_path, tokenizer=tokenizer, 
                    trust_remote_code=True, device=device)
```

### Web Demo (Gradio)
```shell
python demo/web_demo.py --port='port' --model_path='/path/to/model/'
```

### OpenAI API Compatible Server (Flask)
```shell
python demo/openai_demo.py --model_path='/path/to/model/'
```

### Role Playing
- Built-in character "三三"
- Custom characters via CSV dialogue corpus and description
- RAG retrieval for in-context learning

## Fine-tuning

Requirements:
- torch >= 2.0.0
- transformers==4.39.2
- peft==0.10.0
- datasets==2.8.0

Training format:
```json
[
    {
        "system": "回答以下用户问题，仅输出答案。",
        "human": "1+1等于几?",
        "assistant": "2"
    }
]
```

## File Structure

```
demo/           # CLI demo, web demo (Gradio), OpenAI API demo, long text demo
evaluate/       # OpenCompass-based evaluation configs
finetune/       # LoRA fine-tuning scripts
roleplay/       # Role-playing framework with RAG retrieval
media/          # Documentation images
```

## License

- Source code: Apache-2.0
- Model weights: INDEX_MODEL_LICENSE (fully open for academic research, free commercial use)

## Extended Works

- libllm: https://github.com/ling0322/libllm
- chatllm.cpp: https://github.com/foldl/chatllm.cpp
- ollama: https://ollama.com/milkey/bilibili-index
