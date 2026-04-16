# ConceptLab: Creative Concept Generation using VLM-Guided Diffusion Prior Constraints

**Source:** https://github.com/kfirgoldberg/ConceptLab
**arXiv:** https://arxiv.org/abs/2308.02669
**Project Website:** https://kfirgoldberg.github.io/ConceptLab/

## Authors
Elad Richardson, Kfir Goldberg, Yuval Alaluf, Daniel Cohen-Or — Tel Aviv University

## Abstract
Recent text-to-image generative models have enabled us to transform our words into vibrant, captivating imagery. The surge of personalization techniques that has followed has also allowed us to imagine unique concepts in new scenes. However, an intriguing question remains: How can we generate a *new*, imaginary concept that has never been seen before?

ConceptLab presents the task of **creative text-to-image generation**, where we seek to generate new members of a broad category (e.g., generating a pet that differs from all existing pets). The method leverages Diffusion Prior models and formulates creative generation as an optimization process over the output space of the diffusion prior, resulting in a set of "prior constraints". To keep the generated concept from converging into existing members, a question-answering Vision-Language Model (VLM) adaptively adds new constraints to the optimization problem, encouraging the model to discover increasingly more unique creations. The prior constraints also serve as a strong mixing mechanism for creating hybrids between generated concepts.

## Key Features
- **Creative Text-to-Image Generation**: Generate entirely new concepts within a broad category (e.g., brand-new pets never seen before)
- **VLM-Guided Adaptive Negatives**: Uses BLIP VLM to query generated images ("What kind of pet is this?") and adaptively adds negative constraints, pushing the optimization away from existing concepts
- **Diffusion Prior Constraints**: Formulates generation as optimization over Kandinsky 2.1 diffusion prior output space
- **Evolutionary Generation**: Mix parent concepts to create hybrid "generations" iteratively
- **Concept Mixing**: Merge traits across multiple real concepts to create hybrids (e.g., "lobs-turtle", "pine-melon")
- **Art Style Generation**: Create new art styles, not just objects

## Architecture
- **Base Model**: Kandinsky 2.1 (diffusion prior + UNet text-to-image model)
- **VLM**: BLIP for question-answering on generated images
- **Token Optimization**: Learns new text embeddings (placeholder tokens) via optimization
- **Template System**: Uses diverse prompt templates for robust concept learning

## Project Structure
```
conceptlab/
├── scripts/
│   ├── train.py              # Main training script (creative generation)
│   ├── train_evolution.py    # Evolutionary generation (mixing parents)
│   └── infer.py              # Inference with learned concepts
├── training/
│   ├── coach.py              # Main training loop with VLM-guided negatives
│   ├── coach_evolution.py    # Evolutionary mixing coach
│   ├── train_config.py       # Pydantic training configuration
│   ├── templates.py          # Prompt templates for object/style
│   └── dataset.py            # Concept dataset
├── kandinsky2/               # Kandinsky 2.1 model implementation
│   ├── model/                # UNet, text encoders, samplers
│   ├── vqgan/                # VQ-GAN / MoVQ components
│   └── train_utils/          # Training utilities, EMA, datasets
└── configs/
    ├── new_pet.yaml          # Object generation config
    └── new_art.yaml          # Art style generation config
```

## Usage
- **Train new concept**: `python -m scripts.train --config configs/new_pet.yaml --output_dir=<dir>`
- **Generate images**: `python -m scripts.infer --prompts="['a photo of a {}']" --output_dir <dir> --learned_embeds_path <path>`
- **Evolutionary mixing**: `python -m scripts.train_evolution --parents_images_dirs="['<dir1>','<dir2>']" --initializer_token <token> --output_dir <dir> --mix_weights="[0.4,0.6]"`
- **Concept mixing**: `python -m scripts.train --config configs/new_pet.yaml --live_negatives=False --positive_classes="['fish','panda']"`

## Technical Details
- Environment: Python 3.9, PyTorch 1.10.1, CUDA 11.3
- Dependencies: PyTorch Lightning, OmegaConf, einops, Kandinsky 2.1, diffusers
- Image size: 512x512
- Training steps: 2500 (default)
- Batch size: 1
- Log frequency: Every 250 steps

## License
MIT License (Copyright 2023 kfir99)

## Citation
```
@misc{richardson2023conceptlab,
  title={ConceptLab: Creative Generation using Diffusion Prior Constraints},
  author={Elad Richardson and Kfir Goldberg and Yuval Alaluf and Daniel Cohen-Or},
  year={2023},
  eprint={2308.02669},
  archivePrefix={arXiv},
  primaryClass={cs.CV}
}
```
