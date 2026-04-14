# WordGPT — Raw Source

> Ingested: 2026-04-15
> Source: https://github.com/filippofinke/WordGPT

## README Summary

WordGPT integrates OpenAI's `text-davinci-003` language model directly into Microsoft Word as an Office add-in. Users can enter a prompt and generate text, then insert it into the document or copy it to clipboard.

### Getting Started
- Sideload the add-in into Word (Windows: shared folder catalog; macOS: ~/Library/Containers/com.microsoft.Word/Data/Documents/wef)
- No Microsoft Store listing — manual sideloading required

### Key Features
- Prompt-based text generation via OpenAI `text-davinci-003`
- Insert generated text directly into Word document at cursor
- Copy to clipboard option
- API key stored in localStorage

## package.json

```json
{
  "name": "wordgpt",
  "version": "0.0.1",
  "license": "MIT",
  "dependencies": {
    "@fluentui/react": "^8.52.3",
    "openai": "^3.1.0",
    "react": "^17.0.2",
    "react-dom": "^17.0.2"
  }
}
```

## Architecture

- **Framework:** Office Add-in (Office.js / Word JavaScript API)
- **Frontend:** React 17 + TypeScript
- **Build:** Webpack 5 + Babel
- **UI:** Microsoft Fluent UI React components
- **API Client:** OpenAI SDK v3 (`openai` npm package)
- **Target Model:** `text-davinci-003` (completion endpoint)
- **Deployment:** Sideload via `manifest.xml` (Office Add-in manifest format)

## Core Source Files

### src/taskpane/components/App.tsx
Main component: manages API key state, prompt input, text generation, insert/copy actions.
- `openai.createCompletion({ model: "text-davinci-003", prompt, max_tokens: 1024, temperature: 0.7 })`
- `Word.run()` + `context.document.getSelection().insertText()` to insert at cursor

### src/taskpane/components/Login.tsx
Simple API key input form, saves to localStorage.

### src/commands/commands.ts
Office add-in command handler (notification on ribbon button click).

## License
MIT

## Author
Filippo Finke — https://filippofinke.ch
