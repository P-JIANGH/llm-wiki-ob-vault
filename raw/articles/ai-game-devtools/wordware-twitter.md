# wordware-ai/twitter — AI Agent for Twitter Personality Analysis

**Source:** https://github.com/wordware-ai/twitter
**Extracted:** 2026-04-16
**Method:** web_extract (GitHub clone/gitcode/gitee all failed)

## Project Overview
A full-stack web application that analyzes any Twitter handle to generate a **personalized personality profile** using the **Wordware AI Agent**. The app combines AI-driven text analysis, robust web scraping, and modern SaaS integrations to deliver unique user insights.

## Tech Stack & Architecture
| Layer | Technology |
|:---|:---|
| **Framework** | Next.js (`next.config.mjs`) |
| **Language** | TypeScript (98.6%) |
| **Database/ORM** | Neon DB + Drizzle ORM (`drizzle.config.ts`, `migrate.ts`) |
| **Styling** | Tailwind CSS (`tailwind.config.ts`) |
| **Analytics** | PostHog |
| **Payments** | Stripe |
| **Email/CRM** | Loops |
| **Deployment** | Vercel (`vercel.json`) |

## Stats
- ⭐ 1.4k stars | 🍴 229 forks | 📝 416 Commits

## Key Architecture Notes
- **Fallback Scraping System:** Implements a resilient data extraction pipeline, attempting multiple scraping providers in sequence to ensure Twitter data is reliably fetched even if one API fails or hits rate limits. Supports multiple backends: Twitter API + Cookie, Apify API, SocialData API.
- **Modular AI Prompts:** Distinct prompt IDs configured for different analysis modes (`ROAST`, `FULL`, `PAIR`), enabling granular control over AI tone, depth, and output structure.
- **Wordware AI Agent Integration:** Uses Wordware Playground for prompt execution and management, with separate prompts for different analysis types.
- **Full SaaS Stack:** Includes Stripe payments, PostHog analytics, Loops email/CRM — production-ready SaaS architecture.

## Environment Variables
- **AI Processing:** WORDWARE_API_KEY, WORDWARE_PROMPT_ID, WORDWARE_ROAST_PROMPT_ID, WORDWARE_FULL_PROMPT_ID, WORDWARE_PAIR_PROMPT_ID
- **Database:** DATABASE_URL (Neon connection string)
- **Data Scraping:** Requires at least one fallback method: TWITTER_API_TOKEN + TWITTER_COOKIE, APIFY_API_KEY, or SOCIALDATA_API_KEY
- **Payments:** STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET, STRIPE_PRICE_ID, STRIPE_PRODUCT_ID
- **Analytics & Comms:** LOOPS_API_KEY, NEXT_PUBLIC_POSTHOG_KEY, POSTHOG_PROJECT_ID

## Project Structure
- `src/` & `public/` → Core application logic and static assets
- `drizzle.config.ts` & `migrate.ts` → Database schema management & migrations
- `structure.json` → Likely defines AI agent workflow or prompt routing structure

## License
Not explicitly stated in README.

## Relevant Links
- GitHub: https://github.com/wordware-ai/twitter
- Wordware Playground: https://app.wordware.ai/share/2436ad08-5374-4750-a0f9-105080ff97ea/playground
