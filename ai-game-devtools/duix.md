---
title: Duix Mobile — 移动端实时交互式 AI Avatar SDK
created: 2026-04-18
updated: 2026-04-18
type: entity
tags: [tool, open-source, avatar, ai, multimodal, audio]
sources: [raw/articles/ai-game-devtools/duix.md]
---

# Duix Mobile

duix.com 开源的移动端（Android/iOS）实时交互式 AI Avatar SDK，支持设备端完全离线部署。

## 概览

- **GitHub:** https://github.com/GuijiAI/duix.ai
- **官网:** www.duix.com
- **许可:** Duix.com Community License（<1000 MAU 免费，超过需商业授权，需标注 "Powered by Duix.com"）
- **Android SDK 版本:** 4.0.1
- **iOS SDK 版本:** 1.2.3.1

## 核心特性

### 跨平台支持
Android 10+ / iOS 12+ / 平板 / 车载 / VR / IoT / 大屏交互，一套 API 覆盖多种终端形态。

### 全离线运行
核心推理完全在设备端执行，无需联网。使用 NCNN（腾讯高性能推理框架）+ ONNX 格式模型，确保低延迟和隐私安全。

### 超低延迟
在骁龙 8 Gen 2 上 Avatar 响应延迟 <120ms，达到毫秒级流畅交互。

### 流式音频驱动
- 支持 PCM 流式推送（16kHz/16bit/Mono），合成与播放同步进行
- 支持打断（barge-in），让 AI Avatar 表现更"人性化"
- 同时支持 WAV 文件播放

### 动作控制
模型附带 `SpecialAction.json` 标记动作片段，支持：
- 播放特定动作（如问候、挥手）
- 随机播放动作片段
- 动作-音频联动

### 模块化架构
开发者可自由集成自己的 LLM、ASR、TTS 服务，SDK 仅负责 Avatar 渲染和口型驱动。

## 技术架构

### Android 端

| 组件 | 说明 |
|------|------|
| DUIX | 数字人主控制对象，集成模型加载、渲染、广播、动作控制 |
| RenderSink | 渲染数据接收接口，SDK 提供默认实现也可自定义 |
| DUIXRenderer + DUIXTextureView | 基于 OpenGL ES 的默认渲染组件，支持透明度 |
| VirtualModelUtil | 模型下载与管理工具 |

**硬件要求:** 8 核以上 CPU（骁龙 8 Gen 2）、8GB+ 内存、1GB+ 存储空间、armeabi-v7a/arm64-v8a

### iOS 端

| 组件 | 说明 |
|------|------|
| GJLDigitalManager | 本地渲染和驱动管理器 |
| GJLPCMManager | PCM 音频流管理 |
| GJLocalDigitalSDK.framework | SDK 框架（需 Embed & Sign） |

**硬件要求:** iPhone 8+、A12+ 芯片推荐、≥3GB RAM

### 统一工作流

```
检查配置与模型 → 构建 DUIX 实例 → 异步初始化 → 展示 Avatar → PCM/WAV 音频驱动 → 播放控制与动作触发 → 资源释放
```

## 公开 Avatar 模型

提供 4 个免费 Avatar 模型（Leo、Oliver、Sofia、Lily），可直接下载使用。定制 Avatar 需通过 email 联系，通常提供 15 秒~2 分钟视频即可。

## 与同类工具的差异

| 维度 | Duix Mobile | [[chatdollkit]] | [[ditto-talkinghead]] |
|------|------------|--------------------------------|--------------------------------------|
| 平台 | Android/iOS 原生 SDK | Unity 全平台 | Python/云服务 |
| 部署方式 | 完全离线设备端 | Unity 运行时 | 云端 API |
| 渲染引擎 | OpenGL ES (GLES) | Unity 3D | 自研渲染 |
| 推理框架 | NCNN + ONNX | 依赖 LLM API | 自研模型 |
| 音频驱动 | PCM 流式 + WAV | 多 TTS Provider | 自研语音 |
| 动作系统 | SpecialAction.json | Animator + VRM 表情 | 有限 |
| 许可 | Community License（MAU 限制） | MIT | 商业许可 |
| 定制化 | email 申请（视频素材） | 任意 VRM 模型 | 需训练 |

## 应用场景

- 智能客服 / 虚拟医生 / 虚拟律师
- 大屏交互终端（政府大厅、银行、机场）
- 弱网/无网环境部署
- AI 伴侣 / 虚拟导师

## 生态项目

- **Duix.com** — 云端 AI Avatar 服务
- **`ai-game-devtools/duix-avatar`** (待创建) — 开源 AI Avatar 视频制作
- **`ai-game-devtools/duix-reface`** (待创建) — 实时高保真换脸引擎

## 相关链接

- GitHub: https://github.com/GuijiAI/duix.ai
- 官网: https://www.duix.com
- 定制咨询: support@duix.com
