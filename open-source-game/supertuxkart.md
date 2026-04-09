---
title: SuperTuxKart
created: 2026-04-09
updated: 2026-04-09
type: concept
tags: [open-source, game, racing, kart, multiplayer, physics, bullet]
sources: [https://github.com/supertuxkart/stk-code]
---

# SuperTuxKart

> 免费开源卡丁车派对游戏，强调趣味而非物理真实性，支持多人在线竞速

## 基本信息

| 项目 | 内容 |
|------|------|
| GitHub | https://github.com/supertuxkart/stk-code |
| 语言 | C++ (~274K LOC，927 个源文件) |
| 构建系统 | CMake (3.12...4.0) |
| 渲染/引擎 | OpenGL 3.3+ / OpenGL ES 3.0+ / DirectX 9 (可选) |
| 许可 | GPLv3 |
| 平台 | Windows, Linux, macOS, Android, Nintendo Switch |
| 物理引擎 | Bullet Physics (btKart) |
| 网络库 | ENet (UDP) + OpenSSL/MbedTLS 加密 |

## 核心技术点

### Bullet Physics 卡丁车物理 (btKart)
- `src/physics/btKart.cpp/h` — 基于 Bullet Physics 的卡丁车物理实现
- `btKartRaycast.cpp` — 射线检测用于碰撞
- 强调趣味性而非真实性：漂移加速、道具攻击
- `kart.cpp/h` — 核心 Kart 类，含速度/方向/氮气加速
- `kart_motion_state.hpp` — Bullet 物理状态同步

### 渲染引擎架构
- `src/graphics/` — 主渲染子系统，含光照/阴影/PBR
- `CBatchingMesh.cpp` — 批量网格渲染优化
- `b3d_mesh_loader.cpp/h` — B3D 格式骨骼动画加载
- 支持 OpenGL / GLES / DirectX 9 多后端
- `abstract_renderer.hpp` — 抽象渲染器接口

### 网络同步架构
- `src/network/` — 完整 client-server 网络层
- `protocol.cpp/h` — 协议管理（协议类型枚举 protocol_enum.hpp）
- `stk_host.cpp/h` — STK 网络主机，管理 peers
- `server.cpp/h` — 专用服务器，可 `SERVER_ONLY=ON` 无 GUI 构建
- `event_rewinder.cpp/h` — 事件回滚系统（确定性重放）
- `rewind_manager.cpp/h` — 回放管理器
- `smooth_network_body.cpp/h` — 平滑网络身体位置
- IPv6 支持，NAT 穿透（STUN 检测 `stun_detection.hpp`）
- 加密：`crypto_openssl.cpp/h` 或 `crypto_mbedtls.cpp/h`

### 在线系统
- `src/online/` — 在线功能：玩家档案、排行榜、好友
- `http_request.cpp/h` — HTTP 请求抽象层（curl / URLSession）
- `database_connector.cpp/h` — 数据库连接器
- `server_config.cpp/h` — 服务器配置 XML
- 支持公开服务器列表，在线账号注册系统

### 赛道与道具系统
- `src/tracks/` — 赛道系统
  - `arena_graph.cpp/h` — 竞技场寻路图
  - `check_cannon.cpp/h` — 传送门检测
  - `bezier_curve.cpp/h` — 贝塞尔曲线（赛道轨迹）
- `src/items/` — 道具系统（香蕉、氮气等）
- `src/modes/` — 游戏模式（竞速、道具赛、足球等）

### 可视化与 UI
- `src/guiengine/` — 游戏 UI 引擎（EGG 菜单系统）
- `src/karts/kart_gfx.cpp/h` — 卡丁车特效（尾迹、碰撞特效）
- `src/animations/` — 骨骼动画系统
- `src/guiengine/` — 内置关卡编辑器 GUI

### 构建变体
- `SERVER_ONLY=ON` — 无图形纯服务器二进制，适合 VPS
- `USE_IPV6=ON` — IPv6 支持
- `USE_CRYPTO_OPENSSL=ON/OFF` — OpenSSL vs MbedTLS 加密选择
- `BUILD_RECORDER=ON` — OpenGL 录制器
- `USE_WIIUSE=ON` — Wiimote 手柄支持

## 玩法特点

- **道具赛模式**：收集和使用各种道具（香蕉、皮娜炸弹、氮气等）
- **竞速模式**：纯速度比拼
- **足球模式**：团队合作将球踢入对方球门
- **故事模式**：线性关卡挑战
- **内置关卡编辑器**：玩家自制赛道
- **Kart 添加系统**：玩家自制卡丁车模型和皮肤
- **Addon 在线分享**：社区制作的赛道和卡丁车

## 对公司 AI 游戏的参考价值

| 方向 | 启示 |
|------|------|
| 物理系统 | Bullet Physics 卡丁车物理调优，趣味性 > 真实性设计原则 |
| 网络架构 | ENet UDP + 事件回滚 + 确定性重放，适合多人竞速同步 |
| 服务器部署 | `SERVER_ONLY` 无 GUI 构建方案，适合云端部署 |
| 加密通信 | OpenSSL/MbedTLS 可切换加密层设计 |
| 跨平台渲染 | OpenGL/GLES/DX9 多后端抽象架构 |
| 道具系统 | 数据驱动道具效果（`src/items/`），可扩展性强 |
| 在线服务 | HTTP API + 数据库的账号/排行榜系统 |
| NAT 穿透 | STUN + IPv6 支持，无需端口转发 |
