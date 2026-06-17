# Migrating from Phaser 3 to Phaser 4

Source: https://phaser.io/news/2026/04/migrating-from-phaser-3-to-phaser-4-what-you-need-to-know
Date: 2026-04-22

## Overview
Phaser 4 is the biggest release in the framework's history, featuring a completely rebuilt renderer, unified filter system, new high-performance game objects, and a significantly improved lighting model.

## Migration Effort
- Standard API projects (sprites, text, tilemaps): typically a few hours of work
- Custom WebGL/shader projects: plan for more time, but the new architecture is cleaner

## Key Changes

### Renderer (Biggest Change)
- Entire WebGL rendering pipeline from v3 replaced
- Standard game objects: change is transparent
- Custom WebGL pipelines: must be rewritten as render nodes

### FX and Masks → Filters
- FX and masks unified into single filter system
- Works on any game object or camera
- Bloom, Shine, Circle FX → Actions called on target object
- Gradient FX → Proper Gradient game object
- BitmapMask → New Mask filter

### Tint, Lighting, Camera
- `setTintFill()` removed → use `setTint()` + `setTintMode()` (6 blend modes)
- Lighting: `setLighting(true)` instead of assigning pipeline
- Light heights use explicit `z` value
- Camera matrix system restructured

### Smaller API Changes
- `Geom.Point` gone → replace with `Vector2`
- `Math.TAU` corrected: v3 was `PI/2`, v4 is `PI*2`
- `Phaser.Struct.Set` and `Phaser.Struct.Map` removed → use native JS `Set`/`Map`
- `DynamicTexture` now requires `.render()` call
- `roundPixels` defaults to `false` in v4

### Removed Features
- Mesh and Plane game objects
- Camera3D and Layer3D plugins
- IE9 support
- Bundled Spine plugins (use official Esoteric Software plugin)

## Full Guide
https://github.com/phaserjs/phaser/blob/v4.0.0/changelog/v4/4.0/MIGRATION-GUIDE.md
