# Notebook.ai

> Immutable source: cloned from https://github.com/indentlabs/notebook on 2026-04-15

## Overview

Notebook.ai is an open-source Rails web application for writers and roleplayers to create and manage fictional universes and all their components — characters, locations, items, creatures, deities, languages, and much more.

Live site: https://notebook.ai/

## Technology Stack

- **Framework:** Ruby on Rails 6.1
- **Ruby version:** ~> 3.2
- **Frontend:** React + Webpacker (JavaScript), Sass/SCSS, CoffeeScript
- **Image processing:** Paperclip, RMagick, ImageProcessing
- **Authentication:** Devise + Authority
- **Background jobs:** Sidekiq
- **Storage:** AWS SDK S3
- **Billing:** Stripe, PayPal

## Content Type System (32+ types)

Core (free): Universe, Character, Location, Item

Premium: Creature, Planet, Religion, Deity, Language, Government, Group, Race, Tradition, Food, Flora, Sport, Technology, Magic, Lore, Scene, Job, Landmark, Vehicle, Town, Country, Continent, Building, Condition, etc.

## Architecture

Key patterns:
- `BelongsToUniverse` — associates content with a universe
- `IsContentPage` / `HasContent` — shared content page functionality
- `HasAttributes` — dynamic custom fields per content type
- `HasPrivacy` — public/private/co-collaborator visibility
- `HasImageUploads` — image attachment handling
- `ContentPage` — base behavior all page types inherit from

All page types live in `app/models/page_types/`.

## Key Files

- `config/initializers/content_types.rb` — defines all content type configurations
- `app/models/concerns/` — shared behaviors (has_attributes, has_privacy, etc.)
- `db/` — Rails migrations
- `docker-compose.yml` — containerized setup

## License

Copyright (c) Andrew Brown 2016

## Related

- [[novel]] — Another AI-assisted writing tool (similar domain)
- [[chatdev]] — Multi-agent software development (different domain, similar agent collaboration pattern)
