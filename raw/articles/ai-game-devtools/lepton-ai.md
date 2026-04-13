# Lepton AI — Project Source

**Source:** https://github.com/leptonai/leptonai
**License:** Apache 2.0
**Cloned:** 2026-04-14
**From mirror:** gitcode.com (GitHub timed out)

## README Summary

Lepton AI is a Pythonic framework for simplifying AI service building. Key features:
- `Photon` abstraction: convert research/modeling code into deployable services with few lines
- Simple model launching from HuggingFace
- Prebuilt examples for Llama, SDXL, Whisper, etc.
- Autobatching, background jobs
- Pythonic client that auto-calls services like native Python functions
- CLI tool `lep`

### Quick Start
```bash
pip install -U leptonai
lep photon runlocal --name gpt2 --model hf:gpt2
```

### Custom Photon Example
```python
from leptonai.photon import Photon

class Echo(Photon):
    @Photon.handler
    def echo(self, inputs: str) -> str:
        return inputs
```

### Dependencies (from pyproject.toml)
- fastapi, uvicorn, httpx, ray[default], loguru, requests, pydantic, pillow, pyyaml, huggingface_hub
- Runtime extras: accelerate, diffusers>=0.27.0, sentence-transformers, torch, transformers==4.46.3

### Architecture (from directory structure)
```
leptonai/
├── api/          # API layer
├── bench/        # Benchmarking
├── cli/          # CLI implementation (lep command)
├── client.py     # Client SDK
├── cloudrun/     # Cloud deployment
├── config.py     # Configuration
├── kv.py         # Key-value store
├── objectstore.py
├── photon/       # Core Photon class + handlers
│   ├── base.py
│   ├── batcher.py
│   ├── hf/       # HuggingFace integration
│   ├── prebuilt/ # Prebuilt model handlers
│   ├── vllm/     # vLLM integration
│   └── worker.py
├── queue.py
├── registry.py
├── templates/
├── util/
└── _internal/
```

### CLI Commands (from cli/)
- `lep photon runlocal` — run photon locally
- `lep job` — job management
- `lep deployment` — deployment management
- `lep storage` — object storage
- `lep workspace` — workspace management
- `lep node` — node management
- `lep pod` — pod management
- `lep secret` — secret management
- `lep log` — log viewing

### CLI Deployment Spec Example
Supports JSON ingress specs for routing.

## pyproject.toml Key Dependencies
- `ray[default]` — distributed computing
- `fastapi` + `uvicorn` — web framework
- `httpx[http2]` — HTTP client
- `huggingface_hub` — model loading
- `diffusers>=0.27.0` — for image generation models
- `sentence-transformers>=2.3.0` — for embedding models
- `transformers==4.46.3` — for general LLM pipeline
