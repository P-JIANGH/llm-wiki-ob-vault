# GLM-4.5 (GLM-4.5 / GLM-4.6 / GLM-4.7)

Source: https://github.com/zai-org/GLM-4.5

## GLM-4.5 Series Overview

GLM-4.5 是智谱AI（THUDM）开发的智能Agent基础模型系列，具有以下特点：

- **GLM-4.5**: 355B 总参数，32B 激活参数，混合推理模型
- **GLM-4.5-Air**: 106B 总参数，12B 激活参数，更紧凑设计
- 统一推理、编码和智能Agent能力

### 核心特性

- **混合推理模式**：Thinking Mode（复杂推理+工具调用）和 Non-Thinking Mode（快速响应）
- **工具使用能力**：显著提升 Tool calling 性能（τ^2-Bench、Web浏览）
- **复杂推理**：HLE benchmark 42.8%（+12.4% vs GLM-4.6）
- **SWE-bench**: 73.8% (+5.8%)
- **SW-bench Multilingual**: 66.7% (+12.9%)
- **Terminal Bench 2.0**: 41% (+16.5%)

### GLM-4.7 新增特性

- **Interleaved Thinking**: 每个响应和工具调用前进行思考
- **Preserved Thinking**: 代码Agent场景保留所有思考块，跨会话复用
- **Turn-level Thinking**: 支持按轮次控制推理开关

### 模型下载

| Model | Precision | Params |
|-------|-----------|--------|
| GLM-4.7 | BF16 | 355B-A32B |
| GLM-4.7-FP8 | FP8 | 355B-A32B |
| GLM-4.7-Flash | BF16 | 30B-A3B |
| GLM-4.6 | BF16 | 355B-A32B |
| GLM-4.5 | BF16 | 355B-A32B |
| GLM-4.5-Air | BF16 | 106B-A12B |

### 推理框架支持

- **vLLM**: `--tool-call-parser glm47 --reasoning-parser glm45`
- **SGLang**: `--tool-call-parser glm47 --reasoning-parser glm45`
- **Transformers**: 官方支持

### 许可证

MIT 开源许可证，可商业使用。

## 与 GLM-4 的区别

- GLM-4.5 引入混合推理（Thinking/Non-Thinking 双模式）
- GLM-4.5 专注于 Agent 场景，支持工具调用和推理解析
- GLM-4.6 扩展上下文窗口至 200K（GLM-4.5 为 128K）
- GLM-4.7 在编码、推理、工具使用上有大幅提升
