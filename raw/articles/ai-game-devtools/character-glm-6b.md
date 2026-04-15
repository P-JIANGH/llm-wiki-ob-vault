# CharacterGLM-6B — Source Summary

## Project Overview
- **Name**: CharacterGLM-6B
- **URL**: https://github.com/thu-coai/CharacterGLM-6B
- **HF Repo**: https://huggingface.co/thu-coai/CharacterGLM-6B
- **Paper**: arXiv:2311.16832
- **License**: Custom non-commercial license (Chinese jurisdiction)
- **Developers**: 聆心智能 (Lingxin Intelligence) + 清华大学 CoAI 实验室 (Tsinghua University)

## Core Functionality
Chinese conversational AI framework for role-playing characters, built on ChatGLM2. The model enables creation of lifelike AI characters with consistent attributes and behavioral characteristics.

## Architecture / Technical Details
- **Base model**: ChatGLM2 series (6B parameters)
- **Training**: Fine-tuned on crowdsourced dialogue dataset with role attributes + behaviors
- **Key design**: 7 attribute dimensions (identity, interests, opinions, experiences, achievements, social relationships, others) + behavioral elements (language characteristics, emotional expression, interaction patterns)
- **Inference**: HuggingFace transformers (>=4.36.2), torch (>=2.1.0)
- **Demos**: Streamlit web demo + CLI demo

## Evaluation
- Metrics: Consistency, Anthropomorphism, Engagement, Quality, Safety, Correctness
- Compared against 10+ Chinese LLMs; CharacterGLM-66B achieves best overall score
- Also compared vs MiniMax, GPT-3.5, GPT-4 in role-playing scenarios

## Key Files
- `basic_demo/web_demo_streamlit.py` — Streamlit web demo
- `basic_demo/cli_demo.py` — Command-line demo
- `basic_demo/character.json` — Character prompt template
- `requirements.txt` — Dependencies

## Relationship to Game Dev
Can be used to generate in-game NPC dialogues, interactive storytelling, and character-based game AI systems.
