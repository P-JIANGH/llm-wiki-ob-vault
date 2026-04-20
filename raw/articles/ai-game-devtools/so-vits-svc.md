# so-vits-svc — SoftVC VITS Singing Voice Conversion

**Source:** https://github.com/svc-develop-team/so-vits-svc
**Version:** 4.1-Stable (archived / limited update)
**License:** AGPL 3.0
**Stars:** 23.9k+ | **Forks:** 3.6k+

## README 摘要

so-vits-svc 是一个歌唱语音转换（SVC）框架，使用 SoftVC 内容编码器从源音频提取语音特征，直接输入 VITS 进行转换，无需转换为文本中间表示。使用 NSF HiFiGAN 声码器解决声音中断问题。

## 核心架构

### 管线流程
1. **数据预处理** → 音频切分(5-15s) → 重采样到 44100Hz/单声道 → 生成训练/验证集划分 → 提取 hubert 和 F0
2. **模型训练** → Sovits 主模型训练(train.py) → 扩散模型训练(train_diff.py, 可选) → 聚类模型训练(cluster/train_cluster.py, 可选)
3. **推理转换** → inference_main.py 加载模型 → 特征提取 → VITS 解码 → 输出转换音频

### 关键模块

**语音编码器（Speech Encoder）— 13 种可选：**
- ContentVec (vec768l12, vec256l9) — 推荐
- HubertSoft — 轻量
- Whisper-PPG / Whisper-PPG-Large — OpenAI Whisper 编码
- CNHubertLarge — 中文优化
- DPHubert — 蒸馏剪枝版本
- WavLM-Base+ — 微软
- OnnxHubert/ContentVec — ONNX 导出兼容

**声码器（Vocoder）：**
- NSF-HiFiGAN — 默认，解决声音中断
- NSF-Snake-HiFiGAN — 周期性激活函数增强

**F0 预测器（6 种）：**
- RMVPE — 默认，鲁棒性强
- FCPE — 快速，专为实时 VC 设计
- CREPE — 卷积表示，适合嘈杂数据
- DIO / PM / Harvest — 传统方法

**扩散模型（可选）：**
- 浅层扩散（Shallow Diffusion）：VITS 输出 + DDSP 扩散混合，改善电音问题
- 参考 Diffusion-SVC 架构
- 支持 only_diffusion 模式

### 独特功能
- **聚类音色泄漏控制** — K-means 聚类减少音色泄漏，可调混合比例
- **特征检索** — 从 RVC 借鉴的 TopK 特征检索方案
- **动态音色混合** — 时间线级别的多音色渐变混合
- **静态音色混合** — 多模型参数凸组合/线性组合
- **模型压缩** — compress_model.py 去除训练数据，文件缩小至 1/3
- **ONNX 导出** — 支持导出到 ONNX 格式，用于 MoeVoiceStudio 等工具
- **响度嵌入** — 可选的 loudness embedding 保持输入源响度
- **自动音高预测** — 训练时同步训练 F0 预测器
- **Flask API** — 提供 HTTP 推理接口
- **Edge-TTS 集成** — 内置文字转语音管线

### 目录结构
```
so-vits-svc/
├── vencoder/          # 语音编码器（13 种 encoder 实现）
├── vdecoder/          # 声码器（HiFiGAN/Snake-HiFiGAN/NSF-HiFiGAN）
├── modules/           # VITS 核心模块（attention/common/F0 predictor/losses）
├── diffusion/         # 扩散模型（DDSP shallow diffusion）
├── cluster/           # 聚类模型（K-means 训练）
├── inference/         # 推理工具（切片/预处理/推理管线）
├── onnxexport/        # ONNX 导出
├── edgetts/           # Edge TTS 集成
├── configs/           # 配置模板
├── train.py           # Sovits 训练入口
├── train_diff.py      # 扩散模型训练入口
├── inference_main.py  # 推理入口
├── preprocess_*.py    # 预处理脚本
├── compress_model.py  # 模型压缩
├── spkmix.py          # 动态音色混合
└── webUI.py           # Web 界面（Gradio）
```

### 重要说明
- 项目已宣布进入有限更新/存档状态
- 原作者删库后由 svc-develop-team 重建
- 强调仅供学术/虚构角色使用，不涉及真人
- 与 VITS 项目根本区别：SVC 非 TTS，模型不通用
- 依赖 Python 3.8.9，需 CUDA GPU 训练
