# Godot 4.6 Official Documentation Summary

Source: https://docs.godotengine.org/en/4.6/about/list_of_features.html
Date: 2026-04-20

## Platforms
- Windows x86 & ARM, macOS x86 & ARM, Linux x86 & ARM (static binaries)
- Android (editor experimental), Web (experimental in 4.0)
- iOS (exported only)
- RISC-V, PowerPC, LoongArch64 (community, compile yourself)
- C# cannot export to Web in Godot 4

## Rendering
Three renderers:
- Forward+ (Desktop, Vulkan/D3D12/Metal)
- Mobile (Mobile/Desktop, fewer features, faster simple scenes)
- Compatibility/GL (Low-end desktop/mobile/web, OpenGL)

## 2D Graphics
- Sprite, polygon, line rendering
- Polygon2D, Line2D with texturing
- AnimatedSprite2D
- Parallax layers, pseudo-3D with editor preview
- 2D lighting with normal & specular maps, SDF global illumination via LightOccluder2D
- Font rendering: TTF, OTF, WOFF1, WOFF2, MSDF, colored fonts, variable fonts, OpenType features
- GPU and CPU particles, optional 2D HDR rendering

## Editor Features
- Scene tree editor, built-in script editor, external editor support
- GDScript debugger (thread debugging since 4.2)
- Visual profiler, custom performance monitors
- Live script reloading, live scene editing, remote inspector, live camera replication
- Plugin system in GDScript, Asset Library

## Shaders
- Simplified GLSL-based shading language
- 7 processor functions: vertex, fragment, light, start, process, sky, fog
- Shader types: spatial (3D), canvas_item (2D), particles, sky, fog
- Conditional compilation: unused built-ins are automatically optimized out
