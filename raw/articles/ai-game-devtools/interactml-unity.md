# InteractML Unity — Source

**URL:** https://github.com/Interactml/iml-unity
**Name:** InteractML
**Category:** LLM (LLM & Tool)
**Cloned:** 2026-04-14
**Source repo:** ~/tmp/ai-game-devtools/interactml-unity/

## README Summary

InteractML is an Unity3D plugin that enables developers to configure, train, and use Interactive Machine Learning (IML) systems within the Unity game editor. Using visual scripting, developers can:
- Visualise incoming data
- Configure game inputs (extracting data from sensors/objects)
- Train and refine ML models in realtime with iterative training examples
- Connect ML model outputs (real-time predictions) to other game objects/scripts

### Key Features
- Lightweight ML models: Classification, Regression, Dynamic Time Warping
- Node visual scripting interface (built on xNode)
- Extensible: code your own nodes
- Integration with any script to pipe data in/out
- Supported from Unity 5.3+
- Windows/Mac full support

### ML Algorithms (via RapidLib backend)
- **Classification:** kNN algorithm
- **Regression:** Multilayer Perceptron (MLP) with one hidden layer
- **DTW:** Dynamic Time Warping for time-series gesture classification

### Dependencies
- **xNode** — visual node graph framework for Unity
- **JsonNetForUnity** — JSON/BSON serialization
- **RapidLib** — C++ ML library (kNN, MLP, DTW)

### Limitations
- Beta stage
- Only Windows/Mac tested

## Package Info (package.json)
```json
{
  "name": "com.github.interactml.iml-unity",
  "version": "0.1.8",
  "unity": "2019.2",
  "displayName": "InteractML",
  "keywords": ["machine learning", "unity", "interactive machine learning", "sensors", "node"]
}
```

## Project Structure
```
Assets/
├── InteractML/                  # Core plugin
│   ├── Scripts/
│   │   ├── IML Controllers/     # IMLGraph, IMLComponent — graph-based IML orchestration
│   │   ├── IML Nodes/           # Node definitions for the visual scripting graph
│   │   ├── IML Logic/           # Core logic for ML operations
│   │   ├── Input/               # VRInputManager, ControllerBinding, handlers
│   │   ├── RapidLib/            # RapidLib C++ binding (DLL wrapper)
│   │   └── PropertyAttributes/   # Unity custom property attributes
│   ├── Dependencies/            # xNode, JsonDotNet, SerializableDictionary
│   └── Plugins/                 # Native DLLs (RapidLib .dll/.dylib)
├── InteractML_Examples/         # Example scenes and scripts
│   ├── Mouse_Input/             # Mouse-based classification/regression examples
│   ├── Arduino/                  # BLE/NanoConnect examples
│   └── Scripts/                 # Bridge scripts (IMLOutputToMalbersInput, etc.)
└── ART/                         # Icons and artwork
```

## Key Files
- `IMLGraph.cs` — ScriptableObject NodeGraph subclass; core data model for IML pipelines
- `RapidlibComponent.cs` — MonoBehaviour wrapping RapidLib DLL; exposes training/inference
- `RapidlibModel.cs` — Model serialization and management
- `VRInputManager.cs` — VR controller input handling for XR interactions
- `IMLGraphEditor.cs` — Custom editor for IML graphs in Unity Editor

## Installation Methods
1. Git submodule: `git submodule add -b master https://github.com/Interactml/iml-unity.git Assets/iml-unity`
2. Sparse checkout for no-examples: `git sparse-checkout set Assets`
3. Current recommended: clone master or VRInterface branch directly

## Relationship to RapidLib
RapidLib (https://github.com/mzed/RapidLib) is the C++ ML backend. It mirrors Wekinator algorithms, proven for small training sets and human motion modeling. RapidLib DLLs are in Assets/Plugins/.
