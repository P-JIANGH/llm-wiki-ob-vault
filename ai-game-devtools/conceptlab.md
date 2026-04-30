---
title: ConceptLab — VLM-Guided Creative Concept Generation
created: 2026-04-17
updated: 2026-04-17
type: entity
tags: [ai, tool, image-generation, diffusion, open-source]
sources: [raw/articles/ai-game-devtools/conceptlab.md]
---

# ConceptLab

**Tel Aviv University** 开源的创意文本到图像生成工具，利用 VLM 引导的扩散先验约束生成**从未存在过的全新概念**（如全新的宠物品种、全新的艺术风格）。arXiv 2308.02669，MIT 许可。

## 核心创新

不同于传统的个性化微调（如 DreamBooth、Textual Inversion）——这些方法学习**已有概念**的新表示，ConceptLab 解决的是**创造性生成**问题：如何生成一个属于某大类但从未出现过的全新成员。

### 三大生成模式

| 模式 | 机制 | 示例 |
|------|------|------|
| **Creative Generation** | 扩散先验优化 + VLM 自适应负约束 | 生成全新宠物 |
| **Evolutionary Generation** | 双亲概念混合→迭代进化 | 宠物 A × 宠物 B → 第 N 代 |
| **Concept Mixing** | 多正约束无负约束混合 | 鱼 + 熊猫 → "lobs-turtle" |

## 技术架构

### VLM 引导的自适应负约束
1. 在优化过程中采样生成图像
2. 用 **BLIP VLM** 提问："What kind of [category] is in this photo?"
3. VLM 回答出具体子类（如 "a hamster"）
4. 将该子类作为**负约束**加入优化，推动生成远离已有概念
5. 循环迭代，发现越来越独特的新创念

### 扩散先验约束
- 基于 **Kandinsky 2.1** 扩散模型（UNet + VQ-GAN/MoVQ 架构）
- 将创造性生成表述为对扩散先验输出空间的优化过程
- 学习新的文本嵌入（placeholder token），而非微调模型权重
- 512×512 图像，2500 步优化

### 概念混合机制
- 先验约束可作为强混合机制
- 定义多个正约束类（如 `['fish', 'panda']`），关闭负约束
- 优化出的嵌入同时满足多个概念的视觉特征

## 关键技术特点

- **Token 级优化**：仅优化新文本嵌入，不改动扩散模型权重
- **模板多样性**：使用多种 prompt 模板确保概念鲁棒性
- **EMA 支持**：训练过程中指数移动平均
- **艺术风格生成**：不仅限于物体，可生成新艺术风格
- **迭代进化树**：支持多代混合，创建概念谱系

## 项目结构

```
conceptlab/
├── scripts/train.py              # 主训练脚本
├── scripts/train_evolution.py    # 进化混合训练
├── scripts/infer.py              # 推理生成
├── training/coach.py             # VLM 引导训练循环（核心）
├── training/coach_evolution.py   # 进化混合教练
├── kandinsky2/                   # Kandinsky 2.1 模型实现
│   ├── model/unet.py             # UNet 架构
│   ├── vqgan/                    # VQ-GAN 组件
│   └── train_utils/              # 训练工具
└── configs/                      # 训练配置（new_pet/new_art）
```

## 与同类工具的差异

- vs [[comfyui]]：ComfyUI 是通用扩散管线编排引擎，ConceptLab 专注于**全新概念发现**而非管线设计
- vs [[mug-diffusion]]：MuG Diffusion 基于 SD 改造用于音游谱面生成（音频→图表），ConceptLab 用 VLM 负约束推动概念创新（文本→新图像概念）
- vs [[autostudio]]：AutoStudio 解决多角色一致性问题（已有角色在不同场景保持一致），ConceptLab 解决**从未存在的角色**生成问题

## 许可证

MIT License — 允许商业使用和修改

## 相关链接

- GitHub: https://github.com/kfirgoldberg/ConceptLab
- arXiv: https://arxiv.org/abs/2308.02669
- Project Website: https://kfirgoldberg.github.io/ConceptLab/
- Kandinsky 2: https://github.com/ai-forever/Kandinsky-2
