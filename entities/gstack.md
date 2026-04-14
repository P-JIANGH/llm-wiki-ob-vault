---
title: gstack
created: 2026-04-14
updated: 2026-04-14
type: entity
tags: [ai, agent, workflow, tool, claude-code]
sources: [raw/articles/gstack-garry-tan-2026.md]
---

# gstack

Garry Tan 的 AI 软件工程团队框架——把 Claude Code 变成虚拟工程团队。

## Overview

gstack 是 Y Combinator 现任总裁兼 CEO Garry Tan 开源的"软件工厂"。通过 23 个专业化 Skills，把 AI coding agent 打造成具有 CEO、设计师、工程经理、QA、发布工程师等角色的虚拟工程团队。

核心主张：
- 60 天内交付 **600,000+ 行**生产代码（含 35% 测试）
- 日均 **10,000-20,000 行**的交付速度
- 单周 115K LOC净增（3 个项目，362 次 commit）

## Key Components

### Sprint Process

**Think → Plan → Build → Review → Test → Ship → Reflect** 循环

### 23 个 Skills

#### 管理/决策层
| Skill | 角色 | 功能 |
|-------|------|------|
| `/office-hours` | YC Office Hours | 六个强制问题，重构产品思路 |
| `/plan-ceo-review` | CEO/Founder | 四种模式：扩展/选择性扩展/保持范围/收缩 |
| `/plan-eng-review` | 工程经理 | 锁定架构、数据流、边界情况、测试 |
| `/plan-design-review` | 高级设计师 | 维度评分 0-10，AI Slop 检测 |
| `/plan-devex-review` | DX Lead | 20-45 个强制问题审查开发者体验 |

#### 执行层
| Skill | 角色 | 功能 |
|-------|------|------|
| `/review` | 高级工程师 | 发现生产 bug，自动修复明显问题 |
| `/investigate` | 调试工程师 | 系统化根因调试 |
| `/qa` | QA Lead | 测试应用、找 bug、原子级 commit、生成回归测试 |
| `/cso` | CSO | OWASP Top 10 + STRIDE 威胁模型 |
| `/ship` | 发布工程师 | 同步 main、运行测试、审计覆盖率、推送、打开 PR |
| `/land-and-deploy` | 发布工程师 | 合并 PR、等待 CI、验证生产环境健康 |
| `/retro` | 工程经理 | 人员分解、交付 streak、测试健康趋势 |

#### 设计管道
| Skill | 功能 |
|-------|------|
| `/design-consultation` | 从零构建设计系统 |
| `/design-shotgun` | 生成 4-6 个 AI mockup 变体，浏览器内对比 |
| `/design-html` | 用 Pretext 把 mockup 转成生产级 HTML/CSS |

#### 高级工具
| Skill | 功能 |
|-------|------|
| `/careful` | 安全护栏——危险命令前警告 |
| `/freeze` | 锁定一个目录的编辑 |
| `/guard` | `/careful` + `/freeze` 组合 |
| `/codex` | OpenAI Codex CLI 第二意见 |
| `/autoplan` | CEO → 设计 → 工程审查流水线 |
| `/learn` | 跨 session 记忆 |
| `/browse` | 真实 Chromium 浏览器，每命令 ~100ms |
| `/open-gstack-browser` | 带侧边栏的反爬浏览器，自动模型路由 |
| `/pair-agent` | 多 Agent 协调（共享浏览器 + 作用域 token） |

### GStack Browser

- AI 控制的 Chromium，带反爬 stealth
- 侧边栏 Agent 处理自然语言命令
- 自动模型路由（Sonnet 管操作，Opus 管分析）
- 从 Chrome/Arc/Brave/Edge 导入 Cookie
- `$B` 切换手动接管

### Parallel Sprints

通过 [Conductor](https://conductor.build) 支持 10-15 个并行 sprint，每个 session 隔离工作区。

### Multi-Agent 支持

| Agent | Flag |
|-------|------|
| Claude Code | (default) |
| OpenAI Codex CLI | `--host codex` |
| OpenCode | `--host opencode` |
| Cursor | `--host cursor` |
| Factory Droid | `--host factory` |
| Slate | `--host slate` |
| Kiro | `--host kiro` |

添加新 Agent 仅需一个 TypeScript 配置文件。

## 安装

```bash
git clone --single-branch --depth 1 https://github.com/garrytan/gstack.git ~/.claude/skills/gstack && cd ~/.claude/skills/gstack && ./setup
```

**要求：** Claude Code, Git, Bun v1.0+, Node.js (Windows only)

## 5-Command 核心工作流

1. `/office-hours` — 描述你要做什么
2. `/plan-ceo-review` — 审查功能 idea
3. `/review` — 审查有变更的分支
4. `/qa` — 测试 staging URL
5. `/ship` — 部署

## 重要特征

- **Agent 无关**：不依赖特定 AI coding agent，可接入 Codex/OpenCode/Cursor 等
- **角色模拟**：每个 Skill 对应真实工程组织中的角色
- **Sprint 第一**：从 idea 到部署的 opinionated 完整流程
- **71.3K stars**，MIT 许可证

## 与 [[hermes-agent]] 的关系

两者都是 AI Agent 框架，但定位不同：
- **gstack**：把 AI coding agent 打造成虚拟工程团队，专注软件开发流程（CEO→设计→工程→QA→发布）
- **hermes-agent**：通用 Agent 运行时框架，专注多消息平台网关、工具注册、持久化循环

## 与 [[claude-code-game-studios]] 的关系

[[claude-code-game-studios]] 是用 Claude Code 构建游戏开发的 49 Agent 层级结构。gstack 则是更通用的软件工程框架，不限于游戏开发但可应用于任何软件开发。两者都依赖 Claude Code，但 gstack 更偏向工程管理和流程自动化。
