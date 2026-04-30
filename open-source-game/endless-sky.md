# Endless Sky

> 太空探索+贸易+战斗沙盒，致敬 Elite / Escape Velocity / Star Control

## 基本信息

| 项目 | 内容 |
|------|------|
| GitHub | https://github.com/endless-sky/endless-sky |
| 语言 | C++20 |
| 构建系统 | CMake + vcpkg |
| 渲染 | OpenGL 3.0 + 自定义 GLSL Shader |
| 许可 | GPL v3 |
| 平台 | Linux / macOS / Windows |

## 核心技术栈

### 引擎架构（无第三方游戏引擎）
- **纯 C++20**，所有系统（渲染/物理/AI/音频）均自研
- CMakeLists.txt 管理构建，C++20 标准，无废弃特性
- vcpkg 管理第三方依赖（SDL2/OpenAL/libpng/minizip/libavif 等）
- 轻量依赖策略：图形仅 SDL2 + OpenGL，音频仅 OpenAL + MAD + FLAC

### 渲染系统
- `source/shader/` 下全套自定义 Shader：SpriteShader / FillShader / LineShader / OutlineShader / RingShader / FogShader / BatchShader
- `source/image/` 独立图片加载管线：ImageBuffer / MaskManager / SpriteSet / SpriteLoadManager
- `source/shader/StarField.cpp` 程序化星空背景
- OpenGL 3.0+，不支持 OpenGL 2.0 需要自定义 Shader

### 数据驱动架构（最大亮点）
- 所有游戏内容（星系/飞船/武器/任务/对话）均以 **纯文本 `.txt` 文件定义**
- 自定义 DataNode/DataFile 解析器，缩进层级决定父子关系
- 核心文件：
  - `data/map systems.txt` — 星系坐标、链接、星球
  - `data/map planets.txt` — 星球属性、商店、价格
  - `data/persons.txt` — NPC/势力定义
  - `data/effects.txt` — 粒子/视觉特效
  - `data/series.txt` — 任务线
  - 各 `data/{faction}/` 目录存放派系特定内容
- 优势：**mod 友好**，无需编译，直接修改文本即可添加内容

### 内容规模
- 10+ 完整派系（human / hai / wanderer / korath / pug / gegno /Remnant 等）
- 数百个星系，支持跳跃门/wormhole 穿越
- 大量飞船型号 + 装备（武器/引擎/货物舱）
- 主线 + 支线任务体系

## 玩法特点

1. **开放世界太空探索** — 自由穿梭星系，无固定线性流程
2. **经济系统** — 贸易/客运/货运赚取收入，买卖差价受派系关系影响
3. **战斗与任务** — 护航/ bounty hunting / 内战站队
4. **剧情线** — 多个派系有独立故事线（Coalition / Remnant / Successors 等）
5. **Ship Jump Navigation** — 飞船跳跃引擎，交战距离/燃料管理

## 对公司 AI 游戏的参考价值

| 方向 | 启示 |
|------|------|
| **数据驱动设计** | 所有游戏内容用文本定义，mod 友好，设计师可独立迭代内容而不碰代码 |
| **轻量引擎路线** | 不依赖 Unity/Godot，自研渲染+音频，OC 合并后可控性更强 |
| **程序化内容** | 数据文件 + 程序生成的混合模式，可大幅降低美术依赖 |
| **太空游戏原型** | 贸易/探索/战斗闭环可作为 AI NPC 经济行为测试床 |
| **C++20 现代实践** | structured binding / concepts / ranges 等新特性应用 |

## 关键源文件速查

| 文件 | 作用 |
|------|------|
| `source/main.cpp` | 入口，初始化 Engine / GameData / GameWindow |
| `source/Engine.h/cpp` | 主循环，每帧更新所有实体 |
| `source/GameData.h/cpp` | 全局数据管理器，加载所有 data/*.txt |
| `source/Ship.h/cpp` | 飞船实体，武装/引擎/ Personality |
| `source/AI.h/cpp` | NPC AI 决策（攻击/逃跑/贸易路线） |
| `source/DataNode.h` | 数据文件语法树节点 |
| `source/Command.h/cpp` | 玩家输入命令（驾驶/射击/切换） |
| `source/ConversationPanel.h/cpp` | 对话 UI 系统 |
| `source/audio/` | 自研音频引擎 |
| `source/shader/` | 自研 2D 渲染 Shader 集合 |

