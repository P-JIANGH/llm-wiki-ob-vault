# SenseVoice — 语音基础模型

> Source: https://github.com/FunAudioLLM/SenseVoice
> Date: 2026-04-21
> Category: Speech

## 概述
SenseVoice 是一个语音基础模型，具备多种语音理解能力，包括自动语音识别（ASR）、口语语言识别（LID）、语音情感识别（SER）和音频事件检测（AED）。

由阿里巴巴通义实验室 FunAudioLLM 团队开发。

## 核心能力
1. **多语言语音识别**：使用超过 40 万小时数据训练，支持 50 多种语言，识别性能超越 Whisper 模型
2. **Rich Transcribe**：
   - 优秀的情感识别能力，超越当前最佳情感识别模型
   - 音频事件检测，支持检测 bgm、掌声、笑声、哭声、咳嗽、喷嚏等
3. **高效推理**：SenseVoice-Small 使用非自回归端到端框架，处理 10 秒音频仅需 70ms，比 Whisper-Large 快 15 倍
4. **便捷微调**：提供微调脚本和策略，解决长尾样本问题
5. **服务部署**：支持多并发请求，客户端支持 Python、C++、HTML、Java、C#

## 支持的音频事件类型
`<|BGM|>`、`<|Speech|>`、`<|Applause|>`、`<|Laughter|>`、`<|Cry|>`、`<|Sneeze|>`、`<|Breath|>`、`<|Cough|>`

## 支持的情感类型
`<|HAPPY|>`、`<|SAD|>`、`<|ANGRY|>`、`<|NEUTRAL|>`、`<|FEARFUL|>`、`<|DISGUSTED|>`、`<|SURPRISED|>`

## 支持的语言
`<|zh|>`（中文）、`<|en|>`（英文）、`<|yue|>`（粤语）、`<|ja|>`（日语）、`<|ko|>`（韩语）、`<|nospeech|>`

## 技术架构
- **非自回归端到端框架**：SenseVoice-Small 采用非自回归架构，极低推理延迟
- **基于 FunASR 框架**：集成于 [FunASR](https://github.com/modelscope/FunASR)
- **CTC 对齐**：支持基于 CTC 对齐的时间戳输出
- **VAD 集成**：可结合 FSMN-VAD 模型进行长音频分段
- **ONNX/LibTorch 导出**：支持 ONNX 和 LibTorch 格式导出
- **Docker 部署**：提供 Docker 和 Docker Compose 支持

## 性能对比
- 在 AISHELL-1、AISHELL-2、Wenetspeech、LibriSpeech、Common Voice 等基准上对比 Whisper
- 中文和粤语识别方面 SenseVoice-Small 有显著优势
- 在 ESC-50 环境声音分类数据集上与 BEATS、PANN 对比
- SenseVoice-Small 参数规模与 Whisper-Small 相当，推理速度快 5 倍以上

## 第三方生态
- **SenseVoice.cpp**：基于 GGML 的纯 C/C++ 推理，支持 3/4/5/8-bit 量化
- **Sherpa-onnx**：支持 10 种编程语言的部署（C++/Python/Java/Go/Swift 等）
- **streaming-sensevoice**：流式推理，支持 CTC 前缀波束搜索和热词增强
- **Triton + TensorRT**：GPU 部署最佳实践，V100 上加速比达 526
- **OmniSenseVoice**：优化为极速推理和批处理

## 许可证
Apache 2.0

## 使用示例
```python
from funasr import AutoModel
from funasr.utils.postprocess_utils import rich_transcription_postprocess

model = AutoModel(
    model="iic/SenseVoiceSmall",
    trust_remote_code=True,
    remote_code="./model.py",
    vad_model="fsmn-vad",
    device="cuda:0",
)

res = model.generate(
    input="example/en.mp3",
    language="auto",
    use_itn=True,
    batch_size_s=60,
)
```

## 相关链接
- 模型下载：[ModelScope](https://www.modelscope.cn/models/iic/SenseVoiceSmall), [HuggingFace](https://huggingface.co/FunAudioLLM/SenseVoiceSmall)
- 在线演示：[ModelScope](https://www.modelscope.cn/studios/iic/SenseVoice), [HuggingFace](https://huggingface.co/spaces/FunAudioLLM/SenseVoice)
- 主页：https://funaudiollm.github.io/
- 兄弟项目：[CosyVoice](https://github.com/FunAudioLLM/CosyVoice)（语音生成）、[FunASR](https://github.com/modelscope/FunASR)（语音识别工具包）
