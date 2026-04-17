# OmniGen2: Exploration to Advanced Multimodal Generation

**Source:** https://github.com/VectorSpaceLab/OmniGen2
**Paper:** https://arxiv.org/abs/2506.18871
**Extraction Date:** 2026-04-17
**Note:** GitHub/gitcode/gitee clone all failed; extracted via web_extract

---

## Project Page
- GitHub: VectorSpaceLab/OmniGen2
- HuggingFace Model: https://huggingface.co/OmniGen2/OmniGen2
- HuggingFace Spaces Demo: https://huggingface.co/spaces/OmniGen2/OmniGen2
- Web App: https://genai.baai.ac.cn/
- Project Page: https://vectorspacelab.github.io/OmniGen2

## Datasets
- OmniContext: https://huggingface.co/datasets/OmniGen2/OmniContext
- X2I2: https://huggingface.co/datasets/OmniGen2/X2I2

## Architecture & Core Features
- **Dual Decoding Pathways:** Separate pathways for text and image modalities with unshared parameters.
- **Decoupled Image Tokenizer:** Improves modality-specific representation learning.
- **Primary Capabilities:** Competitive performance across Text-to-Image, Image Editing, In-Context Generation, and Visual Understanding.
- **Upcoming Releases:** Training code and dataset will be published soon. flash-attn integration noted.

## Configuration & Hyperparameters
| Category | Parameters | Notes |
|----------|------------|-------|
| Guidance | text_guidance_scale, image_guidance_scale | Control prompt/image adherence |
| Resolution | max_pixels, max_input_image_side_length | Output/input size constraints |
| CFG & Scheduling | cfg_range_start, cfg_range_end, scheduler (euler/dpmsolver++), num_inference_step (50) | Sampling & step control |
| Optimization | enable_model_cpu_offload, enable_sequential_cpu_offload, enable_teacache, teacache_rel_l1_thresh, enable_taylorseer | Memory/speed acceleration |
| Prompting | negative_prompt | Suppress unwanted features |

## Usage Tips
- Prioritize English prompts for optimal model performance.
- If generated images diverge from inputs, modify instructions to explicitly reinforce subject alignment.
- Speed optimization: decrease cfg_range_end parameter (negligible quality impact).
- Local execution scripts: example_t2i.sh, example_edit.sh, example_in_context_generation.sh, example_understanding.sh, example.ipynb

## Limitations
- Model sometimes does not follow instructions; increase "Number of images per prompt" or try different prompts.
- Output resolution defaults to 1024×1024, does not auto-scale.
- In-Context Generation may alter original objects; fix: set image_guidance_scale to 3, use high-res inputs.
- Performance still lags behind GPT-4o for in-context tasks.
- Being as detailed as possible in prompts tends to work better.

## Hardware Requirements
- Minimum VRAM: ~17GB (NVIDIA RTX 3090 or equivalent)
- Low-Memory Fallback: Enable CPU Offload for GPUs with <17GB VRAM
- Benchmarking: Inference efficiency metrics for A800 GPU

## Repository Structure
```
├── omnigen2/          # Core model architecture
├── omnicontext/       # Context handling modules
├── OmniGen2-RL/       # Reinforcement Learning components
├── scripts/train/     # Training configurations
├── pretrained_models/ # Checkpoint storage
├── data_configs/      # Dataset & training configs
├── app.py / app_chat.py / app_chat.sh  # Gradio UI & chat interfaces
├── inference.py / inference_chat.py    # Standalone inference scripts
├── train.py           # Main training entrypoint
└── example_*.sh       # Task-specific execution scripts
```

## Community
- Unofficial implementations exist but carry official warning: "Currently, we have not confirmed whether there are no bugs. Please try to use the our official demo as much as possible."
- Citation requested via GitHub.
