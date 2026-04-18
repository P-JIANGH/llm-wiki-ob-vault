---
title: ExAvatar — Expressive Whole-Body 3D Gaussian Avatar
created: 2026-04-18
updated: 2026-04-18
type: entity
tags: [avatar, 3d, open-source, ai-model, python]
sources: [raw/articles/ai-game-devtools/exavatar.md]
---

# ExAvatar — Expressive Whole-Body 3D Gaussian Avatar

## Overview
ExAvatar 是 ECCV 2024 发表的**全身可驱动 3D 高斯角色**项目，由 Gyeongsik Moon（前 Meta 研究员）在离开 Meta 后重新实现。它将 [[SMPL-X|ai-game-devtools/smpl-x]] 全身（身体+手部+面部）参数化模型的可驱动性与 [[3D Gaussian Splatting|ai-game-devtools/cf-3dgs]] 的强大外观建模能力相结合，从单目视频（手机拍摄）创建高保真、可动画的 3D 人类 Avatar。

## 核心技术
- **3DGS 外观建模：** 修改版 diff-gaussian-rasterization（支持深度图+mask 渲染），结合 SMPL-X + FLAME 参数驱动
- **SMPL-X 拟合管线：** DECA（面部）+ Hand4Whole（手部）+ mmpose（身体）+ SAM（分割）+ Depth-Anything-V2（深度）+ COLMAP（相机）→ 优化 SMPL-X 参数
- **动画驱动：** 训练好的 Avatar 可由任意视频提取的 SMPL-X 参数序列驱动

## 工作流程
1. **拟合阶段** (`fitting/`)：将 SMPL-X 参数化模型拟合到单目视频，输出相机参数 + 优化的 SMPL-X 参数 + FLAME 面部参数
2. **Avatar 创建** (`avatar/`)：使用修改版 3DGS 训练高斯 Avatar，支持自定义视频和 NeuMan 数据集
3. **动画**：加载新 SMPL-X 运动序列，驱动 Avatar 生成动画，支持相机旋转可视化

## 目录结构
```
${ROOT}
├── fitting/          # SMPL-X 拟合（先决步骤）
│   ├── main/         # 高层代码 + 配置
│   ├── common/       # 核心代码（需下载 SMPL-X 1.1 + FLAME 2019/2020）
│   ├── data/         # 数据加载（Custom / NeuMan / XHumans）
│   └── tools/        # DECA/Hand4Whole/mmpose/SAM/Depth-Anything-V2 子模块
└── avatar/           # Avatar 创建 + 动画 + 可视化
    ├── main/         # 训练/测试/动画
    ├── common/       # 核心代码（SMPL-X/FLAME 模型文件）
    ├── data/         # Custom / NeuMan 数据
    └── tools/        # 评估工具
```

## 技术栈
| 组件 | 版本/说明 |
|------|-----------|
| 框架 | PyTorch 2.6.0 + CUDA 12.1 |
| 语言 | Python 3.10 |
| 渲染 | diff-gaussian-rasterization (modified) |
| 人体模型 | SMPL-X 1.1 + FLAME 2020 |
| 训练 | PyTorch Lightning + Hydra 配置 |
| 辅助 | COLMAP, SAM, Depth-Anything-V2, DECA, mmpose |

## 数据集支持
- **Custom 视频：** 用户自拍摄视频（推荐户外拍摄减少阴影）
- **NeuMan 数据集：** Apple 开源多视角人物数据集
- **XHumans 数据集：** 通过独立分支支持

## 预训练模型
- 作者本人的 Avatar 检查点（Google Drive）
- NeuMan 预训练检查点 + ID 参数
- 支持中性姿态旋转可视化

## 许可证
未在仓库中明确指定（研究用途代码）

## 与同类工具的差异
- 与 [[ai-game-devtools/gaussiandreamer]] 不同：GaussianDreamer 是**文本到 3D 高斯生成**，ExAvatar 是**从视频创建可驱动 Avatar**
- 与 [[ai-game-devtools/echomimic]] 不同：EchoMimic 是**音频驱动肖像动画**（2D 扩散），ExAvatar 是**全身 3D 高斯 Avatar**
- 与 [[ai-game-devtools/unity-gaussian-splatting]] 互补：Unity 3DGS 负责在 Unity 引擎中渲染 3DGS，ExAvatar 负责从视频创建 3DGS Avatar

## 相关链接
- **Project Page:** https://mks0601.github.io/ExAvatar
- **Paper:** https://arxiv.org/abs/2407.21686
- **Video Demo:** https://www.youtube.com/watch?v=GzXlAK-sBKY
- **GitHub:** https://github.com/mks0601/ExAvatar_RELEASE
- **作者主页:** https://mks0601.github.io/

## 参考文献
```
@inproceedings{moon2024exavatar,
  title={Expressive Whole-Body 3D Gaussian Avatar},
  author={Moon, Gyeongsik and Shiratori, Takaaki and Saito, Shunsuke},
  booktitle={ECCV},
  year={2024}
}
```
