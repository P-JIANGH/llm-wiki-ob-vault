# 👶🤖🖥️ BabyAGI UI

**Source:** https://github.com/miurla/babyagi-ui  
**Type:** Web application (Next.js)  
**License:** Not explicitly stated (assumed MIT based on repo culture)

## Overview

BabyAGI UI is a web interface for [BabyAGI](https://github.com/yoheinakajima/babyagi), designed to make it easier to run and develop with BabyAGI in a browser, similar to ChatGPT. It is a port of BabyAGI built with LangChain.js and features a modern React-based user interface.

## Tech Stack

- **Frontend:** Next.js 13, React 18, TypeScript
- **Styling:** Tailwind CSS, Radix UI primitives
- **AI/LLM:** LangChain.js, OpenAI API
- **Vector DB:** Pinecone
- **State:** localStorage for executions and settings
- **Deployment:** Vercel-ready

## Key Features

- Multiple agent variants:
  - **BabyDeerAGI** (Stable) — supports user input & parallel tasking
  - **BabyElfAGI** (Beta) — Skills Class for easy skill creation
  - **BabyCatAGI** — search + document processing
  - **BabyBeeAGI** — search / document tools with SerpAPI
  - **BabyAGI** — original implementation
- Collapsible sidebar UI
- Support for OpenAI GPT-4, GPT-4 Turbo, GPT-3.5 Turbo
- Internationalization (i18n) support
- Execution history saved to localStorage
- Vercel one-click deploy

## Architecture

```
src/
├── components/      # React UI components
├── hooks/           # Custom React hooks (useExecutionStatus, useErrorHandler, etc.)
├── types/           # TypeScript type definitions
├── utils/           # Utility functions
│   ├── constants.ts   # Model configs, agent types, themes
│   ├── execution.ts   # localStorage execution persistence
│   ├── objective.ts   # Objective handling
│   ├── prompt.ts      # LLM prompt templates
│   ├── task.ts        # Task serialization (snake_case ↔ camelCase)
│   └── ...
└── pages/           # Next.js pages
```

## Agent Variants

| Agent | Icon | Status | Capabilities |
|-------|------|--------|-------------|
| BabyDeerAGI | 🦌 | Stable | User input + parallel tasking |
| BabyElfAGI | 🧝 | Beta | Skills Class system |
| BabyCatAGI | 🐱 | — | Search + document processing |
| BabyBeeAGI | 🐝 | — | Search / document (SerpAPI) |
| BabyAGI | 👶 | — | Original implementation |

## Supported Models

- gpt-4-1106-preview (GPT-4 Turbo)
- gpt-4
- gpt-3.5-turbo

## Environment Variables

```
OPENAI_API_KEY=
PINECONE_API_KEY=
PINECONE_ENVIRONMENT=
PINECONE_INDEX_NAME=
SERPAPI_API_KEY=       # for BabyBeeAGI search
NEXT_PUBLIC_TABLE_ID=  # Airtable integration
```

## Roadmap (as of README)

- [x] Collapsible Sidebar
- [x] User input & parallel tasking (BabyDeerAGI)
- [x] API updates (gpt-3.5-turbo-0613/gpt-4-0613)
- [x] Skills Class (BabyElfAGI)
- [x] Aggregate agent logic in backend
- [x] Frontend hooks for agent handling
- [ ] Support GPT-4 Turbo model
- [ ] Support Llama2 model

## Related Projects

- [BabyAGI](https://github.com/yoheinakajima/babyagi) — Original Python implementation
- [LangChain.js](https://github.com/hwchase17/langchainjs) — LLM framework used

## Dependencies (key)

- next: ^13.4.16
- react: 18.2.0
- langchain: ^0.0.64
- openai: ^3.2.1
- @pinecone-database/pinecone: ^0.0.10
- tailwindcss: ^3.3.1
- i18next: ^22.4.15
