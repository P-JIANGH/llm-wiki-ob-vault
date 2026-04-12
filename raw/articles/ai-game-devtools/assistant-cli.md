# Assistant CLI

> Source: https://github.com/diciaup/assistant-cli

## Basic Info

- **Name**: Assistant CLI
- **Version**: 1.4.0
- **Author**: Paolo Di Ciaula
- **License**: MIT
- **Package**: npm (assistant-cli)

## Description

A command line tool to easily integrate with OpenAI ChatGPT service. Provides both single-shot question answering and continuous conversation modes via terminal.

## Features

- One-shot question mode: `assistant <question>`
- Continuous conversation mode: `assistant chat`
- Dynamic authentication managed by the CLI
- Interactive chat interface with chat history support

## Technical Stack

- **Language**: TypeScript/JavaScript
- **Runtime**: Node.js (>=16)
- **Electron**: 22.0.0 (for browser automation)
- **Key Dependencies**:
  - `axios`: HTTP client for API calls
  - `electron`: Browser automation for ChatGPT authentication
  - `cli-spinner`: Terminal spinner for loading states
  - `node-html-markdown`: Parse HTML responses to markdown
  - `readline`: Interactive CLI input handling
  - `uuid`: Unique session identifiers

## Architecture

The CLI uses Electron to automate the ChatGPT web interface for authentication, bypassing the need for API keys. It provides a simple terminal interface while handling the underlying browser-based OAuth flow.

Main entry point: `./bin/cli`

## Related Commands

- `assistant version` - Check version
- `assistant chat` - Start continuous conversation
- `assistant <question>` - One-shot question

## Keywords

openai, chatgpt, CLI, terminal, gpt, gpt3, gpt4, chatbot, chat, machine learning, conversation, conversational ai, ai, ml, bot
