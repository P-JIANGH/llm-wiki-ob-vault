---
title: vue-termui
created: 2026-05-06
updated: 2026-05-06
type: entity
tags: [tui, vue, typescript, framework, cli, terminal, rendering]
sources: [~/vue-termui/README.md, ~/vue-termui/packages/core/src/index.ts, ~/vue-termui/packages/core/src/app/createApp.ts, ~/vue-termui/packages/core/src/app/types.ts, ~/vue-termui/packages/core/src/renderer/index.ts, ~/vue-termui/packages/core/src/renderer/Output.ts, ~/vue-termui/packages/core/src/renderer/LogUpdate.ts, ~/vue-termui/packages/core/src/renderer/dom.ts, ~/vue-termui/packages/core/src/renderer/render.ts, ~/vue-termui/packages/core/src/focus/FocusManager.ts, ~/vue-termui/packages/core/src/composables/keyboard.ts, ~/vue-termui/packages/core/src/input/handling.ts, ~/vue-termui/packages/core/src/hmr/client.ts, ~/vue-termui/packages/core/src/hmr/messages.ts, ~/vue-termui/packages/vite-plugin-vue-termui/src/index.ts, ~/vue-termui/packages/core/package.json, ~/vue-termui/packages/playground/src/App.vue, ~/vue-termui/packages/playground/src/ShortcutsDemo.vue, ~/vue-termui/packages/playground/src/InputDemo.vue]
---

# vue-termui

Terminal User Interfaces powered by Vue.js. 构建 TUI 的 Vue 3 框架，用 Flexbox 布局 + Yoga 布局引擎将 Vue 组件渲染到终端。

