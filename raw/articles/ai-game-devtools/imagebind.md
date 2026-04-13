# ImageBind — Raw Source

## 基本信息

- **项目**: ImageBind
- **组织**: Meta AI (FAIR)
- **GitHub**: https://github.com/facebookresearch/ImageBind
- **论文**: CVPR 2023 (Highlighted paper)
- **许可证**: CC-BY-NC 4.0
- **模型权重**: https://dl.fbaipublicfiles.com/imagebind/imagebind_huge.pth

## 项目概述

ImageBind 是一个多模态联合嵌入模型，将六种模态（图像、文本、音频、深度图、热成像、IMU）映射到统一的嵌入空间，实现跨模态检索、组合算术、跨模态检测和生成等应用。

## 核心能力

- 六种模态联合嵌入：图像/视频、文本、音频、深度图、热成像、IMU
- 零样本分类性能（ImageNet / K400 / NYU-D / ESC / LLVIP / Ego4D）
- 跨模态检索（以图搜音、以音搜图等）
- 模态算术组合
- 跨模态检测与生成

## 性能指标

| 模型 | IN1k | K400 | NYU-D | ESC | LLVIP | Ego4D |
|------|------|------|-------|-----|-------|-------|
| imagebind_huge | 77.7 | 50.0 | 54.0 | 66.9 | 63.4 | 25.0 |

## 技术架构

### 模组结构

- `imagebind/models/imagebind_model.py` — 主模型（imagebind_huge）
- `imagebind/models/transformer.py` — Transformer 基础架构
- `imagebind/models/multimodal_preprocessors.py` — 多模态数据预处理
- `imagebind/data.py` — 数据加载与变换（图像/文本/音频/深度/IMU/热成像）

### 依赖

```
torch>=2.0.0
torchvision
torchaudio
pytorchvideo @ git+https://github.com/facebookresearch/pytorchvideo.git
timm
ftfy
regex
einops
iopath
numpy>=1.19
types-regex
```

### 训练数据

- 图像编码器：使用 OpenCLIP ViT-H 初始化并冻结
- 文本编码器：OpenCLIP 冻结
- 音频：AudioSet
- 深度图：SUN RGB-D
- IMU：Ego4D
- 热成像：LLVIP

## 使用示例

```python
from imagebind import data
import torch
from imagebind.models import imagebind_model
from imagebind.models.imagebind_model import ModalityType

text_list = ["A dog.", "A car", "A bird"]
image_paths = [".assets/dog_image.jpg", ".assets/car_image.jpg", ".assets/bird_image.jpg"]
audio_paths = [".assets/dog_audio.wav", ".assets/car_audio.wav", ".assets/bird_audio.wav"]

device = "cuda:0" if torch.cuda.is_available() else "cpu"
model = imagebind_model.imagebind_huge(pretrained=True)
model.eval()
model.to(device)

inputs = {
    ModalityType.TEXT: data.load_and_transform_text(text_list, device),
    ModalityType.VISION: data.load_and_transform_vision_data(image_paths, device),
    ModalityType.AUDIO: data.load_and_transform_audio_data(audio_paths, device),
}

with torch.no_grad():
    embeddings = model(inputs)
```

## 模型卡

- 开发方：Meta AI
- 模型类型：多模态模型
- 语言：英语
- 许可：CC BY-NC-SA 4.0
- 仅用于研究目的，不可用于商业应用
