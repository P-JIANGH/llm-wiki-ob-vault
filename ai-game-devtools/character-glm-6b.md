---
title: CharacterGLM-6B
created: 2026-04-15
updated: 2026-04-15
type: entity
tags: [llm, agent, tool, open-source]
sources: [raw/articles/ai-game-devtools/character-glm-6b.md]
---

# CharacterGLM-6B

## Overview
CharacterGLM-6B 是由 **聆心智能** 和 **清华大学 CoAI 实验室** 联合发布的角色扮演对话大模型，基于 ChatGLM2 系列开源模型微调而来（6B 参数）。专注于让 AI 角色具备"活"的特质——稳定的属性一致性和自然的人类行为表达风格。

## Technical Details

**Base Model**: ChatGLM2 (6B)

**Core Design Principles**:
- **7种属性维度**: 身份、兴趣、观点、经历、成就、社交关系、其他
- **行为元素**: 语言特征、情感表达、互动模式
- **训练数据**: 众包构建的大规模高质量角色对话数据集，将角色描述转为自然语言提示

**Evaluation Metrics**:
- 一致性（Consistency）
- 拟人化（Anthropomorphism）
- 吸引力（Engagement）
- 质量（Quality）
- 安全性（Safety）
- 正确性（Correctness）

**Benchmark Results**: 在角色扮演场景中，CharacterGLM-66B（API版本）整体表现优于 MiniMax、GPT-3.5，与 GPT-4 相当。

## Deployment

**Dependencies**: transformers>=4.36.2, torch>=2.1.0, streamlit, accelerate

**Demos**:
```bash
# CLI demo
cd basic_demo && python cli_demo.py

# Web demo (Streamlit)
cd basic_demo && streamlit run web_demo_streamlit.py
```

**Model**: HuggingFace `thu-coai/CharacterGLM-6B`

## Use Cases in Game Dev
- 游戏 NPC 对话生成
- 互动式剧情角色
- 多角色社交模拟
- 跑团/CG 文字冒险游戏

## License
Custom non-commercial license — 学术研究用途，不可商用，受中国法律管辖。

## Related
[[ai-game-devtools/chatdev]] — 多智能体对话平台  
[[ai-game-devtools/autogen]] — Microsoft 多智能体框架  
[[chatgpt-api-unity]] — Unity 对接 LLM 的方案  
[[ai-game-devtools/anime-gf]] — 桌面 LLM 聊天前端（角色卡系统）  
[[stanford-generative-agents]] — Stanford 生成式 Agent 理论奠基  
[[multi-agent-ai-game-impl]] — 游戏中的多智能体实现
