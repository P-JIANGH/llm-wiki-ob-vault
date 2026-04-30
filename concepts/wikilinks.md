---
title: Wikilinks
created: 2026-04-27
updated: 2026-04-27
type: concept
tags: [wiki, conventions]
sources: []
---

# Wikilinks

一种在纯文本中创建内部链接的语法格式，广泛用于 Obsidian、Roam Research 等知识管理工具。

## 语法格式

```
`[[Page Name]]`           — 基础链接
`[[Page Name|显示文本]]`  — 带别名显示
`[[folder/Page]]`         — 子目录路径
```

## Wiki 中的使用规范

根据 SCHEMA 的约定：
- 文件名使用小写、连字符、无空格（如 `autonomous-agents.md`）
- Wikilink 目标名须与文件名完全匹配（包括大小写和连字符）
- 指向子目录页面的链接使用 `[[子目录/页面名]]` 格式

## 与标准 Markdown 链接的对比

| 格式 | 语法 | 适用场景 |
|------|------|----------|
| Wikilink | `[[name]]` | Obsidian 内链、Zettelkasten |
| Markdown | `[text](url)` | 标准外链、Web |

## 常见问题

- **大小写不匹配**：`[[autogpt]]` vs `auto-gpt.md` — 文件名含连字符时需精确匹配
- **空格处理**：wikilink 中不能包含多余空格
- **别名滥用**：`[[path|alias]]` 格式应尽量少用，保持链接简洁

## 相关

- [[autonomous-agents]] — 自主 Agent 概念页
