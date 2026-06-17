# OverFlow: Putting flows on top of neural transducers for better TTS

**Source:** https://github.com/shivammehta25/OverFlow
**Paper:** https://shivammehta25.github.io/OverFlow/
**Demo:** https://shivammehta25.github.io/OverFlow/

## Authors
Shivam Mehta, Éva Székely, Jonas Beskow, Gustav Eje Henter (KTH Royal Institute of Technology)

## Paper Citation
@inproceedings{mehta2023overflow,
  title={{O}ver{F}low: {P}utting flows on top of neural transducers for better {TTS}},
  author={Mehta, Shivam and Kirkland, Ambika and Lameris, Harm and Beskow, Jonas and Sz{\'e}kely, {\'E}va and Henter, Gustav Eje},
  booktitle={Proc. Interspeech},
  pages={4279--4283},
  doi={10.21437/Interspeech.2023-1996},
  year={2023}
}

## Overview
OverFlow 是一个神经 transducer 结合 flow-based 解码器的文本到语音 (TTS) 模型。它在神经 transducer (基于 HMM 的序列到序列模型) 之上叠加了归一化流 (normalizing flow)，以获得更好的语音合成质量。

## Architecture
核心架构由三个主要组件组成：

1. **Encoder**: 基于 Tacotron 2 的编码器，3 层卷积 + 512 维嵌入，将音素序列编码为上下文表示
2. **HMM (Hidden Markov Model)**: 神经 transducer 核心，负责文本-声学对齐建模
   - 每个音素 2 个状态 (state_per_phone=2)
   - 自回归一阶 (AR Order=1) 逐步生成
   - 支持确定性转移或概率转移
3. **Flow Decoder (FlowSpecDecoder)**: 归一化流解码器
   - 12 个 block × 4 层，隐藏通道 150
   - 可逆流变换用于高质量频谱建模
   - 支持正向（训练）和反向（推理）模式

数据流：音素文本 → Embedding → Encoder → HMM 对齐 → Flow Decoder → Mel 频谱 → HiFi-GAN 声码器 → 音频

## Key Features
- 预训练模型：提供女声 (OverFlow-Female.ckpt) 和男声 (OverFlow-Male.ckpt) 两个预训练权重
- 说话速率控制：speaking_rate 参数 [0.0, 1.0] 可调
- 采样温度控制：sampling_temp 参数 [0.0, 1.0] 可调
- 混合精度训练：支持 16-bit (FP16) 和 32-bit (FP32)
- 多 GPU 训练：PyTorch Lightning 分布式训练
- Docker 部署：提供 Dockerfile 和 start.sh 一键部署
- 已集成到 Coqui TTS：`pip install tts` 即可使用

## Technical Stack
- **框架**: PyTorch + PyTorch Lightning
- **声码器**: HiFi-GAN (v1)
- **数据**: LJ Speech dataset (英文女声)
- **音素化**: CMU Pronouncing Dictionary + NLTK
- **采样率**: 22050 Hz, 80 维 Mel 频谱
- **代码风格**: Black + isort + pre-commit

## Key Files
| File | Purpose |
|------|---------|
| `src/model/OverFlow.py` | 主模型：Encoder + HMM + FlowDecoder 组合 |
| `src/model/HMM.py` | 隐马尔可夫模型核心逻辑 |
| `src/model/FlowDecoder.py` | 归一化流解码器 |
| `src/model/Encoder.py` | Tacotron 2 风格编码器 |
| `src/training_module.py` | PyTorch Lightning 训练模块 |
| `src/hparams.py` | 全部超参数配置 |
| `overflow_speak.py` | CLI 语音合成入口 |
| `train.py` | 训练入口 |
| `synthesis.ipynb` | Jupyter Notebook 合成示例 |
| `generate_data_properties.py` | 数据集属性生成脚本 |

## Coqui TTS Integration
```bash
pip install tts
tts --text "Hello world!" --model_name tts_models/en/ljspeech/overflow --vocoder_name vocoder_models/en/ljspeech/hifigan_v2 --out_path output.wav
```

## License
MIT (代码), 预训练模型见论文页面

## Training Data
- LJ Speech (英文女声): https://keithito.com/LJ-Speech-Dataset/
- 预训练男声模型：RyanSpeech

## Submodules
- `hifigan/` — HiFi-GAN 声码器 (作为 git submodule)
