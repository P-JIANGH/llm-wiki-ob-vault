# Video-ChatGPT — Source Analysis

Source: https://github.com/mbzuai-oryx/Video-ChatGPT
Paper: https://arxiv.org/abs/2306.05424 (ACL 2024)
Date: 2026-04-20

## README Summary

Video-ChatGPT is a video conversation model combining LLM capabilities with a pretrained visual encoder adapted for spatiotemporal video representation. Developed by MBZUAI (Muhammad Maaz, Hanoona Rasheed, Salman Khan, Fahad Khan).

### Key Contributions
1. 100K high-quality video-instruction pairs with scalable annotation framework
2. First quantitative video conversation evaluation framework
3. Multimodal video understanding + language generation evaluated on reasoning, creativity, spatial/temporal understanding, action recognition

### Performance Highlights
- Zero-shot QA: MSVD-QA 64.9% accuracy, MSRVTT-QA 49.3%, TGIF-QA 51.4%, ActivityNet-QA 35.2% (all SOTA among compared models)
- Generative Benchmark: Correctness 2.40, Detail 2.52, Context 2.62, Temporal 1.98, Consistency 2.37 (all best or tied)

### Architecture
- Base LLM: LLaMA (Vicuna-style instruction-tuned)
- Vision Encoder: CLIP ViT-L/14 (224px frames, 14px patches, 1024-dim hidden)
- MM Projector: Linear projection from 1024 → LLM hidden size
- Video features: spatio-temporal CLIP features extracted per frame, then temporal+spatial mean pooling, concatenated and padded to fixed length
- Special tokens: DEFAULT_VIDEO_PATCH_TOKEN, DEFAULT_VID_START_TOKEN, DEFAULT_VID_END_TOKEN injected into prompt

### Training Data
- VideoInstruct100K: 100K human-assisted + semi-automatic video instruction pairs
- Available on HuggingFace: MBZUAI/VideoInstruct-100K

### Key Source Files
- `video_chatgpt/model/video_chatgpt.py` (303 lines): VideoChatGPTLlamaModel — extends LlamaModel with vision_config, mm_projector, video feature injection in forward()
- `video_chatgpt/inference.py` (119 lines): Main inference pipeline — spatio-temporal feature extraction, conversation template, generate() with stopping criteria
- `video_chatgpt/video_conversation.py`: Conversation templates (conv_templates) and SeparatorStyle
- `video_chatgpt/train/` (4 files): Training pipeline with LLaVA-style trainer, FlashAttention monkey-patch
- `quantitative_evaluation/` (9 files): Benchmark evaluation scripts for 5 aspects (correctness, detail, context, temporal, consistency) + ActivityNet QA

### Dependencies (requirements.txt)
torch 2.0.1, transformers (custom commit), decord 0.6.0, gradio 3.23.0, accelerate 0.20.3, einops, protobuf, sentencepiece

### Follow-up Projects
- Mobile-VideoGPT (2025-03): 2x higher throughput
- VideoGPT+ (2024-06): SoTA on multiple benchmarks
- VCGBench-Diverse (2024-06): 4,354 human-annotated QA pairs across 18 categories

### License
Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International
