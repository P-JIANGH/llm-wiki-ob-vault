---
title: Streamlit
created: 2026-04-27
updated: 2026-04-27
type: entity
tags: [tool, python, web, ui]
sources: []
---

# Streamlit

Python 快速 Web 应用框架，常用于机器学习和 AI 项目的 demo 界面。

## 特点

- **快速开发**：纯 Python，无需 HTML/CSS/JS
- **数据友好**：内置图表、表格、媒体组件
- **热重载**：修改代码即时更新
- **部署简单**：streamlit cloud、hugging face spaces

## 游戏开发应用

- AI 对话机器人 demo
- 游戏参数调整工具
- 关卡编辑器预览
- 模型推理结果可视化

## 示例

```python
import streamlit as st
st.title("Game AI Tester")
if st.button("Run Test"):
    result = run_game_ai_test()
    st.write(result)
```

## 相关

- [[gradio]] — 类似工具
- [[python-integration]] — 主要语言
