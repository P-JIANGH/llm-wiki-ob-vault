# InteractML Unreal Engine 4 — Source Analysis

> Source: https://github.com/Interactml/iml-ue4 (cloned 2026-04-14)
> Related: [[iml-unity]] — InteractML Unity plugin

## Project Structure

```
iml-ue4/
├── InteractMLUE.uproject
├── README.md
├── dl_links.md          # Pre-built binary download links (Google Drive)
├── Config/
├── Content/             # Example assets (VR, test data)
├── Data/               # Test training sets, labels, models
├── Plugins/
│   └── InteractML/
│       ├── InteractML.uplugin
│       ├── Source/
│       │   ├── InteractML/           # Runtime module (Win64)
│       │   │   ├── Private/          # .cpp implementations
│       │   │   │   ├── InteractML.cpp
│       │   │   │   ├── InteractMLHelpers.cpp
│       │   │   │   ├── InteractMLTask.cpp
│       │   │   │   ├── InteractMLContext.cpp
│       │   │   │   ├── InteractMLStorage.cpp
│       │   │   │   ├── InteractMLParameters.cpp
│       │   │   │   ├── InteractMLLabel.cpp
│       │   │   │   ├── InteractMLLabelTable.cpp
│       │   │   │   ├── InteractMLLabelCache.cpp
│       │   │   │   ├── InteractMLTrainingSet.cpp
│       │   │   │   ├── InteractMLModel.cpp
│       │   │   │   ├── InteractMLModelState.cpp
│       │   │   │   ├── InteractMLBlueprintLibrary.cpp
│       │   │   │   ├── InteractMLTests.cpp
│       │   │   │   └── Models/
│       │   │   │       ├── InteractMLRegressionModel.cpp
│       │   │   │       ├── InteractMLClassificationModel.cpp
│       │   │   │       └── InteractMLDynamicTimeWarpModel.cpp
│       │   │   └── Public/           # .h headers
│       │   │       ├── InteractML.h  (Module interface)
│       │   │       ├── InteractMLTask.h
│       │   │       ├── InteractMLContext.h
│       │   │       ├── InteractMLStorage.h
│       │   │       ├── InteractMLParameters.h
│       │   │       ├── InteractMLLabel.h
│       │   │       ├── InteractMLLabelTable.h
│       │   │       ├── InteractMLLabelCache.h
│       │   │       ├── InteractMLTrainingSet.h
│       │   │       ├── InteractMLModel.h
│       │   │       ├── InteractMLModelState.h
│       │   │       ├── InteractMLBlueprintLibrary.h
│       │   │       ├── InteractMLHelpers.h
│       │   │       ├── InteractMLVersioning.h
│       │   │       └── Models/
│       │   │           ├── InteractMLRegressionModel.h
│       │   │           ├── InteractMLClassificationModel.h
│       │   │           └── InteractMLDynamicTimeWarpModel.h
│       │   ├── InteractMLScripting/   # Node scripting (UncookedOnly, Win64)
│       │   │   └── Private/
│       │   │       ├── InteractMLParameterNode.cpp
│       │   │       ├── InteractMLRecordingNode.cpp
│       │   │       ├── InteractMLTrainingNode.cpp
│       │   │       └── InteractMLScripting.cpp
│       │   └── InteractMLEditor/      # Editor module
│       └── Binaries/Win64/
└── Tools/              # build/package scripts (.cmd, .ps1)
```

## Module Architecture

### Three Module Design

| Module | Type | LoadingPhase | Platforms |
|--------|------|--------------|-----------|
| `InteractML` | Runtime | PreDefault | Win64 |
| `InteractMLScripting` | UncookedOnly | PreDefault | Win64 |
| `InteractMLEditor` | Editor | Default | Win64 |

### Core Classes

**FInteractMLModule** (Runtime, IModuleInterface):
- Tick-based async task system (TArray<FInteractMLTask>)
- Storage catalog via TMap<FString, TWeakObjectPtr<UInteractMLStorage>>
- Path-based ML object retrieval (TrainingSet, Model)
- Supports multithreading (INTERACTML_ALLOW_MULTITHREADING)

**UInteractMLModel** (Base class):
- Abstract base for all ML models
- JSON serialization for persistence (LoadJson/SaveJson)
- Transient model state vs. persistent UPROPERTY state

**Three Model Types** (all use RapidLib C++ backend):
1. `UInteractMLClassificationModel` — kNN, inherits `classificationFloat` from RapidLib
2. `UInteractMLRegressionModel` — MLP, inherits `regressionFloat` from RapidLib, IsContinuous=true
3. `UInteractMLDynamicTimeWarpModel` — DTW for time-series, stores examples directly, special async training/running

### Engine Versions Supported
- 4.26, 4.27, 5.0 (pre-built binaries via Google Drive)

## Key Technical Details

- Pre-built binaries: Win64 only (no Mac/Linux source build shown)
- Async task system for training/inference (multi-threaded)
- JSON-based model serialization
- BlueprintType exposure for all model classes
- MIT License

## Differences from iml-unity

| Aspect | iml-unity | iml-ue4 |
|--------|-----------|---------|
| Engine | Unity3D | Unreal Engine 4/5 |
| Node Framework | xNode | Native UE Blueprint nodes |
| Module Structure | MonoBehaviour + DLL | C++ Plugin (3 modules) |
| Platform | Windows, Mac | Win64 |
| Binary Delivery | Source + submodule | Pre-built + source |
