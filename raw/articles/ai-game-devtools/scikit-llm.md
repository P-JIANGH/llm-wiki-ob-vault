# Scikit-LLM: Scikit-Learn Meets Large Language Models

> Source: https://github.com/iryna-kondr/scikit-llm
> Captured: 2026-04-17

## Overview

Scikit-LLM seamlessly integrates powerful language models like ChatGPT into scikit-learn for enhanced text analysis tasks. It provides a scikit-learn compatible API (`fit`/`predict`/`transform`) for LLM-powered NLP operations.

## Quick Start

```python
from skllm.datasets import get_classification_dataset
from skllm.config import SKLLMConfig
from skllm.models.gpt.classification.zero_shot import ZeroShotGPTClassifier

SKLLMConfig.set_openai_key("<YOUR_KEY>")
SKLLMConfig.set_openai_org("<YOUR_ORGANIZATION_ID>")

X, y = get_classification_dataset()
clf = ZeroShotGPTClassifier(model="gpt-4")
clf.fit(X, y)
clf.predict(X)
```

## Architecture

Organized by provider (GPT, Vertex, Anthropic) and task type:

```
skllm/
├── models/
│   ├── _base/          # Base classes for all models
│   │   ├── classifier.py
│   │   ├── text2text.py
│   │   ├── vectorizer.py
│   │   └── tagger.py
│   ├── gpt/            # OpenAI provider
│   │   ├── classification/ (zero_shot, few_shot, tunable)
│   │   ├── text2text/ (summarization, translation, tunable)
│   │   ├── tagging/ (NER)
│   │   └── vectorization.py
│   ├── vertex/         # Google Vertex AI provider
│   │   ├── classification/
│   │   └── text2text/
│   └── anthropic/      # Anthropic Claude provider
│       ├── classification/
│       ├── text2text/
│       └── tagging/
├── prompts/            # Prompt templates and builders
├── datasets/           # Sample datasets for demos
├── config.py           # API key/configuration management
├── classification.py   # Top-level classification API
├── text2text.py        # Top-level text2text API
├── vectorization.py    # Top-level vectorization API
├── model_constants.py  # Model name constants
└── memory/             # Memory modules (Annoy-based)
```

## Key Features

1. **Zero-shot classification** — classify text without training data using LLM prompting
2. **Few-shot classification** — provide examples for better classification
3. **Tunable classification** — fine-tune classifiers with custom training data
4. **Text summarization** — GPT/Claude-powered summarization
5. **Text translation** — LLM-based translation between languages
6. **Named Entity Recognition (NER)** — extract entities from text
7. **Vectorization** — LLM-powered text embeddings for similarity search

## Supported Providers

- **OpenAI (GPT)** — full feature set (classification, text2text, tagging, vectorization)
- **Google Vertex AI** — classification + text2text
- **Anthropic (Claude)** — classification, text2text, NER tagging

## Dependencies

- scikit-learn >= 1.1.0
- pandas >= 1.5.0
- openai >= 1.2.0
- google-cloud-aiplatform >= 1.27.0
- tqdm >= 4.60.0

Optional: llama-cpp-python (GGUF local models), annoy (vector search)

## Technical Details

- **Version:** 1.4.3
- **License:** MIT
- **Python:** >= 3.9
- **Authors:** Oleh Kostromin, Iryna Kondrashchenko (beastbyte.ai)
- **Code quality:** Ruff (pycodestyle, pydocstyle, flake8-bandit), Black, mypy, isort, docformatter

## Design Pattern

Scikit-LLM follows the scikit-learn estimator pattern: all models inherit from sklearn base classes, implementing `fit(X, y)` and `predict(X)` or `transform(X)`. This allows seamless integration into existing sklearn pipelines:

```python
from sklearn.pipeline import Pipeline
from skllm.models.gpt.classification.zero_shot import ZeroShotGPTClassifier

pipeline = Pipeline([
    ('classifier', ZeroShotGPTClassifier(model="gpt-4"))
])
```

## Relevance to AI Game Development

Can be used for:
- NPC dialog classification (intent recognition)
- Player feedback sentiment analysis
- In-game text summarization
- Multilingual game content translation
- Named entity extraction from game lore/text

## Related Projects

- Dingo (by same authors, beastbyte.ai)
- Falcon (by same authors, beastbyte.ai)
- Documentation: https://skllm.beastbyte.ai
