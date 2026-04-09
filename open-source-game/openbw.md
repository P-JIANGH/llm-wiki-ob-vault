---
title: OpenBW
created: 2026-04-10
updated: 2026-04-10
type: concept
tags: [open-source, game, rts, starcraft, reverse-engineering, c++]
sources: [https://github.com/OpenBW/openbw]
---

# OpenBW

> StarCraft: Brood War 核心引擎清洁室重实现（C++ header-only 架构）

## 基本信息

| 项目 | 内容 |
|------|------|
| GitHub | https://github.com/OpenBW/openbw |
| 语言 | C++（header-only 主体） |
| 构建系统 | CMake |
| 渲染 | 需配合 BWAPI/SDL2 UI |
| 许可 | GPLv2 |
| 依赖 | ASIO（嵌入式）, SDL2 |

## 核心技术点

### Header-Only 架构
OpenBW 的独特之处在于其**纯 header 文件**实现方式，核心代码全部在 `.h` 文件中，无对应 `.cpp` 编译单元：

| 文件 | 行数 | 职责 |
|------|------|------|
| `bwgame.h` | 22,387 | 核心游戏引擎：单位/建筑/指令/寻路/碰撞 |
| `bwenums.h` | 2,248 | 所有枚举类型（UnitTypes/FlingyTypes 等 228+ 种类） |
| `korean.h` | 1,855 | 韩文文本编码/解压（StarCraft 原版韩文资源） |
| `data_loading.h` | 1,797 | 二进制游戏数据文件解析（内存布局读写） |
| `actions.h` | 1,480 | 游戏指令/动作序列化 |
| `sync.h` | 1,147 | **确定性锁步网络同步**（核心多人协议） |
| `game_types.h` | 776 | 游戏数据类型（position/health/energy 等） |
| `data_types.h` | 502 | 基础数据类型定义 |
| **总计** | **~28,000+** | |

### 确定性锁步网络（sync.h）
`sync.h` 是多人同步引擎，支持：
- **latency** 配置（默认 2 frame）
- **scheduled_action** 帧调度：每个 action 记录 frame + data_begin/end
- **uid_t**：基于 chrono/high_resolution_clock + thread_id 生成 256-bit 种子
- **ASIO sync servers**：TCP / local pipe / socket 三种传输层
- 与 BWAPI 兼容的 `is_first_bwapi_compatible_frame` 机制

### 二进制数据加载（data_loading.h）
```cpp
// 跨平台字节序处理 + 对齐保证
template<typename T, bool little_endian>
static inline T value_at(const uint8_t* ptr) { ... }

// 支持 struct 内存布局直接映射（aliasing-safe）
template <typename T> struct as_uint8_array { ... }
```

### ASIO 多后端同步服务器
| 文件 | 传输方式 |
|------|----------|
| `sync_server_asio_tcp.h` | TCP socket |
| `sync_server_asio_local.h` | Unix local pipe |
| `sync_server_asio_socket.h` | Posix stream |
| `sync_server_asio_posix_stream.h` | Posix stream |

### mini-openbwapi 子模块
独立仓库 `mini-openbwapi/` 提供 BWAPI 兼容接口：
- `BWAPI.h` — BWAPI 头文件兼容
- `openbwapi.cpp` — BWAPI → OpenBW 桥接实现
- 允许使用 BWAPI 的 AI bot 直接接入 OpenBW 引擎

### UI 层（SDL2）
`ui/` 目录包含独立 UI 实现：
- `sdl2.cpp` — SDL2 渲染后端
- `native_window.h` — 原生窗口抽象
- `native_sound.h` — 音频接口

## 架构特点

1. **清洁室逆向**：完全重写，不复用暴雪原始代码
2. **Header-only 优势**：无编译依赖，所有类型/模板/内联函数集中管理，便于分析和理解游戏逻辑
3. **数据驱动**：通过解析原版 `.dat` 文件（单位/科技/武器数据）而非硬编码
4. **BWAPI 生态集成**：与 [[open-source-game/openra|OpenRA]] 类似，通过兼容层复用现有 AI/Bot 生态

## 对公司 AI 游戏的参考价值

| 方向 | 启示 |
|------|------|
| **锁步网络同步** | sync.h 1147 行完整实现，可作为确定性多人 RTS 的参考实现 |
| **Header-only 代码组织** | 对于确定性要求高的核心逻辑，header-only 避免了编译优化差异 |
| **BWAPI 兼容层** | [[open-source-game/openra|OpenRA]] 的 Mod 系统设计可参考此模式 |
| **二进制数据解析** | data_loading.h 的跨平台字节序模板是处理游戏资源文件的好范例 |
