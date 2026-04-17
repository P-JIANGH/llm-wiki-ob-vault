# Stable.art — Raw Source

**Source:** https://github.com/isekaidev/stable.art
**Date:** 2026-04-17
**Type:** GitHub project (Photoshop plugin)

## README Summary

Stable.art is an open-source plugin for Photoshop (v23.3.0+) that allows you to use Stable Diffusion (with Automatic1111 as a backend) to accelerate your art workflow.

### Features
- **Lexica.art Integration** — Built-in prompt search engine for inspiration inside the plugin
- **txt2img** — Text-to-image generation; default 512×512, supports rectangular marquee tool for custom sizes/ratios
- **img2img/inpaint** — Select any area with any selection tool (rectangular marquee, lasso, quick selection, magic wand), click Generate — no masks or complicated steps required
- **outpaint** — Coming Soon (as of v0.0.1)

### Installation
1. Download CCX file from releases
2. Open Creative Cloud desktop app, ensure Photoshop is updated
3. Double-click CCX file to install
4. Plugin panel appears in Photoshop > Plugins > Stable.art

### API Backend
Requires Automatic1111 Stable Diffusion WebUI with API enabled:
- Local: follow A1111 API guide
- Google Colab: fast-stable-diffusion supports API out of the box
- Endpoint URL format: `http://127.0.0.1:7860`, `https://***.gradio.live`, etc.

### Development
- Vue 2 + Vue CLI (vue-cli-service)
- Adobe UXP (Photoshop plugin framework)
- Two manifest files: manifest-dev.json for development, manifest.json for production builds
- Hot-reload via `npm run serve`

## Key Source Files

| File | Purpose |
|------|---------|
| `src/main.js` | Vue 2 entry point, Sentry error/tracing integration, Photoshop app import |
| `src/App.vue` | Main app component with Generate/Explore tabs, UXP shell integration |
| `src/GenerateTab.vue` | Core generation UI (txt2img/img2img/inpaint controls) |
| `src/ExploreTab.vue` | Lexica.art search integration tab |
| `src/constantsMixin.js` | Shared constants mixin |
| `src/maskGeneratorMixin.js` | Mask generation from Photoshop selection for inpainting |
| `src/model-custom-element.js` | Custom Vue directive for element model binding |
| `src/changedpi.js` | DPI manipulation utility |
| `src/SvgIcon.vue` | SVG icon component |

## Tech Stack
- **Frontend:** Vue 2.7.14, Vue CLI 5.0, SCSS/SASS
- **Plugin Runtime:** Adobe UXP (Photoshop plugin framework v23.3.0+)
- **Backend API:** Automatic1111 Stable Diffusion WebUI (REST API)
- **Image Processing:** Jimp (JavaScript image manipulation)
- **Error Tracking:** Sentry (Vue + Tracing)
- **HTTP:** Axios
- **Testing:** Jest + @vue/test-utils
- **Build:** Webpack (via Vue CLI), html-replace-webpack-plugin
- **Linting:** ESLint + Airbnb config + Vue plugins

## Package Info
- Name: stable.art
- Version: 0.0.1
- License: MIT
- Private: true (no npm publish)

## Architecture

```
Photoshop (UXP Runtime)
  └── Stable.art Plugin Panel (Vue 2 SPA)
       ├── Generate Tab (txt2img / img2img / inpaint)
       │    ├── Prompt/Negative Prompt input
       │    ├── Model/Sampler/Steps/CFG/Seed controls
       │    └── Selection → mask → send to A1111 API
       └── Explore Tab (Lexica.art search)
            ├── Search bar
            └── Image grid from Lexica API
                    ↓
         Automatic1111 SD WebUI API
         (http://127.0.0.1:7860 or remote)
```

Key integration points:
- Uses `photoshop` module from UXP to access current document, selections, layers
- Converts Photoshop selections to masks via maskGeneratorMixin
- Sends generation requests to A1111's `/sdapi/v1/txt2img` and `/sdapi/v1/img2img` endpoints
- Receives base64 images, places them back into Photoshop as new layers
- Jimp used for image manipulation (resize, DPI changes)
