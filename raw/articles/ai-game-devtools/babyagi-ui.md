# BabyAGI UI

Source: https://github.com/miurla/babyagi-ui  
Cloned: 2026-04-23 from gitcode.com mirror  
License: MIT

---

## Overview

BabyAGI UI is designed to make it easier to run and develop with babyagi in a web app, like a ChatGPT. This is a port of babyagi with Langchain.js and build a user interface.

## Stack

- Next.js
- Pinecone
- LangChain.js
- Tailwind CSS
- Radix UI

## Roadmap

- [x] Collapsible Sidebar
- [x] User input & parallel tasking (BabyDeerAGI)
- [x] API updates support (gpt-3.5-turbo-0613/gpt-3.5-turbo-16k-0613/gpt-4-0613)
- [x] Skills Class allows for easy skill creation (BabyElfAGI)
- [x] Aggregate the logic of the agent in the backend
- [x] Add hooks to make it easier to handle the agent on the frontend
- [ ] Support the OpenAI GPT-4 Turbo model
- [ ] Support the Llama2 model

## Getting Started

```sh
git clone https://github.com/miurla/babyagi-ui
cd babyagi-ui
npm install
cp .env.example .env
npm run dev
```

## Environment Variables

- Pinecone API key and index (required)
- SerpAPI Key (optional, for search tool with BabyBeeAGI)
- OpenAI API key

## Deploy

Vercel one-click deploy supported.

## Project Structure

```
src/
- utils/          # Utility functions (execution, prompts, tasks, etc.)
- hooks/          # React hooks for execution status, error handling, etc.
- components/     # React components
- pages/          # Next.js pages
- types/          # TypeScript type definitions
```

## Key Dependencies (from package.json)

- next: ^13.4.16
- langchain: ^0.0.64
- openai: ^3.2.1
- @pinecone-database/pinecone: ^0.0.10
- ai: ^2.1.31
- react: 18.2.0
- typescript: 5.0.3
- tailwindcss: ^3.3.1

## Credits

- Original BabyAGI: https://github.com/yoheinakajima/babyagi by @yoheinakajima
