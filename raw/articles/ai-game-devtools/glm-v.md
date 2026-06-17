# GLM-V Source

> Cloned from https://github.com/zai-org/GLM-V (2026-04-15)

## Project Overview

GLM-V is Zhipu AI's open-source Visual Language Model (VLM) series, featuring multiple model sizes optimized for different deployment scenarios.

## Key Models

### GLM-4.6V (106B / 9B Flash)
- Vision-language foundation model for cloud and high-performance cluster scenarios
- Lightweight Flash version (9B) for local deployment and low-latency applications
- 128K token context window
- **Native Multimodal Function Calling** — vision-driven tool use without text conversion
- **Interleaved Image-Text Content Generation** — mixed media creation from multimodal inputs
- **Multimodal Document Understanding** — up to 128K tokens of multi-document input
- **Frontend Replication & Visual Editing** — pixel-accurate HTML/CSS reconstruction from UI screenshots

### GLM-4.5V
- Based on GLM-4.5-Air
- SOTA performance among models of the same scale on 42 public vision-language benchmarks
- Capabilities: image/video/document understanding, GUI agent operations
- **Thinking Mode** switch for balancing quick responses vs. deep reasoning

### GLM-4.1V-9B-Thinking
- Built on GLM-4-9B-0414 foundation model
- Uses RLCS (Reinforcement Learning with Curriculum Sampling)
- Strongest performance among 10B-level VLMs
- Matches/surpasses Qwen-2.5-VL-72B on 18 benchmark tasks at only 10B parameters
- 64K context, any aspect ratio, up to 4K image resolution
- Bilingual (Chinese/English) open-source version
- **Chain-of-Thought** reasoning mechanism

## Architecture

- Base: GLM-4-9B language model
- Training: Hybrid training with curriculum sampling
- Inference: transformers >= 5.5.0, accelerate, torch >= 2.10.0
- Skills: 10 pre-built skills (caption, doc-based-writing, grounding, pdf-to-ppt, pdf-to-web, prd-to-app, prompt-gen, resume-screen, stock-analyst, web-replication)
- Examples: AMD GPU, Ascend NPU, GUI agent, Midscene TS/YAML demos

## Technical Stack

- PyTorch >= 2.10.0
- transformers >= 5.5.0
- accelerate >= 1.13.0
- Gradio >= 6.9.0 (for demo)
- Spaces >= 0.47.0
- PyMuPDF >= 1.27.2 (for PDF processing)
- av >= 16.1.0 (video)
- torchcodec >= 0.10.0

## Directory Structure

```
GLM-V/
├── README.md, README_zh.md
├── requirements.txt
├── examples/
│   ├── AMD_GPU/
│   ├── Ascend_NPU/
│   ├── gui-agent/
│   ├── midscene-ts-demo/
│   ├── midscene-yaml-demo/
│   └── vlm-helper/
├── inference/
│   ├── html_detector.py
│   ├── trans_infer_bench.py
│   ├── trans_infer_cli.py
│   └── trans_infer_gradio.py
├── skills/
│   ├── glmv-caption/
│   ├── glmv-doc-based-writing/
│   ├── glmv-grounding/
│   ├── glmv-pdf-to-ppt/
│   ├── glmv-pdf-to-web/
│   ├── glmv-prd-to-app/
│   ├── glmv-prompt-gen/
│   ├── glmv-resume-screen/
│   ├── glmv-stock-analyst/
│   └── glmv-web-replication/
└── glmv_reward/
```

## License

Part of the GLM series, license file present (11338 bytes)

## Related Links

- GitHub: https://github.com/zai-org/GLM-V
- arXiv: https://arxiv.org/abs/2507.01006
- Related: [[ai-game-devtools/glm-4]], [[ai-game-devtools/glm-4.5]]
