# Guizang PPT Skill — GitHub Source

**URL:** https://github.com/op7418/guizang-ppt-skill
**Fetched:** 2026-04-29
**License:** MIT
**Author:** 歸藏 (op7418)
**Stats:** 60 ⭐ stars · 9 forks

## Overview

Magazine Web PPT Skill — 用于生成单文件 HTML 水平滑动演示的 Claude Code/Agent Skill，视觉风格是 "e-magazine × e-ink"，灵感来自 Monocle 杂志美学 + 代码级精确感。

核心特点：
- **字体**：Serif 标题 + sans-serif 正文 + monospace 元数据（三层系统）
- **背景**：WebGL 流体/弥散效果（仅 hero 页）
- **导航**：← → 键、滚轮、触摸滑动、底部圆点、ESC 索引
- **主题预设**：5 套精选配色（不允许自定义 hex）
- **页面布局**：10 个预制模板
- **输出**：单 HTML 文件——无需构建步骤，无需服务器

使用场景：
- ✅ 离线演示/行业演讲
- ✅ 私人活动/私密聚会
- ✅ AI 产品发布
- ✅ Demo days
- ✅ 个人风格演讲
- ❌ 数据表格密集型
- ❌ 培训材料（信息密度低）
- ❌ 多人协作编辑

5 个主题预设：
- 🖋 墨水经典（Ink Classic）— 通用默认，商务发布
- 🌊 靛蓝瓷（Indigo Porcelain）— 科技/研究/AI/技术发布
- 🌿 森林墨（Forest Ink）— 自然/可持续/文化/非虚构
- 🍂 牛皮纸（Kraft Paper）— 复古/人文学/文学/独立杂志
- 🌙 沙丘（Dune）— 艺术/设计/创意/画廊

10 种页面布局：Opening cover, Chapter幕封, Data big headline, Left text/right image, Image grid, Pipeline, Suspense question, Big quote, Before/After comparison, Mixed text/image

6 步工作流：
1. 需求澄清 — 6 题清单（受众、时长、材料、图片、主题、硬约束）
2. 复制模板 — assets/template.html → 项目目录，更新 <title>，选主题
3. 填充内容 — 从 10 个布局骨架选，粘贴，编辑文案
4. 自检 — 对照 references/checklist.md（P0 问题必须通过）
5. 预览 — 浏览器直接打开
6. 迭代 — 通过内联样式调整字体大小/高度/间距

核心设计原则：
- "保护美学比给自由更重要"
- 克制 > 华丽（WebGL 仅 hero 页）
- 结构 > 装饰
- 图片是一等公民
- 通过 hero 页制造节奏感

安装：`git clone https://github.com/op7418/guizang-ppt-skill.git ~/.claude/skills/magazine-web-ppt`

Open Design 里的位置：skills/guizang-ppt/（原样打包）
