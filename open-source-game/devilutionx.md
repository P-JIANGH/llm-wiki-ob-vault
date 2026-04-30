---
title: DevilutionX
created: 2026-04-10
updated: 2026-04-10
type: concept
tags: [open-source, game, arpg, reverse-engineering]
sources: [https://github.com/diasurgical/devilutionX]
---

# DevilutionX

> Diablo + Hellfire 开源端口，提供引擎改进、bug修复和可选的QoL功能

## 基本信息

| 项目 | 内容 |
|------|------|
| GitHub | https://github.com/diasurgical/devilutionX |
| 语言 | C/C++ (259 .cpp + 163 .h，约 54K LOC) |
| 构建系统 | CMake 3.22+，支持 vcpkg |
| 渲染 | SDL2/SDL3 + DirectX（平台相关） |
| 许可 | MIT |
| 版本 | 1.6.0-dev |
| 原版依赖 | 需要原始 Diablo/Hellfire 游戏数据（DIABDAT.MPQ / hellfire.mpq） |

## 核心技术点

### 清洁室逆向工程
- 从原始 Diablo 1.09b 二进制逆向反编译而来，保留原版逻辑
- 不包含原始 Blizzard 代码，合法开源
- 需用户提供原版游戏数据文件（MPQ 包）

### 多平台端口架构
- **支持的平台**：Linux (x86_64/aarch64/x86/SDL1)、macOS、Windows (MinGW/MSVC)、Android、iOS、PS4、Switch、PS Vita、3DS、Amiga M68K、Xbox（Original/One/Series）
- GitHub Actions CI 覆盖所有主流平台构建
- 平台抽象层：SDL2/SDL3 作为跨平台基础，storm/ 目录处理 Windows 平台细节

### 渲染引擎（engine/ 子目录）
- `surface.cpp` 曲面/blitting 系统
- `dx.cpp` DirectX 渲染后端
- `load_cel.cpp / load_cl2.cpp / load_clx.cpp` 专用sprite格式加载器（CEL/CL2/CLX）
- `palette.cpp` 调色板系统
- `lighting.cpp` 光照系统（Dungeon/GLYPH/SPECIAL）
- `render/` 子目录：软件/DX 渲染管线
- 64K LOC engine 模块处理所有渲染逻辑

### 游戏逻辑（Source/ 根目录）
- `diablo.cpp` (3.5K) — 主循环与初始化
- `player.cpp` (3.5K) — 玩家实体，HP/MP/等级/属性系统
- `monster.cpp` (5K) — 怪物AI，攻击/寻路/行为状态机
- `items.cpp` (5K) — 物品系统，装备/消耗品/符文
- `objects.cpp` (4.9K) — 场景物体（门/宝箱/祭坛/书架等）
- `missiles.cpp` (4.3K) — 弹道/法术投射物系统
- `stores.cpp` (2.8K) — 商店系统（识别/重铸/赌博）
- `inv.cpp` (2.3K) — 背包/装备管理 UI
- `automap.cpp` (2K) — 自动地图功能
- `lighting.cpp` — 动态光照

### 关卡生成（levels/ 子目录）
- `drlg_l1.cpp ~ drlg_l4.cpp` — 四个难度地下城的程序化生成
- `crypt.cpp` — 奶牛关（Crypt）生成
- `gendung.cpp` — 地下城主数据结构与布局
- `themes.cpp` — 房间主题系统（教堂/墓穴/恶魔等）
- `setmaps.cpp` — 固定特殊房间

### 网络系统（dvlnet/ 子目录）
- `abstract_net.h/cpp` — 抽象网络接口
- `base_protocol.h/cpp` — 模板协议基类（帧同步 Tick 架构）
- `tcp_client.cpp / tcp_server.cpp` — TCP P2P 连接
- `protocol_zt.cpp` — ZeroTier VPN 支持（异地局域网穿透）
- `loopback.cpp` — 本地回环（单机双人）
- `cdwrap.cpp` — 连接建立包装器
- `frame_queue.cpp` — 数据包队列与帧同步
- `packet.h` — PACKET_ENCRYPTION 可选加密（libsodium）
- **帧同步多人**：类似 Hypersomnia/OpenTTD 的确定性锁步模型

### Lua 脚本系统（lua/ 子目录）
- `lua_event.cpp/hpp` — 事件驱动 Lua 绑定
- `lua_global.cpp/hpp` — 全局 API 暴露
- `repl.cpp/hpp` — 运行时 REPL（read-eval-print loop）
- `autocomplete.cpp/hpp` — REPL 自动补全
- `modules/` — 模块化 Lua API 扩展

### DiabloUI（DiabloUI/ 子目录）
- 菜单/角色创建/保存/加载 UI 系统
- `diabloui.cpp/h` — 核心 UI 引擎
- `button.cpp/h` — 按钮控件
- `scrollbar.cpp/h` — 滚动条
- `hero/` — 角色创建相关 UI

### 存档系统
- `loadsave.cpp` (2.9K) — 二进制序列化 SaveGame 格式
- `pfile.cpp/h` — 玩家存档管理
- `multi.cpp` (973) — 多人游戏存档同步

### 输入与控制
- `controls/` 子目录：键盘/手柄映射
- `control_mode.hpp` — 键盘/触屏/控制器模式切换
- `keymapper.hpp` — 按键映射配置
- `cursor.cpp/h` — 鼠标光标系统

### 第三方依赖（3rdParty/）
- asio — 异步网络 I/O
- libfmt — 格式化字符串
- libpng — PNG 图像
- libsodium — 加密（packet encryption）
- libsmackerdec — Smacker 视频解码
- googletest — 单元测试
- bzip2 — 压缩

## 玩法特点

- **核心玩法**：暗黑破坏神1（1996）完整可玩，含 Hellfire 资料片
- **支持原版全部内容**：4难度×16层地下城 + Crypt + 奶牛关
- **可选改进**：按键重映射、拉伸宽屏、帧率解锁、音质改进
- **多人模式**：TCP P2P / ZeroTier VPN / 本地回环，最多4人
- **作弊菜单**（debug mode）：`ctrl+alt+del` 唤出
- **Mod 支持**：Lua 脚本扩展，提供了 modding 工具

## 对公司 AI 游戏的参考价值

| 方向 | 启示 |
|------|------|
| 帧同步网络 | dvlnet/base_protocol.h 模板化的帧同步协议，支持 ZeroTier 穿透，可参考用于确定性多人游戏 |
| 逆向工程 | 清洁室重实现需将原版逻辑完全重写而非复制粘贴，规避版权 |
| 多平台适配 | SDL2/SDL3 抽象层 + 平台特定 storm/ 代码，可参考跨平台适配模式 |
| Lua 脚本 | 内嵌 Lua REPL + 模块化 API 设计，可为游戏提供运行时脚本扩展能力 |
| 存档序列化 | loadsave.cpp 的二进制 SaveGame 格式设计，可参考确定性存档方案 |
| CI/CD | GitHub Actions 多平台构建矩阵（17+ 平台），可参考构建自动化 |