**仓库：** [vue-terminal/vue-termui](https://github.com/vue-terminal/vue-termui) | **npm：** `vue-termui` | **License：** MIT

---

## 架构概览

```
┌─────────────────────────────────────────┐
│     Vite Dev Server + HMR (WebSocket)   │
│     vite-plugin-vue-termui               │
└────────────────┬────────────────────────┘
                 │ 终端渲染（单文件构建）
                 ↓
┌─────────────────────────────────────────┐
│  packages/core — vue-termui 核心库       │
│  ├── app/createApp.ts  — TuiApp 创建    │
│  ├── renderer/         — Yoga+Vue 渲染  │
│  ├── focus/            — FocusManager   │
│  ├── input/            — 键盘/鼠标处理 │
│  ├── composables/      — Vue Hooks      │
│  └── hmr/client.ts     — WS 热更新客户端│
└─────────────────────────────────────────┘
```

### monorepo packages

| Package | 用途 |
|---------|------|
| `packages/core` | 核心库（npm 发布为 `vue-termui`） |
| `packages/vite-plugin-vue-termui` | Vite 插件 + dev server HMR |
| `packages/cli` | CLI 工具 |
| `packages/playground` | 交互式 demo |
| `packages/xterm-playground` | xterm 集成 demo |
| `packages/domino` | 游戏 demo |
| `packages/create-vue-termui` | 项目脚手架 |
| `packages/docs` | 文档站 |

---

## 核心模块解析

### 1. 渲染引擎（packages/core/src/renderer/）

**三层渲染架构：**

```
Vue Component Tree
       ↓
DOMElement (packages/core/src/renderer/dom.ts)
  - TuiNode / DOMElement / TextNode / CommentNode
  - 每个节点持有 yogaNode (Yoga.Layout)
       ↓
Yoga Layout 计算（yoga-layout-prebuilt）
  - Flexbox 布局
  - setWidth / calculateLayout
       ↓
Output（packages/core/src/renderer/Output.ts）
  - 虚拟输出缓冲
  - 按 x/y 坐标写入字符
  - ansi-escapes 样式处理
       ↓
process.stdout / Writable Stream
```

**关键文件：**
- `renderer/dom.ts` — DOMElement/TextNode 实现，自定义 Virtual DOM 节点
- `renderer/render.ts` — `renderRoot()`：Yog a Layout 计算 + Output 生成
- `renderer/Output.ts` — 虚拟输出缓冲，按坐标写入，ANSI 样式应用
- `renderer/LogUpdate.ts` — 屏幕增量更新（`ansiEscapes.eraseLines`）
- `renderer/nodeOpts.ts` — Vue Renderer 接口实现（createElement/insert/patchProp 等）
- `renderer/renderNodeToOutput.ts` — 将 DOM 树递归写入 Output
- `renderer/renderBorders.ts` — 边框渲染

**渲染流程（renderRoot）：**
```typescript
node.yogaNode.setWidth(terminalWidth)
node.yogaNode.calculateLayout() // Yoga flexbox 计算
output = new Output({ width, height })
renderNodeToOutput(node, output, { skipStaticElements: true })
// staticNode 用于不变内容（背景/边框）分离渲染
```

### 2. TuiApp 创建（packages/core/src/app/createApp.ts）

**createApp(rootComponent, options)** 返回 TuiApp：

```typescript
createApp(App, {
  stdout: process.stdout,  // 默认
  stdin: process.stdin,   // 默认
  swapScreens: false,     // 全屏切换
}).mount({
  renderOnce: false,
  exitOnCtrlC: true,
})
// app.waitUntilExit() — 阻塞直到 exit
```

**mount 流程：**
1. `cliCursor.hide()` — 隐藏光标
2. `SAVE_SCREEN_BUFFER` — 全屏模式可选保存屏幕
3. 创建 `DOMElement('tui:root')` 作为挂载点
4. `createFocusManager(rootEl)` — 初始化焦点管理
5. `attachInputHandler(app, stdin, { setRawMode })` — 注入键盘/鼠标处理
6. `mount(rootEl)` — Vue 渲染器挂载

**Raw Mode 管理：**
- `stdin.setRawMode(true)` — 启用终端原始模式
- `ACTIVATE_MOUSE = '\x1b[?1000h\x1b[?1002h\x1b[?1005\x1b[?1006h'` — 启用鼠标追踪（1000/1002/1005/1006 模式）
- 引用计数：`rawModeEnableCount` 支持嵌套

**信号处理：**
- `onExit()` — 监听 SIGINT/SIGTERM，优雅退出
- `TuiError` — 封装退出码和信号

**WebSocket HMR（__DEV__ 模式）：**
```typescript
if (__DEV__) {
  import('../hmr').then(({ setupHMRSocket }) => {
    setupHMRSocket(newApp, stopApp)
  })
}
// 监听 ws://localhost:3000，接收 crash/restart 消息
```

### 3. FocusManager（packages/core/src/focus/FocusManager.ts）

**焦点管理系统**，支持 Tab/Shift+Tab 焦点导航：

```typescript
// Focusable 注册
focusManager._add(focusable)
focusManager._remove(focusable)

// 焦点操作
focusManager.focus(id)         // 聚焦指定元素
focusManager.focusNext()       // Tab 下一个
focusManager.focusPrevious()   // Shift+Tab 上一个
focusManager.trapFocus()       // 焦点陷阱（TODO）

// 焦点状态
activeElement: ShallowRef<Focusable | null>
```

**焦点树遍历：** 使用 `nextDeepSibling` / `previousDeepSibling` 做深度优先遍历，跳过非 focusable 元素，支持 cyclic 循环。

### 4. 输入处理（packages/core/src/input/handling.ts）

**attachInputHandler** 将 stdin 数据流分发给注册的 Vue 组件：

```
stdin.on('data', handleOnData)
  ↓
parseInputSequence(input) / SPECIAL_INPUT_KEY_TABLE
  ↓
Event 分发:
  isKeyDataEvent → keyEventMap.get(key).forEach(handler)
  isMouseDataEvent → mouseEventMap.get(type).forEach(handler)
  所有事件 → inputEventSet.forEach(handler)
```

**注入的 Symbols：**
- `KeyEventMapSymbol` — `Map<string, Set<KeyDataHandler>>`
- `MouseEventMapSymbol` — `Map<MouseEventType, Set<MouseDataHandler>>`
- `InputEventSetSymbol` — `Set<InputDataHandler>`

### 5. Composables（packages/core/src/composables/）

| Composable | 功能 |
|-----------|------|
| `onKeyData(key, handler)` | 键盘事件监听 |
| `onMouseData(type, handler)` | 鼠标事件监听 |
| `onInputData(handler)` | 原始输入监听 |
| `onResize(handler)` | 终端尺寸变化 |
| `useStdoutDimensions()` | 获取终端宽高 |
| `useTitle(title)` | 设置终端标题 |
| `useLog()` | 获取 log 实例（用于日志输出）|
| `useInterval(fn, ms)` | 定时器 |
| `useTimeout(fn, ms)` | 延时器 |
| `useFocus(id)` | 焦点状态 |
| `useFocusManager()` | FocusManager 实例 |
| `useStdout()` | stdout stream 访问 |

### 6. Vite 插件（packages/vite-plugin-vue-termui/src/index.ts）

**三个插件组合：**

1. **AutoImport** — 自动导入 vue-termui 的组合式 API（onKeyData / onMouseData / useLog 等）
2. **Components** — 自动解析 `<TuiBox>` / `<TuiText>` 等组件
3. **Vue** — 模板编译器配置：
   - `isNativeTag` — 只有 `tui:*` 标签是原生标签（其他按自定义元素处理）
   - `isVoidTag` — `<hr>` 是自闭合
   - `whitespace: 'condense'` — 压缩空白

**Rollup 配置：**
- `target: 'node14'` — 面向 Node.js 环境打包
- `external` — 外部化所有运行时依赖（vue / yoga-layout / chalk 等）
- 单文件输出（`manualChunks: undefined`）

### 7. 组件库（packages/core/src/components/）

| 组件 | 对应标签 | 功能 |
|------|----------|------|
| `TuiBox` | `<div>` / `<box>` | Flexbox 布局容器 |
| `TuiText` | `<span>` / `<text>` | 文本节点，支持 ANSI 样式 |
| `TuiNewline` | `<Br>` / `<br>` | 换行 |
| `TuiLink` | `<a>` / `<link>` | 链接 |
| `TuiInput` | `<input>` | 文本输入框 |
| `TuiTextTransform` | `<transform>` | 文本变换 |
| `TuiProgressBar` | `<progressbar>` | 进度条 |
| `TuiApp` | `<TuiApp>` | 根组件 |

**样式系统：** Yoga Layout 属性（width / height / flexDirection / justifyContent / alignItems 等）+ ANSI 颜色/样式。

### 8. HMR（packages/core/src/hmr/）

- `client.ts` — WebSocket 客户端，监听 server restart/crash 事件，调用 `exitApp()`
- `server.ts` — dev server 使用（已注释为 "// this should be used by the dev server"）
- `messages.ts` — JSON 消息格式定义（`{ type: 'crash' | 'restart', payload }`）
- `common.ts` — 共享常量（`WSS_PORT = process.env.PORT || 3000`）

---

## 用于 Agent-TUI 的可行性分析

### ✅ 可用部分

**1. 渲染引擎（完整可用）**
- Vue 3 响应式 → ANSI 终端渲染的完整管线
- Flexbox 布局（Yoga）天然支持复杂 UI 结构
- 增量渲染（LogUpdate）适合动态内容
- 边框系统（8 种 borderStyle）开箱即用

**2. 输入处理（可复用）**
- `onKeyData` / `onMouseData` composables 完整可用
- 鼠标追踪（点击坐标）已实现
- Raw mode 管理成熟

**3. 焦点管理（可扩展）**
- `FocusManager` 支持 Tab 导航
- 需要为 Agent-TUI 扩展为可聚焦的"可交互元素"（按钮/输入框/列表项）

**4. Dev HMR（参考价值）**
- WebSocket HMR 机制值得借鉴
- 但 Agent-TUI 通常不需要 HMR，更需要 production 的稳定性

### ⚠️ 不足部分（需要自行补充）

**1. Agent Loop 无关**
- vue-termui **只做 UI 渲染**，不包含任何 LLM 调用、工具执行、Session 管理
- 这些需要另外实现，vue-termui 只能作为"最后一公里"的渲染层

**2. 流式输出**
- 当前渲染模式是整树重渲染（`renderRoot`）
- Agent-TUI 需要**增量流式输出**（逐字显示 LLM 响应）
- 需要新增 `TuiStreamingText` 组件或修改 Output 渲染管线

**3. 多区域 UI**
- Agent-TUI 通常需要：消息区 + 工具输出区 + 状态栏 + 输入区
- 需要实现 **多Pane布局**（Split/VSplit 组件）
- 当前只有单根渲染模式，多窗口/多区域需要自己实现

**4. 键盘快捷键绑定**
- 当前只有 `onKeyData` 监听，需要一个**快捷键系统**（`Ctrl+C` / `Ctrl+Z` / `Ctrl+L` 等）
- 可以基于 `onKeyData` 包装一个 `useShortcut()` composable

**5. 选择/高亮系统**
- 终端选择文本（鼠标选择范围）没有实现
- Agent-TUI 可能需要类似"选择列表项"的能力
- 可以基于鼠标坐标 + Yoga Layout 计算来实现

**6. 异步状态**
- 当前 `useInterval` / `useTimeout` 是基础定时器
- Agent-TUI 需要**轮询/流式更新**的组合模式（如 SSE 事件 → 更新 UI）

### ❌ 明确不适合的部分

**1. Web/HTTP 能力**
- 完全无网络能力，纯 Node.js stdout/stdin
- Agent 需要的 HTTP 调用、文件操作需要另外实现

**2. 滚动视图**
- 没有 ScrollView / Viewport 组件
- 长输出需要自己实现虚拟滚动

**3. 国际化/字体测量**
- `string-width` 处理 ANSI 宽度，但复杂 Unicode 字形可能不准

---

## 推荐集成方案

```
Agent Core (你自己实现)
  ├── Agent Loop (LLM 调用、工具执行)
  ├── Session 管理
  └── 状态管理（Vue reactive/ref）
        ↓
vue-termui
  ├── TuiBox / TuiText / TuiInput 等组件（UI 渲染）
  ├── onKeyData / onMouseData（输入捕获）
  └── FocusManager（焦点导航）
        ↓
process.stdout / process.stdin（终端 I/O）
```

**需要自行补充的模块：**
1. **StreamingText 组件** — 逐字追加文本，不整树重渲染
2. **SplitPane / VBox** — 多区域布局（消息/输出/状态）
3. **useShortcut()** — 全局快捷键绑定
4. **useScrollViewport()** — 长内容虚拟滚动
5. **AsyncQueue** — 异步任务队列 + UI 状态联动

---

## 对比同类方案

| 维度 | vue-termui | [[ink-react|Ink]] | Bubble Tea (Go) |
|------|------------|-----------|-------------|
| 语言 | TypeScript/Vue | JavaScript/React | Go |
| 渲染模型 | Vue + Yoga Layout | React + yoga-layout | Bubble Tea 库 |
| 生态 | 小众（活跃维护中）| npm 最大 TUI 生态 | 最成熟 |
| 学习曲线 | Vue 开发者友好 | React 开发者友好 | 需学 Go |
| Agent 适配 | UI 层可用，逻辑需自建 | 同左 | 同左 |
| 流式输出 | 需自行扩展 | 需自行扩展 | 需自行扩展 |

**结论：** vue-termui 的**渲染层可以复用**，但 Agent 的核心逻辑（LLM Loop、工具调用、Session 管理）需要另外实现。它和 [[ink-react|Ink]] 在定位上非常相似——都是 UI 渲染库，不是 Agent 框架。

---

## 相关 Wiki 条目

- [[agent-cli-tui-learning-path]] — Agent-CLI/TUI 构建入手路径
- [[pi-coding-agent]] — TypeScript 交互式 Agent 参考
- [[deepseek-tui]] — Rust TUI Agent 完整参考
