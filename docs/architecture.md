# Architecture

## Overview

The Culinary Guild is a monorepo containing:

- **apps/web** — Next.js 14 frontend (App Router, Tailwind CSS)
- **apps/api** — FastAPI backend (Python, Pydantic)
- **packages/prompts** — Agent prompt templates (Markdown)
- **packages/schema** — Database schema (Supabase SQL)

## Frontend

- Dark-themed UI (`bg-zinc-950`)
- Pages: Home, Guild Path, Kitchen Trials, Otaku Culinary Guild
- Communicates with API via `lib/api.ts` fetch wrapper

## Backend

- FastAPI with modular routers (vision, recipes, anime, trials)
- Safety-first design: ingredient identification includes toxicity checks
- Placeholder services ready for model integration

## Database

- Supabase (PostgreSQL)
- Tables: users, profiles, ingredients, scans, safety flags, anime series, challenges
