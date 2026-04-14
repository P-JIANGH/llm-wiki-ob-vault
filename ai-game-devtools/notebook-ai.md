---
title: Notebook.ai
created: 2026-04-15
updated: 2026-04-15
type: entity
tags: [tool, ai, llm, agent]
sources: [raw/articles/ai-game-devtools/notebook-ai.md]
---

# Notebook.ai

An open-source [[Ruby on Rails]] web application for writers and roleplayers to create and manage fictional universes and all their components.

## Overview

Notebook.ai provides a browser-based interface for building fictional worlds — from characters and locations to deities, languages, magic systems, and more. It is a planning tool aimed at writers, game masters, and roleplayers who want structured, interconnected worldbuilding data.

The live platform runs at https://notebook.ai/. The project was started by Andrew Brown in 2016 and remains actively maintained as open-source software.

## Features

- **32+ content types** organized into free (Universe, Character, Location, Item) and premium tiers (Creature, Planet, Religion, Deity, Language, Government, Group, Race, Tradition, Food, Flora, Sport, Technology, Magic, Lore, Scene, Job, Landmark, Vehicle, Town, Country, Continent, Building, Condition, etc.)
- **Universe-level organization** — all content belongs to a top-level Universe container
- **Flexible attributes system** — custom fields per content type via dynamic `HasAttributes` concern
- **Privacy controls** — content can be private, public, or shared with specific collaborators
- **Image uploads** — each content page supports image attachments via `HasImageUploads`
- **Content linking** — cross-reference pages within a universe (character linked to location, item linked to character, etc.)
- **Collaboration** — multiple users can co-author the same universe
- **Background jobs** — Sidekiq handles async tasks like document analysis and exports

## Technology Stack

| Layer | Technology |
|-------|-----------|
| Framework | Ruby on Rails 6.1, Ruby ~> 3.2 |
| Frontend | React, Webpacker, Sass, CoffeeScript |
| Image processing | Paperclip, RMagick, ImageProcessing |
| Auth | Devise + Authority |
| Billing | Stripe, PayPal |
| Storage | AWS SDK S3 |
| Background jobs | Sidekiq |
| Deployment | Puma/Passenger, Docker |

## Architecture

Notebook.ai's domain model revolves around **Content Pages** — all page types inherit shared behavior from `ContentPage` and Rails concerns:

- `BelongsToUniverse` — associates content with a parent Universe
- `HasContent` / `IsContentPage` — base content page functionality
- `HasAttributes` — dynamic key-value attributes per page type (no schema changes needed)
- `HasPrivacy` — per-page visibility: private, public, or collaborator-only
- `HasImageUploads` — image attachment handling
- `HasPageReferences` — cross-linking between pages
- `HasPageTags` — tagging taxonomy

All 32+ content type models live in `app/models/page_types/` and inherit from `ApplicationRecord`. The `config/initializers/content_types.rb` file defines metadata for each type (name, icon, available attributes, etc.).

## AI/ML Relevance

While Notebook.ai itself is not primarily an AI tool, it has a documented roadmap toward AI-assisted features:
- **Automated revision services**
- **Structured NLP output** into reusable knowledge graph data
- **Real-time writing suggestions** (reading level, accent correction)
- **Knowledge graph engine** for semantic queries within a universe
- **ML-generated names** for characters and locations

The platform's structured data model (universes → characters/locations/items with attributes and relationships) positions it well as a **knowledge base** for AI game engines and NPC dialogue systems. Each content page's structured attributes could feed into [[LLM]] prompt engineering pipelines for game world generation.

## Related Tools

- [[novel]] — AI-assisted WYSIWYG editor for writing (similar writer audience, AI-augmented)
- [[chatdev]] — Multi-agent virtual software company (shares agent collaboration concepts)
- [[babyagi]] — AI task management system (similar autonomous agent architecture)
- [[auto-gpt]] — Autonomous GPT agent (similar self-directed agent pattern)

## License

Copyright (c) Andrew Brown 2016. Released as open-source (Rails community license).

## Links

- GitHub: https://github.com/indentlabs/notebook
- Live: https://notebook.ai/
