# Video-CCAM

> Cloned from https://github.com/QQ-MM/Video-CCAM — 2026-04-15

## 基本信息
- **机构**: 腾讯多媒体研究团队 (TencentQQ Multimedia Research Team)
- **GitHub**: https://github.com/QQ-MM/Video-CCAM
- **arXiv**: https://arxiv.org/abs/2408.14023
- **模型库**: HuggingFace (JaronTHU/Video-CCAM-4B, -7B, -9B, -14B)

## 版本历史
- v1.0 (2024/06/24): 初始发布，Video-CCAM-4B，Video-MME 48.2(无字幕)/51.7(有字幕) @ 32帧
- v1.1 (2024/08/22): 重写代码便于部署，MVBench/VideoVista/MLVU 性能提升
- v1.2 (2024/09/29): 性能增强，支持中文，Gradio 部署

## 模型系列
| 模型 | 参数量 | Video-MME (96帧, 无/有字幕) | MVBench (16帧) |
|------|--------|-------------------------------|-----------------|
| Video-CCAM-4B | 4B | 49.6 / 53.0 | 57.78 |
| Video-CCAM-7B | 7B | - | - |
| Video-CCAM-9B | 9B | 50.6 / 54.9 | 60.70 |
| Video-CCAM-14B | 14B | 53.2 / 57.4 | - |

## 技术架构
- **核心**: Causal Cross-Attention Masks，因果交叉注意力掩码增强视频-语言理解
- **视觉编码器**: Google SigLIP SO400M (patch14-384)
- **语言模型基座**: 
  - Phi-3-mini/3.5-mini/3.5-medium (Microsoft)
  - Qwen2.5-7B-Instruct (Alibaba)
  - Yi-1.5-9B-Chat (01.AI)
- **训练框架**: InternLM xtuner
- **依赖**: transformers, accelerate, peft, decord, pysubs2, imageio, flash-attn
- **推理**: Huggingface transformers，支持 Flash Attention 2，bfloat16

## 核心特性
- 支持短视频和长视频理解
- 支持中英文双语
- 支持字幕输入
- 支持 MVBench、VideoVista、MLVU、Video-MME 四大评测基准
- Gradio web demo
- 纯 PyTorch (Huggingface) 部署，无需自定义 CUDA 核

## 评测性能
- **Video-MME** (最难基准): 14B 模型无字幕 53.2 / 有字幕 57.4 (96帧)
- **MVBench**: 9B 模型 60.70 (16帧)，超越众多开源 MLLM
- **VideoVista**: 开源 MLLM 中排名第 2-3 位
- **MLVU**: 14B 模型 M-Avg 60.18, G-Avg 4.11 (96帧)

## 推理示例
```python
from transformers import AutoImageProcessor, AutoModel, AutoTokenizer
from eval import load_decord

model_path = "JaronTHU/Video-CCAM-7B-v1.2"
videoccam = AutoModel.from_pretrained(model_path, trust_remote_code=True,
    torch_dtype=torch.bfloat16, device_map='cuda:0', attn_implementation='flash_attention_2')
tokenizer = AutoTokenizer.from_pretrained(model_path)
image_processor = AutoImageProcessor.from_pretrained(model_path)

messages = [['role': 'user', 'content': '<video>\n请仔细描述这个视频。']]
images = [load_decord('video.mp4', sample_type='uniform', num_frames=32)]
response = videoccam.chat(messages, images, tokenizer, image_processor, max_new_tokens=512)
```

## 文件结构
```
eval/           # 评测模块 (mlvu, mvbench, videomme, videovista, utils)
assets/         # 示例图片/视频，leaderboard 图表
web_demo.py     # Gradio 网页 demo
tutorial.ipynb  # 教程 notebook
```
