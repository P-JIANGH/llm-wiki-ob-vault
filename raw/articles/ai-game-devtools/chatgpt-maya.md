# chatGPT-maya — Raw Source

**Source:** https://github.com/LouisRossouw/chatGPT-maya
**Captured:** 2026-04-18
**Method:** Git clone --depth 1

## README Summary

A simple tool that generates Maya Python code via OpenAI ChatGPT API and executes it directly in Maya. Works best for simple automation tasks when users communicate logically and break down steps. Complicated requests don't work well.

**Setup:**
1. Navigate to `Program Files\Autodesk\Maya20**\bin`
2. Run `mayapy -m pip install openai` to install openai package into Maya
3. Get API key from https://platform.openai.com/account/api-keys
4. Copy the script into Maya script editor
5. Set API key via `OPENAI_API_KEY` environment variable or directly in code (not recommended)

## Code Analysis

**File:** `ChatGPT_Maya.py` (174 lines)

**Architecture:**
- Single class `ChatChatAI` with Maya cmds UI
- Uses legacy `openai.Completion.create()` API (text-davinci-003 engine — now deprecated)
- Three main actions: Run (exec via `exec()`), Show Script (display in UI), Save Script (write to `MAYA_SCRIPT_PATH`)

**Key Components:**
| Component | Description |
|-----------|-------------|
| `ChatChatAI.__init__` | UI config, OpenAI settings (ENGINE=text-davinci-003, TEMP=0.5, MAX_TOKENS) |
| `return_openai()` | Calls OpenAI Completion API with prompt prefix "write maya python code with no instructions that: " |
| `push_button_run()` | Executes generated code via Python `exec()` — direct code injection |
| `push_button_show()` | Displays generated code in a Maya window |
| `push_button_save()` | Saves code to `maya_ai_gengen.py` in first `MAYA_SCRIPT_PATH` directory |
| `main_ui()` | Maya cmds UI: text field input, progress bar, 3 buttons (Run/Show/Save) |

**Technical Details:**
- Uses `maya.cmds` for UI (cmds.window, cmds.columnLayout, cmds.textField, cmds.button, cmds.progressBar)
- API key from `os.getenv("OPENAI_API_KEY")`
- Prompt engineering: prefixes user input with "write maya python code with no instructions that: "
- Uses `exec(response)` to run generated code — potential security risk
- `os.startfile()` to open scripts directory after save (Windows-only)
- No error handling for API failures or malformed responses
- No conversation history — each request is independent

**Limitations noted by author:**
- Complicated requests don't work
- Simple automation tasks work with logical step-by-step communication
- Uses deprecated text-davinci-003 model (GPT-3 era)
- No streaming support
- No code validation before execution
