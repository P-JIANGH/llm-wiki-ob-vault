---
title: Open Source Games List
created: 2026-04-08
updated: 2026-04-08
type: entity
tags: [project, reference, open-source, directory]
sources: [raw/articles/open-source-games-list-2026.md]
---

# Open Source Games List

## Overview

A curated GitHub/GitCode list of open-source video games and commercial game open-source remakes. Organized across 18 game genres, spanning classic FPS reverse-engineering, city builders, roguelikes, RTS, RPG, racing, and more.

Source: https://gitcode.com/GitHub_Trending/op/open-source-games
License: MIT (per CONTRIBUTING.md)

## Scope

**18+ game genres covered:**

| Genre | Notable Projects |
|-------|-----------------|
| Action | Hypersomnia (top-down shooter, pixely nostalgia) |
| Adventure | Endless Sky, ScummVM, Zelda TP decomp, Pioneer space sim |
| Business/Tycoon | CorsixTH (Theme Hospital), OpenTTD, OpenRCT2, OpenLoco |
| City-Building | Cytopia, Egregoria, Julius (Caesar III), Unknown Horizons (Godot port), Citybound |
| First-Person | Xonotic, .kkrieger, Liblast (Godot 4), Descent 3 |
| Platformers | Super Mario 64 decomp, VVVVVV, OpenGOAL (Jak & Daxter), DDraceNetwork |
| Puzzle | BlockOut II, Portal64 demake |
| Racing | SuperTuxKart, TORCS, Rigs of Rods, RVGL (Re-Volt), wipEout rewrite |
| Roguelike | Brogue CE, Cataclysm: Dark Days Ahead, Dungeon Crawl Stone Soup, NetHack, Shattered Pixel Dungeon |
| RPG | OpenMW (Morrowind), Daggerfall Unity, Veloren (Rust voxel), Space Station 14 (SS13 remake) |
| RTS | 0 A.D., OpenRA (C&C), Beyond All Reason, Warzone 2100, Widelands, Mindustry |
| Sandbox | Minosoft (Minecraft client, Kotlin) |
| Shoot 'em up | Taisei Project (Touhou fangame, SDL3) |
| Sport | Pooltool (billiards), Open Golf |
| Third-Person | OpenRW (GTA III), OpenLara (Tomb Raider), Lugaru |
| Tower Defense | Server Survival (cloud architecture teaching game) |
| Turn-Based Strategy | Wesnoth, Unciv (Civilization V), FreeCol, Freeciv, VCMI (Heroes III), OpenXcom |

## Key Patterns

### Reverse Engineering Remakes
Many entries are clean-room reverse-engineered clones of commercial classics:
- **id Software**: Doom, Quake, Quake II, Quake III, Wolfenstein 3D — all source-available
- **Build Engine**: Duke Nukem 3D, Shadow Warrior, Blood — via EDuke32, Raze, NBlood
- **Classic RPGs**: Ultima VII, Daggerfall, Fallout 1/2, Diablo, Heroes II, Caesar III
- **Zelda/Nintendo**: Zelda 3 (Link to the Past), Super Mario 64, Jak & Daxter (OpenGOAL)

### Popular Engines Used
- **Godot**: Unknown Horizons godot-port, Liblast, OpenGOAL
- **Bevy**: Fish Folk games (Jumpy, Punchy)
- **Unity**: Daggerfall Unity
- **CUBE**: AssaultCube, Cube 2: Sauerbraten, Red Eclipse
- **Spring**: Beyond All Reason, Zero-K (RTS)
- **Custom**: OpenMW, OpenRA, Wesnoth, etc.

### Highly Active Projects (large communities)
- OpenTTD, OpenRA, OpenMW, Wesnoth, Xonotic, SuperTuxKart, Cataclysm: Dark Days Ahead, Space Station 14, Mindustry

## Related Concepts

- [[open-source-game-engines-comparison]] — 对比主流开源游戏引擎（Godot/Bevy/Unity/Unreal等）
- [[godot-vs-unity-unreal]] — Godot vs Unity vs Unreal 选型指南
- [[godot-4]] — Godot 4 引擎详情（多个开源游戏使用 Godot）
- [[claude-code-game-studios]] — 49 Agent 游戏开发工作流（可用于开发类似品类的游戏）
