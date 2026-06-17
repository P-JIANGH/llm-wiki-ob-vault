# Mora: More like Sora for Generalist Video Generation

**Source:** https://github.com/lichao-sun/Mora
**Paper:** http://arxiv.org/abs/2403.13248
**Project Page:** https://llizhaoxu.github.io/moraframework/
**Author Contact:** lis221@lehigh.edu

## Overview

Mora is a multi-agent framework designed to facilitate generalist video generation tasks, leveraging a collaborative approach with multiple visual AI agents. It aims to replicate and extend the capabilities of OpenAI's Sora.

## Key Features

- **Multi-Agent Collaboration**: Utilizes several advanced visual AI agents, each specializing in different aspects of the video generation process
- **Broad Spectrum of Tasks**: text-to-video, text-conditional image-to-video, extending generated videos, video-to-video editing, connecting videos, simulating digital worlds
- **Open-Source and Extendable**: Community-driven innovation
- **Proven Performance**: Achieves performance close to Sora in various tasks

## Architecture

### Multi-Agent Framework Structure

```
mora/
├── mora/
│   ├── agent/           # AI Agent roles
│   │   ├── video_producer.py        # Text→Image→Video pipeline
│   │   ├── video_producer_with_text.py
│   │   ├── video_producer_extension.py  # Video extension
│   │   ├── image_producer.py        # Text→Prompt→Image pipeline
│   │   └── SoP_generator.py         # Standard of Procedure generator (ProjectManager role)
│   ├── actions/         # Concrete actions each agent can perform
│   │   ├── action.py              # Base Action class (pydantic BaseModel)
│   │   ├── generate_image_with_text.py     # SDXL base+refiner pipeline
│   │   ├── generate_image_with_textimage.py
│   │   ├── generate_image_with_textapi.py  # HuggingFace API mode
│   │   ├── generate_video_with_image.py    # SVD-XT image-to-video
│   │   ├── generate_prompt.py              # LLM prompt generation
│   │   ├── generate_transition.py          # Video transition generation
│   │   ├── generate_SoPs.py                # SOP generation
│   │   ├── add_requirement.py
│   │   └── SEINE/               # SEINE video diffusion model
│   │       ├── diffusion/         # Gaussian diffusion process
│   │       └── models/            # UNet, CLIP, attention
│   ├── configs/
│   │   └── llm_config.py        # LLM configuration (OpenAI/Anthropic/Ollama/etc.)
│   ├── messages/          # Message passing between agents
│   └── utils/
└── tests/
```

### Core Components

1. **Agent Layer** (mora/agent/):
   - **VideoProducer**: Chains GenerateImageWithText → GenerateVideoWithImage (by_order react mode)
   - **ImageProducer**: Chains GeneratePrompt → GenerateImageWithTextAPI (plan_and_act react mode)
   - **VideoProducerExtension**: Extends existing videos
   - **VideoProducerWithText**: Text-conditional image-to-video
   - **SoPGenerator (ProjectManager)**: Task decomposition and planning

2. **Action Layer** (mora/actions/):
   - Base `Action` class extends pydantic BaseModel with async `run()` interface
   - **GenerateImageWithText**: SDXL base (stabilityai/stable-diffusion-xl-base-1.0) + refiner pipeline, 576×1024, 40 steps
   - **GenerateVideoWithImage**: SVD-XT (stabilityai/stable-video-diffusion-img2vid-xt), iterative 3-round generation for longer videos
   - **GeneratePrompt**: LLM-based prompt enhancement
   - **SEINE**: Video diffusion model with Gaussian diffusion process, UNet architecture, CLIP encoding

3. **LLM Integration** (mora/configs/llm_config.py):
   - Supports 12+ LLM providers: OpenAI, Anthropic, Ollama, Qianfan, DashScope, Moonshot, Mistral, Yi, ZhipuAI, Spark, Gemini, Fireworks
   - Pydantic-based config with YAML serialization

4. **Message System**:
   - Message class for inter-agent communication (content, image_content, cause_by)

### Supported Tasks

| Task | Description | Models Used |
|------|-------------|-------------|
| Text-to-video | Generate video from text prompt | SDXL → SVD-XT |
| Image-to-video | Animate a given image | SVD-XT |
| Extend video | Extend existing video duration | Iterative SVD-XT |
| Video editing | Edit video with text instructions | LLM + diffusion |
| Connect videos | Seamlessly join two videos | Transition generation |
| Digital world simulation | Simulate physics/world dynamics | Multi-agent pipeline |

### Demo Results

- 80s video generation (comparable to Sora duration)
- 1024×576 resolution, 12+ seconds
- Still has gap vs Sora in resolution, object consistency, motion smoothness

### Dependencies

- PyTorch
- diffusers (StableVideoDiffusionPipeline, DiffusionPipeline)
- PIL
- transformers (CLIP)
- CUDA (multiple GPUs: cuda:1 for image, cuda:2 for video)

### Citation

```
@article{yuan2024mora,
  title={Mora: Enabling Generalist Video Generation via A Multi-Agent Framework},
  author={Yuan, Zhengqing and Chen, Ruoxi and Li, Zhaoxu and Jia, Haolong and He, Lifang and Wang, Chi and Sun, Lichao},
  journal={arXiv preprint arXiv:2403.13248},
  year={2024}
}
```

### News Timeline

- 2024-03-20: Paper released on arXiv
- 2024-06-13: Code released
- 2024-10-09: Mora v2 paper update announced
