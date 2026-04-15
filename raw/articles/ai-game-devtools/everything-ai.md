# everything-ai — Source Summary

## Project Overview
- **Name:** everything-ai
- **URL:** https://github.com/AstraBert/everything-ai
- **Version:** v4.2.0
- **License:** MIT
- **Description:** A fully proficient, AI-powered and local chatbot assistant supporting 18+ task types (RAG, text generation, summarization, image generation, classification, audio/speech, video generation, protein folding, fine-tuning)
- **Platform:** Windows/macOS (Docker-based)

## Architecture

### Docker Compose Stack (3 services)
1. **everything-ai** (port 7860/8760) — Gradio web UI + Python task dispatch
2. **qdrant** (port 6333) — Vector database for RAG and image retrieval
3. **llama_server** (port 8000) — llama.cpp GGUF model inference

### Core Modules (docker/)
| File | Purpose |
|------|---------|
| `select_and_run.py` | Gradio task selector UI (port 8760) — maps 18 tasks to Python scripts |
| `utils.py` | Shared: `NeuralSearcher`, `PDFdatabase`, `Translation`, `ImageDB` classes |
| `retrieval_text_generation.py` | RAG pipeline: Qdrant + Sentence-Transformers + HuggingFace pipeline |
| `build_your_llm.py` | Build LLM with Qdrant + Anthropic/OpenAI/Cohere/Groq API |
| `chat_your_llm.py` | Simple API-based chat (no RAG) |
| `llama_cpp_int.py` | llama.cpp + Qdrant integration |
| `protein_folding_with_esm.py` | ESM-2 protein structure prediction (GPU only) |
| `image_generation.py` | Stable Diffusion via HuggingFace Diffusers |
| `image_retrieval_search.py` | CLIP-based image database search |
| `video_generation.py` | Text-to-video via HuggingFace models |
| `text_summarization.py` | Summarization pipeline |
| `autotrain_interface.py` | HuggingFace AutoTrain fine-tuning |
| `spaces_api_supabase.py` | HF Spaces API + Supabase vector DB |

### Task Types (18 modes)
- `retrieval-text-generation` — RAG with Qdrant + HF models (multilingual)
- `agnostic-text-generation` — ChatGPT-like, any HF text model (multilingual)
- `text-summarization` — Text/PDF summarization (EN only)
- `image-generation` — Stable Diffusion via HF Hub (multilingual)
- `image-generation-pollinations` — Pollinations AI API (multilingual)
- `image-classification` — Any HF image classifier (EN only)
- `image-to-text` — Image captioning (EN only)
- `audio-classification` — HF audio classifiers
- `speech-recognition` — ASR models (Whisper etc.)
- `video-generation` — Text-to-video via HF (EN only)
- `protein-folding` — ESM-2 backbone (GPU only)
- `autotrain` — Fine-tuning via HF AutoTrain
- `spaces-api-supabase` — HF Spaces + Supabase PG (multilingual)
- `llama.cpp-and-qdrant` — llama.cpp GGUF + Qdrant (multilingual)
- `build-your-llm` — API-based LLM + Qdrant (multilingual, Langfuse)
- `simply-chatting` — API-based chat (multilingual, Langfuse)
- `fal-img2img` — fal.ai ComfyUI API image-to-image (EN only)
- `image-retrieval-search` — CLIP image DB search

### Key Dependencies
- Gradio (web UI)
- Qdrant (vector DB)
- llama.cpp (GGUF inference)
- LangChain, LangChain Community (PDF loading, text splitting)
- Sentence-Transformers (embeddings)
- Transformers (pipelines)
- PyPDF, PdfMerger
- Deep Translator, LangDetect (multilingual)
- Diffusers, Torch (image/video)

## Configuration (.env)
```
VOLUME=...           # Local path mount into Docker
MODELS_PATH=...      # GGUF models directory
MODEL=...            # GGUF filename
MAX_TOKENS=...       # Max new tokens
```

## Notes
- Most HF-based tasks run on GPU if CUDA available, CPU fallback
- Multilingual support via Google Translate + langdetect
- Langfuse integration for `build-your-llm` and `simply-chatting`
- Docker-only deployment (no native install)
