# DreamTalk — Raw Source

**Source:** https://github.com/ali-vilab/dreamtalk
**Paper:** https://arxiv.org/abs/2312.09767
**Project Page:** https://dreamtalk-project.github.io/
**Captured:** 2026-04-18

## README Summary

DreamTalk is a diffusion-based audio-driven expressive talking head generation framework that can produce high-quality talking head videos across diverse speaking styles. DreamTalk exhibits robust performance with a diverse array of inputs, including songs, speech in multiple languages, noisy audio, and out-of-domain portraits.

### Key Features
- Audio-driven expressive talking head generation using diffusion probabilistic models
- Supports diverse speaking styles (songs, multi-language speech, noisy audio)
- Works with out-of-domain portraits
- Classifier-free guidance (cfg_scale) for style intensity control
- CPU support available
- Two ad-hoc super-resolution options: CodeFormer (1024×1024, slow) and MetaPortrait Temporal Super-Resolution (512×512, faster)

### Architecture (from source code analysis)
- **Content Encoder (ContentW2VEncoder):** Wav2Vec2.0 (1024-dim) → TransformerEncoder (d_model=256, 3 layers, 8 heads) encodes audio features into content representation with sliding window (win_size=5)
- **Style Encoder (StyleEncoder):** 3DMM face parameters → TransformerEncoder + SelfAttentionPooling extracts global style code from reference video
- **Disentangle Decoder (Decoder):** TransformerDecoder fuses content + style to predict 3DMM facial expression coefficients (64-dim: upper/lower face split for BFM basis)
- **Diffusion Network (DiffusionNet):** Wraps NoisePredictor with VarianceSchedule (1000 steps, linear beta schedule), supports DDPM and DDIM sampling, classifier-free guidance with null_style_clip
- **Renderer (FaceGenerator):** PIRender-based renderer with MappingNet (1D conv + adaptive pooling) → WarpingNet (ADAIN Hourglass + flow field) → EditingNet (fine encoder + decoder with residual blocks)

### Pipeline
1. Input audio → FFmpeg resample to 16kHz → Wav2Vec2.0 feature extraction
2. Input style clip → 3DMM parameters (from reference video via PIRender extraction pipeline)
3. Diffusion model generates 3DMM expression coefficients conditioned on audio + style
4. Face renderer (PIRender-based) generates video frames from source image + 3DMM params
5. Output video with optional watermark

### Configuration (configs/default.py)
- Uses yacs CfgNode for config management
- Face3D latent dim: 64 (BFM basis), num_frames: 64, style_max_len: 256
- Diffusion: 1000 steps, linear schedule, predicts x0
- Content encoder: 256-dim, 3-layer Transformer, window size 5
- Style encoder: 256-dim, 3-layer Transformer, self-attention pooling
- CF guidance: training + inference enabled, null_prob=0.1, default scale=1.0

### Dependencies (requirements.txt)
yacs, scipy, scikit-image, scikit-learn, PyYAML, Pillow, numpy, opencv-python, imageio, ffmpeg-python, av

### Additional Requirements (README)
- Python 3.7
- PyTorch 1.8.0 + torchvision 0.9.0 + torchaudio 0.8.0 + CUDA 11.1
- ffmpeg, urllib3==1.26.6, transformers==4.28.1, dlib

### Checkpoints
- Public checkpoints are no longer available; must email author (mayf18@mails.tsinghua.edu.cn) for academic use
- Requires denoising_network.pth and renderer.pt

### License
Research/Non-commercial use only (per disclaimer)

### Authors
Yifeng Ma (Tsinghua), Shiwei Zhang, Jiayu Wang, Xiang Wang, Yingya Zhang, Zhidong Deng

### Related Works Acknowledged
PIRenderer, AVCT (AAAI22), StyleTalk, Deep3DFaceRecon_pytorch, Wav2vec2.0, diffusion-point-cloud, FOMM video preprocessing
