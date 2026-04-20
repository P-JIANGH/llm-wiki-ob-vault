---
title: InteractML-Unity
created: 2026-04-14
updated: 2026-04-14
type: entity
tags: [tool, game-engine, open-source, unity]
sources: [raw/articles/ai-game-devtools/interactml-unity.md]
---

# InteractML-Unity

## Overview

**InteractML** (Interactml/iml-unity) is a Unity3D plugin that enables developers to configure, train, and deploy Interactive Machine Learning (IML) models directly within the Unity editor — no external ML infrastructure required. It targets game developers, designers, and artists who want to add adaptive, player-responsive behavior without writing traditional ML code.

Unlike API-based LLM integrations (e.g., [[chatgpt-api-unity]]), InteractML runs lightweight ML models **on-device** at runtime, including during gameplay. Models can be trained and refined in realtime using visual node scripting.

## Key Facts

| Attribute | Detail |
|-----------|--------|
| **License** | Open source (MIT) |
| **Version** | 0.1.8 |
| **Unity Version** | 2019.2+ (supports from 5.3) |
| **Platform** | Windows, Mac |
| **ML Backend** | [RapidLib](https://github.com/mzed/RapidLib) (C++ kNN/MLP/DTW) |
| **Node Framework** | [xNode](https://github.com/Siccity/xNode) |
| **Status** | Beta |

## Machine Learning Capabilities

InteractML implements three ML algorithm families via RapidLib (which mirrors Wekinator algorithms):

### Classification (kNN)
- k-Nearest Neighbors for discrete label prediction
- Suitable for gesture recognition, object classification from sensor data

### Regression (MLP)
- Single-hidden-layer Multilayer Perceptron
- Continuous value prediction (e.g., steering angles, animation blend weights)

### Dynamic Time Warping (DTW)
- Time-series classification for temporal gestures
- Recognizes gestures even when they vary in speed or duration

## Architecture

```
IMLGraph (NodeGraph)
  ├── Input Nodes      → Game objects, sensors, VR controllers
  ├── IML Nodes        → Feature extraction, model training, prediction
  └── Output Nodes     → Game object responses, animation parameters
```

- **IMLGraph** — ScriptableObject graph asset; orchestrates the IML pipeline
- **RapidlibComponent** — MonoBehaviour; wraps RapidLib C++ DLL for training/inference
- **VRInputManager** — Handles VR controller bindings for XR-based IML input
- **IML Nodes** — Visual scripting nodes built on xNode for graph-based configuration

Data flows: Game Input → Feature Extraction → Model Training/Prediction → Game Object Response. All configured via node graph, no code required.

## Comparison with Similar Tools

| Feature | InteractML | [[chatgpt-api-unity]] | [[hugging-face-api-unity-integration]] |
|---------|-----------|------------------------|----------------------------------------|
| ML Type | On-device, realtime | Cloud LLM API | Cloud transformer API |
| Training | In-editor + in-game | No (pre-trained) | No (pre-trained) |
| Algorithms | kNN, MLP, DTW | GPT-family | BERT/CLIP/SentenceTransformers |
| No Internet | ✅ Full | ❌ | ❌ |
| Unity Version | 2019.2+ | Varies | Varies |
| Visual Scripting | ✅ xNode-based | ❌ | ❌ |

## Installation

```bash
# As git submodule
git submodule add -b master https://github.com/Interactml/iml-unity.git Assets/iml-unity
cd Assets/iml-unity
git sparse-checkout init --cone
git sparse-checkout set Assets   # skip examples
```

Current releases are outdated; clone master or VRInterface branch directly.

## Related Links

- GitHub: https://github.com/Interactml/iml-unity
- Wiki/Docs: https://github.com/Interactml/iml-unity/wiki
- RapidLib backend: https://github.com/mzed/RapidLib
- xNode dependency: https://github.com/Siccity/xNode
- Related UE plugin: [[iml-ue4]] (InteractML for Unreal Engine 4)
