# VoxCPM 原始信息 (从 GitHub README_zh.md 抓取)

## 基本信息
- **项目**: VoxCPM / VoxCPM2
- **组织**: OpenBMB (北京人工智能研究院 & 面壁智能)
- **GitHub**: https://github.com/OpenBMB/VoxCPM
- **HuggingFace**: https://huggingface.co/openbmb/VoxCPM2
- **ModelScope**: https://modelscope.cn/models/OpenBMB/VoxCPM2
- **文档**: https://voxcpm.readthedocs.io/zh-cn/latest/
- **Demo**: https://huggingface.co/spaces/OpenBMB/VoxCPM-Demo

## 核心描述
VoxCPM 是一个无离散音频分词器（Tokenizer-Free）的语音合成系统，通过端到端的扩散自回归架构直接生成连续语音表征，绕过对音频的离散编码步骤，实现高度自然且富有表现力的语音合成。

## VoxCPM2 关键参数
- **基座**: MiniCPM-4
- **参数量**: 20亿 (2B)
- **训练数据**: 超过 200万小时 多语种音频
- **语言支持**: 30种全球语言 + 9种中文方言
- **中文方言**: 四川话、粤语、吴语、东北话、河南话、陕西话、山东话、天津话、闽南话
- **输出质量**: 原生 48kHz 高质量音频
- **功能**: 文本转语音、音色设计、高保真声音克隆

## 核心创新：Tokenizer-Free
传统 TTS 系统依赖离散分词器（Tokenizer），将音频信号转换为离散符号进行处理，这会导致信息损失和合成音质下降。VoxCPM 的创新在于完全摒弃离散分词器，直接在连续语音表征空间中进行建模。

## 三大技术优势
1. 更高的语音自然度：避免了离散分词器导致的"robotic"机械感
2. 更强的情感表达：保留语音中的细微情感变化和语调特征
3. 更精准的上下文理解：能够识别长文本中的语义关联和情感转折

## 性能表现
在 Seed-TTS-eval 基准测试中表现显著优益，尤其在自然度和相似度指标上超越了 MegaTTS3、F5-TTS 等主流模型。

## 环境要求
- Python ≥ 3.10
- PyTorch ≥ 2.5.0
- CUDA ≥ 12.0

## 相关项目
- MiniCPM: https://github.com/OpenBMB/MiniCPM
- OpenBMB 其他开源模型
