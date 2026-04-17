# GALA3D — Source Analysis

> Source: https://github.com/VDIGPKU/GALA3D
> Analyzed: 2026-04-18
> Category: 3D Model

## Project Info
- **Name:** GALA3D
- **Full Title:** Towards Text-to-3D Complex Scene Generation via Layout-guided Generative Gaussian Splatting
- **Organization:** VDIG Lab, Peking University (VDIGPKU)
- **Paper:** arXiv:2402.07207 (ICML 2024 accepted)
- **Project Page:** https://gala3d.github.io/
- **Code Access:** Requires signing application form (assets/GALA3D application.docx)
- **License:** Academic research free; commercial use requires permission (contact wyt@pku.edu.cn)

## Authors
Xiaoyu Zhou, Xingjian Ran, Xiong Yajiao, Jinlin He, Zhiwei Lin, Yongtao Wang (Peking University) | Deqing Sun (Google Research) | Ming-Hsuan Yang (UC Merced)

## Core Task
End-to-end text-to-3D complex scene generation with controllable editing.

## Architecture: Four-Stage Pipeline

### Stage 1: LLM Layout Generation
- Extracts coarse spatial layout from input text using Large Language Models
- Provides initial spatial priors for object placement

### Stage 2: Layout-guided Gaussian Representation
- Initializes 3D Gaussians constrained by the LLM-extracted layout
- Incorporates Adaptive Geometry Control to regulate shape and spatial distribution
- Prevents geometric collapse and unrealistic spatial arrangements

### Stage 3: Compositional Diffusion Optimization
- Applies text-to-image diffusion priors compositionally
- Optimizes geometry, texture, scale, and multi-object interactions
- High-fidelity object preservation within complex multi-entity scenes

### Stage 4: Layout Refinement
- Iteratively adjusts initial LLM priors to align with real-world physical constraints
- Bidirectional alignment: generated scenes respect both prompt and physics

## Key Technical Insights
- Generative 3D Gaussians with Layout-guided control for effective compositional text-to-3D generation
- Adaptive constraints prevent geometric collapse
- Bidirectional alignment between generated scenes and real-world physics

## Benchmark Comparisons
Evaluated against: SJC, ProlificDreamer, MVDream, DreamGaussian, GaussianDreamer, GSGEN, Set-the-Scene

## Capabilities
- Complex multi-object scene generation from single text prompt
- Text-driven scene editing (add/move/replace objects without full regeneration)
- Style-specific generation (e.g., Victorian-style, cartoon characters)

## Example Prompts
- "A living room has a coffee table with a basket on it, a wooden floor, a TV on a TV stand, and a sofa with an astronaut sitting on it"
- "Panda in a wizard hat sitting on a Victorian-style wooden chair and looking at a Ficus in a pot"
- "A camping scene with a tent on the grassland and two benches next to a campfire"

## Repository Structure
- README.md — Project overview, paper link, demo GIFs, BibTeX
- index.html — Project webpage (hosted at gala3d.github.io)
- assets/ — Application form for code access, demo GIFs

## Code Availability
- Code requires signing an application form to obtain full code and weights
- Not directly downloadable from the repository
