# Omost — LLM 驱动的图像组合 (Image Composing) 工具

> Source: https://github.com/lllyasviel/Omost
> Cloned: 2026-04-17 via gitcode.com mirror (GitHub timeout)
> Author: lllyasviel (ControlNet / Fooocus / IC-Light 作者)

## 项目概述

Omost 将 LLM 的编码能力转化为图像组合能力。LLM 通过编写 Python `Canvas` API 代码来描述图像的构图，然后由扩散模型渲染器实际生成图像。

名称 `Omost` (发音: almost) 有两层含义：
1. 使用后图像"almost"就完成了
2. `O` 表示"omni"（多模态），`most` 表示充分利用

## 核心架构：Canvas 系统

### 两个核心方法

```python
class Canvas:
    def set_global_description(
        description: str,           # 全局场景描述（子提示 < 75 tokens）
        detailed_descriptions: list[str],  # 详细描述列表
        tags: str,                  # 标签（适合 anime 模型等）
        HTML_web_color_name: str    # 背景颜色
    ): pass

    def add_local_description(
        location: str,              # 9 个位置之一（中心/左/右/上/下/四角）
        offset: str,                # 9 个偏移之一
        area: str,                  # 9 种面积之一（小/中/大 × 方/竖/横）
        distance_to_viewer: float,  # 相对深度（仅用于排序）
        description: str,           # 局部描述
        detailed_descriptions: list[str],
        tags: str,
        atmosphere: str,            # 氛围
        style: str,                 # 风格
        quality_meta: str,          # 质量元数据
        HTML_web_color_name: str
    ): pass
```

### 空间编码设计

- **位置系统**: 9 个基础位置 (3×3 网格) × 9 个偏移 = 81 个位置中心
- **面积系统**: 9 种形状（小/中/大 × 方形/纵向/横向）
- **总计**: 9×9×9 = 729 种不同的边界框提案
- **为什么用自然语言而非坐标**: 开源 LLM 对像素坐标学习不稳定，自然语言如 "on the right" 收敛更快

### 子提示 (Sub-prompt) 系统

- 每个子提示 < 75 tokens（通常 < 40），可被任何 CLIP 安全编码
- 支持贪婪合并：将多个子提示合并为不超过 75 tokens 的"袋子"
- 避免语义截断错误，同时保持文本嵌入连贯性

### Prompt Prefix Tree

- 树结构组合全局/局部/整体/详细描述
- 路径作为提示词输入
- 可结合贪婪合并处理超长路径

## 渲染器

基于注意力分数操纵 (attention score manipulation)：
- 修改 `y = softmax(modify(q@k))@v` 中的注意力分数
- 参数无关 (parameter-free)，零风格偏移
- 比 multi-diffusion 更高质量，比 gradient optimization 更快

## 预训练模型

| 模型 | 基础 | 量化建议 | VRAM |
|------|------|----------|------|
| omost-llama-3-8b | Llama-3-8B | 4-bit | 8GB |
| omost-dolphin-2.9-llama3-8b | Dolphin-2.9-Llama3-8B | 4-bit | 8GB |
| omost-phi-3-mini-128k | Phi-3-Mini (3.8B) | 8-bit | 8GB |

用户研究排名: omost-llama-3-8b-4bits > omost-dolphin-2.9-llama3-8b-4bits > omost-phi-3-mini-128k-8bits

## 训练数据

1. Open-Images 等数据集的地面真实标注
2. 自动标注提取的数据
3. DPO 强化学习（Python 3.10 可编译性作为偏好信号）
4. 少量 OpenAI GPT-4o 多模态能力的调优数据

## 对话式编辑

支持多轮对话修改图像构图（5-6 轮，受 8k context 限制）：
- 用户: "generate warriors vs dragon"
- AI: 输出 Canvas 代码
- 用户: "change the dragon to a dinosaur"
- AI: 更新 Canvas 代码

## 技术栈

- **框架**: PyTorch + Diffusers 0.28.0 + Transformers 4.41.1
- **量化**: bitsandbytes 0.43.1
- **UI**: Gradio 4.31.5
- **部署**: 最低 8GB Nvidia VRAM

## 许可证

需同时遵守 Omost 的许可以及 Llama-3 / Phi-3 的许可证要求。

## 相关链接

- GitHub: https://github.com/lllyasviel/Omost
- HuggingFace Space: https://huggingface.co/spaces/lllyasviel/Omost

## 与同类工具的差异

- 与 [[ai-game-devtools/controlnet]] 不同：ControlNet 用条件图引导扩散，Omost 用 LLM 生成的 Python 代码描述构图
- 与 [[ai-game-devtools/comfyui]] 不同：ComfyUI 是节点式扩散管线编辑器，Omost 是 LLM→代码→渲染的自动化流程
- 与 [[ai-game-devtools/multi-diffusion]] 相关：Omost 渲染器是 region-guided diffusion 的一种实现，但使用注意力分数操纵而非多扩散合并
