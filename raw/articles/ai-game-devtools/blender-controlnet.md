# Blender-ControlNet — Raw Source

**GitHub:** https://github.com/coolzilj/Blender-ControlNet
**Author:** Jin Liu (@coolzilj)
**License:** MIT
**Date Captured:** 2026-04-17

## Project Overview

Using Multiple ControlNet in Blender. A Blender Python script that integrates with AUTOMATIC1111 Stable Diffusion WebUI via its API to generate AI-enhanced images from Blender renders using ControlNet conditioning.

## Dependencies

- [AUTOMATIC1111/stable-diffusion-webui](https://github.com/AUTOMATIC1111/stable-diffusion-webui)
- [Mikubill/sd-webui-controlnet](https://github.com/Mikubill/sd-webui-controlnet)

## Architecture

### Core File: multicn.py (356 lines)

**Workflow:**
1. Start A1111 WebUI in `--api` mode (`localhost:7860`)
2. Install sd-webui-controlnet extension and enable "Allow other script to control this extension"
3. Enable Multi ControlNet in A1111 settings
4. Copy multicn.py into Blender Scripting pane
5. Hit F12 to render → script captures render result → generates conditioning maps → sends to A1111 API → receives generated image → loads into Blender Image Editor

**Key Mechanism:**
- Uses `bpy.app.handlers.render_complete` persistent handler to intercept render completion
- Blender Compositor generates conditioning maps (canny, depth, bone/openpose, segmentation)
- Maps are saved as PNG, base64-encoded, sent via POST to `http://localhost:7860/sdapi/v1/txt2img`
- Supports up to 4 ControlNet units simultaneously (canny, depth, openpose, seg)
- Response decoded and saved to `sd_results/` folder, loaded into Image Editor

**Configurable Parameters:**
- `is_send_canny`, `is_send_depth`, `is_send_bone`, `is_send_seg` — toggle which maps to send
- Each ControlNet unit has: model hash, weight, resize_mode, processor_res, threshold_a/b, guidance_start/end
- Generation parameters: prompt, negative_prompt, sampler (DPM++ SDE Karras), steps, cfg_scale, seed
- Hi-res fix support: hr_scale 1.5, denoising_strength 0.5, hr_upscaler

**API Error Handling:**
- ConnectionError: A1111 server not found
- MissingSchema: Invalid URL
- ReadTimeout: Server timed out (1000s timeout)
- 404: Server running but not in API mode
- Sampler not found error

### Bonus File: seg.py (66 lines)

Creates 150 ControlNet segmentation color materials from a CSV color coding file.
- Reads `color_coding_semantic_segmentation_classes.csv`
- Creates Blender materials with emission shaders for each semantic class
- sRGB to linear color space conversion via `to_blender_color()`

### Blender Template

- `blender_templates/multicn_depth+seg.blend` — pre-configured template sending depth + segmentation maps to ControlNet

## Limitations

- No animation support (listed as TODO)
- Requires local A1111 installation running on localhost:7860
- Manual script modification needed for different map configurations
- Model hashes must match local installed ControlNet models

## Key Code Snippets

```python
# Render complete handler triggers AI generation
@persistent
def render_complete_handler(scene):
    if bpy.data.images["Render Result"].has_data:
        if is_using_ai:
            send_to_api(scene)

# API call to txt2img endpoint
server_url = "http://localhost:7860" + "/sdapi/v1/txt2img"
response = requests.post(server_url, json=params, headers=headers, timeout=1000)

# ControlNet unit configuration (example: openpose/bone)
bone_cn_units = {
    "model": "diff_control_sd15_openpose_fp16 [1723948e]",
    "weight": 1.1,
    "guidance_start": 0,
    "guidance_end": 1,
}
```
