# Design2Code

> Source: https://github.com/NoviScl/Design2Code
> Paper: https://arxiv.org/abs/2403.03163
> Dataset: https://huggingface.co/datasets/SALT-NLP/Design2Code-hf
> Model: https://huggingface.co/SALT-NLP/Design2Code-18B-v0
> Project Page: https://salt-nlp.github.io/Design2Code/

## Overview

Design2Code is a benchmark and model from Stanford SALT Lab for automating front-end engineering — given a visual design screenshot, generate the corresponding HTML/CSS code implementation.

## Key Components

1. **Design2Code Benchmark** — 484 real-world webpages from C4 dataset, with paired screenshots and HTML code
2. **Design2Code-Hard** — 80 extra difficult test cases from GitHub Pages, designed to challenge state-of-the-art VLMs
3. **Design2Code-18B** — Finetuned CogAgent-18B model for code generation from screenshots
4. **Automatic Evaluation Suite** — Multi-metric evaluation: Block-Match, Text, Position, Color, CLIP similarity

## Architecture

- Base model: CogAgent-18B (CogVLM family)
- Finetuning: LoRA on Design2Code benchmark
- Evaluation: Playwright screenshot rendering + CLIP score comparison
- Multimodal prompting: Supports GPT-4V, Gemini Pro Vision, Claude 3.5

## Key Files

```
Design2Code/
├── prompting/         # GPT-4V, Gemini, Claude prompting scripts
├── metrics/           # Multi-metric evaluation (multi_processing_eval.py)
├── data_utils/       # Screenshot capture, data cleaning, filtering
├── CogVLM/           # Finetuned Design2Code-18B model code
│   ├── finetune_demo/inference_design2code.py
│   └── finetune_demo/finetune_cogagent_lora_design2code.sh
└── setup.py
```

## Evaluation Metrics

| Metric | Description |
|--------|-------------|
| Block-Match | HTML element structure matching |
| Text | Text content accuracy |
| Position | Element positioning accuracy |
| Color | Color similarity |
| CLIP | Visual similarity score |

## License

Research use only. Benchmark built on C4 (ODC-Attribution License).

## Related

- [[ai-game-devtools/cogvlm2|CogVLM2]] — parent multimodal model architecture
- [[ai-game-devtools/chrome-gpt|Chrome-GPT]] — browser automation for web tasks
