---
title: everything-ai
created: 2026-04-15
updated: 2026-04-15
type: entity
tags: [tool, agent, llm, multimodal, open-source]
sources: [raw/articles/ai-game-devtools/everything-ai.md]
---

# everything-ai

## Overview

A fully proficient, AI-powered local chatbot assistant via Docker. Supports **18 task types** including RAG, text generation, summarization, image generation/classification, audio/speech, video generation, protein folding, and model fine-tuning.

**Version:** v4.2.0 | **License:** MIT | **Platform:** Windows/macOS | **Repository:** [AstraBert/everything-ai](https://github.com/AstraBert/everything-ai)

## Architecture

### Docker Compose Stack (3 services)

| Service | Image | Ports | Role |
|---------|-------|-------|------|
| everything-ai | `astrabert/everything-ai` | 7860, 8760 | Gradio UI + task dispatch |
| qdrant | `qdrant/qdrant` | 6333 | Vector database (RAG + image search) |
| llama_server | `ghcr.io/ggerganov/llama.cpp:server` | 8000 | GGUF model inference |

### Core Modules

| Module | Purpose |
|--------|---------|
| `select_and_run.py` | Gradio task selector UI — maps 18 tasks to Python scripts |
| `utils.py` | Shared classes: `NeuralSearcher`, `PDFdatabase`, `Translation`, `ImageDB` |
| `retrieval_text_generation.py` | RAG: Qdrant + Sentence-Transformers + HF pipeline |
| `build_your_llm.py` | LLM + Qdrant with Anthropic/OpenAI/Cohere/Groq API |
| `chat_your_llm.py` | API-based chat (no RAG) with Langfuse |
| `llama_cpp_int.py` | llama.cpp GGUF + Qdrant integration |
| `protein_folding_with_esm.py` | ESM-2 protein structure (GPU only) |
| `image_generation.py` | Stable Diffusion via HuggingFace Diffusers |
| `image_retrieval_search.py` | CLIP-based image database search |
| `video_generation.py` | Text-to-video via HuggingFace models |
| `spaces_api_supabase.py` | HF Spaces API + Supabase PostgreSQL vector DB |

## Task Modes (18 types)

| Task | Description | Multilingual |
|------|-------------|--------------|
| `retrieval-text-generation` | RAG with Qdrant + HF models | ✅ |
| `agnostic-text-generation` | ChatGPT-like, any HF text model | ✅ |
| `text-summarization` | Text/PDF summarization | ❌ EN only |
| `image-generation` | Stable Diffusion via HF Hub | ✅ |
| `image-generation-pollinations` | Pollinations AI API | ✅ |
| `image-classification` | Any HF image classifier | ❌ EN only |
| `image-to-text` | Image captioning | ❌ EN only |
| `audio-classification` | HF audio classifiers | — |
| `speech-recognition` | ASR (Whisper etc.) | — |
| `video-generation` | Text-to-video via HF | ❌ EN only |
| `protein-folding` | ESM-2 backbone | GPU only |
| `autotrain` | HF AutoTrain fine-tuning | — |
| `spaces-api-supabase` | HF Spaces + Supabase PG | ✅ |
| `llama.cpp-and-qdrant` | llama.cpp GGUF + Qdrant | ✅ |
| `build-your-llm` | API LLM + Qdrant + Langfuse | ✅ |
| `simply-chatting` | API chat + Langfuse | ✅ |
| `fal-img2img` | fal.ai ComfyUI image-to-image | ❌ EN only |
| `image-retrieval-search` | CLIP image DB search | — |

## Key Technical Decisions

- **RAG:** Uses Qdrant vector DB + Sentence-Transformers (`all-MiniLM-L6-v2`) for embeddings; PDF text chunked via LangChain `CharacterTextSplitter`
- **Multilingual:** Google Translate + langdetect for cross-language RAG — queries and documents can be in different languages
- **Inference engines:** Supports both HuggingFace transformers pipelines (GPU/CPU) and llama.cpp GGUF models
- **Image retrieval:** CLIP ViT embeddings stored in Qdrant, searched by cosine distance
- **Langfuse:** Observability integration for API-based chat modes

## Related Tools

- [[autogen]] — Microsoft multi-agent framework; parallels everything-ai's task-dispatch pattern
- [[crewai]] — Role-based agent orchestration; differs from everything-ai's monolithic Gradio approach
- [[langchain]] — Used internally for PDF loading and text splitting in RAG pipeline
- [[llama2-webui]] — Another GGUF/local model UI; everything-ai's llama.cpp mode serves similar purpose

## Comparison with Similar Tools

| Feature | everything-ai | [[autogen]] | [[crewai]] |
|---------|---------------|-------------|------------|
| Deployment | Docker (self-hosted) | Python package | Python package |
| UI | Gradio (built-in) | Custom | Custom |
| RAG | Qdrant + HF | Varies | Varies |
| Multimodal tasks | 18 modes | Agent-based | Role-based |
| Local GGUF | llama.cpp | Via OAI compat | Via OAI compat |
| Langfuse | ✅ (API modes) | ❌ | ❌ |

## Status

Active development — v4.2.0 stable release, Docker image published on Docker Hub.
