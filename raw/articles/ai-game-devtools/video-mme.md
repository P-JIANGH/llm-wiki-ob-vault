# Video-MME — Source Summary

> Extracted from: https://github.com/BradyFU/Video-MME
> Clone date: 2026-04-15
> License: Research only (no commercial use)

## Project Overview

**Video-MME** is the first-ever comprehensive evaluation benchmark of Multi-modal Large Language Models (MLLMs) in video analysis. Accepted to **CVPR 2025**.

## Key Facts

- **900 videos**, total 254 hours, **2,700 human-annotated Q&A pairs**
- Video durations: short (<2min), medium (4-15min), long (30-60min), ranging 11sec to 1hr
- 6 primary visual domains: Knowledge, Film & Television, Sports Competition, Life Record, Multilingual
- 30 subfields for broad scenario generalizability
- Multi-modal inputs: video frames + subtitles + audio
- All data newly collected and human-annotated (not from existing datasets)

## Evaluation Pipeline

1. Extract frames and subtitles from videos (use [video-slicer](https://github.com/look4u-ok/video-slicer))
2. Prompt format: multiple-choice Q&A, respond with only A/B/C/D
3. Calculate accuracy across: video duration, domain, subcategory, task type
4. Evaluation uses no third-party models (e.g., no ChatGPT)

## Experimental Results (select models)

| Model | Accuracy |
|-------|----------|
| GPT-4o (384 frames) | 71.9% |
| GPT-4.1 | industry standard measure |
| Gemini 2.5 Pro | 84.8% |
| Gemini 3 Pro | used Video-MME as benchmark |
| GPT-5 | used Video-MME as benchmark |

## Related Tools

- [VLMEvalKit](https://github.com/open-compass/VLMEvalKit) — evaluate models on Video-MME
- [LMMs-Eval](https://github.com/EvolvingLMMs-Lab/lmms-eval) — evaluate models on Video-MME
- [MME-Survey](https://arxiv.org/pdf/2411.15296) — comprehensive survey on MLLM evaluation
- [MME](https://arxiv.org/pdf/2306.13394) — original MME benchmark
- [MME-RealWorld](https://arxiv.org/pdf/2408.13257) — high-resolution real-world scenarios benchmark

## Dataset & License

- Data: [HuggingFace lmms-lab/Video-MME](https://huggingface.co/datasets/lmms-lab/Video-MME)
- Annotations: [HuggingFace lmms-lab/Video-MME](https://huggingface.co/datasets/lmms-lab/Video-MME)
- Research use only — no commercial use
- Copyright belongs to video owners

## Architecture / Evaluation Structure

- Video duration categories: short, medium, long
- Task types: Counting Problem, Information Synopsis, etc.
- Domains: Knowledge, Film & Television, Sports Competition, Life Record, Multilingual
- Evaluation script: `eval_your_results.py` → accuracy across dimensions

## Citation

```bibtex
@inproceedings{fu2025video,
  title={Video-mme: The first-ever comprehensive evaluation benchmark of multi-modal llms in video analysis},
  author={Fu, Chaoyou et al.},
  booktitle={CVPR}, year={2025}
}
```
