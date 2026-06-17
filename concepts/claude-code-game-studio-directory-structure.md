---
title: Claude Code Game Studio Directory Structure
created: 2026-04-27
updated: 2026-04-27
type: concept
tags: [project-structure, game-dev, coding, convention]
sources: []
---

# Claude Code Game Studio Directory Structure

用 [[claude-code]] 或类似 AI 编程工具开发游戏时的推荐项目目录结构模板。

## 推荐结构

```
game-studio/
├── assets/          # 美术资源
│   ├── sprites/
│   ├── audio/
│   └── levels/
├── src/             # 源代码
│   ├── core/        # 核心系统
│   ├── entities/    # 实体
│   ├── systems/     # ECS 系统
│   └── ui/          # 界面
├── tests/           # 测试
├── configs/         # 配置
├── docs/            # 文档
└── scripts/         # 工具脚本
```

## AI 配合要点

- 保持目录清晰，AI 容易理解
- 重要设计决策写入 README
- 使用 AI 生成单元测试

## 相关

- [[claude-code]] — 代码工具
- [[opencode]] — 类似工具
