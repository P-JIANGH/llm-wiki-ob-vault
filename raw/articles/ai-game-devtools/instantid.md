# InstantID — Raw Source

**Source:** https://github.com/InstantID/InstantID
**Captured:** 2026-04-17

---

## README Summary

InstantID: Zero-shot Identity-Preserving Generation in Seconds

**Authors:** Qixun Wang, Xu Bai, Haofan Wang, Zekui Qin, Anthony Chen (InstantX Team, Xiaohongshu Inc, Peking University)

**Description:** InstantID is a new state-of-the-art tuning-free method to achieve ID-Preserving generation with only single image, supporting various downstream tasks.

### Key Claims
- Achieves ID-preserving generation with a single reference image
- Zero-shot — no fine-tuning required
- Supports stylized synthesis, face swapping, and character generation
- Compatible with LCM acceleration for faster inference
- Pipeline merged into diffusers library
- Kolors version adapted for text+ID simultaneous generation

### Architecture
- **IdentityNet:** A ControlNet-based module that uses facial keypoints (from InsightFace) to guide the generation
- **IP-Adapter:** An identity-preserving adapter that injects facial embedding features into the diffusion process
- **Face Analysis:** Uses InsightFace's FaceAnalysis to extract facial embeddings (face_emb) and keypoints (face_kps)
- **Base Model:** Compatible with SDXL models (e.g., YamerMIX)

### Key Components

1. **`pipeline_stable_diffusion_xl_instantid.py`** — Main diffusion pipeline integrating ControlNet + IP-Adapter
2. **`pipeline_stable_diffusion_xl_instantid_full.py`** — Full version with additional features
3. **`pipeline_stable_diffusion_xl_instantid_img2img.py`** — Image-to-image variant
4. **`ip_adapter/attention_processor.py`** — Custom attention processor for IP-Adapter integration
5. **`ip_adapter/resampler.py`** — Resampler for embedding processing
6. **`infer.py`** — Quick-start inference script
7. **`infer_full.py`** — Full inference script (reproduces paper results)
8. **`gradio_demo/app.py`** — Gradio web UI demo
9. **`gradio_demo/app-multicontrolnet.py`** — Multi-ControlNet demo

### Usage Pattern

```python
# Face analysis
app = FaceAnalysis(name='antelopev2', root='./', providers=['CUDAExecutionProvider', 'CPUExecutionProvider'])
app.prepare(ctx_id=0, det_size=(640, 640))
face_info = app.get(cv2.cvtColor(np.array(face_image), cv2.COLOR_RGB2BGR))
face_emb = face_info['embedding']
face_kps = draw_kps(face_image, face_info['kps'])

# Pipeline setup
controlnet = ControlNetModel.from_pretrained(controlnet_path, torch_dtype=torch.float16)
pipe = StableDiffusionXLInstantIDPipeline.from_pretrained(base_model, controlnet=controlnet, torch_dtype=torch.float16)
pipe.load_ip_adapter_instantid(face_adapter)

# Generation
image = pipe(prompt, negative_prompt=negative_prompt, image_embeds=face_emb, image=face_kps,
             controlnet_conditioning_scale=0.8, ip_adapter_scale=0.8).images[0]
```

### Dependencies
- diffusers 0.25.1, torch 2.0.0, transformers 4.37.1
- insightface, opencv-python, controlnet_aux
- accelerate, safetensors, einops
- gradio (for demo)
- LCM-LoRA compatible for speedup

### Licensing
- Code: Apache 2.0 (commercial + academic)
- Face models (insightface): Non-commercial research only
- Checkpoints: Research purposes only

### Community Integrations
- WebUI: sd-webui-controlnet
- ComfyUI: Multiple community implementations
- Replicate: zsxkib/instant-id demo
- OneDiff: Accelerated inference support

### Release Timeline
- 2023-12-11: Project page launched
- 2024-01-15: Technical report (arXiv 2401.07519)
- 2024-01-22: Pre-trained checkpoints + inference code + Gradio demo released
- 2024-01-23: Pipeline merged into diffusers
- 2024-04-03: InstantStyle released (compatible style transfer)
- 2024-07-18: Kolors adaptation announced
