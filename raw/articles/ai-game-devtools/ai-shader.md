# AI Shader — keijiro/AIShader

**Source:** https://github.com/keijiro/AIShader
**Extracted:** 2026-04-18 (web extract; GitHub/gitcode/gitee clone all failed)

## README Content

This is a proof-of-concept implementation of a ChatGPT-powered shader generator for Unity.

### How to try it
- Generate an API key on the [OpenAI account page](https://platform.openai.com/account/api-keys)
- Set it on the Project Settings page (Edit > Project Settings > AI Shader > API Key)

### CAUTION
- The API key is stored in `UserSettings/AIShaderSettings.asset`
- Must exclude the directory when sharing your project with others

### Repository Structure
```
AIShader/
├── Assets/           # Unity project assets (scripts, scenes, materials)
├── Packages/         # Unity Package Manager packages
├── ProjectSettings/  # Unity project settings
├── .gitattributes
├── .gitignore
└── README.md
```

- **Commits:** 10
- **Key files:** Assets/ directory contains the shader generator scripts
- **Demo:** Includes a GIF showing natural language → shader generation workflow

## Key Facts
- **Author:** keijiro (Japanese Unity plugin developer, known for UnityMLStableDiffusion, AICommand)
- **Type:** Unity proof-of-concept tool
- **AI Backend:** ChatGPT API (OpenAI)
- **Output:** GLSL/HLSL shader code generated from natural language prompts
- **License:** MIT (inferred — consistent with keijiro's other projects)
- **Status:** Proof-of-concept, minimal repository (10 commits)
