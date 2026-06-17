# ThinkSound — 原始源分析

## 项目基本信息
- **名称**: ThinkSound
- **GitHub**: https://github.com/FunAudioLLM/ThinkSound
- **作者**: Huadai Liu (浙江大学), Jialei Wang, Kaicheng Luo, Wen Wang, Qian Chen, Zhou Zhao, Wei Xue
- **论文**: NeurIPS 2025 Main Conference
- **arXiv**: https://arxiv.org/pdf/2506.21448
- **许可证**: Apache 2.0（代码/模型仅限研究教育，禁止商业使用）
- **版本**: 0.0.19
- **在线 Demo**: https://thinksound-project.github.io/
- **HuggingFace Spaces**: https://huggingface.co/spaces/FunAudioLLM/ThinkSound
- **ModelScope**: https://modelscope.cn/studios/iic/ThinkSound

## 核心功能
**ThinkSound** 是一个统一的 Any2Audio 生成框架，由 Chain-of-Thought (CoT) 推理引导的流匹配（Flow Matching）驱动。支持从视频、文本、音频或多模态组合生成/编辑音频。

### 三大生成阶段
1. **Foley Generation（音效生成）**: 从视频生成基础、语义和时间对齐的音效场景
2. **Object-Centric Refinement（对象级精炼）**: 通过点击视频中物体或文本指令，精炼或添加特定声音事件
3. **Targeted Audio Editing（目标音频编辑）**: 使用高级自然语言指令修改已生成音频

## 技术架构
- **基础模型**: MM-DiT（Multimodal Diffusion Transformer）骨干
- **音频 VAE**: 微调的 Stable Audio Open VAE（Stability AI）
- **条件编码**: MetaCLIP（视觉特征）+ Synchformer（同步特征）
- **采样**: Flow Matching（Rectified Flow）+ Euler 离散采样
- **推理**: CFG Scale=5，24 步采样
- **依赖框架**: PyTorch 2.6.0, Lightning 2.5.1, Gradio 3.50.0

## 关键文件结构
```
ThinkSound/
├── app.py                 # Gradio Web UI（视频→音频，两步流水线）
├── predict.py             # 模型推理：load model → predict_step → save WAV
├── extract_latents.py     # 特征提取：视频→CoT latents（metaclip+sync特征）
├── train.py               # 训练/微调入口
├── eval_batch.py          # 批量推理
├── defaults.ini           # 默认配置
├── ckpts/                 # 预训练权重
├── data_utils/            # 数据集工具
│   └── v2a_utils/         # Video-to-Audio 数据集+特征处理
│       └── ext/synchformer/ # 视频同步编码器（MotionFormer）
├── ThinkSound/            # 核心模型包
│   ├── models/            # 模型定义
│   ├── inference/         # 推理管线（sampling.py）
│   └── configs/           # 模型配置
└── scripts/               # 运行脚本（demo/eval_batch/train，.sh + .bat）
```

## 安装与使用
```bash
conda create -n thinksound python=3.10
conda activate thinksound
pip install thinksound
conda install -y -c conda-forge 'ffmpeg<7'
git clone https://huggingface.co/liuhuadai/ThinkSound ckpts

# 单视频 demo
./scripts/demo.sh <video> <title> <CoT description> [use-half]

# 批量推理
./scripts/eval_batch.sh <video_dir> <csv_path> <save_dir> [use-half]

# Gradio Web UI
python app.py
```

## 数据集
- **AudioCoT** 数据集（CoT 标注的大型音频数据集）已开源：https://huggingface.co/datasets/liuhuadai/AudioCoT
- 训练数据集包括 AudioSet, VGGSound, Freesound 等

## 与同类工具关系
- 基于 [[mmaudio]] 的 MM-DiT 骨干
- 使用 [[stable-audio-open]] 的 VAE
- 采用 Synchformer 视频同步编码器
- 后继项目 PrismAudio（ICLR 2026）在同一仓库的 prismaudio 分支

## 游戏开发应用价值
ThinkSound 可为游戏提供：
1. 自动 Foley 音效生成（角色动作/环境声音）
2. 从游戏过场动画自动配乐/音效
3. 交互式音效编辑（点击场景物体修改声音）
4. 文本指令驱动的音效定制
