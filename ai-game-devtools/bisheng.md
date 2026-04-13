---
title: Bisheng
created: 2026-04-13
updated: 2026-04-13
type: entity
tags: [ai, llm, agent, workflow, enterprise, tool]
sources: [raw/articles/ai-game-devtools/bisheng.md]
---

# Bisheng

**Bisheng** is an open LLM application devops platform focused on enterprise scenarios, developed by [DataElement](https://github.com/dataelement). Named after Bi Sheng, the inventor of movable type printing, it aims to provide strong support for the widespread implementation of intelligent applications.

## Overview

Bisheng is an enterprise-grade platform for building and deploying LLM-powered applications. It has been adopted by industry-leading organizations and Fortune 500 companies. The platform emphasizes workflow orchestration, multi-agent collaboration, and enterprise security features.

## Key Features

### Lingsight - Expert-level Agent
Uses the [AGL](https://github.com/dataelement/AgentGuidanceLanguage) (Agent Guidance Language) framework to embed domain experts' preferences, experience, and business logic into AI agents, enabling expert-level task handling.

### Visual Workflow Engine
- Flowchart-based visual design (loops, parallelism, batch processing as visual constructs)
- Human-in-the-loop: users can intervene during workflow execution
- Supports complex logic: loops, parallelism, conditional branching
- Single unified framework for all task types (unlike products with separate bot/chatflow/workflow modules)

### Enterprise Capabilities
- RBAC (Role-Based Access Control)
- User group management and traffic control by group
- SSO/LDAP integration
- Security review and vulnerability scanning
- High availability deployment
- Monitoring and statistics

### High-Precision Document Parsing
- Printed and handwritten text recognition (including rare characters)
- Table recognition, layout analysis, seal detection
- Private deployment available for free

## Architecture

Built on top of [[LangChain]], [[LangFlow]], [[Unstructured]], and [[LLaMA-Factory]].

Key modules:
- `bisheng/chat/` — Conversation and chat management
- `bisheng/llm/` — LLM integrations (TTS, ASR, embedding, rerank, base LLM)
- `bisheng_langchain/agents/` — Agent implementations including LLM functions agent
- `bisheng_langchain/autogen_role/` — Multi-agent collaboration via AutoGen
- `bisheng_langchain/document_loaders/` — Document parsing pipeline (PDF, HTML, image, OCR)

Infrastructure: Docker + Docker Compose, Elasticsearch, Milvus (vector DB), Onlyoffice.

## Game Dev Relevance

While enterprise-focused, Bisheng's capabilities apply to game development:
- [[LangChain]]-based agent orchestration for NPC dialogue systems
- Multi-agent collaboration for complex game narrative generation
- Document processing for game documentation and content review workflows

## Installation

```bash
git clone https://github.com/dataelement/bisheng.git
cd bisheng/docker
docker compose -f docker-compose.yml -p bisheng up -d
```

Requirements: CPU ≥ 4 cores, RAM ≥ 16 GB, Docker 19.03.9+, Docker Compose 1.25.1+

## See Also
- [[AgentGPT]] — Autonomous agent platform
- [[LangChain]] — LLM application framework
- [[AutoGen]] — Microsoft multi-agent framework
