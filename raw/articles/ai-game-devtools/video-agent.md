# VideoAgent — Raw Source

**Project:** VideoAgent: A Memory-augmented Multimodal Agent for Video Understanding
**URL:** https://github.com/YueFan1014/VideoAgent
**Paper:** ECCV 2024 — `videoagent.github.io`
**License:** (see repo — LICENSE file present)

---

## Description

VideoAgent is a multimodal agent that understands input videos and answers user questions. It uses a two-phase architecture:

1. **Memory Construction Phase** — Structured information is extracted from the video and stored in a memory store.
2. **Inference Phase** — A LLM is prompted to use a set of tools interacting with the memory to answer the question.

## Architecture

### Key Components

- **captioning.py** — Generates captions for video segments using BLIP-2 / BLIP-like captioning model
- **segment_feature.py** — Extracts segment-level textual + visual embeddings (ViCLIP from InternVid)
- **tracking.py** — Object tracking (ByteTrack) across video frames
- **reid.py** — Re-identification features (ReID model) for consistent object identity across segments
- **database.py** — Stores and queries object memory using a SQL database (SQLite)
- **encoder.py** — Text embedding encoding using OpenAI `text-embedding-3-large`
- **tools.py / ToolKit class** — Core tool suite:
  - `caption_retrieval` — retrieve captions for a range of segments
  - `segment_localization` — find most relevant segments for a textual description (ensemble of visual + textual similarity)
  - `visual_question_answering` — VQA on a video segment via Video-LLaVA or GPT-4V
  - `query_database` / `retrieve_candidate_objects` — query object memory via SQL / open-vocabulary object retrieval
- **inference.py / ReActAgent** — Main ReAct agent loop using LangChain + Azure OpenAI GPT-4o

### Memory System

The memory system has two layers:
- **Temporal Memory** — Segment-level captions + visual/textual embeddings for all segments
- **Object Memory** — Per-frame object bounding boxes, ReID features, and tracking IDs stored in a SQLite database. Supports open-vocabulary object retrieval and SQL querying.

### Tools (LLM Interface)

Four tools exposed to the LLM via LangChain ReAct:
1. `caption_retrieval(start_segment, end_segment)` — returns captions between segments
2. `segment_localization(description)` — returns top-5 relevant segments (visual + textual ensemble, 18×visual + 11×textual)
3. `visual_question_answering(question, segment_id)` — VQA via Video-LLaVA or GPT-4V
4. `object_memory_querying` (nested: `database_querying`, `open_vocabulary_object_retrieval`)

### VQA Backend

- Primary: **Video-LLaVA** (local server via Unix socket, `video-llava.py`)
- Alternative: **GPT-4V** (API call)

### Dependencies

- Python 3.10, conda environments
- CUDA (RTX 4090 24GB tested)
- BLIP-2 / BLIP captioning
- ByteTrack (tracking)
- ViCLIP (InternVid-10M-FLT)
- OpenAI embeddings + GPT-4o
- LangChain, LangChain-Hub
- Gradio (demo interface)

---

## Citation

```
@inproceedings{fan2025videoagent,
  title={Videoagent: A memory-augmented multimodal agent for video understanding},
  author={Fan, Yue and Ma, Xiaojian and Wu, Rujie and Du, Yuntao and Li, Jiaqi and Gao, Zhi and Li, Qing},
  booktitle={European Conference on Computer Vision},
  pages={75--92},
  year={2025},
  organization={Springer}
}
```
