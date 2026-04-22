# Godot 4.6: What Changes for You - GDQuest Summary

Source: https://www.gdquest.com/library/godot_4_6_workflow_changes/
Date: 2026-04-20

## Upgrade Strategy
- Focus on UX improvements and stability without changing core concepts
- 3D physics and rendering received major under-the-hood upgrades
- Over 20 GDQuest projects upgraded in a couple of days

## Breaking Changes
- Glow post-processing now processes before tone-mapping, default blend mode "screen"
- Quaternion initialization defaults to identity (no rotation) instead of zero

## Editor Improvements
- New default "Modern" theme (grayscale, cleaner)
- Bottom panel now part of docking layout, floating windows for multi-monitor
- Quick Open Live Preview
- Drag-to-script resource export
- Clickable errors in Output panel
- Runtime speed control in debugger
- Step out debugger option

## 3D Viewport
- Angle snapping (Alt while orbiting)
- New Select Mode (shortcut v), no gizmo display

## Physics: Jolt Default for 3D
- New projects in 4.6 use Jolt physics by default for 3D
- Same engine used in Death Stranding 2
- Replaces Godot Physics for 3D

## Rendering Backends
- Windows: Direct3D 12 is now the default rendering backend
- Previously Vulkan was default, but driver issues on Windows led to D3D12 as default
