---
title: The Legend of Zelda Twilight Princess — Reverse Engineering
created: 2026-04-09
updated: 2026-04-09
type: concept
tags: [open-source, game, reverse-engineering, gamecube, wii, decompilation]
sources: [https://github.com/zeldaret/tp]
---

# The Legend of Zelda: Twilight Princess (TP)

> Zelda 系列 GameCube/Wii 原版代码逆向工程，实现字节级匹配的完全反编译

## 基本信息

| 项目 | 内容 |
|------|------|
| GitHub | https://github.com/zeldaret/tp |
| 类型 | 反向工程 / 反编译项目 |
| 语言 | C/C++ |
| 构建系统 | Python configure.py + Ninja |
| 许可 | CC0 (Public Domain) |
| 目标版本 | GCN USA/PAL/JPN, Wii 多版本, Nvidia Shield |

## 核心技术点

### 1. 多版本条件编译架构
单一代码库通过 `configure.py --version` 参数支持 12+ 个游戏版本：
- **GCN**: GZ2E01 (USA), GZ2P01 (PAL), GZ2J01 (JPN)
- **Wii**: RZDE01 (USA Rev0/2), RZDP01 (PAL), RZDJ01 (JPN), RZDK01 (KOR) 等
- **Nvidia Shield**: Shield / ShieldD (中国区)

配置系统基于 Python，输出 Ninja 构建文件，支持增量编译。

### 2. 对象差异对比工具 (objdiff)
- 使用 encounter/objdiff 工具进行逐对象差异对比
- 每次修改后自动重建并比对，确保修改不破坏字节级匹配
- 支持文件系统通知自动触发重建

### 3. 代码组织结构
```
src/d/          # 动态游戏对象 (d_a_*, d_bg_*)
src/m_Do/       # 游戏主循环/Do 模块
src/REL/        # Wii REL 可重定位模块
src/f_pc/       # 平台相关代码 (f = filesystem?)
src/SSystem/    # 系统模块
src/Z2AudioLib/ # 音频库
src/Z2AudioCS/  # 音频 CS (cutscene?)
```

### 4. 进度追踪系统
- 使用 decomp.dev 进行进度可视化
- 每个版本独立追踪完成率
- GCN 版本已完全匹配（100%），Wii 版本持续推进中

### 5. 反编译工程方法论
- **不包含游戏资源**: 需自行提供原始游戏镜像（ISO/GCM/RVZ 等格式）
- **无端口计划**: 明确声明不会产生 PC 或其他平台移植版
- **匹配优先**: 目标是编译出与原版字节完全相同的二进制文件
- **RE Notes**: 维护类大小、内存布局等逆向工程笔记

## 关键文件

| 文件 | 用途 |
|------|------|
| `configure.py` | 主配置脚本 (3000+ 行)，定义版本、编译选项 |
| `splits.txt` | 代码分段配置 |
| `symbols.txt` | 符号表 |
| `objdiff.json` | objdiff 对比配置 |
| `docs/re_notes.md` | 类大小、结构体布局等 RE 笔记 |
| `docs/rels_sha1.md` | REL 模块 SHA1 校验 |

## 对公司 AI 游戏的参考价值

| 方向 | 启示 |
|------|------|
| 多版本兼容 | 条件编译 + 配置驱动的版本管理，可复用于多平台适配 |
| 差异化对比 | objdiff 模式对 AI 游戏代码一致性验证有参考价值 |
| 确定性构建 | 逆向工程的"字节级匹配"理念可用于 AI 生成代码的可验证性 |
| 文档即代码 | `re_notes.md` 类大小表格 = 运行时类型信息，可用于 AI 游戏实体系统设计 |

## 相关链接

- 进度面板: https://decomp.dev/zeldaret/tp
- Discord: https://discord.com/invite/DqwyCBYKqf
- 贡献指南: https://zsrtp.link/contribute
- 相关项目: [[open-source-games-list]] — 开源游戏总览
