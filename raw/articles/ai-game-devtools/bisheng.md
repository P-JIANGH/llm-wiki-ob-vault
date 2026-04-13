# Bisheng - AI Game DevTools Source

## Basic Info
- **Name:** Bisheng
- **URL:** https://github.com/dataelement/bisheng
- **License:** Not clearly specified in README (see LICENSE file)
- **Organization:** DataElement
- **Description:** Open LLM application devops platform for enterprise scenarios

## What It Is
Bisheng is an open LLM application devops platform focused on enterprise scenarios. It has been adopted by many industry-leading organizations and Fortune 500 companies. The name "Bi Sheng" refers to the inventor of movable type printing, reflecting the project's goal to enable widespread implementation of intelligent applications.

## Key Features

### 1. Lingsight - General-purpose Agent
- Uses AGL (Agent Guidance Language) framework
- Embeds domain experts' preferences, experience, and business logic into AI
- Enables "expert-level understanding" when handling tasks

### 2. BISHENG Workflow
- Independent and comprehensive application orchestration framework
- Supports loops, parallelism, batch processing, conditional logic
- Human-in-the-loop: users can intervene during workflow execution
- Visual flowchart-based design (loops = draw a loop, parallelism = align elements)
- Handles complex scenarios: multi-type I/O, report generation, content review

### 3. Enterprise Applications
- Document review
- Fixed-layout report generation
- Multi-agent collaboration
- Policy update comparison
- Support ticket assistance
- Customer service assistance
- Meeting minutes generation
- Resume screening
- Call record analysis
- Unstructured data governance
- Knowledge mining
- Data analysis

### 4. Enterprise-grade Features
- Security review
- RBAC (Role-Based Access Control)
- User group management
- Traffic control by group
- SSO/LDAP support
- Vulnerability scanning and patching
- High availability deployment
- Monitoring and statistics

### 5. High-Precision Document Parsing
- High-precision printed text recognition
- Handwritten text recognition
- Rare character recognition
- Table recognition models
- Layout analysis models
- Seal models
- Privately deployable for free

### 6. Community
- Open repository for application cases and best practices
- Sharing platform for enterprise scenarios

## Architecture

### Technology Stack
- Backend: Python (src/backend/)
- Dependencies: LangChain, LangFlow, Unstructured, LLaMA-Factory
- Infrastructure: Docker, Docker Compose
- Search: Elasticsearch (ES)
- Vector DB: Milvus
- Document: Onlyoffice

### Key Modules
- `bisheng/chat/` - Chat and conversation management
- `bisheng/llm/` - LLM integrations (TTS, ASR, Embedding, Rerank, LLM)
- `bisheng_langchain/` - LangChain utilities and agents
- `bisheng_langchain/agents/` - Agent implementations including llm_functions_agent
- `bisheng_langchain/autogen_role/` - AutoGen multi-agent collaboration
- `bisheng_langchain/document_loaders/` - Document parsing (PDF, HTML, Image, OCR)

### Frontend Components
- Web UI accessible at http://IP:3001
- User registration with admin promotion for first user

## Installation
```bash
git clone https://github.com/dataelement/bisheng.git
cd bisheng/docker
docker compose -f docker-compose.yml -p bisheng up -d
```

### Requirements
- CPU >= 4 Virtual Cores
- RAM >= 16 GB
- Docker 19.03.9+
- Docker Compose 1.25.1+
- Recommended: 18 virtual cores, 48GB RAM

## Acknowledgements
- LangChain
- LangFlow
- Unstructured
- LLaMA-Factory

## Relevance to AI Game Development
While primarily an enterprise LLM application platform, Bisheng's multi-agent collaboration, workflow orchestration, and document processing capabilities could be applied to:
- Game narrative generation and dialogue systems
- Automated game documentation and content review
- NPC behavior orchestration
- Game asset metadata management
