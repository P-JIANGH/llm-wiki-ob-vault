# SkyReels V1: Human-Centric Video Foundation Model

Source: https://github.com/SkyworkAI/SkyReels-V1
Captured: 2026-04-20

## Overview
SkyReels V1 is the first open-source human-centric video foundation model, fine-tuned from HunyuanVideo on O(10M) high-quality film and television clips. Offers both Text-to-Video (T2V) and Image-to-Video (I2V) capabilities.

## Key Features
1. **Open-Source SOTA**: Text-to-Video model achieves SOTA among open-source models, comparable to proprietary models like Kling and Hailuo. VBench overall score: 82.43.
2. **Advanced Facial Animation**: 33 distinct facial expressions, 400+ natural movement combinations.
3. **Cinematic Lighting**: Trained on Hollywood-level film data.

## Data Pipeline
- Expression Classification: 33 facial expression types
- Character Spatial Awareness: 3D human reconstruction for multi-person spatial relationships
- Action Recognition: 400+ action semantic units
- Scene Understanding: Cross-modal correlation analysis

## Training Pipeline (Multi-Stage I2V)
- **Stage 1**: Domain transfer pretraining on O(10M) film/TV content
- **Stage 2**: Convert T2V to I2V by adjusting conv-in parameters, pretrained on same dataset
- **Stage 3**: High-quality fine-tuning on curated subset

## Model Details
| Model | Resolution | Frames | FPS | HuggingFace |
|-------|-----------|--------|-----|-------------|
| SkyReels-V1-Hunyuan-I2V | 544x960 | 97 | 24 | Skywork/SkyReels-V1-Hunyuan-I2V |
| SkyReels-V1-Hunyuan-T2V | 544x960 | 97 | 24 | Skywork/SkyReels-V1-Hunyuan-T2V |

## SkyReelsInfer Framework
- **Multi-GPU Inference**: Context Parallel, CFG Parallel, VAE Parallel
- **User-Level GPU**: FP8 quantization + parameter offload for RTX 4090 (18.5G VRAM peak)
- **Performance**: 58.3% lower latency vs HunyuanVideo XDiT on RTX 4090 (4 GPUs: 293.3s vs 464.3s)
- **Built on Diffusers**: Non-intrusive parallel implementation

## Benchmark (VBench 540p)
| Model | Overall | Quality | Semantic | Dynamic | Multiple Objects |
|-------|---------|---------|----------|---------|------------------|
| SkyReels V1 540P | **82.43** | **84.62** | 73.68 | **72.5** | **71.61** |
| VideoCrafter-2.0 VEnhancer | 82.24 | 83.54 | 77.06 | 63.89 | 68.84 |
| CogVideoX1.5-5B | 82.17 | 82.78 | 79.76 | 50.93 | 69.65 |
| HunyuanVideo 540P | 81.23 | 83.49 | 72.22 | 51.67 | 70.45 |

## Architecture (skyreelsinfer/)
- `skyreels_video_infer.py`: Main inference engine (SkyReelsVideoInfer class)
- `offload.py`: Model offloading strategies (OffloadConfig: high_cpu_memory, parameters_level, compiler_transformer)
- `pipelines/pipeline_skyreels_video.py`: Video generation pipeline

## Key Dependencies
- torch==2.5.1, xformers==0.0.29.post1
- diffusers (specific commit), transformers==4.46.3
- optimum[quanto], bitsandbytes==0.45.0 (quantization)
- sageattention==1.0.6, ParaAttention (attention optimization)
- torchao==0.7.0 (additional quantization)

## Usage
```bash
# T2V on RTX 4090 (optimized)
python3 video_generate.py \
    --model_id Skywork/SkyReels-V1-Hunyuan-T2V \
    --task_type t2v \
    --guidance_scale 6.0 \
    --height 544 --width 960 --num_frames 97 \
    --prompt "FPS-24, A cat wearing sunglasses..." \
    --embedded_guidance_scale 1.0 \
    --quant --offload --high_cpu_memory --parameters_level
```

**Note**: Prompts must start with "FPS-24, " (MovieGen-style FPS control).

## License
Apache-2.0 (based on LICENSE.txt)

## Links
- GitHub: https://github.com/SkyworkAI/SkyReels-V1
- HuggingFace T2V: https://huggingface.co/Skywork/SkyReels-V1-Hunyuan-T2V
- HuggingFace I2V: https://huggingface.co/Skywork/SkyReels-V1-Hunyuan-I2V
- Playground: https://www.skyreels.ai/home
- Discord: https://discord.gg/PwM6NYtccQ
- Related: SkyReels-A1 (https://github.com/SkyworkAI/SkyReels-A1)
