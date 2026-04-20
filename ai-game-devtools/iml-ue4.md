---
title: InteractML-Unreal Engine
created: 2026-04-14
updated: 2026-04-14
type: entity
tags: [tool, game-engine, open-source, unreal]
sources: [raw/articles/ai-game-devtools/iml-ue4.md]
---

# InteractML-Unreal Engine

## Overview

**InteractML Unreal Engine** (`Interactml/iml-ue4`) is an Unreal Engine 4/5 C++ plugin that brings Interactive Machine Learning to UE via native Blueprint nodes. Developers create ML models by wiring Blueprint nodes together, feeding them from any in-engine parameters, and using outputs to drive gameplay, visuals, or control schemes — no code required.

Unlike cloud-based LLM integrations (e.g., [[chatgpt-api-unity]]), InteractML runs lightweight ML models **on-device** at runtime. Models can be trained in-editor using visual node scripting, then deployed for realtime inference during gameplay.

## Key Facts

| Attribute | Detail |
|-----------|--------|
| **License** | MIT |
| **Engine Versions** | UE 4.26, 4.27, 5.0 |
| **Platform** | Win64 |
| **Status** | Beta (IsBetaVersion + IsExperimentalVersion in .uplugin) |
| **ML Backend** | [RapidLib](https://github.com/mzed/RapidLib) (C++ kNN/MLP/DTW) |
| **Node Framework** | Native UE Blueprint nodes |
| **Source** | https://github.com/Interactml/iml-ue4 |

## Machine Learning Capabilities

Three ML algorithm families via RapidLib (mirrors Wekinator algorithms):

### Classification (kNN)
- k-Nearest Neighbors for discrete label prediction
- Suitable for gesture recognition, pose classification, object identification from sensor streams

### Regression (MLP)
- Single-hidden-layer Multilayer Perceptron
- Continuous value prediction: steering angles, animation blend weights, dynamic difficulty scaling

### Dynamic Time Warping (DTW)
- Time-series classification for temporal gestures
- Recognizes gestures varying in speed or duration — ideal for motion-based game inputs

## Architecture

```
InteractMLModule (Runtime, Win64)
├── FInteractMLModule           — IModuleInterface, Tick-based async task system
│   ├── Task Queue              — PendingTasks / CompletedTasks (thread-safe)
│   ├── Storage Catalog          — TMap<FString, TWeakObjectPtr<UInteractMLStorage>>
│   └── Path-based Object Lookup — GetTrainingSet(), GetModel()
│
├── UInteractMLModel (BlueprintType base class)
│   ├── UInteractMLClassificationModel  — RapidLib classificationFloat
│   ├── UInteractMLRegressionModel     — RapidLib regressionFloat, IsContinuous=true
│   └── UInteractMLDynamicTimeWarpModel — RapidLib seriesClassificationFloat
│       └── Stores FInteractMLExample array for DTW matching
│
├── UInteractMLTrainingSet      — Training data container
├── UInteractMLLabelTable       — Label definitions
├── UInteractMLParameters       — Input/output parameter definitions
├── UInteractMLStorage          — JSON serialization for models/datasets
└── UInteractMLContext          — Runtime inference context

InteractMLScriptingModule (UncookedOnly, Win64)
└── Blueprint Nodes — Parameter, Recording, Training nodes

InteractMLEditorModule (Editor, Win64)
└── Editor tooling, debugging views
```

## Comparison with Similar Tools

| Feature | [[iml-ue4]] | [[interactml-unity]] | [[chatgpt-api-unity]] |
|---------|-------------|----------------------|-----------------------|
| Engine | Unreal Engine 4/5 | Unity3D | Unity3D |
| ML Type | On-device, realtime | On-device, realtime | Cloud LLM API |
| Training | In-editor Blueprint | In-editor xNode | Pre-trained only |
| Algorithms | kNN, MLP, DTW | kNN, MLP, DTW | GPT-family |
| No Internet Required | ✅ | ✅ | ❌ |
| Platform | Win64 | Windows, Mac | Cross-platform |
| Node System | Native UE Blueprint | xNode | N/A |

## Installation

### Option 1: Pre-built Binaries (fastest)
Download from Google Drive links in [`dl_links.md`](dl_links.md):
- UE 4.26: [Google Drive link](https://drive.google.com/file/d/1-KTM9Z-E14U-LpzdRTecf47D280XyvZ8/view)
- UE 4.27: [Google Drive link](https://drive.google.com/file/d/1ePi2Px_MxccUiOoikEWsadBcN1lFITKt/view)
- UE 5.0: [Google Drive link](https://drive.google.com/file/d/13nuy_iRrXWpdoCKnR0qh_MDaRTvF5OZM/view)

### Option 2: Build from Source
```bash
# Clone the repo
git clone https://github.com/Interactml/iml-ue4.git
# Use Tools/build.cmd to compile
```

## Relationship to iml-unity

InteractML-UE4 and [[interactml-unity]] share the same RapidLib ML backend and algorithm families (Classification/Regression/DTW), but target different engines:

| Dimension | [[iml-ue4]] | [[interactml-unity]] |
|-----------|-------------|----------------------|
| Node System | Native UE Blueprint | xNode (Unity) |
| Module Structure | 3 C++ modules (Runtime/Scripting/Editor) | MonoBehaviour + DLL |
| Platform | Win64 | Windows, Mac |
| Binary Delivery | Pre-built + source | Source via git submodule |

## Related Links

- GitHub: https://github.com/Interactml/iml-ue4
- Docs/Wiki: https://github.com/Interactml/iml-ue4/wiki
- RapidLib backend: https://github.com/mzed/RapidLib
- [[interactml-unity]] — Unity counterpart
- [[chatgpt-api-unity]] — Cloud LLM alternative for Unity
