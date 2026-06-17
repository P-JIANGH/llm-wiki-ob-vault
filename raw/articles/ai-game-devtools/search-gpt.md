# SearchGPT — Raw Source

> Source: https://github.com/tobiasbueschel/search-gpt
> Cloned: 2026-04-14
> Immutable — do not edit. Corrections go in wiki pages.

---

## README

SearchGPT — Connecting ChatGPT with the Internet

You want to try ChatGPT with Internet connectivity so that you can ask about events beyond 2021, but don't have access to AI-enabled Bing and don't want to wait for Google's Bard? SearchGPT gives you this functionality today - it crawls the Internet for information and then feeds it back to ChatGPT.

## Usage

```sh
export OPENAI_API_KEY=***
export GOOGLE_SEARCH_API_KEY=***
export GOOGLE_SEARCH_ID=<REPLACE>

npx search-gpt
```

Or install globally:
```sh
npm install --global search-gpt
searchgpt
```

Requires Google Search API key, Programmable Search Engine ID, and OpenAI API key.

## How it works

Proof of concept connecting Google Search to GPT-3.5-turbo:

```
User enters question → Search Google → Search results handed to ChatGPT → ChatGPT answers using context
```

The implementation crawls first 5 pages from Google Search results, converts HTML to text, then feeds them as context to gpt-3.5-turbo. Does not include previous messages in subsequent queries to avoid token limit issues.

## package.json

- name: search-gpt
- version: 1.2.0
- license: MIT
- Node.js >= 18
- type: module (ESM)
- bin: searchgpt → index.js

## Key Dependencies

- chalk: ^5.2.0 (terminal colors)
- dotenv: ^16.0.3 (env vars)
- gpt-3-encoder: ^1.1.4 (token counting)
- html-to-text: ^9.0.4 (HTML parsing)
- node-fetch: ^3.3.0 (HTTP requests)

## Core Implementation (index.js)

1. CLI readline interface prompts user for question
2. Calls Google Custom Search API for first 5 results
3. Fetches HTML of each result page, converts to text (targeting `<main>` element)
4. Encodes text to count tokens; trims to fit GPT context window
5. Sends context + user question to OpenAI chat completions (gpt-3.5-turbo)
6. Displays formatted response with source URLs

## Architecture

- Single-file Node.js CLI (index.js, ~200 lines)
- ESM module format
- Stateless: no memory between conversations
- No frontend — pure terminal CLI
