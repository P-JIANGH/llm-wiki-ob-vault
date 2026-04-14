---
title: WordGPT
created: 2026-04-15
updated: 2026-04-15
type: entity
tags: [llm, tool, open-source]
sources: [raw/articles/ai-game-devtools/wordgpt.md]
---

# WordGPT

## Overview

WordGPT integrates OpenAI's `text-davinci-003` language model directly into Microsoft Word as an Office add-in. Users enter a prompt, generate text via the OpenAI API, and insert the result directly into the document or copy it to clipboard.

## Key Facts

| | |
|---|---|
| **Author** | Filippo Finke |
| **License** | MIT |
| **Framework** | Office Add-in (Office.js / Word JavaScript API) |
| **Frontend** | React 17 + TypeScript |
| **Model** | `text-davinci-003` (completion endpoint) |
| **UI Library** | Microsoft Fluent UI (`@fluentui/react`) |
| **Build** | Webpack 5 + Babel |
| **API Client** | OpenAI SDK v3 (`openai` npm package) |

## Architecture

WordGPT is a standard Office add-in with two entry points:
- **Taskpane** (`src/taskpane/`): React app with Fluent UI — prompt input, generate button, insert/copy actions
- **Commands** (`src/commands/`): Ribbon button handler via Office add-in commands

The core flow in `App.tsx`:
1. User enters prompt in a multiline TextField
2. `openai.createCompletion({ model: "text-davinci-003", prompt, max_tokens: 1024, temperature: 0.7 })` calls the API
3. Generated text displayed; "Insert text" calls `Word.run()` + `context.document.getSelection().insertText()` to insert at cursor position

API key is stored in `localStorage` via the `Login` component.

## Deployment

Not listed on Microsoft Store — requires manual sideloading:
- **Windows:** Shared folder catalog (instructions linked to Microsoft docs)
- **macOS:** Download `manifest.xml` from the hosted URL, place in `~/Library/Containers/com.microsoft.Word/Data/Documents/wef/`

## Comparison to Related Tools

| Feature | WordGPT | [[chatgpt-api-unity]] | [[babyagi]] |
|---|---|---|---|
| **Platform** | Microsoft Word | Unity Editor | Agent framework |
| **LLM Model** | text-davinci-003 | Configurable (ChatGPT API) | Configurable |
| **Use Case** | Text generation in Word docs | In-editor chat for Unity C# | Autonomous task execution |
| **Framework** | Office Add-in (React/TypeScript) | Unity UPM package | Python |
| **License** | MIT | MIT | MIT |

WordGPT is distinct as the only Office add-in in the AI game devtools catalog — it targets productivity workflows rather than game development directly. Unlike [[chatgpt-api-unity]] which brings ChatGPT into the Unity editor for code assistance, WordGPT focuses on document text generation.

## Related Links

- [GitHub](https://github.com/filippofinke/WordGPT)
- [Author website](https://filippofinke.ch)
- [Microsoft Office Add-in Sideloading Docs](https://learn.microsoft.com/en-us/office/dev/add-ins/testing/sideload-office-add-ins-for-testing)
