# AICommand Source Analysis

**GitHub:** https://github.com/keijiro/AICommand  
**Author:** keijiro (Unity Technologies Japan)  
**License:** Unlicense (Public Domain)  
**Analysis Date:** 2026-04-23

---

## Project Overview

AICommand is a proof-of-concept Unity Editor integration of ChatGPT that allows controlling the Unity Editor using natural language prompts. The tool generates Unity Editor scripts from natural language descriptions and executes them immediately.

> **Author's Note:** "Definitely no! I created this proof-of-concept and proved that it doesn't work yet. It works nicely in some cases and fails very poorly in others."

## System Requirements

- Unity 2022.2 or later
- OpenAI API key

## Architecture

### Core Files

| File | Purpose |
|------|---------|
| `Assets/Editor/OpenAI.cs` | OpenAI API data structures (Request/Response/Message) |
| `Assets/Editor/OpenAIUtil.cs` | UnityWebRequest wrapper for OpenAI API calls |
| `Assets/Editor/AICommandWindow.cs` | Main EditorWindow with prompt input and Run button |
| `Assets/Editor/AICommandSettings.cs` | ScriptableSingleton for API key storage + SettingsProvider |

### How It Works

1. User enters natural language prompt in Editor window (e.g., "Create 100 cubes at random points")
2. Prompt is wrapped with system instructions via `WrapPrompt()`:
   - "Write a Unity Editor script"
   - Must provide functionality as "Edit" > "Do Task" menu item
   - No editor window, executes immediately
   - Don't use GameObject.FindGameObjectsWithTag
   - Find game objects manually (no selected object)
   - Return only script body, no explanations
3. Wrapped prompt sent to OpenAI chat completions API
4. Generated C# code saved to `Assets/AICommandTemp.cs`
5. Assembly reload triggers execution via `Edit/Do Task` menu item
6. Temp file deleted after execution

### Key Technical Details

**API Configuration:**
- Endpoint: `https://api.openai.com/v1/chat/completions`
- API key stored in `UserSettings/AICommandSettings.asset` (excluded from version control)
- Configurable via Project Settings (Edit > Project Settings > AI Command)

**Code Execution Flow:**
```csharp
// 1. Generate code from prompt
var code = OpenAIUtil.InvokeChat(WrapPrompt(_prompt));

// 2. Create temp script asset
CreateScriptAsset(code);  // Uses ProjectWindowUtil.CreateScriptAssetWithContent

// 3. After assembly reload, execute and cleanup
EditorApplication.ExecuteMenuItem("Edit/Do Task");
AssetDatabase.DeleteAsset(TempFilePath);
```

**Reflection Usage:**
Uses `BindingFlags.Static | BindingFlags.NonPublic` to access internal Unity method `ProjectWindowUtil.CreateScriptAssetWithContent`.

## Limitations (From Author)

- **Not practical for production use**
- ChatGPT often fails to implement commands correctly
- May require multiple attempts by repeatedly pressing "Run"
- Trial period/billing issues common (NullReferenceException usually means expired trial)

## Comparison with Similar Projects

| Project | Scope | Platform |
|---------|-------|----------|
| AICommand | Unity Editor scripting | Unity Editor only |
| AIShader (keijiro) | GLSL shader generation | Unity |
| BlenderGPT | Blender Python scripting | Blender |
| Open Interpreter | General system automation | Cross-platform |

## Game Development Use Cases

- Rapid prototyping of editor automation
- Generate batch operations (e.g., "select all lights and increase intensity by 50%")
- Create editor utilities without manual scripting
- Experimental AI-assisted content pipeline

## Installation

No package manager support. To try:
1. Copy `Assets/Editor` directory to your project
2. Set OpenAI API key in Project Settings
3. Open via Window > AI Command

## Code Samples

### OpenAI Request Structure
```csharp
public struct Request
{
    public string model;
    public RequestMessage[] messages;
}

public struct RequestMessage
{
    public string role;
    public string content;
}
```

### Prompt Wrapping
```csharp
static string WrapPrompt(string input)
  => "Write a Unity Editor script.\n" +
     " - It provides its functionality as a menu item placed \"Edit\" > \"Do Task\".\n" +
     " - It doesn't provide any editor window..." +
     "The task is described as follows:\n" + input;
```

## Dependencies

- Unity 2022.2+
- OpenAI API account
- Unity modules: physics (minimal dependencies)

## Security Notes

- API key stored in `UserSettings/` directory
- Must exclude `UserSettings/` from version control
- No encryption of API key at rest
