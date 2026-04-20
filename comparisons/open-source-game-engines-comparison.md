---
title: Open Source Game Engines Comparison
created: 2026-04-08
updated: 2026-04-08
type: comparison
tags: [comparison, godot, bevy, unity, open-source]
sources: [raw/articles/open-source-games-list-2026.md]
---

# Open Source Game Engines Comparison

## Overview

Analysis of open-source game engines and frameworks used across the open-source games ecosystem. Relevant for AI game company technology stack decisions.

## Engines in the Open Source Games List

### Godot Engine
**License**: MIT | **Language**: GDScript, C# | **Website**: godotengine.org

**Used by**:
- Unknown Horizons (godot-port) — city builder
- Liblast — multiplayer FPS (fully open-source toolchain)
- Fish Folk: Jumpy, Punchy — 2D/tactical shooter, beat-em-up
- OpenGOAL — Jak & Daxter port

**Pros**:
- MIT license (fully permissive)
- Excellent 2D support with dedicated 2D engine
- Lightweight, no royalties
- Large and growing community
- Native export to Linux, Windows, macOS, iOS, Android, Web

**Cons**:
- Smaller ecosystem vs Unity/Unreal for 3D AAA
- GDScript performance ceiling for CPU-intensive tasks

**Verdict**: Strong choice for indie 2D games. Recommended for the company's game development.

---

### Bevy Engine
**License**: MIT | **Language**: Rust | **Website**: bevy.org

**Used by**:
- Fish Folk: Jumpy (tactical 2D shooter)
- Fish Folk: Punchy (2.5D beat-em-up)

**Pros**:
- Rust language (memory safety, performance)
- Data-oriented ECS architecture
- Modern, rapidly evolving

**Cons**:
- Rust learning curve
- Ecosystem still maturing
- Compilation times can be long

**Verdict**: Best for teams with Rust expertise; high long-term potential.

---

### Unity (Daggerfall Unity)
**License**: Unity Personal / Pro | **Language**: C# | **Website**: unity.com

**Used by**:
- Daggerfall Unity — open-source recreation of Daggerfall

**Pros**:
- Massive ecosystem and asset store
- Large talent pool
- Excellent cross-platform support

**Cons**:
- License costs at scale
- Source not fully open
- Runtime fees as of 2024

**Verdict**: Not ideal for open-source projects due to licensing. Use for proprietary indie games only.

---

### CUBE Engine (AssaultCube, Sauerbraten, Red Eclipse)
**License**: ZLIB | **Language**: C/C++ | **Website**: cubeengine.com

**Used by**:
- AssaultCube — free multiplayer FPS
- Cube 2: Sauerbraten — multiplayer & singleplayer FPS
- Red Eclipse — arena shooter

**Pros**:
- Very lightweight
- Fast and portable
- Simple map editing

**Cons**:
- Legacy engine (early 2000s design)
- Limited modern features

**Verdict**: Legacy FPS arena games only. Not recommended for new projects.

---

### Spring Engine
**License**: GPL | **Language**: C++ | **Website**: springrts.com

**Used by**:
- Beyond All Reason (BAR)
- Zero-K

**Pros**:
- Designed specifically for RTS games
- Large-scale unit support

**Cons**:
- Steep learning curve
- Niche community
- Limited documentation

**Verdict**: For RTS-specific projects only; excellent if it fits the genre.

---

### OpenMW (Morrowind Engine)
**License**: GPL | **Language**: C++ | **Website**: openmw.org

**Used by**: Powers the open-source Morrowind recreation.

**Verdict**: Reference for RPG engine architecture, but not a general-purpose choice.

---

### Other Notable Open-Source Engines

| Engine | License | Language | Notable Use Case |
|--------|---------|----------|-----------------|
| **OGRE** | LGPL | C++ | Rigs of Rods (physics sandbox) |
| **Panda3D** | BSD | Python/C++ | Yorg racing game |
| **Raydium** | GPL | C | ManiaDrive (TrackMania clone) |
| **FIFE** | GPL | Python/C++ | Unknown Horizons (original) |
| **Trial** | AFL | Common Lisp | Kandria (action RPG) |
| **LibGDX** | Apache 2 | Java | Warsmash Mod Engine |

## AI Game Company Recommendation

For the company's AI game development:

| Project Type | Recommended Engine | Rationale |
|-------------|-------------------|-----------|
| 2D 像素游戏 | **Godot 4** | MIT license, excellent 2D, fast iteration |
| 3D 简单场景 | **Godot 4** | Godot 4's 3D has improved significantly |
| 高性能/ECS | **Bevy** | If team knows Rust |
| 棋牌/卡牌/文字冒险 | **Godot 4** or **Phaser.js** | Lightweight |
| 复杂 3D RPG | **Godot 4** or **Godot 3** + custom | OpenMW is a reference |

**Avoid**: Unity (licensing risk), proprietary engines.

## Related

- [[godot-4]] — Godot 4 引擎详情
- [[godot-vs-unity-unreal]] — Godot vs Unity vs Unreal 选型指南
- [[claude-code-game-studios]] — 49 Agent 游戏开发工作流（可直接指定 Godot 4）
- [[open-source-games-list]] — 开源游戏列表实体页（参考现有开源游戏使用的引擎）
