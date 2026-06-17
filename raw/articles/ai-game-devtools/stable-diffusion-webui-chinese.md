# Stable Diffusion WebUI Chinese 0313

**Source:** https://github.com/VinsonLaro/stable-diffusion-webui-chinese
**Captured:** 2026-04-17

## Project Overview

此项目为 AUTOMATIC1111 Stable Diffusion WebUI 的简体中文扩展（本地化模板）。

- **当前版本:** 0313（基于 2024-03-13 之前的官方 WebUI 和社区插件最新版本）
- **翻译来源:** ChatGPT、有道翻译、网络检索
- **作者:** VinsonLaro（B站 UP 主）
- **仓库结构:** 仅包含 `localizations/` 目录下的两个 JSON 翻译文件

## 包含的扩展翻译

| 扩展 | Commit | 日期 |
|---|---|---|
| ControlNet | aa2aa812 | 2024-03-06 |
| openpose-editor | cebe13e0 | 2023-12-19 |
| multidiffusion-upscaler | 76cde3c2 | 2024-03-09 |
| artists-to-study | 5cd19f68 | 2023-06-26 |
| dataset-tag-editor | 7a2f4c53 | 2023-06-05 |
| lora-block-weight | 1fa7eb78 | 2024-02-12 |
| segment-anything | 982138cf | 2024-02-24 |
| vectorstudio | 03535f64 | 2023-05-28 |
| posex | 292f92d5 | 2023-05-03 |

## 安装方式

### 方法1：WebUI 扩展安装
1. WebUI → Extensions → Install from URL
2. 输入仓库 URL
3. Install → Apply and restart UI
4. Settings → User interface → Localization 选择 Chinese-All 或 Chinese-English
5. Apply settings → Reload UI

### 方法2：手动复制
1. `git clone` 仓库
2. 将 `localizations/` 下的 JSON 文件复制到 WebUI 的 `localizations/` 目录
3. 同上步骤 4-5

## 作者备注

- 作者从事 AI 绘画约 2 年，从 Disco Diffusion 到 Stable Diffusion 1.5/Waifu，再到 NovelAI 泄露事件、LoRA/ControlNet 大规模应用、ComfyUI 出现
- 2023 年末起转向 LLM 开发，对 AI 绘画关注减少
- 认为 AI 绘画增速变慢，难以再出现快速提升的事件
- 希望 AGI 早日实现

## 社区资源

- B站主页: https://space.bilibili.com/22970812
- 视频教程: https://www.bilibili.com/video/BV1kg4y1H73b
- QQ 交流群: https://jq.qq.com/?_wv=1027&k=wEbRm1eU

## 文件列表

- `localizations/chinese-only-0313.json` (202KB) — 纯中文本地化模板
- `localizations/chinese-and-english-0313.json` (277KB) — 中英双语本地化模板
