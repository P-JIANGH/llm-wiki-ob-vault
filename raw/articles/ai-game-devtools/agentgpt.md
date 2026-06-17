# AgentGPT

> Source: https://github.com/reworkd/AgentGPT

## 项目概述

**🤖 Assemble, configure, and deploy autonomous AI Agents in your browser.**

AgentGPT allows you to configure and deploy Autonomous AI agents. Name your own custom AI and have it embark on any goal imaginable. It will attempt to reach the goal by thinking of tasks to do, executing them, and learning from the results 🚀.

## 关键链接

| Resource | URL |
|----------|-----|
| **Demo/Site** | https://agentgpt.reworkd.ai |
| **Documentation** | https://reworkd.ai/docs |
| **Twitter** | https://twitter.com/reworkdai |
| **Discord** | https://discord.gg/gcmNyAAFfV |

## 仓库结构

```
AgentGPT/
├── .github/           # GitHub configuration
├── cli/               # Automatic setup CLI
├── db/                # Database files
├── docs/              # Documentation
├── next/              # Next.js frontend (public/banner.png)
├── platform/          # Platform core
├── scripts/           # Build/deployment scripts
├── docker-compose.yml # Docker setup
├── setup.bat          # Windows setup script
├── setup.sh           # Mac/Linux setup script
└── .env.example       # Environment variables template
```

**Statistics:** 1,500+ commits, 12 releases

## 快速开始

1. **Clone the repository**
   ```bash
   git clone https://github.com/reworkd/AgentGPT.git
   cd AgentGPT
   ```

2. **Run setup script**
   - Mac/Linux: `./setup.sh`
   - Windows: `setup.bat`

3. **Configure API keys** - Follow script instructions to add appropriate API keys

4. **Access the application** - Navigate to `http://localhost:3000` in your browser

## 国际化

支持多语言：
- 🇬🇧 English
- 🇨🇳 简体中文 (Chinese Simplified)
- 🇭🇺 Hungarian

## 技术栈

Next.js 前端，平台核心模块，支持 Docker 部署。
