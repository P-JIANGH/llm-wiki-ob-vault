# LLaSM: Large Language and Speech Model

Source: https://github.com/LinkSoul-AI/LLaSM

## Overview

开源、可商用的中英文双语语音-语言助手 LLaSM，以及中英文语音 SFT 数据集 LLaSM-Audio-Instructions。第一个支持中英文语音-文本多模态对话的开源可商用对话模型。

## Model Variants

- **LLaSM-Chinese-Llama-2-7B**: 基于 Chinese-Llama-2-7b 基座
- **LLaSM-Baichuan-7B**: 基于 Baichuan-7B 基座

## Architecture

```
Audio Input (16kHz) → Whisper-large-v2 (audio encoder) → 64 audio tokens
                                                    ↓
                                       mm_projector (Linear 1280→hidden_size)
                                                    ↓
                    ← special tokens: <au_patch>/<au_start>/<au_end> →
LLM (Chinese-Llama-2-7B or Baichuan-7B) → Text Output
```

### Key Components

- **Audio Tower**: Whisper-large-v2（冻结，torch.float16）
- **LLM Backbone**: Chinese-Llama-2-7B 或 Baichuan-7B（可选）
- **Projection**: nn.Linear(1280, hidden_size)，连接 Whisper 特征与 LLM 词嵌入空间
- **Special Tokens**: `<au_patch>`（audio patch token）、`<au_start>`、`<au_end>`
- **Audio Token Length**: 64 tokens per audio segment

### Core Files

- `llasm.py`: 模型定义——`LlaaaConfig`（LlamaConfig 子类）、`LlaaaLlamaModel`（含音频处理 forward）、`LlaaaLlamaForCausalLM`
- `infer.py`: 推理脚本——音频加载（librosa 16kHz）→ Whisper 特征提取 → tokenize → model.generate(audios=audio_feat)
- `infer_tokenize.py`: 对话格式 tokenizer
- `pyproject.toml`: 依赖——transformers==4.31.0, torch, librosa, accelerate, sentencepiece

## Inference

```python
# 环境变量指定设备
export LLASM_DEVICE="cuda:0"

python infer.py \
    --input_audio_file PATH/TO/AUDIO \
    --llasm_model PATH/TO/LLaSM/MODEL \
    --llasm_audio_tower PATH/TO/WHISPER/MODEL \
    --llm_type "Chinese_llama2" or "baichuan"
```

## Resources

- HuggingFace 模型: [LLaSM-Cllama2](https://huggingface.co/LinkSoul/LLaSM-Cllama2), [LLaSM-Baichuan](https://huggingface.co/LinkSoul/LLaSM-Baichuan)
- 数据集: [LLaSM-Audio-Instructions](https://huggingface.co/datasets/LinkSoul/LLaSM-Audio-Instructions)
- 论文: arXiv https://arxiv.org/abs/2308.15930
- Demo: HuggingFace Spaces https://huggingface.co/spaces/LinkSoul/LLaSM

## License

Apache-2.0（可商用）

## TODO

- 训练方法文档
- int4 量化
- Docker 部署
