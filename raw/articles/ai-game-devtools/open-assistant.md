# Open-Assistant

> Source: https://github.com/LAION-AI/Open-Assistant
> Cloned: 2026-04-14
> Note: Project is completed (announced 2023-10-25). Final oasst2 dataset on HuggingFace.

## Project Overview

**Open-Assistant** is a chat-based large language model project by LAION, meant to give everyone access to a great open-source chat assistant — analogous to how Stable Diffusion democratized image generation.

The project is **completed** (announced 2023-10-25). The final published oasst2 dataset is available on HuggingFace: `OpenAssistant/oasst2`.

## Architecture

### Repository Structure

```
Open-Assistant/
├── website/           # Chat frontend (Next.js)
├── backend/           # FastAPI backend
├── inference/         # Inference serving (text-generation-server + worker)
├── model/             # Training: SFT / RM / RLHF pipelines
│   ├── model_training/   # trainer_sft.py, trainer_rm.py, trainer_rl.py
│   └── model_eval/       # Evaluation scripts
├── oasst-shared/     # Shared Python package
├── data/             # Data schemas and utilities
├── safety/           # Content safety filtering
├── copilot/          # Copilot integration
├── discord-bots/     # Discord bot implementations
├── scripts/          # Deployment and utility scripts
├── docker/           # Docker configurations
└── deploy/           # Deployment configs
```

### Training Pipeline (3-Stage, InstructGPT)

Based on the InstructGPT paper, the training follows:

1. **SFT (Supervised Fine-Tuning)**: Train SFT model on high-quality human-generated prompt-response pairs (>50k samples)
2. **Reward Model (RM) Training**: Sample multiple completions per prompt → human ranking → train reward model
3. **RLHF (Reinforcement Learning from Human Feedback)**: Fine-tune with PPO using the reward model

```bash
# SFT
python trainer_sft.py --configs defaults oa_dataset_only pythia

# Reward Model
python trainer_rm.py --configs defaults_rm oasst-rm-1-pythia-1b

# RLHF
python trainer_rl.py --configs defaults_rlhf --rank_model $REWARD_MODEL --sft_model $SFT_MODEL
```

Base models: EleutherAI Pythia (various sizes, e.g. pythia-1b, pythia-12b)

### Inference Stack

- Docker Compose profile: `inference`
- `inference-server`: Text generation server
- `inference-worker`: Worker for distributed inference
- `text-client`: CLI client for chatting
- Supports loading various model sizes via `model_configs.py`

### Frontend

- `website/`: Next.js-based public chat interface at https://open-assistant.io/chat
- `text-frontend/`: Alternative React frontend
- Data collection frontend for human annotation tasks

### Backend

- FastAPI-based Python backend
- PostgreSQL database (schema in `data/`)
- Redis for caching/sessions

## Key Technologies

- **Languages**: Python (backend/training), TypeScript/Next.js (frontend)
- **Training**: PyTorch, DeepSpeed (implied by large model training)
- **Inference**: text-generation-server, Docker
- **Database**: PostgreSQL
- **Message Format**: Custom JSON tree structure (see `MESSAGE_AND_TOKEN_FORMAT.md`)

## Data Format

Conversational data stored as **message trees** in JSONL format. Each tree contains:
- Root prompt (user message)
- Multiple assistant replies (for ranking)
- Labels and quality ratings

Dataset: `OpenAssistant/oasst1` and `OpenAssistant/oasst2` on HuggingFace

## License

The repository uses Apache 2.0 or similar open license (to be verified per component)

## Vision

The project aimed not just to replicate ChatGPT, but to build an assistant that can:
- Write emails, cover letters
- Do meaningful work
- Use APIs dynamically
- Research information autonomously
- Be personalized and extended by anyone

## Related Projects in Ecosystem

- RLHF training frameworks (similar to DeepSeek-R1, StackLlama)
- Data collection pipelines for LLM fine-tuning
- Human preference ranking systems

## For Game Development

Open-Assistant's value for AI game dev:
- **NPC Dialogue**: Train game-specific chat models using the oasst2 dataset format
- **In-Game Text Generation**: Serve open-source LLMs via the inference stack for dynamic NPC conversations
- **RLHF for Game AI**: Use the reward modeling + RLHF pipeline to train game agents with human preference feedback
- **Data Format**: Message tree format could inspire in-game dialogue branching systems

## Links

- Chat: https://open-assistant.io/chat
- Data Collection: https://open-assistant.io
- Docs: https://projects.laion.ai/Open-Assistant/
- Dataset: https://huggingface.co/datasets/OpenAssistant/oasst2
