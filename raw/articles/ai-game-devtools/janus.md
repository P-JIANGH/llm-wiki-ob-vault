# Janus — DeepSeek Unified Multimodal Understanding and Generation

**URL:** https://github.com/deepseek-ai/Janus
**Cloned:** ~/tmp/ai-game-devtools/janus/
**Date:** 2026-04-14

## Project Structure

```
janus/
├── README.md                    # Main documentation
├── janus_pro_tech_report.pdf    # Janus-Pro technical paper
├── janus/                      # Core Python package
│   ├── models/
│   │   ├── modeling_vlm.py     # Main VLM model architecture
│   │   ├── processing_vlm.py   # Multimodal processor
│   │   ├── projector.py        # Vision-language projector
│   │   ├── vq_model.py         # Vector quantization model
│   │   ├── clip_encoder.py     # CLIP vision encoder
│   │   ├── siglip_vit.py       # SigLIP ViT encoder
│   │   └── image_processing_vlm.py
│   ├── janusflow/              # JanusFlow variant
│   └── utils/
├── demo/                        # Demo applications
│   ├── app_januspro.py         # Gradio demo for Janus-Pro
│   ├── app.py                  # Gradio demo for Janus
│   ├── app_janusflow.py       # Gradio demo for JanusFlow
│   ├── fastapi_app.py          # FastAPI server
│   └── fastapi_client.py
├── inference.py                 # Simple inference script
├── generation_inference.py      # Text-to-image generation
├── interactivechat.py           # Interactive chat
├── pyproject.toml
└── requirements.txt
```

## Models Released

| Model | Params | Seq Len | Description |
|-------|--------|---------|-------------|
| Janus-1.3B | 1.3B | 4096 | Original unified multimodal model |
| JanusFlow-1.3B | 1.3B | 4096 | Unified model with rectified flow for image generation |
| Janus-Pro-1B | 1B | 4096 | Advanced version, improved understanding + generation |
| Janus-Pro-7B | 7B | 4096 | Full-scale advanced version |

## Key Architecture Highlights

### Janus (Original)
- **Decoupled visual encoding**: Separate vision encoders for understanding vs. generation tasks
- **Unified transformer**: Single LLM backbone processes both modalities
- **Key insight**: Decoupling alleviates conflict between visual encoder's dual roles

### JanusFlow
- **Rectified flow integration**: Uses rectified flow (ODE-based) for image generation within LLM framework
- **Minimalist architecture**: No complex architectural modifications needed
- **Key insight**: Rectified flow can be trained within LLM framework

### Janus-Pro (Jan 2025)
- Optimized training strategy
- Expanded training data
- Scaled to larger model size
- Significant improvements in both multimodal understanding and text-to-image instruction-following

## Tech Stack

- **Framework:** PyTorch + Transformers
- **Vision Encoders:** SigLIP ViT, CLIP
- **VQ Model:** Custom vector quantization for image generation
- **LLM Backbone:** DeepSeek-style autoregressive language model
- **Deployment:** HuggingFace Transformers, Gradio, FastAPI

## License

- Code: MIT License
- Model: DeepSeek Model Agreement (commercial use permitted under terms)

## Citation

```bibtex
@article{chen2025janus,
  title={Janus-Pro: Unified Multimodal Understanding and Generation with Data and Model Scaling},
  author={Chen, Xiaokang et al.},
  journal={arXiv preprint arXiv:2501.17811},
  year={2025}
}

@article{wu2024janus,
  title={Janus: Decoupling visual encoding for unified multimodal understanding and generation},
  author={Wu, Chengyue et al.},
  journal={arXiv preprint arXiv:2410.13848},
  year={2024}
}

@misc{ma2024janusflow,
  title={JanusFlow: Harmonizing Autoregression and Rectified Flow for Unified Multimodal Understanding and Generation},
  author={Ma, Yiyang et al.},
  journal={arXiv preprint arXiv:2411.07975},
  year={2024}
}
```
