# The Culinary Guild AI Platform

> *Where Flavor Meets Intelligence*

The Culinary Guild is a premium culinary AI ecosystem that merges James Beard-level gastronomic prestige with cutting-edge artificial intelligence. From anime-inspired cooking adventures to rigorous kitchen trials, from global heritage cuisine to precision flavor science — this platform is the ultimate destination for culinary mastery.

---

## Vision

The Culinary Guild was built on a singular conviction: that cooking is one of humanity's most profound acts of creativity, culture, and connection. Great chefs understand flavor at a molecular level, respect cultural lineage, and approach every dish with the curiosity of a scientist and the soul of an artist.

We built an AI platform worthy of that standard.

---

## The Ecosystem

### Core Modules

| Module | Description |
|--------|-------------|
| **Kitchen Trials** | Original challenge engine — like Chopped but with AI coaching, multiple modes, and a full progression system |
| **Otaku Culinary Guild** | Anime-inspired cooking: detect food aesthetics from any series, recreate iconic dishes |
| **Flavor Atlas** | Ingredient pairing science with confidence scores and flavor family maps |
| **Spice Codex** | 60+ spice encyclopedia with origin, profile, history, and pairing guides |
| **Heritage Table** | Regional cuisine deep-dives: Cajun, Gullah Geechee, West African, Levantine, and 20+ more |
| **Mixology Chamber** | Cocktail generator, classic library, and food-drink pairing tool |
| **Recipe Generator** | AI-powered recipe creation from pantry to plate |
| **Guild Hall** | Progression system across 9 specialist guilds |

### The 9 Guilds

1. **Flavor Guild** — The science of taste and sensory harmony
2. **Sauce Guild** — Emulsions, reductions, and the foundations of French technique
3. **Fire Guild** — Heat mastery: grill, smoke, braise, sear
4. **Spice Guild** — The global history and application of spice
5. **Heritage Guild** — Cultural cuisine preservation and celebration
6. **Bake Sanctum** — Pastry, bread, and the chemistry of baking
7. **Broth Hall** — Stock, soup, consommé, and liquid foundations
8. **Mixology Chamber** — Beverage craft and food pairing
9. **Otaku Guild** — Anime and pop culture culinary recreation

---

## Tech Stack

### Frontend
- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS** — custom dark/gold premium theme
- **Framer Motion** — animations
- **Lucide React** — icons

### Backend
- **FastAPI** (Python)
- **Anthropic Claude** — primary AI inference
- **OpenAI GPT-4** — secondary/fallback
- **Supabase** — PostgreSQL database + auth + storage

### Infrastructure
- **Turborepo** — monorepo build system
- **Docker Compose** — local development
- **Vercel** — frontend deployment
- **Railway / Fly.io** — API deployment

---

## Project Structure

```
culinary-guild-ai/
├── apps/
│   ├── web/                    # Next.js 14 frontend
│   │   ├── app/                # App Router pages
│   │   │   ├── dashboard/
│   │   │   ├── kitchen-trials/
│   │   │   ├── otaku-guild/
│   │   │   ├── guilds/
│   │   │   ├── spice-codex/
│   │   │   ├── flavor-atlas/
│   │   │   ├── heritage-table/
│   │   │   ├── mixology-chamber/
│   │   │   └── recipe-generator/
│   │   ├── components/         # Reusable UI components
│   │   └── lib/                # Utilities, types, constants
│   └── api/                    # FastAPI backend
│       ├── routers/            # API route handlers
│       └── agents/             # AI agent system
├── packages/
│   ├── prompts/                # AI prompt templates
│   ├── schema/                 # Database schema
│   └── content/                # Static content JSON
├── supabase/
│   ├── migrations/             # Database migrations
│   └── seeds/                  # Seed data
└── docs/                       # Architecture documentation
```

---

## Quick Start

### Prerequisites
- Node.js 18+
- Python 3.11+
- pnpm 8+
- Docker + Docker Compose (for local Postgres)

### Installation

```bash
# Clone the repository
git clone https://github.com/your-org/culinary-guild-ai.git
cd culinary-guild-ai

# Install Node dependencies
pnpm install

# Install Python dependencies
cd apps/api
pip install -r requirements.txt
cd ../..

# Copy environment variables
cp .env.example .env.local
# Edit .env.local with your API keys

# Start the database
docker-compose up db -d

# Run database migrations
# (Using Supabase CLI or psql)
psql $DATABASE_URL < supabase/migrations/001_initial_schema.sql
psql $DATABASE_URL < supabase/seeds/001_seed_data.sql
```

### Development

```bash
# Start all services
pnpm dev

# Or individually:
# Frontend only
pnpm --filter web dev

# Backend only
cd apps/api && uvicorn main:app --reload --port 8000
```

### Build

```bash
pnpm build
```

---

## Environment Variables

See `.env.example` for all required environment variables including:
- `ANTHROPIC_API_KEY` — Claude AI access
- `OPENAI_API_KEY` — OpenAI GPT-4 access
- `NEXT_PUBLIC_SUPABASE_URL` — Supabase project URL
- `SUPABASE_SERVICE_ROLE_KEY` — Supabase admin key
- `NEXT_PUBLIC_API_URL` — FastAPI backend URL

---

## AI Agent System

The platform runs a multi-agent AI system coordinated by an orchestrator:

- **Orchestrator Agent** — Routes requests to specialist agents
- **Recipe Agent** — Generates, adapts, and scales recipes
- **Flavor Agent** — Pairing science and balance analysis
- **Anime Agent** — Food aesthetic inference from anime series
- **Judge Agent** — Kitchen Trials scoring and commentary
- **Spice Agent** — Spice recommendations and history
- **Editorial Agent** — James Beard-quality food writing

See `docs/agents.md` for full documentation.

---

## Design System

### Colors
```
Background:   #0A0A0A (void), #111111 (deep), #1A1A1A (charcoal)
Gold:         #D4AF37 (primary), #C9A227 (secondary), #B8860B (dark)
Text:         #F5F0E8 (cream), #E8DFD0 (warm), #A09070 (muted)
Accent:       #8B1A1A (deep red)
```

### Typography
- **Cinzel** — Logo and premium headings
- **Playfair Display** — Section headings and editorial text
- **Inter** — Body text and UI

---

## Content

- **25+ Anime Series** with food style profiles and dish recreations
- **60+ Spices** with full encyclopedic entries
- **20+ Regional Cuisines** with cultural context
- **30 Trial Templates** across all difficulty levels
- **9 Guilds** with full progression systems

---

## Deployment

```bash
# Build Docker images
docker-compose build

# Deploy with Docker Compose
docker-compose up -d

# Or deploy to Vercel (frontend) + Railway (API)
vercel deploy apps/web
# (configure Railway for apps/api)
```

---

## License

Proprietary — The Culinary Guild. All rights reserved.

---

*"The kitchen is where science becomes art, and art becomes nourishment."*
— The Culinary Guild
