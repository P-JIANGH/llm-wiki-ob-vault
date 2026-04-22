---
title: Phaser 3 + Vue 3 Integration
created: 2026-04-22
updated: 2026-04-22
type: concept
tags: [game-engine, phaser, frontend, vue, typescript]
sources: [raw/articles/phaser-vue3-ts-template-2024.md]
---

# Phaser 3 + Vue 3 Integration

## Overview
螨光游戏工作室的主力技术栈：Phaser 3 负责游戏渲染和逻辑，Vue 3 负责 UI 和状态管理，TypeScript 统一类型。本页总结官方推荐模式和实战经验。

## Official Template
Phaser Studio 官方提供了 Phaser 3 + Vue 3 + TypeScript + Vite 模板：
- GitHub: `phaserjs/template-vue-ts`
- 包含 Vue 与 Phaser 游戏通信的 Bridge

## 架构模式

### 模式 A: Vue 主导入 Phaser
Vue 作为应用框架，Phaser Game 作为组件内部的 Canvas 实例。

```typescript
// GameCanvas.vue
import { ref, onMounted, onUnmounted } from 'vue'
import Phaser from 'phaser'

const gameContainer = ref<HTMLDivElement>()
let game: Phaser.Game | null = null

onMounted(() => {
  game = new Phaser.Game({
    parent: gameContainer.value!,
    width: 800,
    height: 600,
    scene: [BootScene, MainScene],
    // 通过 Phaser Registry 与 Vue 共享状态
  })
})

onUnmounted(() => {
  game?.destroy(true)
})
```

### 模式 B: Phaser Registry 作为状态总线
Phaser 的 `registry` 是跨 Scene 共享的 KV 存储，可以作为 Phaser 与 Vue 之间的状态桥梁。

```typescript
// 在 Phaser Scene 中
this.registry.set('playerHealth', 100)
this.registry.events.on('changedata', (parent, key, data) => {
  // 状态变化时触发
})

// 在 Vue 组件中
import { ref, onMounted } from 'vue'
const health = ref(100)

onMounted(() => {
  const game = getPhaserGame() // 获取 Phaser 实例
  game.registry.events.on('changedata-playerHealth', (parent, value) => {
    health.value = value
  })
})
```

### 模式 C: Pinia + Phaser 双向同步
使用 Pinia Store 管理全局状态，Phaser Scene 订阅 Pinia 变化。

```typescript
// stores/game.ts
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useGameStore = defineStore('game', () => {
  const score = ref(0)
  const playerLevel = ref(1)
  
  function addScore(points: number) {
    score.value += points
  }
  
  return { score, playerLevel, addScore }
})

// 在 Phaser Scene 中
import { useGameStore } from '@/stores/game'

export class MainScene extends Phaser.Scene {
  private store = useGameStore()
  
  create() {
    // Vue 响应式状态可以监听
    this.store.$subscribe((mutation, state) => {
      console.log('Store updated:', state.score)
    })
  }
  
  onEnemyKilled() {
    this.store.addScore(100) // 更新 Vue 状态
  }
}
```

## 实战建议

### 生命周期管理
- Phaser Game 必须在 Vue `onUnmounted` 中调用 `destroy(true)`，避免内存泄漏
- Scene 切换时注意清理事件监听器

### 窗口大小响应
```typescript
window.addEventListener('resize', () => {
  game.scale.resize(window.innerWidth, window.innerHeight)
})
```

### 跳转场景时的状态保留
- 使用 Pinia Store 持久化跨场景状态
- Phaser 的 `scene.stop()` + `scene.start()` 组合

### TypeScript 类型安全
- 为所有 Scene 定义接口
- 使用 `keyof typeof` 安全访问 Scene 键
- 利用 Phaser 的泛型类型（如 `Phaser.Physics.Arcade.Sprite`）

## 性能考虑
- Vue 的响应式系统不适合每帧更新，游戏内逻辑应在 Phaser 的 `update` 循环中执行
- 将 Vue 仅用于 UI 层和状态持久化，游戏计算留在 Phaser 侧
- 使用 `Object Pooling` 减少垃圾回收压力

## 典型项目结构
```
src/
  components/
    GameCanvas.vue      # Phaser 游戏画布
    HUD.vue             # 头部显示
    SettingsPanel.vue   # 设置面板
  scenes/
    BootScene.ts
    MenuScene.ts
    GameScene.ts
  stores/
    game.ts             # Pinia 游戏状态
    settings.ts         # Pinia 设置状态
  game/
    main.ts             # Phaser Game 配置
  App.vue
```

## Related
[[phaser-4-migration]] — Phaser 4 升级指南
[[godot-4]] — 另一款主力引擎对比
[[vue3-composable-state-mutation]] — Vue 3 响应式状态管理模式
