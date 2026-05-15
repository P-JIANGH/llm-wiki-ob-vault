---
title: Unreal Engine 5 Llama LoRA
created: 2026-04-14
updated: 2026-04-14
type: entity
tags: [llm, fine-tuning, game-engine, tool, open-source]
sources: [raw/articles/ai-game-devtools/unreal-engine-5-llama-lora.md]
---

# Unreal Engine 5 Llama LoRA

## Overview
A proof-of-concept that fine-tunes Meta's **Llama-7b** on web-scraped Unreal Engine 5.1 documentation using LoRA (Low-Rank Adaptation), creating a local documentation assistant that answers UE5 queries without API calls or vector databases.

**Category:** LLM / Fine-tuning / Game Documentation
**License:** MIT
**GitHub:** [bublint/ue5-llama-lora](https://github.com/bublint/ue5-llama-lora) (mirror at gitcode.com)
**Training time:** ~8 hours on a single RTX 3090 Ti

## Technical Details

### Architecture
- **Base model:** Llama-7b loaded in 8-bit mode
- **Training framework:** [[text-generation-webui]] training tab (based on Alpaca-style instruction tuning)
- **Training data:** `unreal_docs.txt` — all UE 5.1 docs scraped via Selenium + BeautifulSoup
- **Fine-tuning method:** LoRA (Low-Rank Adaptation)

### Web Scraping Pipeline
The included `webscraping/getunrealenginedocumentation.py` scrapes UE5 docs using:
- Selenium Firefox headless (10s sleep per page)
- BeautifulSoup HTML parsing (`div#maincol`, `<p>`, `<h1-3>` tags)
- Output: concatenated plain text to `unreal_docs.txt`
- **Note:** The author describes the scraping script as inefficient; recommends formatting data as instruction-response JSON like [[stanford-alpaca]] for better prompting control

### Training Configuration
Training configured via [[text-generation-webui]]'s GUI training tab. The author notes that a UE5-tailored character YAML file could reduce hallucinations and better control response length/detail.

## Results

| Model | UE5 Knowledge |
|---|---|
| Base Llama-7b | No knowledge of UE5 |
| **ue5-llama-lora** | High-quality UE5.1 responses from docs |
| ChatGPT | Aware of Nanite (pre-Sep 2021), unaware of Mass Avoidance (experimental post-training) |

**Key finding:** Locally hosted LoRA + raw docs can rival GPT on niche, post-cutoff information when properly fine-tuned.

## Comparison with Similar Tools

| Tool | Approach | Game Relevance |
|---|---|---|
| **This project** | LoRA fine-tuning on game engine docs | Direct — UE5 docs as training data |
| [[llama2-webui]] | General LLM Web UI + LoRA training support | Related — same training stack |
| [[text-generation-webui]] | Full LLM training/inference platform | Direct dependency — this tool runs on it |
| ChatGPT | API-based, knowledge cutoff limited | Alternative architecture |

## Limitations
1. **Hallucinations** — language model prone to fabricating details
2. **Generic prompting** — default chat assistant not optimized for UE5 queries; character YAML tuning recommended
3. **Dataset format** — plain text; would benefit from Alpaca-style instruction-response JSON format
4. **Scraping efficiency** — Selenium-based scraper is slow (10s/page)

## Related
- [[text-generation-webui]] — Training and inference platform used
- [[llama2-webui]] — Related Web UI project with LoRA support
- [[stanford-alpaca]] — Stanford Alpaca dataset format referenced for improving dataset quality
